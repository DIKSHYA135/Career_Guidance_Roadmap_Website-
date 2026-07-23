const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isSubscriptionActive } = require('../utils/subscriptionUtils');

const proAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).populate('activeSubscription');
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Live check against the database
        if (!isSubscriptionActive(user)) {
            // Include isPro in the response so the frontend knows it was revoked
            return res.status(403).json({ 
                success: false, 
                requiresPro: true,
                isPro: false,
                message: 'Active Xyverra Pro subscription required'
            });
        }

        // Add user object to request for downstream handlers
        req.userDoc = user; 
        next();
    } catch (error) {
        console.error('Pro Auth Middleware Error:', error);
        res.status(500).json({ success: false, message: 'Server error during authorization' });
    }
};

module.exports = proAuthMiddleware;
