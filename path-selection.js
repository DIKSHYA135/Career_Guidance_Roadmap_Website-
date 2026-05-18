// Path Selection JS
document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll('.grid-card');
    const continueBtn = document.getElementById('path-continue-btn');

    // Restore previously selected path
    const savedPath = localStorage.getItem('xyverra_selected_path');

    if (savedPath) {
        cards.forEach(card => {
            const titleElement = card.querySelector('h4');

            if (titleElement && titleElement.innerText === savedPath) {
                cards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                if (continueBtn) {
                    continueBtn.style.opacity = '1';
                }
            }
        });
    }

    // Card click event
    cards.forEach(card => {
        card.addEventListener('click', () => {

            // Remove active class from all cards
            cards.forEach(c => c.classList.remove('active'));

            // Add active class to clicked card
            card.classList.add('active');

            // Enable continue button visually
            if (continueBtn) {
                continueBtn.style.opacity = '1';
            }

            // Save selected path
            const title = card.querySelector('h4').innerText;
            localStorage.setItem('xyverra_selected_path', title);
        });
    });

    // Continue button validation
    if (continueBtn) {
        continueBtn.addEventListener('click', async (e) => {
            const selectedPath = localStorage.getItem('xyverra_selected_path');
            const email = localStorage.getItem('xyverra_user_email');

            if (!selectedPath) {
                e.preventDefault();
                alert("Please select a learning path to continue.");
                return;
            }

            if (email) {
                // Save to backend
                try {
                    const response = await fetch('http://localhost:5000/api/user/path', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, selectedPath })
                    });

                    if (response.ok) {
                        window.location.href = 'dashboard.html';
                    } else {
                        const data = await response.json();
                        console.error('Failed to save path:', data.message);
                        // Fallback to local redirection
                        window.location.href = 'dashboard.html';
                    }
                } catch (error) {
                    console.error('Error saving path:', error);
                    window.location.href = 'dashboard.html';
                }
            } else {
                window.location.href = 'dashboard.html';
            }
        });
    }

});