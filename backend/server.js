const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('./models/User');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;
const BCRYPT_ROUNDS = 12;


// ==========================
// REQUIRED ENVIRONMENT VARS
// ==========================
if (!process.env.MONGO_URI) {
    console.error('❌ Error: MONGO_URI is not defined in the .env file.');
    process.exit(1);
}

// A strong, secret-only signing key is mandatory. No insecure fallback.
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) {
    console.error('❌ Error: JWT_SECRET is missing or too weak.');
    console.error('👉 Tip: Add a long random JWT_SECRET (32+ chars) to your .env file.');
    console.error('   Generate one with: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"');
    process.exit(1);
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const isProduction = process.env.NODE_ENV === 'production';

// ==========================
// SECURITY MIDDLEWARE
// ==========================
app.use(helmet());

// CORS: restrict to configured origins. ALLOWED_ORIGINS is a comma-separated list.
// Requests with no Origin (curl, mobile apps, file://) are allowed through.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        if (!origin) return callback(null, true); // non-browser or same-origin
        if (allowedOrigins.length === 0) {
            // No explicit allow-list configured: permit localhost during development only.
            if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
                return callback(null, true);
            }
            if (!isProduction) return callback(null, true);
            return callback(new Error('Not allowed by CORS'));
        }
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

// Body parsers with a sane size limit to reduce abuse
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ==========================
// REQUEST LOGGER (password-safe)
// ==========================
const SENSITIVE_KEYS = ['password', 'currentPassword', 'newPassword', 'token'];

function redactBody(body) {
    if (!body || typeof body !== 'object') return body;
    const clone = Array.isArray(body) ? [...body] : { ...body };
    for (const key of Object.keys(clone)) {
        if (SENSITIVE_KEYS.includes(key)) {
            clone[key] = '[REDACTED]';
        }
    }
    return clone;
}

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.method !== 'GET' && req.body && Object.keys(req.body).length > 0) {
        console.log('Request Body:', JSON.stringify(redactBody(req.body)));
    }
    next();
});

// ==========================
// RATE LIMITERS
// ==========================
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,                  // 20 auth attempts per window per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many attempts. Please try again later.' }
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests. Please try again later.' }
});

app.use('/api/', apiLimiter);

// ==========================
// MONGODB CONNECTION
// ==========================
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
        console.log('Using Database:', mongoose.connection.name);
        console.log('Using Collection for Users:', User.collection.name);
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        if (err.message.includes('IP not whitelisted') || err.message.includes('Could not connect to any servers')) {
            console.error('👉 Tip: Ensure your IP address is whitelisted in MongoDB Atlas.');
        } else if (err.message.includes('Authentication failed')) {
            console.error('👉 Tip: Check your database username and password in the .env file.');
        }
        process.exit(1);
    });

// ==========================
// HELPERS
// ==========================
function signToken(user) {
    return jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}

// Generic server error responder: logs detail, hides internals from the client.
function serverError(res, context, error) {
    console.error(`${context}:`, error);
    const payload = { success: false, message: 'Server error' };
    if (!isProduction) payload.error = error.message; // detail only in dev
    return res.status(500).json(payload);
}

// Validation result handler
function handleValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg
        });
    }
    next();
}

// (Auth middleware logic moved to middleware/authMiddleware.js)

// ==========================
// PUBLIC ROUTES
// ==========================
app.get('/', (req, res) => {
    res.json({ message: 'Xyverra API is running' });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        db: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        time: new Date().toISOString(),
        dbName: mongoose.connection.name
    });
});

