const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, trim: true },
    selectedPath: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    
    // NEW STRUCTURE
    profile: {
        picture: { type: String, default: '' },
        fullName: { type: String, default: '' },
        username: { type: String, default: '' },
        bio: { type: String, default: '' },
        learningGoal: { type: String, default: '' }
    },
    learningProfile: {
        category: { type: String, default: '' },
        level: { type: String, default: 'Beginner' },
        currentModule: { type: String, default: '' }
    },
    progress: {
        modulesCompleted: { type: Number, default: 0 },
        coursesCompleted: { type: Number, default: 0 },
        learningStreak: { type: Number, default: 0 },
        totalLearningHours: { type: Number, default: 0 },
        certificatesEarned: { type: Number, default: 0 },
        roadmapsGenerated: { type: Number, default: 0 }
    },
    skills: { type: [String], default: [] },
    roadmapHistory: [{
        name: String,
        category: String,
        level: String,
        date: { type: Date, default: Date.now },
        status: { type: String, default: 'In Progress' }
    }]
});

module.exports = mongoose.model('User', userSchema);
