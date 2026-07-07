const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    actionType: {
        type: String,
        required: true,
        enum: [
            'Login', 'Logout', 'Registration', 
            'Career Assessment Started', 'Career Assessment Completed',
            'AI Chat Usage', 'Mock Interview Started', 'Mock Interview Completed',
            'Premium Subscription Purchase', 'Other'
        ]
    },
    details: {
        type: String,
        required: false
    },
    badgeColor: {
        type: String,
        default: 'badge-blue' // e.g. badge-blue, badge-green, badge-red, badge-yellow
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
