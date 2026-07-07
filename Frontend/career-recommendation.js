/* =========================================================
   career-recommendation.js
   Shows top 3 personalised career paths from assessment.
   Clicking "Choose This Path" → sets path → roadmap.html
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Full career data catalogue ── */
    const CAREER_DATA = {
        'Web Development': {
            icon: '💻', title: 'Web Developer',
            description: 'Build responsive, fast, and beautiful web applications using modern frameworks. High demand across every industry.',
            salary: '$80k – $130k', demand: 'Very High', demandClass: 'demand-vhigh', time: '5–8 months',
            skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Git']
        },
        'UI/UX Design': {
            icon: '🎨', title: 'UI/UX Designer',
            description: 'Design intuitive, beautiful digital experiences. Combine user psychology and visual design to shape how people interact with products.',
            salary: '$75k – $120k', demand: 'High', demandClass: 'demand-high', time: '5–7 months',
            skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems']
        },
        'Data Science': {
            icon: '📊', title: 'Data Scientist',
            description: 'Extract patterns from complex data to drive strategic decisions. Bridge raw information and actionable business intelligence.',
            salary: '$100k – $155k', demand: 'High', demandClass: 'demand-high', time: '7–10 months',
            skills: ['Python', 'SQL', 'Pandas', 'Statistics', 'Tableau']
        },
        'Machine Learning': {
            icon: '🤖', title: 'ML / AI Engineer',
            description: 'Train and deploy machine learning models that power intelligent applications, from NLP to computer vision.',
            salary: '$120k – $185k', demand: 'Very High', demandClass: 'demand-vhigh', time: '9–14 months',
            skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'MLOps']
        },
        'Cybersecurity': {
            icon: '🛡️', title: 'Cybersecurity Analyst',
            description: 'Protect organizations from digital threats. Monitor networks, find vulnerabilities, and respond to breaches.',
            salary: '$90k – $140k', demand: 'Very High', demandClass: 'demand-vhigh', time: '7–11 months',
            skills: ['Network Security', 'Linux', 'Ethical Hacking', 'SIEM', 'Cryptography']
        },
        'Cloud / DevOps': {
            icon: '☁️', title: 'Cloud / DevOps Engineer',
            description: 'Automate deployments and manage scalable cloud infrastructure. Bridge development and operations for continuous delivery.',
            salary: '$110k – $170k', demand: 'Very High', demandClass: 'demand-vhigh', time: '8–12 months',
            skills: ['AWS / Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD']
        },
        'Backend Development': {
            icon: '⚙️', title: 'Backend Developer',
            description: 'Build the server-side logic, APIs, and databases that power applications. Focus on performance, scalability, and reliability.',
            salary: '$95k – $145k', demand: 'Very High', demandClass: 'demand-vhigh', time: '6–9 months',
            skills: ['Node.js / Python', 'REST APIs', 'PostgreSQL', 'Redis', 'System Design']
        },
        'Mobile Development': {
            icon: '📱', title: 'Mobile Developer',
            description: 'Build native or cross-platform apps for iOS and Android with a focus on performance and touch-first UX.',
            salary: '$100k – $150k', demand: 'High', demandClass: 'demand-high', time: '6–10 months',
            skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Mobile UI']
        },
    };

    const container = document.getElementById('recommendations-list');
    if (!container) return;

    /* ── Read the top 3 from assessment scoring ── */
    const recommended = JSON.parse(localStorage.getItem('xyverra_recommended_paths') || '[]');

    // Fallback: if no assessment done yet, show top 3 defaults
    const topPaths = recommended.length >= 3
        ? recommended.slice(0, 3)
        : ['Web Development', 'UI/UX Design', 'Data Science'];

    /* â”€â”€ Render only the top 3 cards â”€â”€ */
    const RANK_LABELS = ['🥇 Best Match', '🥈 Great Match', '🥉 Good Match'];
    const RANK_COLORS = [
        'linear-gradient(135deg,#1E3A8A,#0F172A)', // beautiful dark blue for best match
        'linear-gradient(135deg,#1E40AF,#172554)', // slightly different dark blue for great match
        'linear-gradient(135deg,#1D4ED8,#1E3A8A)'  // slightly lighter dark blue for good match
    ];

    topPaths.forEach((pathKey, index) => {
        const c = CAREER_DATA[pathKey];
        if (!c) return;

        // Compute real match percentage from assessment scores
        let matchPct = 96 - (index * 7); // fallback if no scores
        try {
            const rawScores = JSON.parse(localStorage.getItem('xyverra_career_scores') || 'null');
            if (rawScores && typeof rawScores === 'object') {
                const allVals = Object.values(rawScores).filter(v => typeof v === 'number');
                const maxScore = Math.max(...allVals, 1);
                const pathScore = rawScores[pathKey];
                if (typeof pathScore === 'number' && maxScore > 0) {
                    // Scale: top path = 75–95%, second = proportionally lower, min 55%
                    matchPct = Math.max(55, Math.min(95, Math.round((pathScore / maxScore) * 95)));
                }
            }
        } catch (_) {}

        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.style.cssText = `
            background: white;
            border-radius: 20px;
            border: 1px solid rgba(0,0,0,0.07);
            box-shadow: 0 10px 40px -15px rgba(0,0,0,0.1);
            overflow: hidden;
            margin-bottom: 1.5rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        `;

        card.innerHTML = `
            <!-- Rank bar -->
            <div class="card-rank-header" style="background:${RANK_COLORS[index]};">
                <span class="rank-title">${RANK_LABELS[index]}</span>
                <span class="match-badge">${matchPct}% Match</span>
            </div>

            <!-- Card body -->
            <div class="card-body">
                <div class="rec-info-top">
                    <div class="rec-icon">${c.icon}</div>
                    <div class="rec-title-block">
                        <h2>${c.title}</h2>
                        <p class="rec-desc">${c.description}</p>
                    </div>
                </div>

                <!-- Stats row -->
                <div class="rec-stats">
                    <div class="stat-item">
                        <div class="stat-label">Est. Salary</div>
                        <div class="stat-value">${c.salary}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Demand</div>
                        <div class="stat-value ${c.demandClass}">${c.demand}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Time to Job</div>
                        <div class="stat-value">${c.time}</div>
                    </div>
                </div>

                <!-- Skill chips -->
                <div class="rec-skill-chips">
                    ${c.skills.map(s => `<span class="chip">${s}</span>`).join('')}
                </div>

                <!-- CTA button -->
                <div class="rec-actions">
                    <button class="choose-path-btn" data-path="${pathKey}" style="background:${RANK_COLORS[index]};">
                        <i class="fas fa-rocket"></i> Choose This Path - Start Learning
                    </button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    /* ── Choose a path → save it → redirect to roadmap ── */
    document.querySelectorAll('.choose-path-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const path = btn.getAttribute('data-path');

            // Save to localStorage immediately
            localStorage.setItem('xyverra_selected_path', path);
            localStorage.setItem('xyverra_target_career', path);
            localStorage.setItem('xyverra_onboarded', 'true');
            localStorage.setItem('userLevel', 'Beginner');

            // Loading state on button
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Setting up your roadmap...';
            btn.disabled = true;

            // Persist to backend (fire-and-forget is OK; localStorage is immediate fallback)
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (token) {
                try {
                    // Save path
                    await fetch('http://localhost:5000/api/user/save-path', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                        body: JSON.stringify({ selectedPath: path })
                    });
                    // Mark onboarding complete
                    await fetch('http://localhost:5000/api/user/save-onboarding', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                        body: JSON.stringify({ selectedLevel: 'Beginner' })
                    });
                } catch (e) {
                    console.warn('[CareerRec] Backend save failed, proceeding with localStorage only.', e);
                }
            }

            // Redirect to roadmap
            setTimeout(() => {
                window.location.href = 'roadmap.html';
            }, 600);
        });
    });

    /* ── Retake button ── */
    const retakeBtn = document.getElementById('retake-btn');
    if (retakeBtn) {
        retakeBtn.addEventListener('click', () => {
            localStorage.removeItem('xyverra_career_assessment');
            localStorage.removeItem('xyverra_recommended_paths');
            window.location.href = 'career-discovery.html';
        });
    }
});
