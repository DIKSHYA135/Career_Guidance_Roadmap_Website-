// Path Selection JS
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.grid-card');
    const continueBtn = document.getElementById('path-continue-btn');

    // Restore previously selected path if user navigates back
    const savedPath = localStorage.getItem('xyverra_selected_path');
    if (savedPath) {
        cards.forEach(card => {
            if (card.querySelector('h4') && card.querySelector('h4').innerText === savedPath) {
                cards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                if (continueBtn) continueBtn.style.opacity = '1';
            }
        });
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active from all
            cards.forEach(c => c.classList.remove('active'));
            // Add active to clicked
            card.classList.add('active');
            
            // Re-enable continue button (visually)
            if (continueBtn) continueBtn.style.opacity = '1';
            
            // Store selection in local state
            const title = card.querySelector('h4').innerText;
            localStorage.setItem('xyverra_selected_path', title);
        });
    });

    if (continueBtn) {
        continueBtn.addEventListener('click', (e) => {
            if (!localStorage.getItem('xyverra_selected_path')) {
                e.preventDefault();
                alert("Please select a learning path to continue.");
            }
        });
    }
});
