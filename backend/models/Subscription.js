const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    planType: {
        type: String,
        enum: ['premium_monthly', 'premium_yearly'],
        default: 'premium_monthly'
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled', 'pending'],
        default: 'pending',
        index: true
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true, index: true },
    transactionRef: { type: String },
    amountPaid: { type: Number },
    currency: { type: String, default: 'NPR' }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
