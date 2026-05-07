// Progress Tracker JS
document.addEventListener("DOMContentLoaded", () => {
    // Basic sign out
    const signoutBtn = document.querySelector('.signout');
    if (signoutBtn) {
        signoutBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // You can dynamically update the tracker here based on `localStorage`
    const path = localStorage.getItem('Xyverra_selected_path');
    if(path) {
        // e.g. change some text to reflect the path
        // document.querySelector('.page-header p').textContent = `Tracking progress for ${path}`;
    }
});
