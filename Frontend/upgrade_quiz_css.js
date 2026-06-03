const fs = require('fs');

const newCss = `/* quiz.css - Premium Overhaul */
.quiz-container { max-width: 800px; margin: 0 auto; padding-top: 2rem; position: relative; }
.quiz-header { text-align: center; margin-bottom: 3rem; animation: fadeInDown 0.6s ease-out; }
.quiz-header h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; background: linear-gradient(135deg, var(--text-dark), var(--primary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.quiz-header p { color: var(--text-muted); font-size: 1.1rem; }

.quiz-card { 
    background: var(--glass-bg); backdrop-filter: blur(16px); border-radius: 20px; 
    padding: 3rem 2.5rem; box-shadow: var(--shadow-lg); border: 1px solid var(--glass-border); 
    transition: transform 0.3s ease; animation: fadeInUp 0.5s ease-out; position: relative; overflow: hidden;
}

/* Timer */
.timer-container { position: absolute; top: 0; left: 0; right: 0; height: 6px; background: rgba(99,102,241,0.1); }
.timer-bar { height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); transition: width 1s linear; }

.question-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; color: var(--text-muted); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; }
.question-text { font-size: 1.5rem; font-weight: 800; color: var(--text-dark); margin-bottom: 2rem; line-height: 1.4; }

.options-grid { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
.option-btn { 
    width: 100%; padding: 1.25rem 1.5rem; border-radius: 12px; background: rgba(255,255,255,0.6); 
    border: 2px solid var(--border); font-size: 1.05rem; font-weight: 600; color: var(--text-dark); 
    cursor: pointer; transition: all 0.2s; text-align: left; display: flex; align-items: center; gap: 1rem; 
}
.option-btn:hover { background: var(--white); border-color: rgba(99,102,241,0.4); transform: translateX(5px); box-shadow: var(--shadow-sm); }
.option-btn.selected { background: rgba(99,102,241,0.05); border-color: var(--primary); color: var(--primary); box-shadow: 0 0 15px rgba(99,102,241,0.2); transform: translateX(5px); }

/* Results State */
.result-container { text-align: center; padding: 2rem 0; animation: fadeInUp 0.5s; }
.result-icon { width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 1.5rem; }
.result-icon.success { background: rgba(16,185,129,0.1); color: var(--success); box-shadow: 0 0 30px rgba(16,185,129,0.3); animation: pulseGlow 2s infinite; }
.result-icon.fail { background: rgba(239,68,68,0.1); color: var(--error); box-shadow: 0 0 30px rgba(239,68,68,0.3); }

.score-display { font-size: 3.5rem; font-weight: 900; color: var(--text-dark); margin-bottom: 0.5rem; line-height: 1; }
.score-text { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 2rem; }

@media (max-width: 768px) {
    .quiz-card { padding: 2rem 1.5rem; }
    .question-text { font-size: 1.25rem; }
    .option-btn { padding: 1rem; font-size: 1rem; }
}
`;

fs.writeFileSync('quiz.css', newCss, 'utf8');
console.log("Quiz CSS upgraded successfully.");
