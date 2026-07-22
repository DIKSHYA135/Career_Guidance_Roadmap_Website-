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
        required: true
    },

    name: {
        type: String,
        trim: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    activeSubscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        default: null
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

    dob: {
        type: String,
        default: null
    },

    competencyScore: {
        type: Number,
        default: 0
    },

    // Canonical Job Readiness Score (0-100) — single source of truth,
    // recomputed server-side whenever progress-affecting data changes.
    // See backend/utils/readiness.js for the formula.
    readinessScore: {
        type: Number,
        default: 0
    },

    // Individual completed-lesson ids (finer-grained than completedModules,
    // which only tracks whole-module quiz completion). Format matches the
    // frontend's courseId scheme: `${moduleId}_${courseName}`.
    completedLessons: {
        type: [String],
        default: []
    },

    experienceRank: {
        type: Number,
        default: 0
    },

    dailyStreak: {
        type: Number,
        default: 0
    },

    lastActivePage: {
        type: String,
        default: 'login.html'
    },

    lastLoginDate: {
        type: Date,
        default: null
    },

    completedModules: {
        type: [String],
        default: []
    },

    quizScores: {
        type: Map,
        of: Number,
        default: {}
    },

    // Onboarding questionnaire answers
    interests: {
        type: [String],
        default: []
    },


    timeline: {
        type: String,
        default: null
    },

    weeklyHours: {
        type: String,
        default: null
    },

    onboardingCompleted: {
        type: Boolean,
        default: false
    },

    // ==========================
    // Email verification (OTP)
    // ==========================
    emailVerified: {
        type: Boolean,
        default: false
    },

    emailVerificationOTP: {
        type: String,
        default: null
    },

    emailVerificationExpiry: {
        type: Date,
        default: null
    },

    // ==========================
    // Password Reset
    // ==========================
    resetPasswordToken: {
        type: String,
        default: null
    },

    resetPasswordExpire: {
        type: Date,
        default: null
    },

    // ==========================
    // Chat usage / subscription
    // ==========================
    chatMessagesUsed: {
        type: Number,
        default: 0
    },

    chatSubscriptionActive: {
        type: Boolean,
        default: false
    },

    chatSubscriptionExpiry: {
        type: Date,
        default: null
    },

    // ==========================
    // Extended profile fields
    // ==========================

    profilePicture: {
        type: String, // base64 string or URL
        default: null
    },


    careerInterests: {
        type: [String],
        default: []
    },

    // Career Discovery questionnaire results (persisted so admin can audit them
    // and so results survive across devices — previously localStorage-only)
    careerAssessmentAnswers: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },

    recommendedCareers: {
        type: [{
            career: String,
            match: Number,
            reason: String
        }],
        default: []
    },

    // Persisted lesson study records (courseId -> Unix timestamp of last study)
    studiedLessons: {
        type: Map,
        of: Number,
        default: {}
    },

    // Persisted AI chat history (array of {role, content, timestamp})
    chatHistory: {
        type: [{
            role: { type: String, enum: ['user', 'assistant'], required: true },
            content: { type: String, required: true },
            timestamp: { type: Number, default: Date.now }
        }],
        default: []
    },

    // ==========================
    // Pro Features
    // ==========================
    emailReportsEnabled: {
        type: Boolean,
        default: false
    },

    interviewPrepStats: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    },

    analyticsData: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
