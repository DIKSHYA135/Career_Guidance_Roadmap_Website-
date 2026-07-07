// profile.js Ã¢â‚¬â€ all profile fields editable with validation, avatar upload, interests, goals
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');
    const currentEmail = localStorage.getItem('xyverra_user_email');

    if (!token || !currentEmail) {
        window.location.href = 'login.html';
        return;
    }

    const API_BASE = 'http://localhost:5000';

    // Master list of selectable interests
    const INTEREST_OPTIONS = [
        'Web Development', 'Mobile Apps', 'Data Science', 'Machine Learning',
        'Artificial Intelligence', 'Cloud Computing', 'DevOps', 'Cybersecurity',
        'UI/UX Design', 'Game Development', 'Blockchain', 'IoT',
        'Backend Engineering', 'Frontend Engineering', 'Data Analytics',
        'Product Management', 'Startups', 'Open Source'
    ];

    // Ã¢â€â‚¬Ã¢â€â‚¬ Toast helper (self-contained) Ã¢â€â‚¬Ã¢â€â‚¬
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

    // Ã¢â€â‚¬Ã¢â€â‚¬ Fetch Profile from Backend Ã¢â€â‚¬Ã¢â€â‚¬
    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/user/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                userData = {
                    name: data.name || userData.name,
                    email: data.email || userData.email,
                    // Backend stores phoneNumber, frontend uses phone internally
                    phone: (data.phoneNumber !== undefined && data.phoneNumber !== null) ? data.phoneNumber
                         : (data.phone !== undefined && data.phone !== null) ? data.phone
                         : userData.phone,
                    dob: data.dob || userData.dob,
                    education: data.education !== undefined && data.education !== null ? data.education : userData.education,
                    // Backend stores profilePicture, frontend uses avatar internally
                    avatar: data.profilePicture || data.avatar || userData.avatar,
                    skills: data.skills || [],
                    selectedPath: data.selectedPath || userData.selectedPath,
                    selectedLevel: data.selectedLevel || userData.selectedLevel,
                    createdAt: data.createdAt || null,
                    interests: (data.interests && data.interests.length) ? data.interests
                              : (data.careerInterests && data.careerInterests.length) ? data.careerInterests
                              : userData.interests,
                    careerGoal: data.careerGoal !== undefined ? data.careerGoal : userData.careerGoal,
                    timeline: data.timeline !== undefined ? data.timeline : userData.timeline,
                    weeklyHours: data.weeklyHours !== undefined ? data.weeklyHours : userData.weeklyHours,
                    emailVerified: data.emailVerified || false,
                    emailReportsEnabled: data.emailReportsEnabled || false
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

    // Ã¢â€â‚¬Ã¢â€â‚¬ Format DOB for display Ã¢â€â‚¬Ã¢â€â‚¬
    const formatDOB = (dobStr) => {
        if (!dobStr) return '';
        try {
            const d = new Date(dobStr + 'T00:00:00');
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch {
            return dobStr;
        }
    };

    // Ã¢â€â‚¬Ã¢â€â‚¬ Render avatar (image or initials) into an element Ã¢â€â‚¬Ã¢â€â‚¬
    const renderAvatarInto = (el, initials, asImg) => {
        if (!el) return;
        if (userData.avatar) {
            el.innerHTML = `<img src="${userData.avatar}" alt="avatar">`;
        } else {
            el.textContent = initials;
        }
    };

    // Ã¢â€â‚¬Ã¢â€â‚¬ Render Profile UI Ã¢â€â‚¬Ã¢â€â‚¬
    const renderProfile = () => {
        const name = userData.name || 'User';
        const initials = name.trim().substring(0, 2).toUpperCase() || 'U';

        // Avatar (large) Ã¢â‚¬â€ preserve the upload overlay
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

        // Stats Row
        const xp = parseInt(localStorage.getItem('xyverra_xp') || '0', 10);
        const streak = parseInt(localStorage.getItem('xyverra_user_streak') || '0', 10);
        const score = parseInt(localStorage.getItem('xyverra_skill_score') || '0', 10);
        let roadmapPct = 0;
        try {
            const completed = JSON.parse(localStorage.getItem('completedModules') || '[]');
            roadmapPct = Math.min(Math.round((completed.length / 5) * 100), 100);
        } catch (e) {}
        const statXp = document.getElementById('stat-xp');
        const statStreak = document.getElementById('stat-streak');
        const statRoadmap = document.getElementById('stat-roadmap');
        const statScore = document.getElementById('stat-score');
        if (statXp) statXp.textContent = xp.toLocaleString();
        if (statStreak) statStreak.textContent = streak;
        if (statRoadmap) statRoadmap.textContent = `${roadmapPct}%`;
        if (statScore) statScore.textContent = score;

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

    // Ã¢â€â‚¬Ã¢â€â‚¬ Save to Backend Ã¢â€â‚¬Ã¢â€â‚¬
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

    // Ã¢â€â‚¬Ã¢â€â‚¬ Validation helpers Ã¢â€â‚¬Ã¢â€â‚¬
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

    // Ã¢â€â‚¬Ã¢â€â‚¬ Pending avatar (data URL) before save Ã¢â€â‚¬Ã¢â€â‚¬
    let pendingAvatar = undefined; // undefined = unchanged, '' = remove, string = new

    // Ã¢â€â‚¬Ã¢â€â‚¬ Build interest chips in modal Ã¢â€â‚¬Ã¢â€â‚¬
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

    // Ã¢â€â‚¬Ã¢â€â‚¬ Open / close Edit Profile Modal Ã¢â€â‚¬Ã¢â€â‚¬
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

    // Ã¢â€â‚¬Ã¢â€â‚¬ Profile Picture: file pick (from modal button, hidden input, and avatar click) Ã¢â€â‚¬Ã¢â€â‚¬
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

    // Ã¢â€â‚¬Ã¢â€â‚¬ Save Profile Ã¢â€â‚¬Ã¢â€â‚¬
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

    // Ã¢â€â‚¬Ã¢â€â‚¬ Change Password Modal Ã¢â€â‚¬Ã¢â€â‚¬
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

    // Ã¢â€â‚¬Ã¢â€â‚¬ Initial Load Ã¢â€â‚¬Ã¢â€â‚¬
    await fetchUserProfile();
});
