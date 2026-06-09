document.addEventListener("DOMContentLoaded", () => {
    // ── Elements ──
    const form = document.getElementById("auth-form");
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");
    const submitBtn = document.getElementById("login-btn");
    const btnLabel = document.getElementById("btn-label");
    const toggleBtn = document.getElementById("toggle-password");
    
    // Error elements
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const generalErrorCard = document.getElementById("login-general-error");
    const generalErrorText = document.getElementById("login-error-text");

    // ── Toast Helper Removed (Using XyModal globally) ──

    // ── Error Helpers ──
    const showFieldError = (input, errorDiv, message) => {
        input.classList.remove('input-field-success');
        input.classList.add('input-field-error');
        errorDiv.textContent = message;
        errorDiv.classList.add('visible');
    };

    const clearFieldError = (input, errorDiv) => {
        input.classList.remove('input-field-error');
        errorDiv.classList.remove('visible');
    };

    const setFieldSuccess = (input, errorDiv) => {
        clearFieldError(input, errorDiv);
        if (input.value.trim() !== '') {
            input.classList.add('input-field-success');
        }
    };

    const showGeneralError = (message) => {
        window.XyError('Login Error', message);
    };

    const hideGeneralError = () => {
        generalErrorCard.classList.remove('visible');
    };

    // ── Password visibility toggle ──
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener("click", () => {
            const isText = passwordInput.type === "text";
            passwordInput.type = isText ? "password" : "text";
            toggleBtn.className = isText ? "far fa-eye eye-icon" : "far fa-eye-slash eye-icon";
        });
    }

    // ── Real-time Validation ──
    emailInput.addEventListener('input', () => {
        hideGeneralError();
        clearFieldError(emailInput, emailError);
        emailInput.classList.remove('input-field-success');
    });

    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email === '') return;
        if (/\S+@\S+\.\S+/.test(email)) {
            setFieldSuccess(emailInput, emailError);
        } else {
            showFieldError(emailInput, emailError, 'Please enter a valid email address');
        }
    });

    passwordInput.addEventListener('input', () => {
        hideGeneralError();
        clearFieldError(passwordInput, passwordError);
        passwordInput.classList.remove('input-field-success');
    });

    passwordInput.addEventListener('blur', () => {
        if (passwordInput.value !== '') {
            setFieldSuccess(passwordInput, passwordError);
        }
    });

    // ── Form Submit ──
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        hideGeneralError();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        let hasError = false;

        if (!email) {
            showFieldError(emailInput, emailError, 'Email is required');
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            showFieldError(emailInput, emailError, 'Valid email required');
            hasError = true;
        }

        if (!password) {
            showFieldError(passwordInput, passwordError, 'Password is required');
            hasError = true;
        }

        if (hasError) return;

        try {
            document.body.style.cursor = "wait";

            if (submitBtn) {
                submitBtn.disabled = true;
                btnLabel.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i> Signing In...';
                submitBtn.querySelector('i.fa-arrow-right').style.display = 'none';
            }

            // Optional Loader
            const premiumLoader = document.getElementById("premium-loader");
            const progressBar = document.getElementById("loader-progress-bar");

            if (premiumLoader) premiumLoader.classList.add("active");

            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 90) progress = 90;
                if (progressBar) progressBar.style.width = `${progress}%`;
            }, 100);

            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            clearInterval(progressInterval);
            if (progressBar) progressBar.style.width = "100%";

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed. Please check your credentials.");
            }

            // Store user data
            const keysToClear = ['xyverra_user_name', 'xyverra_user_email', 'xyverra_selected_path', 'userLevel', 'xyverra_selected_level', 'userSkills', 'xyverra_interests', 'completedModules', 'xyverra_skill_score', 'xyverra_user_streak', 'xyverra_xp', 'xyverra_onboarded', 'roadmapGenerated', 'completedCourses', 'quizResultLevel', 'quizResultScore', 'moduleQuizPassed'];
            keysToClear.forEach(k => localStorage.removeItem(k));

            localStorage.setItem("token", data.token);
            localStorage.setItem("xyverra_user_name", data.user.name);
            localStorage.setItem("xyverra_user_email", data.user.email);

            if (data.user.selectedPath) localStorage.setItem("xyverra_selected_path", data.user.selectedPath);
            if (data.user.selectedLevel) {
                localStorage.setItem("userLevel", data.user.selectedLevel);
                localStorage.setItem("xyverra_selected_level", data.user.selectedLevel);
            }
            if (data.user.skills?.length > 0) localStorage.setItem("userSkills", JSON.stringify(data.user.skills));
            if (data.user.interests?.length > 0) localStorage.setItem("xyverra_interests", JSON.stringify(data.user.interests));
            if (data.user.completedModules?.length > 0) localStorage.setItem("completedModules", JSON.stringify(data.user.completedModules));
            if (data.user.competencyScore !== undefined) localStorage.setItem("xyverra_skill_score", data.user.competencyScore);
            if (data.user.dailyStreak !== undefined) localStorage.setItem("xyverra_user_streak", data.user.dailyStreak);
            if (data.user.experienceRank !== undefined) localStorage.setItem("xyverra_xp", data.user.experienceRank);
            if (data.user.onboardingCompleted) localStorage.setItem('xyverra_onboarded', 'true');

            // Hide loader
            if (premiumLoader) premiumLoader.classList.remove("active");

            // Success feedback and redirect on close
            window.XySuccess("Welcome back", "Login Successful 🎉", () => {
                const onboardingDone = data.user.onboardingCompleted || !!data.user.selectedPath || localStorage.getItem('xyverra_onboarded') === 'true';
                if (onboardingDone) {
                    window.location.href = 'dashboard.html';
                } else {
                    window.location.href = 'career-discovery.html';
                }
            });

        } catch (error) {
            console.error("Login Error:", error);
            
            // Show inline error card instead of alert
            showGeneralError(error.message || "Server connection error. Please try again.");
            
            // Revert loaders
            const premiumLoader = document.getElementById("premium-loader");
            if (premiumLoader) premiumLoader.classList.remove("active");
            
            document.body.style.cursor = "default";
            if (submitBtn) {
                submitBtn.disabled = false;
                btnLabel.innerHTML = "Sign in to Dashboard";
                submitBtn.querySelector('i.fa-arrow-right').style.display = 'inline-block';
            }
        }
    });

    // Extras
    document.getElementById('forgot-password-link')?.addEventListener('click', () => window.XyInfo("Coming Soon", "Password recovery is not enabled in this demo."));
    document.getElementById('terms-link-login')?.addEventListener('click', () => window.XyInfo("Coming Soon", "Terms of Service page is under construction."));
    document.getElementById('privacy-link-login')?.addEventListener('click', () => window.XyInfo("Coming Soon", "Privacy Policy page is under construction."));
});