/**
 * fix-frontend-js.js
 * Fixes three frontend JS files:
 * 1. study.js — add POST /api/user/mark-lesson-studied API call on lesson complete
 * 2. global-sidebar.js — call POST /api/auth/logout before clearing storage
 * 3. career-discovery.js — persist full scores to localStorage
 * 4. career-recommendation.js — compute real match% from stored scores
 */

const fs = require('fs');
const path = require('path');

const F = p => path.join(__dirname, 'Frontend', p);

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
        console.log(`  → Saved ${label} (${changed} fix(es))\n`);
    } else {
        console.log(`  → No changes needed in ${label}\n`);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. study.js — add API call in completeLesson and back button handler
// ─────────────────────────────────────────────────────────────────────────────
console.log('1. Fixing study.js...');

const STUDY_API_HELPER = `
    // ── API: report lesson studied to server (fire-and-forget) ──────────────
    function reportLessonStudied(id, mod, secs) {
        const token = localStorage.getItem('token');
        if (!id || !token) return;
        fetch('http://localhost:5000/api/user/mark-lesson-studied', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ courseId: id, moduleId: mod || null, timeSpentSeconds: secs || 0 })
        }).catch(() => { /* non-blocking; localStorage is source of truth */ });
    }
`;

fixFile(F('study.js'), [
    // Add the helper function before the loader handling
    [
        `    // --- Loader handling ---`,
        STUDY_API_HELPER + `    // --- Loader handling ---`,
        'Add reportLessonStudied() API helper'
    ],
    // Call it in completeLesson()
    [
        `    function completeLesson() {
        if (courseId) {
            markCourseOpened(courseId);
            persistTimeSpent(courseId, Math.max(seconds, REQUIRED_SECONDS));
        }
        clearInterval(intervalId);
        window.location.href = buildReturnUrl(true);
    }`,
        `    function completeLesson() {
        if (courseId) {
            markCourseOpened(courseId);
            persistTimeSpent(courseId, Math.max(seconds, REQUIRED_SECONDS));
            reportLessonStudied(courseId, moduleId, Math.max(seconds, REQUIRED_SECONDS));
        }
        clearInterval(intervalId);
        window.location.href = buildReturnUrl(true);
    }`,
        'Call reportLessonStudied in completeLesson()'
    ],
    // Call it in back button handler when requirement met
    [
        `        const metRequirement = seconds >= REQUIRED_SECONDS;
        if (metRequirement && courseId) {
            markCourseOpened(courseId);
        }`,
        `        const metRequirement = seconds >= REQUIRED_SECONDS;
        if (metRequirement && courseId) {
            markCourseOpened(courseId);
            reportLessonStudied(courseId, moduleId, seconds);
        }`,
        'Call reportLessonStudied in back button handler'
    ]
], 'study.js');

// ─────────────────────────────────────────────────────────────────────────────
// 2. global-sidebar.js — call logout API before clearing storage
// ─────────────────────────────────────────────────────────────────────────────
console.log('2. Fixing global-sidebar.js...');
fixFile(F('global-sidebar.js'), [
    [
        `    // TODO: Call POST /api/auth/logout before clearing storage
    function performSignOut() {`,
        `    function performSignOut() {
        // Call server logout endpoint (non-blocking) before clearing state
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            }).catch(() => {});
        }`,
        'Add /api/auth/logout call in performSignOut()'
    ],
    // Also call XyLogout to clear all keys consistently
    [
        `        keysToRemove.forEach(k => localStorage.removeItem(k));
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.25s ease';
        setTimeout(() => { window.location.href = 'login.html'; }, 260);
    }`,
        `        keysToRemove.forEach(k => localStorage.removeItem(k));
        // Also clear auth-guard managed keys for full cleanup
        if (typeof window.XyLogout === 'function') {
            window.XyLogout();
        } else {
            // Fallback: clear remaining keys manually if XyLogout not available
            ['token', 'chatSubscriptionActive', 'openedCourses', 'xyverra_quiz_scores',
             'xyverra_selected_path', 'xyverra_onboarded', 'roadmapGenerated',
             'xyverra_interests', 'xyverra_selected_level'].forEach(k => localStorage.removeItem(k));
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.25s ease';
            setTimeout(() => { window.location.href = 'login.html'; }, 260);
        }
    }`,
        'Call XyLogout for complete key cleanup in performSignOut()'
    ]
], 'global-sidebar.js');

// ─────────────────────────────────────────────────────────────────────────────
// 3. career-discovery.js — save full scores map to localStorage
// ─────────────────────────────────────────────────────────────────────────────
console.log('3. Fixing career-discovery.js...');
fixFile(F('career-discovery.js'), [
    [
        `        localStorage.setItem('xyverra_recommended_paths', JSON.stringify(ranked));
        localStorage.setItem('xyverra_top_recommendation', ranked[0]);`,
        `        localStorage.setItem('xyverra_recommended_paths', JSON.stringify(ranked));
        localStorage.setItem('xyverra_top_recommendation', ranked[0]);
        // Store raw scores so career-recommendation.js can show real match percentages
        localStorage.setItem('xyverra_career_scores', JSON.stringify(scores));`,
        'Persist full career scores to localStorage'
    ]
], 'career-discovery.js');

// ─────────────────────────────────────────────────────────────────────────────
// 4. career-recommendation.js — compute real match% from stored scores
// ─────────────────────────────────────────────────────────────────────────────
console.log('4. Fixing career-recommendation.js...');
fixFile(F('career-recommendation.js'), [
    [
        `    const matchPct = 96 - (index * 7); // 96%, 89%, 82%`,
        `    // Compute real match percentage from assessment scores
        let matchPct = 96 - (index * 7); // fallback if no scores
        try {
            const rawScores = JSON.parse(localStorage.getItem('xyverra_career_scores') || 'null');
            if (rawScores && typeof rawScores === 'object') {
                const allVals = Object.values(rawScores).filter(v => typeof v === 'number');
                const maxScore = Math.max(...allVals, 1);
                const pathScore = rawScores[pathKey];
                if (typeof pathScore === 'number' && maxScore > 0) {
                    // Scale: top path = 75–95%, second = proportionally lower, min 55%
                    matchPct = Math.max(55, Math.min(95, Math.round((pathScore / maxScore) * 95)));
                }
            }
        } catch (_) {}`,
        'Replace fake 96%/89%/82% with real score-based percentages'
    ]
], 'career-recommendation.js');

console.log('All frontend JS fixes complete.');
