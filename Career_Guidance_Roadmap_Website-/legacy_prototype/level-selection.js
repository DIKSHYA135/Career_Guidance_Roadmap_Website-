// Level Selection JS
document.addEventListener("DOMContentLoaded", () => {
    // Attempt to load selected path to display
    const selectedPath = localStorage.getItem('Xyverra_selected_path');
    const selectedIcon = localStorage.getItem('Xyverra_selected_icon');
    const selectedColor = localStorage.getItem('Xyverra_selected_icon_color');
    
    if(selectedPath) {
        const titleEl = document.getElementById('dynamic-title');
        if(titleEl) titleEl.textContent = selectedPath;
    }
    
    if(selectedIcon) {
        const iconEl = document.getElementById('dynamic-icon-container');
        if(iconEl) {
            iconEl.innerHTML = selectedIcon;
            if(selectedColor) iconEl.style.color = selectedColor;
        }
    }

    const cards = document.querySelectorAll('.level-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const levelStr = card.querySelector('h4').textContent;
            localStorage.setItem('Xyverra_selected_level', levelStr);
        });
    });
});
