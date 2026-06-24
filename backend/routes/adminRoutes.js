const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Progress = require('../models/Progress');
const ActivityLog = require('../models/ActivityLog');
const InterviewSession = require('../models/InterviewSession');
const Subscription = require('../models/Subscription');
const Transaction = require('../models/Transaction');

// GET /api/admin/dashboard-stats
router.get('/dashboard-stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const activeUsersToday = await User.countDocuments({ lastLoginDate: { $gte: yesterday } });

        const premiumSubs = await Subscription.countDocuments({ status: 'active', endDate: { $gt: new Date() } });

        const totalInterviews = await InterviewSession.countDocuments({ completed: true });

        const chatAggregation = await User.aggregate([{ $group: { _id: null, totalChats: { $sum: "$chatMessagesUsed" } } }]);
        const totalAiChats = chatAggregation.length > 0 ? chatAggregation[0].totalChats : 0;

        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const registrationTrendRaw = await User.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        const registrationTrend = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
            const dateStr = d.toISOString().split('T')[0];
            const found = registrationTrendRaw.find(x => x._id === dateStr);
            registrationTrend.push({ date: dateStr, count: found ? found.count : 0 });
        }

        const careerInterests = await User.aggregate([
            { $match: { selectedPath: { $exists: true, $ne: null } } },
            { $group: { _id: "$selectedPath", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        const revenueAgg = await Transaction.aggregate([
            { $match: { status: 'success' } },
            { $group: { _id: null, total: { $sum: '$amountNPR' } } }
        ]);
        const revenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

        res.json({
            success: true,
            data: { totalUsers, activeUsersToday, premiumSubs, totalInterviews, totalAiChats, revenue, registrationTrend, careerInterests }
        });

    } catch (error) {
        console.error('Admin Dashboard Stats Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching stats' });
    }
});

// GET /api/admin/activity-logs
router.get('/activity-logs', async (req, res) => {
    try {
        const logs = await ActivityLog.find().sort({ timestamp: -1 }).limit(20);
        res.json({ success: true, logs });
    } catch (error) {
        console.error('Admin Activity Logs Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching logs' });
    }
});

// GET /api/admin/users — enriched with per-user Progress records
router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
            .select('name email isAdmin createdAt emailVerified selectedPath completedModules quizScores studiedLessons lastLoginDate chatMessagesUsed')
            .lean();

        // Fetch ALL progress records in one query, then group by userId (much faster than N queries)
        const allProgress = await Progress.find({})
            .select('userId moduleId roadmapId status highestQuizScore lastAccessedAt')
            .lean();

        // Group progress records by userId string
        const progressByUser = {};
        allProgress.forEach(p => {
            const uid = p.userId.toString();
            if (!progressByUser[uid]) progressByUser[uid] = [];
            progressByUser[uid].push(p);
        });

        // Enrich each user with their progress
        const enriched = users.map(u => {
            const userProgress = progressByUser[u._id.toString()] || [];

            // Studied/Completed modules from Progress collection
            const progressRecords = userProgress
                .filter(p => p.status === 'studied' || p.status === 'completed')
                .map(p => ({
                    moduleId: p.moduleId,
                    roadmapId: p.roadmapId,
                    status: p.status,
                    quizScore: p.highestQuizScore || 0,
                    lastAccessed: p.lastAccessedAt
                }))
                .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));

            // Quiz scores from Progress (any module with highestQuizScore > 0)
            const quizScoresFromProgress = {};
            userProgress
                .filter(p => p.highestQuizScore > 0)
                .forEach(p => {
                    quizScoresFromProgress[p.moduleId] = p.highestQuizScore;
                });

            // quizScores and studiedLessons are Maps stored as objects after .lean()
            const quizCount = u.quizScores ? Object.keys(u.quizScores).length : 0;
            const studiedLessonsCount = u.studiedLessons ? Object.keys(u.studiedLessons).length : 0;

            return {
                ...u,
                progressRecords,
                quizScoresFromProgress,
                quizCount,
                studiedLessonsCount
            };
        });

        res.json({ success: true, users: enriched });
    } catch (error) {
        console.error('Admin Users Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching users' });
    }
});

module.exports = router;
