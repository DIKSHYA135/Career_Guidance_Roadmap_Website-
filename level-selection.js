// Level Selection JS
document.addEventListener("DOMContentLoaded", () => {
    // Load selected path from localStorage to display in context label
    const selectedPath = localStorage.getItem('xyverra_selected_path');
    const pathLabel = document.getElementById('selected-path-label');
    if (selectedPath && pathLabel) {
        pathLabel.textContent = selectedPath;
    }

    // Restore previously saved level selection if user navigates back
    const savedLevel = localStorage.getItem('userLevel');

    const cards = document.querySelectorAll('.level-card');
    cards.forEach(card => {
        // Restore active state from localStorage
        if (savedLevel && card.getAttribute('data-level') === savedLevel) {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        }

        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            const level = card.getAttribute('data-level');
            // Save with key 'userLevel' — must match skill-input.js which reads this same key
            localStorage.setItem('userLevel', level);
            // Also save human-readable string for display in sidebar/dashboard
            localStorage.setItem('xyverra_selected_level', card.querySelector('h4').textContent);
        });
    });

    // Set initial localStorage if not already set (first time arriving)
    if (!localStorage.getItem('userLevel')) {
        localStorage.setItem('userLevel', 'Beginner');
        localStorage.setItem('xyverra_selected_level', 'I am a Beginner');
    }

    const continueBtn = document.getElementById('level-continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'skill-input.html';
        });
    }
});

