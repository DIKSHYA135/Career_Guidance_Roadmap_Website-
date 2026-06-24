/* admin.js - Logic for XYVERRA Admin Panel */

// Initialize
document.addEventListener('DOMContentLoaded', fetchDashboardStats);

// Modal functions for User Details
window.openUserModal = function(index) {
    const user = window.adminUsersData[index];
    if (!user) return;

    document.getElementById('ud-name').textContent = user.name || 'Unknown User';
    document.getElementById('ud-email').textContent = user.email || '';
    document.getElementById('ud-roadmap').textContent = user.selectedPath || 'Not Selected';
    document.getElementById('ud-joined').textContent = new Date(user.createdAt).toLocaleDateString();

    // ── Completed Modules (passed quiz) ─────────────────────────────
    const modsList = document.getElementById('ud-modules');
    const completedMods = user.completedModules || [];
    if (completedMods.length > 0) {
        modsList.innerHTML = completedMods.map(m =>
            `<li style="padding:4px 0;border-bottom:1px solid #f1f5f9;">
                <i class="fas fa-check-circle" style="color:#10b981;margin-right:8px;"></i>
                <span>${m.replace(/_/g, ' ')}</span>
            </li>`
        ).join('');
    } else {
        modsList.innerHTML = `<li style="color:#94a3b8;padding:8px 0;">No modules completed yet.</li>`;
    }

    // ── Studied Modules / Lessons (from Progress records) ────────────
    const lessonsList = document.getElementById('ud-lessons');
    const progressRecords = user.progressRecords || [];
    if (progressRecords.length > 0) {
        lessonsList.innerHTML = progressRecords.map(p => {
            const date = p.lastAccessed ? new Date(p.lastAccessed).toLocaleDateString() : '—';
            const statusBadge = p.status === 'completed'
                ? `<span style="background:#dcfce7;color:#16a34a;border-radius:4px;padding:1px 6px;font-size:0.75rem;font-weight:600;">Completed</span>`
                : `<span style="background:#eff6ff;color:#2563eb;border-radius:4px;padding:1px 6px;font-size:0.75rem;font-weight:600;">Studied</span>`;
            const label = p.moduleId.replace(/_/g, ' ');
            return `<li style="padding:5px 0;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                <i class="fas fa-book-open" style="color:#3b82f6;flex-shrink:0;"></i>
                <span style="flex:1;font-size:0.9rem;">${label}</span>
                ${statusBadge}
                <span style="color:#94a3b8;font-size:0.78rem;white-space:nowrap;">${date}</span>
            </li>`;
        }).join('');
    } else {
        lessonsList.innerHTML = `<li style="color:#94a3b8;padding:8px 0;">No modules studied yet.</li>`;
    }

    // ── Quiz Scores (from Progress records via quizScoresFromProgress) ─
    const quizzesList = document.getElementById('ud-quizzes');
    const quizScores = user.quizScoresFromProgress || {};
    const quizKeys = Object.keys(quizScores);
    if (quizKeys.length > 0) {
        quizzesList.innerHTML = quizKeys.map(q => {
            const score = quizScores[q];
            const color = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
            const bg    = score >= 80 ? '#f0fdf4' : score >= 50 ? '#fffbeb' : '#fef2f2';
            return `<li style="padding:5px 0;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                <i class="fas fa-clipboard-list" style="color:#8b5cf6;flex-shrink:0;"></i>
                <span style="flex:1;font-size:0.9rem;">${q.replace(/_/g, ' ')}</span>
                <span style="background:${bg};color:${color};border-radius:4px;padding:2px 10px;font-weight:700;font-size:0.9rem;">${score}%</span>
            </li>`;
        }).join('');
    } else {
        quizzesList.innerHTML = `<li style="color:#94a3b8;padding:8px 0;">No quizzes taken yet.</li>`;
    }

    document.getElementById('user-details-modal').style.display = 'flex';
};

window.closeUserModal = function() {
    document.getElementById('user-details-modal').style.display = 'none';
};


