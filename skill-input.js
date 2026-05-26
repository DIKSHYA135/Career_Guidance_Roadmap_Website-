document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
    const levelBtns = document.querySelectorAll('.level-btn');
    const skillInput = document.getElementById('skill-input-field');
    const tagContainer = document.getElementById('tag-container');
    const tagsWrapper = document.getElementById('tags-wrapper');
    const generateBtn = document.getElementById('generate-btn');
    const errorMessage = document.getElementById('error-message');
    const experienceField = document.getElementById('experience-field');
    const recommendationsSection = document.getElementById('recommendations-section');
    const skillGapGrid = document.getElementById('skill-gap-grid');
    const recommendationTitle = document.getElementById('recommendation-title');
    const formActionsContainer = document.getElementById('form-actions-container');
    const generateRoadmapBtn = document.getElementById('generate-roadmap-btn');
=======
    const levelBtns         = document.querySelectorAll('.level-btn');
    const generateBtn       = document.getElementById('generate-btn');
    const experienceField   = document.getElementById('experience-field');
    const moduleSelect      = document.getElementById('module-select');
    const modulePreview     = document.getElementById('module-preview');
    const modulePrevTitle   = document.getElementById('module-preview-title');
    const modulePrevDesc    = document.getElementById('module-preview-desc');
    const modulePrevBadge   = document.getElementById('module-preview-badge');
    const moduleLevelHint   = document.getElementById('module-level-hint');
>>>>>>> 8bf0ba3952f61e1122f26d8b54b97912b4634d36

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

