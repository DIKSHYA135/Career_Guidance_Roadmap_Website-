const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    emailType: {
        type: String,
        enum: ['weekly_progress', 'monthly_progress', 'milestone_reached'],
        required: true
    },
    status: {
        type: String,
        enum: ['sent', 'failed'],
        default: 'sent'
    },
    errorDetails: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('EmailLog', emailLogSchema);
