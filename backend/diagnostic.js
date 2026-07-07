require('dotenv').config();
const mongoose = require('mongoose');

async function checkConnection() {
    console.log('--- MongoDB Diagnostic Tool ---');
    
    // 1. Check .env file
    if (!process.env.MONGO_URI) {
        console.error('❌ Step 1 Failed: MONGO_URI is missing from your .env file.');
        console.log('   Action: Create a .env file in the backend folder and add MONGO_URI=your_connection_string');
        process.exit(1);
    }
    console.log('✅ Step 1: MONGO_URI found in .env');

    // 2. Check Connection
    console.log('⏳ Step 2: Attempting to connect to MongoDB...');
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('✅ Step 2: Successfully connected to MongoDB Atlas!');
        console.log('--- All checks passed! You can run "npm run dev" now. ---');
        process.exit(0);
    } catch (err) {
        console.error('❌ Step 2 Failed: Could not connect to MongoDB.');
        console.error('   Error Message:', err.message);
        
        if (err.message.includes('IP not whitelisted') || err.message.includes('Could not connect to any servers')) {
            console.log('\n🔍 TROUBLESHOOTING:');
            console.log('1. Go to https://cloud.mongodb.com/');
            console.log('2. Network Access -> Add IP Address');
            console.log('3. Add "0.0.0.0/0" to allow access from anywhere (for testing).');
        } else if (err.message.includes('Authentication failed')) {
            console.log('\n🔍 TROUBLESHOOTING:');
            console.log('Check your database username and password in the .env file.');
        }
        process.exit(1);
    }
}

checkConnection();
