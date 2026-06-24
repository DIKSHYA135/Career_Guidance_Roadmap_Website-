const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    moduleId: {
        type: String,
        required: true
    },
    roadmapId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['locked', 'available', 'studied', 'completed'],
        default: 'locked'
    },
    highestQuizScore: {
        type: Number,
        default: 0
    },
    timeSpentSeconds: {
        type: Number,
        default: 0
    },
    lastAccessedAt: {
        type: Date,
        default: Date.now
    }
});

progressSchema.index({ userId: 1, moduleId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
