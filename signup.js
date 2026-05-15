// Signup JS
document.addEventListener("DOMContentLoaded", () => {
    // ── Password visibility toggle ──
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('signup-password');
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const isText = passwordInput.type === 'text';
            passwordInput.type = isText ? 'password' : 'text';
            toggleBtn.className = isText
                ? 'far fa-eye eye-icon'
                : 'far fa-eye-slash eye-icon';
        });
    }

    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('signup-name');
            const emailInput = document.getElementById('signup-email');
            if (nameInput && nameInput.value && emailInput && emailInput.value) {
                const name = nameInput.value;
                const email = emailInput.value;

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
                        streak: localStorage.getItem('xyverra_user_streak')
                    };
                    localStorage.setItem('xyverra_users', JSON.stringify(usersDataObj));
                }

                // ── 2. Clear current session data ──
                const keysToRemove = [
                    'xyverra_user_name', 'xyverra_user_role', 'xyverra_selected_path',
                    'userLevel', 'userSkills', 'completedModules', 'xyverra_skill_score',
                    'xyverra_user', 'xyverra_user_streak', 'xyverra_user_email'
                ];
                keysToRemove.forEach(k => localStorage.removeItem(k));

                // ── 3. Load user specific data or create new ──
                const usersData = JSON.parse(localStorage.getItem('xyverra_users')) || {};
                const userData = usersData[email];

                if (userData) {
                    // Restore existing user data
                    localStorage.setItem('xyverra_user_name', userData.name || name);
                    localStorage.setItem('xyverra_user_email', email);
                    if (userData.path) localStorage.setItem('xyverra_selected_path', userData.path);
                    if (userData.role) localStorage.setItem('xyverra_user_role', userData.role);
                    if (userData.level) localStorage.setItem('userLevel', userData.level);
                    if (userData.skills) localStorage.setItem('userSkills', userData.skills);
                    if (userData.modules) localStorage.setItem('completedModules', userData.modules);
                    if (userData.score) localStorage.setItem('xyverra_skill_score', userData.score);
                    if (userData.streak) localStorage.setItem('xyverra_user_streak', userData.streak);

                    window.location.href = userData.path ? 'dashboard.html' : 'path-selection.html';
                } else {
                    localStorage.setItem('xyverra_user_name', name);
                    localStorage.setItem('xyverra_user_email', email);
                    window.location.href = 'path-selection.html';
                }
            }
        });
    }

    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert("This feature is a mock in the frontend prototype.");
        });
    });
});
