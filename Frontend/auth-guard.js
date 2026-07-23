/* ================================================================
   xyverra-modals.js — Premium Custom Modal & Popup System
   Replaces ALL browser alert(), confirm(), prompt() calls.
   Covers: Pro gate, errors, confirms, loading, toasts, input prompt,
           session expired, offline, onboarding milestones, subscription.
   Auto-loaded via auth-guard.js or global-sidebar.js on every page.
   ================================================================ */

(function XyModalSystem() {
    'use strict';

    // ── Style Injection ───────────────────────────────────────
    function injectStyles() {
        if (document.getElementById('xym-styles')) return;
        const style = document.createElement('style');
        style.id = 'xym-styles';
        style.textContent = `
            /* ── Base Overlay ── */
            .xym-overlay {
                position: fixed;
                inset: 0;
                background: rgba(10, 17, 40, 0.55);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                padding: 1rem;
                opacity: 0;
                transition: opacity 0.22s ease;
                font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
            }
            .xym-overlay.xym-in { opacity: 1; }
            .xym-overlay.xym-out { opacity: 0; pointer-events: none; }

            /* ── Card ── */
            .xym-card {
                background: #ffffff;
                border-radius: 24px;
                width: 100%;
                max-width: 440px;
                padding: 2.5rem 2rem 2rem;
                box-shadow: 0 32px 80px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(255,255,255,0.6) inset;
                text-align: center;
                transform: scale(0.88) translateY(20px);
                transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.22s ease;
                opacity: 0;
                position: relative;
                overflow: hidden;
            }
            .xym-overlay.xym-in .xym-card {
                transform: scale(1) translateY(0);
                opacity: 1;
            }
            .xym-overlay.xym-out .xym-card {
                transform: scale(0.92) translateY(12px);
                opacity: 0;
            }

            /* ── Accent stripe ── */
            .xym-card::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0;
                height: 4px;
                border-radius: 24px 24px 0 0;
                background: var(--xym-accent, #2563eb);
            }

            /* ── Close button ── */
            .xym-close {
                position: absolute;
                top: 14px; right: 14px;
                width: 30px; height: 30px;
                border-radius: 50%;
                border: none;
                background: #f1f5f9;
                cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                color: #94a3b8;
                font-size: 16px;
                transition: all 0.15s;
                line-height: 1;
            }
            .xym-close:hover { background: #e2e8f0; color: #475569; transform: rotate(90deg); }

            /* ── Icon ── */
            .xym-icon-wrap {
                width: 72px; height: 72px;
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                margin: 0 auto 1.5rem;
                font-size: 2rem;
                position: relative;
            }
            .xym-icon-wrap::after {
                content: '';
                position: absolute;
                inset: -6px;
                border-radius: 50%;
                border: 2px solid currentColor;
                opacity: 0.15;
            }

            /* Icon type colours */
            .xym-icon-success { background: rgba(16,185,129,.12); color: #10b981; --xym-accent: #10b981; }
            .xym-icon-error   { background: rgba(239,68,68,.12);  color: #ef4444; --xym-accent: #ef4444; }
            .xym-icon-warning { background: rgba(245,158,11,.12); color: #f59e0b; --xym-accent: #f59e0b; }
            .xym-icon-info    { background: rgba(37,99,235,.12);  color: #2563eb; --xym-accent: #2563eb; }
            .xym-icon-pro     { background: rgba(245,158,11,.12); color: #f59e0b; --xym-accent: #f59e0b; }
            .xym-icon-loading { background: rgba(37,99,235,.12);  color: #2563eb; --xym-accent: #2563eb; }

            /* ── Spinner ── */
            .xym-spinner {
                width: 36px; height: 36px;
                border: 3px solid rgba(37,99,235,.2);
                border-top-color: #2563eb;
                border-radius: 50%;
                animation: xym-spin 0.8s linear infinite;
            }
            @keyframes xym-spin { to { transform: rotate(360deg); } }

            /* ── Title / Message ── */
            .xym-title {
                font-size: 1.3rem;
                font-weight: 800;
                color: #0f172a;
                margin: 0 0 0.6rem;
                letter-spacing: -0.025em;
                line-height: 1.25;
            }
            .xym-message {
                font-size: 0.93rem;
                color: #64748b;
                line-height: 1.65;
                margin: 0 0 1.75rem;
            }

            /* ── Buttons ── */
            .xym-actions {
                display: flex;
                gap: 0.75rem;
                flex-direction: column;
            }
            .xym-actions.xym-row { flex-direction: row; }

            .xym-btn {
                width: 100%;
                padding: 13px 20px;
                border-radius: 14px;
                border: none;
                font-size: 0.95rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: inherit;
                display: flex; align-items: center; justify-content: center; gap: 8px;
            }
            .xym-btn-primary {
                background: var(--xym-btn-color, #2563eb);
                color: #fff;
                box-shadow: 0 4px 16px rgba(37,99,235,.25);
            }
            .xym-btn-primary:hover { filter: brightness(1.08); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,.35); }
            .xym-btn-secondary {
                background: #f8fafc;
                color: #475569;
                border: 1.5px solid #e2e8f0;
            }
            .xym-btn-secondary:hover { background: #f1f5f9; border-color: #cbd5e1; }
            .xym-btn-danger {
                background: #ef4444;
                color: #fff;
                box-shadow: 0 4px 16px rgba(239,68,68,.25);
            }
            .xym-btn-danger:hover { filter: brightness(1.08); transform: translateY(-2px); }
            .xym-btn-ghost {
                background: transparent;
                color: #94a3b8;
                font-weight: 600;
                font-size: 0.85rem;
            }
            .xym-btn-ghost:hover { color: #475569; }

            /* ── Pro Gate special card ── */
            .xym-pro-badge {
                display: inline-flex; align-items: center; gap: 6px;
                background: linear-gradient(135deg, #f59e0b, #d97706);
                color: #fff;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 800;
                letter-spacing: 0.05em;
                margin-bottom: 1rem;
            }
            .xym-feature-list {
                text-align: left;
                margin: 0 0 1.75rem;
                padding: 0;
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .xym-feature-list li {
                display: flex; align-items: center; gap: 10px;
                font-size: 0.88rem;
                color: #475569;
                font-weight: 500;
            }
            .xym-feature-list li i { color: #10b981; font-size: 0.85rem; }

            /* ── Input prompt ── */
            .xym-input {
                width: 100%;
                padding: 12px 14px;
                border: 1.5px solid #e2e8f0;
                border-radius: 12px;
                font-size: 0.95rem;
                font-family: inherit;
                color: #1e293b;
                background: #f8fafc;
                outline: none;
                transition: all 0.2s;
                box-sizing: border-box;
                margin-bottom: 1.5rem;
                text-align: left;
            }
            .xym-input:focus { border-color: #2563eb; background: #fff; box-shadow: 0 0 0 3px rgba(37,99,235,.1); }

            /* ── Toast system ── */
            #xym-toast-zone {
                position: fixed;
                bottom: 24px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 99998;
                display: flex;
                flex-direction: column-reverse;
                gap: 10px;
                align-items: center;
                pointer-events: none;
                width: max-content;
                max-width: calc(100vw - 32px);
            }
            .xym-toast {
                display: flex; align-items: center; gap: 12px;
                padding: 13px 18px;
                border-radius: 16px;
                background: #1e293b;
                color: #f8fafc;
                font-size: 0.88rem;
                font-weight: 600;
                box-shadow: 0 8px 32px rgba(0,0,0,.25);
                pointer-events: auto;
                cursor: pointer;
                white-space: nowrap;
                max-width: 420px;
                opacity: 0;
                transform: translateY(16px) scale(0.95);
                transition: all 0.3s cubic-bezier(0.34,1.56,.64,1);
            }
            .xym-toast.xym-toast-in { opacity: 1; transform: translateY(0) scale(1); }
            .xym-toast.xym-toast-out { opacity: 0; transform: translateY(12px) scale(0.93); transition: all 0.22s ease; }
            .xym-toast-icon { font-size: 1rem; flex-shrink: 0; }
            .xym-toast.t-success .xym-toast-icon { color: #34d399; }
            .xym-toast.t-error   .xym-toast-icon { color: #f87171; }
            .xym-toast.t-warning .xym-toast-icon { color: #fbbf24; }
            .xym-toast.t-info    .xym-toast-icon { color: #60a5fa; }

            /* ── Loading overlay ── */
            #xym-loading-overlay {
                position: fixed; inset: 0;
                background: rgba(10,17,40,.6);
                backdrop-filter: blur(6px);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                z-index: 999999;
                color: #fff; gap: 1.25rem;
                font-size: 1rem; font-weight: 600;
                font-family: 'Plus Jakarta Sans','Inter',sans-serif;
                opacity: 0; transition: opacity 0.2s;
            }
            #xym-loading-overlay.xym-in { opacity: 1; }

            /* ── Session expired banner ── */
            #xym-session-banner {
                position: fixed; top: 0; left: 0; right: 0;
                background: linear-gradient(90deg, #ef4444, #dc2626);
                color: #fff;
                padding: 12px 20px;
                display: flex; align-items: center; justify-content: space-between; gap: 12px;
                font-size: 0.9rem; font-weight: 600;
                z-index: 99997;
                font-family: 'Plus Jakarta Sans','Inter',sans-serif;
                transform: translateY(-100%);
                transition: transform 0.35s cubic-bezier(0.34,1.56,.64,1);
                box-shadow: 0 4px 20px rgba(239,68,68,.4);
            }
            #xym-session-banner.xym-in { transform: translateY(0); }

            /* ── Offline banner ── */
            #xym-offline-banner {
                position: fixed; bottom: 0; left: 0; right: 0;
                background: #1e293b;
                color: #f8fafc;
                padding: 12px 20px;
                display: none; align-items: center; gap: 10px;
                font-size: 0.88rem; font-weight: 600;
                z-index: 99997;
                font-family: 'Plus Jakarta Sans','Inter',sans-serif;
                box-shadow: 0 -4px 20px rgba(0,0,0,.2);
            }
            #xym-offline-banner.active { display: flex; }

            @media (max-width: 480px) {
                .xym-card { padding: 2rem 1.25rem 1.5rem; border-radius: 20px; }
                .xym-title { font-size: 1.15rem; }
                .xym-actions.xym-row { flex-direction: column; }
            }
        `;
        document.head.appendChild(style);
    }

    // ── Toast Zone ─────────────────────────────────────────────
    function getToastZone() {
        let el = document.getElementById('xym-toast-zone');
        if (!el) {
            el = document.createElement('div');
            el.id = 'xym-toast-zone';
            document.body.appendChild(el);
        }
        return el;
    }

    // ── Core: show overlay ──────────────────────────────────────
    function showOverlay(html, opts = {}) {
        const overlay = document.createElement('div');
        overlay.className = 'xym-overlay';
        overlay.innerHTML = html;
        document.body.appendChild(overlay);

        // Animate in
        requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('xym-in')));

        const close = (result) => {
            overlay.classList.remove('xym-in');
            overlay.classList.add('xym-out');
            setTimeout(() => overlay.remove(), 300);
            if (typeof opts.onClose === 'function') opts.onClose(result);
        };

        // Close on backdrop click unless opts.persistent
        if (!opts.persistent) {
            overlay.addEventListener('click', e => {
                if (e.target === overlay) close(null);
            });
            document.addEventListener('keydown', function esc(e) {
                if (e.key === 'Escape') { close(null); document.removeEventListener('keydown', esc); }
            }, { once: true });
        }

        return { overlay, close };
    }

    // ─────────────────────────────────────────────────────────────
    //  1. XyAlert — replaces alert()
    // ─────────────────────────────────────────────────────────────
    window.XyAlert = function({ title = '', message = '', type = 'info', btnText = 'Got it' } = {}) {
        return new Promise(resolve => {
            const cfg = typeConfig(type);
            const { overlay, close } = showOverlay(`
                <div class="xym-card" style="--xym-accent:${cfg.accent}; --xym-btn-color:${cfg.accent};">
                    <button class="xym-close" data-action="close">✕</button>
                    <div class="xym-icon-wrap xym-icon-${type}">${cfg.icon}</div>
                    ${title ? `<h3 class="xym-title">${title}</h3>` : ''}
                    ${message ? `<p class="xym-message">${message}</p>` : ''}
                    <div class="xym-actions">
                        <button class="xym-btn xym-btn-primary" data-action="ok">${btnText}</button>
                    </div>
                </div>`, { onClose: resolve });
            overlay.querySelector('[data-action="ok"]').addEventListener('click', () => close(true));
            overlay.querySelector('[data-action="close"]').addEventListener('click', () => close(true));
        });
    };

    // ─────────────────────────────────────────────────────────────
    //  2. XyConfirm — replaces confirm()
    // ─────────────────────────────────────────────────────────────
    window.XyConfirm = function({
        title = 'Are you sure?',
        message = '',
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        type = 'warning',
        dangerous = false
    } = {}) {
        return new Promise(resolve => {
            const cfg = typeConfig(type);
            const { overlay, close } = showOverlay(`
                <div class="xym-card" style="--xym-accent:${cfg.accent}; --xym-btn-color:${cfg.accent};">
                    <div class="xym-icon-wrap xym-icon-${type}">${cfg.icon}</div>
                    <h3 class="xym-title">${title}</h3>
                    ${message ? `<p class="xym-message">${message}</p>` : ''}
                    <div class="xym-actions xym-row">
                        <button class="xym-btn xym-btn-secondary" data-action="cancel">${cancelText}</button>
                        <button class="xym-btn ${dangerous ? 'xym-btn-danger' : 'xym-btn-primary'}" data-action="ok">${confirmText}</button>
                    </div>
                </div>`, { onClose: resolve });
            overlay.querySelector('[data-action="ok"]').addEventListener('click', () => close(true));
            overlay.querySelector('[data-action="cancel"]').addEventListener('click', () => close(false));
        });
    };

    // ─────────────────────────────────────────────────────────────
    //  3. XyPrompt — replaces prompt()
    // ─────────────────────────────────────────────────────────────
    window.XyPrompt = function({
        title = 'Enter a value',
        message = '',
        placeholder = '',
        defaultValue = '',
        confirmText = 'Submit',
        cancelText = 'Cancel',
        type = 'info'
    } = {}) {
        return new Promise(resolve => {
            const cfg = typeConfig(type);
            const { overlay, close } = showOverlay(`
                <div class="xym-card" style="--xym-accent:${cfg.accent}; --xym-btn-color:${cfg.accent};">
                    <button class="xym-close" data-action="cancel">✕</button>
                    <div class="xym-icon-wrap xym-icon-${type}">${cfg.icon}</div>
                    <h3 class="xym-title">${title}</h3>
                    ${message ? `<p class="xym-message">${message}</p>` : ''}
                    <input class="xym-input" id="xym-prompt-input" placeholder="${placeholder}" value="${defaultValue}">
                    <div class="xym-actions xym-row">
                        <button class="xym-btn xym-btn-secondary" data-action="cancel">${cancelText}</button>
                        <button class="xym-btn xym-btn-primary" data-action="ok">${confirmText}</button>
                    </div>
                </div>`, { onClose: resolve });

            const input = overlay.querySelector('#xym-prompt-input');
            input.focus();
            input.addEventListener('keydown', e => { if (e.key === 'Enter') overlay.querySelector('[data-action="ok"]').click(); });

            overlay.querySelector('[data-action="ok"]').addEventListener('click', () => close(input.value.trim() || null));
            overlay.querySelector('[data-action="cancel"]').addEventListener('click', () => close(null));
            overlay.querySelector('[data-action="close"]').addEventListener('click', () => close(null));
        });
    };

    // ─────────────────────────────────────────────────────────────
    //  4. XyRequirePro — Pro gate modal (replaces the ugly alert)
    // ─────────────────────────────────────────────────────────────
    window.XyRequirePro = function(featureName) {
        if (localStorage.getItem('xyverra_is_pro') === 'true') return true;

        // Show beautiful pro gate popup (non-blocking with redirect on action)
        const { overlay, close } = showOverlay(`
            <div class="xym-card" style="--xym-accent:#f59e0b;">
                <button class="xym-close" data-action="close">✕</button>
                <div class="xym-icon-wrap xym-icon-pro">
                    <i class="fas fa-crown" style="font-size:1.75rem;"></i>
                </div>
                <div class="xym-pro-badge"><i class="fas fa-crown"></i> XYVERRA PRO</div>
                <h3 class="xym-title">Unlock ${featureName || 'this feature'}</h3>
                <p class="xym-message">This is a Pro-exclusive feature. Upgrade to get full access to premium AI tools.</p>
                <ul class="xym-feature-list">
                    <li><i class="fas fa-check"></i> Unlimited AI Counselor messages</li>
                    <li><i class="fas fa-check"></i> AI Mock Interviews &amp; feedback</li>
                    <li><i class="fas fa-check"></i> Advanced Skill Gap Analysis</li>
                    <li><i class="fas fa-check"></i> Career Analytics Dashboard</li>
                    <li><i class="fas fa-check"></i> Weekly Email Progress Reports</li>
                </ul>
                <div class="xym-actions">
                    <button class="xym-btn xym-btn-primary" style="background:linear-gradient(135deg,#f59e0b,#d97706);" data-action="upgrade">
                        <i class="fas fa-crown"></i> Upgrade to Pro
                    </button>
                    <button class="xym-btn xym-btn-ghost" data-action="cancel">Maybe later</button>
                </div>
            </div>`, { persistent: false });

        overlay.querySelector('[data-action="upgrade"]').addEventListener('click', () => {
            close();
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.22s';
            setTimeout(() => { window.location.href = 'subscription.html'; }, 220);
        });
        overlay.querySelector('[data-action="cancel"]').addEventListener('click', () => close());
        overlay.querySelector('[data-action="close"]').addEventListener('click', () => close());

        return false; // not pro
    };
    // Alias for auth-guard.js compatibility
    window.XyIsPro = function() { return localStorage.getItem('xyverra_is_pro') === 'true'; };

    // ─────────────────────────────────────────────────────────────
    //  5. XyToast — bottom toast notifications
    // ─────────────────────────────────────────────────────────────
    window.XyToast = function(message, type = 'info', duration = 4000) {
        const zone = getToastZone();
        const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
        const toast = document.createElement('div');
        toast.className = `xym-toast t-${type}`;
        toast.innerHTML = `<i class="fas ${icons[type] || icons.info} xym-toast-icon"></i><span>${message}</span>`;
        zone.appendChild(toast);

        requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('xym-toast-in')));

        const dismiss = () => {
            toast.classList.remove('xym-toast-in');
            toast.classList.add('xym-toast-out');
            setTimeout(() => toast.remove(), 250);
        };

        toast.addEventListener('click', dismiss);
        setTimeout(dismiss, duration);
        return { dismiss };
    };

    // ─────────────────────────────────────────────────────────────
    //  6. XyLoading — full screen loading overlay
    // ─────────────────────────────────────────────────────────────
    let _loadingEl = null;
    window.XyLoading = {
        show(message = 'Loading...') {
            if (!_loadingEl) {
                _loadingEl = document.createElement('div');
                _loadingEl.id = 'xym-loading-overlay';
                _loadingEl.innerHTML = `
                    <div class="xym-spinner"></div>
                    <span id="xym-loading-msg">${message}</span>`;
                document.body.appendChild(_loadingEl);
                requestAnimationFrame(() => requestAnimationFrame(() => _loadingEl.classList.add('xym-in')));
            } else {
                const msg = _loadingEl.querySelector('#xym-loading-msg');
                if (msg) msg.textContent = message;
            }
        },
        hide() {
            if (_loadingEl) {
                _loadingEl.classList.remove('xym-in');
                setTimeout(() => { _loadingEl?.remove(); _loadingEl = null; }, 250);
            }
        },
        update(msg) {
            const el = document.getElementById('xym-loading-msg');
            if (el) el.textContent = msg;
        }
    };

    // ─────────────────────────────────────────────────────────────
    //  7. XySessionExpired — top red banner
    // ─────────────────────────────────────────────────────────────
    window.XySessionExpired = function() {
        let banner = document.getElementById('xym-session-banner');
        if (banner) return;

        banner = document.createElement('div');
        banner.id = 'xym-session-banner';
        banner.innerHTML = `
            <span><i class="fas fa-lock" style="margin-right:8px;"></i>Your session has expired. Please log in again to continue.</span>
            <button style="background:rgba(255,255,255,.2);border:none;color:#fff;padding:6px 14px;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.85rem;" onclick="window.location.href='login.html'">
                Log In <i class="fas fa-arrow-right" style="margin-left:6px;"></i>
            </button>`;
        document.body.prepend(banner);
        requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add('xym-in')));
    };

    // ─────────────────────────────────────────────────────────────
    //  8. Offline / Online banner
    // ─────────────────────────────────────────────────────────────
    function initOfflineBanner() {
        const banner = document.createElement('div');
        banner.id = 'xym-offline-banner';
        banner.innerHTML = `
            <i class="fas fa-wifi-slash" style="color:#f87171;font-size:1.1rem;"></i>
            <span>You are offline. Some features may not be available.</span>`;
        document.body.appendChild(banner);

        const update = () => {
            if (!navigator.onLine) banner.classList.add('active');
            else banner.classList.remove('active');
        };

        window.addEventListener('online',  update);
        window.addEventListener('offline', update);
        update();
    }

    // ─────────────────────────────────────────────────────────────
    //  9. XySuccess / XyError / XyWarning / XyInfo — shortcuts
    // ─────────────────────────────────────────────────────────────
    window.XySuccess = (title, msg, btn) => window.XyAlert({ title, message: msg, type: 'success', btnText: btn });
    window.XyError   = (title, msg, btn) => window.XyAlert({ title, message: msg, type: 'error',   btnText: btn });
    window.XyWarning = (title, msg, btn) => window.XyAlert({ title, message: msg, type: 'warning', btnText: btn });
    window.XyInfo    = (title, msg, btn) => window.XyAlert({ title, message: msg, type: 'info',    btnText: btn });

    // ─────────────────────────────────────────────────────────────
    //  10. XyMilestone — Celebratory pop-up for achievements
    // ─────────────────────────────────────────────────────────────
    window.XyMilestone = function({ title = 'Achievement Unlocked!', message = '', emoji = '🏆', actionText = 'View Progress', actionLink = 'progress.html' } = {}) {
        const { overlay, close } = showOverlay(`
            <div class="xym-card" style="--xym-accent:#f59e0b;">
                <button class="xym-close" data-action="close">✕</button>
                <div style="font-size:3.5rem;margin-bottom:1rem;line-height:1;animation:xym-bounce 0.6s cubic-bezier(.34,1.56,.64,1);">${emoji}</div>
                <style>@keyframes xym-bounce{from{transform:scale(.5);opacity:0}to{transform:scale(1);opacity:1}}</style>
                <h3 class="xym-title">${title}</h3>
                ${message ? `<p class="xym-message">${message}</p>` : ''}
                <div class="xym-actions">
                    <button class="xym-btn xym-btn-primary" style="background:linear-gradient(135deg,#f59e0b,#d97706);" data-action="go">
                        ${actionText} <i class="fas fa-arrow-right"></i>
                    </button>
                    <button class="xym-btn xym-btn-ghost" data-action="close">Dismiss</button>
                </div>
            </div>`);
        overlay.querySelector('[data-action="go"]').addEventListener('click', () => {
            close();
            if (actionLink) { setTimeout(() => window.location.href = actionLink, 200); }
        });
        overlay.querySelector('[data-action="close"]').addEventListener('click', () => close());
    };

    // ─────────────────────────────────────────────────────────────
    //  11. XyNetworkError — API failure helper
    // ─────────────────────────────────────────────────────────────
    window.XyNetworkError = function(detail = '') {
        return window.XyAlert({
            title: 'Connection Error',
            message: detail || 'Unable to reach the server. Please check your internet connection and try again.',
            type: 'error',
            btnText: 'Try Again'
        });
    };

    // ─────────────────────────────────────────────────────────────
    //  12. XySubscriptionExpiring — Warning when sub expires soon
    // ─────────────────────────────────────────────────────────────
    window.XySubscriptionExpiring = function(daysLeft = 3) {
        return window.XyAlert({
            title: `⚠️ Pro Subscription Expiring`,
            message: `Your Pro subscription expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}. Renew now to keep uninterrupted access to all premium features.`,
            type: 'warning',
            btnText: 'Renew Now'
        }).then(() => { window.location.href = 'subscription.html'; });
    };

    // ─────────────────────────────────────────────────────────────
    //  Helpers
    // ─────────────────────────────────────────────────────────────
    function typeConfig(type) {
        const map = {
            success: { accent: '#10b981', icon: '<i class="fas fa-check-circle" style="font-size:1.8rem;"></i>' },
            error:   { accent: '#ef4444', icon: '<i class="fas fa-times-circle" style="font-size:1.8rem;"></i>' },
            warning: { accent: '#f59e0b', icon: '<i class="fas fa-exclamation-triangle" style="font-size:1.8rem;"></i>' },
            info:    { accent: '#2563eb', icon: '<i class="fas fa-info-circle" style="font-size:1.8rem;"></i>' },
        };
        return map[type] || map.info;
    }

    // ─────────────────────────────────────────────────────────────
    //  Init
    // ─────────────────────────────────────────────────────────────
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => { injectStyles(); initOfflineBanner(); });
        } else {
            injectStyles();
            initOfflineBanner();
        }
    }

    init();
})();

