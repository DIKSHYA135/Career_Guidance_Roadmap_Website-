const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    careerPath: {
        type: String,
        required: true
    },
    currentLevel: {
        type: String,
        required: true
    },
    generatedContent: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
