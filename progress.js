// progress.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Data Retrieval
    const selectedPath = localStorage.getItem("xyverra_selected_path") || "Web Development";
    let matchedPathKey = Object.keys(ROADMAP_DATA).find(key => selectedPath.includes(key)) || "Web Development";
    const pathData = ROADMAP_DATA[matchedPathKey] || [];
    
    let completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    let userSkills = [];
    try {
        const storedSkills = localStorage.getItem("userSkills");
        if (storedSkills) {
            userSkills = JSON.parse(storedSkills).map(s => s.toLowerCase().trim());
        }
    } catch (e) {
        console.error("Error parsing user skills");
    }

    // 2. Calculate Metrics
    const totalSteps = pathData.length;
    let completedStepsCount = 0;
    let currentModule = null;

    pathData.forEach((module) => {
        if (completedModules.includes(module.id)) {
            completedStepsCount++;
        } else if (!currentModule) {
            currentModule = module;
        }
    });

    const progressPercentage = totalSteps === 0 ? 0 : Math.round((completedStepsCount / totalSteps) * 100);
    const skillScore = Math.min(100, Math.round((userSkills.length * 5) + (progressPercentage * 0.5)));

    // 3. Update DOM Elements
    // Title
    const pathBadge = document.querySelector('.roadmap-progress-card .badge');
    if (pathBadge) {
        pathBadge.textContent = `${matchedPathKey} Path`;
    }

    // Summary Cards
    const summaryValues = document.querySelectorAll('.summary-value');
    if (summaryValues.length >= 4) {
        summaryValues[0].textContent = `${completedStepsCount} / ${totalSteps}`;
        // summaryValues[1] is Current Streak
        summaryValues[2].textContent = `${skillScore} / 100`;
        summaryValues[3].textContent = `${skillScore}%`;
    }

    // Progress Bar
    const progressContainer = document.querySelector('.roadmap-progress-card > div:last-child > div:first-child');
    if (progressContainer) {
        progressContainer.innerHTML = `<span>Overall Progress</span><span style="font-weight: 600; color: var(--primary-color);">${progressPercentage}% (${completedStepsCount}/${totalSteps} steps)</span>`;
    }
    const progressBar = document.querySelector('.roadmap-progress-card .progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
    }

    // Timeline Steps
    const trackContainer = document.querySelector('.roadmap-steps-track');
    if (trackContainer) {
        trackContainer.innerHTML = '';
        pathData.forEach((module, index) => {
            const isDone = completedModules.includes(module.id);
            const isCurrent = !isDone && module.id === (currentModule ? currentModule.id : null);
            const isLocked = !isDone && !isCurrent;
            
            const stepDiv = document.createElement('div');
            stepDiv.className = `roadmap-step ${isDone ? 'completed' : (isCurrent ? 'current' : '')}`;
            
            let nodeClass = 'locked-node';
            let iconOrNum = index + 1;
            
            if (isDone) {
                nodeClass = 'done';
                iconOrNum = '<i class="fas fa-check"></i>';
            } else if (isCurrent) {
                nodeClass = 'current-node';
            }
            if (module.id === 'capstone' && !isDone && !isCurrent) {
                iconOrNum = '⚑';
            }
            
            stepDiv.innerHTML = `
                <div class="rs-node ${nodeClass}">${iconOrNum}</div>
                <span class="rs-label">${module.title.replace(' ', '<br>')}</span>
            `;
            trackContainer.appendChild(stepDiv);
            
            if (index < pathData.length - 1) {
                const connector = document.createElement('div');
                connector.className = `rs-connector ${isDone ? 'active-connector' : ''}`;
                trackContainer.appendChild(connector);
            }
        });
    }

    // History List
    const historyList = document.getElementById('history-list');
    if (historyList) {
        historyList.innerHTML = ''; 

        const historyModules = pathData.filter(m => completedModules.includes(m.id)).reverse();
        
        if (historyModules.length === 0) {
            historyList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 1rem;">No recent activity yet. Complete a module to see it here!</p>';
        } else {
            historyModules.forEach((module) => {
                historyList.innerHTML += `
                    <div class="history-item">
                        <div class="item-icon success">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="item-details">
                            <h4>${module.title} Quiz</h4>
                            <div class="item-meta">
                                <span><i class="far fa-calendar-check"></i> Completed</span>
                                <span class="meta-score">Score: 100%</span>
                            </div>
                        </div>
                        <div class="item-badge completed">Verified</div>
                    </div>
                `;
            });
        }
    }
});
