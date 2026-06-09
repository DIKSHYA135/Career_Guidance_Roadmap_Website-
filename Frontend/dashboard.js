/* ==========================================================
   dashboard.js — Xyverra Dashboard (LocalStorage mock logic)
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // Auth + onboarding already enforced by auth-guard.js
    // If we reach here the user is logged in.
    const email = localStorage.getItem('xyverra_user_email');
    if (!email) { window.location.replace('login.html'); return; }

    const userName      = localStorage.getItem('xyverra_user_name') || 'Guest';
    const selectedPath  = localStorage.getItem('xyverra_selected_path') || localStorage.getItem('xyverra_target_career') || '';
    const onboardingDone = localStorage.getItem('xyverra_onboarded') === 'true';
    // Only show full dashboard if the user completed onboarding
    const hasRoadmap = (onboardingDone || localStorage.getItem('roadmapGenerated') === 'true') && !!selectedPath;
    
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
        if (dashboardGrid) dashboardGrid.style.display = 'none';
        
        // Hide user stats in sidebar if no path
        const userDisplay = document.querySelector('.profile-text p');
        if (userDisplay) userDisplay.textContent = 'Learning Path Unassigned';

        if (contentGrid) {
            contentGrid.style.gridTemplateColumns = '1fr';
            contentGrid.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60vh; text-align:center; padding:3rem 2rem;">
                    <div style="font-size:4rem; margin-bottom:1.25rem;">🧭</div>
                    <h2 style="font-size:1.6rem; font-weight:800; color:var(--text-dark); margin-bottom:0.75rem;">No career path selected yet</h2>
                    <p style="color:var(--text-muted); max-width:480px; line-height:1.65; margin-bottom:2rem;">
                        You haven't picked a career path yet! Start with Career Discovery — we'll ask you a few questions and match you to the best tech career for you.
                    </p>
                    <a href="career-discovery.html" class="btn btn-primary" style="font-size:1rem; padding:12px 28px; display:inline-flex; align-items:center; gap:0.5rem;">
                        <i class="fas fa-compass"></i> Start Career Discovery
                    </a>
                </div>`;
        }
        return;
    }

    // 3. Populate Dashboard Data for active roadmap
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    const skillScore = localStorage.getItem('xyverra_skill_score') || 0;
    const streak = localStorage.getItem('xyverra_user_streak') || 0;
    
    // Match roadmap path using ROADMAP_DATA if available (mocked stats)
    let totalSteps = 12; // fallback
    let currentModule = { title: "Introduction to " + selectedPath };

    if (typeof ROADMAP_DATA !== 'undefined' && ROADMAP_DATA[selectedPath]) {
        const pathData = ROADMAP_DATA[selectedPath];
        totalSteps = pathData.length;
        const uncompleted = pathData.filter(m => !completedModules.includes(m.id) && m.id !== 'capstone');
        if (uncompleted.length > 0) currentModule = uncompleted[0];
    }
    
    const completedCount = completedModules.length;
    const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
    
    // Compute Career Readiness Score (0-100)
    // Formula: 60% Roadmap Progress, 20% Quiz Scores, 20% XP (Max 3000 XP)
    const rawQuizScores = JSON.parse(localStorage.getItem('moduleQuizPassed') || '{}');
    const quizCount = Object.keys(rawQuizScores).length;
    const avgQuiz = quizCount > 0 ? Object.values(rawQuizScores).reduce((a,b) => a+b, 0) / quizCount : 0;
    
    const xp = (completedCount * 120) + (streak * 50);
    const xpPct = Math.min(100, (xp / 3000) * 100);
    
    const careerReadinessScore = Math.round((progressPct * 0.6) + (avgQuiz * 0.2) + (xpPct * 0.2));
    
    // Bento Box 1: Career Readiness Score
    const scoreDisplay = document.getElementById('user-score-display');
    if (scoreDisplay) scoreDisplay.textContent = `${careerReadinessScore}%`;
    const scoreBar = document.getElementById('score-progress-bar');
    if (scoreBar) scoreBar.style.width = `${careerReadinessScore}%`;

    // Bento Box 2: Roadmap Progress
    const roadmapPct = document.getElementById('roadmap-pct-display');
    if (roadmapPct) roadmapPct.textContent = `${progressPct}%`;
    const roadmapSteps = document.getElementById('roadmap-steps-label');
    if (roadmapSteps) roadmapSteps.textContent = `${completedCount} of ${totalSteps} steps completed`;
    const roadmapBar = document.getElementById('roadmap-progress-bar');
    if (roadmapBar) roadmapBar.style.width = `${progressPct}%`;
    
    // Bento Box 3: Experience Rank / Job Ready Level
    const xpDisplay = document.getElementById('xp-display-val');
    if (xpDisplay) xpDisplay.textContent = `${xp.toLocaleString()} XP`;
    
    const rankTitle = document.getElementById('user-rank-title');
    if (rankTitle) {
        if (careerReadinessScore < 30) rankTitle.textContent = "Beginner";
        else if (careerReadinessScore < 60) rankTitle.textContent = "Intermediate";
        else if (careerReadinessScore < 85) rankTitle.textContent = "Advanced";
        else rankTitle.textContent = "Job Ready";
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
    const readinessPctDisplay = document.getElementById('readiness-pct-display');
    if (readinessPctDisplay) readinessPctDisplay.textContent = `${careerReadinessScore}%`;
    
    const userRoleDisplay = document.getElementById('user-role-display');
    if (userRoleDisplay) userRoleDisplay.textContent = userRole || selectedPath;
    
    // Skill Gap Analysis
    const validatedDisplay = document.getElementById('skills-validated-display');
    const gapDisplay = document.getElementById('skills-gap-display');
    if (validatedDisplay) validatedDisplay.textContent = completedCount;
    if (gapDisplay) gapDisplay.textContent = Math.max(0, totalSteps - completedCount);
    // Recommended Resources (Phase 2)
    const recommendedContainer = document.getElementById('recommended-links-container');
    if (recommendedContainer && currentModule.courses && currentModule.courses.length > 0) {
        let html = '';
        currentModule.courses.slice(0, 3).forEach(course => {
            html += `
                <a href="${course.url}" target="_blank" class="resource-link-card" style="display:flex; align-items:center; justify-content:space-between; padding:0.8rem 1rem; background:var(--bg-surface-solid); border:1px solid var(--border); border-radius:var(--radius-md); text-decoration:none; color:var(--text-dark); transition:all 0.2s;">
                    <div style="display:flex; align-items:center; gap:0.8rem;">
                        <div class="resource-icon" style="color:var(--primary); background:rgba(37,99,235,0.1); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center;">
                            <i class="fas fa-play-circle"></i>
                        </div>
                        <span style="font-weight:600; font-size:0.95rem;">${course.name}</span>
                    </div>
                    <i class="fas fa-external-link-alt" style="color:var(--text-muted); font-size:0.8rem;"></i>
                </a>
            `;
        });
        recommendedContainer.innerHTML = html;
        
        // Add hover effect style dynamically if not present
        if (!document.getElementById('resource-hover-style')) {
            const style = document.createElement('style');
            style.id = 'resource-hover-style';
            style.innerHTML = `
                .resource-link-card:hover { border-color: var(--primary) !important; transform: translateX(4px); box-shadow: var(--shadow-sm); }
            `;
            document.head.appendChild(style);
        }
    } else if (recommendedContainer && totalSteps > 0 && completedCount === 0) {
        recommendedContainer.innerHTML = `
            <div style="text-align:center; padding: 2rem 1rem; background: var(--bg-surface-solid); border: 1px dashed var(--border); border-radius: var(--radius-lg);">
                <i class="fas fa-folder-open" style="font-size:2.5rem; color:var(--text-muted); margin-bottom:1rem; opacity: 0.5;"></i>
                <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.5rem;">No resources unlocked yet</h4>
                <p style="color:var(--text-muted); font-size: 0.9rem;">Start your first roadmap module to receive AI-curated learning materials.</p>
            </div>
        `;
    } else if (recommendedContainer) {
        recommendedContainer.innerHTML = `
            <div style="text-align:center; padding: 1.5rem; color:var(--text-muted);">
                <i class="fas fa-check-circle" style="font-size:2rem; color:var(--success); margin-bottom:0.5rem;"></i>
                <p>You've completed all required resources for this milestone!</p>
            </div>
        `;
    }

    // Activity Timeline (Phase 2)
    const timelineContainer = document.getElementById('activity-timeline-container');
    const timelinePathName = document.getElementById('timeline-path-name');
    if (timelinePathName) timelinePathName.textContent = selectedPath;
    
    if (timelineContainer) {
        if (completedModules && completedModules.length > 0) {
            completedModules.forEach(modId => {
                timelineContainer.insertAdjacentHTML('afterbegin', `
                    <div style="position: relative; margin-bottom: 1.5rem;">
                        <div style="position: absolute; left: -1.35rem; top: 0; width: 12px; height: 12px; border-radius: 50%; background: var(--primary); border: 2px solid white; box-shadow: 0 0 0 2px var(--primary);"></div>
                        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem;">Completed: ${modId}</h4>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">You passed the assessment and leveled up your skills.</p>
                    </div>
                `);
            });
        } else {
            // Empty state for timeline
            timelineContainer.insertAdjacentHTML('beforeend', `
                <div style="position: relative; margin-bottom: 1.5rem; opacity: 0.6;">
                    <div style="position: absolute; left: -1.35rem; top: 0; width: 12px; height: 12px; border-radius: 50%; background: var(--text-muted); border: 2px solid white; box-shadow: 0 0 0 2px var(--border);"></div>
                    <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem;">No activity yet</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted);">Your learning achievements and milestones will appear here once you start your journey.</p>
                </div>
            `);
        }
    }
});
