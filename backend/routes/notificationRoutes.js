const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Notification = require('../models/Notification');

router.use(authMiddleware);

// Helper: Create a notification (exported for use in other routes)
const createNotification = async (userId, { title, message, type = 'info', actionLink = '' }) => {
    try {
        return await Notification.create({ userId, title, message, type, actionLink });
    } catch (err) {
        console.error('Failed to create notification:', err);
    }
};

// GET /api/notifications — fetch all for current user
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.userId })
            .sort({ createdAt: -1 })
            .limit(50);

        const unreadCount = notifications.filter(n => !n.isRead).length;

        res.json({ success: true, notifications, unreadCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
    }
});

// PUT /api/notifications/:id/read — mark one as read
router.put('/:id/read', async (req, res) => {
    try {
        await Notification.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { isRead: true }
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to mark notification as read' });
    }
});

// PUT /api/notifications/read-all — mark all as read
router.put('/read-all', async (req, res) => {
    try {
        await Notification.updateMany(
            { userId: req.user.userId, isRead: false },
            { isRead: true }
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to mark all as read' });
    }
});

// DELETE /api/notifications/:id — delete one notification
router.delete('/:id', async (req, res) => {
    try {
        await Notification.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete notification' });
    }
});

// DELETE /api/notifications/clear-all — clear all notifications
router.delete('/clear-all', async (req, res) => {
    try {
        await Notification.deleteMany({ userId: req.user.userId });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to clear notifications' });
    }
});

// POST /api/notifications/seed — seed welcome notifications (dev only)
router.post('/seed', async (req, res) => {
    try {
        const seeds = [
            { title: 'Welcome to XYVERRA! 🎉', message: 'Your journey starts now. Complete the onboarding to unlock your personalized roadmap.', type: 'success', actionLink: 'career-discovery.html' },
            { title: 'Complete Your Profile', message: 'Add your skills and interests to get smarter AI recommendations.', type: 'info', actionLink: 'profile.html' },
            { title: 'Upgrade to Pro', message: 'Unlock unlimited AI counselor messages, mock interviews, and career analytics.', type: 'warning', actionLink: 'subscription.html' }
        ];

        for (const n of seeds) {
            await Notification.create({ userId: req.user.userId, ...n });
        }

        res.json({ success: true, message: 'Seeded notifications' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Seed failed' });
    }
});

module.exports = router;
module.exports.createNotification = createNotification;
