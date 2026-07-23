const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Progress = require('../models/Progress');
const ActivityLog = require('../models/ActivityLog');
const InterviewSession = require('../models/InterviewSession');
const AIConversation = require('../models/AIConversation');
const AIChatMessage = require('../models/AIChatMessage');
const Subscription = require('../models/Subscription');
const Transaction = require('../models/Transaction');
const QuizAttempt = require('../models/QuizAttempt');

// GET /api/admin/dashboard-stats
router.get('/dashboard-stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const activeUsersToday = await User.countDocuments({ lastLoginDate: { $gte: yesterday } });

        const premiumSubs = await Subscription.countDocuments({ status: 'active', endDate: { $gt: new Date() } });

        // Use new status field, fallback to old `completed` boolean for legacy docs
        const totalInterviews = await InterviewSession.countDocuments({
            $or: [{ status: 'completed' }, { completed: true }]
        });

        const today = new Date(); today.setHours(0,0,0,0);
        const interviewsToday = await InterviewSession.countDocuments({
            createdAt: { $gte: today },
            $or: [{ status: 'completed' }, { completed: true }]
        });

        // AI conversations from the dedicated collection
        const totalAiConversations = await AIConversation.countDocuments();
        const chatsToday = await AIConversation.countDocuments({ createdAt: { $gte: today } });

        // Average interview score
        const scoreAgg = await InterviewSession.aggregate([
            { $match: { $or: [{ status: 'completed' }, { completed: true }] } },
            { $group: { _id: null, avgScore: { $avg: '$overallScore' } } }
        ]);
        const avgInterviewScore = scoreAgg.length > 0 ? Math.round(scoreAgg[0].avgScore) : 0;

        // Average interview duration
        const durationAgg = await InterviewSession.aggregate([
            { $match: { durationSeconds: { $gt: 0 } } },
            { $group: { _id: null, avgDuration: { $avg: '$durationSeconds' } } }
        ]);
        const avgInterviewDuration = durationAgg.length > 0 ? Math.round(durationAgg[0].avgDuration) : 0;

        // Most selected career
        const careerAgg = await InterviewSession.aggregate([
            { $group: { _id: '$jobRole', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);
        const mostSelectedCareer = careerAgg.length > 0 ? careerAgg[0]._id : 'N/A';

        // Free vs Pro AI usage
        const proChats = await AIConversation.countDocuments({ subscriptionTier: 'pro' });
        const freeChats = totalAiConversations - proChats;

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
            data: {
                totalUsers, activeUsersToday, premiumSubs, totalInterviews, interviewsToday,
                totalAiConversations, chatsToday, avgInterviewScore, avgInterviewDuration,
                mostSelectedCareer, proChats, freeChats, revenue,
                registrationTrend, careerInterests
            }
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
            .select('name email isAdmin createdAt emailVerified selectedPath selectedLevel skills completedModules quizScores studiedLessons lastLoginDate chatMessagesUsed dailyStreak recommendedCareers readinessScore')
            .sort({ createdAt: -1 })
            .limit(1000)
            .lean();

        const userIds = users.map(u => u._id);

        const allProgress = await Progress.find({ userId: { $in: userIds } })
            .select('userId moduleId roadmapId status highestQuizScore lastAccessedAt')
            .lean();

        const progressByUser = {};
        allProgress.forEach(p => {
            const uid = p.userId.toString();
            if (!progressByUser[uid]) progressByUser[uid] = [];
            progressByUser[uid].push(p);
        });

        const enriched = users.map(u => {
            const userProgress = progressByUser[u._id.toString()] || [];

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

            const quizScoresFromProgress = {};
            userProgress
                .filter(p => p.highestQuizScore > 0)
                .forEach(p => { quizScoresFromProgress[p.moduleId] = p.highestQuizScore; });

            const quizCount = u.quizScores ? Object.keys(u.quizScores).length : 0;
            const studiedLessonsCount = u.studiedLessons ? Object.keys(u.studiedLessons).length : 0;

            return { ...u, progressRecords, quizScoresFromProgress, quizCount, studiedLessonsCount };
        });

        res.json({ success: true, users: enriched });
    } catch (error) {
        console.error('Admin Users Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching users' });
    }
});

