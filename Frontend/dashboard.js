/* ==========================================================
   dashboard.js — Xyverra Dashboard (Backend Integrated)
   ========================================================== */

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/user/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }
        
        const userData = await response.json();
        
        // Setup data
        const selectedPath = userData.selectedPath || "Web Development";
        const completedModules = userData.quizScores ? Object.keys(userData.quizScores).filter(moduleId => userData.quizScores[moduleId] >= 80) : [];
        const skillScore = userData.competencyScore || 0;
        const experienceRank = userData.experienceRank || 'Beginner';
        const streak = userData.dailyStreak || 0;
        
        // Name update
        const userNameEl = document.getElementById('user-welcome-name');
        if (userNameEl) userNameEl.textContent = userData.name || 'User';
        
        const userDisplayName = document.getElementById('user-display-name');
        if (userDisplayName) userDisplayName.textContent = userData.name || 'User';

        const userAvatar = document.getElementById('user-avatar');
        if (userAvatar) {
            userAvatar.textContent = (userData.name || 'U').charAt(0).toUpperCase();
        }
        
        // ── 2. Match roadmap path ───────────────────────────────
        const pathData = (typeof ROADMAP_DATA !== 'undefined')
            ? (ROADMAP_DATA[selectedPath] || ROADMAP_DATA[Object.keys(ROADMAP_DATA).find(k => selectedPath.includes(k))] || ROADMAP_DATA["Web Development"])
            : [];

        const totalSteps = pathData.length;
        let completedCount = 0;
        let currentModule = null;

        pathData.forEach(module => {
            if (completedModules.includes(module.id)) {
                completedCount++;
            } else if (!currentModule && module.id !== 'capstone') {
                currentModule = module;
            }
        });

        const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
        
        // ── 3. Update Metric Cards ──────────────────────────────
        
        // Bento Box 1: Competency Score
        const scoreDisplay = document.getElementById('user-score-display');
        if (scoreDisplay) scoreDisplay.textContent = skillScore;
        const scoreBar = document.getElementById('score-progress-bar');
        if (scoreBar) scoreBar.style.width = `${Math.min(100, skillScore)}%`;

        // Bento Box 2: Roadmap Progress
        const roadmapPct = document.getElementById('roadmap-pct-display');
        if (roadmapPct) roadmapPct.textContent = `${progressPct}%`;
        const roadmapSteps = document.getElementById('roadmap-steps-label');
        if (roadmapSteps) roadmapSteps.textContent = `${completedCount} of ${totalSteps} steps completed`;
        const roadmapBar = document.getElementById('roadmap-progress-bar');
        if (roadmapBar) roadmapBar.style.width = `${progressPct}%`;
        
        // Bento Box 3: Experience Rank
        const xpDisplay = document.getElementById('xp-display-val');
        if (xpDisplay) xpDisplay.textContent = (userData.totalXP || completedCount * 10).toLocaleString();
        const rankTitle = document.getElementById('user-rank-title');
        if (rankTitle) rankTitle.textContent = experienceRank;
        
        // Bento Box 4: Daily Tracker
        const streakVal = document.getElementById('streak-val-display');
        if (streakVal) streakVal.textContent = `${streak} Days`;
        
        // Milestones dots based on streak (cap at 5 for UI)
        const ptMilestones = document.querySelectorAll('.pt-milestone');
        ptMilestones.forEach((el, i) => {
            if (i < Math.min(streak, 5)) {
                el.classList.add('done');
            } else {
                el.classList.remove('done');
            }
        });
        
        // ── 5. Next Milestone Section ───────────────────────────
        const activeMilestoneTitle = document.getElementById('active-milestone-title');
        if (activeMilestoneTitle) {
            activeMilestoneTitle.textContent = currentModule ? currentModule.title : '🎉 Roadmap Completed!';
        }
        
        // ── Stats list ───────────────────────────
        const readinessPct = document.getElementById('readiness-pct-display');
        if (readinessPct) readinessPct.textContent = `${progressPct}%`;
        
        const userRole = document.getElementById('user-role-display');
        if (userRole) userRole.textContent = selectedPath;
        
        // ── 6. Skill Gap Analysis ───────────────────────────
        const validatedDisplay = document.getElementById('skills-validated-display');
        const gapDisplay = document.getElementById('skills-gap-display');
        if (validatedDisplay) validatedDisplay.textContent = completedCount;
        if (gapDisplay) gapDisplay.textContent = (totalSteps - completedCount);
        
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
});
