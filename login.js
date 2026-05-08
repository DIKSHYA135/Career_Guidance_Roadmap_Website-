// Login JS
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        const emailInput = document.getElementById('login-email');
        if (emailInput && emailInput.value) {
            const email = emailInput.value;
            const inferredName = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
            const capitalizedName = inferredName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            localStorage.setItem('xyverra_user_name', capitalizedName);
        }
    });
});
