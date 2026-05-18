// Signup JS
document.addEventListener("DOMContentLoaded", () => {
    // ── Password visibility toggle ──
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('signup-password');
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const isText = passwordInput.type === 'text';
            passwordInput.type = isText ? 'password' : 'text';
            toggleBtn.className = isText
                ? 'far fa-eye eye-icon'
                : 'far fa-eye-slash eye-icon';
        });
    }

    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('signup-name');
            const emailInput = document.getElementById('signup-email');
            const passwordInput = document.getElementById('signup-password');
            const signupBtn = form.querySelector('button[type="submit"]');

            if (nameInput && nameInput.value && emailInput && emailInput.value && passwordInput && passwordInput.value) {
                const name = nameInput.value;
                const email = emailInput.value;
                const password = passwordInput.value;

                // Disable button and show loading state
                const originalBtnContent = signupBtn.innerHTML;
                signupBtn.disabled = true;
                signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';

                try {
                    const response = await fetch('http://localhost:5000/api/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, email, password })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        // Store user data and token (immediate login)
                        localStorage.setItem('xyverra_token', data.token);
                        localStorage.setItem('xyverra_user_name', data.user.name);
                        localStorage.setItem('xyverra_user_email', data.user.email);
                        localStorage.setItem('xyverra_user_id', data.user.id);
                        
                        alert('Account created successfully! Welcome to Xyverra.');
                        window.location.href = 'path-selection.html';
                    } else {
                        alert(data.message || 'Signup failed. Please try again.');
                    }
                } catch (error) {
                    console.error('Signup error:', error);
                    alert('Could not connect to the server. Please ensure the backend is running.');
                } finally {
                    signupBtn.disabled = false;
                    signupBtn.innerHTML = originalBtnContent;
                }
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
