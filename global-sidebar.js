document.addEventListener('DOMContentLoaded', () => {
    // ── Mobile Sidebar Toggle ──────────────────────────────────────────
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (sidebarToggleBtn && sidebarMenu && sidebarOverlay) {
        sidebarToggleBtn.addEventListener('click', () => {
            sidebarMenu.classList.add('active');
            sidebarOverlay.classList.add('active');
        });
        sidebarOverlay.addEventListener('click', () => {
            sidebarMenu.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }

    // ── Session Restore: Sidebar User Profile ─────────────────────────
    const userName = localStorage.getItem('xyverra_user_name') || 'Guest User';
    const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    document.querySelectorAll('#user-display-name').forEach(el => el.textContent = userName);
    document.querySelectorAll('#user-avatar').forEach(el => el.textContent = initials);

    // Remove static "Frontend Developer" role
    const roleText = userName === 'Guest User' ? 'Visitor' : 'Learner';
    document.querySelectorAll('.profile-text p').forEach(el => {
        el.textContent = roleText;
    });

    // Also update dashboard welcome message if present
    const welcomeName = document.querySelector('header.dashboard-header p strong');
    if (welcomeName) welcomeName.textContent = userName;

    // ── Sign Out Logic ────────────────────────────────────────────────
    document.querySelectorAll('.signout-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('xyverra_user_name');
            window.location.href = 'login.html';
        });
    });

    // ── Set Active Nav Item Dynamically ───────────────────────────────
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href && currentPath.includes(href)) {
            item.classList.add('active');
        }
        // Default: mark Dashboard active if at root
        if (href === 'dashboard.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html'))) {
            item.classList.add('active');
        }
    });

    // ── Smooth Page Transitions (sidebar nav links only) ─────────────
    document.querySelectorAll('.nav-item').forEach(link => {
        if (link.tagName === 'A') {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#' && href !== '' && !href.startsWith('javascript:')) {
                    e.preventDefault();
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 0.25s ease';
                    setTimeout(() => { window.location.href = href; }, 250);
                }
            });
        }
    });

    // ── "Go to Skills" button ─────────────────────────────────────────
    const goToSkillsBtn = document.getElementById('go-to-skills-btn');
    if (goToSkillsBtn) {
        goToSkillsBtn.addEventListener('click', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.25s ease';
            setTimeout(() => { window.location.href = 'skills.html'; }, 250);
        });
    }

    // ── Prevent broken # links ────────────────────────────────────────
    document.querySelectorAll('a[href="#"], a[href=""]').forEach(link => {
        link.addEventListener('click', e => e.preventDefault());
    });

    // ── Fade in on page load ──────────────────────────────────────────
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });
});
