/* ==========================================================
   dashboard.js — Xyverra Dashboard
   All localStorage reads are marked with TODO comments
   so they can be replaced with real API calls later.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ── 1. Load state from localStorage ────────────────────
    // TODO: Replace with GET /api/user/dashboard
    const selectedPath    = localStorage.getItem("xyverra_selected_path") || "Web Development";
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    const skillScore      = parseInt(localStorage.getItem('xyverra_skill_score') || '10');

    let userSkills = [];
    try {
        const raw = localStorage.getItem("userSkills");
        if (raw) userSkills = JSON.parse(raw).map(s => s.toLowerCase().trim());
    } catch { /* ignore */ }

    // ── 2. Match roadmap path ───────────────────────────────
    // ROADMAP_DATA is defined in roadmap.js (loaded before this script)
    const pathData = (typeof ROADMAP_DATA !== 'undefined')
        ? (ROADMAP_DATA[selectedPath] || ROADMAP_DATA[Object.keys(ROADMAP_DATA).find(k => selectedPath.includes(k))] || ROADMAP_DATA["Web Development"])
        : [];

    const totalSteps       = pathData.length;
    let completedCount     = 0;
    let currentModule      = null;

    pathData.forEach(module => {
        if (completedModules.includes(module.id)) {
            completedCount++;
        } else if (!currentModule && module.id !== 'capstone') {
            currentModule = module;
        }
    });

    const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
    const jobReadiness = Math.min(100, Math.round(progressPct * 0.7 + (userSkills.length * 2)));
    const trustScore  = Math.min(100, Math.round(completedCount * 12.5));

    // ── 3. Update Metric Cards ──────────────────────────────
    _setText('.metric-card:nth-child(1) .metric-value', skillScore);
    _setText('.metric-card:nth-child(1) .metric-subtitle', `out of 100`);
    _setWidth('.metric-card:nth-child(1) .progress-bar', skillScore);

    _setText('.metric-card:nth-child(2) .metric-value', `${progressPct}%`);
    _setText('.metric-card:nth-child(2) .metric-subtitle', `${completedCount} of ${totalSteps} steps`);
    _setWidth('.metric-card:nth-child(2) .progress-bar', progressPct);

    _setText('.metric-card:nth-child(3) .metric-value', trustScore);
    _setText('.metric-card:nth-child(3) .metric-subtitle', `Verification accuracy`);
    _setWidth('.metric-card:nth-child(3) .progress-bar', trustScore);

    _setText('.metric-card:nth-child(4) .metric-value', `${completedCount}/${totalSteps}`);

    // ── 4. Update Progress Tracker Milestones (4th card) ───
    const milestones = document.querySelectorAll('.pt-milestone');
    milestones.forEach((el, i) => {
        if (i < pathData.length && completedModules.includes(pathData[i].id)) {
            el.classList.add('done');
        } else {
            el.classList.remove('done');
        }
    });

    // ── 5. Next Milestone Section ───────────────────────────
    const milestoneTitle = document.querySelector('.milestone-content h3');
    const milestoneDesc  = document.querySelector('.milestone-content p');
    if (currentModule) {
        if (milestoneTitle) milestoneTitle.textContent = currentModule.title;
        if (milestoneDesc) milestoneDesc.textContent = currentModule.desc;
    } else {
        if (milestoneTitle) milestoneTitle.textContent = '🎉 Roadmap Completed!';
        if (milestoneDesc) milestoneDesc.textContent = 'You have finished all modules. Your profile is job-ready!';
    }

    // ── 6. Knowledge Check Card ─────────────────────────────
    const kcTitle = document.querySelector('.knowledge-content h3');
    const kcBadge = document.querySelector('.knowledge-content .badge');
    const kcDesc  = document.querySelector('.knowledge-content > p');
    const kcBtn   = document.getElementById('take-quiz-btn') || document.querySelector('.knowledge-check-card .btn-primary');

    if (currentModule) {
        if (kcTitle) kcTitle.textContent = currentModule.title;
        if (kcBadge) kcBadge.textContent = `Step ${completedCount + 1}`;
        if (kcDesc) kcDesc.textContent = currentModule.desc;
        if (kcBtn) {
            kcBtn.onclick = e => {
                e.preventDefault();
                window.location.href = `quiz.html?module=${currentModule.id}`;
            };
        }
    } else {
        if (kcTitle) kcTitle.textContent = 'All Steps Complete!';
        if (kcBadge) kcBadge.textContent = 'Done';
        if (kcDesc) kcDesc.textContent = 'You have verified all modules in your roadmap.';
        if (kcBtn) kcBtn.disabled = true;
    }

    // ── 7. Stats Panel ─────────────────────────────────────
    _setText('.stat-item.job-readiness .stat-header span:last-child', `${jobReadiness}%`);
    _setWidth('.stat-item.job-readiness .progress-bar', jobReadiness);

    _setText('.stat-item:nth-child(3) .stat-value', userSkills.length);
    _setText('.stat-item:nth-child(4) .stat-value', completedCount);
    _setText('.stat-item:nth-child(5) .stat-value', `${completedCount}/${totalSteps}`);

    // ── Helper functions ────────────────────────────────────
    function _setText(selector, text) {
        const el = document.querySelector(selector);
        if (el) el.textContent = text;
    }
    function _setWidth(selector, pct) {
        const el = document.querySelector(selector);
        if (el) el.style.width = `${Math.max(2, Math.min(100, pct))}%`;
    }
});
