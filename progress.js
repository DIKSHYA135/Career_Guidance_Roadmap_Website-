// progress.js
document.addEventListener("DOMContentLoaded", () => {

    // ── 1. Data Retrieval ────────────────────────────────────────
    const selectedPath   = localStorage.getItem("xyverra_selected_path") || "Web Development";
    const streak         = localStorage.getItem("xyverra_user_streak") || "0";
    let matchedPathKey   = Object.keys(ROADMAP_DATA).find(k => selectedPath.includes(k)) || "Web Development";
    const pathData       = ROADMAP_DATA[matchedPathKey] || [];

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
        pathData.forEach((module, index) => {
            const isDone    = completedModules.includes(module.id);
            const isCurrent = !isDone && module.id === (currentModule ? currentModule.id : null);

            const stepDiv = document.createElement("div");
            stepDiv.className = `roadmap-step ${isDone ? "completed" : (isCurrent ? "current" : "")}`;

            let nodeClass = "locked-node";
            let iconOrNum = index + 1;
            if (isDone)         { nodeClass = "done";         iconOrNum = '<i class="fas fa-check"></i>'; }
            else if (isCurrent) { nodeClass = "current-node"; }
            if (module.id === "capstone" && !isDone && !isCurrent) iconOrNum = "⚑";

            stepDiv.innerHTML = `
                <div class="rs-node ${nodeClass}">${iconOrNum}</div>
                <span class="rs-label">${module.title.replace(" ", "<br>")}</span>
            `;
            trackContainer.appendChild(stepDiv);

            if (index < pathData.length - 1) {
                const connector = document.createElement("div");
                connector.className = `rs-connector ${isDone ? "active-connector" : ""}`;
                trackContainer.appendChild(connector);
            }
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
