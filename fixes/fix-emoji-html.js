/**
 * fix-emoji-html.js
 * Fixes garbled mojibake emoji/dash sequences in dashboard.html and counselor.html.
 * The files were saved as Latin-1 / Windows-1252 but read as UTF-8, producing
 * multi-byte garbled sequences. We replace them with the correct Unicode characters.
 */

const fs = require('fs');
const path = require('path');

const FRONTEND = path.join(__dirname, 'Frontend');

// Each entry: [garbled string as read in UTF-8, correct replacement]
const DASHBOARD_FIXES = [
    // em dash in CSS comment (â€" = UTF-8 bytes C3 A2 E2 80 94 misread)
    ['â€"', '—'],
    // 🔥 fire emoji  (ðŸ"¥ = mangled UTF-8 of F0 9F 94 A5)
    ['ðŸ"¥', '🔥'],
    // 🎉 party emoji (ðŸŽ‰ = mangled UTF-8 of F0 9F 8E 89)
    ['ðŸŽ‰', '🎉'],
];

const COUNSELOR_FIXES = [
    // 🤖 robot   (ðŸ¤– = F0 9F A4 96)
    ['ðŸ¤–', '🤖'],
    // 👑 crown   (ðŸ'' = F0 9F 91 91)
    ["ðŸ''", '👑'],
    // 🎉 party   (ðŸŽ‰ = F0 9F 8E 89)
    ['ðŸŽ‰', '🎉'],
];

function applyFixes(filePath, fixes) {
    let content = fs.readFileSync(filePath, 'utf8');
    let count = 0;
    for (const [bad, good] of fixes) {
        if (content.includes(bad)) {
            content = content.split(bad).join(good);
            count++;
            console.log(`  ✔ Fixed: "${bad}" → "${good}"`);
        } else {
            console.warn(`  ⚠ Not found: "${bad}" (may already be correct)`);
        }
    }
    if (count > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  → Saved ${path.basename(filePath)} (${count} fix(es))\n`);
    } else {
        console.log(`  → No changes needed in ${path.basename(filePath)}\n`);
    }
}

console.log('Fixing dashboard.html...');
applyFixes(path.join(FRONTEND, 'dashboard.html'), DASHBOARD_FIXES);

console.log('Fixing counselor.html...');
applyFixes(path.join(FRONTEND, 'counselor.html'), COUNSELOR_FIXES);

console.log('Emoji fix complete.');
