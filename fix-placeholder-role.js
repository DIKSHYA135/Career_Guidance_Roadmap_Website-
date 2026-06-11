/**
 * fix-placeholder-role.js
 * Replaces the hardcoded "Platform Architect" sidebar role placeholder
 * with an empty string (global-sidebar.js populates it dynamically from localStorage).
 */

const fs = require('fs');
const path = require('path');

const FRONTEND = path.join(__dirname, 'Frontend');
const FILES = ['dashboard.html', 'progress.html', 'profile.html', 'skill-gap.html', 'roadmap.html', 'quiz.html', 'counselor.html'];

// The sidebar .profile-text p element shows the career path; default to empty
// so there is no stale hardcoded text before JS sets the real value.
const FROM = '<p>Platform Architect</p>';
const TO   = '<p></p>';

let totalFixed = 0;
FILES.forEach(file => {
    const filePath = path.join(FRONTEND, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(FROM)) {
        content = content.split(FROM).join(TO);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✔ Fixed ${file}`);
        totalFixed++;
    }
});
console.log(`\nDone. Fixed ${totalFixed} file(s).`);
