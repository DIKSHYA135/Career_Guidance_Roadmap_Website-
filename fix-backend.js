/**
 * fix-backend.js
 * Applies several backend fixes to server.js and User.js:
 *
 * 1. User.js: adds `studiedLessons` Map field (courseId → timestamp)
 * 2. server.js: mark-lesson-studied now persists to DB + validates timeSpentSeconds
 * 3. server.js: save-quiz adds score range validation (0–100)
 * 4. server.js: save-quiz no longer updates lastLoginDate (fixes streak bug)
 * 5. server.js: adds POST /api/auth/logout endpoint
 */

const fs = require('fs');
const path = require('path');

const BACKEND = path.join(__dirname, 'backend');

function fixFile(filePath, replacements, label) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = 0;
    for (const [from, to, desc] of replacements) {
        if (content.includes(from)) {
            content = content.split(from).join(to);
            changed++;
            console.log(`  ✔ ${desc}`);
        } else {
            console.warn(`  ⚠ Not found: ${desc}`);
        }
    }
    if (changed > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  → Saved ${label} (${changed} change(s))\n`);
    } else {
        console.log(`  → No changes needed in ${label}\n`);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. User.js: add studiedLessons field before the closing schema definition
// ─────────────────────────────────────────────────────────────────────────────
console.log('1. Updating User.js schema...');
fixFile(
    path.join(BACKEND, 'models', 'User.js'),
    [
        [
            `    careerInterests: {\n        type: [String],\n        default: []\n    },\n\n}, { timestamps: true });`,
            `    careerInterests: {\n        type: [String],\n        default: []\n    },\n\n    // Persisted lesson study records (courseId -> Unix timestamp of last study)\n    studiedLessons: {\n        type: Map,\n        of: Number,\n        default: {}\n    },\n\n}, { timestamps: true });`,
            'Add studiedLessons Map field'
        ]
    ],
    'User.js'
);

// ─────────────────────────────────────────────────────────────────────────────
// 2–5. server.js: multiple fixes
// ─────────────────────────────────────────────────────────────────────────────
console.log('2-5. Updating server.js...');

const serverFixes = [
    // ── 2. mark-lesson-studied: add validation + DB persistence ────────────
    [
        `        const { courseId, moduleId, timeSpentSeconds } = req.body;
        if (!courseId || typeof courseId !== 'string') {
            return res.status(400).json({ success: false, message: 'courseId is required' });
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Track studied lessons in a map field (append to completedModules if not tracked separately)
        // For now, we log the event and return success; client manages openedCourses in localStorage
        console.log(\`User \${user.email} studied course \${courseId} (module: \${moduleId}, time: \${timeSpentSeconds}s)\`);

        return res.json({
            success: true,
            message: 'Lesson study recorded',
            courseId,
            moduleId: moduleId || null,
            timeSpentSeconds: timeSpentSeconds || 0
        });`,
        `        const { courseId, moduleId, timeSpentSeconds } = req.body;
        if (!courseId || typeof courseId !== 'string') {
            return res.status(400).json({ success: false, message: 'courseId is required' });
        }
        if (courseId.trim().length === 0 || courseId.length > 500) {
            return res.status(400).json({ success: false, message: 'courseId must be 1–500 characters' });
        }
        const sanitizedCourseId = courseId.trim();
        const sanitizedModuleId = (moduleId && typeof moduleId === 'string') ? moduleId.trim().slice(0, 200) : null;
        const timeVal = (typeof timeSpentSeconds === 'number' && timeSpentSeconds >= 0)
            ? Math.min(Math.floor(timeSpentSeconds), 86400)  // cap at 24 h
            : 0;

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Persist lesson study record to the database
        user.studiedLessons.set(sanitizedCourseId, Date.now());
        await user.save();

        return res.json({
            success: true,
            message: 'Lesson study recorded',
            courseId: sanitizedCourseId,
            moduleId: sanitizedModuleId,
            timeSpentSeconds: timeVal
        });`,
        'mark-lesson-studied: add validation + DB persistence'
    ],

    // ── 3 & 4. save-quiz: score range validation + remove lastLoginDate update ─
    [
        `        // Accept moduleId as the canonical key; fall back to skill for backwards compatibility.
        const { skill, moduleId, score } = req.body;
        const quizKey = moduleId || skill;
        if (!quizKey || typeof score !== 'number') {
            return res.status(400).json({ success: false, message: 'moduleId (or skill) and score are required' });
        }`,
        `        // Accept moduleId as the canonical key; fall back to skill for backwards compatibility.
        const { skill, moduleId, score } = req.body;
        const quizKey = moduleId || skill;
        if (!quizKey || typeof score !== 'number') {
            return res.status(400).json({ success: false, message: 'moduleId (or skill) and score are required' });
        }
        if (score < 0 || score > 100) {
            return res.status(400).json({ success: false, message: 'Score must be between 0 and 100' });
        }`,
        'save-quiz: add score range validation (0–100)'
    ],
    [
        `        // Use computeStreak() — do not unconditionally increment streak
        const now = new Date();
        if (score >= 80) {
            user.dailyStreak = computeStreak(user.dailyStreak, user.lastLoginDate, now);
            user.lastLoginDate = now;
        }`,
        `        // NOTE: do NOT update lastLoginDate here — streak is tied to actual logins,
        // not quiz completions. Updating lastLoginDate in quiz save caused streak inflation
        // (users could gain streak credit on days they only took a quiz, not logged in).`,
        'save-quiz: remove lastLoginDate/streak update (fixes streak inflation bug)'
    ],

    // ── 5. Add POST /api/auth/logout endpoint before the 404 handler ───────
    [
        `// ==========================
// 404 HANDLER
// ==========================
app.use((req, res) => {`,
        `// ==========================
// LOGOUT ROUTE
// With stateless JWTs the server cannot invalidate tokens. This endpoint exists
// for semantic correctness and future token-blocklist support. The client must
// discard its token on logout.
// ==========================
app.post('/api/auth/logout', (req, res) => {
    return res.json({ success: true, message: 'Logged out successfully' });
});

// ==========================
// 404 HANDLER
// ==========================
app.use((req, res) => {`,
        'Add POST /api/auth/logout endpoint'
    ]
];

fixFile(path.join(BACKEND, 'server.js'), serverFixes, 'server.js');

console.log('Backend fix complete.');
