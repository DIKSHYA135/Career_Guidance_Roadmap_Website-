const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        default: null
    },
    amountUSD: { type: Number },
    amountNPR: { type: Number, required: true },
    currency: { type: String, default: 'NPR' },
    provider: { type: String, default: 'esewa' },
    transactionRef: { type: String, required: true, unique: true, index: true },
    providerTransactionCode: { type: String, default: null },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed', 'refunded'],
        default: 'pending',
        index: true
    },
    providerResponse: { type: mongoose.Schema.Types.Mixed, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
