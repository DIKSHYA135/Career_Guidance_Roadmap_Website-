const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    status: {
        type: String,
        enum: ['subscribed', 'unsubscribed'],
        default: 'subscribed'
    },
    source: {
        type: String,
        default: 'landing_page'
    }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