// ==========================
// REGISTER ROUTE
// ==========================
app.post(
    '/api/auth/register',
    authLimiter,
    [
        body('email').isEmail().withMessage('A valid email is required')
            .bail().customSanitizer(v => v.trim().toLowerCase()),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
            .matches(/\d/).withMessage('Password must contain at least one number')
            .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter'),
        body('name').optional().trim().isLength({ max: 100 }),
        body('skills').optional().isArray().withMessage('Skills must be an array')
    ],
    handleValidation,
    async (req, res) => {
        try {
            const { email, password, name, skills } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                const isMatch = await bcrypt.compare(password, existingUser.password);
                if (isMatch) {
                    const now = new Date();
                    let newStreak = existingUser.dailyStreak || 1;
                    if (existingUser.lastLoginDate) {
                        const lastDate = new Date(existingUser.lastLoginDate).setHours(0,0,0,0);
                        const todayDate = now.setHours(0,0,0,0);
                        const diffCalendarDays = Math.round((todayDate - lastDate) / 86400000);
                        
                        if (diffCalendarDays === 1) {
                            newStreak += 1;
                        } else if (diffCalendarDays > 1) {
                            newStreak = 1;
                        }
                    } else {
                        newStreak = 1;
                    }
                    existingUser.dailyStreak = newStreak;
                    existingUser.lastLoginDate = now;
                    await existingUser.save();

                    const token = signToken(existingUser);
                    return res.json({
                        success: true,
                        message: 'User already exists. Logged in successfully.',
                        token,
                        user: {
                            id: existingUser._id,
                            email: existingUser.email,
                            name: existingUser.name,
                            selectedPath: existingUser.selectedPath,
                            selectedLevel: existingUser.selectedLevel,
                            skills: existingUser.skills,
                            competencyScore: existingUser.competencyScore,
                            experienceRank: existingUser.experienceRank,
                            dailyStreak: existingUser.dailyStreak,
                            lastActivePage: existingUser.lastActivePage,
                            quizScores: existingUser.quizScores,
                            completedModules: existingUser.completedModules,
                            onboardingCompleted: existingUser.onboardingCompleted || false,
                            interests: existingUser.interests || []
                        }
                    });
                } else {
                    return res.status(409).json({
                        success: false,
                        message: 'User already exists (incorrect password)'
                    });
                }
            }

            const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

            const newUser = await User.create({
                email,
                password: hashedPassword,
                name: name || email.split('@')[0],
                skills: Array.isArray(skills) ? skills : [],
                dailyStreak: 1,
                lastLoginDate: new Date()
            });

            console.log('✅ User saved successfully with ID:', newUser._id);

            const token = signToken(newUser);

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                token,
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    name: newUser.name,
                    skills: newUser.skills,
                    onboardingCompleted: false,
                    interests: []
                }
            });
        } catch (error) {
            return serverError(res, 'Registration Error', error);
        }
    }
);

// ==========================
// LOGIN ROUTE
// ==========================
app.post(
    '/api/auth/login',
    authLimiter,
    [
        body('email').isEmail().withMessage('A valid email is required')
            .bail().customSanitizer(v => v.trim().toLowerCase()),
        body('password').notEmpty().withMessage('Password is required')
    ],
    handleValidation,
    async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            // Use a generic message and always run a compare to reduce user enumeration
            // and timing differences between "no user" and "wrong password".
            if (!user) {
                await bcrypt.compare(password, '$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinv');
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const now = new Date();
            let newStreak = user.dailyStreak || 1;
            if (user.lastLoginDate) {
                const lastDate = new Date(user.lastLoginDate).setHours(0,0,0,0);
                const todayDate = now.setHours(0,0,0,0);
                const diffCalendarDays = Math.round((todayDate - lastDate) / 86400000);
                
                if (diffCalendarDays === 1) {
                    newStreak += 1;
                } else if (diffCalendarDays > 1) {
                    newStreak = 1;
                }
            } else {
                newStreak = 1;
            }
            user.dailyStreak = newStreak;
            user.lastLoginDate = now;
            await user.save();

            const token = signToken(user);

            res.json({
                success: true,
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    selectedPath: user.selectedPath,
                    selectedLevel: user.selectedLevel,
                    skills: user.skills,
                    competencyScore: user.competencyScore,
                    experienceRank: user.experienceRank,
                    dailyStreak: user.dailyStreak,
                    lastActivePage: user.lastActivePage,
                    quizScores: user.quizScores,
                    completedModules: user.completedModules,
                    onboardingCompleted: user.onboardingCompleted || false,
                    interests: user.interests || []
                }
            });
        } catch (error) {
            return serverError(res, 'Login Error', error);
        }
    }
);

