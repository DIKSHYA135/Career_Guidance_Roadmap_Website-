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
            const submitBtn = document.getElementById('login-btn');
            
            if (emailInput && emailInput.value) {
                const email = emailInput.value;
                const inferredName = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
                const capitalizedName = inferredName
                    .split(' ')
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ');

                // ── Show Premium Loading Overlay ──
                const premiumLoader = document.getElementById('premium-loader');
                const progressBar = document.getElementById('loader-progress-bar');
                if (premiumLoader) {
                    premiumLoader.classList.add('active');
                }
                
                let progress = 0;
                const progressInterval = setInterval(() => {
                    progress += Math.random() * 12 + 6;
                    if (progress >= 95) {
                        progress = 95;
                        clearInterval(progressInterval);
                    }
                    if (progressBar) {
                        progressBar.style.width = `${progress}%`;
                    }
                }, 80);

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
                }

                // Simulate brief auth request delay (1400ms) for realistic processing spinner
                setTimeout(() => {
                    clearInterval(progressInterval);
                    if (progressBar) progressBar.style.width = '100%';
                    
                    // ── 1. Save any existing session just in case ──
                    const currentEmail = localStorage.getItem('xyverra_user_email');
                    if (currentEmail) {
                        const usersDataObj = JSON.parse(localStorage.getItem('xyverra_users')) || {};
                        usersDataObj[currentEmail] = {
                            name: localStorage.getItem('xyverra_user_name'),
                            path: localStorage.getItem('xyverra_selected_path'),
                            role: localStorage.getItem('xyverra_user_role'),
                            level: localStorage.getItem('userLevel'),
                            skills: localStorage.getItem('userSkills'),
                            modules: localStorage.getItem('completedModules'),
                            score: localStorage.getItem('xyverra_skill_score'),
                            streak: localStorage.getItem('xyverra_user_streak'),
                            profile: localStorage.getItem('xyverra_profile') ? JSON.parse(localStorage.getItem('xyverra_profile')) : null,
                            progress: localStorage.getItem('xyverra_progress') ? JSON.parse(localStorage.getItem('xyverra_progress')) : null,
                            roadmapHistory: localStorage.getItem('xyverra_roadmap_history') ? JSON.parse(localStorage.getItem('xyverra_roadmap_history')) : null,
                            mandatoryQuizState: localStorage.getItem('xyverra_mandatory_quiz_state') ? JSON.parse(localStorage.getItem('xyverra_mandatory_quiz_state')) : null,
                            activeQuizState: localStorage.getItem('xyverra_active_quiz') ? JSON.parse(localStorage.getItem('xyverra_active_quiz')) : null
                        };
                        localStorage.setItem('xyverra_users', JSON.stringify(usersDataObj));
                    }

                    // ── 2. Clear current session data ──
                    const keysToRemove = [
                        'xyverra_user_name', 'xyverra_user_role', 'xyverra_selected_path',
                        'userLevel', 'userSkills', 'completedModules', 'xyverra_skill_score',
                        'xyverra_user', 'xyverra_user_streak', 'xyverra_user_email', 'xyverra_mandatory_quiz_state',
                        'xyverra_active_quiz', 'xyverra_profile', 'xyverra_progress', 'xyverra_roadmap_history'
                    ];
                    keysToRemove.forEach(k => localStorage.removeItem(k));

                    // ── 3. Load user specific data or create new ──
                    const usersData = JSON.parse(localStorage.getItem('xyverra_users')) || {};
                    const userData = usersData[email];
                    
                    let targetUrl = 'path-selection.html';

                    if (userData) {
                        // Restore existing user data
                        localStorage.setItem('xyverra_user_name', userData.name || capitalizedName);
                        localStorage.setItem('xyverra_user_email', email);
                        if (userData.path) {
                            localStorage.setItem('xyverra_selected_path', userData.path);
                            targetUrl = 'dashboard.html';
                        }
                        if (userData.role) localStorage.setItem('xyverra_user_role', userData.role);
                        if (userData.level) localStorage.setItem('userLevel', userData.level);
                        if (userData.skills) localStorage.setItem('userSkills', userData.skills);
                        if (userData.modules) localStorage.setItem('completedModules', userData.modules);
                        if (userData.score) localStorage.setItem('xyverra_skill_score', userData.score);
                        if (userData.streak) localStorage.setItem('xyverra_user_streak', userData.streak);
                        if (userData.profile) localStorage.setItem('xyverra_profile', JSON.stringify(userData.profile));
                        if (userData.progress) localStorage.setItem('xyverra_progress', JSON.stringify(userData.progress));
                        if (userData.roadmapHistory) localStorage.setItem('xyverra_roadmap_history', JSON.stringify(userData.roadmapHistory));
                        if (userData.mandatoryQuizState) {
                            localStorage.setItem('xyverra_mandatory_quiz_state', JSON.stringify(userData.mandatoryQuizState));
                        }
                        if (userData.activeQuizState) {
                            localStorage.setItem('xyverra_active_quiz', JSON.stringify(userData.activeQuizState));
                        }
                    } else {
                        // New login for this email
                        localStorage.setItem('xyverra_user_name', capitalizedName);
                        localStorage.setItem('xyverra_user_email', email);
                    }

                    // Fade out loader overlay first
                    if (premiumLoader) {
                        premiumLoader.classList.remove('active');
                    }

                    // Show success popup first, then redirect!
                    setTimeout(() => {
                        if (typeof showSuccessPopup !== 'undefined') {
                            showSuccessPopup("Login Successful 🎉").then(() => {
                                window.location.href = targetUrl;
                            });
                        } else {
                            window.location.href = targetUrl;
                        }
                    }, 300);
                }, 1400);
            }
        });
    }
});
