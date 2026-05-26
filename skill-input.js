document.addEventListener('DOMContentLoaded', () => {
    const levelBtns         = document.querySelectorAll('.level-btn');
    const generateBtn       = document.getElementById('generate-btn');
    const experienceField   = document.getElementById('experience-field');
    const moduleSelect      = document.getElementById('module-select');
    const modulePreview     = document.getElementById('module-preview');
    const modulePrevTitle   = document.getElementById('module-preview-title');
    const modulePrevDesc    = document.getElementById('module-preview-desc');
    const modulePrevBadge   = document.getElementById('module-preview-badge');
    const moduleLevelHint   = document.getElementById('module-level-hint');

    let currentLevel = 'Beginner';
    let selectedModuleId = '';     // '' = none (start from beginning)

    // ========================= Load Saved Data =========================
    try {
        const storedLevel = localStorage.getItem('userLevel');
        if (storedLevel) currentLevel = storedLevel;

        const storedExp = localStorage.getItem('userExperience');
        if (storedExp && experienceField) experienceField.value = storedExp;

        const storedModule = localStorage.getItem('selectedStartModule');
        if (storedModule) selectedModuleId = storedModule;
    } catch (e) {
        console.error('Error loading localStorage:', e);
    }

    // ========================= Module Selector =========================

    /**
     * Build the module <select> for the currently selected career path and level.
     * Distribution:
     *   Beginner group     → first 2 modules + "None" (Start from very beginning)
     *   Intermediate group → next 2 modules
     *   Advanced group     → remaining modules
     */
    function buildModuleOptions() {
        if (!moduleSelect) return;

        // Get current career path data from ROADMAP_DATA (defined in roadmap.js)
        const selectedPath  = localStorage.getItem('xyverra_selected_path') || 'Web Development';
        let matchedPathKey  = selectedPath;
        if (typeof ROADMAP_DATA !== 'undefined' && !ROADMAP_DATA[matchedPathKey]) {
            matchedPathKey = Object.keys(ROADMAP_DATA).find(k => selectedPath.includes(k)) || 'Web Development';
        }

        const pathModules = (typeof ROADMAP_DATA !== 'undefined' && ROADMAP_DATA[matchedPathKey])
            ? ROADMAP_DATA[matchedPathKey].filter(m => m.id !== 'capstone')
            : [];

        let filteredModules = [];
        let levelKey = 'beginner';
        let optionsHTML = '';

        if (currentLevel === 'Beginner') {
            filteredModules = pathModules.slice(0, 2);
            levelKey = 'beginner';
            // Beginner gets the "Start from the very beginning" option
            optionsHTML += `<option value="" data-level="none">🚀 None — Start from the very beginning</option>`;
        } else if (currentLevel === 'Intermediate') {
            filteredModules = pathModules.slice(2, 4);
            levelKey = 'intermediate';
        } else if (currentLevel === 'Advanced') {
            filteredModules = pathModules.slice(4);
            levelKey = 'advanced';
        }

        filteredModules.forEach(m => {
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
        if (!moduleSelect || !modulePreview) return;

        const selected = moduleSelect.options[moduleSelect.selectedIndex];
        if (!selected) { modulePreview.style.display = 'none'; return; }

        const val   = selected.value;          // '' = none
        const level = selected.dataset.level || 'none';
        const desc  = selected.dataset.desc  || '';

        if (val === '') {
            // "None" selected
            modulePrevTitle.textContent = 'Start from the very beginning';
            modulePrevDesc.textContent  = 'You will follow the full roadmap from Module 1 onwards.';
            modulePrevBadge.textContent = 'No skip';
            modulePrevBadge.className   = 'module-preview-badge badge-none';
        } else {
            modulePrevTitle.textContent = selected.textContent;
            modulePrevDesc.textContent  = desc;

            const levelMap = {
                beginner:     { label: '🌱 Beginner',     cls: 'badge-beginner' },
                intermediate: { label: '⚡ Intermediate',  cls: 'badge-intermediate' },
                advanced:     { label: '🚀 Advanced',      cls: 'badge-advanced' }
            };
            const lm = levelMap[level] || { label: level, cls: 'badge-none' };
            modulePrevBadge.textContent = lm.label;
            modulePrevBadge.className   = `module-preview-badge ${lm.cls}`;
        }

        modulePreview.style.display = 'flex';
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

    if (moduleSelect) {
        moduleSelect.addEventListener('change', () => {
            selectedModuleId = moduleSelect.value;
            updateModulePreview();
        });
    }

    // ========================= Level Selection =========================
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
            localStorage.setItem('userLevel',           currentLevel);
            localStorage.setItem('userSkills',          JSON.stringify([])); // Empty skills box fallback
            localStorage.setItem('userExperience',      experienceField ? experienceField.value : '');
            localStorage.setItem('selectedStartModule', selectedModuleId);

            // Clear previously completed/skipped modules if they are restarting/regenerating a roadmap
            localStorage.removeItem('completedModules');

            // Smooth page transition
            document.body.style.opacity     = '0';
            document.body.style.transition  = 'opacity 0.3s ease';
            setTimeout(() => { window.location.href = 'roadmap.html'; }, 300);
        });
    }

    // ========================= Initialize UI =========================
    updateLevelUI();
    updateModuleLevelHint(currentLevel);
    buildModuleOptions();   // populate the module select after DOM + ROADMAP_DATA are ready
});
