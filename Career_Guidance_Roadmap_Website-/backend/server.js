require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
});

// Routes
app.use('/api/auth', authRoutes);

// Health Check
app.get('/', (req, res) => {
    res.json({ message: 'Xyverra API is running 🚀' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
