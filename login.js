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
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            const loginBtn = document.getElementById('login-btn');

            if (emailInput && emailInput.value && passwordInput && passwordInput.value) {
                const email = emailInput.value;
                const password = passwordInput.value;

                // Disable button and show loading state
                const originalBtnContent = loginBtn.innerHTML;
                loginBtn.disabled = true;
                loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';

                try {
                    const response = await fetch('http://localhost:5000/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        // Store user data and token
                        localStorage.setItem('xyverra_token', data.token);
                        localStorage.setItem('xyverra_user_name', data.user.name);
                        localStorage.setItem('xyverra_user_email', data.user.email);
                        localStorage.setItem('xyverra_user_id', data.user.id);
                        
                        if (data.user.selectedPath) {
                            localStorage.setItem('xyverra_selected_path', data.user.selectedPath);
                        }

                        // If they already have a path selected, go to dashboard, else path selection
                        const path = data.user.selectedPath || localStorage.getItem('xyverra_selected_path');
                        window.location.href = path ? 'dashboard.html' : 'path-selection.html';
                    } else {
                        alert(data.message || 'Login failed. Please check your credentials.');
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    alert('Could not connect to the server. Please ensure the backend is running.');
                } finally {
                    loginBtn.disabled = false;
                    loginBtn.innerHTML = originalBtnContent;
                }
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
