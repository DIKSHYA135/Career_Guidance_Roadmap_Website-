/* ==========================================================
   skill-gap.js — AI-Powered Skill Gap Analysis Dashboard
   ========================================================== */

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initial Auth & Career Check
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    let targetCareer = localStorage.getItem('xyverra_selected_path');
    if (!targetCareer) {
        window.location.href = 'career-discovery.html';
        return;
    }

    // Pro Check
    if (typeof window.XyRequirePro === 'function') {
        if (!window.XyRequirePro('Advanced Skill Gap Analysis')) return;
    }

    document.getElementById('sg-career-goal').textContent = targetCareer;
    const today = new Date();
    document.getElementById('sg-last-updated').textContent = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    try {
        const API_BASE = (window.XYVERRA_CONFIG?.API_BASE || 'http://localhost:5000');
        const userRes = await fetch(`${API_BASE}/api/user/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const userData = await userRes.json();
        if (userData.success) {
            if (!userData.user.onboardingCompleted && !userData.user.selectedPath) {
                window.location.href = 'career-discovery.html';
                return;
            }
            if (userData.user.selectedPath) {
                targetCareer = userData.user.selectedPath;
                document.getElementById('sg-career-goal').textContent = targetCareer;
            }
        }
    } catch (e) {
        console.error("User profile fetch error:", e);
    }

    fetchSkillGapData(token, targetCareer);
});

async function fetchSkillGapData(token, targetCareer) {
    try {
        const res = await fetch(`${(window.XYVERRA_CONFIG?.API_BASE || 'http://localhost:5000')}/api/progress/skill-gap`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        
        if (!result.success) {
            showError("Could not load skill analysis.");
            return;
        }

        const data = result.data;
        processAndRenderDashboard(data, targetCareer);

    } catch (err) {
        console.error('Skill gap fetch error:', err);
        showError('Could not connect to the server. Please try again.');
    }
}

function processAndRenderDashboard(data, targetCareer) {
    // Consume fully processed backend data
    const { overallScore, skills, roadmapSkills } = data;
    const finalScore = overallScore;

    // Render Hero Card
    renderHeroCard(finalScore, skills);

    // 4. Strengths Section
    renderStrengths(skills.filter(s => s.type === 'validated'));

    // 5. Skill Gaps Table
    renderGapsTable(roadmapSkills);

    // 6. Personalized Learning Roadmap & 9. AI Action Plan
    renderRoadmapAndActionPlan(roadmapSkills);

    // 7. Recommended Courses
    renderRecommendedCourses(roadmapSkills, targetCareer);

    // 8. Career Readiness Meter
    renderReadinessMeter(finalScore);

    // 10. Progress Tracking Chart
    renderProgressChart(finalScore);
}

function renderHeroCard(score, skills) {
    document.getElementById('sg-match-pct').textContent = `${score}%`;
    
    // Circular progress animation
    const circle = document.getElementById('sg-circle-meter');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;
    
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);

    const statusEl = document.getElementById('sg-match-status');
    const summaryEl = document.getElementById('sg-hero-summary');

    let status = "";
    let summary = "";
    let color = "";

    if (score <= 40) {
        status = "Beginner";
        color = "#ef4444";
        summary = `You are at the beginning of your journey. Focus on the core fundamentals first.`;
    } else if (score <= 70) {
        status = "Developing";
        color = "#f59e0b";
        summary = `You are progressing well. Focus on your critical gaps to improve your career readiness.`;
    } else if (score <= 90) {
        status = "Job Ready";
        color = "#10b981";
        summary = `You have strong foundations and are considered job-ready for entry-level roles!`;
    } else {
        status = "Highly Prepared";
        color = "#3b82f6";
        summary = `You are highly prepared. Continue building advanced projects to stand out.`;
    }

    statusEl.textContent = status;
    statusEl.style.color = color;
    statusEl.style.backgroundColor = `${color}20`;
    circle.style.stroke = color;

    // AI Summary specifics
    const topGap = skills.find(s => s.type === 'critical');
    if (topGap && score <= 90) {
        summary = `You are progressing well. Focus heavily on <strong>${topGap.name}</strong> to improve your career readiness.`;
    }
    summaryEl.innerHTML = summary;
}

function renderStrengths(strengths) {
    const container = document.getElementById('sg-strengths-container');
    if (strengths.length === 0) {
        container.innerHTML = `<span class="sg-empty-state">No major strengths validated yet. Keep learning!</span>`;
        return;
    }
    
    container.innerHTML = strengths.map(s => 
        `<div class="sg-strength-badge"><i class="fas fa-check"></i> ${s.name}</div>`
    ).join('');
}

function renderGapsTable(roadmapSkills) {
    const tbody = document.getElementById('sg-gaps-table-body');
    if (roadmapSkills.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="sg-empty-state">No skill gaps found. Great job!</td></tr>`;
        return;
    }

    tbody.innerHTML = roadmapSkills.map(s => {
        let gapClass = "";
        if (s.type === "critical") {
            gapClass = "gap-critical";
        } else if (s.gapLevel === "High Gap") {
            gapClass = "gap-high";
        } else if (s.gapLevel === "Moderate Gap") {
            gapClass = "gap-moderate";
        }

        return `
            <tr>
                <td><strong>${s.name}</strong></td>
                <td>${s.requiredLevel}%</td>
                <td>${s.currentLevel}%</td>
                <td><span class="sg-gap-level ${gapClass}">${s.gapLevel}</span></td>
            </tr>
        `;
    }).join('');
}

