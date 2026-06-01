/**
 * signup.js
 * Debugged and fixed version for Xyverra Signup Flow
 */

console.log("Signup.js loaded - Fixed Version");

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById('signup-form');
    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const togglePassword = document.getElementById('toggle-password');
    
    // Error message containers
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    // Password Toggle Logic
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // Helper: Show error
    const showError = (element, message, input) => {
        element.textContent = message;
        if (input) input.classList.add('input-error');
    };

    // Helper: Clear errors
    const clearErrors = () => {
        [nameError, emailError, passwordError].forEach(el => el.textContent = '');
        [nameInput, emailInput, passwordInput].forEach(el => el.classList.remove('input-error'));
    };

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            // 1. Prevent Default Behavior (STOPS PAGE REFRESH)
            e.preventDefault();
            
            // 2. Clear previous errors
            clearErrors();

            // 3. Gather Values
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            // 4. Client-side Validation
            let isValid = true;

            if (!name) {
                showError(nameError, "Full name is required", nameInput);
                isValid = false;
            }

            if (!email) {
                showError(emailError, "Email address is required", emailInput);
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                showError(emailError, "Please enter a valid email", emailInput);
                isValid = false;
            }

            if (!password) {
                showError(passwordError, "Password is required", passwordInput);
                isValid = false;
            } else if (password.length < 6) {
                showError(passwordError, "Password must be at least 6 characters", passwordInput);
                isValid = false;
            }

            if (!isValid) return;

            // 5. Show Loading State
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';

            try {
                // 6. API Request
                const apiUrl = 'http://localhost:5000/api/auth/register';
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Success!
                    console.log("Registration successful");
                    
                    // Save to localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('xyverra_user_name', data.user.name);
                    localStorage.setItem('xyverra_user_email', data.user.email);
                    
                    // Show success popup and redirect
                    if (window.showSuccessPopup) {
                        await window.showSuccessPopup("Account Created Successfully ✅");
                    }
                    window.location.href = 'path-selection.html';
                } else {
                    // Backend returned an error
                    console.warn("Registration failed:", data.message);
                    
                    // Specific handling for "user already exists"
                    if (data.message && data.message.toLowerCase().includes('exists')) {
                        showError(emailError, data.message, emailInput);
                    } else {
                        alert(data.message || 'Registration failed. Please try again.');
                    }
                }
            } catch (error) {
                console.error("Signup error:", error);
                
                // Fallback for demo/offline purposes if required by user
                // But the user asked for API issues fix, so we should prioritize real backend.
                // However, I'll keep a more robust error message.
                alert("Unable to connect to the server. Please ensure the backend is running at http://localhost:5000");
            } finally {
                // 7. Restore Button State (Only if not redirected)
                if (window.location.pathname.indexOf('path-selection.html') === -1) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                }
            }
        });
    } else {
        console.error("Signup form element not found!");
    }
});
