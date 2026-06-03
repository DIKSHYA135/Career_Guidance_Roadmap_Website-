/* ==========================================================
   toast.js — Xyverra Global Notification & Dialog System
   Replaces browser alert(), confirm(), and prompt() with
   polished glassmorphic UI components.
   ========================================================== */

(function () {
    // ── Toast Notification System ────────────────────────────
    function ensureContainer() {
        let c = document.getElementById('xyverra-toast-container');
        if (!c) {
            c = document.createElement('div');
            c.id = 'xyverra-toast-container';
            document.body.appendChild(c);
        }
        return c;
    }

    const ICONS = {
        success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>',
        error:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        warning: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        info:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
    };

    /**
     * Show a toast notification.
     * @param {string} message
     * @param {'success'|'error'|'warning'|'info'} type
     * @param {number} duration — ms before auto-dismiss (0 = permanent)
     */
    window.XyToast = function (message, type = 'info', duration = 4000) {
        const container = ensureContainer();

        const toast = document.createElement('div');
        toast.className = `xy-toast xy-toast-${type}`;
        toast.innerHTML = `
            <span class="xy-toast-icon">${ICONS[type] || ICONS.info}</span>
            <span class="xy-toast-msg">${message}</span>
            <button class="xy-toast-close" aria-label="Dismiss">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        `;

        const dismiss = () => {
            toast.classList.add('xy-toast-exit');
            toast.addEventListener('animationend', () => toast.remove(), { once: true });
        };

        toast.querySelector('.xy-toast-close').addEventListener('click', dismiss);
        container.appendChild(toast);

        // Trigger entrance animation
        requestAnimationFrame(() => toast.classList.add('xy-toast-enter'));

        if (duration > 0) {
            setTimeout(dismiss, duration);
        }

        return { dismiss };
    };

    // Convenience shortcuts
    window.XySuccess = (msg, d) => window.XyToast(msg, 'success', d);
    window.XyError   = (msg, d) => window.XyToast(msg, 'error',   d);
    window.XyWarning = (msg, d) => window.XyToast(msg, 'warning', d);
    window.XyInfo    = (msg, d) => window.XyToast(msg, 'info',    d);

    // ── Custom Confirm Dialog ────────────────────────────────
    /**
     * Replace window.confirm with a styled modal promise.
     * @returns {Promise<boolean>}
     */
    window.XyConfirm = function ({
        title   = 'Are you sure?',
        message = '',
        confirmText = 'Confirm',
        cancelText  = 'Cancel',
        type        = 'warning'   // 'warning' | 'danger' | 'info'
    } = {}) {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'xy-confirm-overlay';

            const colorMap = {
                danger:  { btn: '#EF4444', bg: 'rgba(239,68,68,0.08)', icon: ICONS.error },
                warning: { btn: '#F59E0B', bg: 'rgba(245,158,11,0.08)', icon: ICONS.warning },
                info:    { btn: '#3B82F6', bg: 'rgba(59,130,246,0.08)', icon: ICONS.info }
            };
            const c = colorMap[type] || colorMap.warning;

            overlay.innerHTML = `
                <div class="xy-confirm-card">
                    <div class="xy-confirm-icon-wrap" style="background:${c.bg}; color:${c.btn};">
                        ${c.icon}
                    </div>
                    <h3 class="xy-confirm-title">${title}</h3>
                    ${message ? `<p class="xy-confirm-msg">${message}</p>` : ''}
                    <div class="xy-confirm-actions">
                        <button class="xy-confirm-btn-cancel">${cancelText}</button>
                        <button class="xy-confirm-btn-ok" style="background:${c.btn};">${confirmText}</button>
                    </div>
                </div>
            `;

            const close = (result) => {
                overlay.classList.add('xy-confirm-exit');
                overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
                resolve(result);
            };

            overlay.querySelector('.xy-confirm-btn-ok').addEventListener('click', () => close(true));
            overlay.querySelector('.xy-confirm-btn-cancel').addEventListener('click', () => close(false));
            overlay.addEventListener('click', (e) => { if (e.target === overlay) close(false); });

            document.body.appendChild(overlay);
            requestAnimationFrame(() => overlay.classList.add('xy-confirm-enter'));
        });
    };

    // ── Custom Prompt Dialog ──────────────────────────────────
    /**
     * Replace window.prompt with a styled modal promise.
     * @returns {Promise<string|null>}
     */
    window.XyPrompt = function ({
        title       = 'Enter value',
        message     = '',
        placeholder = '',
        defaultValue = '',
        confirmText  = 'Save',
        cancelText   = 'Cancel'
    } = {}) {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'xy-confirm-overlay';

            overlay.innerHTML = `
                <div class="xy-confirm-card">
                    <div class="xy-confirm-icon-wrap" style="background:rgba(37,99,235,0.08); color:#2563EB;">
                        ${ICONS.info}
                    </div>
                    <h3 class="xy-confirm-title">${title}</h3>
                    ${message ? `<p class="xy-confirm-msg">${message}</p>` : ''}
                    <input class="xy-prompt-input" type="text" placeholder="${placeholder}" value="${defaultValue}" />
                    <div class="xy-confirm-actions">
                        <button class="xy-confirm-btn-cancel">${cancelText}</button>
                        <button class="xy-confirm-btn-ok" style="background:#2563EB;">${confirmText}</button>
                    </div>
                </div>
            `;

            const input = overlay.querySelector('.xy-prompt-input');

            const close = (result) => {
                overlay.classList.add('xy-confirm-exit');
                overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
                resolve(result);
            };

            overlay.querySelector('.xy-confirm-btn-ok').addEventListener('click', () => {
                const val = input.value.trim();
                close(val || null);
            });
            overlay.querySelector('.xy-confirm-btn-cancel').addEventListener('click', () => close(null));
            overlay.addEventListener('click', (e) => { if (e.target === overlay) close(null); });

            document.body.appendChild(overlay);
            requestAnimationFrame(() => overlay.classList.add('xy-confirm-enter'));

            // Focus input after animation
            setTimeout(() => input.focus(), 50);

            // Enter key submits
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const val = input.value.trim();
                    close(val || null);
                }
                if (e.key === 'Escape') close(null);
            });
        });
    };

    // ── Inject Styles ────────────────────────────────────────
    function injectToastStyles() {
        if (document.getElementById('xy-toast-styles')) return;
        const style = document.createElement('style');
        style.id = 'xy-toast-styles';
        style.textContent = `
            #xyverra-toast-container {
                position: fixed;
                top: 1.2rem;
                right: 1.2rem;
                z-index: 99999;
                display: flex;
                flex-direction: column;
                gap: 0.6rem;
                max-width: 380px;
                pointer-events: none;
            }

            .xy-toast {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.85rem 1rem;
                border-radius: 14px;
                background: #FFFFFF;
                box-shadow: 0 8px 32px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06);
                border: 1px solid transparent;
                pointer-events: all;
                min-width: 280px;
                opacity: 0;
                transform: translateX(30px);
                transition: none;
                font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
                font-size: 0.875rem;
                font-weight: 500;
                color: #1E293B;
                position: relative;
                overflow: hidden;
            }

            .xy-toast::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 3px;
                border-radius: 14px 0 0 14px;
            }

            .xy-toast-enter {
                animation: xyToastIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }

            .xy-toast-exit {
                animation: xyToastOut 0.25s ease-in forwards;
            }

            @keyframes xyToastIn {
                from { opacity: 0; transform: translateX(40px) scale(0.95); }
                to   { opacity: 1; transform: translateX(0)    scale(1); }
            }

            @keyframes xyToastOut {
                from { opacity: 1; transform: translateX(0)    scale(1); max-height: 100px; margin-bottom: 0; }
                to   { opacity: 0; transform: translateX(40px) scale(0.95); max-height: 0; margin-bottom: -0.6rem; }
            }

            .xy-toast-success { border-color: rgba(16,185,129,0.2); background: #F0FDF4; }
            .xy-toast-success::before { background: #10B981; }
            .xy-toast-success .xy-toast-icon { color: #10B981; }

            .xy-toast-error { border-color: rgba(239,68,68,0.2); background: #FEF2F2; }
            .xy-toast-error::before { background: #EF4444; }
            .xy-toast-error .xy-toast-icon { color: #EF4444; }

            .xy-toast-warning { border-color: rgba(245,158,11,0.2); background: #FFFBEB; }
            .xy-toast-warning::before { background: #F59E0B; }
            .xy-toast-warning .xy-toast-icon { color: #F59E0B; }

            .xy-toast-info { border-color: rgba(59,130,246,0.2); background: #EFF6FF; }
            .xy-toast-info::before { background: #3B82F6; }
            .xy-toast-info .xy-toast-icon { color: #3B82F6; }

            .xy-toast-icon {
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .xy-toast-msg {
                flex: 1;
                line-height: 1.4;
            }

            .xy-toast-close {
                background: none;
                border: none;
                cursor: pointer;
                color: #94A3B8;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2px;
                border-radius: 6px;
                flex-shrink: 0;
                transition: color 0.15s, background 0.15s;
            }

            .xy-toast-close:hover {
                color: #475569;
                background: rgba(0,0,0,0.06);
            }

            /* ── Confirm / Prompt Dialog ── */
            .xy-confirm-overlay {
                position: fixed;
                inset: 0;
                background: rgba(15,23,42,0.5);
                backdrop-filter: blur(6px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999999;
                opacity: 0;
                padding: 1rem;
            }

            .xy-confirm-enter {
                animation: xyOverlayIn 0.25s ease forwards;
            }

            .xy-confirm-exit {
                animation: xyOverlayOut 0.2s ease forwards;
            }

            @keyframes xyOverlayIn {
                from { opacity: 0; }
                to   { opacity: 1; }
            }

            @keyframes xyOverlayOut {
                from { opacity: 1; }
                to   { opacity: 0; }
            }

            .xy-confirm-card {
                background: #FFFFFF;
                border-radius: 20px;
                padding: 2rem;
                width: 100%;
                max-width: 400px;
                box-shadow: 0 24px 64px rgba(15,23,42,0.2);
                text-align: center;
                transform: scale(0.9);
                animation: xyCardIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s forwards;
                font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
            }

            @keyframes xyCardIn {
                to { transform: scale(1); }
            }

            .xy-confirm-icon-wrap {
                width: 52px;
                height: 52px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
            }

            .xy-confirm-icon-wrap svg {
                width: 24px;
                height: 24px;
            }

            .xy-confirm-title {
                font-size: 1.1rem;
                font-weight: 800;
                color: #0F172A;
                margin: 0 0 0.5rem;
            }

            .xy-confirm-msg {
                font-size: 0.875rem;
                color: #64748B;
                margin: 0 0 1.5rem;
                line-height: 1.5;
            }

            .xy-confirm-actions {
                display: flex;
                gap: 0.75rem;
                margin-top: 1.5rem;
            }

            .xy-confirm-btn-cancel {
                flex: 1;
                padding: 10px;
                border-radius: 10px;
                border: 1.5px solid #E2E8F0;
                background: #F8FAFC;
                color: #475569;
                font-size: 0.875rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.15s;
                font-family: inherit;
            }

            .xy-confirm-btn-cancel:hover {
                background: #F1F5F9;
                border-color: #CBD5E1;
            }

            .xy-confirm-btn-ok {
                flex: 1;
                padding: 10px;
                border-radius: 10px;
                border: none;
                color: #FFFFFF;
                font-size: 0.875rem;
                font-weight: 700;
                cursor: pointer;
                transition: filter 0.15s, transform 0.1s;
                font-family: inherit;
            }

            .xy-confirm-btn-ok:hover {
                filter: brightness(1.08);
                transform: translateY(-1px);
            }

            .xy-prompt-input {
                width: 100%;
                padding: 10px 14px;
                border-radius: 10px;
                border: 1.5px solid #E2E8F0;
                background: #F8FAFC;
                font-size: 0.9rem;
                color: #0F172A;
                outline: none;
                transition: border-color 0.2s, box-shadow 0.2s;
                box-sizing: border-box;
                margin-top: 0.5rem;
                font-family: inherit;
            }

            .xy-prompt-input:focus {
                border-color: #3B82F6;
                box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
            }

            @media (max-width: 480px) {
                #xyverra-toast-container {
                    top: auto;
                    bottom: 1rem;
                    right: 1rem;
                    left: 1rem;
                    max-width: none;
                }
                .xy-confirm-card { padding: 1.5rem; }
            }
        `;
        document.head.appendChild(style);
    }

    // Inject styles immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectToastStyles);
    } else {
        injectToastStyles();
    }
})();
