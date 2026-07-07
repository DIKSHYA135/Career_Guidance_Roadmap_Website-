const mongoose = require('mongoose');

const interviewSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    jobRole: {
        type: String,
        required: true
    },
    questionsAsked: [{
        question: String,
        userAnswer: String,
        aiFeedback: String,
        score: Number
    }],
    overallScore: {
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);
