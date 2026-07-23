const mongoose = require('mongoose');
const User = require('./models/User');
const { recomputeAndSaveReadiness } = require('./utils/readiness');
require('dotenv').config();

async function run() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/xyverra_db');
    
    let user = await User.findOne();
    if (!user) {
        console.log("No user found");
        return process.exit(0);
    }
    
    const userId = user._id;
    const moduleId = 'web_mod1';
    const scorePercentage = 100;
    const passed = true;
    
    // Simulating submitQuiz
    let userUpdateFields = { $set: { [`quizScores.${moduleId}`]: scorePercentage } };
    if (passed) {
        userUpdateFields.$addToSet = { completedModules: moduleId };
    }
    await User.findByIdAndUpdate(userId, userUpdateFields, { new: true });
    
    const readinessScore = await recomputeAndSaveReadiness(userId);
    console.log("Simulated submitQuiz. New Readiness Score:", readinessScore);
    
    process.exit(0);
}
run();
