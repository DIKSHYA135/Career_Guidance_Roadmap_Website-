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

    /* ── Render only the top 3 cards ── */
    const RANK_LABELS = ['🥇 Best Match', '🥈 Great Match', '🥉 Good Match'];
    const RANK_COLORS = [
        'linear-gradient(135deg,#2563EB,#7C3AED)',
        'linear-gradient(135deg,#0EA5E9,#2563EB)',
        'linear-gradient(135deg,#6366F1,#8B5CF6)'
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
            <div style="background:${RANK_COLORS[index]};padding:10px 24px;display:flex;align-items:center;justify-content:space-between;">
                <span style="color:white;font-weight:700;font-size:0.9rem;letter-spacing:0.3px;">${RANK_LABELS[index]}</span>
                <span style="background:rgba(255,255,255,0.2);color:white;padding:3px 12px;border-radius:100px;font-weight:700;font-size:0.85rem;">
                    ${matchPct}% Match
                </span>
            </div>

            <!-- Card body -->
            <div style="padding:1.75rem 2rem;">
                <div style="display:flex;align-items:flex-start;gap:1.25rem;margin-bottom:1.25rem;">
                    <div style="font-size:2.8rem;line-height:1;">${c.icon}</div>
                    <div>
                        <h2 style="font-size:1.5rem;font-weight:800;color:var(--text-dark);margin:0 0 0.35rem;">${c.title}</h2>
                        <p style="color:var(--text-muted);margin:0;font-size:0.95rem;line-height:1.6;">${c.description}</p>
                    </div>
                </div>

                <!-- Stats row -->
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;background:#F8FAFC;border-radius:12px;padding:1rem 1.25rem;margin-bottom:1.25rem;">
                    <div>
                        <div style="font-size:0.75rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:0.25rem;">Est. Salary</div>
                        <div style="font-weight:700;color:var(--text-dark);font-size:0.95rem;">${c.salary}</div>
                    </div>
                    <div>
                        <div style="font-size:0.75rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:0.25rem;">Demand</div>
                        <div style="font-weight:700;color:${c.demandClass==='demand-vhigh'?'#10B981':'#2563EB'};font-size:0.95rem;">${c.demand}</div>
                    </div>
                    <div>
                        <div style="font-size:0.75rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:0.25rem;">Time to Job</div>
                        <div style="font-weight:700;color:var(--text-dark);font-size:0.95rem;">${c.time}</div>
                    </div>
                </div>

                <!-- Skill chips -->
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1.5rem;">
                    ${c.skills.map(s => `<span style="background:rgba(37,99,235,0.08);color:var(--primary);padding:4px 12px;border-radius:100px;font-size:0.8rem;font-weight:600;">${s}</span>`).join('')}
                </div>

                <!-- CTA button -->
                <button class="choose-path-btn" data-path="${pathKey}"
                    style="width:100%;padding:14px;border:none;border-radius:12px;background:${RANK_COLORS[index]};color:white;font-size:1rem;font-weight:700;cursor:pointer;transition:all 0.3s ease;display:flex;align-items:center;justify-content:center;gap:10px;">
                    <i class="fas fa-rocket"></i> Choose This Path - Start Learning
                </button>
            </div>
        `;

        // Hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 20px 50px -15px rgba(0,0,0,0.15)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 40px -15px rgba(0,0,0,0.1)';
        });

        container.appendChild(card);
    });

    /* ── Choose a path → save it → redirect to roadmap ── */
    document.querySelectorAll('.choose-path-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const path = btn.getAttribute('data-path');

            // Save the selected path
            localStorage.setItem('xyverra_selected_path', path);
            localStorage.setItem('xyverra_target_career', path);
            localStorage.setItem('xyverra_onboarded', 'true');
            localStorage.setItem('userLevel', 'Beginner'); // default level

            // Loading state on button
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Setting up your roadmap...';
            btn.disabled = true;

            // Redirect straight to roadmap
            setTimeout(() => {
                window.location.href = 'roadmap.html';
            }, 800);
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
