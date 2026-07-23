const express = require('express');
const router = express.Router();
const proAuthMiddleware = require('../middleware/proAuthMiddleware');
const InterviewSession = require('../models/InterviewSession');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.use(proAuthMiddleware); // Must be Pro

// Get past interview history
router.get('/history', async (req, res) => {
    try {
        const history = await InterviewSession.find({ userId: req.userDoc._id, completed: true })
            .sort({ createdAt: -1 });
        res.json({ success: true, history });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch history' });
    }
});

// Start a new mock interview session
router.post('/start', async (req, res) => {
    try {
        const { jobRole, interviewType, difficulty } = req.body;
        if (!jobRole) return res.status(400).json({ success: false, message: 'Job role is required' });

        const mockQuestions = [
            `Can you tell me about your experience with ${jobRole}?`,
            `What is a challenging problem you've faced in a previous role, and how did you solve it?`,
            `What are your greatest strengths and how do they align with a ${jobRole} position?`,
            `Describe a time you disagreed with a team member. How did you handle it?`,
            `What tools and technologies are you most proficient in for this role?`,
            `How do you stay updated with the latest trends and developments in your field?`,
            `Where do you see yourself in 5 years as a ${jobRole}?`,
            `Finally, why should we hire you for this role?`
        ].map(q => ({ question: q }));

        const session = await InterviewSession.create({
            userId: req.userDoc._id,
            jobRole,
            interviewType: interviewType || 'Mixed',
            difficulty: difficulty || 'Intermediate',
            questionsAsked: mockQuestions,
            startedAt: new Date(),
            status: 'in-progress'
        });

        res.json({ success: true, session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to start interview' });
    }
});

const { callGroqChat } = require('../utils/groqClient');

// Submit answer for a specific question
router.post('/:sessionId/answer', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { questionId, answer } = req.body;

        const session = await InterviewSession.findOne({ _id: sessionId, userId: req.userDoc._id });
        if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

        const questionIndex = session.questionsAsked.findIndex(q => q._id.toString() === questionId);
        if (questionIndex === -1) return res.status(404).json({ success: false, message: 'Question not found' });

        const questionText = session.questionsAsked[questionIndex].question;

        // Generate AI feedback using Groq
        const prompt = `You are an expert technical interviewer for a ${session.jobRole} position. 
The candidate was asked the following question:
"${questionText}"

The candidate provided the following answer:
"${answer}"

Evaluate the candidate's answer. Provide a score out of 100 based on accuracy, completeness, and communication. 
Also provide a brief, refined, and highly detailed feedback paragraph explaining what they did well and how they could improve.

You MUST respond with ONLY a valid JSON object in the exact format below, with no additional text or markdown formatting:
{
  "score": <number>,
  "feedback": "<string>"
}`;

        let score = 50; // Fallback score
        let feedback = "Feedback could not be generated at this time."; // Fallback feedback

        try {
            const aiResponseText = await callGroqChat([
                { role: 'system', content: 'You are an expert technical interviewer. Always output valid JSON.' },
                { role: 'user', content: prompt }
            ]);

            if (aiResponseText) {
                // Attempt to parse JSON response. The AI might wrap it in markdown.
                const cleanJson = aiResponseText.replace(/```json\n?/, '').replace(/```/, '').trim();
                const parsed = JSON.parse(cleanJson);
                if (typeof parsed.score === 'number' && parsed.feedback) {
                    score = parsed.score;
                    feedback = parsed.feedback;
                }
            }
        } catch (e) {
            console.error('Failed to parse Groq response for interview feedback:', e);
            // Fallback to basic length-based if AI fails entirely
            score = Math.min(100, Math.max(10, answer.length / 2));
            feedback = score > 50 ? "Good structure and relevant points, but we couldn't generate detailed AI feedback." : "Try to be more detailed and provide specific examples.";
        }

        session.questionsAsked[questionIndex].userAnswer = answer;
        session.questionsAsked[questionIndex].aiFeedback = feedback;
        session.questionsAsked[questionIndex].score = score;
        
        await session.save();

        res.json({ 
            success: true, 
            feedback,
            score
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to submit answer' });
    }
});

// Complete interview
router.post('/:sessionId/complete', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { durationSeconds } = req.body;
        const session = await InterviewSession.findOne({ _id: sessionId, userId: req.userDoc._id });
        if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

        const answered = session.questionsAsked.filter(q => q.score !== undefined);
        const totalScore = answered.reduce((acc, q) => acc + q.score, 0) / (answered.length || 1);

        session.overallScore = totalScore;
        session.status = 'completed';
        if (durationSeconds) session.durationSeconds = durationSeconds;
        await session.save();

        // Update user stats
        req.userDoc.interviewPrepStats = req.userDoc.interviewPrepStats || new Map();
        req.userDoc.interviewPrepStats.set('lastScore', totalScore);
        req.userDoc.interviewPrepStats.set('completedInterviews', (req.userDoc.interviewPrepStats.get('completedInterviews') || 0) + 1);
        await req.userDoc.save();

        res.json({ success: true, session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to complete interview' });
    }
});

module.exports = router;
