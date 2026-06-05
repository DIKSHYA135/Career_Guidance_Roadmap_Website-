document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('recommended-paths-grid');
    const continueBtn = document.getElementById('path-continue-btn');
    
    // Load recommended careers from localStorage
    const storedCareers = localStorage.getItem('xyverra_recommended_careers');
    let careers = [];
    
    if (storedCareers) {
        try {
            careers = JSON.parse(storedCareers);
        } catch(e) {
            console.error('Error parsing recommended careers', e);
        }
    }
    
    // Fallback if accessed directly without assessment
    if (careers.length === 0) {
        careers = [
            { id: 'web-developer', icon: '🌐', title: 'Web Developer', description: 'Build dynamic websites and web apps' },
            { id: 'data-scientist', icon: '📊', title: 'Data Scientist', description: 'Analyze data to drive business decisions' },
            { id: 'ui-ux-designer', icon: '🎨', title: 'UI/UX Designer', description: 'Design user-friendly interfaces' }
        ];
    }
    
    // Render the grid
    gridContainer.innerHTML = '';
    careers.forEach(c => {
        const card = document.createElement('div');
        card.className = 'grid-card';
        card.dataset.id = c.id;
        card.dataset.title = c.title;
        
        card.innerHTML = `
            <div class="icon" style="color: var(--primary); font-size: 2rem; margin-bottom: 1rem;">${c.icon || '💻'}</div>
            <div class="grid-card-content">
                <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem;">${c.title}</h4>
                <p style="font-size: 0.9rem; color: var(--text-body);">${c.description || 'Recommended Career Path'}</p>
            </div>
        `;
        
        card.addEventListener('click', () => {
            // Remove active from all
            document.querySelectorAll('.grid-card').forEach(el => el.classList.remove('active'));
            card.classList.add('active');
            
            // Enable button
            continueBtn.disabled = false;
            
            // Save selected path locally
            localStorage.setItem('xyverra_selected_path', c.title);
            localStorage.setItem('xyverra_target_career', c.title);
            localStorage.setItem('xyverra_selected_career_detail', c.id);
        });
        
        gridContainer.appendChild(card);
    });
    
    // Continue button
    continueBtn.addEventListener('click', () => {
        const selected = document.querySelector('.grid-card.active');
        if (!selected) return;
        
        window.location.href = 'career-details.html';
    });
});