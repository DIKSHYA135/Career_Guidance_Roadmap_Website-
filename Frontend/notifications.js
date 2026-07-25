/* =============================================================
   notifications.js — Global notification bell + popup system
   Injects itself into any authenticated dashboard page.
   ============================================================= */

(function NotificationSystem() {
    'use strict';

    const API_BASE  = (window.XYVERRA_CONFIG?.API_BASE || 'http://localhost:5000') + '/api/notifications';
    const POLL_MS   = 60_000; // refresh every 60 seconds
    const TYPE_ICONS = {
        success: 'fas fa-check-circle',
        info:    'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle',
        error:   'fas fa-times-circle'
    };

    let _token         = null;
    let _notifications = [];
    let _pollTimer     = null;
    let _panelOpen     = false;
    let _seeded        = false; // only seed once per session

    // ── Inject CSS link ────────────────────────────────────────
    function injectCSS() {
        if (document.getElementById('notif-styles')) return;
        const link = document.createElement('link');
        link.id   = 'notif-styles';
        link.rel  = 'stylesheet';
        link.href = 'notifications.css';
        document.head.appendChild(link);
    }

    // ── Build DOM ──────────────────────────────────────────────
    function buildDOM() {
        if (document.getElementById('notif-bell-wrapper')) return;

        // Bell button
        const wrapper = document.createElement('div');
        wrapper.id = 'notif-bell-wrapper';
        wrapper.innerHTML = `
            <button id="notif-bell-btn" title="Notifications" aria-label="Notifications">
                <i class="fas fa-bell"></i>
                <span id="notif-badge" style="display:none;"></span>
            </button>
        `;

        // Panel
        const panel = document.createElement('div');
        panel.id = 'notif-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Notifications');
        panel.innerHTML = `
            <div class="notif-panel-header">
                <h3><i class="fas fa-bell"></i> Notifications</h3>
                <div class="notif-header-actions">
                    <button class="notif-action-btn" id="notif-mark-all-btn" title="Mark all as read">
                        <i class="fas fa-check-double"></i> Mark all read
                    </button>
                    <button class="notif-action-btn" id="notif-clear-all-btn" title="Clear all">
                        <i class="fas fa-trash-alt"></i> Clear
                    </button>
                    <button class="notif-close-btn" id="notif-close-btn" title="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="notif-list" id="notif-list">
                ${renderSkeletons()}
            </div>
            <div class="notif-panel-footer" id="notif-footer" style="display:none;">
                <button class="notif-footer-btn" id="notif-refresh-btn">
                    <i class="fas fa-sync-alt"></i> Refresh
                </button>
            </div>
        `;

        // Backdrop (for closing on outside click)
        const backdrop = document.createElement('div');
        backdrop.id = 'notif-backdrop';

        // Toast container
        const toastContainer = document.createElement('div');
        toastContainer.id = 'notif-toast-container';

        document.body.appendChild(wrapper);
        document.body.appendChild(panel);
        document.body.appendChild(backdrop);
        document.body.appendChild(toastContainer);

        wireEvents();
    }

    function renderSkeletons() {
        return Array.from({ length: 3 }, () => `
            <div class="notif-skeleton">
                <div class="skel skel-icon"></div>
                <div class="skel-lines">
                    <div class="skel skel-line" style="width:60%"></div>
                    <div class="skel skel-line" style="width:90%"></div>
                    <div class="skel skel-line" style="width:40%"></div>
                </div>
            </div>
        `).join('');
    }

    // ── Events ─────────────────────────────────────────────────
    function wireEvents() {
        const bell     = document.getElementById('notif-bell-btn');
        const panel    = document.getElementById('notif-panel');
        const backdrop = document.getElementById('notif-backdrop');
        const closeBtn = document.getElementById('notif-close-btn');
        const markAll  = document.getElementById('notif-mark-all-btn');
        const clearAll = document.getElementById('notif-clear-all-btn');
        const refresh  = document.getElementById('notif-refresh-btn');

        bell.addEventListener('click', () => togglePanel());
        closeBtn.addEventListener('click', () => closePanel());
        backdrop.addEventListener('click', () => closePanel());

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && _panelOpen) closePanel();
        });

        markAll.addEventListener('click', async () => {
            await apiCall('PUT', 'read-all');
            _notifications = _notifications.map(n => ({ ...n, isRead: true }));
            renderList();
            updateBadge();
            showInlineToast('All notifications marked as read', 'success');
        });

        clearAll.addEventListener('click', async () => {
            const ok = await (window.XyConfirm ? window.XyConfirm({
                title: 'Clear Notifications',
                message: 'Are you sure you want to clear all your notifications?',
                confirmText: 'Clear All',
                cancelText: 'Cancel',
                type: 'warning',
                dangerous: true
            }) : Promise.resolve(confirm('Clear all notifications?')));
            if (!ok) return;
            await apiCall('DELETE', 'clear-all');
            _notifications = [];
            renderList();
            updateBadge();
        });

        if (refresh) {
            refresh.addEventListener('click', () => fetchNotifications(true));
        }
    }

    function togglePanel() {
        _panelOpen ? closePanel() : openPanel();
    }

    function openPanel() {
        _panelOpen = true;
        document.getElementById('notif-panel').classList.add('open');
        document.getElementById('notif-backdrop').classList.add('active');
        if (_notifications.length === 0) fetchNotifications();
    }

    function closePanel() {
        _panelOpen = false;
        document.getElementById('notif-panel').classList.remove('open');
        document.getElementById('notif-backdrop').classList.remove('active');
    }

    // ── API ────────────────────────────────────────────────────
    async function apiCall(method, path, body = null) {
        if (!_token) return null;
        try {
            const opts = {
                method,
                headers: {
                    'Authorization': `Bearer ${_token}`,
                    'Content-Type': 'application/json'
                }
            };
            if (body) opts.body = JSON.stringify(body);
            const res = await fetch(`${API_BASE}/${path}`, opts);
            return await res.json();
        } catch (e) {
            console.warn('[Notifications] API error:', e);
            return null;
        }
    }

    async function fetchNotifications(showSpinner = false) {
        if (!_token) return;

        if (showSpinner) {
            const list = document.getElementById('notif-list');
            if (list) list.innerHTML = renderSkeletons();
        }

        const data = await apiCall('GET', '');
        if (!data || !data.success) {
            renderEmpty('Could not load notifications.');
            return;
        }

        _notifications = data.notifications || [];
        renderList();
        updateBadge();

        // Show footer if there are notifications
        const footer = document.getElementById('notif-footer');
        if (footer) footer.style.display = _notifications.length ? 'flex' : 'none';

        // On first load, auto-seed if user has 0 notifications
        if (!_seeded && _notifications.length === 0) {
            _seeded = true;
            await apiCall('POST', 'seed');
            await fetchNotifications();
        }
    }

    // ── Rendering ──────────────────────────────────────────────
    function renderList() {
        const list = document.getElementById('notif-list');
        if (!list) return;

        if (_notifications.length === 0) {
            list.innerHTML = `
                <div class="notif-empty">
                    <i class="fas fa-bell-slash"></i>
                    <p>All caught up!</p>
                    <span>No notifications right now.</span>
                </div>`;
            return;
        }

        list.innerHTML = _notifications.map((n, idx) => `
            <div class="notif-item ${n.isRead ? '' : 'unread'}"
                 data-id="${n._id}"
                 data-link="${n.actionLink || ''}"
                 style="animation-delay: ${idx * 0.04}s">
                <div class="notif-icon ${n.type}">
                    <i class="${TYPE_ICONS[n.type] || TYPE_ICONS.info}"></i>
                </div>
                <div class="notif-content">
                    <div class="notif-title">${escapeHtml(n.title)}</div>
                    <div class="notif-message">${escapeHtml(n.message)}</div>
                    <div class="notif-time">${timeAgo(n.createdAt)}</div>
                </div>
                <button class="notif-delete-btn" data-id="${n._id}" title="Dismiss">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        // Wire clicks
        list.querySelectorAll('.notif-item').forEach(item => {
            item.addEventListener('click', e => {
                if (e.target.closest('.notif-delete-btn')) return; // handled below
                const id   = item.dataset.id;
                const link = item.dataset.link;
                handleNotifClick(id, link, item);
            });
        });

        list.querySelectorAll('.notif-delete-btn').forEach(btn => {
            btn.addEventListener('click', async e => {
                e.stopPropagation();
                const id = btn.dataset.id;
                await dismissNotification(id);
            });
        });
    }

    function renderEmpty(msg) {
        const list = document.getElementById('notif-list');
        if (!list) return;
        list.innerHTML = `
            <div class="notif-empty">
                <i class="fas fa-wifi" style="opacity:0.3;"></i>
                <p>Couldn't load</p>
                <span>${escapeHtml(msg)}</span>
            </div>`;
    }

    async function handleNotifClick(id, link, itemEl) {
        // Mark as read
        const notif = _notifications.find(n => n._id === id);
        if (notif && !notif.isRead) {
            await apiCall('PUT', `${id}/read`);
            notif.isRead = true;
            itemEl.classList.remove('unread');
            updateBadge();
        }

        // Navigate if there's a link
        if (link) {
            closePanel();
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.22s ease';
            setTimeout(() => { window.location.href = link; }, 220);
        }
    }

    async function dismissNotification(id) {
        const item = document.querySelector(`.notif-item[data-id="${id}"]`);
        if (item) {
            item.style.transition = 'opacity 0.2s, transform 0.2s';
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            setTimeout(() => item.remove(), 200);
        }

        await apiCall('DELETE', id);
        _notifications = _notifications.filter(n => n._id !== id);
        updateBadge();

        if (_notifications.length === 0) {
            setTimeout(() => renderList(), 250);
        }
    }

    function updateBadge() {
        const badge = document.getElementById('notif-badge');
        const bell  = document.getElementById('notif-bell-btn');
        if (!badge || !bell) return;

        const count = _notifications.filter(n => !n.isRead).length;

        if (count > 0) {
            badge.style.display = 'flex';
            badge.textContent   = count > 99 ? '99+' : count;
            bell.classList.add('has-unread');
        } else {
            badge.style.display = 'none';
            bell.classList.remove('has-unread');
        }
    }

    // ── Toast Pop-ups ──────────────────────────────────────────
    function showInlineToast(message, type = 'info', duration = 3500) {
        const container = document.getElementById('notif-toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `notif-toast`;
        toast.innerHTML = `
            <div class="notif-toast-icon ${type}">
                <i class="${TYPE_ICONS[type] || TYPE_ICONS.info}"></i>
            </div>
            <span class="notif-toast-text">${escapeHtml(message)}</span>
        `;

        container.appendChild(toast);
        toast.addEventListener('click', () => dismissToast(toast));

        setTimeout(() => dismissToast(toast), duration);
    }

    function dismissToast(toast) {
        if (!toast.parentNode) return;
        toast.classList.add('exit');
        setTimeout(() => toast.remove(), 260);
    }

    // ── Expose global API ──────────────────────────────────────
    window.XyNotify = {
        /**
         * Show a toast pop-up programmatically.
         * @param {string} message
         * @param {'info'|'success'|'warning'|'error'} type
         */
        toast(message, type = 'info') {
            showInlineToast(message, type);
        },

        /** Refresh the notification list from the server. */
        refresh() {
            fetchNotifications(true);
        }
    };

    // ── Helpers ────────────────────────────────────────────────
    function timeAgo(dateStr) {
        if (!dateStr) return '';
        const diff = Date.now() - new Date(dateStr).getTime();
        const s = Math.floor(diff / 1000);
        if (s < 60)  return 'Just now';
        const m = Math.floor(s / 60);
        if (m < 60)  return `${m}m ago`;
        const h = Math.floor(m / 60);
        if (h < 24)  return `${h}h ago`;
        const d = Math.floor(h / 24);
        if (d < 7)   return `${d}d ago`;
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // ── Init ───────────────────────────────────────────────────
    function init() {
        _token = localStorage.getItem('token');
        if (!_token) return; // not logged in — don't show bell

        injectCSS();

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                buildDOM();
                fetchNotifications();
                _pollTimer = setInterval(() => fetchNotifications(), POLL_MS);
            });
        } else {
            buildDOM();
            fetchNotifications();
            _pollTimer = setInterval(() => fetchNotifications(), POLL_MS);
        }
    }

    init();
})();
