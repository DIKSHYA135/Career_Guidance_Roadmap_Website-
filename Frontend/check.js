const fs = require('fs');
const c = fs.readFileSync('lesson-content.js', 'utf8');
const m = c.match(/"Courses\/[^"]+"/g);
console.log('Sample keys:');
m.slice(0, 8).forEach(k => console.log(k));
console.log('Total:', m.length);
