document.addEventListener('DOMContentLoaded', () => {

    const levelBtns = document.querySelectorAll('.level-btn');
    const skillInput = document.getElementById('skill-input-field');
    const tagContainer = document.getElementById('tag-container');
    const tagsWrapper = document.getElementById('tags-wrapper');
    const generateBtn = document.getElementById('generate-btn');
    const errorMessage = document.getElementById('error-message');
    const experienceField = document.getElementById('experience-field');

    let currentLevel = "Beginner";
    let userSkills = [];

    // Focus input when clicking tag area
    tagContainer.addEventListener('click', () => {
        skillInput.focus();
    });

    // =========================
    // Load Saved Data
    // =========================

    try {

        const storedLevel = localStorage.getItem('userLevel');
        if (storedLevel) {
            currentLevel = storedLevel;
        }

        const storedSkills = localStorage.getItem('userSkills');
        if (storedSkills) {
            userSkills = JSON.parse(storedSkills);
        }

        const storedExp = localStorage.getItem('userExperience');
        if (storedExp) {
            experienceField.value = storedExp;
        }

    } catch (e) {
        console.error("Error loading localStorage:", e);
    }

    // =========================
    // Level Selection
    // =========================

    levelBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            currentLevel = btn.dataset.level;

            updateLevelUI();
            validateForm();
        });
    });

    function updateLevelUI() {

        levelBtns.forEach(btn => {

            btn.classList.toggle(
                'active',
                btn.dataset.level === currentLevel
            );
        });
    }

    // =========================
    // Skill Input Logic
    // =========================

    skillInput.addEventListener('keydown', (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            addSkill(skillInput.value);
        }

        // Remove last skill with backspace
        if (
            e.key === 'Backspace' &&
            skillInput.value === '' &&
            userSkills.length > 0
        ) {

            removeSkill(userSkills.length - 1);
        }
    });

    // Add by comma
    skillInput.addEventListener('keyup', (e) => {

        if (e.key === ',') {

            addSkill(
                skillInput.value.replace(',', '')
            );
        }
    });

    // Add on blur
    skillInput.addEventListener('blur', () => {

        if (skillInput.value.trim() !== '') {

            addSkill(skillInput.value);
        }
    });

    // =========================
    // Add Skill
    // =========================

    function addSkill(skillName) {

        const name = skillName.trim();

        if (!name) return;

        // Prevent duplicates
        const exists = userSkills.some(
            skill => skill.toLowerCase() === name.toLowerCase()
        );

        if (!exists) {

            userSkills.push(name);

            renderTags();
            validateForm();
        }

        skillInput.value = '';
    }

    // =========================
    // Remove Skill
    // =========================

    function removeSkill(index) {

        userSkills.splice(index, 1);

        renderTags();
        validateForm();
    }

    // =========================
    // Render Tags
    // =========================

    function renderTags() {

        tagsWrapper.innerHTML = '';

        userSkills.forEach((skill, index) => {

            const tag = document.createElement('div');

            tag.className = 'tag';

            tag.innerHTML = `
                <span>${skill}</span>

                <button class="tag-remove" data-index="${index}">
                    ×
                </button>
            `;

            tag.querySelector('.tag-remove')
                .addEventListener('click', (e) => {

                    e.stopPropagation();

                    removeSkill(index);
                });

            tagsWrapper.appendChild(tag);
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

            window.location.href = 'roadmap.html';

        }, 300);
    });

    // =========================
    // Initialize UI
    // =========================

    updateLevelUI();
    renderTags();
    validateForm();

});