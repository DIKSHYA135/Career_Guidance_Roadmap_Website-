document.addEventListener('DOMContentLoaded', () => {
    
    // Initial Mock Data Structure following the exact required schema
    const defaultSkills = [
        { name: 'HTML', category: 'Web Fundamentals', level: 'advanced', description: 'Semantic structure and accessibility best practices.', verified: true, proficiency: 95 },
        { name: 'CSS', category: 'Web Fundamentals', level: 'advanced', description: 'Layouts, animations, and responsive design systems.', verified: true, proficiency: 90 },
        { name: 'JavaScript', category: 'Programming', level: 'intermediate', description: 'ES6+ features, asynchronous programming, and DOM manipulation.', verified: false, proficiency: 65 },
        { name: 'React', category: 'Frontend', level: 'intermediate', description: 'Component-based architecture, hooks, and state management.', verified: false, proficiency: 60 },
        { name: 'Node.js', category: 'Backend', level: 'beginner', description: 'Server-side JavaScript environment and basic API development.', verified: false, proficiency: 25 },
        { name: 'Git', category: 'Tools', level: 'advanced', description: 'Version control, branching strategies, and collaboration.', verified: true, proficiency: 85 }
    ];

    // Load from localStorage or use defaults
    let skillsData = [];
    const storedSkills = localStorage.getItem('skills');
    
    if (storedSkills) {
        try {
            skillsData = JSON.parse(storedSkills);
        } catch (e) {
            console.error("Error parsing skills from localStorage", e);
            skillsData = defaultSkills;
        }
    } else {
        skillsData = defaultSkills;
        // Optionally store the default data to simulate a populated state
        localStorage.setItem('skills', JSON.stringify(skillsData));
    }

    const skillsContainer = document.getElementById('skills-container');
    
    // Error handling if container is not found
    if (!skillsContainer) {
        console.error("Error: Element with id 'skills-container' not found.");
        return;
    }

    // Optional UI elements for extended functionality
    const filterChipsContainer = document.getElementById('filter-chips');
    const searchInput = document.getElementById('skill-search');
    const totalSkillsEl = document.getElementById('total-skills-count');
    const verifiedSkillsEl = document.getElementById('verified-skills-count');

    let currentFilter = 'All';
    let searchQuery = '';

    // Function to calculate and update stats
    function updateStats() {
        if (!totalSkillsEl || !verifiedSkillsEl) return;
        const verifiedSkills = skillsData.filter(s => s.verified);
        totalSkillsEl.textContent = skillsData.length;
        verifiedSkillsEl.textContent = verifiedSkills.length;
    }

    // Function to render skills to the grid
    function renderSkills() {
        skillsContainer.innerHTML = '';

        // Filter logic
        let filteredSkills = skillsData.filter(skill => {
            // Match category
            let matchesFilter = false;
            if (currentFilter === 'All') {
                matchesFilter = true;
            } else {
                matchesFilter = (skill.category === currentFilter);
            }

            // Match search
            const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesFilter && matchesSearch;
        });

        // Generate DOM
        filteredSkills.forEach(skill => {
            const card = document.createElement('div');
            // CSS dynamic classes based on level
            const levelClass = skill.level.toLowerCase(); // 'beginner', 'intermediate', 'advanced'
            card.className = `skill-card ${levelClass}`;

            // Icons
            const verifiedIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
            const btnIconLevelUp = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
            const btnIconMax = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

            // Determine button state
            let btnHtml = '';
            if (skill.level.toLowerCase() === 'advanced') {
                btnHtml = `<button class="action-btn">${btnIconMax} Max Level</button>`;
            } else {
                btnHtml = `<button class="action-btn">${btnIconLevelUp} Level Up</button>`;
            }

            // Fallback for missing properties based on schema
            const proficiency = skill.proficiency || 0;
            const isVerified = skill.verified === true;
            const category = skill.category || 'Other';

            card.innerHTML = `
                <div class="skill-header">
                    <div class="title-group">
                        <h3 class="skill-title">${skill.name}</h3>
                        <span class="skill-category">${category}</span>
                    </div>
                    <div class="badge-container">
                        <span class="badge badge-${levelClass}">${skill.level}</span>
                        ${isVerified ? `<span class="badge badge-verified">${verifiedIcon} Verified</span>` : ''}
                    </div>
                </div>
                
                <p class="skill-description">${skill.description}</p>
                
                <div class="progress-wrapper">
                    <div class="progress-label">
                        <span>Proficiency</span>
                        <span>${proficiency}%</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" style="width: 0%" data-target-width="${proficiency}%"></div>
                    </div>
                </div>

                ${btnHtml}
            `;

            skillsContainer.appendChild(card);
        });

        // Trigger animations for progress bars via inline style JS
        setTimeout(() => {
            const progressFills = skillsContainer.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                fill.style.width = fill.getAttribute('data-target-width');
            });
        }, 50);

        updateStats();
    }

    // Event Listeners (if elements exist)
    if (filterChipsContainer) {
        filterChipsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('chip')) {
                // Remove active from all
                document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                // Add active to clicked
                e.target.classList.add('active');
                // Update filter & re-render
                currentFilter = e.target.getAttribute('data-filter');
                renderSkills();
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderSkills();
        });
    }

    // --- Dynamic Sidebar Active State ---
    // If a sidebar exists, highlight the "Skills" menu
    const navLinks = document.querySelectorAll('.nav-item, .sidebar a, nav a');
    navLinks.forEach(link => {
        // Remove active class from all first (optional, but good practice if coming from single page apps)
        link.classList.remove('active');
        
        // If the href contains skills.html, mark it active
        if (link.getAttribute('href') && link.getAttribute('href').includes('skills.html')) {
            link.classList.add('active');
        }
    });

    // Initial render
    renderSkills();
});
