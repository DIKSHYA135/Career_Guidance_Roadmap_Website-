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

    // Skills UI elements
    const tagInputWrapper = document.getElementById('tag-input-wrapper');
    const skillTextInput = document.getElementById('skill-text-input');
    const skillsError = document.getElementById('skills-error');

    let currentLevel = 'Beginner';
    let currentCategory = 'Web Development';
    let selectedModuleId = '';     
    let userSkills = [];

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

        const storedSkills = localStorage.getItem('userSkills');
        if (storedSkills) {
            userSkills = JSON.parse(storedSkills);
        }
    } catch (e) {
        console.error('Error loading localStorage:', e);
    }

    if (categorySelect) {
        categorySelect.value = currentCategory;
    }

    // ========================= Skills Logic =========================
    function renderSkills() {
        if (!tagInputWrapper) return;
        
        // Remove existing tags
        const existingTags = tagInputWrapper.querySelectorAll('.skill-tag');
        existingTags.forEach(tag => tag.remove());

        // Add new tags before the input
        userSkills.forEach((skill, index) => {
            const tag = document.createElement('div');
            tag.className = 'skill-tag';
            tag.innerHTML = `
                ${skill}
                <button type="button" class="tag-remove" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            tagInputWrapper.insertBefore(tag, skillTextInput);
        });

        // Add event listeners to remove buttons
        tagInputWrapper.querySelectorAll('.tag-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.dataset.index);
                userSkills.splice(idx, 1);
                localStorage.setItem('userSkills', JSON.stringify(userSkills));
                renderSkills();
                validateForm();
            });
        });
    }

    function addSkill() {
        if (!skillTextInput) return;
        const skill = skillTextInput.value.trim();
        if (skill && !userSkills.includes(skill)) {
            userSkills.push(skill);
            localStorage.setItem('userSkills', JSON.stringify(userSkills));
            renderSkills();
            skillTextInput.value = '';
            validateForm();
        }
    }

    if (skillTextInput) {
        skillTextInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
            }
        });
        // Also add on blur if user clicks away
        skillTextInput.addEventListener('blur', addSkill);
    }

    if (tagInputWrapper) {
        tagInputWrapper.addEventListener('click', () => {
            skillTextInput.focus();
        });
    }

    // ========================= Module Selector =========================
    function buildModuleOptions() {
        if (!moduleSelect) return;
        const pathData = (typeof MODULES_DATA !== 'undefined' && MODULES_DATA[currentCategory]) ? MODULES_DATA[currentCategory] : null;
        const levelData = pathData ? (pathData[currentLevel] || []) : [];

        let optionsHTML = '';
        if (currentLevel === 'Beginner') {
            optionsHTML += `<option value="" data-level="none">🚀 None — Start from the very beginning</option>`;
        }

        const levelKey = currentLevel.toLowerCase();
        levelData.forEach(m => {
            optionsHTML += `<option value="${m.id}" data-level="${levelKey}" data-desc="${m.desc}">${m.title}</option>`;
        });
        moduleSelect.innerHTML = optionsHTML;
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
            modulePrevTitle.textContent = 'Start from the very beginning';
            modulePrevDesc.textContent  = 'You will follow the full roadmap from Module 1 onwards.';
            modulePrevBadge.textContent = 'No skip';
            modulePrevBadge.className   = 'module-preview-badge badge-none';
        } else {
            modulePrevTitle.textContent = selected.textContent;
            modulePrevDesc.textContent  = desc;
            modulePrevBadge.textContent = level.charAt(0).toUpperCase() + level.slice(1);
            modulePrevBadge.className   = `module-preview-badge badge-${level}`;
        }
        modulePreview.style.display = 'flex';
    }

    function updateModuleLevelHint(level) {
        if (moduleLevelHint) moduleLevelHint.textContent = `(${level} modules)`;
    }

    // ========================= Event Listeners =========================
    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            currentCategory = categorySelect.value;
            localStorage.setItem('xyverra_selected_path', currentCategory);
            buildModuleOptions();
        });
    }

    levelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLevel = btn.dataset.level;
            updateLevelUI();
            updateModuleLevelHint(currentLevel);
            buildModuleOptions();
        });
    });

    function updateLevelUI() {
        levelBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.level === currentLevel);
        });
    }

    function validateForm() {
        const isValid = userSkills.length > 0;
        if (skillsError) skillsError.style.display = isValid ? 'none' : 'block';
        return isValid;
    }

    // ========================= Generate Button =========================
    if (generateBtn) {
        generateBtn.addEventListener('click', async () => {
            if (!validateForm()) return;

            const email = localStorage.getItem('xyverra_user_email');
            if (!email) {
                alert("User email not found. Please log in again.");
                window.location.href = 'login.html';
                return;
            }

            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving to MongoDB...';
            generateBtn.disabled = true;

            try {
                // Save Level
                await fetch('http://localhost:5000/api/user/save-level', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, selectedLevel: currentLevel })
                });

                // Save Skills
                const skillsResponse = await fetch('http://localhost:5000/api/user/save-skills', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, skills: userSkills })
                });

                if (skillsResponse.ok) {
                    localStorage.setItem('userLevel', currentLevel);
                    localStorage.setItem('userSkills', JSON.stringify(userSkills));
                    
                    window.location.href = currentLevel === 'Beginner' ? 'roadmap.html' : `quiz.html?mode=assessment&targetLevel=${currentLevel}&phase=beginner`;
                } else {
                    alert("Failed to save skills.");
                    generateBtn.innerHTML = 'Generate Roadmap';
                    generateBtn.disabled = false;
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Connection error.");
                generateBtn.innerHTML = 'Generate Roadmap';
                generateBtn.disabled = false;
            }
        });
    }

    // Initialize
    updateLevelUI();
    updateModuleLevelHint(currentLevel);
    buildModuleOptions(); 
    renderSkills();
});
