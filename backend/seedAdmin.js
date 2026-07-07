require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function checkAndSeedAdmin() {
    try {
        console.log('Connecting to:', process.env.MONGO_URI?.substring(0, 50) + '...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected! DB Name:', mongoose.connection.name);

        // Use the User collection directly to avoid any model issues
        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        // Check if admin exists
        const existing = await usersCollection.findOne({ email: 'admin@xyverra.com' });
        
        if (existing) {
            console.log('Admin found! ID:', existing._id);
            console.log('isAdmin flag:', existing.isAdmin);
            // Force update isAdmin to true just in case
            if (!existing.isAdmin) {
                await usersCollection.updateOne({ email: 'admin@xyverra.com' }, { $set: { isAdmin: true } });
                console.log('Fixed: isAdmin set to true');
            } else {
                console.log('Admin credentials are ready. Login with:');
                console.log('  Email: admin@xyverra.com');
                console.log('  Password: admin123');
            }
        } else {
            console.log('Admin not found. Creating...');
            const hashedPassword = await bcrypt.hash('admin123', 12);
            const result = await usersCollection.insertOne({
                name: 'XYVERRA Admin',
                email: 'admin@xyverra.com',
                password: hashedPassword,
                isAdmin: true,
                emailVerified: true,
                onboardingCompleted: true,
                dailyStreak: 0,
                chatMessagesUsed: 0,
                skills: [],
                interests: [],
                careerInterests: [],
                completedModules: [],
                createdAt: new Date(),
                updatedAt: new Date()
            });
            console.log('Admin created! ID:', result.insertedId);
            console.log('  Email: admin@xyverra.com');
            console.log('  Password: admin123');
        }

        await mongoose.disconnect();
        console.log('Done!');
        process.exit(0);
    } catch (error) {
        console.error('ERROR:', error.message);
        process.exit(1);
    }
}

checkAndSeedAdmin();