<<<<<<< HEAD
    // =========================
    // Validation & Recommendations
    // =========================

    function validateForm() {
        const isValid = userSkills.length > 0;

        errorMessage.style.display = isValid ? 'none' : 'flex';
        generateBtn.disabled = !isValid;
        generateBtn.classList.toggle('disabled', !isValid);

        if (isValid) {
            generateSkillGaps();
        } else {
            recommendationsSection.style.display = 'none';
            formActionsContainer.style.display = 'flex';
        }
    }

    // AI Skill Gap Data Dictionary
    const domainKnowledge = {
        'Web Development': {
            keywords: ['html', 'css', 'javascript', 'js', 'react', 'frontend', 'web', 'bootstrap', 'tailwind'],
            skills: ['CSS', 'JavaScript', 'Responsive Design', 'Git & GitHub', 'React Basics', 'Web Hosting', 'APIs']
        },
        'Backend / Data': {
            keywords: ['python', 'java', 'node', 'sql', 'backend', 'database', 'django', 'flask', 'api'],
            skills: ['OOP', 'Data Structures', 'APIs', 'SQL', 'Git & GitHub', 'System Design', 'Docker']
        },
        'Design / UI UX': {
            keywords: ['ui', 'ux', 'figma', 'design', 'wireframe', 'prototype', 'adobe'],
            skills: ['Figma', 'Wireframing', 'Prototyping', 'Color Theory', 'Design Systems', 'User Research']
        },
        'General Software Engineering': {
            keywords: ['c++', 'c', 'c#', 'algorithm', 'git'],
            skills: ['Data Structures', 'Algorithms', 'Version Control (Git)', 'Testing', 'Clean Code', 'CI/CD']
        }
    };

    let currentLearningSkills = [];
    let currentKnownGaps = [];

    function detectDomainAndGaps(skills) {
        let domainScores = {
            'Web Development': 0,
            'Backend / Data': 0,
            'Design / UI UX': 0,
            'General Software Engineering': 0
        };

        // Score domains based on keywords
        skills.forEach(skill => {
            const lowerSkill = skill.toLowerCase();
            for (const [domain, data] of Object.entries(domainKnowledge)) {
                if (data.keywords.some(kw => lowerSkill.includes(kw))) {
                    domainScores[domain]++;
                }
            }
        });

        // Find highest scoring domain
        let detectedDomain = 'General Software Engineering';
        let maxScore = 0;
        for (const [domain, score] of Object.entries(domainScores)) {
            if (score > maxScore) {
                maxScore = score;
                detectedDomain = domain;
            }
        }

        // Get required skills, filtering out ones the user already explicitly typed
        let requiredSkills = domainKnowledge[detectedDomain].skills.filter(reqSkill => {
            return !skills.some(userSkill => userSkill.toLowerCase() === reqSkill.toLowerCase());
        });

        return { domain: detectedDomain, requiredSkills };
    }

    function generateSkillGaps() {
        const wasHidden = recommendationsSection.style.display === 'none' || recommendationsSection.style.display === '';
        
        recommendationsSection.style.display = 'block';
        formActionsContainer.style.display = 'none';

        skillGapGrid.innerHTML = '';
        
        const { domain, requiredSkills } = detectDomainAndGaps(userSkills);
        
        recommendationTitle.textContent = `Skills You May Need for ${domain}`;

        // Reset tracking arrays
        currentLearningSkills = [...requiredSkills];
        currentKnownGaps = [];

        requiredSkills.forEach((skill, index) => {
            const tag = document.createElement('div');
            tag.className = 'gap-tag status-learn';
            tag.dataset.skill = skill;
            tag.innerHTML = `
                <i class="fas fa-plus-circle"></i>
                <span>${skill}</span>
            `;

            tag.addEventListener('click', () => {
                // Toggle status
                if (tag.classList.contains('status-learn')) {
                    // Switch to known
                    tag.classList.remove('status-learn');
                    tag.classList.add('status-known');
                    tag.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <span>${skill}</span>
                    `;
                    // Move from learning to known
                    currentLearningSkills = currentLearningSkills.filter(s => s !== skill);
                    currentKnownGaps.push(skill);
                } else {
                    // Switch to learn
                    tag.classList.remove('status-known');
                    tag.classList.add('status-learn');
                    tag.innerHTML = `
                        <i class="fas fa-plus-circle"></i>
                        <span>${skill}</span>
                    `;
                    // Move from known to learning
                    currentKnownGaps = currentKnownGaps.filter(s => s !== skill);
                    currentLearningSkills.push(skill);
                }
            });

            skillGapGrid.appendChild(tag);
        });

        if (wasHidden) {
            setTimeout(() => {
                recommendationsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }

    // Handle the final roadmap generation
    generateRoadmapBtn.addEventListener('click', () => {
        // Combine explicitly typed skills with gap skills they marked as known
        const finalKnownSkills = [...new Set([...userSkills, ...currentKnownGaps])];
        
        localStorage.setItem('userLevel', currentLevel);
        localStorage.setItem('userSkills', JSON.stringify(finalKnownSkills));
        localStorage.setItem('learningSkills', JSON.stringify(currentLearningSkills));
        localStorage.setItem('userExperience', experienceField.value);

        // Transition
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            window.location.href = 'skill-verification.html';
        }, 300);
    });

    // =========================
    // Generate Button
    // =========================

    generateBtn.addEventListener('click', () => {

        validateForm();

        if (generateBtn.disabled) return;

        // Save Data
        localStorage.setItem(
            'userLevel',
            currentLevel
        );

        localStorage.setItem(
            'userSkills',
            JSON.stringify(userSkills)
        );

        localStorage.setItem(
            'userExperience',
            experienceField.value
        );

        // Page transition
        document.body.style.opacity = '0';
        document.body.style.transition =
            'opacity 0.3s ease';

        setTimeout(() => {
            window.location.href = 'skill-verification.html';
        }, 300);
    });

    // =========================
    // Initialize UI
    // =========================

=======
    // ========================= Initialize UI =========================
>>>>>>> 8bf0ba3952f61e1122f26d8b54b97912b4634d36
    updateLevelUI();
    updateModuleLevelHint(currentLevel);
    buildModuleOptions();   // populate the module select after DOM + ROADMAP_DATA are ready
});
