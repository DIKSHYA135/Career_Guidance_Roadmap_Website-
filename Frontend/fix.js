const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/ACER/OneDrive/Desktop/Fake_career_path/Frontend';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const protectedPages = [
    'dashboard.html',
    'progress.html',
    'roadmap.html',
    'skill-gap.html',
    'quiz.html',
    'study.html',
    'resources.html',
    'achievements.html',
    'analytics.html',
    'learning.html',
    'counselor.html',
    'career-recommendation.html',
    'career-details.html',
    'career-comparison.html',
    'profile.html',
    'subscription.html'
];

for (const f of files) {
    const p = path.join(dir, f);
    let content = fs.readFileSync(p, 'utf8');
    let modified = false;

    // Remove existing auth-guard inclusions
    if (content.includes('<script src="auth-guard.js"></script>')) {
        content = content.replace(/<script src="auth-guard.js"><\/script>\s*/g, '');
        modified = true;
    }

    // Add back to head for protected pages
    if (protectedPages.includes(f) && content.includes('</head>')) {
        content = content.replace('</head>', '    <script src="auth-guard.js"></script>\n</head>');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(p, content, 'utf8');
        console.log('Updated ' + f);
    }
}
