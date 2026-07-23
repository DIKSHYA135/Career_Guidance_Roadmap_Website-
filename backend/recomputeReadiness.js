const mongoose = require('mongoose');
const User = require('./models/User');
const { recomputeAndSaveReadiness } = require('./utils/readiness');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
        const users = await User.find({}, '_id');
        console.log(`Recomputing for ${users.length} users...`);
        for (let u of users) {
            await recomputeAndSaveReadiness(u._id);
        }
        console.log('Done!');
        process.exit(0);
    });
