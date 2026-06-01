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

    updateLevelUI();
    renderTags();
    validateForm();

});
