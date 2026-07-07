const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        
        const user = await User.findById(req.user.userId).select('isAdmin');
        if (!user || !user.isAdmin) {
            return res.status(403).json({ success: false, message: 'Access denied. Admin only.' });
        }
        next();
    } catch (err) {
        console.error('Admin Middleware Error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = adminMiddleware;
