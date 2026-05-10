// Signup JS
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('auth-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('signup-name');
            if (nameInput && nameInput.value) {
                localStorage.setItem('xyverra_user_name', nameInput.value);
                window.location.href = 'path-selection.html';
            }
        });
    }

    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert("This feature is a mock in the frontend prototype.");
        });
    });
});
