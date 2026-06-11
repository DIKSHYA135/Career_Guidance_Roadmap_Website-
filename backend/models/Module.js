const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    roadmapId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roadmap',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    orderIndex: {
        type: Number,
        required: true
    },
    contentUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Module', moduleSchema);
