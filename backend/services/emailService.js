const cron = require('node-cron');
const User = require('../models/User');
const EmailLog = require('../models/EmailLog');
const nodemailer = require('nodemailer');
const { isSubscriptionActive } = require('../utils/subscriptionUtils');

// Re-using the logic from server.js for SMTP
// In a real refactor, we would extract the transporter into a shared config file.

const initEmailService = () => {
    const smtpConfigured = process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_PASS !== 'YOUR_GMAIL_APP_PASSWORD_HERE';
    
    if (!smtpConfigured) {
        console.warn('SMTP not configured. Email progress reports will not be sent.');
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        tls: { rejectUnauthorized: false }
    });

    // Run every Sunday at 9 AM
    cron.schedule('0 9 * * 0', async () => {
        console.log('Starting weekly progress email job for Pro users...');
        try {
            const proUsers = await User.find({ emailReportsEnabled: true }).populate('activeSubscription');
            
            for (const user of proUsers) {
                if (isSubscriptionActive(user)) {
                    await sendWeeklyReport(transporter, user);
                }
            }
        } catch (error) {
            console.error('Error running weekly progress email job:', error);
        }
    });
};

async function sendWeeklyReport(transporter, user) {
    const html = `
        <h2>Weekly Progress Report for ${user.name || 'User'}</h2>
        <p>Here is your progress for the week:</p>
        <ul>
            <li>Current Streak: ${user.dailyStreak || 0} days</li>
            <li>Completed Modules: ${user.completedModules ? user.completedModules.length : 0}</li>
            <li>Competency Score: ${user.competencyScore || 0}</li>
        </ul>
        <p>Keep up the great work on your ${user.selectedPath || 'career'} journey!</p>
    `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || `"Xyverra" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: 'Your Weekly Career Progress Report - Xyverra',
            html
        });
        
        await EmailLog.create({
            userId: user._id,
            emailType: 'weekly_progress',
            status: 'sent'
        });
        console.log(`Weekly report sent to ${user.email}`);
    } catch (error) {
        console.error(`Failed to send weekly report to ${user.email}:`, error);
        await EmailLog.create({
            userId: user._id,
            emailType: 'weekly_progress',
            status: 'failed',
            errorDetails: error.message
        });
    }
}

module.exports = { initEmailService };
