document.addEventListener('DOMContentLoaded', () => {
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

    updateLevelUI();
    renderTags();
    validateForm();

});
