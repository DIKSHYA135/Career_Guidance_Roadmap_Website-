const fs = require('fs');

function updateRoadmapCss() {
    const newCss = `/* roadmap.css - Premium Overhaul */
.roadmap-container { max-width: 900px; margin: 0 auto; padding: 2rem; position: relative; }
.roadmap-header { text-align: center; margin-bottom: 4rem; animation: fadeInDown 0.8s ease-out; }
.roadmap-header h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; background: linear-gradient(135deg, var(--text-dark), var(--primary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.roadmap-header p { color: var(--text-muted); font-size: 1.1rem; }

.timeline-container { position: relative; display: flex; flex-direction: column; gap: 2rem; padding: 1rem 0; }
.timeline-container::before { 
    content: ''; position: absolute; top: 0; bottom: 0; left: 50%; transform: translateX(-50%); 
    width: 4px; background: rgba(99, 102, 241, 0.1); border-radius: 4px; z-index: 0; 
}

.roadmap-item { 
    display: flex; align-items: center; width: 100%; position: relative; z-index: 1; 
    opacity: 0; animation: fadeInUp 0.6s ease-out forwards; 
}
.roadmap-item:nth-child(even) { flex-direction: row-reverse; }

.item-node { 
    width: 48px; height: 48px; border-radius: 50%; background: var(--white); 
    border: 4px solid var(--border); display: flex; align-items: center; justify-content: center; 
    font-weight: 700; font-size: 1.2rem; position: absolute; left: 50%; transform: translateX(-50%); 
    box-shadow: var(--shadow-md); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 2; 
}
.roadmap-item.completed .item-node { border-color: var(--success); background: var(--success); color: white; box-shadow: 0 0 20px rgba(16,185,129,0.4); }
.roadmap-item.active .item-node { border-color: var(--primary); background: var(--primary); color: white; box-shadow: 0 0 25px rgba(99,102,241,0.6); animation: pulseGlow 2s infinite; }

.item-content { 
    width: calc(50% - 40px); background: var(--glass-bg); backdrop-filter: blur(16px); 
    border-radius: 20px; padding: 2rem; box-shadow: var(--shadow-lg); border: 1px solid var(--glass-border); 
    transition: transform 0.3s ease, box-shadow 0.3s ease; position: relative; 
}
.item-content:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), var(--shadow-glow); }
.roadmap-item:nth-child(odd) .item-content { margin-right: auto; }
.roadmap-item:nth-child(even) .item-content { margin-left: auto; text-align: left; }

.item-content::before {
    content: ''; position: absolute; top: 24px; width: 20px; height: 4px; background: rgba(99, 102, 241, 0.2); z-index: -1;
}
.roadmap-item:nth-child(odd) .item-content::before { right: -20px; }
.roadmap-item:nth-child(even) .item-content::before { left: -20px; }
.roadmap-item.completed .item-content::before { background: var(--success); }
.roadmap-item.active .item-content::before { background: var(--primary); }

.item-title { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-dark); }
.item-desc { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6; }

.course-links { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border); }
.course-btn { 
    display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; 
    border-radius: 10px; background: rgba(99, 102, 241, 0.05); color: var(--primary); 
    font-weight: 600; font-size: 0.9rem; transition: all 0.2s; border: 1px solid rgba(99, 102, 241, 0.1); 
}
.course-btn:hover { background: var(--primary); color: white; transform: translateX(5px); box-shadow: 0 4px 12px rgba(99,102,241,0.2); }

@media (max-width: 768px) {
    .timeline-container::before { left: 30px; }
    .roadmap-item { flex-direction: column !important; align-items: flex-start; padding-left: 70px; margin-bottom: 2rem; }
    .item-node { left: 30px; }
    .item-content { width: 100%; }
    .item-content::before { display: none; }
    .roadmap-item:nth-child(odd) .item-content, .roadmap-item:nth-child(even) .item-content { margin: 0; }
}
`;
    fs.writeFileSync('roadmap.css', newCss, 'utf8');
}