// ==========================
// SAVE PATH ROUTE (auth required, scoped to token user)
// ==========================
app.post('/api/user/save-path', authMiddleware, async (req, res) => {
    try {
        const { selectedPath } = req.body;
        if (!selectedPath || typeof selectedPath !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Selected path is required'
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            { selectedPath: selectedPath.trim() },
            { returnDocument: 'after' }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.json({
            success: true,
            message: 'Path saved successfully',
            selectedPath: updatedUser.selectedPath
        });
    } catch (error) {
        return serverError(res, 'Save Path Error', error);
    }
});

// ==========================
// SAVE LEVEL ROUTE (auth required, scoped to token user)
// ==========================
app.post('/api/user/save-level', authMiddleware, async (req, res) => {
    try {
        const { selectedLevel } = req.body;
        if (!selectedLevel || typeof selectedLevel !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Selected level is required'
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            { selectedLevel: selectedLevel.trim() },
            { returnDocument: 'after' }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.json({
            success: true,
            message: 'Level saved successfully',
            selectedLevel: updatedUser.selectedLevel
        });
    } catch (error) {
        return serverError(res, 'Save Level Error', error);
    }
});

// ==========================
// SAVE SKILLS ROUTE (auth required, scoped to token user)
// ==========================
app.post('/api/user/save-skills', authMiddleware, async (req, res) => {
    try {
        const { skills } = req.body;
        if (!Array.isArray(skills)) {
            return res.status(400).json({
                success: false,
                message: 'Skills array is required'
            });
        }

        const cleanSkills = skills
            .filter(s => typeof s === 'string')
            .map(s => s.trim())
            .slice(0, 200);

        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            { skills: cleanSkills },
            { returnDocument: 'after' }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.json({
            success: true,
            message: 'Skills saved successfully',
            skills: updatedUser.skills
        });
    } catch (error) {
        return serverError(res, 'Save Skills Error', error);
    }
});

// ==========================
// GET PROFILE
// ==========================
app.get('/api/user/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        return serverError(res, 'Get Profile Error', error);
    }
});

