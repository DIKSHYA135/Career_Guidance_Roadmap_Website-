/**
 * fix-emoji-hex.js
 * Hex-level replacement of mojibake emoji/dash sequences.
 * Works on raw Buffer bytes so encoding mismatches don't matter.
 */

const fs = require('fs');
const path = require('path');

const FRONTEND = path.join(__dirname, 'Frontend');

function hexReplace(buf, fromHex, toHex) {
    const from = Buffer.from(fromHex, 'hex');
    const to   = Buffer.from(toHex,   'hex');
    let pos = 0;
    const parts = [];
    while (pos < buf.length) {
        const idx = buf.indexOf(from, pos);
        if (idx === -1) { parts.push(buf.slice(pos)); break; }
        parts.push(buf.slice(pos, idx));
        parts.push(to);
        pos = idx + from.length;
    }
    return Buffer.concat(parts);
}

function fixFile(filePath, replacements) {
    let buf = fs.readFileSync(filePath);
    let changed = 0;
    for (const [fromHex, toHex, label] of replacements) {
        const before = buf.length;
        const next = hexReplace(buf, fromHex, toHex);
        // Check if anything changed by comparing
        if (!next.equals(buf)) {
            buf = next;
            changed++;
            console.log(`  ✔ Fixed ${label}`);
        } else {
            console.warn(`  ⚠ Not found: ${label} (${fromHex})`);
        }
    }
    if (changed > 0) {
        fs.writeFileSync(filePath, buf);
        console.log(`  → Saved (${changed} fix(es))\n`);
    } else {
        console.log(`  → No changes needed\n`);
    }
}

// ── dashboard.html ─────────────────────────────────────────────────────────
// em dash  U+2014 → UTF-8: e2 80 94
// garbled (Windows-1252 mojibake): â (c3a2) + € (e282ac) + " (e2809d)
// fire 🔥  U+1F525 → UTF-8: f0 9f 94 a5
// garbled: ð (c3b0) + Ÿ (c5b8) + " (e2809d) + ¥ (c2a5)

console.log('Fixing dashboard.html...');
fixFile(path.join(FRONTEND, 'dashboard.html'), [
    ['c3a2e282ace2809d', 'e28094', 'em dash (—)'],
    ['c3b0c5b8e2809dc2a5', 'f09f94a5', 'fire emoji (🔥)'],
]);

// ── counselor.html ─────────────────────────────────────────────────────────
// crown 👑 U+1F451 → UTF-8: f0 9f 91 91
// garbled: ð (c3b0) + Ÿ (c5b8) + ' (e28098) + ' (e28098)
// (Windows-1252: 0x9F→Ÿ, 0x91→', 0x91→')

console.log('Fixing counselor.html...');
fixFile(path.join(FRONTEND, 'counselor.html'), [
    ['c3b0c5b8e28098e28098', 'f09f9191', 'crown emoji (👑)'],
]);

console.log('Hex emoji fix complete.');
