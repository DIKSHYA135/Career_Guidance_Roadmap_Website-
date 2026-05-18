// Dynamic User Profile update
document.addEventListener("DOMContentLoaded", () => {
    const userName = localStorage.getItem('xyverra_user_name');
    
    if (userName) {
        // Update display name
        const displayNameEl = document.getElementById('user-display-name');
        if (displayNameEl) {
            displayNameEl.textContent = userName;
        }
        
        // Get initials
        const nameParts = userName.split(' ').filter(Boolean);
        let initials = 'U';
        if (nameParts.length > 1) {
            initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
        } else if (nameParts.length === 1) {
            initials = nameParts[0].substring(0, 2).toUpperCase();
        }
        
        // Update avatar
        const avatarEl = document.getElementById('user-avatar');
        if (avatarEl) {
            avatarEl.textContent = initials;
        }
    }
    
    // Global sign out
    const signoutBtn = document.querySelector('.signout');
    if (signoutBtn) {
        signoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Clear all user data from localStorage
            localStorage.removeItem('xyverra_token');
            localStorage.removeItem('xyverra_user_name');
            localStorage.removeItem('xyverra_user_email');
            localStorage.removeItem('xyverra_user_id');
            localStorage.removeItem('xyverra_selected_path');
            
            window.location.href = 'login.html';
        });
    }
});
