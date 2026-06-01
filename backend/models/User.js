const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    name: {
        type: String,
        trim: true
    },

    selectedPath: {
        type: String,
        default: null
    },

    selectedLevel: {
        type: String,
        default: null
    },

    skills: {
        type: [String],
        default: []
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);