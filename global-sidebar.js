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
    const userName     = localStorage.getItem('xyverra_user_name') || 'Guest User';
    const selectedPath = localStorage.getItem('xyverra_selected_path') || 'No Path Selected';
    const userEmail    = localStorage.getItem('xyverra_user_email') || '';
    const initials     = userName.split(' ').map(n => n[0] || '').join('').substring(0, 2).toUpperCase() || 'GU';

    // Avatar initials
    document.querySelectorAll('#user-avatar').forEach(el => {
        el.textContent = initials;
    });

    // Display name
    document.querySelectorAll('#user-display-name').forEach(el => {
        el.textContent = userName;
    });

    // Role subtitle → display selected path
    document.querySelectorAll('.profile-text p').forEach(el => {
        el.textContent = selectedPath;
    });

    // Dashboard welcome message
    const welcomeStrong = document.querySelector('header.dashboard-header p strong');
    if (welcomeStrong) welcomeStrong.textContent = userName;

    // ── 3. Sign Out ─────────────────────────────────────────
    // TODO: Call POST /api/auth/logout before clearing storage
    function performSignOut() {
        // Save current user data before clearing
        const email = localStorage.getItem('xyverra_user_email');
        if (email) {
            const usersData = JSON.parse(localStorage.getItem('xyverra_users')) || {};
            usersData[email] = {
                name: localStorage.getItem('xyverra_user_name'),
                path: localStorage.getItem('xyverra_selected_path'),
                role: localStorage.getItem('xyverra_user_role'),
                level: localStorage.getItem('userLevel'),
                skills: localStorage.getItem('userSkills'),
                modules: localStorage.getItem('completedModules'),
                score: localStorage.getItem('xyverra_skill_score'),
                streak: localStorage.getItem('xyverra_user_streak')
            };
            localStorage.setItem('xyverra_users', JSON.stringify(usersData));
        }

        const keysToRemove = [
            'xyverra_user_name', 'xyverra_user_role', 'xyverra_selected_path',
            'userLevel', 'userSkills', 'completedModules', 'xyverra_skill_score',
            'xyverra_user', 'xyverra_user_streak', 'xyverra_user_email'
        ];
        keysToRemove.forEach(k => localStorage.removeItem(k));
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.25s ease';
        setTimeout(() => { window.location.href = 'login.html'; }, 260);
    }

    // Wire up signout buttons — DON'T rewrite innerHTML (that causes layout issues)
    document.querySelectorAll('.signout-btn, #signout-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation(); // Prevent bubbling to .user-profile click handler
            performSignOut();
        });
    });

    // ── 3.5 Profile Modal — click on avatar/name area only ──
    // We attach the handler to the inner .profile-info div (NOT to .user-profile)
    // to avoid the signout button triggering the modal.
    document.querySelectorAll('.profile-click-area').forEach(area => {
        area.style.cursor = 'pointer';
        area.addEventListener('click', () => {
            showProfileModal(userName, userEmail, selectedPath, initials);
        });
    });

    // Fallback: if pages use the old pattern (no .profile-click-area), wire to .user-profile
    // but guard against the signout button
    document.querySelectorAll('.user-profile').forEach(profileDiv => {
        // Only add listener if there's no dedicated .profile-click-area inside
        if (!profileDiv.querySelector('.profile-click-area')) {
            profileDiv.addEventListener('click', e => {
                if (e.target.closest('.signout-btn') || e.target.closest('#signout-btn')) return;
                showProfileModal(userName, userEmail, selectedPath, initials);
            });
        }
    });

    function showProfileModal(name, email, path, init) {
        // Prevent duplicate modals
        if (document.querySelector('.profile-modal-overlay')) return;

        const level      = localStorage.getItem('userLevel') || 'Beginner';
        const score      = localStorage.getItem('xyverra_skill_score') || '0';
        const streak     = localStorage.getItem('xyverra_user_streak') || '0';
        const displayEmail = email || 'Not provided';

        const modal = document.createElement('div');
        modal.className = 'profile-modal-overlay';
        Object.assign(modal.style, {
            position: 'fixed', top: '0', left: '0',
            width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: '9999', opacity: '0', transition: 'opacity 0.25s ease'
        });

        modal.innerHTML = `
            <div class="profile-modal-card" style="
                background: #fff; border-radius: 20px; padding: 2rem;
                width: 90%; max-width: 420px; text-align: center;
                position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.15);
                animation: slideUpModal 0.3s cubic-bezier(0.4,0,0.2,1) forwards;
            ">
                <button class="close-modal-btn" style="
                    position: absolute; top: 14px; right: 16px;
                    background: #F1F5F9; border: none; border-radius: 50%;
                    width: 32px; height: 32px; font-size: 18px; line-height: 1;
                    cursor: pointer; color: #64748B; display: flex;
                    align-items: center; justify-content: center;
                    transition: background 0.2s;
                ">&times;</button>

                <!-- Avatar -->
                <div style="
                    background: linear-gradient(135deg, #6366F1, #8B5CF6);
                    color: white; width: 80px; height: 80px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 30px; font-weight: 800; margin: 0 auto 1rem;
                    box-shadow: 0 8px 20px rgba(99,102,241,0.3);
                ">${init}</div>

                <!-- Name -->
                <h2 style="margin: 0 0 0.25rem; color: #0F172A; font-size: 1.3rem; font-weight: 800;">${name}</h2>
                <p style="color: #6366F1; font-size: 0.85rem; font-weight: 600; margin-bottom: 1.5rem; background: rgba(99,102,241,0.08); display: inline-block; padding: 3px 12px; border-radius: 20px;">${path}</p>

                <!-- Info rows -->
                <div style="text-align: left; background: #F8FAFC; border-radius: 14px; padding: 1rem 1.25rem; margin-bottom: 1.25rem; border: 1px solid #E2E8F0;">
                    <div class="modal-info-row" style="display:flex; align-items:center; gap:10px; padding: 0.5rem 0; border-bottom: 1px solid #E2E8F0;">
                        <span style="font-size:16px;">📧</span>
                        <div>
                            <div style="font-size:0.72rem; font-weight:600; color:#94A3B8; text-transform:uppercase; letter-spacing:0.05em;">Email / Gmail</div>
                            <div style="font-size:0.9rem; color:#0F172A; font-weight:600; word-break:break-all;">${displayEmail}</div>
                        </div>
                    </div>
                    <div class="modal-info-row" style="display:flex; align-items:center; gap:10px; padding: 0.5rem 0; border-bottom: 1px solid #E2E8F0;">
                        <span style="font-size:16px;">🎯</span>
                        <div>
                            <div style="font-size:0.72rem; font-weight:600; color:#94A3B8; text-transform:uppercase; letter-spacing:0.05em;">Selected Path</div>
                            <div style="font-size:0.9rem; color:#0F172A; font-weight:600;">${path}</div>
                        </div>
                    </div>
                    <div class="modal-info-row" style="display:flex; align-items:center; gap:10px; padding: 0.5rem 0; border-bottom: 1px solid #E2E8F0;">
                        <span style="font-size:16px;">📊</span>
                        <div>
                            <div style="font-size:0.72rem; font-weight:600; color:#94A3B8; text-transform:uppercase; letter-spacing:0.05em;">Level · Skill Score</div>
                            <div style="font-size:0.9rem; color:#0F172A; font-weight:600;">${level} &nbsp;·&nbsp; ${score}/100</div>
                        </div>
                    </div>
                    <div class="modal-info-row" style="display:flex; align-items:center; gap:10px; padding: 0.5rem 0;">
                        <span style="font-size:16px;">🔥</span>
                        <div>
                            <div style="font-size:0.72rem; font-weight:600; color:#94A3B8; text-transform:uppercase; letter-spacing:0.05em;">Current Streak</div>
                            <div style="font-size:0.9rem; color:#0F172A; font-weight:600;">${streak} Days</div>
                        </div>
                    </div>
                </div>

                <!-- Sign Out -->
                <button id="modal-signout-btn" style="
                    width: 100%; padding: 11px; background: #FEE2E2; color: #EF4444;
                    border: 1px solid #FCA5A5; border-radius: 10px; font-weight: 700;
                    cursor: pointer; font-size: 0.9rem; transition: all 0.2s;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                ">
                    <i class="fas fa-sign-out-alt"></i> Sign Out
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        requestAnimationFrame(() => requestAnimationFrame(() => { modal.style.opacity = '1'; }));

        modal.querySelector('#modal-signout-btn').addEventListener('click', e => {
            e.stopPropagation();
            performSignOut();
        });

        modal.querySelector('.close-modal-btn').addEventListener('click', () => closeModal(modal));
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal(modal);
        });
    }

    function closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 280);
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
