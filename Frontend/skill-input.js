document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Calculate Score from Assessment
    let score = 0;
    const assessmentData = localStorage.getItem('xyverra_career_assessment');
    
    if (assessmentData) {
        try {
            const answers = JSON.parse(assessmentData);
            // Simple deterministic scoring based on answer choices
            // 'a' = 20, 'b' = 15, 'c' = 10, 'd' = 5, etc.
            let total = 0;
            let count = 0;
            for (const key in answers) {
                const val = answers[key].toLowerCase();
                if (val === 'a') total += 20;
                else if (val === 'b') total += 15;
                else if (val === 'c') total += 10;
                else if (val === 'd') total += 5;
                else total += 10; // Default
                count++;
            }
            
            // Normalize to 100
            score = count > 0 ? Math.round((total / (count * 20)) * 100) : 50;
            
        } catch(e) {
            score = 45; // fallback
        }
    } else {
        // Fallback if accessed directly
        score = Math.floor(Math.random() * 100); 
    }
    
    // 2. Determine Level based on Score (User Req: 0-25 Beginner, 26-50 Intermediate, 51-75 Advanced, 76-100 Capstone)
    let assignedLevel = '';
    let levelDesc = '';
    let icon = '';
    
    if (score <= 25) {
        assignedLevel = 'Beginner';
        levelDesc = 'You are starting fresh! We will build your foundation from the ground up.';
        icon = '🌱';
    } else if (score <= 50) {
        assignedLevel = 'Intermediate';
        levelDesc = 'You have some basics down. We will focus on practical application and expanding your toolkit.';
        icon = '⚡';
    } else if (score <= 75) {
        assignedLevel = 'Advanced';
        levelDesc = 'You have strong experience. We will dive deep into system architecture and optimization.';
        icon = '🚀';
    } else {
        assignedLevel = 'Capstone';
        levelDesc = 'You are highly proficient! You will proceed directly to building end-to-end projects.';
        icon = '👑';
    }
    
    // 3. Update UI
    document.getElementById('assessment-score').textContent = score;
    document.getElementById('assigned-level-title').textContent = assignedLevel;
    document.getElementById('assigned-level-desc').textContent = levelDesc;
    document.getElementById('level-icon').textContent = icon;
    
    // 4. Save assigned level
    localStorage.setItem('userLevel', assignedLevel);
    
    // 5. Generate Button Logic
    document.getElementById('generate-btn').addEventListener('click', async (e) => {
        const btn = e.currentTarget;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        btn.disabled = true;
        
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
