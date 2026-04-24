// Path Selection JS
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.grid-card');
    const continueBtn = document.querySelector('.btn-primary');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active from all
            cards.forEach(c => c.classList.remove('active'));
            // Add active to clicked
            card.classList.add('active');
            
            // Re-enable continue button (visually)
            continueBtn.style.opacity = '1';
            
            // Store selection in local state
            const title = card.querySelector('h4').innerText;
            localStorage.setItem('pathfinder_selected_path', title);
        });
    });

    continueBtn.addEventListener('click', (e) => {
        if(!localStorage.getItem('pathfinder_selected_path')) {
            e.preventDefault();
            alert("Please select a learning path to continue.");
        }
    });
});
