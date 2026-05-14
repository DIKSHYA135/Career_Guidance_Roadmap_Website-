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

    // Role subtitle -> display selected path
    const selectedPath = localStorage.getItem('xyverra_selected_path') || 'No Path Selected';
    document.querySelectorAll('.profile-text p').forEach(el => {
        el.textContent = selectedPath;
    });

    // Dashboard welcome message
    const welcomeStrong = document.querySelector('header.dashboard-header p strong');
    if (welcomeStrong) welcomeStrong.textContent = userName;

    // ── 3. Sign Out ─────────────────────────────────────────
    // TODO: Call POST /api/auth/logout before clearing storage
    function performSignOut() {
        const keysToRemove = [
            'xyverra_user_name', 'xyverra_user_role', 'xyverra_selected_path',
            'userLevel', 'userSkills', 'completedModules', 'xyverra_skill_score',
            'xyverra_user', 'xyverra_user_streak'
        ];
        keysToRemove.forEach(k => localStorage.removeItem(k));
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.25s ease';
        setTimeout(() => { window.location.href = 'login.html'; }, 260);
    }

    document.querySelectorAll('.signout-btn, #signout-btn').forEach(btn => {
        // Add text below the icon
        btn.innerHTML = '<i class="fas fa-sign-out-alt"></i><div style="font-size: 10px; margin-top: 3px;">Sign Out</div>';
        btn.style.display = 'flex';
        btn.style.flexDirection = 'column';
        btn.style.alignItems = 'center';

        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation(); // Prevent opening profile modal
            performSignOut();
        });
    });

    // ── 3.5 Profile Modal ────────────────────────────────────
    document.querySelectorAll('.user-profile').forEach(profileDiv => {
        profileDiv.style.cursor = 'pointer';
        profileDiv.addEventListener('click', (e) => {
            if (e.target.closest('.signout-btn')) return;
            showProfileModal(userName, userRole, initials);
        });
    });

    function showProfileModal(name, role, init) {
        const modal = document.createElement('div');
        modal.className = 'profile-modal-overlay';
        modal.style.position = 'fixed';
        modal.style.top = '0'; modal.style.left = '0';
        modal.style.width = '100vw'; modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.5)';
        modal.style.display = 'flex'; modal.style.alignItems = 'center'; modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s ease';

        const path = localStorage.getItem('xyverra_selected_path') || 'None Selected';
        const score = localStorage.getItem('xyverra_skill_score') || '0';
        const level = localStorage.getItem('userLevel') || 'Beginner';

        modal.innerHTML = `
            <div class="glass-panel" style="background: white; border-radius: 16px; padding: 2rem; width: 90%; max-width: 400px; text-align: center; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <button class="close-modal" style="position: absolute; top: 10px; right: 15px; background: transparent; border: none; font-size: 20px; cursor: pointer; color: #64748B;">&times;</button>
                <div style="background: #E0E7FF; color: #4F46E5; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; margin: 0 auto 1rem;">${init}</div>
                <h2 style="margin: 0; color: #1e1e2d;">${name}</h2>
                <p style="color: #6b7280; margin-bottom: 1.5rem;">${path}</p>
                
                <div style="text-align: left; background: #F1F5F9; border-radius: 12px; padding: 1rem; margin-bottom: 1.5rem;">
                    <div style="margin-bottom: 0.5rem;"><strong>Selected Path:</strong> ${path}</div>
                    <div style="margin-bottom: 0.5rem;"><strong>Level:</strong> ${level}</div>
                    <div><strong>Skill Score:</strong> ${score}</div>
                </div>
                
                <button id="modal-signout-btn" style="width: 100%; padding: 10px; background: #FEE2E2; color: #EF4444; border: 1px solid #FCA5A5; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                    <i class="fas fa-sign-out-alt"></i> Sign Out
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.style.opacity = '1');

        modal.querySelector('#modal-signout-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            performSignOut();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                modal.style.opacity = '0';
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

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