function updateProgressCss() {
    const newCss = `/* progress.css - Premium Overhaul */
.progress-summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2.5rem; }
.summary-card { 
    background: var(--glass-bg); backdrop-filter: blur(16px); border-radius: 20px; 
    padding: 1.5rem; box-shadow: var(--shadow-md); border: 1px solid var(--glass-border); 
    display: flex; align-items: center; gap: 1rem; transition: transform 0.3s ease; 
}
.summary-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg), var(--shadow-glow); }
.summary-icon { width: 48px; height: 48px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
.icon-purple { background: rgba(139,92,246,0.1); color: #8B5CF6; }
.icon-green { background: rgba(16,185,129,0.1); color: #10B981; }
.icon-blue { background: rgba(59,130,246,0.1); color: #3B82F6; }
.icon-orange { background: rgba(245,158,11,0.1); color: #F59E0B; }
.summary-info { display: flex; flex-direction: column; }
.summary-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }
.summary-value { font-size: 1.5rem; font-weight: 800; color: var(--text-dark); }

.roadmap-steps-track { display: flex; align-items: center; justify-content: space-between; margin: 2rem 0; overflow-x: auto; padding-bottom: 1rem; }
.roadmap-step { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; text-align: center; min-width: 80px; position: relative; z-index: 2; }
.rs-node { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; background: var(--white); border: 2px solid var(--border); box-shadow: var(--shadow-sm); transition: all 0.3s; }
.roadmap-step.completed .rs-node { background: var(--success); border-color: var(--success); color: white; box-shadow: 0 0 15px rgba(16,185,129,0.4); }
.roadmap-step.current .rs-node { background: var(--primary); border-color: var(--primary); color: white; box-shadow: 0 0 20px rgba(99,102,241,0.5); animation: pulseGlow 2s infinite; }
.rs-label { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); line-height: 1.2; }
.roadmap-step.completed .rs-label, .roadmap-step.current .rs-label { color: var(--text-dark); }
.rs-connector { flex-grow: 1; height: 4px; background: rgba(99,102,241,0.1); border-radius: 4px; margin: 0 8px; transform: translateY(-15px); }
.rs-connector.active-connector { background: linear-gradient(90deg, var(--success), var(--primary)); box-shadow: 0 0 10px rgba(99,102,241,0.3); }

.history-card { background: var(--glass-bg); backdrop-filter: blur(16px); border-radius: 20px; padding: 2rem; box-shadow: var(--shadow-md); border: 1px solid var(--glass-border); }
.history-header { font-size: 1.25rem; font-weight: 800; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; color: var(--text-dark); }
.history-item { display: flex; align-items: center; gap: 1rem; padding: 1.25rem; border-radius: 16px; background: rgba(255,255,255,0.6); margin-bottom: 1rem; transition: transform 0.2s; border: 1px solid transparent; }
.history-item:hover { transform: translateX(5px); background: var(--white); border-color: var(--border); box-shadow: var(--shadow-sm); }
.item-icon.success { width: 40px; height: 40px; border-radius: 50%; background: rgba(16,185,129,0.1); color: var(--success); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
.item-details h4 { font-size: 1.1rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem; }
.item-meta { display: flex; gap: 1rem; font-size: 0.85rem; color: var(--text-muted); }
.meta-score { font-weight: 700; color: var(--primary); }
.item-badge { margin-left: auto; padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
.item-badge.completed { background: var(--success-bg); color: var(--success); }

@media (max-width: 1024px) { .progress-summary-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .progress-summary-grid { grid-template-columns: 1fr; } }
`;
    fs.writeFileSync('progress.css', newCss, 'utf8');
}

updateRoadmapCss();
updateProgressCss();
console.log("Roadmap and Progress CSS upgraded successfully.");
