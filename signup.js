// Signup JS
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        const nameInput = document.getElementById('signup-name');
        if (nameInput && nameInput.value) {
            localStorage.setItem('xyverra_user_name', nameInput.value);
        }
    });
});
