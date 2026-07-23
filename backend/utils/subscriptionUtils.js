// Centralized utility to check if a user has an active Pro subscription.
// We check both the legacy fields and the relational Subscription model.

function isSubscriptionActive(user) {
    if (!user) return false;

    // 1. Check legacy direct-on-user fields
    const hasLegacySub = user.chatSubscriptionActive &&
        user.chatSubscriptionExpiry &&
        new Date(user.chatSubscriptionExpiry) > new Date();

    if (hasLegacySub) return true;

    // 2. Check relational Subscription model (if populated)
    if (user.activeSubscription) {
        const sub = user.activeSubscription;
        // Handle both plain JS objects and Mongoose docs
        const status = sub.status || sub.subscriptionStatus;
        const endDate = sub.endDate || sub.currentPeriodEnd;

        if (status === 'active' && endDate && new Date(endDate) > new Date()) {
            return true;
        }
    }

    return false;
}

module.exports = {
    isSubscriptionActive
};