/* ==========================================================
   auth-guard.js — Xyverra Global Route Protection
   Include this BEFORE any page-specific JS on protected pages.
   ========================================================== */

// ── Auto-load the premium modal system on every page ──────
(function XyGuard() {
    // ── Utility: wipe locally cached roadmap progress. Call this whenever the
    // user switches to a different roadmap so Dashboard/Progress/Skill Gap/
    // Career Analytics never flash stale numbers from the old roadmap while
    // waiting for the backend's own reset (see /api/user/save-path) to land. ──
    window.clearCachedRoadmapProgress = function() {
        [
            'completedModules', 'completedCourses', 'quizScores',
            'xyverra_quiz_scores', 'xyverra_skill_score', 'xyverra_readiness_score',
            'xyverra_last_celebrated', 'selectedStartModule', 'pendingStartModule',
            'quizResultLevel', 'quizResultScore',
            'xyverra_mandatory_quiz_state', 'xyverra_active_quiz'
        ].forEach(key => localStorage.removeItem(key));
    };

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

    // ── Role-Based Access Control (RBAC) ──
    const isAdminUser = localStorage.getItem('xyverra_is_admin') === 'true';
    const ADMIN_ROUTES = ['admin.html'];

    if (ADMIN_ROUTES.includes(currentPage)) {
        if (!isAdminUser) {
            console.warn('[AuthGuard] Access Denied. User is not an admin.');
            window.location.replace('dashboard.html');
            return;
        }
    } else {
        if (isAdminUser) {
            console.warn('[AuthGuard] Admin accessing user route. Redirecting to admin dashboard.');
            window.location.replace('admin.html');
            return;
        }
    }


    // ── Check 3: Onboarding guard for specific protected pages ──
    if (ONBOARDING_REQUIRED.includes(currentPage)) {
        const selectedPath = localStorage.getItem('xyverra_selected_path') || localStorage.getItem('xyverra_target_career');
        const onboardingDone = localStorage.getItem('xyverra_onboarded') === 'true';

        if (!selectedPath || !onboardingDone) {
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

    // ── Utility: Check if Pro ──
    window.XyIsPro = function() {
        return localStorage.getItem('xyverra_is_pro') === 'true';
    };

    // ── Utility: Require Pro — uses xyverra-modals.js beautiful popup ──
    // xyverra-modals.js overrides this with its own version.
    // This is a safe fallback in case modals haven't loaded yet.
    window.XyRequirePro = window.XyRequirePro || function(featureName, force = false) {
        if (!force && window.XyIsPro()) return true;
        // If the premium modal system is loaded, use it
        if (typeof window._XyRequireProModal === 'function') {
            return window._XyRequireProModal(featureName);
        }
        // Absolute fallback — should never be seen in production
        if (confirm(`"${featureName || 'This feature'}" requires XYVERRA Pro.\n\nClick OK to upgrade now.`)) {
            window.location.href = 'subscription.html';
        }
        return false;
    };

    // ── Utility: Logout ──
    window.XyLogout = function() {
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace('login.html');
    };

    // ── Background Subscription Validation ──────────────────────────────
    // Silently fetches the user's live subscription status from the DB.
    // If the backend returns isPro: false (e.g., subscription was cancelled
    // or expired), localStorage is immediately corrected.
    // This prevents stale localStorage values from granting access after
    // a cancellation, even without a page refresh.
    (function syncSubscriptionStatus() {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) return; // Not logged in

        const API_BASE = (window.XYVERRA_API_BASE || 'http://localhost:5000').replace(/\/$/, '');

        const doSync = () => {
            fetch(API_BASE + '/api/user/me', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (!data || !data.success || !data.user) return;
                const isPro = data.user.isPro === true;
                // SECURITY: Always correct localStorage from server truth.
                // If a user manually set xyverra_is_pro=true via DevTools,
                // this call will reset it to false within seconds.
                localStorage.setItem('xyverra_is_pro', isPro ? 'true' : 'false');
                localStorage.setItem('chatSubscriptionActive', isPro ? 'true' : 'false');
                // Update chat count from DB source of truth
                if (typeof data.user.chatMessagesUsed === 'number') {
                    localStorage.setItem('chatMessagesUsed', String(data.user.chatMessagesUsed));
                }
            })
            .catch(() => { /* offline — keep using cached values */ });
        };

        // Run once on page load
        doSync();
        // Re-check every 5 minutes during long sessions (300,000 ms)
        setInterval(doSync, 5 * 60 * 1000);
    })();

})();


