/**
 * migrateReadiness.js — One-time bulk recompute
 * Recomputes and persists the readinessScore for every user in the DB.
 * Safe to run multiple times (idempotent).
 */
const mongoose = require('mongoose');
const User = require('./models/User');
const { recomputeAndSaveReadiness } = require('./utils/readiness');
require('dotenv').config();

async function run() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/xyverra_db');
    console.log('Connected. Starting bulk readiness recompute...\n');

    const users = await User.find({}, { _id: 1, email: 1, readinessScore: 1 });
    let updated = 0;
    let errors = 0;

    for (const u of users) {
        try {
            const newScore = await recomputeAndSaveReadiness(u._id);
            const changed = newScore !== (u.readinessScore || 0);
            console.log(`${u.email}: ${u.readinessScore || 0} → ${newScore}${changed ? ' ✓ UPDATED' : ' (no change)'}`);
            updated++;
        } catch (e) {
            console.error(`ERROR for ${u.email}:`, e.message);
            errors++;
        }
    }

    console.log(`\nDone. ${updated} users processed, ${errors} errors.`);
    process.exit(0);
}

run();
