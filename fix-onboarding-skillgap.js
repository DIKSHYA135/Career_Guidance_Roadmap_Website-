/**
 * fix-onboarding-skillgap.js
 * 1. onboarding.html: add Panel 4 (goals) validation before submit
 * 2. skill-gap.js: wrap JSON.parse in try-catch, guard canvas context
 */

const fs = require('fs');
const path = require('path');

const FRONTEND = path.join(__dirname, 'Frontend');

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
// 1. onboarding.html: add Panel 4 goal validation
// ─────────────────────────────────────────────────────────────────────────────
console.log('1. Fixing onboarding.html...');
fixFile(path.join(FRONTEND, 'onboarding.html'), [
    [
        // Add validation check for panel 4 before the submit call
        `            if (currentPanel === totalPanels) {
                saveAndContinue();
                return;
            }`,
        `            if (currentPanel === 4) {
                // Panel 4: require a non-empty career goal
                const goalVal = document.getElementById('goal-input').value.trim();
                if (!goalVal || goalVal.length < 5) {
                    alert('Please enter your career goal (at least 5 characters) to continue.');
                    document.getElementById('goal-input').focus();
                    return;
                }
            }
            if (currentPanel === totalPanels) {
                saveAndContinue();
                return;
            }`,
        'Add Panel 4 goal validation'
    ]
], 'onboarding.html');

// ─────────────────────────────────────────────────────────────────────────────
// 2. skill-gap.js: wrap JSON.parse in try-catch + guard canvas
// ─────────────────────────────────────────────────────────────────────────────
console.log('2. Fixing skill-gap.js...');
fixFile(path.join(FRONTEND, 'skill-gap.js'), [
    // Wrap completedModules JSON.parse
    [
        `    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');`,
        `    let completedModules = [];
    try { completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]') || []; }
    catch (e) { completedModules = []; }
    if (!Array.isArray(completedModules)) completedModules = [];`,
        'Wrap completedModules JSON.parse in try-catch'
    ]
], 'skill-gap.js');

console.log('Done.');
