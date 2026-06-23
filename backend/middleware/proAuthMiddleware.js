const User = require('../models/User');

const proAuthMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).populate('activeSubscription');
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // We check if the user has an active subscription either via activeSubscription 
        // or the legacy chatSubscriptionActive field.
        const hasLegacySub = user.chatSubscriptionActive && 
            (!user.chatSubscriptionExpiry || new Date(user.chatSubscriptionExpiry).getTime() > Date.now());
            
        const hasNewSub = user.activeSubscription && 
            user.activeSubscription.status === 'active' && 
            new Date(user.activeSubscription.endDate).getTime() > Date.now();

        if (!hasLegacySub && !hasNewSub) {
            return res.status(403).json({ 
                success: false, 
                message: 'This feature requires a Pro subscription.',
                requiresPro: true 
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
