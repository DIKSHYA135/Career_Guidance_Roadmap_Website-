const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: true,
        index: true
    },
    questions: [{
        questionText: String,
        options: [String],
        correctAnswerIndex: Number,
        explanation: String
    }],
    passingScorePercentage: {
        type: Number,
        default: 70
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Quiz', quizSchema);
