/* ==========================================================
   dashboard.js — Xyverra Dashboard (LocalStorage mock logic)
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // Auth check
    const email = localStorage.getItem('xyverra_user_email');
    if (!email) {
        window.location.href = 'login.html';
        return;
    }

    const userName = localStorage.getItem('xyverra_user_name') || 'Guest';
    const selectedPath = localStorage.getItem('xyverra_selected_path');
    const userRole = localStorage.getItem('xyverra_target_career');
    const hasRoadmap = localStorage.getItem('xyverra_roadmap') !== null;
    
    // 1. Populate UI headers
    const userNameEl = document.getElementById('user-welcome-name');
    if (userNameEl) userNameEl.textContent = userName;
    
    const userDisplayName = document.getElementById('user-display-name');
    if (userDisplayName) userDisplayName.textContent = userName;

    const userAvatar = document.getElementById('user-avatar');
    if (userAvatar) {
        userAvatar.textContent = (userName).charAt(0).toUpperCase();
    }

    // 2. Empty State Check (No roadmap yet)
    const dashboardGrid = document.querySelector('.metrics-grid');
    const contentGrid = document.querySelector('.content-grid');
    
    if (!hasRoadmap || !selectedPath) {
        // Show empty state
        if (dashboardGrid) dashboardGrid.style.display = 'none';
        if (contentGrid) contentGrid.innerHTML = `
            <div class="card-box" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🧭</div>
                <h2>Welcome to Xyverra, ${userName}!</h2>
                <p style="color: var(--text-muted); max-width: 500px; margin: 1rem auto 2rem;">Your learning journey hasn't started yet. Let's assess your skills, interests, and goals to recommend the perfect tech career path for you.</p>
                <button class="btn btn-primary" onclick="window.location.href = 'career-discovery.html'" style="font-size: 1.1rem; padding: 12px 24px;">
                    Start Career Discovery <i class="fas fa-arrow-right" style="margin-left:8px;"></i>
                </button>
            </div>
        `;
        return; // Stop further execution
    }

    // 3. Populate Dashboard Data for active roadmap
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    const skillScore = localStorage.getItem('xyverra_skill_score') || 0;
    const streak = localStorage.getItem('xyverra_user_streak') || 0;
    
    // Match roadmap path using ROADMAP_DATA if available (mocked stats)
    let totalSteps = 12; // fallback
    let currentModule = { title: "Introduction to " + selectedPath };

    if (typeof window.ROADMAP_DATA !== 'undefined' && window.ROADMAP_DATA[selectedPath]) {
        const pathData = window.ROADMAP_DATA[selectedPath];
        totalSteps = pathData.length;
        const uncompleted = pathData.filter(m => !completedModules.includes(m.id) && m.id !== 'capstone');
        if (uncompleted.length > 0) currentModule = uncompleted[0];
    }
    
    const completedCount = completedModules.length;
    const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
    
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
    
    // Bento Box 3: Experience Rank / Assigned Level
    const xpDisplay = document.getElementById('xp-display-val');
    if (xpDisplay) xpDisplay.textContent = (completedCount * 120).toLocaleString();
    
    const assignedLevel = localStorage.getItem('userLevel');
    const rankTitle = document.getElementById('user-rank-title');
    if (rankTitle) {
        if (assignedLevel) {
            rankTitle.textContent = assignedLevel;
        } else {
            if (progressPct < 30) rankTitle.textContent = "Beginner";
            else if (progressPct < 70) rankTitle.textContent = "Intermediate";
            else rankTitle.textContent = "Advanced";
        }
    }
    
    // Bento Box 4: Daily Tracker
    const streakVal = document.getElementById('streak-val-display');
    if (streakVal) streakVal.textContent = `${streak} Days`;
    
    const ptMilestones = document.querySelectorAll('.pt-milestone');
    ptMilestones.forEach((el, i) => {
        if (i < Math.min(streak, 5)) {
            el.classList.add('done');
        } else {
            el.classList.remove('done');
        }
    });
    
    // Next Milestone Section
    const activeMilestoneTitle = document.getElementById('active-milestone-title');
    if (activeMilestoneTitle) {
        activeMilestoneTitle.textContent = completedCount >= totalSteps ? '🎉 Roadmap Completed!' : currentModule.title;
    }
    
    // Stats list
    const readinessPct = document.getElementById('readiness-pct-display');
    if (readinessPct) readinessPct.textContent = `${progressPct}%`;
    
    const userRoleDisplay = document.getElementById('user-role-display');
    if (userRoleDisplay) userRoleDisplay.textContent = userRole || selectedPath;
    
    // Skill Gap Analysis
    const validatedDisplay = document.getElementById('skills-validated-display');
    const gapDisplay = document.getElementById('skills-gap-display');
    if (validatedDisplay) validatedDisplay.textContent = completedCount;
    if (gapDisplay) gapDisplay.textContent = Math.max(0, totalSteps - completedCount);
});
