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

    // Focus input when clicking anywhere on the tag container
    tagContainer.addEventListener('click', () => {
        skillInput.focus();
    });

    // Initialize from LocalStorage (optional but good UX if user returns)
    try {
        const storedLevel = localStorage.getItem('userLevel');
        if (storedLevel) {
            currentLevel = storedLevel;
            updateLevelUI();
        }
        
        const storedSkills = localStorage.getItem('userSkills');
        if (storedSkills) {
            userSkills = JSON.parse(storedSkills);
            renderTags();
        }

        const storedExp = localStorage.getItem('userExperience');
        if (storedExp) {
            experienceField.value = storedExp;
        }
    } catch(e) {
        console.error("Error loading saved data", e);
    }

    // Level Selection
    levelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLevel = btn.getAttribute('data-level');
            updateLevelUI();
            validateForm();
        });
    });

    function updateLevelUI() {
        levelBtns.forEach(btn => {
            if (btn.getAttribute('data-level') === currentLevel) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Tag Input Logic
    skillInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill(skillInput.value);
        } else if (e.key === 'Backspace' && skillInput.value === '' && userSkills.length > 0) {
            // Remove last tag if backspace is pressed on empty input
            removeSkill(userSkills.length - 1);
        }
    });

    // Handle comma separated values
    skillInput.addEventListener('keyup', (e) => {
        if (e.key === ',') {
            addSkill(skillInput.value.replace(',', ''));
        }
    });

    skillInput.addEventListener('blur', () => {
        if (skillInput.value.trim() !== '') {
            addSkill(skillInput.value);
        }
    });

    function addSkill(skillName) {
        const name = skillName.trim();
        if (name === '') return;

        // Prevent duplicates (case insensitive)
        const isDuplicate = userSkills.some(s => s.toLowerCase() === name.toLowerCase());
        if (!isDuplicate) {
            userSkills.push(name);
            renderTags();
            validateForm();
        }
        
        skillInput.value = '';
    }

    function removeSkill(index) {
        userSkills.splice(index, 1);
        renderTags();
        validateForm();
    }

    function renderTags() {
        tagsWrapper.innerHTML = '';
        userSkills.forEach((skill, index) => {
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.innerHTML = `
                ${skill}
                <span class="tag-remove" data-index="${index}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </span>
            `;
            tagsWrapper.appendChild(tag);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.tag-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent focusing input
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                removeSkill(index);
            });
        });
    }

    // Validation Logic
    function validateForm() {
        let isValid = true;
        errorMessage.style.display = 'none';

        if (userSkills.length === 0) {
            isValid = false;
            if (currentLevel === "Beginner") {
                errorMessage.style.display = 'flex';
            } else {
                errorMessage.style.display = 'flex';
            }
        }

        if (isValid) {
            generateBtn.classList.remove('disabled');
            generateBtn.removeAttribute('disabled');
        } else {
            generateBtn.classList.add('disabled');
            generateBtn.setAttribute('disabled', 'true');
        }
    }

    // Submission
    generateBtn.addEventListener('click', () => {
        validateForm();
        if (generateBtn.classList.contains('disabled') || userSkills.length === 0) return;

        // Store data
        localStorage.setItem('userLevel', currentLevel);
        localStorage.setItem('userSkills', JSON.stringify(userSkills));
        localStorage.setItem('userExperience', experienceField.value);

        // Redirect
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            window.location.href = 'roadmap.html';
        }, 300);
    });

    // Initial validation
    validateForm();
});
