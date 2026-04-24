// Level Selection JS
document.addEventListener("DOMContentLoaded", () => {
    // Attempt to load selected path to display
    const selectedPath = localStorage.getItem('pathfinder_selected_path');
    if(selectedPath) {
        document.querySelector('.selection-context span').textContent = selectedPath;
    }

    const cards = document.querySelectorAll('.level-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const levelStr = card.querySelector('h4').textContent;
            localStorage.setItem('pathfinder_selected_level', levelStr);
        });
    });
});
