/* ==========================================================
   auth-guard.js — Xyverra Global Route Protection
   Include this BEFORE any page-specific JS on protected pages.
   ========================================================== */

(function XyGuard() {
    // ── Pages that are always public (no guard) ──
    const PUBLIC_PAGES = ['landing.html', 'login.html', 'signup.html', 'index.html', ''];

    // ── Pages that require onboarding (path selected & roadmap generated) to access ──
    const ONBOARDING_REQUIRED = [
        'dashboard.html',
        'progress.html',
        'roadmap.html',
        'skill-gap.html',
        'quiz.html',
        'resources.html',
        'achievements.html',
        'analytics.html',
        'learning.html',
    ];

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // If public page, no guard needed
    if (PUBLIC_PAGES.includes(currentPage)) return;

    // ── Check 1: Must be logged in ──
    const isLoggedIn = !!localStorage.getItem('xyverra_user_email') || !!localStorage.getItem('token');
    if (!isLoggedIn) {
        window.location.replace('login.html');
        return;
    }

    // ── Check 2: Onboarding guard for protected pages ──
    if (ONBOARDING_REQUIRED.includes(currentPage)) {
        const selectedPath = localStorage.getItem('xyverra_selected_path') || localStorage.getItem('xyverra_target_career');
        const onboardingDone = localStorage.getItem('xyverra_onboarded') === 'true';

        if (!selectedPath || !onboardingDone) {
            // Not fully onboarded (no path or roadmap not generated) — redirect to career discovery
            window.location.replace('career-discovery.html');
            return;
        }
    }

    // ── Utility: Call this from career-discovery.html once path is chosen ──
    window.XyCompleteOnboarding = function(selectedPath, selectedLevel) {
        if (selectedPath) localStorage.setItem('xyverra_selected_path', selectedPath);
        if (selectedLevel) localStorage.setItem('xyverra_selected_level', selectedLevel);
        localStorage.setItem('xyverra_onboarded', 'true');
        localStorage.setItem('roadmapGenerated', 'true');
    };

    // ── Utility: Check if onboarding complete ──
    window.XyIsOnboarded = function() {
        const selectedPath = localStorage.getItem('xyverra_selected_path') || localStorage.getItem('xyverra_target_career');
        return (localStorage.getItem('xyverra_onboarded') === 'true') || !!selectedPath;
    };

    // ── Utility: Logout ──
    window.XyLogout = function() {
        const keys = [
            'xyverra_user_email', 'xyverra_user_name', 'xyverra_selected_path',
            'xyverra_target_career', 'xyverra_onboarded', 'xyverra_interests',
            'xyverra_selected_level', 'xyverra_skill_score', 'xyverra_user_streak',
            'xyverra_xp', 'userLevel', 'userSkills', 'completedModules',
            'roadmapGenerated', 'token'
        ];
        keys.forEach(k => localStorage.removeItem(k));
        window.location.replace('login.html');
    };
})();
