document.addEventListener("DOMContentLoaded", () => {
    const accordionContainer = document.getElementById("roadmap-accordion");
    const overallProgressText = document.getElementById("overall-progress-text");
    const overallProgressBar = document.getElementById("overall-progress-bar");
    const topQuizBtn = document.getElementById("top-quiz-btn");
    const headerTitle = document.getElementById("roadmap-header-title");
    
    // Load state
    const selectedPath = localStorage.getItem("xyverra_selected_path") || "Web Development";
    let matchedPathKey = selectedPath;
    if (!ROADMAP_DATA[matchedPathKey]) {
        const p = selectedPath.toLowerCase();
        if (p.includes('machine learning') || p.includes('ml')) {
            matchedPathKey = "Machine Learning";
        } else if (p.includes('nlp') || p.includes('natural language') || p.includes(' ai') || p === 'ai') {
            matchedPathKey = "NLP / AI";
        } else if (p.includes('data science') || p.includes('data')) {
            matchedPathKey = "Data Science";
        } else {
            matchedPathKey = Object.keys(ROADMAP_DATA).find(key => p.includes(key.toLowerCase())) || "Web Development";
        }
    }
    
    if (headerTitle) {
        headerTitle.innerText = `${matchedPathKey} Roadmap`;
    }

    const pathData = ROADMAP_DATA[matchedPathKey];
    if (accordionContainer) accordionContainer.innerHTML = "";

    let completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    let completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '[]');

    // ── The main render function — called once after backend sync ──
    function renderRoadmap() {
        if (accordionContainer) accordionContainer.innerHTML = '';
        visibleModulesData = [];

        // Respect "Start from Module"
        const selectedStartModule = localStorage.getItem('selectedStartModule') || '';
        if (selectedStartModule) {
            const startIdx = pathData.findIndex(m => m.id === selectedStartModule);
            if (startIdx > 0) {
                for (let i = 0; i < startIdx; i++) {
                    const m = pathData[i];
                    if (m.id !== 'capstone' && !completedModules.includes(m.id)) {
                        completedModules.push(m.id);
                    }
                }
                localStorage.setItem('completedModules', JSON.stringify(completedModules));
            }
        }

        renderGroup('🌱 Beginner',     pathData.slice(0, 2),  0);
        renderGroup('⚡ Intermediate', pathData.slice(2, 4), 2);
        renderGroup('🚀 Advanced',     pathData.slice(4),    4);
        visibleModulesData.push(...pathData.slice(0, 2), ...pathData.slice(2, 4), ...pathData.slice(4));
        updateOverallProgress();

        // Auto-expand the first incomplete module
        setTimeout(() => {
            const allItems = document.querySelectorAll('.accordion-item');
            let expanded = false;
            allItems.forEach(item => {
                if (!item.classList.contains('completed') && !expanded) {
                    item.classList.add('active');
                    const content = item.querySelector('.accordion-content');
                    if (content) content.style.maxHeight = content.scrollHeight + 'px';
                    expanded = true;
                }
            });
            if (!expanded && allItems.length > 0) {
                const lastItem = allItems[allItems.length - 1];
                lastItem.classList.add('active');
                const content = lastItem.querySelector('.accordion-content');
                if (content) content.style.maxHeight = content.scrollHeight + 'px';
            }
        }, 100);
    }

    // ── Sync completedModules from backend FIRST, then render ──
    (async function syncAndRender() {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            try {
                const res = await fetch('http://localhost:5000/api/user/me', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && Array.isArray(data.user.completedModules)) {
                        // Always use the authoritative server data
                        completedModules = data.user.completedModules;
                        localStorage.setItem('completedModules', JSON.stringify(completedModules));
                    }
                }
            } catch (e) {
                console.warn('[Roadmap] Backend sync failed, using localStorage fallback.', e);
            }
        }
        // Render with the freshest data (server or localStorage fallback)
        renderRoadmap();
    })();

    // Helper: Check if a module is considered passed.
    // ONLY completedModules (backend-synced) determines unlock — no client-side bypass.
    const isModulePassed = (modId) => completedModules.includes(modId);

    // Helper: Build course ID
    const getCourseId = (moduleId, courseName) => `${moduleId}_${courseName.replace(/\s+/g, '')}`;

    // Helper: update overall progress
    let visibleModulesData = [];
    const updateOverallProgress = () => {
        if (!visibleModulesData.length) return;
        let cCount = 0;
        visibleModulesData.forEach(m => {
            if (completedModules.includes(m.id)) cCount++;
        });
        const pct = Math.round((cCount / visibleModulesData.length) * 100);
        if (overallProgressText) overallProgressText.innerText = `${pct}%`;
        if (overallProgressBar) overallProgressBar.style.width = `${pct}%`;
    };

    // Helper: Render a group
    const renderGroup = (title, modulesToRender, pathStartIndex) => {
        if (!modulesToRender || modulesToRender.length === 0) return;
        
        const groupDiv = document.createElement("div");
        groupDiv.className = "accordion-group";
        
        const groupTitle = document.createElement("div");
        groupTitle.className = "accordion-group-title";
        groupTitle.innerHTML = `<i class="fas fa-layer-group" style="color:var(--primary); font-size:0.9rem;"></i> ${title}`;
        groupDiv.appendChild(groupTitle);

        modulesToRender.forEach((module, localIdx) => {
            const globalIdx = pathStartIndex + localIdx;

            // Lock if previous module hasn't been quiz-passed. The first module (globalIdx 0) is never locked so the user can start.
            let isLocked = false;
            if (globalIdx === 0) {
                isLocked = false;
            } else {
                isLocked = !isModulePassed(pathData[globalIdx - 1].id);
            }

            // Check course completion status
            const totalCourses = module.courses && module.courses.length > 0 ? module.courses.length : 1;
            let completedCount = 0;
            
            if (module.courses && module.courses.length > 0) {
                module.courses.forEach(c => {
                    if (completedCourses.includes(getCourseId(module.id, c.name))) {
                        completedCount++;
                    }
                });
            } else {
                if (completedCourses.includes(getCourseId(module.id, 'dummy_capstone'))) {
                    completedCount++;
                }
            }

            // Module is only considered completed if the backend (quiz) confirmed it.
            // Course checkboxes are study aids — they do NOT complete the module.
            const moduleCompleted = completedModules.includes(module.id);
            const modulePct = moduleCompleted ? 100 : Math.round((completedCount / totalCourses) * 100);

            const accItem = document.createElement("div");
            accItem.className = `accordion-item ${moduleCompleted ? 'completed' : ''} ${isLocked ? 'module-locked' : ''}`;
            
            accItem.innerHTML = `
                <div class="accordion-header">
                    <div class="accordion-header-left">
                        <i class="fas ${isLocked ? 'fa-lock' : 'fa-chevron-right'} toggle-icon"></i>
                        <h4>${module.title}</h4>
                        ${isLocked ? '<span class="lock-badge">Locked</span>' : ''}
                    </div>
                    <div class="accordion-header-right">
                        <div class="module-progress-wrapper">
                            <div class="progress-bar-container">
                                <div class="progress-bar" style="width: ${modulePct}%; ${moduleCompleted ? 'background: #10B981;' : ''}"></div>
                            </div>
                            <span class="module-progress-text">${modulePct}%</span>
                        </div>
                    </div>
                </div>
                <div class="accordion-content">
                    <div class="accordion-content-inner">
                        ${isLocked ? `
                        <div class="module-locked-overlay">
                            <div class="lock-icon-big">🔒</div>
                            <p>Complete the previous module's quiz with <strong>75% or higher</strong> to unlock this module.</p>
                        </div>` : `
                        <p class="module-desc">${module.desc}</p>
                        <div class="course-list">
                            <!-- courses go here -->
                        </div>
                        <div class="module-quiz-action">
                            <a href="${!moduleCompleted && completedCount < totalCourses ? '#' : `quiz.html?module=${module.id}`}" 
                               class="btn-take-quiz ${moduleCompleted ? 'btn-quiz-passed' : ''} ${!moduleCompleted && completedCount < totalCourses ? 'btn-quiz-locked' : ''}"
                               onclick="if(${!moduleCompleted && completedCount < totalCourses}){ window.XyWarning('Quiz Locked', 'Complete all lessons to unlock the quiz.'); return false; }">
                                ${moduleCompleted 
                                    ? '<i class="fas fa-check-circle"></i> Quiz Passed ✓' 
                                    : completedCount < totalCourses
                                        ? '<i class="fas fa-lock"></i> Complete lessons to unlock'
                                        : '<i class="fas fa-bolt"></i> Take Module Quiz'}
                            </a>
                            ${moduleCompleted ? '' : '<span class="quiz-unlock-hint">Score 70%+ to unlock the next module</span>'}
                        </div>`}
                    </div>
                </div>
            `;
            
            // Only add course checkboxes if module is not locked
            if (!isLocked) {
                const courseListContainer = accItem.querySelector('.course-list');
                if (courseListContainer) {
                    const addCourseItem = (cName, cUrl, isDummy = false) => {
                        const cId = getCourseId(module.id, cName);
                        const isChecked = completedCourses.includes(cId) || moduleCompleted;
                        
                        let finalUrl = cUrl;
                        if (cUrl) {
                            finalUrl = cUrl + (cUrl.includes('?') ? '&' : '?') + `courseId=${encodeURIComponent(cId)}&moduleId=${encodeURIComponent(module.id)}`;
                        }
                        
                        const cItem = document.createElement("div");
                        cItem.className = `course-item ${isChecked ? 'completed' : ''}`;
                        cItem.innerHTML = `
                            <input type="checkbox" class="course-checkbox" value="${cId}" ${isChecked ? 'checked' : ''} disabled>
                            <div class="checkbox-custom" style="pointer-events: none;">
                                <i class="fas fa-check"></i>
                            </div>
                            <div class="course-details">
                                <h5>${isDummy ? 'Submit ' + module.title : cName}</h5>
                                ${finalUrl ? `<a href="${finalUrl}" class="course-link">View Course <i class="fas fa-external-link-alt"></i></a>` : ''}
                            </div>
                        `;
                        
                        courseListContainer.appendChild(cItem);
                    };

                    if (module.courses && module.courses.length > 0) {
                        module.courses.forEach(c => addCourseItem(c.name, c.url));
                    } else {
                        addCourseItem('dummy_capstone', null, true);
                    }
                }
            }
            
            const header = accItem.querySelector('.accordion-header');
            const content = accItem.querySelector('.accordion-content');
            header.addEventListener('click', () => {
                if (isLocked) return; // Don't expand locked modules
                const isActiveNow = accItem.classList.contains('active');
                document.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                });
                
                if (!isActiveNow) {
                    accItem.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });

            groupDiv.appendChild(accItem);
        });
        
        if (accordionContainer) accordionContainer.appendChild(groupDiv);
    };

    // Setup quiz result banner and side panel (runs immediately, not render-dependent)
    const beginnerModules = pathData.slice(0, 2);
    const intermediateModules = pathData.slice(2, 4);
    const advancedModules = pathData.slice(4);

    const quizLevel = localStorage.getItem('quizResultLevel');
    const quizScore = localStorage.getItem('quizResultScore');

    if (quizLevel) {
        const resultBanner = document.getElementById('quiz-result-banner');
        if (resultBanner) {
            resultBanner.style.display = 'block';
            const scoreEl = document.getElementById('quiz-score-display');
            const levelEl = document.getElementById('quiz-level-display');
            if (scoreEl) scoreEl.textContent = quizScore;
            if (levelEl) levelEl.textContent = quizLevel;
        }
    }

    // Update side panel target path
    const sideTargetPath = document.getElementById('side-target-path');
    if (sideTargetPath) sideTargetPath.textContent = matchedPathKey;

    if (typeof LocalStorageState !== 'undefined' && LocalStorageState.isMandatoryQuizPending()) {
        if (typeof QuizLockManager !== 'undefined') {
            QuizLockManager.applyRoadmapOverlay();
            QuizLockManager.disableNavigation();
        }
    }
});

// Global function for the toggle
window.toggleAdaptiveRoadmap = function() {
    if (typeof window.XyRequirePro === 'function') {
        if (!window.XyRequirePro('Adaptive Roadmap')) return;
    }
    
    const knob = document.getElementById('adaptive-toggle-knob');
    const toggle = document.getElementById('adaptive-toggle');
    const isAdaptive = toggle.dataset.active === 'true';
    
    if (isAdaptive) {
        // Turn off
        toggle.dataset.active = 'false';
        toggle.style.background = 'var(--border)';
        knob.style.left = '2px';
        if (typeof window.XySuccess === 'function') {
            window.XySuccess('Standard Mode', 'Switched to standard learning pathway.');
        }
    } else {
        // Turn on
        toggle.dataset.active = 'true';
        toggle.style.background = '#10B981';
        knob.style.left = '18px';
        if (typeof window.XySuccess === 'function') {
            window.XySuccess('Adaptive Mode', 'A.I. is now optimizing your roadmap based on progress.');
        }
    }
};