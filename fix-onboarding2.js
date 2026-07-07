const fs = require('fs');
const path = require('path');

const CRLF = '\r\n';
let content = fs.readFileSync(path.join(__dirname, 'Frontend', 'onboarding.html'), 'utf8');

const FROM = [
    '            if (currentPanel === totalPanels) {',
    '                saveAndContinue();',
    '                return;',
    '            }',
].join(CRLF);

const TO = [
    '            if (currentPanel === 4) {',
    '                const goalVal = document.getElementById(\'goal-input\').value.trim();',
    '                if (!goalVal || goalVal.length < 5) {',
    '                    alert(\'Please enter your career goal (at least 5 characters) to continue.\');',
    '                    document.getElementById(\'goal-input\').focus();',
    '                    return;',
    '                }',
    '            }',
    '            if (currentPanel === totalPanels) {',
    '                saveAndContinue();',
    '                return;',
    '            }',
].join(CRLF);

if (content.includes(FROM)) {
    content = content.replace(FROM, TO);
    fs.writeFileSync(path.join(__dirname, 'Frontend', 'onboarding.html'), content, 'utf8');
    console.log('✔ Fixed onboarding.html Panel 4 validation');
} else {
    console.warn('⚠ Pattern not found - please check manually');
}
