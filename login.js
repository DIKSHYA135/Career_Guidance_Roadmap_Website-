// Login JS
document.addEventListener("DOMContentLoaded", () => {

    // ── Password visibility toggle ──
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('login-password');
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const isText = passwordInput.type === 'text';
            passwordInput.type = isText ? 'password' : 'text';
            toggleBtn.className = isText
                ? 'far fa-eye eye-icon'
                : 'far fa-eye-slash eye-icon';
        });
    }

    // ── Form submit ──
    const form = document.getElementById('auth-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('login-email');
            if (emailInput && emailInput.value) {
                const email = emailInput.value;
                const inferredName = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
                const capitalizedName = inferredName
                    .split(' ')
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ');
                localStorage.setItem('xyverra_user_name', capitalizedName);

                // If they already have a path selected, go to dashboard, else path selection
                const path = localStorage.getItem('xyverra_selected_path');
                window.location.href = path ? 'dashboard.html' : 'path-selection.html';
            }
        });
    }

    // ── Block # links (mock prototype) ──
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert("This feature is a mock in the frontend prototype.");
        });
    });
});
