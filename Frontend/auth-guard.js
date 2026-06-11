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
        'study.html',
        'resources.html',
        'achievements.html',
        'analytics.html',
        'learning.html',
    ];

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // If public page, no guard needed
    if (PUBLIC_PAGES.includes(currentPage)) return;

    // ── Check 1: Must be logged in (Token presence) ──
    // Always prefer localStorage first — token is always written there on login
    // so it survives page refreshes and new tab opens.
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
        console.warn('[AuthGuard] No token found. Redirecting to login.');
        window.location.replace('login.html');
        return;
    }

    // ── Check 2: Email verification guard ──
    // Only redirect if the flag is EXPLICITLY 'false'.
    // If the key is missing (e.g. old accounts pre-OTP), allow through.
    const emailVerified = localStorage.getItem('xyverra_email_verified');
    if (emailVerified === 'false') {
        if (currentPage !== 'signup.html') {
            console.warn('[AuthGuard] Email not verified. Redirecting to signup verify step.');
            window.location.replace('signup.html?verify=1');
            return;
        }
    }

    // ── Check 3: Onboarding guard for specific protected pages ──
    if (ONBOARDING_REQUIRED.includes(currentPage)) {
        const selectedPath = localStorage.getItem('xyverra_selected_path') || localStorage.getItem('xyverra_target_career');
        const onboardingDone = localStorage.getItem('xyverra_onboarded') === 'true';

        if (!selectedPath && !onboardingDone) {
            console.warn('[AuthGuard] Onboarding incomplete. Redirecting to career-discovery.');
            window.location.replace('career-discovery.html');
            return;
        }
    }

    console.log('[AuthGuard] ✅ Auth OK on:', currentPage);

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
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace('login.html');
    };
})();
