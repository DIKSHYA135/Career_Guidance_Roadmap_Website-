/* ==========================================================
   skills.js — Skill Inventory (fully path-driven)
   TODO: Replace PATH_SKILLS lookup with GET /api/skills/:path
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Read selected career path ──────────────────────
    // TODO: GET /api/user/me → { selectedPath }
    const selectedPath = localStorage.getItem('xyverra_selected_path') || 'Web Development';

    // Get path skills from the global PATH_SKILLS (loaded from app-data.js)
    const pathSkills = (typeof PATH_SKILLS !== 'undefined' && PATH_SKILLS[selectedPath])
        ? PATH_SKILLS[selectedPath]
        : PATH_SKILLS['Web Development'];

    // Merge with any user-overridden proficiency/verified data from localStorage
    // TODO: GET /api/user/skills → [{ name, proficiency, verified }]
    let userOverrides = {};
    try {
        const raw = localStorage.getItem('user_skill_overrides');
        if (raw) userOverrides = JSON.parse(raw);
    } catch { /* ignore */ }

    let skillsData = pathSkills.map(skill => ({
        ...skill,
        proficiency: userOverrides[skill.name]?.proficiency ?? skill.proficiency,
        verified:    userOverrides[skill.name]?.verified    ?? skill.verified,
        level:       userOverrides[skill.name]?.level       ?? skill.level,
    }));

    // ── 2. UI Elements ────────────────────────────────────
    const skillsContainer    = document.getElementById('skills-container');
    const filterChips        = document.getElementById('filter-chips');
    const searchInput        = document.getElementById('skill-search');
    const totalSkillsEl      = document.getElementById('total-skills-count');
    const verifiedSkillsEl   = document.getElementById('verified-skills-count');
    const avgProficiencyEl   = document.getElementById('avg-proficiency');
    const pathTitleEl        = document.getElementById('skills-path-title');

    if (!skillsContainer) return;

    // Show selected path name in header
    if (pathTitleEl) pathTitleEl.textContent = selectedPath;

    // ── 3. Build dynamic filter chips from categories ─────
    if (filterChips) {
        const cats = [...new Set(skillsData.map(s => s.category))];
        filterChips.innerHTML = `<button class="chip active" data-filter="All">All</button>`;
        cats.forEach(cat => {
            filterChips.innerHTML += `<button class="chip" data-filter="${cat}">${cat}</button>`;
        });
        filterChips.addEventListener('click', e => {
            const chip = e.target.closest('.chip');
            if (!chip) return;
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.dataset.filter;
            renderSkills();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            renderSkills();
        });
    }

    let currentFilter = 'All';
    let searchQuery   = '';

    // ── 4. Stats ──────────────────────────────────────────
    function updateStats() {
        const verified  = skillsData.filter(s => s.verified).length;
        const avgProf   = skillsData.length
            ? Math.round(skillsData.reduce((sum, s) => sum + (s.proficiency || 0), 0) / skillsData.length)
            : 0;
        if (totalSkillsEl)    totalSkillsEl.textContent    = skillsData.length;
        if (verifiedSkillsEl) verifiedSkillsEl.textContent = verified;
        if (avgProficiencyEl) avgProficiencyEl.textContent = `${avgProf}%`;
    }

    // ── 5. Render ─────────────────────────────────────────
    function renderSkills() {
        const filtered = skillsData.filter(skill => {
            const matchCat    = currentFilter === 'All' || skill.category === currentFilter;
            const matchSearch = skill.name.toLowerCase().includes(searchQuery)
                             || skill.category.toLowerCase().includes(searchQuery);
            return matchCat && matchSearch;
        });

        if (filtered.length === 0) {
            skillsContainer.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);">
                    <i class="fas fa-search" style="font-size:2rem;margin-bottom:1rem;display:block;opacity:0.4;"></i>
                    No skills match your search.
                </div>`;
            return;
        }

        skillsContainer.innerHTML = '';
        filtered.forEach(skill => {
            const lvl   = skill.level?.toLowerCase() || 'beginner';
            const prof  = skill.proficiency || 0;
            const card  = document.createElement('div');
            card.className = `skill-card ${lvl}`;

            const badgeMap = { beginner: 'badge-beginner', intermediate: 'badge-intermediate', advanced: 'badge-advanced' };

            card.innerHTML = `
                <div class="skill-header">
                    <div class="title-group">
                        <h3 class="skill-title">${skill.name}</h3>
                        <span class="skill-category">${skill.category}</span>
                    </div>
                    <div class="badge-container">
                        <span class="badge ${badgeMap[lvl] || 'badge-beginner'}">${skill.level}</span>
                        ${skill.verified ? `<span class="badge badge-verified"><i class="fas fa-check" style="font-size:0.6rem;"></i> Verified</span>` : ''}
                    </div>
                </div>

                <p class="skill-description">${skill.description}</p>

                <div class="progress-wrapper">
                    <div class="progress-label">
                        <span>Proficiency</span>
                        <span>${prof}%</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" style="width:0%" data-target="${prof}%"></div>
                    </div>
                </div>

                <a href="${skill.courseUrl}" target="_blank" rel="noopener" class="action-btn skill-course-btn">
                    <i class="fas fa-external-link-alt"></i> ${skill.courseName}
                </a>
            `;
            skillsContainer.appendChild(card);
        });

        // Animate progress bars
        requestAnimationFrame(() => requestAnimationFrame(() => {
            skillsContainer.querySelectorAll('.progress-fill').forEach(el => {
                el.style.width = el.dataset.target;
            });
        }));

        updateStats();
    }

    renderSkills();

    // ── 6. Add Skill button (opens quiz for current module) ─
    const addSkillBtn = document.getElementById('btn-add-skill');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', () => {
            window.location.href = 'skill-input.html';
        });
    }
});
