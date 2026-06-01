require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });

// Home Route
app.get('/', (req, res) => {
    res.json({ message: "Works" });
});

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        db: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        time: new Date().toISOString()
    });
});
// Auth Middleware
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

app.get('/', async(req, res) => {
    try{
        res.status(200).json({message: "Works"});
    }
    catch (error) {
        console.log("Error in server while creating user");
        res.status(500).json({ message: 'Server error', error: error.message });
}});

// ==========================
// REGISTER ROUTE
// ==========================
app.post('/api/auth/register', async (req, res) => {
    console.log('Registration attempt for:', req.body.email);

    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            name: name || email.split('@')[0]
        });

        await newUser.save();

        const token = jwt.sign(
            {
                userId: newUser._id,
                email: newUser.email
            },
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name
            }
        });

    } catch (error) {
        console.error('Registration Error:', error);

        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// ==========================
// LOGIN ROUTE
// ==========================
app.post('/api/auth/login', async (req, res) => {
    console.log('Login attempt for:', req.body.email);

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                selectedPath: user.selectedPath
            }
        });

    } catch (error) {
        console.error('Login Error:', error);

        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// ==========================
// SAVE PATH ROUTE
// ==========================
app.post('/api/user/save-path', async (req, res) => {
    try {
        const { email, selectedPath } = req.body;
        console.log(`Saving path "${selectedPath}" for: ${email}`);

        if (!email || !selectedPath) {
            return res.status(400).json({
                success: false,
                message: 'Email and selected path are required'
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        const updatedUser = await User.findOneAndUpdate(
            { email: cleanEmail },
            { selectedPath },
            { new: true }
        );

        if (!updatedUser) {
            console.warn(`User not found for path save: ${cleanEmail}`);
            return res.status(404).json({
                success: false,
                message: 'User not found in database'
            });
        }

        return res.json({
            success: true,
            message: 'Path saved successfully',
            selectedPath: updatedUser.selectedPath
        });

    } catch (error) {
        console.error('Save Path Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while saving path',
            error: error.message
        });
    }
});

// ==========================
// SAVE LEVEL ROUTE
// ==========================
app.post('/api/user/save-level', async (req, res) => {
    try {
        const { email, selectedLevel } = req.body;
        console.log(`Saving level "${selectedLevel}" for: ${email}`);

        if (!email || !selectedLevel) {
            return res.status(400).json({
                success: false,
                message: 'Email and selected level are required'
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        const updatedUser = await User.findOneAndUpdate(
            { email: cleanEmail },
            { selectedLevel },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.json({
            success: true,
            message: 'Level saved successfully',
            selectedLevel: updatedUser.selectedLevel
        });

    } catch (error) {
        console.error('Save Level Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while saving level',
            error: error.message
        });
    }
// GET Profile
app.get('/api/user/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// PUT Profile (Update)
app.put('/api/user/profile', authMiddleware, async (req, res) => {
    try {
        // Only allow updating specific fields
        const allowedUpdates = ['profile', 'learningProfile', 'progress', 'skills', 'roadmapHistory', 'name'];
        const updates = {};
        for (const key of Object.keys(req.body)) {
            if (allowedUpdates.includes(key)) {
                updates[key] = req.body[key];
            }
        }
        
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { $set: updates },
            { new: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

});

// ==========================
// SAVE SKILLS ROUTE
// ==========================
app.post('/api/user/save-skills', async (req, res) => {
    try {
        const { email, skills } = req.body;
        console.log(`Saving skills for: ${email}`, skills);

        if (!email || !Array.isArray(skills)) {
            return res.status(400).json({
                success: false,
                message: 'Email and skills array are required'
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        const updatedUser = await User.findOneAndUpdate(
            { email: cleanEmail },
            { skills },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.json({
            success: true,
            message: 'Skills saved successfully',
            skills: updatedUser.skills
        });

    } catch (error) {
        console.error('Save Skills Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while saving skills',
            error: error.message
        });
    }
});

// ==========================
// 404 HANDLER (MUST BE LAST)
// ==========================
app.use((req, res) => {
    console.warn(`404 Not Found: ${req.method} ${req.url}`);
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.url} not found on this server`
    });
});

// ==========================
// START SERVER
// ==========================
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});