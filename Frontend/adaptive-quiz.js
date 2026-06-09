/* =========================================================
   adaptive-quiz.js
   Hooks into the existing quiz UI to simulate an adaptive difficulty engine.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    let currentLevel = 1; // 1: Beginner, 2: Intermediate, 3: Advanced
    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    
    const updateBadge = (levelIndex) => {
        const badge = document.getElementById('adaptive-difficulty-badge');
        if (badge) {
            badge.innerHTML = `<i class="fas fa-brain" style="margin-right: 4px;"></i> Level: ${levels[levelIndex]}`;
            // Adjust color based on difficulty
            if (levelIndex === 0) badge.style.background = 'linear-gradient(135deg, #10B981, #34D399)'; // Green
            else if (levelIndex === 1) badge.style.background = 'linear-gradient(135deg, #F59E0B, #FBBF24)'; // Orange
            else badge.style.background = 'linear-gradient(135deg, #EF4444, #F87171)'; // Red
        }
    };

    // Initial state
    setTimeout(() => {
        updateBadge(0); // Start beginner
    }, 500);

    // Mutation observer to detect when an option is clicked and marked correct/wrong by quiz.js
    const optionsContainer = document.getElementById('quiz-options-container');
    if (optionsContainer) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    // Only react when a class 'correct' or 'wrong' is added
                    if (target.classList.contains('correct') || target.classList.contains('wrong')) {
                        // Ensure we only process this once per question
                        if (!target.dataset.adaptiveProcessed) {
                            target.dataset.adaptiveProcessed = 'true';
                            
                            // Adaptive logic
                            if (target.classList.contains('correct')) {
                                // Correct -> Increase difficulty
                                if (currentLevel < 2) currentLevel++;
                            } else if (target.classList.contains('wrong')) {
                                // Wrong -> Decrease difficulty
                                if (currentLevel > 0) currentLevel--;
                            }
                            
                            // Wait for next question to update badge
                            const nextBtn = document.getElementById('btn-next-question');
                            if (nextBtn) {
                                const onNext = () => {
                                    updateBadge(currentLevel);
                                    nextBtn.removeEventListener('click', onNext);
                                };
                                nextBtn.addEventListener('click', onNext);
                            }
                        }
                    }
                }
            });
        });
        
        observer.observe(optionsContainer, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }
});