// GET /api/admin/user/:id/detailed — Get detailed info for a single user
router.get('/user/:id/detailed', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('+chatHistory').lean();
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const subscriptions = await Subscription.find({ userId }).sort({ createdAt: -1 }).lean();
        for (let sub of subscriptions) {
            const tx = await Transaction.findOne({ subscriptionId: sub._id }).lean();
            sub.transaction = tx || null;
        }

        const quizAttempts = await QuizAttempt.find({ userId }).sort({ createdAt: -1 }).lean();
        const interviews = await InterviewSession.find({ userId }).sort({ createdAt: -1 }).lean();
        const activityLogs = await ActivityLog.find({ userId }).sort({ timestamp: -1 }).lean();
        const progressRecords = await Progress.find({ userId }).sort({ lastAccessedAt: -1 }).lean();
        const chatHistory = user.chatHistory || [];

        // Also fetch AI conversations from the new collection
        const aiConversations = await AIConversation.find({ userId }).sort({ createdAt: -1 }).limit(20).lean();

        res.json({ success: true, user, subscriptions, quizAttempts, interviews, activityLogs, chatHistory, progressRecords, aiConversations });
    } catch (error) {
        console.error('Admin User Detailed Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching user details' });
    }
});

// GET /api/admin/subscriptions
router.get('/subscriptions', async (req, res) => {
    try {
        const subscriptions = await Subscription.find().sort({ createdAt: -1 }).limit(500).lean();

        const subIds = subscriptions.map(s => s._id);
        const userIds = [...new Set(subscriptions.map(s => s.userId?.toString()).filter(Boolean))];
        const [users, transactions] = await Promise.all([
            User.find({ _id: { $in: userIds } }).select('name email').lean(),
            Transaction.find({ subscriptionId: { $in: subIds } }).lean()
        ]);
        const userById = new Map(users.map(u => [u._id.toString(), u]));
        const txBySubId = new Map(transactions.map(t => [t.subscriptionId?.toString(), t]));

        const enriched = subscriptions.map(sub => {
            const user = userById.get(sub.userId?.toString());
            const tx = txBySubId.get(sub._id.toString());
            return {
                ...sub,
                userName: user ? user.name : 'Unknown',
                userEmail: user ? user.email : 'Unknown',
                amountPaid: tx ? tx.amountNPR : null,
                paymentMethod: tx ? tx.paymentMethod : null,
                transactionId: tx ? tx.transactionId : null,
                paymentStatus: tx ? tx.status : null
            };
        });

        res.json({ success: true, subscriptions: enriched });
    } catch (error) {
        console.error('Admin Subscriptions Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching subscriptions' });
    }
});

// ─────────────────────────────────────────
// INTERVIEW HISTORY ENDPOINTS
// ─────────────────────────────────────────

