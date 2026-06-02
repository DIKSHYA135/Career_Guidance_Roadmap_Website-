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

    // ── Modals Logic ──
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const closeProfileModal = document.getElementById('close-profile-modal');
    const saveProfileBtn = document.getElementById('save-profile-btn');

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            document.getElementById('edit-name').value = userData.name || "";
            document.getElementById('edit-skills').value = (userData.skills || []).join(', ');
            editProfileModal.classList.add('active');
        });
    }

    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', () => editProfileModal.classList.remove('active'));
    }

    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', async () => {
            const name = document.getElementById('edit-name').value.trim();
            const skillsRaw = document.getElementById('edit-skills').value;
            const skills = skillsRaw.split(',').map(s => s.trim()).filter(s => s !== "");
            
            saveProfileBtn.disabled = true;
            saveProfileBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

            const success = await saveToServer({ name, skills });
            
            if (success) {
                editProfileModal.classList.remove('active');
            }
            
            saveProfileBtn.disabled = false;
            saveProfileBtn.innerHTML = 'Save Changes';
        });
    }

    // ── Learning Path Modal Logic ──
    const editLearningBtn = document.getElementById('edit-learning-btn');
    const editLearningModal = document.getElementById('edit-learning-modal');
    const closeLearningModal = document.getElementById('close-learning-modal');
    const saveLearningBtn = document.getElementById('save-learning-btn');

    if (editLearningBtn) {
        editLearningBtn.addEventListener('click', () => {
            document.getElementById('edit-category').value = userData.selectedPath || 'Web Development';
            document.getElementById('edit-level').value = userData.selectedLevel || 'Beginner';
            editLearningModal.classList.add('active');
        });
    }

    if (closeLearningModal) {
        closeLearningModal.addEventListener('click', () => editLearningModal.classList.remove('active'));
    }

    if (saveLearningBtn) {
        saveLearningBtn.addEventListener('click', async () => {
            const selectedPath = document.getElementById('edit-category').value;
            const selectedLevel = document.getElementById('edit-level').value;
            
            saveLearningBtn.disabled = true;
            saveLearningBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';

            const success = await saveToServer({ selectedPath, selectedLevel });
            
            if (success) {
                editLearningModal.classList.remove('active');
            }

            saveLearningBtn.disabled = false;
            saveLearningBtn.innerHTML = 'Update & Refresh Skills';
        });
    }

    // Initial Fetch
    await fetchUserProfile();
});
