// progress.js
document.addEventListener("DOMContentLoaded", () => {

    // ── 1. Data Retrieval ────────────────────────────────────────
    const selectedPath   = localStorage.getItem("xyverra_selected_path") || "";
    const streak         = localStorage.getItem("xyverra_user_streak") || "0";

    // If the user hasn't chosen a path yet, show an empty state
    if (!selectedPath) {
        const mainContent = document.querySelector('.dashboard-container') || document.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60vh; text-align:center; padding:3rem 2rem;">
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

    let matchedPathKey   = Object.keys(ROADMAP_DATA).find(k => selectedPath.includes(k)) || null;
    if (!matchedPathKey) matchedPathKey = Object.keys(ROADMAP_DATA).find(k => k.includes(selectedPath.split(' ')[0])) || null;
    const pathData       = matchedPathKey ? (ROADMAP_DATA[matchedPathKey] || []) : [];

    let completedModules = [];
    let userSkills = [];
    try { completedModules = JSON.parse(localStorage.getItem("completedModules") || "[]"); } catch(_) {}
    try {
        const s = localStorage.getItem("userSkills");
        if (s) userSkills = JSON.parse(s).map(x => x.toLowerCase().trim());
    } catch(_) {}


    // ── 2. Calculations ──────────────────────────────────────────
    const totalSteps          = pathData.length;
    const completedStepsCount = pathData.filter(m => completedModules.includes(m.id)).length;
    const progressPercentage  = totalSteps === 0 ? 0 : Math.round((completedStepsCount / totalSteps) * 100);
    const skillScore          = Math.min(100, Math.round((userSkills.length * 5) + (progressPercentage * 0.5)));

    // Job Readiness: 50% roadmap + 30% skills (cap 20 skills) + 20% quizzes
    const jobReadiness = Math.min(100, Math.round(
        progressPercentage * 0.50 +
        Math.min(100, userSkills.length * 5) * 0.30 +
        (totalSteps > 0 ? (completedStepsCount / totalSteps) * 100 : 0) * 0.20
    ));

    let skillLevel = "Beginner";
    if (skillScore >= 20 && skillScore < 40) skillLevel = "Intermediate";
    else if (skillScore >= 40 && skillScore < 60) skillLevel = "Advanced";
    else if (skillScore >= 60 && skillScore < 80) skillLevel = "Professional";
    else if (skillScore >= 80) skillLevel = "Expert";

    let jrLabel = "Beginner";
    let jrColor = "#64748B";
    if (jobReadiness >= 75)      { jrLabel = "Job Ready 🎉"; jrColor = "#10B981"; }
    else if (jobReadiness >= 50) { jrLabel = "Advanced";     jrColor = "#6366F1"; }
    else if (jobReadiness >= 25) { jrLabel = "Intermediate"; jrColor = "#F59E0B"; }

    // ── 3. Summary Cards ─────────────────────────────────────────
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    set("steps-value",       `${completedStepsCount} / ${totalSteps}`);
    set("streak-value",      `${streak} Days`);
    set("score-value",       `${skillScore} / 100`);
    set("skill-level-value", skillLevel);
    set("job-readiness-value", `${jobReadiness}%`);

    // Job readiness label + color
    const jrLabelEl = document.getElementById("job-readiness-label");
    const jrValueEl = document.getElementById("job-readiness-value");
    if (jrLabelEl) { jrLabelEl.textContent = jrLabel; jrLabelEl.style.color = jrColor; }
    if (jrValueEl) jrValueEl.style.color = jrColor;

    // ── 4. Roadmap Badge & Progress Bar ──────────────────────────
    const pathBadge = document.getElementById("roadmap-path-badge") || document.querySelector(".roadmap-progress-card .badge");
    if (pathBadge) pathBadge.textContent = `${matchedPathKey} Path`;

    const progressLabel = document.getElementById("progress-label");
    if (progressLabel) progressLabel.textContent = `${progressPercentage}% (${completedStepsCount}/${totalSteps} steps)`;

    const mainBar = document.getElementById("main-progress-bar");
    if (mainBar) setTimeout(() => { mainBar.style.width = `${progressPercentage}%`; }, 300);

    // ── 5. Roadmap Timeline ───────────────────────────────────────
    let currentModule = null;
    pathData.forEach(m => { if (!completedModules.includes(m.id) && !currentModule) currentModule = m; });

    const trackContainer = document.querySelector(".roadmap-steps-track");
    if (trackContainer) {
        trackContainer.innerHTML = "";

        // Calculate progress line fill percentage
        const totalSteps = pathData.length;
        const completedStepsCount = pathData.filter(m => completedModules.includes(m.id)).length;
        const lineFillPercentage = totalSteps <= 1 ? 0 : Math.min(100, (completedStepsCount / (totalSteps - 1)) * 100);

        // Inject continuous progress line
        const lineContainer = document.createElement("div");
        lineContainer.className = "roadmap-progress-line-container";
        
        const lineFill = document.createElement("div");
        lineFill.className = "roadmap-progress-line-fill";
        lineContainer.appendChild(lineFill);
        
        trackContainer.appendChild(lineContainer);

        // Set line properties dynamically depending on layout orientation (responsive resize)
        const updateLineProgress = () => {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                lineFill.style.width = "100%";
                lineFill.style.height = `${lineFillPercentage}%`;
            } else {
                lineFill.style.height = "100%";
                lineFill.style.width = `${lineFillPercentage}%`;
            }
        };

        // Delay slightly for initial load to enable transition animation
        setTimeout(updateLineProgress, 100);
        window.addEventListener("resize", updateLineProgress);

        // Render roadmap step nodes
        pathData.forEach((module, index) => {
            const isDone    = completedModules.includes(module.id);
            const isCurrent = !isDone && module.id === (currentModule ? currentModule.id : null);
            const isLocked  = !isDone && !isCurrent;

            const stepDiv = document.createElement("div");
            stepDiv.className = `roadmap-step ${isDone ? "completed" : (isCurrent ? "current" : "locked")}`;
            stepDiv.setAttribute("data-id", module.id);
            stepDiv.setAttribute("title", isLocked ? "Locked step" : `Take ${module.title} Quiz`);

            let iconOrNum = index + 1;
            if (isDone) {
                iconOrNum = '<i class="fas fa-check"></i>';
            } else if (module.id === "capstone") {
                iconOrNum = '<i class="fas fa-flag"></i>';
            } else if (isLocked) {
                iconOrNum = '<i class="fas fa-lock" style="font-size: 0.75rem; opacity: 0.7;"></i>';
            }

            stepDiv.innerHTML = `
                <div class="rs-node">${iconOrNum}</div>
                <span class="rs-label">${module.title}</span>
            `;

            // Handle navigation clicks for active/completed steps
            stepDiv.addEventListener("click", () => {
                if (!isLocked) {
                    window.location.href = `quiz.html?module=${module.id}`;
                }
            });

            trackContainer.appendChild(stepDiv);
        });
    }

    // ── 6. Recent Activity ────────────────────────────────────────
    const historyList = document.getElementById("history-list");
    if (historyList) {
        const done = pathData.filter(m => completedModules.includes(m.id)).reverse();
        if (done.length === 0) {
            historyList.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:1.5rem;">
                No activity yet. Complete a module to see it here! 🚀</p>`;
        } else {
            historyList.innerHTML = done.map(module => `
                <div class="history-item">
                    <div class="item-icon success"><i class="fas fa-check"></i></div>
                    <div class="item-details">
                        <h4>${module.title} Quiz</h4>
                        <div class="item-meta">
                            <span><i class="far fa-calendar-check"></i> Completed</span>
                            <span class="meta-score">Score: 100%</span>
                        </div>
                    </div>
                    <div class="item-badge completed">Verified</div>
                </div>
            `).join("");
        }
    }
});
