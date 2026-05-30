/* ==========================================================
   skills.js — Redesigned Skill Inventory (Category Based)
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Data
    let localSkillsData = null;
    try {
        const storedData = localStorage.getItem('xyverra_skills_data');
        if (storedData) {
            localSkillsData = JSON.parse(storedData);
        }
    } catch (e) {
        console.error("Error reading from localStorage", e);
    }

    if (!localSkillsData) {
        // Fallback to SKILLS_DATA from app-data.js
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
    const skillPanel = document.getElementById('skill-panel');
    const panelCategoryTitle = document.getElementById('panel-category-title');
    const btnClosePanel = document.getElementById('btn-close-panel');

    const lists = {
        beginner: document.getElementById('list-beginner'),
        intermediate: document.getElementById('list-intermediate'),
        advanced: document.getElementById('list-advanced')
    };

    let selectedCategory = null;

    if (!categoryCardsContainer) return; // Prevent errors on other pages if included

    // 3. Render Categories
    function renderCategories() {
        categoryCardsContainer.innerHTML = '';
        const categories = Object.keys(localSkillsData);

        categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.textContent = category;
            
            card.addEventListener('click', () => {
                // Update active state
                document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                
                selectedCategory = category;
                openPanel();
            });

            categoryCardsContainer.appendChild(card);
        });
    }

    // 4. Panel Logic
    function openPanel() {
        if (!selectedCategory) return;
        panelCategoryTitle.textContent = selectedCategory + " Skills";
        renderSkills();
        skillPanel.style.display = 'block';
    }

    function closePanel() {
        skillPanel.style.display = 'none';
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
        selectedCategory = null;
    }

    if (btnClosePanel) {
        btnClosePanel.addEventListener('click', closePanel);
    }

    function renderSkills() {
        if (!selectedCategory || !localSkillsData[selectedCategory]) return;

        const categoryData = localSkillsData[selectedCategory];

        ['beginner', 'intermediate', 'advanced'].forEach(level => {
            const listEl = lists[level];
            listEl.innerHTML = '';
            
            const skills = categoryData[level] || [];
            skills.forEach((skill, index) => {
                const li = document.createElement('li');
                li.className = 'skill-item';
                li.innerHTML = `
                    <span class="skill-name">${skill}</span>
                    <div class="skill-actions">
                        <button class="action-btn-small edit-btn" data-level="${level}" data-index="${index}" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="action-btn-small delete-btn" data-level="${level}" data-index="${index}" title="Delete"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                listEl.appendChild(li);
            });
        });
    }

    // 5. Add, Edit, Delete Logic
    // Use event delegation for lists
    ['beginner', 'intermediate', 'advanced'].forEach(level => {
        if (lists[level]) {
            lists[level].addEventListener('click', (e) => {
                const editBtn = e.target.closest('.edit-btn');
                const deleteBtn = e.target.closest('.delete-btn');

                if (editBtn) {
                    const index = editBtn.dataset.index;
                    const currentSkill = localSkillsData[selectedCategory][level][index];
                    const newSkill = prompt("Edit skill:", currentSkill);
                    if (newSkill !== null && newSkill.trim() !== '') {
                        localSkillsData[selectedCategory][level][index] = newSkill.trim();
                        saveData();
                        renderSkills();
                    }
                } else if (deleteBtn) {
                    const index = deleteBtn.dataset.index;
                    if (confirm("Are you sure you want to delete this skill?")) {
                        localSkillsData[selectedCategory][level].splice(index, 1);
                        saveData();
                        renderSkills();
                    }
                }
            });
        }
    });

    // Add buttons
    document.querySelectorAll('.add-skill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!selectedCategory) return;
            const level = btn.dataset.level;
            const newSkill = prompt(`Add a new ${level} skill for ${selectedCategory}:`);
            if (newSkill !== null && newSkill.trim() !== '') {
                if (!localSkillsData[selectedCategory][level]) {
                    localSkillsData[selectedCategory][level] = [];
                }
                localSkillsData[selectedCategory][level].push(newSkill.trim());
                saveData();
                renderSkills();
            }
        });
    });

    // Initial Render
    renderCategories();
});
