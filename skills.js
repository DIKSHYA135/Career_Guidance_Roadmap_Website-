/* ==========================================================
   skills.js — Redesigned Skill Inventory (Category Based)
   All browser confirm()/prompt() replaced with XyConfirm/XyPrompt
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Data
    let localSkillsData = null;
    try {
        const storedData = localStorage.getItem('xyverra_skills_data');
        if (storedData) localSkillsData = JSON.parse(storedData);
    } catch (e) {
        console.error("Error reading from localStorage", e);
    }

    if (!localSkillsData) {
        if (typeof SKILLS_DATA !== 'undefined') {
            localSkillsData = JSON.parse(JSON.stringify(SKILLS_DATA));
            saveData();
        } else {
            console.error("SKILLS_DATA not found in app-data.js");
            return;
        }
    }

    function saveData() {
        localStorage.setItem('xyverra_skills_data', JSON.stringify(localSkillsData));
    }

    // 2. Elements
    const categoryCardsContainer = document.getElementById('category-cards');
    const skillPanel             = document.getElementById('skill-panel');
    const panelCategoryTitle     = document.getElementById('panel-category-title');
    const btnClosePanel          = document.getElementById('btn-close-panel');
    const analyticsContainer     = document.getElementById('skills-analytics');
    const skillSearchInput       = document.getElementById('skill-search');

    const lists = {
        beginner:     document.getElementById('list-beginner'),
        intermediate: document.getElementById('list-intermediate'),
        advanced:     document.getElementById('list-advanced')
    };

    let selectedCategory = null;

    if (!categoryCardsContainer) return;

    // 3. Render Analytics Summary
    function renderAnalytics() {
        if (!analyticsContainer) return;
        let total = 0, bCount = 0, iCount = 0, aCount = 0;
        Object.values(localSkillsData).forEach(cat => {
            bCount += (cat.beginner     || []).length;
            iCount += (cat.intermediate || []).length;
            aCount += (cat.advanced     || []).length;
        });
        total = bCount + iCount + aCount;

        analyticsContainer.innerHTML = `
            <div class="skill-stat-card">
                <div class="skill-stat-num">${total}</div>
                <div class="skill-stat-label">Total Skills</div>
            </div>
            <div class="skill-stat-card skill-stat-green">
                <div class="skill-stat-num">${bCount}</div>
                <div class="skill-stat-label">Beginner</div>
            </div>
            <div class="skill-stat-card skill-stat-amber">
                <div class="skill-stat-num">${iCount}</div>
                <div class="skill-stat-label">Intermediate</div>
            </div>
            <div class="skill-stat-card skill-stat-purple">
                <div class="skill-stat-num">${aCount}</div>
                <div class="skill-stat-label">Advanced</div>
            </div>
        `;
    }

    // 4. Render Categories
    function renderCategories() {
        categoryCardsContainer.innerHTML = '';
        const categories = Object.keys(localSkillsData);
        const icons = {
            'Web Development': '🌐', 'Full Stack Development': '⚡',
            'Backend / APIs': '🔧', 'Data Science': '📊',
            'NLP / AI': '🤖', 'Cloud / DevOps': '☁️',
            'UI/UX Design': '🎨', 'Mobile Development': '📱',
            'Cybersecurity': '🔒', 'Data Analytics': '📈'
        };

        categories.forEach(category => {
            const cat = localSkillsData[category];
            const skillCount = (cat.beginner || []).length + (cat.intermediate || []).length + (cat.advanced || []).length;
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <span class="cat-icon">${icons[category] || '📁'}</span>
                <span class="cat-name">${category}</span>
                <span class="cat-count">${skillCount} skills</span>
            `;
            card.addEventListener('click', () => {
                document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                selectedCategory = category;
                openPanel();
            });
            categoryCardsContainer.appendChild(card);
        });

        renderAnalytics();
    }

    // 5. Panel Logic
    function openPanel() {
        if (!selectedCategory) return;
        panelCategoryTitle.textContent = selectedCategory + " Skills";
        renderSkills();
        skillPanel.style.display = 'block';
        skillPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function closePanel() {
        skillPanel.style.display = 'none';
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
        selectedCategory = null;
    }

    if (btnClosePanel) btnClosePanel.addEventListener('click', closePanel);

    // Search filter
    if (skillSearchInput) {
        skillSearchInput.addEventListener('input', () => {
            if (selectedCategory) renderSkills(skillSearchInput.value.toLowerCase());
        });
    }

    function renderSkills(filterText = '') {
        if (!selectedCategory || !localSkillsData[selectedCategory]) return;
        const categoryData = localSkillsData[selectedCategory];

        ['beginner', 'intermediate', 'advanced'].forEach(level => {
            const listEl = lists[level];
            if (!listEl) return;
            listEl.innerHTML = '';

            const skills = categoryData[level] || [];
            const filtered = filterText ? skills.filter(s => s.toLowerCase().includes(filterText)) : skills;

            if (filtered.length === 0) {
                listEl.innerHTML = `<li class="skill-empty-state">No skills yet. Add one using the + button.</li>`;
                return;
            }

            filtered.forEach((skill, index) => {
                const realIndex = skills.indexOf(skill);
                const li = document.createElement('li');
                li.className = 'skill-item';
                li.dataset.level = level;
                li.dataset.index = realIndex;
                li.innerHTML = `
                    <span class="skill-name">${skill}</span>
                    <div class="skill-actions">
                        <button class="action-btn-small edit-btn" data-level="${level}" data-index="${realIndex}" title="Edit skill">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="action-btn-small delete-btn" data-level="${level}" data-index="${realIndex}" title="Delete skill">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                listEl.appendChild(li);
            });
        });
    }

    // 6. Add, Edit, Delete — using XyPrompt / XyConfirm
    ['beginner', 'intermediate', 'advanced'].forEach(level => {
        if (!lists[level]) return;
        lists[level].addEventListener('click', async (e) => {
            const editBtn   = e.target.closest('.edit-btn');
            const deleteBtn = e.target.closest('.delete-btn');

            if (editBtn) {
                const index        = parseInt(editBtn.dataset.index);
                const currentSkill = localSkillsData[selectedCategory][level][index];

                const newSkill = typeof XyPrompt !== 'undefined'
                    ? await XyPrompt({ title: 'Edit Skill', placeholder: 'Skill name', defaultValue: currentSkill, confirmText: 'Save' })
                    : prompt("Edit skill:", currentSkill);

                if (newSkill && newSkill.trim() !== '') {
                    localSkillsData[selectedCategory][level][index] = newSkill.trim();
                    saveData();
                    renderSkills(skillSearchInput ? skillSearchInput.value.toLowerCase() : '');
                    renderAnalytics();
                    if (typeof XySuccess !== 'undefined') XySuccess(`"${newSkill.trim()}" updated successfully.`);
                }
            } else if (deleteBtn) {
                const index = parseInt(deleteBtn.dataset.index);
                const skillName = localSkillsData[selectedCategory][level][index];

                const confirmed = typeof XyConfirm !== 'undefined'
                    ? await XyConfirm({ title: 'Delete Skill?', message: `Remove "<strong>${skillName}</strong>" from ${level}?`, confirmText: 'Delete', type: 'danger' })
                    : window.confirm(`Delete "${skillName}"?`);

                if (confirmed) {
                    localSkillsData[selectedCategory][level].splice(index, 1);
                    saveData();
                    renderSkills(skillSearchInput ? skillSearchInput.value.toLowerCase() : '');
                    renderAnalytics();
                    if (typeof XyWarning !== 'undefined') XyWarning(`"${skillName}" removed.`);
                }
            }
        });
    });

    // Add skill buttons
    document.querySelectorAll('.add-skill-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (!selectedCategory) return;
            const level = btn.dataset.level;

            const newSkill = typeof XyPrompt !== 'undefined'
                ? await XyPrompt({ title: `Add ${level.charAt(0).toUpperCase() + level.slice(1)} Skill`, message: `Adding to: <strong>${selectedCategory}</strong>`, placeholder: 'e.g. TypeScript, Docker, Figma...', confirmText: 'Add Skill' })
                : prompt(`Add a new ${level} skill for ${selectedCategory}:`);

            if (newSkill && newSkill.trim() !== '') {
                if (!localSkillsData[selectedCategory][level]) localSkillsData[selectedCategory][level] = [];
                localSkillsData[selectedCategory][level].push(newSkill.trim());
                saveData();
                renderSkills(skillSearchInput ? skillSearchInput.value.toLowerCase() : '');
                renderCategories();
                if (typeof XySuccess !== 'undefined') XySuccess(`"${newSkill.trim()}" added to ${level}!`);
            }
        });
    });

    // Export functionality
    const exportBtn = document.getElementById('btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const data = JSON.stringify(localSkillsData, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url  = URL.createObjectURL(blob);
            const a    = document.createElement('a');
            a.href     = url;
            a.download = 'xyverra-skills.json';
            a.click();
            URL.revokeObjectURL(url);
            if (typeof XySuccess !== 'undefined') XySuccess('Skills exported successfully!');
        });
    }

    // Initial Render
    renderCategories();
});
