/* ==========================================================
   skills.js — Skill Inventory
   SKILLS_DATA format: { "Category": { beginner: [...], intermediate: [...], advanced: [...] } }
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Bootstrap Data ──────────────────────────────────
    // Always start fresh from SKILLS_DATA (wipe stale localStorage cache)
    if (typeof SKILLS_DATA === 'undefined') {
        console.error('[skills.js] SKILLS_DATA not found. Make sure app-data.js is loaded first.');
        return;
    }

    // Deep clone the source data
    let skillsData = JSON.parse(JSON.stringify(SKILLS_DATA));

    // Merge any saved additions (user-added skills) without overwriting defaults
    try {
        const saved = JSON.parse(localStorage.getItem('xyverra_skills_data') || 'null');
        if (saved && typeof saved === 'object') {
            // Only merge — don't replace; only pull keys that exist in SKILLS_DATA
            Object.keys(SKILLS_DATA).forEach(cat => {
                if (saved[cat]) {
                    ['beginner', 'intermediate', 'advanced'].forEach(lvl => {
                        if (Array.isArray(saved[cat][lvl])) {
                            skillsData[cat][lvl] = saved[cat][lvl];
                        }
                    });
                }
            });
        }
    } catch (e) { /* ignore bad localStorage */ }

    function save() {
        try { localStorage.setItem('xyverra_skills_data', JSON.stringify(skillsData)); } catch (e) { }
    }

    // ── 2. DOM References ──────────────────────────────────
    const elCategoryCards = document.getElementById('category-cards');
    const elSkillPanel = document.getElementById('skill-panel');
    const elPanelTitle = document.getElementById('panel-category-title');
    const elBtnClosePanel = document.getElementById('btn-close-panel');
    const elAnalytics = document.getElementById('skills-analytics');
    const elSearch = document.getElementById('skill-search');
    const elPathTitle = document.getElementById('skills-path-title');

    const elLists = {
        beginner: document.getElementById('list-beginner'),
        intermediate: document.getElementById('list-intermediate'),
        advanced: document.getElementById('list-advanced')
    };

    if (!elCategoryCards) { console.error('[skills.js] #category-cards not found'); return; }

    let activeCategory = localStorage.getItem('xyverra_selected_path') || Object.keys(skillsData)[0];

    // ── 3. Analytics Strip ────────────────────────────────
    function renderAnalytics() {
        if (!elAnalytics) return;
        let total = 0, b = 0, i = 0, a = 0;
        Object.values(skillsData).forEach(cat => {
            b += (cat.beginner || []).length;
            i += (cat.intermediate || []).length;
            a += (cat.advanced || []).length;
        });
        total = b + i + a;
        elAnalytics.innerHTML = `
            <div class="skill-stat-card">
                <div class="skill-stat-num">${total}</div>
                <div class="skill-stat-label">Total Skills</div>
            </div>
            <div class="skill-stat-card skill-stat-green">
                <div class="skill-stat-num">${b}</div>
                <div class="skill-stat-label">Beginner</div>
            </div>
            <div class="skill-stat-card skill-stat-amber">
                <div class="skill-stat-num">${i}</div>
                <div class="skill-stat-label">Intermediate</div>
            </div>
            <div class="skill-stat-card skill-stat-purple">
                <div class="skill-stat-num">${a}</div>
                <div class="skill-stat-label">Advanced</div>
            </div>
        `;
    }

    // ── 4. Category Cards ─────────────────────────────────
    const ICONS = {
        'Web Development': '<i class="fas fa-globe" style="color: #3b82f6; filter: drop-shadow(0 2px 4px rgba(59,130,246,0.3));"></i>',
        'Full Stack Development': '<i class="fas fa-layer-group" style="color: #8b5cf6; filter: drop-shadow(0 2px 4px rgba(139,92,246,0.3));"></i>',
        'Backend / APIs': '<i class="fas fa-server" style="color: #10b981; filter: drop-shadow(0 2px 4px rgba(16,185,129,0.3));"></i>',
        'Data Science': '<i class="fas fa-chart-line" style="color: #f59e0b; filter: drop-shadow(0 2px 4px rgba(245,158,11,0.3));"></i>',
        'NLP / AI': '<i class="fas fa-brain" style="color: #ec4899; filter: drop-shadow(0 2px 4px rgba(236,72,153,0.3));"></i>',
        'Cloud / DevOps': '<i class="fas fa-cloud" style="color: #0ea5e9; filter: drop-shadow(0 2px 4px rgba(14,165,233,0.3));"></i>',
        'UI/UX Design': '<i class="fas fa-palette" style="color: #f43f5e; filter: drop-shadow(0 2px 4px rgba(244,63,94,0.3));"></i>',
        'Mobile Development': '<i class="fas fa-mobile-alt" style="color: #14b8a6; filter: drop-shadow(0 2px 4px rgba(20,184,166,0.3));"></i>',
        'Cybersecurity': '<i class="fas fa-shield-alt" style="color: #ef4444; filter: drop-shadow(0 2px 4px rgba(239,68,68,0.3));"></i>',
        'Data Analytics': '<i class="fas fa-chart-pie" style="color: #eab308; filter: drop-shadow(0 2px 4px rgba(234,179,8,0.3));"></i>'
    };

    function renderCategories() {
        elCategoryCards.innerHTML = '';
        Object.keys(skillsData).forEach(cat => {
            const d = skillsData[cat];
            const count = (d.beginner || []).length + (d.intermediate || []).length + (d.advanced || []).length;
            const card = document.createElement('div');
            card.className = 'category-card' + (cat === activeCategory ? ' active' : '');
            card.innerHTML = `
                <span class="cat-icon">${ICONS[cat] || '<i class="fas fa-folder"></i>'}</span>
                <span class="cat-name">${cat}</span>
                <span class="cat-count">${count} skills</span>
            `;
            card.addEventListener('click', () => {
                document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                activeCategory = cat;
                localStorage.setItem('xyverra_selected_path', cat);
                if (elPathTitle) elPathTitle.textContent = cat;
                openPanel();
            });
            elCategoryCards.appendChild(card);
        });
        renderAnalytics();
    }

    // ── 5. Panel ──────────────────────────────────────────
    function openPanel() {
        if (!activeCategory || !elSkillPanel || !elPanelTitle) return;
        elPanelTitle.innerHTML = `<i class="fas fa-layer-group"></i> ${activeCategory}`;
        renderSkills();
        elSkillPanel.style.display = 'block';
        elSkillPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function closePanel() {
        if (elSkillPanel) elSkillPanel.style.display = 'none';
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
        activeCategory = null;
    }

    if (elBtnClosePanel) elBtnClosePanel.addEventListener('click', closePanel);
    if (elSearch) elSearch.addEventListener('input', () => { if (activeCategory) renderSkills(elSearch.value.toLowerCase()); });

    // ── 6. Render Skills ──────────────────────────────────
    function renderSkills(filter = '') {
        if (!activeCategory || !skillsData[activeCategory]) return;
        const catData = skillsData[activeCategory];

        ['beginner', 'intermediate', 'advanced'].forEach(level => {
            const ul = elLists[level];
            if (!ul) return;
            ul.innerHTML = '';

            const all = catData[level] || [];
            const shown = filter ? all.filter(s => s.toLowerCase().includes(filter)) : all;

            if (shown.length === 0) {
                ul.innerHTML = `<li class="skill-empty-state">No ${level} skills yet. Click + to add one.</li>`;
                return;
            }

            shown.forEach(skillName => {
                const realIdx = all.indexOf(skillName);
                const li = document.createElement('li');
                li.className = 'skill-item';
                li.dataset.level = level;
                li.dataset.index = realIdx;

                const hintText = level === 'advanced'
                    ? 'Advanced — assessment coming soon'
                    : 'Click to take assessment & unlock roadmap';
                const hintIcon = level === 'advanced' ? 'fa-info-circle' : 'fa-play-circle';

                li.innerHTML = `
                    <div class="skill-item-body">
                        <span class="skill-name">${skillName}</span>
                        <span class="skill-hint"><i class="fas ${hintIcon}"></i> ${hintText}</span>
                    </div>
                    <div class="skill-actions">
                        <button class="action-btn-small edit-btn" title="Edit" data-level="${level}" data-index="${realIdx}">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="action-btn-small delete-btn" title="Delete" data-level="${level}" data-index="${realIdx}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;

                // Assessment click (not on action buttons)
                li.addEventListener('click', e => {
                    if (e.target.closest('.skill-actions')) return;
                    launchAssessment(level, realIdx);
                });

                ul.appendChild(li);
            });
        });
    }

    // ── 7. Launch Assessment ──────────────────────────────
    function launchAssessment(level, skillIndex) {
        const catModules = (typeof MODULES_DATA !== 'undefined') ? MODULES_DATA[activeCategory] : null;
        const catEncoded = encodeURIComponent(activeCategory);

        if (!catModules) {
            notify('warning', 'No assessment modules are mapped for this category yet.');
            return;
        }

        if (level === 'beginner') {
            const mods = catModules['Beginner'] || [];
            // Map skill index → module; fall back to first module
            const mod = mods[skillIndex] || mods[0];
            if (!mod) { notify('warning', 'No assessment found for this skill.'); return; }
            go(`quiz.html?specificModules=${mod.id}&targetLevel=Beginner&category=${catEncoded}`);

        } else if (level === 'intermediate') {
            const begMods = catModules['Beginner'] || [];
            if (begMods.length < 2) { notify('warning', 'Not enough beginner modules to assess.'); return; }
            const ids = begMods.slice(0, 2).map(m => m.id).join(',');
            go(`quiz.html?specificModules=${ids}&targetLevel=Intermediate&category=${catEncoded}`);

        } else {
            // Advanced — require beginner + intermediate
            const begMods = catModules['Beginner'] || [];
            const intMods = catModules['Intermediate'] || [];
            const ids = [...begMods.slice(0, 2), ...intMods.slice(0, 1)].map(m => m.id).join(',');
            if (!ids) { notify('warning', 'Assessment not available for this skill yet.'); return; }
            go(`quiz.html?specificModules=${ids}&targetLevel=Advanced&category=${catEncoded}`);
        }
    }

    function go(url) {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => { window.location.href = url; }, 300);
    }

    // ── 8. Edit / Delete ──────────────────────────────────
    ['beginner', 'intermediate', 'advanced'].forEach(level => {
        const ul = elLists[level];
        if (!ul) return;
        ul.addEventListener('click', async e => {
            const editBtn = e.target.closest('.edit-btn');
            const deleteBtn = e.target.closest('.delete-btn');
            if (!editBtn && !deleteBtn) return;
            e.stopPropagation();

            const idx = parseInt((editBtn || deleteBtn).dataset.index);
            const skillName = skillsData[activeCategory][level][idx];

            if (editBtn) {
                const val = typeof XyPrompt !== 'undefined'
                    ? await XyPrompt({ title: 'Edit Skill', placeholder: 'Skill name', defaultValue: skillName, confirmText: 'Save' })
                    : prompt('Edit skill:', skillName);
                if (val && val.trim()) {
                    skillsData[activeCategory][level][idx] = val.trim();
                    save(); renderSkills(elSearch ? elSearch.value.toLowerCase() : '');
                    if (typeof XySuccess !== 'undefined') XySuccess(`"${val.trim()}" updated.`);
                }
            } else {
                const ok = typeof XyConfirm !== 'undefined'
                    ? await XyConfirm({ title: 'Delete Skill?', message: `Remove "<strong>${skillName}</strong>"?`, confirmText: 'Delete', type: 'danger' })
                    : confirm(`Delete "${skillName}"?`);
                if (ok) {
                    skillsData[activeCategory][level].splice(idx, 1);
                    save(); renderSkills(elSearch ? elSearch.value.toLowerCase() : '');
                    renderCategories();
                    if (typeof XyWarning !== 'undefined') XyWarning(`"${skillName}" removed.`);
                }
            }
        });
    });

    // ── 9. Add Skill Buttons ──────────────────────────────
    document.querySelectorAll('.add-skill-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (!activeCategory) return;
            const level = btn.dataset.level;
            const val = typeof XyPrompt !== 'undefined'
                ? await XyPrompt({ title: `Add ${level.charAt(0).toUpperCase() + level.slice(1)} Skill`, message: `Category: <strong>${activeCategory}</strong>`, placeholder: 'e.g. TypeScript, Docker, Figma…', confirmText: 'Add Skill' })
                : prompt(`Add ${level} skill to ${activeCategory}:`);
            if (val && val.trim()) {
                if (!skillsData[activeCategory][level]) skillsData[activeCategory][level] = [];
                skillsData[activeCategory][level].push(val.trim());
                save(); renderSkills(elSearch ? elSearch.value.toLowerCase() : '');
                renderCategories();
                if (typeof XySuccess !== 'undefined') XySuccess(`"${val.trim()}" added!`);
            }
        });
    });

    // ── 10. Export ────────────────────────────────────────
    const exportBtn = document.getElementById('btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const blob = new Blob([JSON.stringify(skillsData, null, 2)], { type: 'application/json' });
            const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'xyverra-skills.json' });
            a.click(); URL.revokeObjectURL(a.href);
            if (typeof XySuccess !== 'undefined') XySuccess('Skills exported!');
        });
    }

    // ── Helper ────────────────────────────────────────────
    function notify(type, msg) {
        if (type === 'warning' && typeof XyWarning !== 'undefined') { XyWarning(msg); return; }
        alert(msg);
    }

    // ── 11. Boot ──────────────────────────────────────────
    renderCategories();

    // Auto-open last active category
    if (activeCategory && skillsData[activeCategory]) {
        if (elPathTitle) elPathTitle.textContent = activeCategory;
        openPanel();
    }
});
