// Login JS
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const emailInput = document.getElementById('login-email');
        if (emailInput && emailInput.value.trim()) {
            const email = emailInput.value.trim();
            const namePart = email.split('@')[0];
            const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
            localStorage.setItem('xyverra_user_name', name);
        }
        window.location.href = form.action || 'roadmap.html';
    });
});
