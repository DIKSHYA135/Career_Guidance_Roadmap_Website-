/* =========================================================
   back-nav.js — Universal Back Navigation Injector
   Injects a styled "Back" button at the top of every sub-page
   and adds button loading states / micro-interactions globally.
   ========================================================= */

(function () {
    // Determine if we should show a back button based on page
    const page = window.location.pathname.split('/').pop() || 'index.html';

    // Pages that shouldn't have a back button (top level)
    const noBackPages = ['index.html', 'dashboard.html', 'login.html', 'signup.html', 'landing.html'];

    const shouldShowBack = !noBackPages.includes(page) && page.endsWith('.html');

    document.addEventListener('DOMContentLoaded', () => {

        // --- 1. Inject Back Button ---
        if (shouldShowBack) {
            const mainContent = document.querySelector('.main-content') ||
                                document.querySelector('.dashboard-container') ||
                                document.querySelector('.page-wrap') ||
                                document.querySelector('.quiz-container') ||
                                document.querySelector('.roadmap-container') ||
                                document.querySelector('main');

            if (mainContent) {
                // Inline-style injected nav bar
                const nav = document.createElement('div');
                nav.className = 'page-top-nav fade-in';
                nav.innerHTML = `
                    <a href="javascript:void(0)" class="back-browser-btn" id="universal-back-btn" title="Go back to previous page">
                        <i class="fas fa-arrow-left"></i>
                        Back
                    </a>
                `;
                const firstChild = mainContent.firstElementChild;
                if (firstChild) {
                    mainContent.insertBefore(nav, firstChild);
                } else {
                    mainContent.appendChild(nav);
                }
            } else {
                // Fallback: inject a floating back button for pages with no recognised container
                const fab = document.createElement('button');
                fab.id = 'universal-back-btn';
                fab.title = 'Go back to previous page';
                fab.innerHTML = '<i class="fas fa-arrow-left"></i> Back';
                fab.style.cssText = `
                    position: fixed;
                    top: 18px;
                    left: 18px;
                    z-index: 9999;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.45rem;
                    padding: 0.55rem 1.1rem;
                    background: rgba(255,255,255,0.92);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(79,70,229,0.2);
                    border-radius: 999px;
                    color: #4f46e5;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                    transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
                `;
                fab.addEventListener('mouseenter', () => {
                    fab.style.background = 'rgba(79,70,229,0.08)';
                    fab.style.transform = 'translateX(-2px)';
                });
                fab.addEventListener('mouseleave', () => {
                    fab.style.background = 'rgba(255,255,255,0.92)';
                    fab.style.transform = '';
                });
                document.body.appendChild(fab);
            }

            // Back navigation logic — shared by both variants
            const backBtn = document.getElementById('universal-back-btn');
            if (backBtn) {
                backBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (window.history.length > 1) {
                        window.history.back();
                    } else {
                        window.location.href = 'dashboard.html';
                    }
                });
            }
        }

        // --- 2. Button Loading State on click ---
        // Apply a smooth loading spinner to primary action buttons that navigate
        document.querySelectorAll('.btn-primary[onclick], .btn-primary[href]').forEach(btn => {
            btn.addEventListener('click', function () {
                const self = this;
                // Don't add loading to back buttons or modal triggers
                if (self.classList.contains('back-nav-btn')) return;
                if (self.getAttribute('onclick') && self.getAttribute('onclick').includes('modal')) return;
                self.classList.add('loading');
                // Auto-remove if nav fails or stays on page
                setTimeout(() => self.classList.remove('loading'), 3500);
            });
        });

        // --- 3. Animate cards on mount ---
        document.querySelectorAll('.card-box, .content-card, .metric-card').forEach((card, i) => {
            card.classList.add('fade-in-up');
            card.style.animationDelay = `${i * 0.07}s`;
        });

        // --- 4. Global hover polish for nav items ---
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.paddingLeft = '18px';
            });
            item.addEventListener('mouseleave', () => {
                item.style.paddingLeft = '';
            });
        });

        // --- 5. Fix all dead "#" href buttons ---
        document.querySelectorAll('a[href="#"]').forEach(a => {
            // Only disable ones that are truly empty (no id, no onclick)
            if (!a.id && !a.getAttribute('onclick') && !a.closest('[id]')) {
                a.style.cursor = 'default';
                a.style.pointerEvents = 'none';
                a.style.opacity = '0.5';
            }
        });

        // --- 6. Highlight active nav item based on current page ---
        // Use exact filename match to prevent false positives (e.g. 'dashboard' matching 'dash')
        document.querySelectorAll('.nav-item').forEach(item => {
            const href = item.getAttribute('href') || '';
            const hrefFile = href.split('/').pop();
            if (hrefFile === page) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // --- 7. Browser back support (popstate) ---
        window.addEventListener('popstate', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.2s ease';
        });

        // --- 8. Smooth page exit on navigation ---
        // Guard against double-binding if this script runs more than once
        document.querySelectorAll('a[href]').forEach(link => {
            if (link.dataset.transitionBound) return;
            link.dataset.transitionBound = '1';

            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
            link.addEventListener('click', e => {
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.25s ease';
                setTimeout(() => {
                    window.location.href = href;
                }, 230);
            });
        });
    });
})();
