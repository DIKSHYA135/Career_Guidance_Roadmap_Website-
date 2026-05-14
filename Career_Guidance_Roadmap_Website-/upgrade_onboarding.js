const fs = require('fs');

function upgradeCss(filename) {
    if (!fs.existsSync(filename)) {
        return;
    }
    
    const newCss = `/* Premium Onboarding Styles */
@import url('global.css');

.selection-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; }
.selection-card { 
    background: var(--glass-bg); backdrop-filter: blur(16px); border-radius: 20px; 
    padding: 2rem; border: 2px solid transparent; box-shadow: var(--shadow-sm); 
    cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-align: center; position: relative; overflow: hidden;
}
.selection-card::before { content: ''; position: absolute; inset: 0; border: 2px solid var(--border); border-radius: 20px; transition: all 0.3s; pointer-events: none; }
.selection-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg), var(--shadow-glow); }
.selection-card:hover::before { border-color: rgba(99, 102, 241, 0.5); }
.selection-card.selected { background: rgba(99, 102, 241, 0.05); transform: translateY(-5px); box-shadow: 0 10px 25px rgba(99,102,241,0.2); }
.selection-card.selected::before { border-color: var(--primary); border-width: 3px; }

.card-icon { width: 64px; height: 64px; border-radius: 16px; background: rgba(99,102,241,0.1); color: var(--primary); font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; transition: transform 0.3s; }
.selection-card:hover .card-icon { transform: scale(1.1); }
.selection-card.selected .card-icon { background: var(--primary); color: white; box-shadow: 0 0 20px rgba(99,102,241,0.5); }

.card-title { font-size: 1.25rem; font-weight: 800; color: var(--text-dark); margin-bottom: 0.5rem; }
.card-desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; }

/* Level Buttons */
.level-selection { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
.level-btn { 
    background: var(--glass-bg); padding: 1.5rem 2rem; border-radius: 16px; 
    border: 2px solid var(--border); font-size: 1.1rem; font-weight: 700; color: var(--text-dark); 
    cursor: pointer; transition: all 0.3s; display: flex; justify-content: space-between; align-items: center; 
}
.level-btn:hover { border-color: rgba(99,102,241,0.5); transform: translateX(5px); box-shadow: var(--shadow-sm); }
.level-btn.active { background: rgba(99,102,241,0.05); border-color: var(--primary); color: var(--primary); box-shadow: 0 0 15px rgba(99,102,241,0.2); }
.level-btn.active::after { content: '\\f058'; font-family: 'Font Awesome 5 Free'; font-weight: 900; }

/* Fixed Bottom Bar on Mobile */
.sticky-bottom-bar { display: flex; justify-content: center; align-items: center; padding-top: 1rem; }
@media (max-width: 768px) {
    .sticky-bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); padding: 1.5rem; border-top: 1px solid var(--border); box-shadow: 0 -4px 10px rgba(0,0,0,0.05); z-index: 100; }
    .card-box { padding-bottom: 80px; }
}

/* Specific to login/signup */
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; font-size: 0.95rem; font-weight: 600; color: var(--text-dark); margin-bottom: 0.5rem; }
.input-wrapper { position: relative; display: flex; align-items: center; }
.input-wrapper i { position: absolute; left: 1rem; color: var(--text-muted); font-size: 1.1rem; z-index: 2;}
.input-wrapper input { 
    width: 100%; padding: 14px 1rem 14px 3rem; background: var(--bg-light); border: 2px solid transparent; 
    border-radius: 12px; font-size: 1rem; color: var(--text-dark); transition: all 0.2s; 
}
.input-wrapper input:focus { outline: none; background: var(--white); border-color: var(--primary); box-shadow: 0 0 0 4px rgba(99,102,241,0.1); }
.eye-icon { left: auto !important; right: 1rem !important; cursor: pointer; }
.eye-icon:hover { color: var(--primary); }
.divider { display: flex; align-items: center; text-align: center; margin: 2rem 0; color: var(--text-muted); font-weight: 600; font-size: 0.9rem; }
.divider::before, .divider::after { content: ''; flex: 1; border-bottom: 1px solid var(--border); }
.divider::before { margin-right: .5em; }
.divider::after { margin-left: .5em; }
`;
    fs.writeFileSync(filename, newCss, 'utf8');
}

upgradeCss('path-selection.css');
upgradeCss('skill-input.css');
upgradeCss('login.css');
upgradeCss('signup.css');
upgradeCss('level-selection.css'); // If exists
console.log("Onboarding CSS upgraded successfully.");
