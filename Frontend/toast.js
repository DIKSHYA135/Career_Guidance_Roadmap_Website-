/* ==========================================================
   modal.js — Xyverra Global Notification & Dialog System
   Replaces toasts, alert(), confirm(), and prompt() with
   polished glassmorphic UI modal components.
   ========================================================== */

(function () {
    const ICONS = {
        success: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>',
        error:   '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        warning: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        info:    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
    };

    const COLORS = {
        success: { btn: '#10B981', bg: 'rgba(16,185,129,0.1)', icon: ICONS.success },
        error:   { btn: '#EF4444', bg: 'rgba(239,68,68,0.1)', icon: ICONS.error },
        warning: { btn: '#F59E0B', bg: 'rgba(245,158,11,0.1)', icon: ICONS.warning },
        info:    { btn: '#4F46E5', bg: 'rgba(79,70,229,0.1)', icon: ICONS.info }
    };

    /**
     * Show a premium centered modal notification.
     */
    window.XyModal = function ({ title = '', message = '', type = 'info', confirmText = 'OK', onConfirm = null }) {
        const overlay = document.createElement('div');
        overlay.className = 'xy-modal-overlay';

        const c = COLORS[type] || COLORS.info;

        overlay.innerHTML = `
            <div class="xy-modal-card">
                <div class="xy-modal-icon-wrap" style="background:${c.bg}; color:${c.btn};">
                    ${c.icon}
                </div>
                ${title ? `<h3 class="xy-modal-title">${title}</h3>` : ''}
                ${message ? `<p class="xy-modal-msg">${message}</p>` : ''}
                <div class="xy-modal-actions">
                    <button class="xy-modal-btn-ok" style="background:${c.btn};">${confirmText}</button>
                </div>
            </div>
        `;

        const close = () => {
            overlay.classList.add('xy-modal-exit');
            overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
            if (onConfirm) onConfirm();
        };

        overlay.querySelector('.xy-modal-btn-ok').addEventListener('click', close);

        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add('xy-modal-enter'));
    };

    // Convenience shortcuts
    window.XySuccess = (title, msg, onConfirm) => window.XyModal({ title, message: msg, type: 'success', onConfirm });
    window.XyError   = (title, msg, onConfirm) => window.XyModal({ title, message: msg, type: 'error', onConfirm });
    window.XyWarning = (title, msg, onConfirm) => window.XyModal({ title, message: msg, type: 'warning', onConfirm });
    window.XyInfo    = (title, msg, onConfirm) => window.XyModal({ title, message: msg, type: 'info', onConfirm });

    // ── Custom Confirm Dialog ────────────────────────────────
    window.XyConfirm = function ({
        title   = 'Are you sure?',
        message = '',
        confirmText = 'Confirm',
        cancelText  = 'Cancel',
        type        = 'warning'
    } = {}) {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'xy-modal-overlay';

            const c = COLORS[type] || COLORS.warning;

            overlay.innerHTML = `
                <div class="xy-modal-card">
                    <div class="xy-modal-icon-wrap" style="background:${c.bg}; color:${c.btn};">
                        ${c.icon}
                    </div>
                    <h3 class="xy-modal-title">${title}</h3>
                    ${message ? `<p class="xy-modal-msg">${message}</p>` : ''}
                    <div class="xy-modal-actions">
                        <button class="xy-modal-btn-cancel">${cancelText}</button>
                        <button class="xy-modal-btn-ok" style="background:${c.btn};">${confirmText}</button>
                    </div>
                </div>
            `;

            const close = (result) => {
                overlay.classList.add('xy-modal-exit');
                overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
                resolve(result);
            };

            overlay.querySelector('.xy-modal-btn-ok').addEventListener('click', () => close(true));
            overlay.querySelector('.xy-modal-btn-cancel').addEventListener('click', () => close(false));

            document.body.appendChild(overlay);
            requestAnimationFrame(() => overlay.classList.add('xy-modal-enter'));
        });
    };

    // ── Inject Styles ────────────────────────────────────────
    function injectModalStyles() {
        if (document.getElementById('xy-modal-styles')) return;
        const style = document.createElement('style');
        style.id = 'xy-modal-styles';
        style.textContent = `
            .xy-modal-overlay {
                position: fixed;
                inset: 0;
                background: rgba(15,23,42,0.4);
                backdrop-filter: blur(8px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999999;
                opacity: 0;
                padding: 1rem;
            }

            .xy-modal-enter {
                animation: xyOverlayIn 0.3s ease forwards;
            }

            .xy-modal-exit {
                animation: xyOverlayOut 0.25s ease forwards;
            }

            @keyframes xyOverlayIn {
                from { opacity: 0; }
                to   { opacity: 1; }
            }

            @keyframes xyOverlayOut {
                from { opacity: 1; }
                to   { opacity: 0; }
            }

            .xy-modal-card {
                background: #FFFFFF;
                border-radius: 24px;
                padding: 2.5rem 2rem;
                width: 100%;
                max-width: 420px;
                box-shadow: 0 24px 64px rgba(15,23,42,0.15), 0 0 0 1px rgba(255,255,255,0.5) inset;
                text-align: center;
                transform: scale(0.95) translateY(10px);
                animation: xyCardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
                font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
            }

            @keyframes xyCardIn {
                to { transform: scale(1) translateY(0); }
            }

            .xy-modal-icon-wrap {
                width: 64px;
                height: 64px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.25rem;
            }

            .xy-modal-icon-wrap svg {
                width: 28px;
                height: 28px;
            }

            .xy-modal-title {
                font-size: 1.25rem;
                font-weight: 800;
                color: #0F172A;
                margin: 0 0 0.5rem;
                letter-spacing: -0.02em;
            }

            .xy-modal-msg {
                font-size: 0.95rem;
                color: #64748B;
                margin: 0 0 1.75rem;
                line-height: 1.6;
            }

            .xy-modal-actions {
                display: flex;
                gap: 1rem;
            }

            .xy-modal-btn-cancel {
                flex: 1;
                padding: 12px;
                border-radius: 12px;
                border: 1.5px solid #E2E8F0;
                background: #F8FAFC;
                color: #475569;
                font-size: 0.95rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                font-family: inherit;
            }

            .xy-modal-btn-cancel:hover {
                background: #F1F5F9;
                border-color: #CBD5E1;
            }

            .xy-modal-btn-ok {
                flex: 1;
                padding: 12px;
                border-radius: 12px;
                border: none;
                color: #FFFFFF;
                font-size: 0.95rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s;
                font-family: inherit;
                box-shadow: 0 4px 14px rgba(0,0,0,0.1);
            }

            .xy-modal-btn-ok:hover {
                filter: brightness(1.1);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.15);
            }

            @media (max-width: 480px) {
                .xy-modal-card { padding: 2rem 1.5rem; }
            }
        `;
        document.head.appendChild(style);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectModalStyles);
    } else {
        injectModalStyles();
    }
})();
