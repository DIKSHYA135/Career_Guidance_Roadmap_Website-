const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
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
    scorePercentage: {
        type: Number,
        required: true
    },
    passed: {
        type: Boolean,
        required: true
    },
    totalQuestions: {
        type: Number,
        default: 0
    },
    answers: [{
        questionText: String,
        selectedOption: String,
        isCorrect: Boolean
    }]
}, { timestamps: true });

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