// GET /api/admin/interviews — paginated, filterable
router.get('/interviews', async (req, res) => {
    try {
        const { page = 1, limit = 20, search, jobRole, interviewType, status, dateFrom, dateTo } = req.query;
        const filter = {};
        if (jobRole) filter.jobRole = { $regex: jobRole, $options: 'i' };
        if (interviewType) filter.interviewType = interviewType;
        if (status) filter.status = status;
        if (dateFrom || dateTo) {
            filter.createdAt = {};
            if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
            if (dateTo) filter.createdAt.$lte = new Date(dateTo + 'T23:59:59');
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Batch fetch — no N+1
        const [interviews, total] = await Promise.all([
            InterviewSession.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
            InterviewSession.countDocuments(filter)
        ]);

        const userIds = [...new Set(interviews.map(i => i.userId?.toString()).filter(Boolean))];
        const users = await User.find({ _id: { $in: userIds } }).select('name email').lean();
        const userById = new Map(users.map(u => [u._id.toString(), u]));

        let enriched = interviews.map(int => {
            const user = userById.get(int.userId?.toString());
            return {
                ...int,
                userName: user ? user.name : 'Unknown',
                userEmail: user ? user.email : 'Unknown'
            };
        });

        // Search by name or email (done in memory after join)
        if (search) {
            const s = search.toLowerCase();
            enriched = enriched.filter(i =>
                (i.userName || '').toLowerCase().includes(s) ||
                (i.userEmail || '').toLowerCase().includes(s)
            );
        }

        res.json({ success: true, interviews: enriched, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
    } catch (error) {
        console.error('Admin Interviews Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching interviews' });
    }
});

// GET /api/admin/interviews/:id — Full transcript for a single session
router.get('/interviews/:id', async (req, res) => {
    try {
        const session = await InterviewSession.findById(req.params.id).lean();
        if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
        const user = await User.findById(session.userId).select('name email').lean();
        res.json({ success: true, session: { ...session, userName: user?.name, userEmail: user?.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// DELETE /api/admin/interviews/:id
router.delete('/interviews/:id', async (req, res) => {
    try {
        await InterviewSession.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Interview session deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─────────────────────────────────────────
// AI CHAT HISTORY ENDPOINTS
// ─────────────────────────────────────────

// GET /api/admin/ai-chats — paginated conversations list
router.get('/ai-chats', async (req, res) => {
    try {
        const { page = 1, limit = 20, search, tier, dateFrom, dateTo } = req.query;
        const filter = {};
        if (tier) filter.subscriptionTier = tier;
        if (dateFrom || dateTo) {
            filter.createdAt = {};
            if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
            if (dateTo) filter.createdAt.$lte = new Date(dateTo + 'T23:59:59');
        }
        if (search) {
            filter.$or = [
                { userEmail: { $regex: search, $options: 'i' } },
                { userName: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [conversations, total] = await Promise.all([
            AIConversation.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
            AIConversation.countDocuments(filter)
        ]);

        res.json({ success: true, conversations, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
    } catch (error) {
        console.error('Admin AI Chats Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching AI chats' });
    }
});

// GET /api/admin/ai-chats/:conversationId/messages — Full transcript
router.get('/ai-chats/:conversationId/messages', async (req, res) => {
    try {
        const messages = await AIChatMessage.find({ conversationId: req.params.conversationId })
            .sort({ createdAt: 1 }).lean();
        res.json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// DELETE /api/admin/ai-chats/:conversationId
router.delete('/ai-chats/:conversationId', async (req, res) => {
    try {
        await Promise.all([
            AIConversation.findOneAndDelete({ conversationId: req.params.conversationId }),
            AIChatMessage.deleteMany({ conversationId: req.params.conversationId })
        ]);
        res.json({ success: true, message: 'Conversation deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// GET /api/admin/chat-logs — Legacy endpoint (old chatHistory on User doc) kept for backward compat
router.get('/chat-logs', async (req, res) => {
    try {
        const users = await User.find({ $expr: { $gt: [{ $size: { $ifNull: ['$chatHistory', []] } }, 0] } })
            .select('name email chatHistory chatMessagesUsed')
            .limit(500)
            .lean();

        const chatLogs = users.map(u => ({
            userId: u._id,
            userName: u.name || 'Unknown',
            userEmail: u.email || 'Unknown',
            totalMessages: u.chatMessagesUsed || 0,
            chatHistory: (u.chatHistory || []).slice(-100)
        }));

        res.json({ success: true, chatLogs });
    } catch (error) {
        console.error('Admin Chat Logs Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching chat logs' });
    }
});

module.exports = router;


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
            .select('name email isAdmin createdAt emailVerified selectedPath selectedLevel skills completedModules quizScores studiedLessons lastLoginDate chatMessagesUsed dailyStreak recommendedCareers readinessScore')
            .sort({ createdAt: -1 })
            .limit(1000) // safety cap — prevents unbounded memory growth as the user base scales
            .lean();

        const userIds = users.map(u => u._id);

        // Fetch progress records for exactly these users in one query, then group by userId
        // (much faster than N queries, and bounded instead of loading the whole collection)
        const allProgress = await Progress.find({ userId: { $in: userIds } })
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

// GET /api/admin/user/:id/detailed — Get detailed info for a single user
router.get('/user/:id/detailed', async (req, res) => {
    try {
        const userId = req.params.id;
        // Fetch user with chatHistory included
        const user = await User.findById(userId).select('+chatHistory').lean();
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const subscriptions = await Subscription.find({ userId }).sort({ createdAt: -1 }).lean();
        // Attach transactions to subscriptions
        for (let sub of subscriptions) {
            const tx = await Transaction.findOne({ subscriptionId: sub._id }).lean();
            sub.transaction = tx || null;
        }

        const quizAttempts = await QuizAttempt.find({ userId }).sort({ createdAt: -1 }).lean();
        const interviews = await InterviewSession.find({ userId }).sort({ createdAt: -1 }).lean();
        const activityLogs = await ActivityLog.find({ userId }).sort({ timestamp: -1 }).lean();
        const progressRecords = await Progress.find({ userId }).sort({ lastAccessedAt: -1 }).lean();
        // chatHistory is stored on the user document itself
        const chatHistory = user.chatHistory || [];

        res.json({
            success: true,
            user,
            subscriptions,
            quizAttempts,
            interviews,
            activityLogs,
            chatHistory,
            progressRecords
        });
    } catch (error) {
        console.error('Admin User Detailed Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching user details' });
    }
});

// GET /api/admin/subscriptions — Full list of all subscriptions with user & payment info
router.get('/subscriptions', async (req, res) => {
    try {
        const subscriptions = await Subscription.find()
            .sort({ createdAt: -1 })
            .limit(500) // safety cap
            .lean();

        // Batch-fetch users and transactions for these subscriptions in 2 queries
        // total instead of 2 queries per row (N+1).
        const subIds = subscriptions.map(s => s._id);
        const userIds = [...new Set(subscriptions.map(s => s.userId?.toString()).filter(Boolean))];
        const [users, transactions] = await Promise.all([
            User.find({ _id: { $in: userIds } }).select('name email').lean(),
            Transaction.find({ subscriptionId: { $in: subIds } }).lean()
        ]);
        const userById = new Map(users.map(u => [u._id.toString(), u]));
        const txBySubId = new Map(transactions.map(t => [t.subscriptionId?.toString(), t]));

        const enriched = subscriptions.map(sub => {
            const user = userById.get(sub.userId?.toString());
            const tx = txBySubId.get(sub._id.toString());
            return {
                ...sub,
                userName: user ? user.name : 'Unknown',
                userEmail: user ? user.email : 'Unknown',
                amountPaid: tx ? tx.amountNPR : null,
                paymentMethod: tx ? tx.paymentMethod : null,
                transactionId: tx ? tx.transactionId : null,
                paymentStatus: tx ? tx.status : null
            };
        });

        res.json({ success: true, subscriptions: enriched });
    } catch (error) {
        console.error('Admin Subscriptions Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching subscriptions' });
    }
});

// GET /api/admin/interviews — Full list of all interviews with user info
router.get('/interviews', async (req, res) => {
    try {
        const interviews = await InterviewSession.find()
            .sort({ createdAt: -1 })
            .limit(500) // safety cap
            .lean();

        // Batch-fetch users for these interviews in 1 query instead of N (N+1).
        const userIds = [...new Set(interviews.map(i => i.userId?.toString()).filter(Boolean))];
        const users = await User.find({ _id: { $in: userIds } }).select('name email').lean();
        const userById = new Map(users.map(u => [u._id.toString(), u]));

        const enriched = interviews.map(int => {
            const user = userById.get(int.userId?.toString());
            return {
                ...int,
                userName: user ? user.name : 'Unknown',
                userEmail: user ? user.email : 'Unknown'
            };
        });

        res.json({ success: true, interviews: enriched });
    } catch (error) {
        console.error('Admin Interviews Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching interviews' });
    }
});

// GET /api/admin/chat-logs — All users' chat histories for admin oversight
router.get('/chat-logs', async (req, res) => {
    try {
        // Pull all users who have at least 1 chat message
        const users = await User.find({ $expr: { $gt: [{ $size: { $ifNull: ['$chatHistory', []] } }, 0] } })
            .select('name email chatHistory chatMessagesUsed')
            .limit(500) // safety cap
            .lean();

        const chatLogs = users.map(u => ({
            userId: u._id,
            userName: u.name || 'Unknown',
            userEmail: u.email || 'Unknown',
            totalMessages: u.chatMessagesUsed || 0,
            chatHistory: (u.chatHistory || []).slice(-100) // last 100 messages per user
        }));

        res.json({ success: true, chatLogs });
    } catch (error) {
        console.error('Admin Chat Logs Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching chat logs' });
    }
});

module.exports = router;
