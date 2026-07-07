/**
 * fix-dashboard2.js
 * Re-applies dashboard.js fixes using CRLF-aware patterns.
 */

const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, 'Frontend', 'dashboard.js'), 'utf8');
const CRLF = '\r\n';

const syncBlock = [
    '',
    '    // ── Sync fresh data from server (/api/user/me) ────────────────────────────',
    '    // Fire-and-forget: merges server state into localStorage then re-renders.',
    '    (function syncFromServer() {',
    "        const token = localStorage.getItem('token');",
    '        if (!token) return;',
    "        fetch('http://localhost:5000/api/user/me', {",
    "            headers: { 'Authorization': 'Bearer ' + token }",
    '        })',
    '        .then(r => r.ok ? r.json() : null)',
    '        .then(data => {',
    '            if (!data || !data.success) return;',
    '            const u = data.user;',
    "            if (u.name)            localStorage.setItem('xyverra_user_name', u.name);",
    "            if (u.selectedPath)    localStorage.setItem('xyverra_selected_path', u.selectedPath);",
    "            if (u.selectedLevel)   localStorage.setItem('xyverra_selected_level', u.selectedLevel);",
    '            if (typeof u.dailyStreak === \'number\')',
    "                localStorage.setItem('xyverra_user_streak', String(u.dailyStreak));",
    '            if (Array.isArray(u.completedModules))',
    "                localStorage.setItem('completedModules', JSON.stringify(u.completedModules));",
    '            if (u.quizScores && typeof u.quizScores === \'object\') {',
    '                const scores = {};',
    "                Object.entries(u.quizScores).forEach(([k, v]) => { scores[k] = v; });",
    "                localStorage.setItem('xyverra_quiz_scores', JSON.stringify(scores));",
    '            }',
    '            // Re-render stats with fresher data after server sync',
    '            renderDashboardStats();',
    '        })',
    '        .catch(() => {});',
    '    })();',
    ''
].join(CRLF);

// ── Insert sync block before "// ---- Compute stats ----"  ───────────────────
const BEFORE_STATS = [
    '        return;',
    '    }',
    '',
    '    // ---- Compute stats ----'
].join(CRLF);

const WITH_SYNC = [
    '        return;',
    '    }',
    ''
].join(CRLF) + syncBlock + [
    '    // ---- Compute stats ----'
].join(CRLF);

if (content.includes(BEFORE_STATS)) {
    content = content.replace(BEFORE_STATS, WITH_SYNC);
    console.log('✔ Inserted syncFromServer() block');
} else {
    console.warn('⚠ Could not insert sync block — pattern not matched');
}

// ── Wrap renderDashboardStats ─────────────────────────────────────────────────
// Find the start of the stats block and the closing of DOMContentLoaded
const STATS_START = '    // ---- Compute stats ----' + CRLF;
const DOM_END = '});' + CRLF;   // last line of file

const statsIdx = content.indexOf(STATS_START);
const domEndIdx = content.lastIndexOf(DOM_END);

if (statsIdx !== -1 && domEndIdx !== -1 && domEndIdx > statsIdx) {
    const before = content.slice(0, statsIdx);
    const statsBody = content.slice(statsIdx, domEndIdx); // everything from stats to closing
    const after = content.slice(domEndIdx); // just the last });

    // Indent the stats body by 4 more spaces
    const indented = statsBody
        .split(CRLF)
        .map(l => '    ' + l)
        .join(CRLF);

    const wrapped =
        '    function renderDashboardStats() {' + CRLF +
        indented + CRLF +
        '    }' + CRLF +
        '    renderDashboardStats();' + CRLF;

    content = before + wrapped + after;
    console.log('✔ Wrapped stats in renderDashboardStats()');
} else {
    console.warn('⚠ Could not wrap stats — markers not found (statsIdx=' + statsIdx + ', domEndIdx=' + domEndIdx + ')');
}

fs.writeFileSync(path.join(__dirname, 'Frontend', 'dashboard.js'), content, 'utf8');
console.log('✔ Saved dashboard.js');
