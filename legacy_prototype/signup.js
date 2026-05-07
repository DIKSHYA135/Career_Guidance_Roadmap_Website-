// Signup JS
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('signup-name');
        if (nameInput && nameInput.value.trim()) {
            localStorage.setItem('xyverra_user_name', nameInput.value.trim());
        }
        window.location.href = form.action;
    });
});
