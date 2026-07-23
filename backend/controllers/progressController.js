const Progress = require('../models/Progress');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const QuizAttempt = require('../models/QuizAttempt');
const https = require('https');
const { recomputeAndSaveReadiness, resolveRoadmapPathKey } = require('../utils/readiness');
const ROADMAP_DATA = require('../utils/roadmapData');

async function checkAndMarkRoadmapCompletion(userId) {
    const user = await User.findById(userId);
    if (!user || !user.selectedPath) return user;

    const matchedPathKey = resolveRoadmapPathKey(user.selectedPath);
    if (!matchedPathKey) return user;

    const pathData = ROADMAP_DATA[matchedPathKey];
    if (!pathData || pathData.length === 0) return user;

    // Check if every module's ID in the roadmap is in completedModules
    const allCompleted = pathData.every(mod => user.completedModules.includes(mod.id));
    
    if (allCompleted && !user.completedRoadmaps.includes(matchedPathKey)) {
        // Mark as completed and award XP
        return await User.findByIdAndUpdate(
            userId,
            { 
                $addToSet: { completedRoadmaps: matchedPathKey },
                $inc: { experienceRank: 500 } // Bonus XP for roadmap completion
            },
            { new: true }
        );
    }
    return user;
}

exports.markViewed = async (req, res) => {
    try {
        const { moduleId, roadmapId } = req.body;
        const userId = req.user.userId;

        let progress = await Progress.findOne({ userId, moduleId });

        if (!progress) {
            progress = new Progress({
                userId,
                moduleId,
                roadmapId,
                status: 'studied'
            });
        } else {
            if (progress.status === 'locked' || progress.status === 'available') {
                progress.status = 'studied';
            }
        }

        progress.lastAccessedAt = Date.now();
        await progress.save();

        // Also persist to User.studiedLessons for quick admin access
        await User.findByIdAndUpdate(
            userId,
            { $set: { [`studiedLessons.${moduleId}`]: Date.now() } },
            { new: true }
        );

        const readinessScore = await recomputeAndSaveReadiness(userId);

        res.json({ success: true, message: 'Module marked as viewed', readinessScore });
    } catch (err) {
        console.error('Mark Viewed Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Marks a single lesson (not a whole module) as permanently completed for
// this user. Distinct from markViewed (which only tracks module-level
// "studied" status) — this is what powers the persistent "✓ Completed"
// button state on the lesson page across reloads/logins/devices.
exports.markLessonComplete = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.userId;

        if (!courseId || typeof courseId !== 'string') {
            return res.status(400).json({ success: false, message: 'courseId is required' });
        }

        let updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { completedLessons: courseId } },
            { new: true }
        );

        updatedUser = await checkAndMarkRoadmapCompletion(userId);
        const readinessScore = await recomputeAndSaveReadiness(userId);

        res.json({ 
            success: true, 
            message: 'Lesson marked as completed', 
            readinessScore,
            completedRoadmaps: updatedUser.completedRoadmaps,
            experienceRank: updatedUser.experienceRank
        });
    } catch (err) {
        console.error('Mark Lesson Complete Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


exports.submitQuiz = async (req, res) => {
    try {
        let { moduleId, roadmapId, scorePercentage, totalQuestions, answers } = req.body;

        const userId = req.user.userId;

        if (!moduleId || typeof scorePercentage !== 'number') {
            return res.status(400).json({ success: false, message: 'moduleId and scorePercentage are required' });
        }

        const quiz = await Quiz.findOne({ moduleId });
        const passingScore = quiz ? quiz.passingScorePercentage : 70; // default 70%
        const passed = scorePercentage >= passingScore;

        // Update Progress collection
        // Track whether this is the FIRST TIME the user passes this quiz
        // so we award XP exactly once per quiz (not on retakes).
        let progress = await Progress.findOne({ userId, moduleId });
        const wasAlreadyCompleted = progress && progress.status === 'completed';

        if (!progress) {
            progress = new Progress({
                userId,
                moduleId,
                roadmapId: roadmapId || moduleId,
                status: passed ? 'completed' : 'studied',
                highestQuizScore: scorePercentage
            });
        } else {
            if (scorePercentage > (progress.highestQuizScore || 0)) {
                progress.highestQuizScore = scorePercentage;
            }
            if (passed && progress.status !== 'completed') {
                progress.status = 'completed';
            }
        }
        progress.lastAccessedAt = Date.now();
        await progress.save();

        // Save Detailed QuizAttempt
        const attempt = new QuizAttempt({
            userId,
            moduleId,
            scorePercentage,
            passed,
            totalQuestions: totalQuestions || 0,
            answers: answers || []
        });
        await attempt.save();

        // Update User document: quizScores always saved; completedModules only on pass
        let userUpdateFields = { $set: { [`quizScores.${moduleId}`]: scorePercentage } };
        if (passed) {
            userUpdateFields.$addToSet = { completedModules: moduleId };
        }
        await User.findByIdAndUpdate(userId, userUpdateFields, { new: true });

        // ── XP AWARD ──────────────────────────────────────────────────────────
        // XP is awarded on EVERY quiz attempt, scaled directly by the score:
        //   Max XP is 10 for a skill assessment.
        // Uses atomic $inc to prevent race-condition double-counts.
        const awardedXp = 1 + Math.floor((scorePercentage / 100) * 9);
        let updatedUser = await User.findByIdAndUpdate(
            userId,
            { $inc: { experienceRank: awardedXp } },
            { returnDocument: 'after' }
        );
        updatedUser = await checkAndMarkRoadmapCompletion(userId);

        const readinessScore = await recomputeAndSaveReadiness(userId);

        res.json({
            success: true,
            passed,
            score: scorePercentage,
            passingScore,
            readinessScore,
            xpAwarded: awardedXp,
            experienceRank: updatedUser ? updatedUser.experienceRank : null,
            completedRoadmaps: updatedUser ? updatedUser.completedRoadmaps : [],
            isFirstPass: passed && !wasAlreadyCompleted
        });
    } catch (err) {
        console.error('Submit Quiz Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};




exports.getProgress = async (req, res) => {
    try {
        const { roadmapId } = req.params;
        const userId = req.user.userId;

        const progressList = await Progress.find({ userId, roadmapId });
        res.json({ success: true, progress: progressList });
    } catch (err) {
        console.error('Get Progress Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getSkillGap = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const targetCareer = user.selectedPath || 'General Tech Career';
        const completedModules = user.completedModules || [];

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return res.json({ success: false, message: 'GROQ_API_KEY not configured' });
        }

        const prompt = `You are an expert career counselor AI. The user's target career is "${targetCareer}". They have completed the following learning modules: ${completedModules.length > 0 ? completedModules.join(', ') : 'None'}. Provide a real-time, comprehensive skill gap analysis. Reply EXACTLY in the following JSON format and nothing else:
{
  "skills": [
    {"name": "Skill 1", "currentLevel": 20, "requiredLevel": 80},
    {"name": "Skill 2", "currentLevel": 90, "requiredLevel": 85}
  ]
}
Provide exactly 8 to 10 key skills required for this career. 'currentLevel' should be an integer (0-100) estimating their current ability based on their completed modules. 'requiredLevel' is the integer (0-100) required to be job-ready in that skill.`;

        const payload = JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.2,
            max_tokens: 1500,
            response_format: { type: 'json_object' }
        });

        const options = {
            hostname: 'api.groq.com',
            path: '/openai/v1/chat/completions',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        };

        const groqReq = https.request(options, (groqRes) => {
            let data = '';
            groqRes.on('data', chunk => data += chunk);
            groqRes.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.error) {
                        console.error('Groq API error:', parsed.error.message);
                        return res.status(500).json({ success: false, message: 'AI error' });
                    }
                    const aiResponse = parsed.choices[0].message.content;
                    const jsonRes = JSON.parse(aiResponse);
                    
                    let skills = jsonRes.skills || [];
                    let currentTotal = 0;
                    let requiredTotal = 0;

                    // Calculate Math & Logic on Server
                    skills = skills.map(skill => {
                        let currentLevel = Number(skill.currentLevel) || 0;
                        let requiredLevel = Number(skill.requiredLevel) || 80;
                        
                        // Sanity clamp
                        currentLevel = Math.max(0, Math.min(100, currentLevel));
                        requiredLevel = Math.max(0, Math.min(100, requiredLevel));

                        currentTotal += currentLevel;
                        requiredTotal += requiredLevel;

                        const gap = requiredLevel - currentLevel;
                        let gapLevel = "Strong";
                        let type = "validated";

                        if (gap >= 50) {
                            gapLevel = "Critical Gap";
                            type = "critical";
                        } else if (gap >= 31) {
                            gapLevel = "High Gap";
                            type = "improvement";
                        } else if (gap >= 11) {
                            gapLevel = "Moderate Gap";
                            type = "improvement";
                        } else {
                            gapLevel = "Strong";
                            type = "validated";
                        }

                        return {
                            name: skill.name,
                            currentLevel,
                            requiredLevel,
                            gap,
                            gapLevel,
                            type
                        };
                    });

                    // Match Score Calculation
                    const overallScore = requiredTotal > 0 ? Math.min(100, Math.round((currentTotal / requiredTotal) * 100)) : 0;
                    
                    // Sort for roadmap generation (highest gap first)
                    const roadmapSkills = [...skills]
                        .filter(s => s.gap > 0)
                        .sort((a, b) => b.gap - a.gap);

                    res.json({
                        success: true,
                        data: {
                            targetCareer,
                            overallScore,
                            skills,
                            roadmapSkills,
                            completedModulesCount: completedModules.length
                        }
                    });
                } catch (e) {
                    console.error('Groq parse error:', e.message);
                    res.status(500).json({ success: false, message: 'AI parse error' });
                }
            });
        });

        groqReq.on('error', (e) => {
            console.error('Groq request error:', e.message);
            res.status(500).json({ success: false, message: 'Network error' });
        });

        groqReq.write(payload);
        groqReq.end();

    } catch (err) {
        console.error('Get Skill Gap Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
