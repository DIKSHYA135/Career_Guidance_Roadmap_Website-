console.log("Signup.js loaded - Version 1.1 - Debugging Active");

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Signup form submission detected.");

            const nameInput = document.getElementById('signup-name');
            const emailInput = document.getElementById('signup-email');
            const passwordInput = document.getElementById('signup-password');

            if (!nameInput.value || !emailInput.value || !passwordInput.value) {
                alert("Please fill in all fields.");
                return;
            }

            const name = nameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;

            console.log("Sending signup request for:", email);

            try {
                document.body.style.cursor = 'wait';
                
                // Using localhost consistently to avoid origin mismatch issues
                const apiUrl = 'http://localhost:5000/api/auth/register';
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                console.log("Response status:", response.status);
                const data = await response.json();
                console.log("Response data:", data);
                
                document.body.style.cursor = 'default';
            const signupBtn = form.querySelector('button[type="submit"]');

            if (
                nameInput && nameInput.value &&
                emailInput && emailInput.value &&
                passwordInput && passwordInput.value
            ) {
                const name = nameInput.value;
                const email = emailInput.value;
                const password = passwordInput.value;

                // ── Show Loading State on Button ──
                const originalBtnHTML = signupBtn ? signupBtn.innerHTML : '';
                if (signupBtn) {
                    signupBtn.disabled = true;
                    signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
                }

                // ── Helper to handle successful signup redirection ──
                const completeSignupFlow = () => {
                    if (typeof showSuccessPopup !== 'undefined') {
                        showSuccessPopup("Account Created Successfully ✅").then(() => {
                            window.location.href = 'path-selection.html';
                        });
                    } else {
                        window.location.href = 'path-selection.html';
                    }
                };

                try {
                    // Send POST request to backend
                    const response = await fetch('http://localhost:5000/api/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, email, password })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        // Save token & user data
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('xyverra_user_name', data.user.name);
                        localStorage.setItem('xyverra_user_email', data.user.email);
                        completeSignupFlow();
                    } else {
                        // Restore button state
                        if (signupBtn) {
                            signupBtn.disabled = false;
                            signupBtn.innerHTML = originalBtnHTML;
                        }
                        alert(data.message || 'Registration failed');
                    }
                } catch (error) {
                    console.log("Backend not active/offline, falling back to local simulation:", error);

                    // ── Local Mock Signup Fallback ──
                    // 1. Save existing session if needed
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

                    // 2. Clear current session
                    const keysToRemove = [
                        'xyverra_user_name', 'xyverra_user_role', 'xyverra_selected_path',
                        'userLevel', 'userSkills', 'completedModules', 'xyverra_skill_score',
                        'xyverra_user', 'xyverra_user_streak', 'xyverra_user_email', 'xyverra_mandatory_quiz_state',
                        'xyverra_active_quiz', 'xyverra_profile', 'xyverra_progress', 'xyverra_roadmap_history'
                    ];
                    keysToRemove.forEach(k => localStorage.removeItem(k));

                    // 3. Register user locally in users store
                    const usersData = JSON.parse(localStorage.getItem('xyverra_users')) || {};
                    usersData[email] = {
                        name: name,
                        email: email,
                        path: '',
                        role: 'User',
                        level: 'Beginner',
                        skills: '[]',
                        modules: '[]',
                        score: '0',
                        streak: '0',
                        profile: { picture: '', fullName: name, username: email.split('@')[0], bio: '', learningGoal: '' },
                        progress: { modulesCompleted: 0, coursesCompleted: 0, learningStreak: 0, totalLearningHours: 0, certificatesEarned: 0, roadmapsGenerated: 0 },
                        roadmapHistory: []
                    };
                    localStorage.setItem('xyverra_users', JSON.stringify(usersData));

                    // Log in new user locally
                    localStorage.setItem('xyverra_user_name', name);
                    localStorage.setItem('xyverra_user_email', email);

                    // Add simulated server delay for spinner visual appeal
                    setTimeout(() => {
                        completeSignupFlow();
                    }, 800);
                }
            }
        });
    }

                if (response.ok) {
                    console.log("Signup successful!");
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('xyverra_user_name', data.user.name);
                    localStorage.setItem('xyverra_user_email', data.user.email);
                    
                    alert('Account created successfully!');
                    window.location.href = 'path-selection.html';
                } else {
                    console.warn("Signup failed with message:", data.message);
                    alert(data.message || 'Signup failed');
                }
            } catch (error) {
                document.body.style.cursor = 'default';
                console.error("CRITICAL FETCH ERROR:", error);
                
                // Detailed alert to help the user debug
                alert('DEBUG INFO: Connection failed.\n' +
                      '1. Ensure backend is running (npm start in backend folder)\n' +
                      '2. Check browser console (F12) for detailed errors\n' +
                      '3. Error type: ' + error.message);
            }
        });
    } else {
        console.error("Signup form not found in the DOM!");
    }
});
