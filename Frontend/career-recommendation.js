/* =========================================================
   career-recommendation.js
   Dynamic career cards with premium visual rendering
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const careers = [
        {
            id: 'ai-engineer',
            rank: 1,
            icon: '🤖',
            title: 'AI Engineer',
            match: 94,
            description: 'Design, train, and deploy AI/ML models that power intelligent applications. From NLP to computer vision, AI Engineers build the systems that make products smarter.',
            salary: '$120k – $185k',
            demand: 'Very High',
            demandClass: 'demand-vhigh',
            time: '9–14 months',
            skills: ['Python', 'TensorFlow', 'Machine Learning', 'Deep Learning', 'Docker']
        },
        {
            id: 'data-scientist',
            rank: 2,
            icon: '📊',
            title: 'Data Scientist',
            match: 88,
            description: 'Extract patterns and insights from complex data to drive strategic decisions. Data Scientists bridge the gap between raw information and actionable business intelligence.',
            salary: '$110k – $165k',
            demand: 'High',
            demandClass: 'demand-high',
            time: '8–12 months',
            skills: ['Python', 'SQL', 'Statistics', 'Tableau', 'Pandas']
        },
        {
            id: 'ui-ux-designer',
            rank: 3,
            icon: '🎨',
            title: 'UI/UX Designer',
            match: 76,
            description: 'Create beautiful, intuitive digital experiences. UI/UX Designers combine user psychology, visual design, and prototyping to shape how people interact with products.',
            salary: '$85k – $135k',
            demand: 'High',
            demandClass: 'demand-high',
            time: '6–9 months',
            skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'CSS/HTML']
        }
    ];

    const container = document.getElementById('recommendations-list');

    careers.forEach((c, i) => {
        const card = document.createElement('div');
        card.className = `recommendation-card rank-${c.rank}`;
        card.innerHTML = `
            <div class="rank-ribbon"></div>
            <div class="rec-info">
                <div class="rec-header">
                    <div class="rec-icon">${c.icon}</div>
                    <div class="rec-title-block">
                        <h2>${c.title}</h2>
                        <span class="match-badge"><i class="fas fa-check-circle"></i> ${c.match}% Match</span>
                    </div>
                </div>
                <p class="rec-desc">${c.description}</p>
                <div class="rec-stats">
                    <div class="stat-item">
                        <div class="stat-label">Est. Salary</div>
                        <div class="stat-value">${c.salary}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Industry Demand</div>
                        <div class="stat-value ${c.demandClass}">${c.demand}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Time to Job-Ready</div>
                        <div class="stat-value">${c.time}</div>
                    </div>
                </div>
                <div class="rec-skill-chips">
                    ${c.skills.map(s => `<span class="chip">${s}</span>`).join('')}
                </div>
            </div>
            <div class="rec-actions">
                <button class="btn btn-primary view-details-btn" data-id="${c.id}">
                    View Details <i class="fas fa-arrow-right"></i>
                </button>
                <label class="compare-toggle-label" id="compare-label-${c.id}">
                    <input type="checkbox" class="compare-checkbox" value="${c.id}"> Compare
                </label>
            </div>
        `;
        container.appendChild(card);
    });

    // Style checkbox label when checked
    document.querySelectorAll('.compare-checkbox').forEach(cb => {
        cb.addEventListener('change', () => {
            const label = cb.closest('.compare-toggle-label');
            label.classList.toggle('checked', cb.checked);
        });
    });

    // Save to local storage for the next page
    localStorage.setItem('xyverra_recommended_careers', JSON.stringify(careers));

    // View details (now just an option, but the main flow goes to Path Selection)
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.setItem('xyverra_selected_career_detail', btn.getAttribute('data-id'));
            window.location.href = 'career-details.html';
        });
    });
    
    // Add Continue to Path Selection button at the bottom
    const actionsContainer = document.createElement('div');
    actionsContainer.style.textAlign = 'center';
    actionsContainer.style.marginTop = '3rem';
    actionsContainer.innerHTML = `
        <button id="continue-path-selection" class="btn btn-primary" style="padding: 16px 36px; font-size: 1.15rem;">
            Proceed to Path Selection <i class="fas fa-arrow-right"></i>
        </button>
    `;
    container.after(actionsContainer);

    document.getElementById('continue-path-selection').addEventListener('click', () => {
        window.location.href = 'path-selection.html';
    });

    // Compare
    document.getElementById('compare-btn').addEventListener('click', () => {
        const checked = [...document.querySelectorAll('.compare-checkbox:checked')];
        if (checked.length < 2) {
            alert('Please select at least 2 careers to compare using the checkboxes.');
            return;
        }
        if (checked.length > 3) {
            alert('Please select at most 3 careers to compare.');
            return;
        }
        localStorage.setItem('xyverra_compare_careers', JSON.stringify(checked.map(cb => cb.value)));
        window.location.href = 'career-comparison.html';
    });
});