function renderRoadmapAndActionPlan(roadmapSkills) {
    const roadmapContainer = document.getElementById('sg-roadmap-container');
    const checklistContainer = document.getElementById('sg-checklist-container');

    if (roadmapSkills.length === 0) {
        roadmapContainer.innerHTML = `<div class="sg-empty-state">You're fully prepared! Take an advanced capstone.</div>`;
        checklistContainer.innerHTML = `<div class="sg-empty-state">No immediate actions required.</div>`;
        return;
    }

    const topGaps = roadmapSkills.slice(0, 4); // Max 4 steps

    // Roadmap
    roadmapContainer.innerHTML = topGaps.map((gap, index) => {
        const diff = gap.currentLevel < 20 ? "Beginner" : "Intermediate";
        const duration = gap.currentLevel < 20 ? "2-3 weeks" : "1-2 weeks";
        return `
            <div class="sg-step">
                <div class="sg-step-num">${index + 1}</div>
                <div class="sg-step-content">
                    <h4>Master ${gap.name}</h4>
                    <div class="sg-step-meta">
                        <span><i class="fas fa-clock"></i> Est. ${duration}</span> | 
                        <span><i class="fas fa-signal"></i> ${diff}</span>
                    </div>
                    <button class="btn btn-outline" style="font-size:0.8rem; padding:0.4rem 0.8rem;" onclick="window.location.href='roadmap.html'">Start Learning</button>
                </div>
            </div>
        `;
    }).join('');

    // Action Plan Checklist
    const actions = topGaps.map(g => `Complete the Fundamentals course for ${g.name}`);
    if (topGaps.length > 0) actions.push(`Score above 75% in the ${topGaps[0].name} Assessment`);
    actions.push(`Build 1 Portfolio Project using newly acquired skills`);
    actions.push(`Retake Skill Assessment in 2 weeks`);

    checklistContainer.innerHTML = actions.map(a => `
        <div class="sg-check-item">
            <i class="far fa-square"></i>
            <span>${a}</span>
        </div>
    `).join('');
}

function renderRecommendedCourses(roadmapSkills, targetCareer) {
    const container = document.getElementById('sg-courses-container');
    
    if (typeof ROADMAP_DATA === 'undefined') {
        container.innerHTML = `<div class="sg-empty-state">Course catalog unavailable.</div>`;
        return;
    }

    const pathData = ROADMAP_DATA[targetCareer];
    let recommended = [];

    if (pathData) {
        roadmapSkills.forEach(gap => {
            const keyword = gap.name.split(' ')[0].toLowerCase();
            const match = pathData.find(m => m.title.toLowerCase().includes(keyword) || m.desc.toLowerCase().includes(keyword));
            if (match && !recommended.find(r => r.id === match.id)) {
                recommended.push(match);
            }
        });

        if (recommended.length === 0) {
            recommended = pathData.slice(0, 3);
        }
    } else {
        const fallbackPath = ROADMAP_DATA["Web Development"];
        if (fallbackPath) recommended = fallbackPath.slice(0, 3);
    }

    if (recommended.length === 0) {
        container.innerHTML = `<div class="sg-empty-state">No specific courses recommended at this time.</div>`;
        return;
    }

    container.innerHTML = recommended.slice(0, 3).map(mod => {
        const courseCount = mod.courses ? mod.courses.length : 'Multiple';
        return `
            <div class="sg-course-card">
                <div>
                    <h4 class="sg-course-title">${mod.title}</h4>
                    <p class="sg-course-meta"><i class="fas fa-layer-group"></i> ${courseCount} Lessons</p>
                </div>
                <button class="btn btn-primary" onclick="window.location.href='roadmap.html'" style="width:100%; padding:0.5rem;">View Course</button>
            </div>
        `;
    }).join('');
}

function renderReadinessMeter(score) {
    const scoreEl = document.getElementById('sg-readiness-score');
    const barEl = document.getElementById('sg-readiness-bar');
    const textEl = document.getElementById('sg-readiness-text');

    const readiness = Math.max(0, score - 5);
    
    scoreEl.textContent = `${readiness}%`;
    setTimeout(() => {
        barEl.style.width = `${readiness}%`;
    }, 200);

    if (readiness < 40) {
        textEl.textContent = "You are just getting started. Focus on your foundational roadmap.";
    } else if (readiness < 70) {
        textEl.textContent = "You are approaching job readiness. Complete your critical gaps.";
    } else {
        textEl.textContent = "You are highly prepared for entry-level roles in this field!";
    }
}

function renderProgressChart(currentScore) {
    const ctx = document.getElementById('sg-progress-chart');
    if (!ctx) return;

    const months = [];
    const data = [];
    const d = new Date();
    
    for (let i = 5; i >= 0; i--) {
        const past = new Date(d.getFullYear(), d.getMonth() - i, 1);
        months.push(past.toLocaleDateString('en-US', { month: 'short' }));
        
        if (i === 0) {
            data.push(currentScore);
        } else {
            const pastScore = Math.max(10, currentScore - (i * 12));
            data.push(pastScore);
        }
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Skill Match %',
                data: data,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#2563eb',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) { return value + '%' }
                    }
                }
            }
        }
    });
}

function showError(msg) {
    const container = document.querySelector('.sg-container');
    if (container) {
        container.innerHTML = `<div class="sg-card" style="text-align:center; padding: 4rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 1rem;"></i>
            <h2>Oops!</h2>
            <p style="color: var(--text-muted);">${msg}</p>
            <button class="btn btn-primary" style="margin-top: 1.5rem;" onclick="location.reload()">Try Again</button>
        </div>`;
    }
}

