const Progress = require('../models/Progress');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const https = require('https');

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

        res.json({ success: true, message: 'Module marked as viewed' });
    } catch (err) {
        console.error('Mark Viewed Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.submitQuiz = async (req, res) => {
    try {
        const { moduleId, roadmapId, scorePercentage } = req.body;
        const userId = req.user.userId;

        if (!moduleId || typeof scorePercentage !== 'number') {
            return res.status(400).json({ success: false, message: 'moduleId and scorePercentage are required' });
        }

        const quiz = await Quiz.findOne({ moduleId });
        const passingScore = quiz ? quiz.passingScorePercentage : 70; // default 70%
        const passed = scorePercentage >= passingScore;

        // Update Progress collection
        let progress = await Progress.findOne({ userId, moduleId });
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

        // If passed, also update User.completedModules so /api/user/me returns it
        if (passed) {
            await User.findByIdAndUpdate(
                userId,
                { $addToSet: { completedModules: moduleId } },
                { new: true }
            );
        }

        res.json({ success: true, passed, score: scorePercentage, passingScore });
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

        // Call Groq API to generate a dynamic skill gap analysis
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return res.json({ success: false, message: 'GROQ_API_KEY not configured' });
        }

        const prompt = `You are a career counselor AI. The user's target career is "${targetCareer}". They have completed the following learning modules: ${completedModules.length > 0 ? completedModules.join(', ') : 'None'}. Provide a real-time skill gap analysis. Reply EXACTLY in the following JSON format and nothing else:
{
  "criticalGaps": [ {"name": "skill1", "level": "beginner", "category": "category1"} ],
  "needsImprovement": [ {"name": "skill2", "level": "intermediate", "category": "category2"} ],
  "validated": [ {"name": "skill3", "level": "advanced", "category": "category3"} ]
}
Make sure 'criticalGaps' contains skills they lack entirely, 'needsImprovement' contains skills they might have touched on based on modules but need more work, and 'validated' contains skills they likely acquired from their completed modules. Provide 2-4 skills per array.`;

        const payload = JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.2,
            max_tokens: 1024,
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
                    res.json({
                        success: true,
                        data: {
                            targetCareer,
                            criticalGaps: jsonRes.criticalGaps || [],
                            needsImprovement: jsonRes.needsImprovement || [],
                            validated: jsonRes.validated || [],
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
