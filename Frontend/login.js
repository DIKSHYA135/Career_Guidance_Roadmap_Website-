document.addEventListener("DOMContentLoaded", () => {
    // Password visibility toggle
    const toggleBtn = document.getElementById("toggle-password");
    const passwordInput = document.getElementById("login-password");

    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener("click", () => {
            const isText = passwordInput.type === "text";

            passwordInput.type = isText ? "password" : "text";

            toggleBtn.className = isText
                ? "far fa-eye eye-icon"
                : "far fa-eye-slash eye-icon";
        });
    }

    // Login form submit
    const form = document.getElementById("auth-form");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const emailInput = document.getElementById("login-email");
        const passwordInput = document.getElementById("login-password");
        const submitBtn = document.getElementById("login-btn");

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            document.body.style.cursor = "wait";

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML =
                    '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            }

            // Optional Loader
            const premiumLoader = document.getElementById("premium-loader");
            const progressBar = document.getElementById("loader-progress-bar");

            if (premiumLoader) {
                premiumLoader.classList.add("active");
            }

            let progress = 0;

            const progressInterval = setInterval(() => {
                progress += Math.random() * 10;

                if (progress >= 90) {
                    progress = 90;
                }

                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }
            }, 100);

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            clearInterval(progressInterval);

            if (progressBar) {
                progressBar.style.width = "100%";
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Store user data
            localStorage.setItem("token", data.token);
            localStorage.setItem("xyverra_user_name", data.user.name);
            localStorage.setItem("xyverra_user_email", data.user.email);

            if (data.user.selectedPath) {
                localStorage.setItem("xyverra_selected_path", data.user.selectedPath);
            }
            if (data.user.selectedLevel) {
                localStorage.setItem("userLevel", data.user.selectedLevel);
                localStorage.setItem("xyverra_selected_level", data.user.selectedLevel);
            }
            if (data.user.skills && data.user.skills.length > 0) {
                localStorage.setItem("userSkills", JSON.stringify(data.user.skills));
            }
            if (data.user.completedModules && data.user.completedModules.length > 0) {
                localStorage.setItem("completedModules", JSON.stringify(data.user.completedModules));
            }
            if (data.user.competencyScore !== undefined) {
                localStorage.setItem("xyverra_skill_score", data.user.competencyScore);
            }
            if (data.user.dailyStreak !== undefined) {
                localStorage.setItem("xyverra_user_streak", data.user.dailyStreak);
            }
            if (data.user.experienceRank !== undefined) {
                localStorage.setItem("xyverra_xp", data.user.experienceRank);
            }

            // Hide loader
            if (premiumLoader) {
                premiumLoader.classList.remove("active");
            }

            // Success popup
            if (typeof showSuccessPopup === "function") {
                await showSuccessPopup("Login Successful 🎉");
            }

            // Redirect based on onboarding status
            const alreadyOnboarded = localStorage.getItem('xyverra_onboarded');
            if (data.user.selectedPath || alreadyOnboarded) {
                window.location.href = 'dashboard.html';
            } else {
                window.location.href = 'onboarding.html';
            }

        } catch (error) {
            console.error("Login Error:", error);

            alert(
                error.message ||
                "Server connection error. Please ensure backend is running."
            );
        } finally {
            document.body.style.cursor = "default";

            const premiumLoader = document.getElementById("premium-loader");

            if (premiumLoader) {
                premiumLoader.classList.remove("active");
            }

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = "Sign In";
            }
        }
    });
});