// ==========================
// UPDATE PROFILE
// ==========================
app.put('/api/user/profile', authMiddleware, async (req, res) => {
    try {
        const allowedUpdates = ['name', 'selectedPath', 'selectedLevel', 'skills', 'dob', 'lastActivePage', 'competencyScore', 'experienceRank', 'dailyStreak', 'quizScores'];
        const updates = {};
        for (const key of Object.keys(req.body)) {
            if (allowedUpdates.includes(key)) {
                updates[key] = req.body[key];
            }
        }

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { $set: updates },
            { returnDocument: 'after', runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        return serverError(res, 'Update Profile Error', error);
    }
});

// ==========================
// SAVE QUIZ SCORE ROUTE (auth required)
// ==========================
app.post('/api/user/save-quiz', authMiddleware, async (req, res) => {
    try {
        const { skill, score } = req.body;
        if (!skill || typeof score !== 'number') {
            return res.status(400).json({ success: false, message: 'Skill and score required' });
        }
        
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        user.quizScores.set(skill, score);
        
        // Add 50 XP for completing a quiz, plus XP based on score
        user.experienceRank += 50 + Math.floor(score / 2);
        
        // Re-calculate competency score (average of all quizzes passed > 80%)
        let totalScore = 0;
        let count = 0;
        user.quizScores.forEach((val) => {
            if (val >= 80) {
                totalScore += val;
                count++;
            }
        });
        
        user.competencyScore = count > 0 ? Math.floor(totalScore / count) : user.competencyScore;
        
        // Update streak if needed (very simplified logic for now: just add 1 if they pass)
        if (score >= 80) {
            user.dailyStreak += 1;
        }

        // Also save the completed module IDs
        const skillIds = skill.split(',');
        skillIds.forEach(id => {
            if (!user.completedModules.includes(id)) {
                user.completedModules.push(id);
            }
        });

        await user.save();
        
        return res.json({
            success: true,
            message: 'Quiz saved successfully',
            experienceRank: user.experienceRank,
            competencyScore: user.competencyScore,
            dailyStreak: user.dailyStreak,
            completedModules: user.completedModules
        });
    } catch (error) {
        return serverError(res, 'Save Quiz Error', error);
    }
});

// ==========================
// SAVE COMPLETED MODULES ROUTE (auth required)
// ==========================
app.post('/api/user/save-completed-modules', authMiddleware, async (req, res) => {
    try {
        const { completedModules } = req.body;
        if (!Array.isArray(completedModules)) {
            return res.status(400).json({ success: false, message: 'completedModules must be an array' });
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Merge: add any new IDs not already present
        completedModules.forEach(id => {
            if (typeof id === 'string' && !user.completedModules.includes(id)) {
                user.completedModules.push(id);
            }
        });

        await user.save();

        return res.json({
            success: true,
            message: 'Completed modules saved',
            completedModules: user.completedModules
        });
    } catch (error) {
        return serverError(res, 'Save Completed Modules Error', error);
    }
});

// ==========================
// SAVE ONBOARDING ROUTE (auth required)
// ==========================
app.post('/api/user/save-onboarding', authMiddleware, async (req, res) => {
    try {
        const { interests, skills, selectedLevel, careerGoal, timeline, weeklyHours } = req.body;

        const updates = { onboardingCompleted: true };

        if (Array.isArray(interests)) {
            updates.interests = interests.slice(0, 20);
        }
        if (Array.isArray(skills)) {
            updates.skills = skills.filter(s => typeof s === 'string').map(s => s.trim()).slice(0, 100);
        }
        if (selectedLevel && typeof selectedLevel === 'string') {
            updates.selectedLevel = selectedLevel.trim();
        }
        if (careerGoal && typeof careerGoal === 'string') {
            updates.careerGoal = careerGoal.trim().slice(0, 300);
        }
        if (timeline && typeof timeline === 'string') {
            updates.timeline = timeline.trim();
        }
        if (weeklyHours && typeof weeklyHours === 'string') {
            updates.weeklyHours = weeklyHours.trim();
        }

        // Set selectedPath from first interest if not already set
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        if (!user.selectedPath && interests && interests.length > 0) {
            const INTEREST_TO_PATH = {
                'Web Development': 'Web Development',
                'Full Stack Development': 'Full Stack Development',
                'Backend / APIs': 'Backend / APIs',
                'Data Science': 'Data Science',
                'AI / Machine Learning': 'NLP / AI',
                'AI / ML': 'NLP / AI',
                'Cloud / DevOps': 'Cloud / DevOps',
                'UI/UX Design': 'UI/UX Design',
                'Mobile Development': 'Mobile Development',
                'Cybersecurity': 'Cybersecurity',
                'Data Analytics': 'Data Analytics',
                'AI Engineer': 'AI Engineer'
            };
            updates.selectedPath = INTEREST_TO_PATH[interests[0]] || interests[0];
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            { $set: updates },
            { returnDocument: 'after' }
        );

        return res.json({
            success: true,
            message: 'Onboarding saved successfully',
            selectedPath: updatedUser.selectedPath,
            selectedLevel: updatedUser.selectedLevel,
            onboardingCompleted: updatedUser.onboardingCompleted
        });
    } catch (error) {
        return serverError(res, 'Save Onboarding Error', error);
    }
});

// ==========================
// SAVE PAGE ROUTE (auth required)
// ==========================
app.post('/api/user/save-page', authMiddleware, async (req, res) => {
    try {
        const { lastActivePage } = req.body;
        if (!lastActivePage) {
            return res.status(400).json({ success: false, message: 'Page is required' });
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            { lastActivePage },
            { returnDocument: 'after' }
        );
        
        return res.json({
            success: true,
            lastActivePage: updatedUser.lastActivePage
        });
    } catch (error) {
        return serverError(res, 'Save Page Error', error);
    }
});

// ==========================
// CHANGE PASSWORD ROUTE
// ==========================
app.put(
    '/api/user/change-password',
    authMiddleware,
    [
        body('currentPassword').notEmpty().withMessage('Current password is required'),
        body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
    ],
    handleValidation,
    async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;

            const user = await User.findById(req.user.userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Incorrect current password' });
            }

            user.password = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
            await user.save();

            res.json({ success: true, message: 'Password updated successfully' });
        } catch (error) {
            return serverError(res, 'Change Password Error', error);
        }
    }
);

// ==========================
// 404 HANDLER
// ==========================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.url} not found on this server`
    });
});

// ==========================
// GLOBAL ERROR HANDLER
// ==========================
app.use((err, req, res, next) => {
    if (err && err.message === 'Not allowed by CORS') {
        return res.status(403).json({ success: false, message: 'Origin not allowed' });
    }
    console.error('Unhandled Error:', err);
    const payload = { success: false, message: 'Server error' };
    if (!isProduction && err) payload.error = err.message;
    res.status(500).json(payload);
});

// ==========================
// START SERVER
// ==========================
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
