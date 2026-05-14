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
        continueBtn.addEventListener('click', (e) => {

            if (!localStorage.getItem('xyverra_selected_path')) {
                e.preventDefault();
                alert("Please select a learning path to continue.");
            }
        });
    }

});