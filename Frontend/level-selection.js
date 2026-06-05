/**
 * level-selection.js
 * Fixed version for Xyverra Level Selection Flow
 */

console.log("Level-selection.js loaded - Fixed Version");

document.addEventListener("DOMContentLoaded", () => {
    // 1. Elements
    const cards = document.querySelectorAll('.level-card');
    const continueBtn = document.getElementById('level-continue-btn');
    const pathLabel = document.getElementById('selected-path-label');

    // 2. Load selected path from localStorage
    const selectedPath = localStorage.getItem('xyverra_selected_path');
    if (selectedPath && pathLabel) {
        pathLabel.textContent = selectedPath;
    }

    // 3. Helper: Set Active Card
    const setActiveCard = (level) => {
        cards.forEach(card => {
            if (card.getAttribute('data-level') === level) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    };

    // 4. Initial State Setup
    let currentLevel = localStorage.getItem('userLevel') || 'Beginner';
    setActiveCard(currentLevel);
    
    // Ensure initial values are in localStorage
    if (!localStorage.getItem('userLevel')) {
        localStorage.setItem('userLevel', 'Beginner');
        localStorage.setItem('xyverra_selected_level', 'Beginner');
    }

    // 5. Card Click Event Listeners
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const level = card.getAttribute('data-level');
            currentLevel = level;
            
            // UI Update
            setActiveCard(level);
            
            // Save to localStorage
            localStorage.setItem('userLevel', level);
            localStorage.setItem('xyverra_selected_level', level);
            
            console.log("Selected level:", level);
        });
    });

    // 6. Continue Button Logic
    if (continueBtn) {
        continueBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const token = localStorage.getItem('token');
            const level = localStorage.getItem('userLevel');

            // If not logged in, we might be in a local-only session
            if (!token) {
                console.warn("No auth token found, proceeding with local storage only.");
                window.location.href = 'skill-input.html';
                return;
            }

            try {
                // Show Loading State
                const originalHTML = continueBtn.innerHTML;
                continueBtn.innerHTML = 'Saving... <i class="fas fa-spinner fa-spin"></i>';
                continueBtn.classList.add('btn-disabled');
                continueBtn.style.pointerEvents = 'none';

                // API Request to save level
                const response = await fetch('http://localhost:5000/api/user/save-level', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ selectedLevel: level })
                });

                const data = await response.json();
                
                let nextUrl = level === 'Beginner' ? 'dashboard.html' : 'skill-input.html';

                if (response.ok) {
                    console.log('Level saved to backend successfully');
                    
                    // Save last active page
                    try {
                        await fetch('http://localhost:5000/api/user/save-page', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ lastActivePage: nextUrl })
                        });
                    } catch (err) {
                        console.error("Failed to save page state", err);
                    }

                    window.location.href = nextUrl;
                } else {
                    console.error('Failed to save level:', data.message);
                    alert('Error saving level: ' + (data.message || 'Unknown error'));
                    
                    continueBtn.innerHTML = originalHTML;
                    continueBtn.classList.remove('btn-disabled');
                    continueBtn.style.pointerEvents = 'auto';
                }
            } catch (error) {
                console.error('Network error while saving level:', error);
                
                let nextUrl = level === 'Beginner' ? 'dashboard.html' : 'skill-input.html';
                console.log("Proceeding to next page despite server error (Fallback)");
                window.location.href = nextUrl;
            }
        });
    }
});
