const mongoose = require('mongoose');

const interviewSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    jobRole: { type: String, required: true, index: true },
    interviewType: {
        type: String,
        enum: ['Technical', 'HR', 'Behavioral', 'Mixed'],
        default: 'Mixed'
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Intermediate'
    },
    questionsAsked: [{
        question: String,
        userAnswer: String,
        aiFeedback: String,
        score: Number
    }],
    overallScore: { type: Number, default: 0 },
    durationSeconds: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['in-progress', 'completed', 'abandoned'],
        default: 'in-progress'
    }
}, { timestamps: true });

// Index for admin queries
interviewSessionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);
