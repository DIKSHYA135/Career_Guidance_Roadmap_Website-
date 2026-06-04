// profile.js
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');
    const currentEmail = localStorage.getItem('xyverra_user_email');

    if (!token || !currentEmail) {
        window.location.href = 'login.html';
        return;
    }

    let userData = {
        name: localStorage.getItem('xyverra_user_name') || 'User',
        email: currentEmail,
        phone: localStorage.getItem('xyverra_user_phone') || '',
        dob: localStorage.getItem('xyverra_user_dob') || '',
        skills: [],
        selectedPath: 'Web Development',
        selectedLevel: 'Beginner'
    };

    // ── Fetch Current User Data from Backend ──
    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                userData = {
                    ...userData,
                    name: data.name || userData.name,
                    email: data.email || userData.email,
                    phone: data.phone || userData.phone,
                    dob: data.dob || userData.dob,
                    skills: data.skills || [],
                    selectedPath: data.selectedPath || userData.selectedPath,
                    selectedLevel: data.selectedLevel || userData.selectedLevel
                };
                renderProfile();
                updatePathDisplay();
            } else {
                console.error("Failed to fetch profile from server");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    // ── Render Profile UI ──
    const renderProfile = () => {
        const name = userData.name || "User Name";
        const initials = name.substring(0, 2).toUpperCase();
        
        const avatarEl = document.getElementById('profile-avatar');
        if (avatarEl) avatarEl.textContent = initials;
        
        const nameEl = document.getElementById('profile-name');
        if (nameEl) nameEl.textContent = name;
        
        const emailEl = document.getElementById('profile-email');
        if (emailEl) emailEl.innerHTML = `<i class="fas fa-envelope"></i> ${userData.email}`;

        const phoneEl = document.getElementById('profile-phone');
        if (phoneEl) phoneEl.innerHTML = `<i class="fas fa-phone-alt" style="color: var(--primary); margin-right: 6px;"></i> ${userData.phone || 'Not provided'}`;

        const dobEl = document.getElementById('profile-dob');
        if (dobEl) dobEl.innerHTML = `<i class="fas fa-birthday-cake" style="color: var(--primary); margin-right: 6px;"></i> ${userData.dob || 'Not provided'}`;

        // Render skills
        const skillsContainer = document.getElementById('profile-skills-container');
        if (skillsContainer) {
            let actualSkills = userData.skills || [];
            if (!actualSkills.length) {
                try {
                    actualSkills = JSON.parse(localStorage.getItem('userSkills') || '[]');
                } catch(e){}
            }
            if (actualSkills.length > 0) {
                skillsContainer.innerHTML = actualSkills.map(s => 
                    `<span style="background: rgba(37,99,235,0.1); color: var(--primary); padding: 4px 12px; border-radius: 999px; font-size: 0.85rem; font-weight: 600;">${s}</span>`
                ).join('');
            } else {
                skillsContainer.innerHTML = '<span style="color: var(--text-muted); font-style: italic; font-size: 0.95rem;">No skills added yet. Manage them on the Skills page.</span>';
            }
        }

        // Also update sidebar if global-sidebar.js hasn't done it
        const sidebarName = document.getElementById('user-display-name');
        if (sidebarName) sidebarName.textContent = name;
        const sidebarAvatar = document.getElementById('user-avatar');
        if (sidebarAvatar) sidebarAvatar.textContent = initials;
    };

    const updatePathDisplay = () => {
        const catEl = document.getElementById('display-category');
        if (catEl) catEl.textContent = userData.selectedPath || 'Not Selected';
        const lvlEl = document.getElementById('display-level');
        if (lvlEl) lvlEl.textContent = userData.selectedLevel || 'Beginner';
    };

    // ── Save Helpers ──
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
                const updatedData = await response.json();
                userData = { ...userData, ...updatedData };
                
                // Sync localStorage
                localStorage.setItem('xyverra_user_name', userData.name);
                localStorage.setItem('xyverra_user_email', userData.email);
                localStorage.setItem('xyverra_user_phone', userData.phone || '');
                localStorage.setItem('xyverra_user_dob', userData.dob || '');
                localStorage.setItem('xyverra_selected_path', userData.selectedPath);
                localStorage.setItem('userLevel', userData.selectedLevel);
                localStorage.setItem('userSkills', JSON.stringify(userData.skills));

                renderProfile();
                updatePathDisplay();

                if (typeof showToast === 'function') {
                    showToast('Profile updated successfully!', 'success');
                } else {
                    alert('Profile updated successfully!');
                }
                return true;
            } else {
                const err = await response.json();
                alert(err.message || "Failed to update profile.");
                return false;
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Connection error. Could not save to server.");
            return false;
        }
    };

    // ── Unified Modal Logic ──
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const closeProfileModal = document.getElementById('close-profile-modal');
    const saveProfileBtn = document.getElementById('save-profile-btn');

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            document.getElementById('edit-name').value = userData.name || "";
            document.getElementById('edit-email').value = userData.email || "";
            document.getElementById('edit-phone').value = userData.phone || "";
            document.getElementById('edit-dob').value = userData.dob || "";
            document.getElementById('edit-category').value = userData.selectedPath || "Web Development";
            document.getElementById('edit-level').value = userData.selectedLevel || "Beginner";
            document.getElementById('edit-password').value = "";
            
            editProfileModal.classList.add('active');
        });
    }

    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', () => editProfileModal.classList.remove('active'));
    }

    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', async () => {
            const name = document.getElementById('edit-name').value.trim();
            const email = document.getElementById('edit-email').value.trim();
            const phone = document.getElementById('edit-phone').value.trim();
            const dob = document.getElementById('edit-dob').value;
            const password = document.getElementById('edit-password').value;
            const selectedPath = document.getElementById('edit-category').value;
            const selectedLevel = document.getElementById('edit-level').value;
            
            saveProfileBtn.disabled = true;
            saveProfileBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

            const updates = { name, email, phone, dob, selectedPath, selectedLevel };
            if (password) updates.password = password;

            const success = await saveToServer(updates);
            
            if (success) {
                editProfileModal.classList.remove('active');
            }
            
            saveProfileBtn.disabled = false;
            saveProfileBtn.innerHTML = 'Save Changes';
        });
    }

    // Initial Fetch
    await fetchUserProfile();
});