document.addEventListener('DOMContentLoaded', () => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('xyverra_is_admin') === 'true';
    if (!isAdmin) {
        window.location.replace('dashboard.html');
        return;
    }

    // Set Admin Name
    const adminName = localStorage.getItem('xyverra_user_name') || 'Admin User';
    document.getElementById('admin-display-name').textContent = adminName;
    document.getElementById('admin-initial').textContent = adminName.charAt(0).toUpperCase();

    const token = localStorage.getItem('token');
    const API_URL = 'http://localhost:5000/api/admin';

    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link[data-target]');
    const panels   = document.querySelectorAll('.admin-panel');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            panels.forEach(p => p.classList.remove('active'));
            const target = document.getElementById(targetId);
            if (target) target.classList.add('active');
        });
    });

    // Dedicated logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (typeof window.XyLogout === 'function') {
                window.XyLogout();
            } else {
                localStorage.clear();
                sessionStorage.clear();
                window.location.replace('login.html');
            }
        });
    }

    // --- REAL-TIME DATA FETCHING ---
    let regChart = null;
    let careerChart = null;

    async function fetchDashboardStats() {
        try {
            const res = await fetch(`${API_URL}/dashboard-stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 401 || res.status === 403) return forceLogout();
            const data = await res.json();
            if (data.success) {
                const stats = data.data;
                document.getElementById('stat-total-users').textContent = stats.totalUsers.toLocaleString();
                document.getElementById('stat-active-users').textContent = stats.activeUsersToday.toLocaleString();
                document.getElementById('stat-premium-subs').textContent = stats.premiumSubs.toLocaleString();
                document.getElementById('stat-ai-chats').textContent = stats.totalAiChats.toLocaleString();
                
                // If there are elements for these, update them
                const elInterviews = document.getElementById('stat-interviews');
                if (elInterviews) elInterviews.textContent = stats.totalInterviews.toLocaleString();
                const elRevenue = document.getElementById('stat-revenue');
                if (elRevenue) elRevenue.textContent = '$' + stats.revenue.toLocaleString();

                updateCharts(stats.registrationTrend, stats.careerInterests);
            }
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        }
    }

    // Map old badge names to new brand CSS classes
    function getBadgeClass(badgeColor, actionType) {
        if (badgeColor === 'badge-green' || actionType === 'Registration' || actionType === 'Premium Subscription Purchase') return 'badge-green';
        if (badgeColor === 'badge-red'   || actionType === 'Logout') return 'badge-red';
        if (badgeColor === 'badge-yellow'|| actionType === 'Mock Interview Started') return 'badge-yellow';
        if (actionType === 'AI Chat Usage') return 'badge-cyan';
        return 'badge-blue';
    }

    async function fetchActivityLogs() {
        try {
            const res = await fetch(`${API_URL}/activity-logs`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 401 || res.status === 403) return forceLogout();
            const data = await res.json();
            if (data.success) {
                const logsTbody = document.getElementById('activity-logs-tbody');
                if (logsTbody) {
                    if (data.logs.length === 0) {
                        logsTbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:2.5rem;color:var(--text-muted);">No activity yet.</td></tr>`;
                        return;
                    }
                    logsTbody.innerHTML = data.logs.map(log => `
                        <tr>
                            <td><strong>${log.userName}</strong><br><small style="color:var(--text-muted)">${log.userEmail}</small></td>
                            <td><span class="badge ${getBadgeClass(log.badgeColor, log.actionType)}">${log.actionType}</span></td>
                            <td style="color:var(--text-muted);font-size:0.85rem;">${log.details || '—'}</td>
                            <td style="color:var(--text-muted);font-size:0.82rem;white-space:nowrap;">${new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                    `).join('');
                }
            }
        } catch (error) {
            console.error('Error fetching activity logs:', error);
            const logsTbody = document.getElementById('activity-logs-tbody');
            if (logsTbody) logsTbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:2.5rem;color:var(--color-red);">Error connecting to server. Please ensure backend is running.</td></tr>`;
        }
    }

    async function fetchUsers() {
        try {
            const res = await fetch(`${API_URL}/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 401 || res.status === 403) return forceLogout();
            const data = await res.json();
            if (data.success) {
                const usersTbody = document.getElementById('users-management-tbody');
                if (usersTbody) {
                    if (data.users.length === 0) {
                        usersTbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:2.5rem;color:var(--text-muted);">No users found.</td></tr>`;
                        return;
                    }
                    window.adminUsersData = data.users;
                    usersTbody.innerHTML = data.users.map((u, i) => {
                        const completedCount = u.completedModules ? u.completedModules.length : 0;
                        const studiedCount   = u.progressRecords ? u.progressRecords.length : 0;
                        const quizCount      = u.quizScoresFromProgress ? Object.keys(u.quizScoresFromProgress).length : 0;
                        return `
                        <tr>
                            <td><strong>${u.name || '—'}</strong></td>
                            <td style="color:var(--text-muted);font-size:0.85rem;">${u.email}</td>
                            <td><span class="badge ${u.isAdmin ? 'badge-blue' : 'badge-cyan'}">${u.isAdmin ? '⚡ Admin' : 'User'}</span></td>
                            <td style="color:var(--text-muted);font-size:0.85rem;">${u.selectedPath || '<em>Not Selected</em>'}</td>
                            <td><span class="badge badge-green">${completedCount} Passed</span></td>
                            <td><span class="badge" style="background:#eff6ff;color:#2563eb;">${studiedCount} Studied</span></td>
                            <td><span class="badge" style="background:#faf5ff;color:#7c3aed;">${quizCount} Quizzes</span></td>
                            <td style="color:var(--text-muted);font-size:0.82rem;">${new Date(u.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-sm btn-outline" title="View Profile" onclick="openUserModal(${i})">
                                    <i class="fas fa-eye"></i> View
                                </button>
                            </td>
                        </tr>`;
                    }).join('');
                }
            }
                // --- Populate real Course & Roadmap & Progress tables ---
                renderRoadmapData(data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
            const usersTbody = document.getElementById('users-management-tbody');
            if (usersTbody) usersTbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:2.5rem;color:var(--color-red);">Error connecting to server. Please ensure backend is running.</td></tr>`;
        }
    }

    function forceLogout() {
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace('login.html');
    }

    function initCharts() {
        if (typeof Chart === 'undefined') return;
        Chart.defaults.color = '#64748b';
        Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
        Chart.defaults.font.size = 12;

        const ctxReg = document.getElementById('registrationChart');
        if (ctxReg) {
            regChart = new Chart(ctxReg, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'New Registrations',
                        data: [],
                        borderColor: '#2563eb',
                        backgroundColor: (ctx) => {
                            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 260);
                            gradient.addColorStop(0, 'rgba(37, 99, 235, 0.18)');
                            gradient.addColorStop(1, 'rgba(6, 182, 212, 0.02)');
                            return gradient;
                        },
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#06b6d4',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        borderWidth: 2.5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: '#eef2fb' }, ticks: { precision: 0, color: '#94a3b8' } },
                        x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                    }
                }
            });
        }

        const ctxCareer = document.getElementById('careerChart');
        if (ctxCareer) {
            careerChart = new Chart(ctxCareer, {
                type: 'doughnut',
                data: {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: ['#2563eb', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e'],
                        borderWidth: 3,
                        borderColor: '#ffffff',
                        hoverBorderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '73%',
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: { color: '#334155', font: { size: 12, weight: '600' }, padding: 16, boxWidth: 11, borderRadius: 3 }
                        }
                    }
                }
            });
        }

        // --- NEW: Learning Analytics Charts ---
        const ctxCourseComp = document.getElementById('courseCompletionChart');
        if (ctxCourseComp) {
            ctxCourseComp._chartInstance = new Chart(ctxCourseComp, {
                type: 'bar',
                data: {
                    labels: ['Intro to HTML5', 'JS Basics', 'React Patterns', 'Node.js Core', 'Python Data'],
                    datasets: [{
                        label: 'Completion Rate (%)',
                        data: [85, 78, 62, 55, 70],
                        backgroundColor: '#10b981',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true, max: 100 } }
                }
            });
        }

        const ctxDropoff = document.getElementById('roadmapDropoffChart');
        if (ctxDropoff) {
            ctxDropoff._chartInstance = new Chart(ctxDropoff, {
                type: 'line',
                data: {
                    labels: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5'],
                    datasets: [{
                        label: 'Active Users',
                        data: [1000, 850, 600, 400, 250],
                        borderColor: '#f43f5e',
                        backgroundColor: 'rgba(244, 63, 94, 0.1)',
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true } }
                }
            });
        }
    }

    function updateCharts(regTrend, careerInterests) {
        if (regChart && regTrend) {
            regChart.data.labels = regTrend.map(d => {
                const date = new Date(d.date);
                return date.toLocaleDateString(undefined, { weekday: 'short' });
            });
            regChart.data.datasets[0].data = regTrend.map(d => d.count);
            regChart.update();
        }

        if (careerChart && careerInterests) {
            careerChart.data.labels = careerInterests.map(c => c._id || 'Undecided');
            careerChart.data.datasets[0].data = careerInterests.map(c => c.count);
            careerChart.update();
        }
    }

    // Initialize and start polling
    initCharts();
    
    const refreshData = () => {
        fetchDashboardStats();
        fetchActivityLogs();
        fetchUsers();
    };

    refreshData(); // Initial fetch
    setInterval(refreshData, 5000); // Poll every 5 seconds for real-time feel
    // --- CUSTOM TOAST NOTIFICATIONS ---
    function showToast(title, message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let iconClass = 'fas fa-info-circle';
        if (type === 'success') iconClass = 'fas fa-check-circle';
        if (type === 'error') iconClass = 'fas fa-exclamation-circle';

        toast.innerHTML = `
            <i class="${iconClass} toast-icon"></i>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;

        container.appendChild(toast);

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        });

        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.add('fade-out');
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    }

    // --- SETTINGS & PROFILE LOGIC ---
    const adminEmail = localStorage.getItem('xyverra_user_email') || 'admin@xyverra.com';
    const settingsAdminNameInput = document.getElementById('setting-admin-name');
    if (settingsAdminNameInput) settingsAdminNameInput.value = adminName;
    const settingsAdminEmailInput = document.getElementById('setting-admin-email');
    if (settingsAdminEmailInput) settingsAdminEmailInput.value = adminEmail;

    const btnSaveProfile = document.getElementById('btn-save-profile');
    if (btnSaveProfile) {
        btnSaveProfile.addEventListener('click', () => {
            const newName = document.getElementById('setting-admin-name').value.trim();
            const newPass = document.getElementById('setting-new-password').value.trim();
            
            if (!newName) {
                showToast('Validation Error', 'Display name cannot be empty.', 'error');
                return;
            }

            // In a real app, this would hit a PUT /api/admin/profile endpoint.
            // For now, update local UI state immediately to reflect changes.
            localStorage.setItem('xyverra_user_name', newName);
            document.getElementById('admin-display-name').textContent = newName;
            document.getElementById('admin-initial').textContent = newName.charAt(0).toUpperCase();

            document.getElementById('setting-new-password').value = '';
            
            showToast('Profile Updated', 'Admin profile updated successfully!' + (newPass ? '\nPassword was also updated.' : ''), 'success');
        });
    }

    // ─────────────────────────────────────────────────────────────
    // REAL-DATA RENDERER — uses ROADMAP_DATA + backend user array
    // ─────────────────────────────────────────────────────────────
    function renderRoadmapData(users) {
        if (typeof ROADMAP_DATA === 'undefined') return;

        const paths = Object.keys(ROADMAP_DATA);

        // ── 1. Course Management Table ──────────────────────────
        const coursesTbody = document.querySelector('#courses-table tbody');
        if (coursesTbody) {
            let courseRows = '';
            let totalCourses = 0;
            const enrollmentMap = {}; // moduleId → user count enrolled

            // Count users per module using completedModules
            users.forEach(u => {
                (u.completedModules || []).forEach(mid => {
                    enrollmentMap[mid] = (enrollmentMap[mid] || 0) + 1;
                });
            });

            paths.forEach(path => {
                ROADMAP_DATA[path].forEach(mod => {
                    const completions = enrollmentMap[mod.id] || 0;
                    const totalUsers = users.length || 1;
                    const compRate = Math.round((completions / totalUsers) * 100);
                    const diffMap = { 0: 'Beginner', 1: 'Beginner', 2: 'Intermediate', 3: 'Intermediate', 4: 'Advanced', 5: 'Advanced' };
                    const modIndex = ROADMAP_DATA[path].indexOf(mod);
                    const diff = diffMap[modIndex] || 'Advanced';
                    const diffColor = diff === 'Beginner' ? '#10b981' : diff === 'Intermediate' ? '#f59e0b' : '#ef4444';
                    totalCourses++;
                    courseRows += `
                        <tr>
                            <td><strong>${mod.title}</strong></td>
                            <td style="color:var(--text-muted);font-size:0.85rem">${path}</td>
                            <td><span class="badge" style="background:${diffColor};color:#fff;padding:3px 8px;border-radius:4px;font-size:0.75rem">${diff}</span></td>
                            <td>${completions}</td>
                            <td>
                                <div style="display:flex;align-items:center;gap:8px">
                                    <div style="flex:1;background:#e2e8f0;border-radius:4px;height:6px">
                                        <div style="width:${compRate}%;background:#10b981;height:6px;border-radius:4px"></div>
                                    </div>
                                    <span style="font-size:0.8rem;color:var(--text-muted)">${compRate}%</span>
                                </div>
                            </td>
                            <td>
                                <button class="btn btn-sm" style="background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;padding:4px 10px;border-radius:5px;font-size:0.8rem"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-sm" style="background:#fff1f2;color:#ef4444;border:1px solid #fecaca;padding:4px 10px;border-radius:5px;font-size:0.8rem"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>`;
                });
            });

            coursesTbody.innerHTML = courseRows;
            const statEl = document.getElementById('stat-total-courses');
            if (statEl) statEl.textContent = totalCourses;
        }

        // ── 2. Roadmap Management Table ─────────────────────────
        const roadmapsTbody = document.querySelector('#roadmaps-table tbody');
        if (roadmapsTbody) {
            let roadmapRows = '';
            paths.forEach(path => {
                const mods = ROADMAP_DATA[path];
                const usersOnPath = users.filter(u => u.selectedPath === path).length;
                const totalModules = mods.length;
                const totalCourseCount = mods.reduce((sum, m) => sum + (m.courses || []).length, 0);
                roadmapRows += `
                    <tr>
                        <td><strong>${path}</strong></td>
                        <td style="color:var(--text-muted);font-size:0.85rem">${totalModules} Modules</td>
                        <td>${totalCourseCount}</td>
                        <td style="color:var(--text-muted)">${usersOnPath} enrolled</td>
                        <td>
                            <button class="btn btn-sm" style="background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;padding:4px 10px;border-radius:5px;font-size:0.8rem"><i class="fas fa-eye"></i> Preview</button>
                            <button class="btn btn-sm" style="background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;padding:4px 10px;border-radius:5px;font-size:0.8rem"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm" style="background:#fff1f2;color:#ef4444;border:1px solid #fecaca;padding:4px 10px;border-radius:5px;font-size:0.8rem"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>`;
            });
            roadmapsTbody.innerHTML = roadmapRows;
        }

        // ── 3. User Progress Table ──────────────────────────────
        const progressTbody = document.querySelector('#user-progress-table tbody');
        if (progressTbody) {
            if (!users.length) {
                progressTbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted)">No users found.</td></tr>`;
                return;
            }
            let progressRows = '';
            users.filter(u => !u.isAdmin).forEach(u => {
                const path = u.selectedPath;
                const completedMods = u.completedModules || [];
                let pct = 0, currentStage = 'Not Started', totalMods = 0, completedCount = 0;

                if (path && ROADMAP_DATA[path]) {
                    const mods = ROADMAP_DATA[path];
                    totalMods = mods.length;
                    completedCount = mods.filter(m => completedMods.includes(m.id)).length;
                    pct = totalMods > 0 ? Math.round((completedCount / totalMods) * 100) : 0;
                    const firstIncomplete = mods.find(m => !completedMods.includes(m.id));
                    currentStage = firstIncomplete ? firstIncomplete.title : '✅ Completed!';
                }

                const pctColor = pct >= 70 ? '#10b981' : pct >= 30 ? '#f59e0b' : '#2563eb';
                progressRows += `
                    <tr>
                        <td>
                            <strong>${u.name || '—'}</strong><br>
                            <small style="color:var(--text-muted)">${u.email}</small>
                        </td>
                        <td style="color:var(--text-muted);font-size:0.85rem">${path || '<em>Not Selected</em>'}</td>
                        <td style="font-size:0.82rem;color:var(--text-muted);max-width:200px">${currentStage}</td>
                        <td>
                            <div style="display:flex;align-items:center;gap:8px">
                                <div style="flex:1;background:#e2e8f0;border-radius:4px;height:8px">
                                    <div style="width:${pct}%;background:${pctColor};height:8px;border-radius:4px"></div>
                                </div>
                                <span style="font-size:0.8rem;font-weight:600;color:${pctColor}">${pct}%</span>
                            </div>
                        </td>
                        <td style="text-align:center">
                            <span style="font-weight:700;color:#2563eb">${completedCount}</span>
                            <span style="color:var(--text-muted)"> / ${totalMods}</span>
                        </td>
                    </tr>`;
            });
            progressTbody.innerHTML = progressRows || `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted)">No non-admin users found.</td></tr>`;

            // ── 4. Update Analytics Charts with real data ─────────────────
            const completionCounts = {};
            users.forEach(u => {
                (u.completedModules || []).forEach(mid => {
                    completionCounts[mid] = (completionCounts[mid] || 0) + 1;
                });
            });

            // Top 5 most completed modules
            const top5 = Object.entries(completionCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);

            const ctxCourseComp = document.getElementById('courseCompletionChart');
            if (ctxCourseComp && ctxCourseComp._chartInstance) {
                ctxCourseComp._chartInstance.data.labels = top5.map(([id]) => id);
                ctxCourseComp._chartInstance.data.datasets[0].data = top5.map(([, v]) => v);
                ctxCourseComp._chartInstance.update();
            }

            // Roadmap drop-off: count completions per stage across all paths
            const stageCounts = [0, 0, 0, 0, 0, 0];
            users.forEach(u => {
                if (!u.selectedPath || !ROADMAP_DATA[u.selectedPath]) return;
                const mods = ROADMAP_DATA[u.selectedPath];
                mods.forEach((m, i) => {
                    if ((u.completedModules || []).includes(m.id) && i < 6) {
                        stageCounts[i]++;
                    }
                });
            });

            const ctxDropoff = document.getElementById('roadmapDropoffChart');
            if (ctxDropoff && ctxDropoff._chartInstance) {
                ctxDropoff._chartInstance.data.datasets[0].data = stageCounts;
                ctxDropoff._chartInstance.update();
            }
        }
    }

    const btnSaveSystem = document.getElementById('btn-save-system');
    if (btnSaveSystem) {
        btnSaveSystem.addEventListener('click', () => {
            const allowReg = document.getElementById('toggle-registrations').checked;
            const enableAi = document.getElementById('toggle-ai').checked;
            const maintenance = document.getElementById('toggle-maintenance').checked;

            // In a real app, this would update global config in MongoDB.
            showToast('System Configurations Applied', 'Registrations: ' + (allowReg ? 'Allowed' : 'Disabled') + '\nAI Chat: ' + (enableAi ? 'Enabled' : 'Disabled') + '\nMaintenance Mode: ' + (maintenance ? 'ON' : 'OFF'), 'success');
        });
    }

});
