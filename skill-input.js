document.addEventListener('DOMContentLoaded', () => {
    // ── Existing Roadmap Detection ──────────────────────────
    const existingPath  = localStorage.getItem('xyverra_selected_path');
    const existingLevel = localStorage.getItem('userLevel');
    const formCard      = document.querySelector('.form-card');
    const existingPanel = document.getElementById('existing-roadmap-panel');

    if (existingPath && existingLevel && existingPanel && formCard) {
        // Roadmap already exists — show the existing roadmap panel
        formCard.style.display = 'none';
        existingPanel.style.display = 'block';

        const pathLabel  = document.getElementById('er-path-label');
        const levelLabel = document.getElementById('er-level-label');
        if (pathLabel)  pathLabel.textContent  = existingPath;
        if (levelLabel) levelLabel.textContent = existingLevel;

        // View Roadmap button
        const viewBtn = document.getElementById('er-view-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', () => {
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.25s ease';
                setTimeout(() => { window.location.href = 'roadmap.html'; }, 260);
            });
        }

        // Edit Settings button — reveal the form
        const editBtn = document.getElementById('er-edit-btn');
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                existingPanel.style.display = 'none';
                formCard.style.display = 'block';
                // Pre-fill form with existing values
                if (categorySelect) categorySelect.value = existingPath;
                if (existingLevel) {
                    currentLevel = existingLevel;
                    updateLevelUI();
                    buildModuleOptions();
                }
            });
        }

        // Regenerate button — clear state and show form fresh
        const regenBtn = document.getElementById('er-regen-btn');
        if (regenBtn) {
            regenBtn.addEventListener('click', async () => {
                const confirmed = typeof XyConfirm !== 'undefined'
                    ? await XyConfirm({ title: 'Regenerate Roadmap?', message: 'This will clear your current progress and start fresh. Are you sure?', confirmText: 'Yes, Regenerate', type: 'danger' })
                    : window.confirm('This will clear your current progress. Are you sure?');

                if (!confirmed) return;

                // Clear roadmap state
                ['xyverra_selected_path','userLevel','userExperience','selectedStartModule',
                 'completedModules','completedCourses','quizResultLevel','quizResultScore',
                 'xyverra_target_level','xyverra_assessment_scores'].forEach(k => localStorage.removeItem(k));

                existingPanel.style.display = 'none';
                formCard.style.display = 'block';
                if (typeof XySuccess !== 'undefined') XySuccess('Roadmap cleared. Set up your new path below.');
            });
        }

        return; // Don't initialize the form
    }

    const categorySelect    = document.getElementById('category-select');
    const levelBtns         = document.querySelectorAll('.level-btn');
    const generateBtn       = document.getElementById('generate-btn');
    const experienceField   = document.getElementById('experience-field');
    const moduleSelect      = document.getElementById('module-select');
    const roadmapPreviewContainer = document.getElementById('roadmap-preview-container');
    const roadmapPreviewList      = document.getElementById('roadmap-preview-list');
    const moduleLevelHint   = document.getElementById('module-level-hint');

    let currentLevel = 'Beginner';
    let currentCategory = 'Web Development';
    let selectedModuleId = '';     

    // ========================= Load Saved Data =========================
    try {
        const storedPath = localStorage.getItem('xyverra_selected_path');
        if (storedPath) currentCategory = storedPath;

        const storedLevel = localStorage.getItem('userLevel');
        if (storedLevel) currentLevel = storedLevel;

        const storedExp = localStorage.getItem('userExperience');
        if (storedExp && experienceField) experienceField.value = storedExp;

        const storedModule = localStorage.getItem('selectedStartModule');
        if (storedModule) selectedModuleId = storedModule;
    } catch (e) {
        console.error('Error loading localStorage:', e);
    }

    if (categorySelect) {
        categorySelect.value = currentCategory;
        // fallback if category isn't in dropdown
        if (categorySelect.value !== currentCategory) {
            currentCategory = categorySelect.options[0].value;
            categorySelect.value = currentCategory;
        }
    }

    // ========================= Module Selector =========================
    function buildModuleOptions() {
        if (!moduleSelect) return;

        const pathData = (typeof ROADMAP_DATA !== 'undefined' && ROADMAP_DATA[currentCategory]) 
            ? ROADMAP_DATA[currentCategory] 
            : [];
        
        let levelData = [];
        if (currentLevel === 'Beginner') {
            levelData = pathData.slice(0, 2);
        } else if (currentLevel === 'Intermediate') {
            levelData = pathData.slice(2, 4);
        } else if (currentLevel === 'Advanced') {
            levelData = pathData.slice(4);
        }

        let optionsHTML = '';
        
        // Add "Start from the very beginning" option only for Beginner
        if (currentLevel === 'Beginner') {
            optionsHTML += `<option value="" data-level="none">🚀 None — Start from the very beginning</option>`;
        }

        const levelKey = currentLevel.toLowerCase();

        levelData.forEach(m => {
            optionsHTML += `<option value="${m.id}" data-level="${levelKey}" data-desc="${m.desc}">${m.title}</option>`;
        });

        moduleSelect.innerHTML = optionsHTML;

        // Check if previously saved module still exists in the newly filtered options
        let savedExists = false;
        for (let i = 0; i < moduleSelect.options.length; i++) {
            if (moduleSelect.options[i].value === selectedModuleId) {
                savedExists = true;
                break;
            }
        }

        if (savedExists) {
            moduleSelect.value = selectedModuleId;
        } else {
            // Default to the first option
            if (moduleSelect.options.length > 0) {
                selectedModuleId = moduleSelect.options[0].value;
                moduleSelect.value = selectedModuleId;
            } else {
                selectedModuleId = '';
            }
        }

        updateModulePreview();
    }

    function updateModulePreview() {
        if (!roadmapPreviewContainer || !roadmapPreviewList) return;

        const pathData = (typeof ROADMAP_DATA !== 'undefined' && ROADMAP_DATA[currentCategory]) 
            ? ROADMAP_DATA[currentCategory] 
            : [];

        if (pathData.length === 0) {
            roadmapPreviewContainer.style.display = 'none';
            return;
        }

        let listHTML = '';
        pathData.forEach((m, index) => {
            let status = 'none';
            if (currentLevel === 'Beginner') {
                status = (index < 2) ? 'none' : 'locked';
            } else if (currentLevel === 'Intermediate') {
                if (index < 2) {
                    status = 'completed';
                } else if (index < 4) {
                    status = 'none';
                } else {
                    status = 'locked';
                }
            } else if (currentLevel === 'Advanced') {
                status = (index < 4) ? 'completed' : 'none';
            }

            let statusBadge = '';
            let itemClass = '';
            if (status === 'completed') {
                statusBadge = `<span class="preview-status-badge status-completed"><i class="fas fa-check-circle"></i> Completed</span>`;
                itemClass = 'preview-item-completed';
            } else if (status === 'none') {
                statusBadge = `<span class="preview-status-badge status-unlocked"><i class="fas fa-unlock"></i> Unlocked</span>`;
                itemClass = 'preview-item-unlocked';
            } else {
                statusBadge = `<span class="preview-status-badge status-locked"><i class="fas fa-lock"></i> Locked</span>`;
                itemClass = 'preview-item-locked';
            }

            listHTML += `
                <div class="roadmap-preview-item ${itemClass}">
                    <div class="preview-item-info">
                        <div class="preview-item-title">${m.title}</div>
                        <div class="preview-item-desc">${m.desc || ''}</div>
                    </div>
                    <div class="preview-item-status-wrapper">
                        ${statusBadge}
                    </div>
                </div>
            `;
        });

        roadmapPreviewList.innerHTML = listHTML;
        roadmapPreviewContainer.style.display = 'block';
    }

    function updateModuleLevelHint(level) {
        if (!moduleLevelHint) return;
        const hints = {
            Beginner:     '(Beginner modules)',
            Intermediate: '(Intermediate modules)',
            Advanced:     '(Advanced modules)'
        };
        moduleLevelHint.textContent = hints[level] || '';
    }

    // ========================= Event Listeners =========================
    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            currentCategory = categorySelect.value;
            // Also save this globally so other pages know the user switched paths
            localStorage.setItem('xyverra_selected_path', currentCategory);
            buildModuleOptions();
        });
    }

    if (moduleSelect) {
        moduleSelect.addEventListener('change', () => {
            selectedModuleId = moduleSelect.value;
            updateModulePreview();
        });
    }

    levelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLevel = btn.dataset.level;
            updateLevelUI();
            updateModuleLevelHint(currentLevel);
            buildModuleOptions(); // Update module options dynamically immediately!
        });
    });

    function updateLevelUI() {
        levelBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.level === currentLevel);
        });
    }

    // ========================= Generate Button =========================
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            // Save all data
            localStorage.setItem('xyverra_selected_path', currentCategory); // Sync it just in case
            localStorage.setItem('userLevel',           currentLevel);
            localStorage.setItem('userExperience',      experienceField ? experienceField.value : '');
            localStorage.setItem('selectedStartModule', selectedModuleId);

            // Clear all previously completed state on new roadmap generation
            ['completedModules','completedCourses','quizResultLevel','quizResultScore'].forEach(k => localStorage.removeItem(k));

            // Auto-complete modules based on selected level
            if (typeof ROADMAP_DATA !== 'undefined' && categorySelect) {
                const pathData = ROADMAP_DATA[categorySelect.value] || [];
                let preCompletedMods = [];
                let preCompletedCrss = [];

                if (currentLevel === 'Intermediate' || currentLevel === 'Advanced') {
                    // Complete beginner modules (first 2)
                    pathData.slice(0, 2).forEach(mod => {
                        preCompletedMods.push(mod.id);
                        if (mod.courses) mod.courses.forEach((c, idx) => preCompletedCrss.push(`${mod.id}-${idx}`));
                    });
                }
                if (currentLevel === 'Advanced') {
                    // Complete intermediate modules (next 2)
                    pathData.slice(2, 4).forEach(mod => {
                        preCompletedMods.push(mod.id);
                        if (mod.courses) mod.courses.forEach((c, idx) => preCompletedCrss.push(`${mod.id}-${idx}`));
                    });
                }

                if (preCompletedMods.length > 0) {
                    localStorage.setItem('completedModules', JSON.stringify(preCompletedMods));
                    localStorage.setItem('completedCourses', JSON.stringify(preCompletedCrss));
                }
            }

            // Save the *selected* target level for the assessment logic
            localStorage.setItem('xyverra_target_level', currentLevel);
            // Clear old scores
            localStorage.removeItem('xyverra_assessment_scores');

            // Smooth page transition
            document.body.style.opacity     = '0';
            document.body.style.transition  = 'opacity 0.3s ease';
            
            setTimeout(() => { 
                if (currentLevel === 'Beginner') {
                    window.location.href = 'roadmap.html';
                } else if (currentLevel === 'Intermediate') {
                    window.location.href = 'quiz.html?mode=assessment&targetLevel=Intermediate&phase=beginner';
                } else if (currentLevel === 'Advanced') {
                    window.location.href = 'quiz.html?mode=assessment&targetLevel=Advanced&phase=beginner';
                }
            }, 300);
        });
    }

    // ========================= Initialize UI =========================
    updateLevelUI();
    updateModuleLevelHint(currentLevel);
    buildModuleOptions(); 
});
