/**
 * fix-dashboard.js
 * Fixes two issues in dashboard.js:
 * 1. Wrong localStorage key: 'moduleQuizPassed' → 'xyverra_quiz_scores'
 * 2. Adds /api/user/me sync at startup to refresh server-side data
 */

const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, 'Frontend', 'dashboard.js'), 'utf8');

// ── 1. Fix wrong quiz scores key ──────────────────────────────────────────────
const wrongKey = `localStorage.getItem('moduleQuizPassed')`;
const rightKey = `localStorage.getItem('xyverra_quiz_scores')`;
if (content.includes(wrongKey)) {
    content = content.split(wrongKey).join(rightKey);
    console.log('✔ Fixed quiz scores localStorage key: moduleQuizPassed → xyverra_quiz_scores');
} else {
    console.warn('⚠ moduleQuizPassed key not found (may already be correct)');
}

// ── 2. Add /api/user/me sync block at the top of DOMContentLoaded ─────────────
const syncBlock = `
    // ── Sync fresh data from server (/api/user/me) ────────────────────────────
    // Fire-and-forget: merges server state into localStorage then re-renders stats.
    // This ensures data is accurate across devices / sessions without blocking the
    // initial paint (localStorage provides instant render; server provides truth).
    (function syncFromServer() {
        const token = localStorage.getItem('token');
        if (!token) return;
        fetch('http://localhost:5000/api/user/me', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(r => r.ok ? r.json() : null)
        .then(data => {
            if (!data || !data.success) return;
            const u = data.user;
            // Update localStorage with server values where available
            if (u.name)            localStorage.setItem('xyverra_user_name', u.name);
            if (u.selectedPath)    localStorage.setItem('xyverra_selected_path', u.selectedPath);
            if (u.selectedLevel)   localStorage.setItem('xyverra_selected_level', u.selectedLevel);
            if (typeof u.dailyStreak === 'number')
                localStorage.setItem('xyverra_user_streak', String(u.dailyStreak));
            if (Array.isArray(u.completedModules))
                localStorage.setItem('completedModules', JSON.stringify(u.completedModules));
            if (u.quizScores && typeof u.quizScores === 'object') {
                // Server quizScores is a Map serialised as a plain object
                const scores = {};
                Object.entries(u.quizScores).forEach(([k, v]) => { scores[k] = v; });
                localStorage.setItem('xyverra_quiz_scores', JSON.stringify(scores));
            }
            // Re-render stats with fresher data
            renderDashboardStats();
        })
        .catch(() => {}); // non-critical; page already rendered from localStorage
    })();
`;

// Insert sync block just after the empty-state check that returns early
const insertAfter = `        return;
    }

    // ---- Compute stats ----`;
const insertWith  = `        return;
    }
` + syncBlock + `
    // ---- Compute stats ----`;

if (content.includes(insertAfter)) {
    content = content.replace(insertAfter, insertWith);
    console.log('✔ Added /api/user/me sync block');
} else {
    console.warn('⚠ Insertion point for sync block not found');
}

// ── 3. Wrap the stats rendering in a named function renderDashboardStats() ───
// so the sync callback can call it.
const statsStart = `    // ---- Compute stats ----\n    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');`;
const statsEnd   = `});\n`; // closing of DOMContentLoaded

// Find the position of the stats block
const statsStartIdx = content.indexOf(statsStart);
const domCloseIdx   = content.lastIndexOf(statsEnd);

if (statsStartIdx !== -1 && domCloseIdx !== -1) {
    const before = content.slice(0, statsStartIdx);
    const statsBody = content.slice(statsStartIdx, domCloseIdx);
    const after = content.slice(domCloseIdx);

    // Wrap in function
    const wrapped =
        `    function renderDashboardStats() {\n` +
        statsBody.split('\n').map(l => '    ' + l).join('\n') +
        `\n    }\n    renderDashboardStats();\n`;

    content = before + wrapped + after;
    console.log('✔ Wrapped stats rendering in renderDashboardStats()');
} else {
    console.warn('⚠ Could not wrap stats in function (markers not found)');
}

fs.writeFileSync(path.join(__dirname, 'Frontend', 'dashboard.js'), content, 'utf8');
console.log('✔ Saved dashboard.js');
