/* ==========================================================
   dashboard.js — Xyverra Dashboard (LocalStorage mock logic)
   Premium redesign — same data contract, enhanced visuals.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Auth + onboarding already enforced by auth-guard.js
    const email = localStorage.getItem('xyverra_user_email');
    if (!email) { window.location.replace('login.html'); return; }

    const userName       = localStorage.getItem('xyverra_user_name') || 'Guest';
    const selectedPath   = localStorage.getItem('xyverra_selected_path') || localStorage.getItem('xyverra_target_career') || '';
    const userRole       = localStorage.getItem('xyverra_user_role') || '';
    const onboardingDone = localStorage.getItem('xyverra_onboarded') === 'true';
    const hasRoadmap     = (onboardingDone || localStorage.getItem('roadmapGenerated') === 'true') && !!selectedPath;

    // ---- Header date pill — always uses real local time ----
    const headerDate = document.getElementById('header-date');
    if (headerDate) {
        const now = new Date();
        headerDate.textContent = now.toLocaleDateString(undefined, {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
        });
    }

    // ---- Populate UI headers ----
    const userNameEl = document.getElementById('user-welcome-name');
    if (userNameEl) userNameEl.textContent = userName;

    const userDisplayName = document.getElementById('user-display-name');
    if (userDisplayName) userDisplayName.textContent = userName;

    const userAvatar = document.getElementById('user-avatar');
    if (userAvatar) userAvatar.textContent = (userName).charAt(0).toUpperCase();

    // ---- Empty State (no roadmap) ----
    const dashboardGrid = document.querySelector('.metrics-grid');
    const contentGrid   = document.querySelector('.content-grid');

    if (!hasRoadmap || !selectedPath) {
        if (dashboardGrid) dashboardGrid.style.display = 'none';
        const quickActions = document.querySelector('.quick-actions-grid');
        if (quickActions) quickActions.style.display = 'none';
        document.querySelectorAll('.section-label').forEach(el => el.style.display = 'none');

        const userDisplay = document.querySelector('.profile-text p');
        if (userDisplay) userDisplay.textContent = 'Learning Path Unassigned';

        if (contentGrid) {
            contentGrid.style.gridTemplateColumns = '1fr';
            contentGrid.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:55vh; text-align:center; padding:3rem 2rem; background:var(--bg-surface); border:1px dashed var(--border-strong); border-radius:var(--radius-2xl);">
                    <div style="font-size:4rem; margin-bottom:1.25rem;">🧭</div>
                    <h2 style="font-size:1.6rem; font-weight:800; color:var(--text-dark); margin-bottom:0.75rem;">No career path selected yet</h2>
                    <p style="color:var(--text-muted); max-width:480px; line-height:1.65; margin-bottom:2rem;">
                        You haven't picked a career path yet! Start with Career Discovery. We'll ask you a few questions and match you to the best tech career for you.
                    </p>
                    <a href="career-discovery.html" class="btn btn-primary" style="font-size:1rem; padding:12px 28px; display:inline-flex; align-items:center; gap:0.5rem;">
                        <i class="fas fa-compass"></i> Start Career Discovery
                    </a>
                </div>`;
        }
        return;
    }

    // ── Sync fresh data from server (/api/user/me) ────────────────────────────
    // Fire-and-forget: merges server state into localStorage then re-renders.
    // Uses the same memoized fetch as roadmap.js (also loaded on this page for
    // the roadmap-preview widget) so only one network request is made, not two.
    function syncFromServer() {
        const token = localStorage.getItem('token');
        if (!token) return;
        const fetchMe = window.xyFetchUserMe || (t => fetch((window.XYVERRA_CONFIG?.API_BASE || 'http://localhost:5000') + '/api/user/me', {
            headers: { 'Authorization': 'Bearer ' + t }
        }).then(r => r.ok ? r.json() : null).catch(() => null));
        fetchMe(token)
        .then(data => {
            if (!data || !data.success) return;
            const u = data.user;
            if (u.name)            localStorage.setItem('xyverra_user_name', u.name);
            if (u.selectedPath)    localStorage.setItem('xyverra_selected_path', u.selectedPath);
            if (u.selectedLevel)   localStorage.setItem('xyverra_selected_level', u.selectedLevel);
            if (typeof u.dailyStreak === 'number')
                localStorage.setItem('xyverra_user_streak', String(u.dailyStreak));
            if (Array.isArray(u.completedModules))
                localStorage.setItem('completedModules', JSON.stringify(u.completedModules));
            if (u.quizScores && typeof u.quizScores === 'object') {
                const scores = {};
                Object.entries(u.quizScores).forEach(([k, v]) => { scores[k] = v; });
                localStorage.setItem('xyverra_quiz_scores', JSON.stringify(scores));
            }
            if (typeof u.readinessScore === 'number')
                localStorage.setItem('xyverra_readiness_score', String(u.readinessScore));
            if (typeof u.experienceRank === 'number')
                localStorage.setItem('xyverra_xp', String(u.experienceRank));
            if (Array.isArray(u.completedRoadmaps))
                localStorage.setItem('completedRoadmaps', JSON.stringify(u.completedRoadmaps));
            // Re-render stats with fresher data after server sync
            renderDashboardStats();
        })
        .catch(() => {});
    }
    syncFromServer();

    function renderDashboardStats() {
        // ---- Compute stats ----
        const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
        const streak = parseInt(localStorage.getItem('xyverra_user_streak') || 0, 10);
    
        let totalSteps = 12;
        let currentModule = { title: "Introduction to " + selectedPath };

        // Shared resolver (roadmap-data.js) — keeps this page, Roadmap, and Progress consistent.
        const matchedPathKey = (typeof ROADMAP_DATA !== 'undefined' && window.resolveRoadmapPathKey)
            ? window.resolveRoadmapPathKey(selectedPath)
            : selectedPath;

        let completedCount = 0;
        if (typeof ROADMAP_DATA !== 'undefined' && ROADMAP_DATA[matchedPathKey]) {
            const pathData = ROADMAP_DATA[matchedPathKey];
            totalSteps = pathData.length;
            
            // Calculate completed count ONLY for modules in this roadmap
            completedCount = pathData.filter(m => completedModules.includes(m.id)).length;
            
            const uncompleted = pathData.filter(m => !completedModules.includes(m.id) && m.id !== 'capstone');
            if (uncompleted.length > 0) currentModule = uncompleted[0];
        } else {
            completedCount = completedModules.length; // Fallback if no roadmap data
        }
    
        const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
    
        const rawQuizScores = JSON.parse(localStorage.getItem('xyverra_quiz_scores') || '{}');
        const quizCount = Object.keys(rawQuizScores).length;
        const avgQuiz = quizCount > 0 ? Object.values(rawQuizScores).reduce((a, b) => a + b, 0) / quizCount : 0;
    
        const xp = parseInt(localStorage.getItem('xyverra_xp') || 0, 10);
        const xpPct = Math.min(100, (xp / 3000) * 100);

        // Job Readiness Score — canonical value computed & persisted server-side
        // (backend/utils/readiness.js), synced into localStorage on every server sync
        // so Dashboard, Career Analytics, Progress and Admin Panel never disagree.
        // Fall back to a rough local estimate only before the first server sync completes.
        const cachedReadiness = localStorage.getItem('xyverra_readiness_score');
        const careerReadinessScore = cachedReadiness !== null
            ? parseInt(cachedReadiness, 10)
            : Math.round((progressPct * 0.4) + (avgQuiz * 0.3) + (xpPct * 0.2));

        // Helper: animate a number from 0 to target
        function animateNumber(el, target, suffix = '', duration = 900) {
            if (!el) return;
            const start = performance.now();
            function tick(now) {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                el.textContent = Math.round(target * eased) + suffix;
                if (t < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        }
    
        // ---- Career Readiness (circular ring) ----
        const scoreDisplay = document.getElementById('user-score-display');
        animateNumber(scoreDisplay, careerReadinessScore, '%');
    
        const ringFg = document.getElementById('readiness-ring-fg');
        if (ringFg) {
            const circumference = 2 * Math.PI * 36; // ~226
            ringFg.style.strokeDasharray = circumference;
            // Defer so the transition animates from full offset.
            requestAnimationFrame(() => {
                ringFg.style.strokeDashoffset = circumference * (1 - careerReadinessScore / 100);
            });
        }
        const scoreBar = document.getElementById('score-progress-bar');
        if (scoreBar) scoreBar.style.width = `${careerReadinessScore}%`;
    
        // ---- Roadmap Progress ----
        const roadmapPct = document.getElementById('roadmap-pct-display');
        animateNumber(roadmapPct, progressPct, '%');
        const roadmapSteps = document.getElementById('roadmap-steps-label');
        if (roadmapSteps) roadmapSteps.textContent = `${completedCount} of ${totalSteps} steps completed`;
        const roadmapBar = document.getElementById('roadmap-progress-bar');
        if (roadmapBar) requestAnimationFrame(() => { roadmapBar.style.width = `${Math.max(progressPct, 2)}%`; });
    
        // ---- Job Ready Level ----
        const xpDisplay = document.getElementById('xp-display-val');
        if (xpDisplay) xpDisplay.textContent = `${xp.toLocaleString()} XP`;
    
        // Job Readiness classification — must match backend/utils/readiness.js exactly.
        const rankTitle = document.getElementById('user-rank-title');
        if (rankTitle) {
            if (careerReadinessScore >= 90) rankTitle.textContent = "Outstanding";
            else if (careerReadinessScore >= 70) rankTitle.textContent = "Excellent";
            else if (careerReadinessScore >= 50) rankTitle.textContent = "Good";
            else if (careerReadinessScore >= 30) rankTitle.textContent = "Fair";
            else rankTitle.textContent = "Beginner";
        }
        const rankBar = document.getElementById('rank-progress-bar');
        if (rankBar) requestAnimationFrame(() => { rankBar.style.width = `${Math.max(xpPct, 4)}%`; });
    
        // ---- Daily Tracker ----
        const streakVal = document.getElementById('streak-val-display');
        if (streakVal) streakVal.textContent = `${streak} Days`;

        // Build a dynamic 5-day window ending on TODAY (real system date)
        const ptRow = document.getElementById('pt-milestones-row');
        if (ptRow) {
            const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const dayFullNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const today = new Date();
            const todayIdx = today.getDay(); // 0=Sun … 6=Sat

            // Build the last 5 days ending with today
            const days = [];
            for (let offset = 4; offset >= 0; offset--) {
                const d = new Date(today);
                d.setDate(today.getDate() - offset);
                days.push({ label: dayLabels[d.getDay()], fullName: dayFullNames[d.getDay()], isToday: offset === 0 });
            }

            // Render dots — mark as 'done' based on streak count (streak fills from today backwards)
            ptRow.innerHTML = days.map((day, i) => {
                // i=0 is 4 days ago, i=4 is today
                // A day is "done" if it falls within the streak window (streak days back from today)
                const doneFromToday = 4 - i; // how many days ago this slot is
                const isDone = doneFromToday < streak;
                const isToday = day.isToday;
                return `<div class="pt-milestone${isDone ? ' done' : ''}${isToday ? ' today' : ''}" title="${day.fullName}">
                    <div class="pt-dot"${isDone && isToday ? ' style="animation: pulseDot 2s infinite"' : ''}></div>
                    <span>${day.label}</span>
                </div>`;
            }).join('');
        }
    
        // ---- Active Milestone ----
        const activeMilestoneTitle = document.getElementById('active-milestone-title');
        if (activeMilestoneTitle) {
            activeMilestoneTitle.textContent = completedCount >= totalSteps ? '🏆 Roadmap Completed!' : currentModule.title;
        }
    
        // ---- Skill Projection stats ----
        const readinessPctDisplay = document.getElementById('readiness-pct-display');
        if (readinessPctDisplay) readinessPctDisplay.textContent = `${careerReadinessScore}%`;
    
        const userRoleDisplay = document.getElementById('user-role-display');
        if (userRoleDisplay) userRoleDisplay.textContent = userRole || selectedPath;
    
        // ---- Skill Gap ----
        const validatedDisplay = document.getElementById('skills-validated-display');
        const gapDisplay = document.getElementById('skills-gap-display');
        if (validatedDisplay) validatedDisplay.textContent = completedCount;
        if (gapDisplay) gapDisplay.textContent = Math.max(0, totalSteps - completedCount);
    
        // ---- Recommended Resources ----
        const recommendedContainer = document.getElementById('recommended-links-container');
        if (recommendedContainer && currentModule.courses && currentModule.courses.length > 0) {
            let html = '';
            currentModule.courses.slice(0, 3).forEach(course => {
                html += `
                    <a href="${course.url}" class="resource-link-card">
                        <div style="display:flex; align-items:center; gap:0.8rem; min-width:0;">
                            <div class="resource-icon" style="color:var(--primary); background:var(--indigo-soft, rgba(79,70,229,0.1)); width:34px; height:34px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                <i class="fas fa-play-circle"></i>
                            </div>
                            <span style="font-weight:600; font-size:0.9rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${course.name}</span>
                        </div>
                        <i class="fas fa-chevron-right" style="color:var(--text-muted); font-size:0.8rem; flex-shrink:0;"></i>
                    </a>`;
            });
            recommendedContainer.innerHTML = html;
        } else if (recommendedContainer && totalSteps > 0 && completedCount === 0) {
            recommendedContainer.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding: 2rem 1rem; background: var(--bg-surface-hover); border: 1px dashed var(--border); border-radius: var(--radius-lg);">
                    <i class="fas fa-folder-open" style="font-size:2.5rem; color:var(--text-muted); margin-bottom:1rem; opacity: 0.5;"></i>
                    <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.5rem;">No resources unlocked yet</h4>
                    <p style="color:var(--text-muted); font-size: 0.9rem;">Start your first roadmap module to receive AI-curated learning materials.</p>
                </div>`;
        } else if (recommendedContainer) {
            recommendedContainer.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding: 1.5rem; color:var(--text-muted);">
                    <i class="fas fa-check-circle" style="font-size:2rem; color:var(--success); margin-bottom:0.5rem;"></i>
                    <p>You've completed all required resources for this milestone!</p>
                </div>`;
        }
    
        // ---- Activity Timeline ----
        const timelineContainer = document.getElementById('activity-timeline-container');
        const timelinePathName = document.getElementById('timeline-path-name');
        if (timelinePathName) timelinePathName.textContent = selectedPath;
    
        if (timelineContainer) {
            if (completedModules && completedModules.length > 0) {
                completedModules.forEach(modId => {
                    const modTitle = typeof resolveModuleTitle === 'function' ? resolveModuleTitle(modId) : modId;
                    timelineContainer.insertAdjacentHTML('afterbegin', `
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <h4>Completed: ${modTitle}</h4>
                            <p>You passed the assessment and leveled up your skills.</p>
                        </div>`);
                });
            } else {
                timelineContainer.insertAdjacentHTML('beforeend', `
                    <div class="timeline-item" style="opacity:0.7;">
                        <div class="timeline-dot muted"></div>
                        <h4>No activity yet</h4>
                        <p>Your learning achievements and milestones will appear here once you start your journey.</p>
                    </div>`);
            }
        }
    
        // ---- Milestone Celebration ----
        // Fires once per newly completed module count using a stored marker.
        const overlay = document.getElementById('celebrate-overlay');
        const lastCelebrated = parseInt(localStorage.getItem('xyverra_last_celebrated') || 0, 10);
        if (overlay && completedCount > lastCelebrated && completedCount > 0) {
            const titleEl = document.getElementById('celebrate-title');
            const msgEl = document.getElementById('celebrate-msg');
            if (completedCount >= totalSteps) {
                if (titleEl) titleEl.textContent = 'Roadmap Complete! 🎊 ';
                if (msgEl) msgEl.textContent = `You finished all ${totalSteps} steps of your ${selectedPath} path. You're job ready!`;
            } else {
                if (titleEl) titleEl.textContent = 'Milestone Complete!';
                if (msgEl) msgEl.textContent = `That's ${completedCount} of ${totalSteps} steps done. Keep up the momentum!`;
            }
            overlay.classList.add('show');
            localStorage.setItem('xyverra_last_celebrated', String(completedCount));
        }
    
    }
    renderDashboardStats();

    // ── Real-time cross-page sync via storage events ──
    const STAT_KEYS = new Set([
        'xyverra_xp', 'xyverra_user_streak', 'xyverra_readiness_score',
        'completedModules', 'xyverra_quiz_scores', 'completedRoadmaps'
    ]);
    window.addEventListener('storage', (e) => {
        if (STAT_KEYS.has(e.key)) {
            syncFromServer();
        }
    });
});
