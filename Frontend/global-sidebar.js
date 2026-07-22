/* ==========================================================
   global-sidebar.js — Shared sidebar logic for all pages
   Runs on every dashboard-layout page.
   TODO: Replace localStorage reads with GET /api/user/me
   ========================================================== */

// ── Dynamically load notifications.js so the bell appears on every page ──
(function() {
    if (!document.getElementById('notif-script') && localStorage.getItem('token')) {
        const s = document.createElement('script');
        s.id  = 'notif-script';
        s.src = 'notifications.js';
        document.head.appendChild(s);
    }
})();

// Early-execution hook: if mandatory quiz is active, restrict navigation and redirect
(function() {
    const currentFile = window.location.pathname.split('/').pop() || './dashboard.html';
    if (currentFile !== 'quiz.html' && currentFile !== 'roadmap.html') {
        const rawState = localStorage.getItem('xyverra_mandatory_quiz_state');
        if (rawState) {
            try {
                const state = JSON.parse(rawState);
                if (state && state.isActive && state.assignedQuizzes && state.assignedQuizzes.some(q => q.status !== 'passed')) {
                    console.log("Mandatory quiz sequence pending. Redirecting to quiz.html");
                    window.location.href = 'quiz.html?mandatory=true';
                }
            } catch (e) {
                console.error("Error reading mandatory quiz state:", e);
            }
        }
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // ── 8. Fade in on page load ─────────────────────────────
    // Must run FIRST so it doesn't race with navigation handlers that also
    // set body opacity; any subsequent opacity writes happen after this frame.
    document.body.style.opacity = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }));

    // Lock sidebar navigation if mandatory quiz is active
    const rawState = localStorage.getItem('xyverra_mandatory_quiz_state');
    if (rawState) {
        try {
            const state = JSON.parse(rawState);
            if (state && state.isActive && state.assignedQuizzes && state.assignedQuizzes.some(q => q.status !== 'passed')) {
                document.querySelectorAll('.nav-item, .sidebar-brand, a').forEach(link => {
                    const href = link.getAttribute('href') || '';
                    const isSignOut = href.includes('login.html') ||
                                      link.classList.contains('signout-btn') ||
                                      link.id === 'signout-btn' ||
                                      link.id === 'modal-signout-btn';
                    const isQuizLink = href.includes('quiz.html');

                    if (!isSignOut && !isQuizLink) {
                        link.style.pointerEvents = 'none';
                        link.style.opacity = '0.4';
                        link.style.cursor = 'not-allowed';
                    }
                });

                document.querySelectorAll('.profile-click-area, .user-profile').forEach(area => {
                    const signoutBtn = area.querySelector('.signout-btn, #signout-btn');
                    if (signoutBtn) {
                        signoutBtn.style.pointerEvents = 'auto';
                        signoutBtn.style.opacity = '1';
                    }
                    area.style.pointerEvents = 'none';
                    area.style.opacity = '0.7';
                });
            }
        } catch (e) {
            console.error("Error locking navigation:", e);
        }
    }


    // ── 1. Mobile Sidebar Toggle ────────────────────────────
    // Support both the existing #sidebar-toggle-btn / #sidebar-menu pattern
    // AND a generic #sidebar-toggle / .sidebar-toggle + .sidebar pattern.
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

    // Generic hamburger button (#sidebar-toggle or .sidebar-toggle) → .sidebar
    const genericToggle  = document.getElementById('sidebar-toggle') ||
                           document.querySelector('.sidebar-toggle');
    const genericSidebar = document.querySelector('.sidebar');

    if (genericToggle && genericSidebar) {
        // Ensure an overlay exists; create one if not already in the DOM
        let overlay = document.querySelector('.sidebar-overlay-generic');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay-generic';
            Object.assign(overlay.style, {
                display: 'none',
                position: 'fixed',
                inset: '0',
                background: 'rgba(0,0,0,0.45)',
                zIndex: '998',
                cursor: 'pointer'
            });
            document.body.appendChild(overlay);
        }

        const openGenericSidebar = () => {
            genericSidebar.classList.add('open');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };

        const closeGenericSidebar = () => {
            genericSidebar.classList.remove('open');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        };

        genericToggle.addEventListener('click', () => {
            if (genericSidebar.classList.contains('open')) {
                closeGenericSidebar();
            } else {
                openGenericSidebar();
            }
        });

        overlay.addEventListener('click', closeGenericSidebar);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeGenericSidebar(); });
    }

    function closeSidebar() {
        sidebarMenu?.classList.remove('active');
        sidebarOverlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ── 1.5 Dynamically inject New Pro Links and Admin/Upgrade links ──
    const navMenus = document.querySelectorAll('.nav-menu');
    navMenus.forEach(nav => {
        // Career Analytics link
        if (!nav.querySelector('[href="career-analytics.html"]')) {
            const analyticsLink = document.createElement('a');
            analyticsLink.href = 'career-analytics.html';
            analyticsLink.className = 'nav-item nav-analytics';
            analyticsLink.innerHTML = '<i class="fas fa-chart-bar"></i> Career Analytics';
            nav.appendChild(analyticsLink);
        }

        // Interview Prep link
        if (!nav.querySelector('[href="interview-prep.html"]')) {
            const interviewLink = document.createElement('a');
            interviewLink.href = 'interview-prep.html';
            interviewLink.className = 'nav-item nav-interview';
            interviewLink.innerHTML = '<i class="fas fa-comments"></i> Interview Prep';
            nav.appendChild(interviewLink);
        }

        // Upgrade Pro link
        if (!nav.querySelector('[href="subscription.html"]')) {
            const upgLink = document.createElement('a');
            upgLink.href = 'subscription.html';
            upgLink.className = 'nav-item nav-subscription';
            upgLink.innerHTML = '<i class="fas fa-crown"></i> Upgrade Pro';
            nav.appendChild(upgLink);
        }
        
        // Admin Panel link (if user is admin)
        const isAdmin = localStorage.getItem('xyverra_is_admin') === 'true';
        if (isAdmin && !nav.querySelector('[href="admin.html"]')) {
            const adminLink = document.createElement('a');
            adminLink.href = 'admin.html';
            adminLink.className = 'nav-item nav-admin';
            adminLink.innerHTML = '<i class="fas fa-shield-alt"></i> Admin Panel';
            nav.appendChild(adminLink);
        }
    });

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
    function performSignOut() {
        // Call server logout endpoint (non-blocking) before clearing state
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            }).catch(() => {});
        }
        // Save current user data before clearing
        const email = localStorage.getItem('xyverra_user_email');
        if (email) {
            // Safe JSON.parse with fallback to empty object
            let usersData = {};
            try {
                usersData = JSON.parse(localStorage.getItem('xyverra_users')) || {};
            } catch (e) {
                console.warn('Could not parse xyverra_users, resetting to {}', e);
                usersData = {};
            }
            usersData[email] = {
                name: localStorage.getItem('xyverra_user_name'),
                path: localStorage.getItem('xyverra_selected_path'),
                role: localStorage.getItem('xyverra_user_role'),
                level: localStorage.getItem('userLevel'),
                skills: localStorage.getItem('userSkills'),
                modules: localStorage.getItem('completedModules'),
                score: localStorage.getItem('xyverra_skill_score'),
                streak: localStorage.getItem('xyverra_user_streak'),
                mandatoryQuizState: JSON.parse(localStorage.getItem('xyverra_mandatory_quiz_state') || 'null'),
                activeQuizState: localStorage.getItem('xyverra_active_quiz') ? JSON.parse(localStorage.getItem('xyverra_active_quiz')) : null
            };
            localStorage.setItem('xyverra_users', JSON.stringify(usersData));
        }

        const keysToRemove = [
            'xyverra_user_name', 'xyverra_user_role', 'xyverra_selected_path',
            'userLevel', 'userSkills', 'completedModules', 'xyverra_skill_score',
            'xyverra_user', 'xyverra_user_streak', 'xyverra_user_email',
            'xyverra_mandatory_quiz_state', 'xyverra_active_quiz',
            'xyverra_email_verified'
        ];
        keysToRemove.forEach(k => localStorage.removeItem(k));
        // Also clear auth-guard managed keys for full cleanup
        if (typeof window.XyLogout === 'function') {
            window.XyLogout();
        } else {
            // Fallback: clear remaining keys manually if XyLogout not available
            ['token', 'chatSubscriptionActive', 'openedCourses', 'xyverra_quiz_scores',
             'xyverra_selected_path', 'xyverra_onboarded', 'roadmapGenerated',
             'xyverra_interests', 'xyverra_selected_level'].forEach(k => localStorage.removeItem(k));
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.25s ease';
            setTimeout(() => { window.location.href = 'login.html'; }, 260);
        }
    }

    // Wire up signout buttons — DON'T rewrite innerHTML (that causes layout issues)
    document.querySelectorAll('.signout-btn, #signout-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation(); // Prevent bubbling to .user-profile click handler
            performSignOut();
        });
    });

    // ── 3.5 Profile Page Redirect ──
    document.querySelectorAll('.profile-click-area').forEach(area => {
        area.style.cursor = 'pointer';
        area.addEventListener('click', () => {
            window.location.href = 'profile.html';
        });
    });

    document.querySelectorAll('.user-profile').forEach(profileDiv => {
        if (!profileDiv.querySelector('.profile-click-area')) {
            profileDiv.addEventListener('click', e => {
                if (e.target.closest('.signout-btn') || e.target.closest('#signout-btn')) return;
                window.location.href = 'profile.html';
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

        const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
        const totalCompleted = completedModules.length;

        modal.innerHTML = `
            <div class="profile-modal-card" style="
                background: #ffffff; border-radius: 24px; padding: 2.5rem 2rem;
                width: 90%; max-width: 440px; text-align: center;
                position: relative; box-shadow: 0 24px 80px rgba(15,23,42,0.2), 0 0 0 1px rgba(226,232,240,0.8);
                animation: slideUpModal 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
                font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
            ">
                <button class="close-modal-btn" style="
                    position: absolute; top: 16px; right: 16px;
                    background: #F1F5F9; border: none; border-radius: 12px;
                    width: 34px; height: 34px; font-size: 20px; line-height: 1;
                    cursor: pointer; color: #64748B; display: flex;
                    align-items: center; justify-content: center;
                    transition: all 0.2s;
                ">&times;</button>

                <!-- Avatar & Header -->
                <div style="position: relative; margin: 0 auto 1.5rem; width: 90px; height: 90px;">
                    <div style="
                        background: linear-gradient(135deg, #3B82F6, #8B5CF6);
                        color: white; width: 100%; height: 100%; border-radius: 50%;
                        display: flex; align-items: center; justify-content: center;
                        font-size: 32px; font-weight: 800;
                        box-shadow: 0 12px 24px rgba(59,130,246,0.3);
                        position: relative; z-index: 2;
                    ">${init}</div>
                    <div style="position: absolute; bottom: 0; right: -4px; background: #10B981; border: 3px solid #fff; border-radius: 50%; width: 24px; height: 24px; z-index: 3;"></div>
                </div>

                <h2 style="margin: 0 0 0.25rem; color: #0F172A; font-size: 1.4rem; font-weight: 800; letter-spacing: -0.02em;">${name}</h2>
                <div style="color: #64748B; font-size: 0.9rem; font-weight: 500; margin-bottom: 1.5rem;">${displayEmail}</div>

                <!-- Path & Level Tag -->
                <div style="display:flex; justify-content:center; gap: 8px; margin-bottom: 1.5rem;">
                    <span style="background: rgba(59,130,246,0.1); color: #2563EB; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">${path}</span>
                    <span style="background: rgba(139,92,246,0.1); color: #7C3AED; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">${level}</span>
                </div>

                <!-- Stats Grid -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 16px; padding: 1rem; text-align: left;">
                        <div style="font-size: 0.75rem; color: #64748B; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Skill Score</div>
                        <div style="display:flex; align-items:baseline; gap: 4px;">
                            <span style="font-size: 1.5rem; font-weight: 800; color: #0F172A; line-height: 1;">${score}</span>
                            <span style="font-size: 0.8rem; color: #94A3B8; font-weight: 600;">/ 100</span>
                        </div>
                    </div>
                    <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 16px; padding: 1rem; text-align: left;">
                        <div style="font-size: 0.75rem; color: #64748B; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Current Streak</div>
                        <div style="display:flex; align-items:baseline; gap: 4px;">
                            <span style="font-size: 1.5rem; font-weight: 800; color: #F59E0B; line-height: 1;">${streak}</span>
                            <span style="font-size: 0.8rem; color: #94A3B8; font-weight: 600;">Days 🔥</span>
                        </div>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div style="text-align: left; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; box-shadow: 0 2px 4px rgba(15,23,42,0.02);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.6rem;">
                        <span style="font-size: 0.85rem; font-weight: 700; color: #1E293B;">Modules Completed</span>
                        <span style="font-size: 0.85rem; font-weight: 800; color: #2563EB;">${totalCompleted}</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: #F1F5F9; border-radius: 4px; overflow: hidden;">
                        <div style="width: ${Math.min((totalCompleted / 12) * 100, 100)}%; height: 100%; background: linear-gradient(90deg, #3B82F6, #8B5CF6); border-radius: 4px; transition: width 1s cubic-bezier(0.34,1.56,0.64,1);"></div>
                    </div>
                </div>

                <!-- Sign Out -->
                <button id="modal-signout-btn" style="
                    width: 100%; padding: 12px; background: #FFFFFF; color: #EF4444;
                    border: 2px solid #FCA5A5; border-radius: 14px; font-weight: 700;
                    cursor: pointer; font-size: 0.95rem; transition: all 0.2s;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    box-shadow: 0 4px 12px rgba(239,68,68,0.1);
                " onmouseover="this.style.background='#FEF2F2'" onmouseout="this.style.background='#FFFFFF'">
                    <i class="fas fa-sign-out-alt"></i> Sign Out Securely
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
        const hrefFile = href.split('/').pop();
        if (hrefFile && currentFile === hrefFile) {
            item.classList.add('active');
        }
        // Root path → dashboard
        if ((currentFile === '' || currentFile === 'index.html') && hrefFile === 'dashboard.html') {
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
            setTimeout(() => { window.location.href = 'skill-gap.html'; }, 230);
        });
    }

    // ── 7. Prevent broken # links ───────────────────────────
    document.querySelectorAll('a[href="#"], a[href=""]').forEach(link => {
        link.addEventListener('click', e => e.preventDefault());
    });

    // ── 9. Inject Floating Back Button ─────────────────────
    // Skipped on dashboard (no page to go back to meaningfully)
    const noBackPages = ['dashboard.html', 'login.html', 'signup.html', 'landing.html', 'onboarding.html'];
    if (!noBackPages.includes(currentFile)) {
        const backBtn = document.createElement('button');
        backBtn.id = 'global-back-btn';
        backBtn.title = 'Go Back';
        backBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
        Object.assign(backBtn.style, {
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(37,99,235,0.35)',
            zIndex: '9000',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit'
        });
        backBtn.addEventListener('mouseenter', () => {
            backBtn.style.transform = 'translateY(-3px) scale(1.08)';
            backBtn.style.boxShadow = '0 8px 24px rgba(37,99,235,0.45)';
        });
        backBtn.addEventListener('mouseleave', () => {
            backBtn.style.transform = '';
            backBtn.style.boxShadow = '0 4px 16px rgba(37,99,235,0.35)';
        });
        backBtn.addEventListener('click', () => {
            if (window.history.length > 1) {
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.22s ease';
                setTimeout(() => window.history.back(), 230);
            } else {
                window.location.href = 'dashboard.html';
            }
        });
        document.body.appendChild(backBtn);
    }
});
