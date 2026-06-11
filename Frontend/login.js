document.addEventListener("DOMContentLoaded", () => {
    // â”€â”€ Elements â”€â”€
    const form = document.getElementById("auth-form");
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");
    const rememberInput = document.getElementById("remember-me");
    const submitBtn = document.getElementById("login-btn");
    const btnLabel = document.getElementById("btn-label");
    const toggleBtn = document.getElementById("toggle-password");

    // Error elements
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const generalErrorCard = document.getElementById("login-general-error");
    const generalErrorText = document.getElementById("login-error-text");

    // Prevent double submission
    let isSubmitting = false;

    const REMEMBER_KEY = "xyverra_remembered_email";

    // â”€â”€ Anti-autofill hardening â”€â”€
    // Some browsers ignore autocomplete="new-password". Neutralize any value
    // injected before user interaction by clearing fields shortly after load.
    const stripAutofill = () => {
        if (!emailInput.dataset.userTouched) emailInput.value = "";
        if (!passwordInput.dataset.userTouched) passwordInput.value = "";
    };
    setTimeout(stripAutofill, 1);
    setTimeout(stripAutofill, 250);

    emailInput.addEventListener("input", () => { emailInput.dataset.userTouched = "1"; });
    passwordInput.addEventListener("input", () => { passwordInput.dataset.userTouched = "1"; });

    // â”€â”€ Input sanitization â”€â”€
    // Strips control chars and trims; defends against accidental injection of
    // angle brackets / control sequences into the request payload.
    const sanitize = (value) => {
        if (typeof value !== "string") return "";
        return value
            .replace(/[\u0000-\u001F\u007F]/g, "") // control chars
            .replace(/[<>]/g, "")                   // strip angle brackets
            .trim();
    };

    // â”€â”€ Error Helpers â”€â”€
    const showFieldError = (input, errorDiv, message) => {
        input.classList.remove('input-field-success');
        input.classList.add('input-field-error');
        errorDiv.textContent = message;
        errorDiv.classList.add('visible');
    };

    const clearFieldError = (input, errorDiv) => {
        input.classList.remove('input-field-error');
        errorDiv.textContent = '';
        errorDiv.classList.remove('visible');
    };

    const setFieldSuccess = (input, errorDiv) => {
        clearFieldError(input, errorDiv);
        if (input.value.trim() !== '') {
            input.classList.add('input-field-success');
        }
    };

    const showGeneralError = (message) => {
        if (typeof window.XyError === "function") {
            window.XyError('Login Error', message);
        } else if (generalErrorCard && generalErrorText) {
            generalErrorText.textContent = message;
            generalErrorCard.classList.add('visible');
        }
    };

    const hideGeneralError = () => {
        if (generalErrorCard) {
            generalErrorText.textContent = '';
            generalErrorCard.classList.remove('visible');
        }
    };

    // â”€â”€ Restore remembered email â”€â”€
    try {
        const remembered = localStorage.getItem(REMEMBER_KEY);
        if (remembered) {
            emailInput.value = remembered;
            emailInput.dataset.userTouched = "1"; // keep it from being stripped
            if (rememberInput) rememberInput.checked = true;
        }
    } catch (_) { /* localStorage unavailable */ }

    // â”€â”€ Password visibility toggle â”€â”€
    if (toggleBtn && passwordInput) {
        const togglePassword = () => {
            const isText = passwordInput.type === "text";
            passwordInput.type = isText ? "password" : "text";
            toggleBtn.className = isText ? "far fa-eye eye-icon" : "far fa-eye-slash eye-icon";
        };
        toggleBtn.addEventListener("click", togglePassword);
        toggleBtn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                togglePassword();
            }
        });
    }

    // â”€â”€ Real-time Validation â”€â”€
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

    // â”€â”€ Button state helpers â”€â”€
    const setLoadingState = () => {
        if (!submitBtn) return;
        submitBtn.disabled = true;
        btnLabel.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i> Signing in...';
        const arrow = submitBtn.querySelector('i.fa-arrow-right');
        if (arrow) arrow.style.display = 'none';
    };

    const setSuccessState = () => {
        if (!submitBtn) return;
        btnLabel.innerHTML = '<i class="fas fa-check" style="margin-right:8px;"></i> Success!';
    };

    const resetButtonState = () => {
        if (!submitBtn) return;
        submitBtn.disabled = false;
        btnLabel.innerHTML = "Sign in to Dashboard";
        const arrow = submitBtn.querySelector('i.fa-arrow-right');
        if (arrow) arrow.style.display = 'inline-block';
    };

    // â”€â”€ Form Submit â”€â”€
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Prevent double-submission
        if (isSubmitting) return;

        hideGeneralError();

        const email = sanitize(emailInput.value);
        const password = passwordInput.value; // do not trim/strip password content beyond control chars
        const cleanPassword = password.replace(/[\u0000-\u001F\u007F]/g, "");

        // Reflect sanitized email back so user sees what's sent
        if (emailInput.value !== email) emailInput.value = email;

        let hasError = false;

        if (!email) {
            showFieldError(emailInput, emailError, 'Email is required');
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            showFieldError(emailInput, emailError, 'Valid email required');
            hasError = true;
        }

        if (!cleanPassword) {
            showFieldError(passwordInput, passwordError, 'Password is required');
            hasError = true;
        }

        if (hasError) return;

        isSubmitting = true;
        const premiumLoader = document.getElementById("premium-loader");
        const progressBar = document.getElementById("loader-progress-bar");
        let progressInterval;

        try {
            document.body.style.cursor = "wait";
            setLoadingState();

            if (premiumLoader) premiumLoader.classList.add("active");

            let progress = 0;
            progressInterval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 90) progress = 90;
                if (progressBar) progressBar.style.width = `${progress}%`;
            }, 100);

            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password: cleanPassword }),
            });

            clearInterval(progressInterval);
            if (progressBar) progressBar.style.width = "100%";

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed. Please check your credentials.");
            }

            // ── Store Token ──
            // Always write to localStorage so token survives page refreshes.
            // sessionStorage alone is wiped on tab close and causes auth-guard
            // failures on every new page load.
            localStorage.setItem("token", data.token);
            if (rememberInput && rememberInput.checked) {
                localStorage.setItem(REMEMBER_KEY, email);
            } else {
                localStorage.removeItem(REMEMBER_KEY);
            }

            // Store fresh user profile data. 
            // IMPORTANT: Do NOT clear xyverra_onboarded or xyverra_selected_path here.
            // Those keys drive the auth-guard onboarding check, and clearing them causes
            // every protected page to redirect to career-discovery on login.
            localStorage.setItem("xyverra_user_name", data.user.name);
            localStorage.setItem("xyverra_user_email", data.user.email);
            localStorage.setItem("xyverra_is_admin", data.user.isAdmin ? 'true' : 'false');

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
            localStorage.setItem('xyverra_email_verified', data.user.emailVerified ? 'true' : 'false');
            if (data.user.chatSubscriptionActive) localStorage.setItem('chatSubscriptionActive', 'true');

            // Hide loader, show brief success state on button
            if (premiumLoader) premiumLoader.classList.remove("active");
            document.body.style.cursor = "default";
            setSuccessState();

            const redirect = () => {
                const onboardingDone = data.user.onboardingCompleted || !!data.user.selectedPath || localStorage.getItem('xyverra_onboarded') === 'true';
                window.location.href = onboardingDone ? 'dashboard.html' : 'career-discovery.html';
            };

            // Success feedback then redirect (brief delay so success state is visible)
            if (typeof window.XySuccess === "function") {
                window.XySuccess("Welcome back", "Login Successfully", redirect);
            } else {
                setTimeout(redirect, 800);
            }

        } catch (error) {
            console.error("Login Error:", error);
            if (progressInterval) clearInterval(progressInterval);

            showGeneralError(error.message || "Server connection error. Please try again.");

            if (premiumLoader) premiumLoader.classList.remove("active");
            document.body.style.cursor = "default";
            resetButtonState();
            isSubmitting = false; // allow retry only on failure
        }
    });

    // Extras
    document.getElementById('forgot-password-link')?.addEventListener('click', () => { if (typeof window.XyInfo === 'function') window.XyInfo("Coming Soon", "Password recovery is not enabled in this demo."); });
    document.getElementById('terms-link-login')?.addEventListener('click', () => { if (typeof window.XyInfo === 'function') window.XyInfo("Coming Soon", "Terms of Service page is under construction."); });
    document.getElementById('privacy-link-login')?.addEventListener('click', () => { if (typeof window.XyInfo === 'function') window.XyInfo("Coming Soon", "Privacy Policy page is under construction."); });
});