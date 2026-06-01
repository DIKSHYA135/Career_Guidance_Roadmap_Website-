document.addEventListener("DOMContentLoaded", () => {
    // --- Password visibility toggle ---
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('login-password');
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const isText = passwordInput.type === 'text';
            passwordInput.type = isText ? 'password' : 'text';
            toggleBtn.className = isText ? 'far fa-eye eye-icon' : 'far fa-eye-slash eye-icon';
        });
    }

    // --- Form submit ---
    const form = document.getElementById('auth-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');

            if (!emailInput.value || !passwordInput.value) {
                alert("Please enter both email and password.");
                return;
            }

            const email = emailInput.value;
            const password = passwordInput.value;

            try {
                // Change cursor to wait
                document.body.style.cursor = 'wait';

                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                document.body.style.cursor = 'default';

                if (response.ok) {
                    // Success!
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('xyverra_user_name', data.user.name);
                    localStorage.setItem('xyverra_user_email', data.user.email);
                    
                    // Check if user already has a path
                    if (data.user.selectedPath) {
                        localStorage.setItem('xyverra_selected_path', data.user.selectedPath);
                        window.location.href = 'dashboard.html';
                    } else {
                        window.location.href = 'path-selection.html';
                    }
                } else {
                    // Server returned error (e.g. 401 Invalid credentials)
                    alert(data.message || 'Login failed');
                }
            } catch (error) {
                document.body.style.cursor = 'default';
                console.error("Login Fetch Error:", error);
                alert('Server connection error. Please ensure the backend is running.');
            }
        });
    }
});
