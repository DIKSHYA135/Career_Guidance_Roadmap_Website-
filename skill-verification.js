document.addEventListener('DOMContentLoaded', () => {
    const verificationList = document.getElementById('verification-list');
    const noSkillsMsg = `<div class="no-skills-msg">
        <h3>No Verification Needed</h3>
        <p>We couldn't match your inputted skills with any specific roadmap modules.</p>
    </div>`;

    // ── 1. Retrieve Data ──
    const selectedPath = localStorage.getItem("xyverra_selected_path") || "Web Development";
    let matchedPathKey = Object.keys(ROADMAP_DATA).find(k => selectedPath.includes(k)) || "Web Development";
    const pathData = ROADMAP_DATA[matchedPathKey] || [];
    
    let userSkills = [];
    try {
        const storedSkills = localStorage.getItem('userSkills');
        if (storedSkills) userSkills = JSON.parse(storedSkills);
    } catch (e) {
        console.error("Error parsing userSkills");
    }

    let completedModules = [];
    try {
        const storedCompleted = localStorage.getItem('completedModules');
        if (storedCompleted) completedModules = JSON.parse(storedCompleted);
    } catch (e) {
        console.error("Error parsing completedModules");
    }

    // Check URL for failed verification (from quiz.js)
    const urlParams = new URLSearchParams(window.location.search);
    const failedModule = urlParams.get('failed');
    
    // Store failed modules in session storage so it persists while on this page
    let failedVerifications = JSON.parse(sessionStorage.getItem('failedVerifications') || '[]');
    if (failedModule && !failedVerifications.includes(failedModule)) {
        failedVerifications.push(failedModule);
        sessionStorage.setItem('failedVerifications', JSON.stringify(failedVerifications));
    }

    // ── 2. Map User Skills to Roadmap Modules ──
    const modulesToVerify = [];
    
    userSkills.forEach(skillStr => {
        const skillLower = skillStr.toLowerCase().trim();
        pathData.forEach(module => {
            if (module.id === 'capstone') return; // Don't verify capstone
            
            // Check if skill matches any keyword
            const matches = module.keywords.some(kw => {
                const kwLower = kw.toLowerCase();
                return kwLower.includes(skillLower) || skillLower.includes(kwLower);
            });

            if (matches && !modulesToVerify.some(m => m.id === module.id)) {
                modulesToVerify.push(module);
            }
        });
    });

    // ── 3. Render UI ──
    if (modulesToVerify.length === 0) {
        // If they entered skills but none match our modules, just skip
        verificationList.innerHTML = noSkillsMsg;
        setTimeout(() => {
            window.location.href = 'roadmap.html';
        }, 2000);
        return;
    }

    verificationList.innerHTML = '';
    let allVerifiedOrFailed = true;

    modulesToVerify.forEach(module => {
        const isCompleted = completedModules.includes(module.id);
        const isFailed = failedVerifications.includes(module.id);
        
        let statusHtml = '';
        let actionHtml = '';

        if (isCompleted) {
            statusHtml = `<div class="status-badge status-verified"><i class="fas fa-check-circle"></i> Verified</div>`;
            actionHtml = `<button class="btn-verify disabled"><i class="fas fa-check"></i> Done</button>`;
        } else if (isFailed) {
            statusHtml = `<div class="status-badge status-failed"><i class="fas fa-times-circle"></i> Failed (Added to Roadmap)</div>`;
            actionHtml = `<button class="btn-verify disabled"><i class="fas fa-times"></i> Locked</button>`;
        } else {
            statusHtml = `<div class="status-badge status-pending"><i class="fas fa-clock"></i> Pending</div>`;
            actionHtml = `<a href="quiz.html?module=${module.id}&verify=true" class="btn-verify">Take Quiz</a>`;
            allVerifiedOrFailed = false;
        }

        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <div class="skill-info">
                <h3>${module.title}</h3>
                <p>${module.desc}</p>
            </div>
            <div class="skill-status">
                ${statusHtml}
                ${actionHtml}
            </div>
        `;
        verificationList.appendChild(skillItem);
    });

    // If everything is verified/failed, highlight the continue button
    const btnContinue = document.getElementById('btn-continue');
    const btnSkip = document.getElementById('btn-skip-all');
    if (allVerifiedOrFailed) {
        btnContinue.style.animation = 'pulse 2s infinite';
        btnSkip.style.display = 'none';
        btnContinue.innerHTML = 'View My Roadmap <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>';
    }
});

// Add pulse animation dynamic style
const style = document.createElement('style');
style.innerHTML = `
@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
}`;
document.head.appendChild(style);
