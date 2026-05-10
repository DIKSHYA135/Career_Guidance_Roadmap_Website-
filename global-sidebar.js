/* ==========================================================
   global-sidebar.js — Shared sidebar logic for all pages
   Runs on every dashboard-layout page.
   TODO: Replace localStorage reads with GET /api/user/me
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Mobile Sidebar Toggle ────────────────────────────
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebarMenu      = document.getElementById('sidebar-menu');
    const sidebarOverlay   = document.getElementById('sidebar-overlay');

    if (sidebarToggleBtn && sidebarMenu && sidebarOverlay) {
        sidebarToggleBtn.addEventListener('click', () => {
            sidebarMenu.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        sidebarOverlay.addEventListener('click', closeSidebar);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });
    }

    function closeSidebar() {
        sidebarMenu?.classList.remove('active');
        sidebarOverlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ── 2. Populate User Info ───────────────────────────────
    // TODO: Replace with GET /api/user/me → { name, role, avatarInitials }
    const userName  = localStorage.getItem('xyverra_user_name') || 'Guest User';
    const userRole  = localStorage.getItem('xyverra_user_role') || 'Learner';
    const initials  = userName.split(' ').map(n => n[0] || '').join('').substring(0, 2).toUpperCase() || 'GU';

    // Avatar initials
    document.querySelectorAll('#user-avatar').forEach(el => {
        el.textContent = initials;
    });

    // Display name
    document.querySelectorAll('#user-display-name').forEach(el => {
        el.textContent = userName;
    });

    // Role subtitle
    document.querySelectorAll('#user-role, .profile-text p').forEach(el => {
        // Don't overwrite if it has a real inline style (old hardcoded pages)
        if (!el.getAttribute('style') || el.id === 'user-role') {
            el.textContent = userRole;
        }
    });

    // Dashboard welcome message
    const welcomeStrong = document.querySelector('header.dashboard-header p strong');
    if (welcomeStrong) welcomeStrong.textContent = userName;

    // ── 3. Sign Out ─────────────────────────────────────────
    // TODO: Call POST /api/auth/logout before clearing storage
    document.querySelectorAll('.signout-btn, #signout-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            // Clear all app state
            const keysToRemove = [
                'xyverra_user_name', 'xyverra_user_role', 'xyverra_selected_path',
                'userLevel', 'userSkills', 'completedModules', 'xyverra_skill_score',
                'xyverra_user'
            ];
            keysToRemove.forEach(k => localStorage.removeItem(k));
            // Fade out then redirect
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.25s ease';
            setTimeout(() => { window.location.href = 'login.html'; }, 260);
        });
    });

    // ── 4. Active Nav Item ──────────────────────────────────
    const currentFile = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href') || '';
        if (href && currentFile === href) {
            item.classList.add('active');
        }
        // Root path → dashboard
        if ((currentFile === '' || currentFile === 'index.html') && href === 'dashboard.html') {
            item.classList.add('active');
        }
    });

    // ── 5. Smooth Page Transitions ──────────────────────────
    document.querySelectorAll('.nav-item[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href.startsWith('javascript:')) return;
        link.addEventListener('click', e => {
            if (currentFile === href) return; // already here
            e.preventDefault();
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.22s ease';
            setTimeout(() => { window.location.href = href; }, 230);
        });
    });

    // Also handle quiz back link
    document.querySelectorAll('.quiz-back-link[href]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const href = link.getAttribute('href');
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.22s ease';
            setTimeout(() => { window.location.href = href; }, 230);
        });
    });

    // ── 6. Utility: "Go to Skills" button ──────────────────
    const goToSkillsBtn = document.getElementById('go-to-skills-btn');
    if (goToSkillsBtn) {
        goToSkillsBtn.addEventListener('click', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.22s ease';
            setTimeout(() => { window.location.href = 'skills.html'; }, 230);
        });
    }

    // ── 7. Prevent broken # links ───────────────────────────
    document.querySelectorAll('a[href="#"], a[href=""]').forEach(link => {
        link.addEventListener('click', e => e.preventDefault());
    });

    // ── 8. Fade in on page load ─────────────────────────────
    document.body.style.opacity = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }));
});
