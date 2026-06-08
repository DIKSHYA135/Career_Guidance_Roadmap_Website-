document.addEventListener('DOMContentLoaded', () => {
    let assignedLevel = '';
    const generateBtn = document.getElementById('generate-btn');
    const levelCards = document.querySelectorAll('.level-card');

    // Handle level card clicks
    levelCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active from all cards
            levelCards.forEach(c => c.classList.remove('active'));
            // Add active to clicked card
            card.classList.add('active');
            
            // Set the level and enable button
            assignedLevel = card.getAttribute('data-level');
            generateBtn.disabled = false;
        });
    });

    // Generate Button Logic
    generateBtn.addEventListener('click', async (e) => {
        const btn = e.currentTarget;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        btn.disabled = true;
        
        // Save the chosen level locally
        localStorage.setItem('userLevel', assignedLevel);

        // Ensure selected_path is set (fallback to target career)
        const targetCareer = localStorage.getItem('xyverra_target_career') || 'Web Developer';
        let finalPath = localStorage.getItem('xyverra_selected_path');
        if (!finalPath) {
            finalPath = targetCareer;
            localStorage.setItem('xyverra_selected_path', targetCareer);
        }

        // Save completion to backend
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await fetch('http://localhost:5000/api/user/save-onboarding', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        interests: [finalPath],
                        skills: [], // Can be filled in profile later
                        selectedLevel: assignedLevel,
                        careerGoal: `Master ${finalPath}`,
                        timeline: '6 months', // default placeholder
                        weeklyHours: '10' // default placeholder
                    })
                });
            } catch (err) {
                console.warn('Could not reach backend, onboarding saved locally only.', err);
            }
        }
        
        localStorage.setItem('xyverra_onboarded', 'true');

        // Delay slightly for effect
        setTimeout(() => {
            window.location.href = 'roadmap.html';
        }, 800);
    });
});
