const mongoose = require('mongoose');

const aiConversationSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    // denormalised for fast admin queries (no join needed)
    userName: { type: String, default: '' },
    userEmail: { type: String, default: '', index: true },
    subscriptionTier: { type: String, enum: ['free', 'pro'], default: 'free' },
    messageCount: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'ended'], default: 'active' },
    endedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('AIConversation', aiConversationSchema);
