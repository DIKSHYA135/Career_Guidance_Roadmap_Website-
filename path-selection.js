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

            // Also immediately update the user specific storage
            const email = localStorage.getItem('xyverra_user_email');
            if (email) {
                const usersData = JSON.parse(localStorage.getItem('xyverra_users')) || {};
                if (!usersData[email]) usersData[email] = {};
                usersData[email].path = title;
                localStorage.setItem('xyverra_users', JSON.stringify(usersData));
            }
        });
    });

    // Continue button validation and saving to backend
    if (continueBtn) {
        continueBtn.addEventListener('click', async (e) => {
            e.preventDefault(); // Prevent immediate navigation

            const selectedPath = localStorage.getItem('xyverra_selected_path');
            const email = localStorage.getItem('xyverra_user_email');

            if (!selectedPath) {
                alert("Please select a learning path to continue.");
                return;
            }

            if (!email) {
                alert("User session not found. Please login again.");
                window.location.href = 'login.html';
                return;
            }

            try {
                // Show loading state if desired (optional)
                continueBtn.innerHTML = 'Saving... <i class="fas fa-spinner fa-spin"></i>';
                continueBtn.style.pointerEvents = 'none';

                // Send POST request to backend
                const response = await fetch('http://localhost:5000/api/user/save-path', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        selectedPath: selectedPath
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Path saved to MongoDB:", data.selectedPath);
                    // Navigate to next page after successful save
                    window.location.href = 'level-selection.html';
                } else {
                    alert(data.message || "Failed to save path.");
                    // Re-enable button
                    continueBtn.innerHTML = 'Continue <i class="fas fa-arrow-right"></i>';
                    continueBtn.style.pointerEvents = 'auto';
                }

            } catch (error) {
                console.error("Error saving path:", error);
                alert("Server connection error. Please try again later.");
                // Re-enable button
                continueBtn.innerHTML = 'Continue <i class="fas fa-arrow-right"></i>';
                continueBtn.style.pointerEvents = 'auto';
            }
        });
    }

});