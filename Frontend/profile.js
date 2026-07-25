// profile.js — all profile fields editable with validation, avatar upload, interests, goals
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');
    const currentEmail = localStorage.getItem('xyverra_user_email');

    if (!token || !currentEmail) {
        window.location.href = 'login.html';
        return;
    }

    const API_BASE = (window.XYVERRA_CONFIG?.API_BASE || 'http://localhost:5000');

    // Master list of selectable interests
    const INTEREST_OPTIONS = [
        'Web Development', 'Mobile Apps', 'Data Science', 'Machine Learning',
        'Artificial Intelligence', 'Cloud Computing', 'DevOps', 'Cybersecurity',
        'UI/UX Design', 'Game Development', 'Blockchain', 'IoT',
        'Backend Engineering', 'Frontend Engineering', 'Data Analytics',
        'Product Management', 'Startups', 'Open Source'
    ];

    // ── Toast helper (self-contained) ──
    const showToast = (message, type = 'info') => {
        const container = document.getElementById('toast-container');
        if (!container) { return; }
        const el = document.createElement('div');
        el.className = `toast ${type}`;
        const icon = type === 'success' ? 'fa-circle-check'
                   : type === 'error' ? 'fa-circle-exclamation'
                   : 'fa-circle-info';
        el.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
        container.appendChild(el);
        setTimeout(() => {
            el.style.transition = 'opacity .3s, transform .3s';
            el.style.opacity = '0';
            el.style.transform = 'translateX(40px)';
            setTimeout(() => el.remove(), 300);
        }, 3200);
    };
    // expose globally for any other scripts
    window.showToast = showToast;

    // Local state
    let userData = {
        name: localStorage.getItem('xyverra_user_name') || 'User',
        email: currentEmail,
        phone: localStorage.getItem('xyverra_user_phone') || '',
        dob: localStorage.getItem('xyverra_user_dob') || '',
        education: localStorage.getItem('xyverra_user_education') || '',
        avatar: localStorage.getItem('xyverra_user_avatar') || '',
        skills: [],
        selectedPath: localStorage.getItem('xyverra_selected_path') || '',
        selectedLevel: localStorage.getItem('userLevel') || 'Beginner',
        interests: [],
        careerGoal: localStorage.getItem('xyverra_goal') || '',
        timeline: localStorage.getItem('xyverra_timeline') || '',
        weeklyHours: localStorage.getItem('xyverra_hours') || '',
        createdAt: null
    };
    try { userData.interests = JSON.parse(localStorage.getItem('xyverra_interests') || '[]'); } catch (e) {}

    // ── Fetch Profile from Backend ──
    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/user/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                // /api/user/profile now returns data.user
                const u = data.user || data;
                userData = {
                    name: u.name || userData.name,
                    email: u.email || userData.email,
                    // Backend stores phoneNumber, frontend uses phone internally
                    phone: (u.phoneNumber !== undefined && u.phoneNumber !== null) ? u.phoneNumber
                         : (u.phone !== undefined && u.phone !== null) ? u.phone
                         : userData.phone,
                    dob: u.dob || userData.dob,
                    education: u.education !== undefined && u.education !== null ? u.education : userData.education,
                    // Backend stores profilePicture, frontend uses avatar internally
                    avatar: u.profilePicture || u.avatar || userData.avatar,
                    skills: u.skills || [],
                    selectedPath: u.selectedPath || userData.selectedPath,
                    selectedLevel: u.selectedLevel || userData.selectedLevel,
                    createdAt: u.createdAt || null,
                    interests: (u.interests && u.interests.length) ? u.interests
                              : (u.careerInterests && u.careerInterests.length) ? u.careerInterests
                              : userData.interests,
                    careerGoal: u.careerGoal !== undefined ? u.careerGoal : userData.careerGoal,
                    timeline: u.timeline !== undefined ? u.timeline : userData.timeline,
                    weeklyHours: u.weeklyHours !== undefined ? u.weeklyHours : userData.weeklyHours,
                    emailVerified: u.emailVerified || false,
                    emailReportsEnabled: u.emailReportsEnabled || false
                };
                syncLocalStorage();
            } else {
                console.warn("Could not fetch profile from server, using localStorage.");
            }
        } catch (err) {
            console.warn("Server unreachable, using cached data:", err.message);
        } finally {
            renderProfile();
        }
    };

    const syncLocalStorage = () => {
        localStorage.setItem('xyverra_user_name', userData.name || '');
        localStorage.setItem('xyverra_user_email', userData.email || '');
        localStorage.setItem('xyverra_user_phone', userData.phone || '');
        localStorage.setItem('xyverra_user_dob', userData.dob || '');
        localStorage.setItem('xyverra_user_education', userData.education || '');
        if (userData.avatar) localStorage.setItem('xyverra_user_avatar', userData.avatar);
        else localStorage.removeItem('xyverra_user_avatar');
        localStorage.setItem('xyverra_selected_path', userData.selectedPath || '');
        localStorage.setItem('xyverra_selected_level', userData.selectedLevel || 'Beginner');
        localStorage.setItem('userLevel', userData.selectedLevel || 'Beginner');
        localStorage.setItem('xyverra_interests', JSON.stringify(userData.interests || []));
        localStorage.setItem('xyverra_goal', userData.careerGoal || '');
        localStorage.setItem('xyverra_timeline', userData.timeline || '');
        localStorage.setItem('xyverra_hours', userData.weeklyHours || '');
        if (userData.emailVerified !== undefined) {
            localStorage.setItem('xyverra_email_verified', userData.emailVerified ? 'true' : 'false');
        }
    };

    // ── Format DOB for display ──
    const formatDOB = (dobStr) => {
        if (!dobStr) return '';
        try {
            const d = new Date(dobStr + 'T00:00:00');
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch {
            return dobStr;
        }
    };

    // ── Render avatar (image or initials) into an element ──
    const renderAvatarInto = (el, initials) => {
        if (!el) return;
        if (userData.avatar) {
            el.innerHTML = `<img src="${userData.avatar}" alt="avatar">`;
        } else {
            el.textContent = initials;
        }
    };

    // ── Render Profile UI ──
    const renderProfile = () => {
        const name = userData.name || 'User';
        const initials = name.trim().substring(0, 2).toUpperCase() || 'U';

        // Avatar (large) — preserve the upload overlay
        const avatarEl = document.getElementById('profile-avatar');
        if (avatarEl) {
            const overlay = '<div class="avatar-upload-overlay"><i class="fas fa-camera"></i></div>';
            if (userData.avatar) {
                avatarEl.innerHTML = `<img src="${userData.avatar}" alt="avatar">${overlay}`;
            } else {
                avatarEl.innerHTML = `${initials}${overlay}`;
            }
        }

        // Name
        const nameEl = document.getElementById('profile-name');
        if (nameEl) nameEl.textContent = name;

        // Email
        const emailEl = document.getElementById('profile-email');
        if (emailEl) emailEl.innerHTML = `<i class="fas fa-envelope"></i> ${userData.email}`;

        // Phone
        const phoneDisplay = document.getElementById('profile-phone-display');
        const phoneText = document.getElementById('profile-phone-text');
        if (phoneDisplay && phoneText) {
            if (userData.phone) { phoneText.textContent = userData.phone; phoneDisplay.style.display = 'flex'; }
            else phoneDisplay.style.display = 'none';
        }

        // DOB display
        const dobDisplay = document.getElementById('profile-dob-display');
        const dobText = document.getElementById('profile-dob-text');
        if (dobDisplay && dobText) {
            if (userData.dob) { dobText.textContent = formatDOB(userData.dob); dobDisplay.style.display = 'flex'; }
            else dobDisplay.style.display = 'none';
        }

        // Education display
        const eduDisplay = document.getElementById('profile-education-display');
        const eduText = document.getElementById('profile-education-text');
        if (eduDisplay && eduText) {
            if (userData.education) { eduText.textContent = userData.education; eduDisplay.style.display = 'flex'; }
            else eduDisplay.style.display = 'none';
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

        const timelineEl = document.getElementById('display-timeline');
        if (timelineEl) timelineEl.textContent = userData.timeline || 'Not set';
        const hoursEl = document.getElementById('display-hours');
        if (hoursEl) hoursEl.textContent = userData.weeklyHours ? `${userData.weeklyHours} hrs/week` : 'Not set';

        // Skills
        const skillsContainer = document.getElementById('profile-skills-container');
        if (skillsContainer) {
            let skills = Array.isArray(userData.skills) ? userData.skills : [];
            if (!skills.length) {
                try { skills = JSON.parse(localStorage.getItem('userSkills') || '[]'); } catch (e) {}
            }
            if (skills.length > 0) {
                skillsContainer.innerHTML = skills.map(s => `<span class="skill-pill-item">${s}</span>`).join('');
            } else {
                skillsContainer.innerHTML = `
                    <div class="no-skills-state">
                        <i class="fas fa-layer-group"></i>
                        <span>No skills added yet. Complete onboarding.</span>
                    </div>`;
            }
        }

        // Stats Row: populated by fetchAndRenderStats() which fetches live data from the server.
        // Values are NOT read from localStorage here to prevent stale data.

        // Interests
        const interestsContainer = document.getElementById('profile-interests-container');
        if (interestsContainer) {
            const interests = Array.isArray(userData.interests) ? userData.interests : [];
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

        // Goals
        const goalEl = document.getElementById('display-goal');
        const timelineGEl = document.getElementById('display-timeline-goal');
        const hoursGEl = document.getElementById('display-hours-goal');
        if (goalEl) goalEl.textContent = userData.careerGoal || 'Not set - complete onboarding';
        if (timelineGEl) timelineGEl.textContent = userData.timeline || 'Not set';
        if (hoursGEl) hoursGEl.textContent = userData.weeklyHours ? `${userData.weeklyHours} hrs/week` : 'Not set';

        // Sidebar sync
        const sidebarName = document.getElementById('user-display-name');
        if (sidebarName) sidebarName.textContent = name;
        const sidebarAvatar = document.getElementById('user-avatar');
        if (sidebarAvatar) {
            if (userData.avatar) sidebarAvatar.innerHTML = `<img src="${userData.avatar}" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`;
            else sidebarAvatar.textContent = initials;
        }
        
        // Subscription & Email Reports
        const subPlan = document.getElementById('display-sub-plan');
        const subActionRow = document.getElementById('sub-action-row');
        if (subPlan && subActionRow) {
            if (typeof window.XyIsPro === 'function' && window.XyIsPro()) {
                subPlan.textContent = 'PRO';
                subPlan.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
                subActionRow.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem; margin: 0;">You have access to all premium features.</p>';
            } else {
                subPlan.textContent = 'Free';
                subPlan.style.background = 'var(--primary)';
                subActionRow.innerHTML = '<button class="btn btn-primary" style="width: 100%;" onclick="window.location.href=\'subscription.html\'">Upgrade to Pro</button>';
            }
        }
        
        const emailToggle = document.getElementById('email-report-toggle');
        const emailToggleKnob = document.getElementById('email-report-toggle-knob');
        if (emailToggle && emailToggleKnob) {
            // Remove old listener to avoid duplicate bindings if renderProfile runs multiple times
            const newToggle = emailToggle.cloneNode(true);
            emailToggle.parentNode.replaceChild(newToggle, emailToggle);
            const newKnob = newToggle.querySelector('#email-report-toggle-knob');
            
            const isEmailEnabled = userData.emailReportsEnabled || false;
            newToggle.dataset.active = isEmailEnabled ? 'true' : 'false';
            newToggle.style.background = isEmailEnabled ? 'var(--primary)' : 'var(--border)';
            newKnob.style.left = isEmailEnabled ? '20px' : '2px';
            
            newToggle.addEventListener('click', () => {
                if (typeof window.XyRequirePro === 'function' && !window.XyRequirePro('Email Progress Reports')) return;
                
                const isActive = newToggle.dataset.active === 'true';
                const newState = !isActive;
                
                // Optimistic UI update
                newToggle.dataset.active = String(newState);
                newToggle.style.background = newState ? 'var(--primary)' : 'var(--border)';
                newKnob.style.left = newState ? '20px' : '2px';
                
                saveToServer({ emailReportsEnabled: newState });
            });
        }
    };

    // ── Save to Backend ──
    const saveToServer = async (updates) => {
        try {
            const response = await fetch(`${API_BASE}/api/user/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });

            if (response.ok) {
                let updated = {};
                try { updated = await response.json(); } catch (e) {}
                userData = {
                    ...userData,
                    ...updates,
                    name: updated.name || updates.name || userData.name,
                    email: updated.email || userData.email, // email never changes via profile update
                    phone: updated.phoneNumber || updates.phoneNumber || userData.phone,
                    avatar: updated.profilePicture || updates.profilePicture || userData.avatar
                };
                syncLocalStorage();
                renderProfile();
                showToast('Profile updated successfully!', 'success');
                return true;
            } else {
                let err = {};
                try { err = await response.json(); } catch (e) {}
                showToast(err.message || 'Failed to update profile.', 'error');
                return false;
            }
        } catch (error) {
            // Offline / server unreachable: persist locally so edits are not lost
            console.error("Save error:", error);
            userData = { ...userData, ...updates };
            syncLocalStorage();
            renderProfile();
            showToast('Saved locally (server unreachable).', 'info');
            return true;
        }
    };

    // ── Validation helpers ──
    const setFieldError = (errId, inputId, msg) => {
        const errEl = document.getElementById(errId);
        const inputEl = inputId ? document.getElementById(inputId) : null;
        if (errEl) {
            if (msg) { errEl.textContent = msg; errEl.classList.add('show'); }
            else { errEl.textContent = ''; errEl.classList.remove('show'); }
        }
        if (inputEl) {
            if (msg) inputEl.classList.add('invalid');
            else inputEl.classList.remove('invalid');
        }
    };

    const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    // optional, 7-15 digits, allows +, spaces, dashes, parens
    const isValidPhone = (p) => /^[+]?[\d\s\-()]{7,20}$/.test(p) && (p.replace(/\D/g, '').length >= 7 && p.replace(/\D/g, '').length <= 15);

    const validateDOB = (dobStr) => {
        if (!dobStr) return null; // optional
        const dob = new Date(dobStr + 'T00:00:00');
        if (isNaN(dob.getTime())) return 'Invalid date.';
        const today = new Date(); today.setHours(0, 0, 0, 0);
        if (dob > today) return 'Date of birth cannot be in the future.';
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
        if (age < 13) return 'You must be at least 13 years old.';
        if (age > 120) return 'Please enter a valid date of birth (age over 120).';
        return null;
    };

    // ── Pending avatar (data URL) before save ──
    let pendingAvatar = undefined; // undefined = unchanged, '' = remove, string = new

    // ── Build interest chips in modal ──
    let modalInterests = [];
    const renderInterestChips = () => {
        const wrap = document.getElementById('edit-interests-chips');
        if (!wrap) return;
        wrap.innerHTML = INTEREST_OPTIONS.map(opt => {
            const sel = modalInterests.includes(opt) ? 'selected' : '';
            return `<button type="button" class="chip-option ${sel}" data-interest="${opt}">${opt}</button>`;
        }).join('');
        wrap.querySelectorAll('.chip-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const v = btn.getAttribute('data-interest');
                if (modalInterests.includes(v)) modalInterests = modalInterests.filter(x => x !== v);
                else modalInterests.push(v);
                btn.classList.toggle('selected');
            });
        });
    };

    const updateAvatarPreview = () => {
        const prev = document.getElementById('edit-avatar-preview');
        if (!prev) return;
        const initials = (userData.name || 'U').trim().substring(0, 2).toUpperCase() || 'U';
        const src = (pendingAvatar !== undefined) ? pendingAvatar : userData.avatar;
        if (src) prev.innerHTML = `<img src="${src}" alt="preview">`;
        else prev.textContent = initials;
    };

    // ── Open / close Edit Profile Modal ──
    const editProfileModal = document.getElementById('edit-profile-modal');

    const openEditModal = () => {
        document.getElementById('edit-name').value = userData.name || '';
        document.getElementById('edit-email').value = userData.email || '';
        document.getElementById('edit-dob').value = userData.dob || '';
        
        // Max selectable date is today
        document.getElementById('edit-dob').max = new Date().toISOString().split('T')[0];
        
        document.getElementById('edit-level').value = userData.selectedLevel || 'Beginner';
        document.getElementById('edit-timeline').value = userData.timeline || '';
        document.getElementById('edit-hours').value = userData.weeklyHours || '';

        // reset errors
        ['err-name', 'err-email', 'err-dob', 'err-photo'].forEach(id => {
            const el = document.getElementById(id); if (el) el.classList.remove('show');
        });
        document.querySelectorAll('#edit-profile-modal .form-control').forEach(i => i.classList.remove('invalid'));
        document.getElementById('email-reverify-note').style.display = 'none';

        pendingAvatar = undefined;
        updateAvatarPreview();

        modalInterests = Array.isArray(userData.interests) ? [...userData.interests] : [];
        renderInterestChips();

        editProfileModal.classList.add('active');
    };

    const closeEditModal = () => editProfileModal.classList.remove('active');

    document.getElementById('edit-profile-btn')?.addEventListener('click', openEditModal);
    document.getElementById('edit-profile-btn-2')?.addEventListener('click', openEditModal);
    document.getElementById('edit-interests-btn')?.addEventListener('click', openEditModal);
    document.getElementById('edit-goals-btn')?.addEventListener('click', openEditModal);
    document.getElementById('close-profile-modal')?.addEventListener('click', closeEditModal);
    document.getElementById('cancel-profile-btn')?.addEventListener('click', closeEditModal);
    editProfileModal?.addEventListener('click', (e) => { if (e.target === editProfileModal) closeEditModal(); });

    // Email re-verification notice
    document.getElementById('edit-email')?.addEventListener('input', (e) => {
        const note = document.getElementById('email-reverify-note');
        if (note) note.style.display = (e.target.value.trim().toLowerCase() !== (userData.email || '').toLowerCase()) ? 'block' : 'none';
    });

    // ── Profile Picture: file pick (from modal button, hidden input, and avatar click) ──
    const fileInput = document.getElementById('avatar-file-input');

    const handleFile = (file) => {
        setFieldError('err-photo', null, null);
        if (!file) return;
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            setFieldError('err-photo', null, 'Only PNG, JPG, WEBP or GIF images are allowed.');
            showToast('Invalid image type.', 'error');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setFieldError('err-photo', null, 'Image must be 2MB or smaller.');
            showToast('Image too large (max 2MB).', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            pendingAvatar = ev.target.result; // base64 data URL
            updateAvatarPreview();
            // If triggered from avatar click (modal closed), open modal so user can save/cancel
            if (!editProfileModal.classList.contains('active')) openEditModal();
            updateAvatarPreview();
        };
        reader.onerror = () => setFieldError('err-photo', null, 'Could not read the image file.');
        reader.readAsDataURL(file);
    };

    fileInput?.addEventListener('change', (e) => {
        handleFile(e.target.files && e.target.files[0]);
        e.target.value = ''; // allow re-picking same file
    });

    document.getElementById('edit-pick-photo-btn')?.addEventListener('click', () => fileInput?.click());
    document.getElementById('profile-avatar')?.addEventListener('click', () => fileInput?.click());
    document.getElementById('edit-remove-photo-btn')?.addEventListener('click', () => {
        pendingAvatar = '';
        updateAvatarPreview();
    });

    // ── Save Profile ──
    const saveProfileBtn = document.getElementById('save-profile-btn');
    saveProfileBtn?.addEventListener('click', async () => {
        const name = document.getElementById('edit-name').value.trim();
        const email = document.getElementById('edit-email').value.trim();
        const dob = document.getElementById('edit-dob').value;
        const selectedLevel = document.getElementById('edit-level').value;
        const timeline = document.getElementById('edit-timeline').value;
        const weeklyHours = document.getElementById('edit-hours').value;

        // clear errors
        ['err-name', 'err-email', 'err-dob'].forEach(id => {
            document.getElementById(id)?.classList.remove('show');
        });

        let valid = true;

        if (!name) { setFieldError('err-name', 'edit-name', 'Full name is required.'); valid = false; }
        else if (name.length < 2) { setFieldError('err-name', 'edit-name', 'Name must be at least 2 characters.'); valid = false; }
        else setFieldError('err-name', 'edit-name', null);

        if (!email) { setFieldError('err-email', 'edit-email', 'Email is required.'); valid = false; }
        else if (!isValidEmail(email)) { setFieldError('err-email', 'edit-email', 'Enter a valid email address.'); valid = false; }
        else setFieldError('err-email', 'edit-email', null);

        const dobErr = validateDOB(dob);
        if (dobErr) { setFieldError('err-dob', 'edit-dob', dobErr); valid = false; }
        else setFieldError('err-dob', 'edit-dob', null);

        if (!valid) {
            showToast('Please fix the highlighted fields.', 'error');
            return;
        }

        const updates = {
            name,
            dob,
            selectedLevel,
            timeline,
            weeklyHours,
            interests: [...modalInterests]
        };
        // Note: email changes are excluded — email changes require re-verification flow
        if (pendingAvatar !== undefined) updates.profilePicture = pendingAvatar; // map frontend 'avatar' to backend 'profilePicture'

        saveProfileBtn.disabled = true;
        const original = saveProfileBtn.innerHTML;
        saveProfileBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        const success = await saveToServer(updates);

        saveProfileBtn.disabled = false;
        saveProfileBtn.innerHTML = original;

        if (success) {
            pendingAvatar = undefined;
            closeEditModal();
        }
    });

    // ── Change Password Modal ──
    const changePasswordModal = document.getElementById('change-password-modal');
    const savePasswordBtn = document.getElementById('save-password-btn');
    const passwordAlert = document.getElementById('password-alert');

    const showAlert = (msg, isError = true) => {
        if (!passwordAlert) return;
        passwordAlert.textContent = msg;
        passwordAlert.style.display = 'block';
        passwordAlert.style.backgroundColor = isError ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)';
        passwordAlert.style.color = isError ? '#ef4444' : 'var(--success)';
    };

    document.getElementById('change-password-btn')?.addEventListener('click', () => {
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
        if (passwordAlert) passwordAlert.style.display = 'none';
        changePasswordModal.classList.add('active');
    });

    document.getElementById('close-password-modal')?.addEventListener('click', () => changePasswordModal.classList.remove('active'));
    changePasswordModal?.addEventListener('click', (e) => { if (e.target === changePasswordModal) changePasswordModal.classList.remove('active'); });

    savePasswordBtn?.addEventListener('click', async () => {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (passwordAlert) passwordAlert.style.display = 'none';

        if (!currentPassword || !newPassword || !confirmPassword) return showAlert('All fields are required.');
        if (newPassword.length < 6) return showAlert('New password must be at least 6 characters.');
        if (newPassword !== confirmPassword) return showAlert('New passwords do not match.');

        savePasswordBtn.disabled = true;
        savePasswordBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';

        try {
            const response = await fetch(`${API_BASE}/api/user/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });
            if (response.ok) {
                showAlert('Password updated successfully!', false);
                showToast('Password updated.', 'success');
                setTimeout(() => changePasswordModal.classList.remove('active'), 1500);
            } else {
                let err = {};
                try { err = await response.json(); } catch (e) {}
                showAlert(err.message || 'Failed to update password.');
            }
        } catch {
            showAlert('Connection error. Please try again.');
        } finally {
            savePasswordBtn.disabled = false;
            savePasswordBtn.innerHTML = 'Update Password';
        }
    });

    // ═══════════════════════════════════════════════════════════════
    // STAT CARDS — Server-driven, live data only
    // ═══════════════════════════════════════════════════════════════
    //
    // Root causes fixed:
    //  - Total XP: was reading 'xyverra_xp' (only set on login). Now reads
    //    'experienceRank' directly from /api/user/me response.
    //  - Day Streak: was reading stale 'xyverra_user_streak'. Now reads
    //    'dailyStreak' from DB.
    //  - Roadmap Done: was using hardcoded `completedModules.length / 5`
    //    (wrong formula, wrong divisor). Now matches against the user's actual
    //    roadmap using ROADMAP_DATA, identical to Dashboard logic.
    //  - Career Readiness Score: was reading 'xyverra_skill_score' (never
    //    written anywhere!). Now reads 'readinessScore' recomputed server-side
    //    by readiness.js via /api/user/me.
    //
    const fetchAndRenderStats = async () => {
        try {
            const resp = await fetch(`${API_BASE}/api/user/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!resp.ok) return;
            const data = await resp.json();
            if (!data.success || !data.user) return;
            const u = data.user;

            // — Sync localStorage so other pages that read it stay consistent —
            if (typeof u.experienceRank === 'number') localStorage.setItem('xyverra_xp', String(u.experienceRank));
            if (typeof u.dailyStreak === 'number')    localStorage.setItem('xyverra_user_streak', String(u.dailyStreak));
            if (typeof u.readinessScore === 'number') localStorage.setItem('xyverra_readiness_score', String(u.readinessScore));
            if (Array.isArray(u.completedModules))    localStorage.setItem('completedModules', JSON.stringify(u.completedModules));

            // — Compute Roadmap Progress with the exact same logic as Dashboard —
            let progressPct = 0;
            const completedModules = Array.isArray(u.completedModules) ? u.completedModules : [];
            const selectedPath = u.selectedPath || '';
            let totalSteps = 12;
            let completedCount = 0;

            const matchedPathKey = (typeof ROADMAP_DATA !== 'undefined' && window.resolveRoadmapPathKey)
                ? window.resolveRoadmapPathKey(selectedPath)
                : selectedPath;

            if (typeof ROADMAP_DATA !== 'undefined' && ROADMAP_DATA[matchedPathKey]) {
                const pathData = ROADMAP_DATA[matchedPathKey];
                totalSteps = pathData.length;
                completedCount = pathData.filter(m => completedModules.includes(m.id)).length;
            } else {
                completedCount = completedModules.length;
            }

            progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

            // — Populate the four cards —
            const statXp      = document.getElementById('stat-xp');
            const statStreak  = document.getElementById('stat-streak');
            const statRoadmap = document.getElementById('stat-roadmap');
            const statScore   = document.getElementById('stat-score');

            if (statXp)      statXp.textContent      = (u.experienceRank || 0).toLocaleString();
            if (statStreak)  statStreak.textContent   = u.dailyStreak || 0;
            if (statRoadmap) statRoadmap.textContent  = progressPct + '%';
            if (statScore)   statScore.textContent    = u.readinessScore || 0;

        } catch (err) {
            // Offline fallback: best-effort from localStorage
            console.warn('Profile stats: server unreachable, using cached values.', err.message);
            const statXp      = document.getElementById('stat-xp');
            const statStreak  = document.getElementById('stat-streak');
            const statRoadmap = document.getElementById('stat-roadmap');
            const statScore   = document.getElementById('stat-score');
            if (statXp)      statXp.textContent      = parseInt(localStorage.getItem('xyverra_xp') || '0', 10).toLocaleString();
            if (statStreak)  statStreak.textContent   = parseInt(localStorage.getItem('xyverra_user_streak') || '0', 10);
            if (statScore)   statScore.textContent    = parseInt(localStorage.getItem('xyverra_readiness_score') || '0', 10);
            try {
                // Try to derive progress if possible, otherwise fallback to 0%
                if (statRoadmap) statRoadmap.textContent = '0%';
            } catch (e) {}
        }
    };

    // ── Real-time cross-page sync via storage events ──
    // When the user completes a lesson/quiz on the Study or Roadmap page (in another
    // tab or after navigating back), those pages write updated values to localStorage.
    // The 'storage' event fires on all other open tabs so the Profile cards update
    // immediately without a page refresh.
    const STAT_KEYS = new Set([
        'xyverra_xp', 'xyverra_user_streak', 'xyverra_readiness_score',
        'completedModules', 'xyverra_quiz_scores'
    ]);
    window.addEventListener('storage', (e) => {
        if (STAT_KEYS.has(e.key)) {
            // Re-fetch from server to always display the authoritative DB value
            fetchAndRenderStats();
        }
    });

    // ── Initial Load ──
    // fetchUserProfile renders the profile card/text data immediately.
    // fetchAndRenderStats is called separately (and in parallel) so the stat
    // cards are populated with live server values as soon as /api/user/me responds.
    await fetchUserProfile();
    fetchAndRenderStats();
});
