document.addEventListener('DOMContentLoaded', () => {
    const categorySelect    = document.getElementById('category-select');
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

        // Use MODULES_DATA from app-data.js
        const pathData = (typeof MODULES_DATA !== 'undefined' && MODULES_DATA[currentCategory]) 
            ? MODULES_DATA[currentCategory] 
            : null;
        
        const levelData = pathData ? (pathData[currentLevel] || []) : [];

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
        if (!moduleSelect || !modulePreview) return;

        const selected = moduleSelect.options[moduleSelect.selectedIndex];
        if (!selected) { modulePreview.style.display = 'none'; return; }

        const val   = selected.value;          
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
            localStorage.setItem('pendingStartModule', selectedModuleId);
            localStorage.removeItem('selectedStartModule');

            // Clear previously completed/skipped modules if they are restarting/regenerating a roadmap
            localStorage.removeItem('completedModules');

            // Save the *selected* target level for the assessment logic
            localStorage.setItem('xyverra_target_level', currentLevel);
            // Clear old scores
            localStorage.removeItem('xyverra_assessment_scores');

            // Smooth page transition
            document.body.style.opacity     = '0';
            document.body.style.transition  = 'opacity 0.3s ease';
            
            setTimeout(() => { 
                const catData = typeof MODULES_DATA !== 'undefined' ? MODULES_DATA[currentCategory] : null;
                if (!catData || !selectedModuleId) {
                    window.location.href = 'roadmap.html';
                    return;
                }

                if (currentLevel === 'Beginner') {
                    window.location.href = `quiz.html?mode=assessment&targetLevel=Beginner&phase=beginner&specificModules=${selectedModuleId}`;
                } else if (currentLevel === 'Intermediate') {
                    const begMods = catData['Beginner'] || [];
                    const testIds = begMods.slice(0, 2).map(m => m.id).join(',');
                    window.location.href = `quiz.html?mode=assessment&targetLevel=Intermediate&phase=beginner&specificModules=${testIds}`;
                } else if (currentLevel === 'Advanced') {
                    const begMods = catData['Beginner'] || [];
                    const intMods = catData['Intermediate'] || [];
                    // Combine to test foundational knowledge before reading advanced modules
                    const testIds = [...begMods.slice(0, 2), ...intMods.slice(0, 1)].map(m => m.id).join(',');
                    window.location.href = `quiz.html?mode=assessment&targetLevel=Advanced&phase=beginner&specificModules=${testIds}`;
                }
            }, 300);
        });
    }

    // =========================
    // Validation
    // =========================

    function validateForm() {

        const isValid = userSkills.length > 0;

        errorMessage.style.display =
            isValid ? 'none' : 'flex';

        generateBtn.disabled = !isValid;

        generateBtn.classList.toggle(
            'disabled',
            !isValid
        );
    }

    // =========================
    // Generate Button (Now connects to Backend)
    // =========================

    generateBtn.addEventListener('click', async () => {

        validateForm();

        if (generateBtn.disabled) return;

        // Get user email from localStorage
        const email = localStorage.getItem('xyverra_user_email');
        if (!email) {
            alert("User email not found. Please log in again.");
            window.location.href = 'login.html';
            return;
        }

        // Show loading state
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        generateBtn.disabled = true;

        try {
            // 1. Save Level to MongoDB
            const levelResponse = await fetch('http://localhost:5000/api/user/save-level', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, selectedLevel: currentLevel })
            });

            // 2. Save Skills to MongoDB
            const skillsResponse = await fetch('http://localhost:5000/api/user/save-skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, skills: userSkills })
            });

            const skillsData = await skillsResponse.json();

            if (skillsResponse.ok) {
                console.log("Skills saved to MongoDB:", skillsData.skills);
                
                // Also save to localStorage for fallback/immediate use
                localStorage.setItem('userLevel', currentLevel);
                localStorage.setItem('userSkills', JSON.stringify(userSkills));
                localStorage.setItem('userExperience', experienceField.value);

                // Page transition
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';

                setTimeout(() => {
                    window.location.href = 'skill-verification.html';
                }, 300);
            } else {
                alert(skillsData.message || "Failed to save skills.");
                generateBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> Generate Roadmap';
                generateBtn.disabled = false;
            }

        } catch (error) {
            console.error("Error saving to backend:", error);
            alert("Connection error. Please ensure the backend is running.");
            generateBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> Generate Roadmap';
            generateBtn.disabled = false;
        }
    });

    // =========================
    // Initialize UI
    // =========================

    // ========================= Initialize UI =========================
    updateLevelUI();
    updateModuleLevelHint(currentLevel);
    buildModuleOptions(); 
});
