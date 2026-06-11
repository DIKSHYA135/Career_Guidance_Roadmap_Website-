/**
 * fix-all-frontend.js
 * Fixes several small issues in frontend files:
 * 1. roadmap.html: title typo "Xyvvera" -> "Xyverra"
 * 2. quiz.html: pass threshold "70%+" -> "75%+"
 * 3. signup.js: typo 'Welcome to XYVEERA' -> 'Welcome to Xyverra'
 * 4. auth-guard.js: add study.html to ONBOARDING_REQUIRED; clear more keys on logout
 */

const fs = require('fs');
const path = require('path');

const FRONTEND = path.join(__dirname, 'Frontend');

function fixFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = 0;
    for (const [from, to] of replacements) {
        if (typeof from === 'string') {
            if (content.includes(from)) {
                content = content.split(from).join(to);
                changed++;
                console.log(`  ✔ Replaced: "${from.slice(0, 60)}"  →  "${to.slice(0, 60)}"`);
            } else {
                console.warn(`  ⚠ Not found: "${from.slice(0, 60)}"`);
            }
        } else {
            // from is a RegExp
            const before = content;
            content = content.replace(from, to);
            if (content !== before) {
                changed++;
                console.log(`  ✔ Regex replaced: ${from}`);
            } else {
                console.warn(`  ⚠ Regex not matched: ${from}`);
            }
        }
    }
    if (changed > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  → Saved (${changed} replacement(s))\n`);
    } else {
        console.log(`  → No changes needed\n`);
    }
}

// ── 1. roadmap.html: title typo ─────────────────────────────────────────────
console.log('1. Fixing roadmap.html title...');
fixFile(path.join(FRONTEND, 'roadmap.html'), [
    ['<title>Roadmap - Xyvvera</title>', '<title>Roadmap - Xyverra</title>']
]);

// ── 2. quiz.html: threshold text ─────────────────────────────────────────────
console.log('2. Fixing quiz.html pass threshold text...');
fixFile(path.join(FRONTEND, 'quiz.html'), [
    ['Answer correctly (70%+) to mark this module as completed on your roadmap.',
     'Answer correctly (75%+) to mark this module as completed on your roadmap.']
]);

// ── 3. signup.js: XYVEERA typo ──────────────────────────────────────────────
console.log('3. Fixing signup.js brand typo...');
fixFile(path.join(FRONTEND, 'signup.js'), [
    ["'Welcome to XYVEERA'", "'Welcome to Xyverra'"],
    ['"Welcome to XYVEERA"', '"Welcome to Xyverra"']
]);

// ── 4. auth-guard.js: protections + logout keys ─────────────────────────────
console.log('4. Fixing auth-guard.js...');
fixFile(path.join(FRONTEND, 'auth-guard.js'), [
    // Add study.html to ONBOARDING_REQUIRED
    [
        `    const ONBOARDING_REQUIRED = [
        'dashboard.html',
        'progress.html',
        'roadmap.html',
        'skill-gap.html',
        'quiz.html',
        'resources.html',
        'achievements.html',
        'analytics.html',
        'learning.html',
    ];`,
        `    const ONBOARDING_REQUIRED = [
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
    ];`
    ],
    // Add chatSubscriptionActive, openedCourses, xyverra_quiz_scores to logout keys
    [
        `            'completedModules', 'roadmapGenerated', 'token'\r\n        ];`,
        `            'completedModules', 'roadmapGenerated', 'token',\r\n            'chatSubscriptionActive', 'openedCourses', 'xyverra_quiz_scores'\r\n        ];`
    ],
    // Fallback without CRLF in case file was saved with LF
    [
        `            'completedModules', 'roadmapGenerated', 'token'\n        ];`,
        `            'completedModules', 'roadmapGenerated', 'token',\n            'chatSubscriptionActive', 'openedCourses', 'xyverra_quiz_scores'\n        ];`
    ]
]);

console.log('All frontend fixes complete.');
