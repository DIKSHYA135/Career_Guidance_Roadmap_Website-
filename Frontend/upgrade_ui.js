const fs = require('fs');

function updateCss() {
    const newCss = `/* dashboard.css - Premium Overhaul */
.dashboard-container { max-width: 1200px; margin: 0 auto; padding-top: 1rem; }
.dashboard-header h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; background: linear-gradient(135deg, var(--text-dark), var(--primary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2.5rem; }
.metric-card { 
    background: var(--glass-bg); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-radius: 20px; 
    padding: 1.5rem; box-shadow: var(--shadow-md); border: 1px solid var(--glass-border); display: flex; flex-direction: column; 
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease; position: relative; overflow: hidden;
}
.metric-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg), var(--shadow-glow); }
.metric-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; color: var(--text-muted); position: relative; z-index: 2; }
.metric-title { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
.metric-icon { color: var(--primary); background: rgba(99, 102, 241, 0.1); padding: 8px; border-radius: 12px; }
.metric-value { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.25rem; line-height: 1; color: var(--text-dark); position: relative; z-index: 2; }
.metric-subtitle { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem; font-weight: 500; position: relative; z-index: 2; }

/* SVG Progress Background */
.svg-bg-graphic { position: absolute; bottom: -30px; right: -30px; width: 140px; height: 140px; opacity: 0.05; transform: rotate(-15deg); z-index: 0; pointer-events: none; color: var(--primary); }

.progress-bar-container { height: 8px; background-color: rgba(99,102,241,0.1); border-radius: 999px; overflow: hidden; margin-top: auto; position: relative; z-index: 2; }
.progress-bar { height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); border-radius: 999px; box-shadow: 0 0 10px rgba(99, 102, 241, 0.5); }

.content-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
.content-card { background: var(--glass-bg); backdrop-filter: blur(16px); border-radius: 20px; padding: 2rem; box-shadow: var(--shadow-md); border: 1px solid var(--glass-border); transition: transform 0.3s ease; }
.content-card:hover { box-shadow: var(--shadow-lg); }

.card-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
.card-header h2 { font-size: 1.25rem; font-weight: 700; color: var(--text-dark); }
.text-primary { color: var(--primary); }

.milestone-content { padding-left: 2.25rem; position: relative; }
.milestone-content::before { content: ''; position: absolute; left: 8px; top: 0; bottom: 0; width: 2px; background: rgba(99, 102, 241, 0.2); }
.milestone-content h3 { font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-dark); }
.milestone-content p { color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.95rem; }

.knowledge-check { background: linear-gradient(135deg, rgba(99,102,241,0.05), rgba(139,92,246,0.05)); border-radius: 16px; padding: 1.5rem; border: 1px solid rgba(99,102,241,0.1); margin-top: 1.5rem; }
.knowledge-check h3 { font-size: 1rem; margin-bottom: 0.5rem; color: var(--primary); }
.knowledge-check p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem; }

.progress-tracker { background: var(--glass-bg); border-radius: 20px; padding: 2rem; border: 1px solid var(--glass-border); box-shadow: var(--shadow-md); }
.progress-tracker h3 { font-size: 1.1rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
.tracker-list { display: flex; flex-direction: column; gap: 1rem; }
.tracker-step { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem; border-radius: 12px; background: rgba(255,255,255,0.5); transition: all 0.2s; }
.tracker-step.completed { background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); }
.tracker-step:hover { transform: translateX(5px); background: var(--white); box-shadow: var(--shadow-sm); }
.step-indicator { width: 32px; height: 32px; border-radius: 50%; background: #EEF2FF; color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; flex-shrink: 0; }
.tracker-step.completed .step-indicator { background: var(--success); color: white; box-shadow: 0 0 15px rgba(16, 185, 129, 0.4); }
.step-content h4 { font-size: 0.95rem; margin-bottom: 0.25rem; color: var(--text-dark); }
.step-content p { font-size: 0.8rem; color: var(--text-muted); }

@media (max-width: 1024px) {
    .metrics-grid { grid-template-columns: repeat(2, 1fr); }
    .content-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
    .metrics-grid { grid-template-columns: 1fr; }
}
`;
    fs.writeFileSync('dashboard.css', newCss, 'utf8');
}

function updateHtml() {
    let content = fs.readFileSync('dashboard.html', 'utf8');

    const svgBg = '<svg class="svg-bg-graphic" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>';
    content = content.replace(/<div class="metric-value">/g, `${svgBg}\n<div class="metric-value">`);

    fs.writeFileSync('dashboard.html', content, 'utf8');
}

updateCss();
updateHtml();
console.log("Dashboard UI upgraded successfully.");
