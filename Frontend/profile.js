// profile.js — aligned with login/signup data structure + DOB support
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');
    const currentEmail = localStorage.getItem('xyverra_user_email');

    if (!token || !currentEmail) {
        window.location.href = 'login.html';
        return;
    }

    // Local state
    let userData = {
        name: localStorage.getItem('xyverra_user_name') || 'User',
        email: currentEmail,
        dob: localStorage.getItem('xyverra_user_dob') || '',
        skills: [],
        selectedPath: localStorage.getItem('xyverra_selected_path') || 'Web Development',
        selectedLevel: localStorage.getItem('userLevel') || 'Beginner'
    };

    // ── Fetch Profile from Backend ──
    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/user/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                userData = {
                    name: data.name || userData.name,
                    email: data.email || userData.email,
                    dob: data.dob || userData.dob,
                    skills: data.skills || [],
                    selectedPath: data.selectedPath || userData.selectedPath,
                    selectedLevel: data.selectedLevel || userData.selectedLevel,
                    createdAt: data.createdAt || null,
                    interests: data.interests || [],
                    careerGoal: data.careerGoal || '',
                    timeline: data.timeline || '',
                    weeklyHours: data.weeklyHours || ''
                };
                // Sync interest data to localStorage if not already set
                if (data.interests && data.interests.length > 0 && !localStorage.getItem('xyverra_interests')) {
                    localStorage.setItem('xyverra_interests', JSON.stringify(data.interests));
                }
                if (data.careerGoal && !localStorage.getItem('xyverra_goal')) {
                    localStorage.setItem('xyverra_goal', data.careerGoal);
                }
                if (data.timeline && !localStorage.getItem('xyverra_timeline')) {
                    localStorage.setItem('xyverra_timeline', data.timeline);
                }
                if (data.weeklyHours && !localStorage.getItem('xyverra_hours')) {
                    localStorage.setItem('xyverra_hours', data.weeklyHours);
                }
            } else {
                console.warn("Could not fetch profile from server, using localStorage.");
            }
        } catch (err) {
            console.warn("Server unreachable, using cached data:", err.message);
        } finally {
            renderProfile();
        }
    };

    // ── Format DOB for display ──
    const formatDOB = (dobStr) => {
        if (!dobStr) return '';
        try {
            const d = new Date(dobStr + 'T00:00:00'); // prevent timezone shift
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch {
            return dobStr;
        }
    };

    // ── Render Profile UI ──
    const renderProfile = () => {
        const name = userData.name || 'User';
        const initials = name.trim().substring(0, 2).toUpperCase();

        // Avatar
        const avatarEl = document.getElementById('profile-avatar');
        if (avatarEl) avatarEl.textContent = initials;

        // Name
        const nameEl = document.getElementById('profile-name');
        if (nameEl) nameEl.textContent = name;

        // Email
        const emailEl = document.getElementById('profile-email');
        if (emailEl) emailEl.innerHTML = `<i class="fas fa-envelope"></i> ${userData.email}`;

        // DOB display
        const dobDisplay = document.getElementById('profile-dob-display');
        const dobText = document.getElementById('profile-dob-text');
        if (dobDisplay && dobText) {
            if (userData.dob) {
                dobText.textContent = formatDOB(userData.dob);
                dobDisplay.style.display = 'flex';
            } else {
                dobDisplay.style.display = 'none';
            }
        }

        // Member-since chip
        const memberChip = document.getElementById('member-since-chip');
        const memberText = document.getElementById('member-since-text');
        if (memberChip && memberText && userData.createdAt) {
            try {
                const d = new Date(userData.createdAt);
                memberText.textContent = `Member since ${d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
                memberChip.style.display = 'inline-flex';
            } catch {}
        }

        // Level chip
        const levelChipText = document.getElementById('level-chip-text');
        if (levelChipText) levelChipText.textContent = userData.selectedLevel || 'Beginner';

        // Learning Path
        const catEl = document.getElementById('display-category');
        if (catEl) catEl.textContent = userData.selectedPath || 'Not Selected';

        const lvlEl = document.getElementById('display-level');
        if (lvlEl) lvlEl.textContent = userData.selectedLevel || 'Beginner';

        // Timeline & Hours from localStorage
        const timeline = localStorage.getItem('xyverra_timeline') || '';
        const hours = localStorage.getItem('xyverra_hours') || '';
        const timelineEl = document.getElementById('display-timeline');
        if (timelineEl) timelineEl.textContent = timeline || '—';
        const hoursEl = document.getElementById('display-hours');
        if (hoursEl) hoursEl.textContent = hours ? `${hours} hrs/week` : '—';

        // Skills
        const skillsContainer = document.getElementById('profile-skills-container');
        if (skillsContainer) {
            let skills = Array.isArray(userData.skills) ? userData.skills : [];
            if (!skills.length) {
                try { skills = JSON.parse(localStorage.getItem('userSkills') || '[]'); } catch(e){}
            }
            if (skills.length > 0) {
                skillsContainer.innerHTML = skills.map(s =>
                    `<span class="skill-pill-item">${s}</span>`
                ).join('');
            } else {
                skillsContainer.innerHTML = `
                    <div class="no-skills-state">
                        <i class="fas fa-layer-group"></i>
                        <span>No skills added yet. Complete onboarding.</span>
                    </div>`;
            }
        }

        // ── Stats Row ──
        const xp = parseInt(localStorage.getItem('xyverra_xp') || '0', 10);
        const streak = parseInt(localStorage.getItem('xyverra_user_streak') || '0', 10);
        const score = parseInt(localStorage.getItem('xyverra_skill_score') || '0', 10);

        // Roadmap % from completed modules
        let roadmapPct = 0;
        try {
            const completed = JSON.parse(localStorage.getItem('completedModules') || '[]');
            roadmapPct = Math.min(Math.round((completed.length / 5) * 100), 100);
        } catch(e) {}

        const statXp     = document.getElementById('stat-xp');
        const statStreak = document.getElementById('stat-streak');
        const statRoadmap= document.getElementById('stat-roadmap');
        const statScore  = document.getElementById('stat-score');
        if (statXp)      statXp.textContent     = xp.toLocaleString();
        if (statStreak)  statStreak.textContent  = streak;
        if (statRoadmap) statRoadmap.textContent = `${roadmapPct}%`;
        if (statScore)   statScore.textContent   = score;

        // ── Interests ──
        const interestsContainer = document.getElementById('profile-interests-container');
        if (interestsContainer) {
            let interests = [];
            try { interests = JSON.parse(localStorage.getItem('xyverra_interests') || '[]'); } catch(e){}
            if (!interests.length && Array.isArray(userData.interests)) interests = userData.interests;
            if (interests.length > 0) {
                interestsContainer.innerHTML = interests.map(i =>
                    `<span class="interest-display-chip"><i class="fas fa-tag" style="font-size:0.7rem;"></i>${i}</span>`
                ).join('');
            } else {
                interestsContainer.innerHTML = `
                    <div class="no-skills-state">
                        <i class="fas fa-compass" style="font-size:1.3rem; opacity:0.25;"></i>
                        <span>No interests selected yet. Complete onboarding.</span>
                    </div>`;
            }
        }

        // ── Goals ──
        const goal        = localStorage.getItem('xyverra_goal') || '';
        const timelineG   = localStorage.getItem('xyverra_timeline') || '';
        const hoursG      = localStorage.getItem('xyverra_hours') || '';

        const goalEl      = document.getElementById('display-goal');
        const timelineGEl = document.getElementById('display-timeline-goal');
        const hoursGEl    = document.getElementById('display-hours-goal');

        if (goalEl)      goalEl.textContent      = goal      || 'Not set — complete onboarding';
        if (timelineGEl) timelineGEl.textContent = timelineG || 'Not set';
        if (hoursGEl)    hoursGEl.textContent    = hoursG    ? `${hoursG} hrs/week` : 'Not set';

        // Sidebar sync
        const sidebarName = document.getElementById('user-display-name');
        if (sidebarName) sidebarName.textContent = name;
        const sidebarAvatar = document.getElementById('user-avatar');
        if (sidebarAvatar) sidebarAvatar.textContent = initials;
    };

    // ── Save to Backend ──
    const saveToServer = async (updates) => {
        try {
            const response = await fetch('http://localhost:5000/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });

            if (response.ok) {
                const updated = await response.json();
                userData = {
                    ...userData,
                    name: updated.name || userData.name,
                    email: updated.email || userData.email,
                    dob: updated.dob !== undefined ? updated.dob : userData.dob,
                    selectedPath: updated.selectedPath || userData.selectedPath,
                    selectedLevel: updated.selectedLevel || userData.selectedLevel,
                    skills: updated.skills || userData.skills
                };

                // Sync localStorage
                localStorage.setItem('xyverra_user_name', userData.name);
                localStorage.setItem('xyverra_user_email', userData.email);
                localStorage.setItem('xyverra_user_dob', userData.dob || '');
                localStorage.setItem('xyverra_selected_path', userData.selectedPath);
                localStorage.setItem('userLevel', userData.selectedLevel);

                renderProfile();

                if (typeof showToast === 'function') {
                    showToast('Profile updated successfully!', 'success');
                }
                return true;
            } else {
                const err = await response.json();
                alert(err.message || 'Failed to update profile.');
                return false;
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("Connection error. Could not save to server.");
            return false;
        }
    };

    // ── Edit Profile Modal ──
    const editProfileBtn    = document.getElementById('edit-profile-btn');
    const editProfileModal  = document.getElementById('edit-profile-modal');
    const closeProfileModal = document.getElementById('close-profile-modal');
    const saveProfileBtn    = document.getElementById('save-profile-btn');

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            document.getElementById('edit-name').value     = userData.name || '';
            document.getElementById('edit-email').value    = userData.email || '';
            document.getElementById('edit-dob').value      = userData.dob || '';
            document.getElementById('edit-category').value = userData.selectedPath || 'Web Development';
            document.getElementById('edit-level').value    = userData.selectedLevel || 'Beginner';
            editProfileModal.classList.add('active');
        });
    }

    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', () => editProfileModal.classList.remove('active'));
    }

    editProfileModal?.addEventListener('click', (e) => {
        if (e.target === editProfileModal) editProfileModal.classList.remove('active');
    });

    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', async () => {
            const name          = document.getElementById('edit-name').value.trim();
            const email         = document.getElementById('edit-email').value.trim();
            const dob           = document.getElementById('edit-dob').value;
            const selectedPath  = document.getElementById('edit-category').value;
            const selectedLevel = document.getElementById('edit-level').value;

            if (!name || !email) {
                alert('Name and email are required.');
                return;
            }

            saveProfileBtn.disabled = true;
            saveProfileBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

            const success = await saveToServer({ name, email, dob, selectedPath, selectedLevel });
            if (success) editProfileModal.classList.remove('active');

            saveProfileBtn.disabled = false;
            saveProfileBtn.innerHTML = 'Save Changes';
        });
    }

    // ── Change Password Modal ──
    const changePasswordBtn  = document.getElementById('change-password-btn');
    const changePasswordModal= document.getElementById('change-password-modal');
    const closePasswordModal = document.getElementById('close-password-modal');
    const savePasswordBtn    = document.getElementById('save-password-btn');
    const passwordAlert      = document.getElementById('password-alert');

    const showAlert = (msg, isError = true) => {
        if (!passwordAlert) return;
        passwordAlert.textContent = msg;
        passwordAlert.style.display = 'block';
        passwordAlert.style.backgroundColor = isError ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)';
        passwordAlert.style.color = isError ? '#ef4444' : 'var(--success)';
    };

    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
            if (passwordAlert) passwordAlert.style.display = 'none';
            changePasswordModal.classList.add('active');
        });
    }

    if (closePasswordModal) {
        closePasswordModal.addEventListener('click', () => changePasswordModal.classList.remove('active'));
    }

    changePasswordModal?.addEventListener('click', (e) => {
        if (e.target === changePasswordModal) changePasswordModal.classList.remove('active');
    });

    if (savePasswordBtn) {
        savePasswordBtn.addEventListener('click', async () => {
            const currentPassword = document.getElementById('current-password').value;
            const newPassword     = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (passwordAlert) passwordAlert.style.display = 'none';

            if (!currentPassword || !newPassword || !confirmPassword) {
                return showAlert('All fields are required.');
            }
            if (newPassword.length < 6) {
                return showAlert('New password must be at least 6 characters.');
            }
            if (newPassword !== confirmPassword) {
                return showAlert('New passwords do not match.');
            }

            savePasswordBtn.disabled = true;
            savePasswordBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';

            try {
                const response = await fetch('http://localhost:5000/api/user/change-password', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ currentPassword, newPassword })
                });

                if (response.ok) {
                    showAlert('Password updated successfully!', false);
                    setTimeout(() => changePasswordModal.classList.remove('active'), 1500);
                } else {
                    const err = await response.json();
                    showAlert(err.message || 'Failed to update password.');
                }
            } catch {
                showAlert('Connection error. Please try again.');
            } finally {
                savePasswordBtn.disabled = false;
                savePasswordBtn.innerHTML = 'Update Password';
            }
        });
    }

    // ── Initial Load ──
    await fetchUserProfile();
});
