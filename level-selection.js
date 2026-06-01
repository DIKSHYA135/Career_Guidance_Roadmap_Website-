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

    // ── Handle Continue Button Click ──
    const continueBtn = document.getElementById('level-continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', async (e) => {
            e.preventDefault(); // Stop default navigation to handle fetch first

            const selectedLevel = localStorage.getItem('userLevel');
            const email = localStorage.getItem('xyverra_user_email');

            if (!email) {
                alert('User email not found. Please log in again.');
                window.location.href = 'login.html';
                return;
            }

            try {
                // Change button state
                continueBtn.innerHTML = 'Saving... <i class="fas fa-spinner fa-spin"></i>';
                continueBtn.style.pointerEvents = 'none';

                const response = await fetch('http://localhost:5000/api/user/save-level', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        selectedLevel: selectedLevel
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Level saved to MongoDB:', data.selectedLevel);
                    // Proceed to next page
                    window.location.href = 'skill-input.html';
                } else {
                    alert('Error saving level: ' + (data.message || 'Unknown error'));
                    // Reset button
                    continueBtn.innerHTML = 'Continue <i class="fas fa-arrow-right"></i>';
                    continueBtn.style.pointerEvents = 'auto';
                }
            } catch (error) {
                console.error('Fetch error:', error);
                alert('Could not connect to server. Make sure backend is running and returns JSON.');
                // Reset button
                continueBtn.innerHTML = 'Continue <i class="fas fa-arrow-right"></i>';
                continueBtn.style.pointerEvents = 'auto';
            }
    const continueBtn = document.getElementById('level-continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'skill-input.html';
        });
    }
});

