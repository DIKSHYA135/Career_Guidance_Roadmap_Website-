const express = require('express');
const router = express.Router();
const proAuthMiddleware = require('../middleware/proAuthMiddleware');
const InterviewSession = require('../models/InterviewSession');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.use(proAuthMiddleware); // Must be Pro

// Start a new mock interview session
router.post('/start', async (req, res) => {
    try {
        const { jobRole } = req.body;
        if (!jobRole) return res.status(400).json({ success: false, message: 'Job role is required' });

        // AI would typically generate questions here. We provide mock initial questions.
        const mockQuestions = [
            `Can you tell me about your experience with ${jobRole}?`,
            `What is a challenging problem you've faced in a previous role, and how did you solve it?`,
            `Where do you see yourself in 5 years as a ${jobRole}?`
        ].map(q => ({ question: q }));

        const session = await InterviewSession.create({
            userId: req.userDoc._id,
            jobRole,
            questionsAsked: mockQuestions
        });

        res.json({ success: true, session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to start interview' });
    }
});

// Submit answer for a specific question
router.post('/:sessionId/answer', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { questionId, answer } = req.body;

        const session = await InterviewSession.findOne({ _id: sessionId, userId: req.userDoc._id });
        if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

        const questionIndex = session.questionsAsked.findIndex(q => q._id.toString() === questionId);
        if (questionIndex === -1) return res.status(404).json({ success: false, message: 'Question not found' });

        // Generate mock AI feedback based on length of answer
        const score = Math.min(100, Math.max(10, answer.length / 2));
        const feedback = score > 50 ? "Good structure and relevant points." : "Try to be more detailed and provide specific examples.";

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
        const session = await InterviewSession.findOne({ _id: sessionId, userId: req.userDoc._id });
        if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

        const answered = session.questionsAsked.filter(q => q.score !== undefined);
        const totalScore = answered.reduce((acc, q) => acc + q.score, 0) / (answered.length || 1);

        session.overallScore = totalScore;
        session.completed = true;
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
