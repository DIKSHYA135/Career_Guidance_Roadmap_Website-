/* admin.js - Logic for XYVERRA Admin Panel */

// Job Readiness Score classification — must match backend/utils/readiness.js exactly.
function getReadinessLabel(score) {
    if (score >= 90) return { label: 'Outstanding', color: '#10b981' };
    if (score >= 70) return { label: 'Excellent', color: '#2563eb' };
    if (score >= 50) return { label: 'Good', color: '#f59e0b' };
    if (score >= 30) return { label: 'Fair', color: '#f97316' };
    return { label: 'Beginner', color: '#ef4444' };
}

// ── USER DETAILS MODAL ──
window.viewUserDetails = async (userId) => {
    try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/admin/user/${userId}/detailed`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (data.success) {
            const { user, subscriptions, quizAttempts, interviews, activityLogs, chatHistory, progressRecords } = data;

            document.getElementById('ud-name').textContent = user.name || 'Unknown User';
            document.getElementById('ud-email').textContent = user.email || 'No email';
            document.getElementById('ud-roadmap').textContent = user.selectedPath || 'Not Selected';
            document.getElementById('ud-joined').textContent = new Date(user.createdAt).toLocaleDateString();

            // Level / XP / Streak — XP formula matches dashboard.js so figures are consistent
            const completedCount = (user.completedModules || []).length;
            const streak = user.dailyStreak || 0;
            const xp = (completedCount * 120) + (streak * 50);
            document.getElementById('ud-level').textContent = user.selectedLevel || 'Beginner';
            document.getElementById('ud-xp').textContent = xp.toLocaleString() + ' XP';
            document.getElementById('ud-streak').textContent = streak + (streak === 1 ? ' day' : ' days');

            // Job Readiness Score — same canonical, server-persisted value shown on
            // Career Analytics and the Dashboard (backend/utils/readiness.js).
            const readinessScore = user.readinessScore || 0;
            const readinessInfo = getReadinessLabel(readinessScore);
            const readinessEl = document.getElementById('ud-readiness');
            readinessEl.textContent = `${readinessScore}% — ${readinessInfo.label}`;
            readinessEl.style.color = readinessInfo.color;

            // Roadmap progress %
            const roadmapMods = (typeof ROADMAP_DATA !== 'undefined' && user.selectedPath && ROADMAP_DATA[user.selectedPath]) || [];
            const progressPct = roadmapMods.length > 0
                ? Math.round((roadmapMods.filter(m => (user.completedModules || []).includes(m.id)).length / roadmapMods.length) * 100)
                : 0;
            document.getElementById('ud-progress-pct').textContent = roadmapMods.length > 0 ? progressPct + '%' : 'N/A';

            // Current Skills
            const skillsDiv = document.getElementById('ud-skills');
            const skills = user.skills || [];
            skillsDiv.innerHTML = skills.length > 0
                ? skills.map(s => `<span class="badge badge-blue" style="margin:2px;display:inline-block;">${s}</span>`).join('')
                : '<p style="color:#94a3b8;">No skills listed.</p>';

            // Career Discovery Results / Recommended Careers
            const cdDiv = document.getElementById('ud-career-discovery');
            const recommended = user.recommendedCareers || [];
            if (recommended.length > 0) {
                cdDiv.innerHTML = recommended.map(r => `
                    <div style="padding:6px 0;border-bottom:1px solid #f1f5f9;">
                        <strong>${r.career}</strong>${r.match != null ? ` — ${r.match}% match` : ''}
                        ${r.reason ? `<br><small style="color:#64748b;">${r.reason}</small>` : ''}
                    </div>`).join('');
            } else {
                cdDiv.innerHTML = '<p style="color:#94a3b8;">Career Discovery not completed yet.</p>';
            }

            // Roadmap modules — unlocked / studied / completed (from Progress collection)
            const lessonsDiv = document.getElementById('ud-lessons');
            const progList = progressRecords || [];
            if (progList.length > 0) {
                lessonsDiv.innerHTML = `<ul style="list-style:none;padding:0;margin:0;">` + progList.map(p => {
                    const date = p.lastAccessedAt ? new Date(p.lastAccessedAt).toLocaleDateString() : '—';
                    const statusBadge = p.status === 'completed'
                        ? `<span style="background:#dcfce7;color:#16a34a;border-radius:4px;padding:1px 6px;font-size:0.75rem;font-weight:600;">Completed</span>`
                        : p.status === 'studied'
                        ? `<span style="background:#eff6ff;color:#2563eb;border-radius:4px;padding:1px 6px;font-size:0.75rem;font-weight:600;">Studied</span>`
                        : `<span style="background:#f1f5f9;color:#94a3b8;border-radius:4px;padding:1px 6px;font-size:0.75rem;font-weight:600;">${p.status}</span>`;
                    const modTitle = typeof resolveModuleTitle === 'function' ? resolveModuleTitle(p.moduleId) : p.moduleId.replace(/_/g, ' ');
                    return `<li style="padding:5px 0;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-book-open" style="color:#3b82f6;flex-shrink:0;"></i>
                        <span style="flex:1;font-size:0.9rem;">${modTitle}</span>
                        ${statusBadge}
                        <span style="color:#94a3b8;font-size:0.78rem;white-space:nowrap;">${date}</span>
                    </li>`;
                }).join('') + `</ul>`;
            } else {
                lessonsDiv.innerHTML = '<p style="color:#94a3b8;">No modules unlocked/studied yet.</p>';
            }

            // Subscriptions
            const subsDiv = document.getElementById('ud-subscriptions');
            if (subscriptions && subscriptions.length > 0) {
                subsDiv.innerHTML = subscriptions.map(sub => {
                    const txStr = sub.transaction ? ` Paid Rs. ${sub.transaction.amount} via ${sub.transaction.paymentMethod}` : '';
                    return `<div style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
                        <strong>Plan:</strong> ${sub.planId} (${sub.status}) <br>
                        <small>Started: ${new Date(sub.startDate).toLocaleDateString()}${txStr}</small>
                    </div>`;
                }).join('');
            } else {
                subsDiv.innerHTML = '<p>No subscriptions found.</p>';
            }

            // Quizzes
            const quizDiv = document.getElementById('ud-quiz-history');
            if (quizAttempts && quizAttempts.length > 0) {
                quizDiv.innerHTML = quizAttempts.map(q => {
                    let answersHtml = '';
                    if (q.answers && q.answers.length > 0) {
                        answersHtml = `<ul style="margin-top: 5px; font-size: 0.85rem; color: #475569;">` + q.answers.map((a, i) => {
                            const icon = a.isCorrect ? '✅' : '❌';
                            return `<li>${icon} Q${i+1}: ${a.questionText} <br> <em>Selected: ${a.selectedOption}</em></li>`;
                        }).join('') + `</ul>`;
                    }
                    const modTitle = typeof resolveModuleTitle === 'function' ? resolveModuleTitle(q.moduleId) : q.moduleId;
                    return `<div style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
                        <strong>Module: ${modTitle}</strong> - Score: ${q.scorePercentage}% (${q.passed ? 'Passed' : 'Failed'})
                        <br><small>Date: ${new Date(q.createdAt).toLocaleString()}</small>
                        ${answersHtml}
                    </div>`;
                }).join('');
            } else {
                quizDiv.innerHTML = '<p>No quiz history found.</p>';
            }

            // Interviews
            const intDiv = document.getElementById('ud-interviews');
            if (interviews && interviews.length > 0) {
                intDiv.innerHTML = interviews.map(int => {
                    let qsHtml = '';
                    if (int.questionsAsked && int.questionsAsked.length > 0) {
                        qsHtml = `<ul style="margin-top: 5px; font-size: 0.85rem; color: #475569;">` + int.questionsAsked.map((qa, i) => {
                            return `<li>
                                <strong>Q${i+1}:</strong> ${qa.question} <br>
                                <strong>Answer:</strong> ${qa.userAnswer || 'Skipped'} <br>
                                <strong>AI Feedback:</strong> ${qa.aiFeedback || 'None'}
                            </li>`;
                        }).join('') + `</ul>`;
                    }
                    return `<div style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
                        <strong>Job Role: ${int.jobRole}</strong> - Score: ${Math.round(int.overallScore || 0)}%
                        <br><small>Date: ${new Date(int.createdAt).toLocaleString()}</small>
                        ${qsHtml}
                    </div>`;
                }).join('');
            } else {
                intDiv.innerHTML = '<p>No mock interviews found.</p>';
            }

            // Chat History
            const chatDiv = document.getElementById('ud-chat-history');
            if (chatHistory && chatHistory.length > 0) {
                chatDiv.innerHTML = chatHistory.map(msg => {
                    const isUser = msg.role === 'user';
                    const ts = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : '';
                    const bg = isUser ? '#eff6ff' : '#f0fdf4';
                    const label = isUser ? '🧑 User' : '🤖 AI';
                    const labelColor = isUser ? '#2563eb' : '#059669';
                    return `<div style="margin-bottom:8px;padding:8px 10px;background:${bg};border-radius:6px;">
                        <div style="font-size:0.75rem;font-weight:700;color:${labelColor};margin-bottom:3px;">${label} ${ts ? `<span style="color:#94a3b8;font-weight:400;">&nbsp;·&nbsp;${ts}</span>` : ''}</div>
                        <div style="font-size:0.875rem;color:#1e293b;line-height:1.5;">${msg.content}</div>
                    </div>`;
                }).join('');
            } else {
                chatDiv.innerHTML = '<p style="color:#94a3b8;">No chat history found.</p>';
            }

            // Activity
            const actDiv = document.getElementById('ud-activity');
            if (activityLogs && activityLogs.length > 0) {
                actDiv.innerHTML = activityLogs.map(a => {
                    return `<div style="padding: 5px; border-bottom: 1px dashed #e2e8f0; font-size: 0.85rem;">
                        <strong>[${new Date(a.timestamp).toLocaleString()}]</strong> ${a.actionType}: ${a.details || ''}
                    </div>`;
                }).join('');
            } else {
                actDiv.innerHTML = '<p>No activity logs found.</p>';
            }

            document.getElementById('user-details-modal').style.display = 'flex';
        }
    } catch (e) {
        console.error(e);
        showToast('Error', 'Failed to fetch user details.', 'error');
    }
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

    // Mobile hamburger toggle
    const adminSidebar = document.querySelector('.admin-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    hamburgerBtn?.addEventListener('click', () => {
        adminSidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
    });
    sidebarOverlay?.addEventListener('click', () => {
        adminSidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    });

    // Close sidebar on nav click (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                adminSidebar.classList.remove('open');
                sidebarOverlay.classList.remove('active');
            }
        });
    });

    // User management search filter
    const userSearchInput = document.getElementById('user-search-input');
    userSearchInput?.addEventListener('input', () => {
        const q = userSearchInput.value.toLowerCase();
        document.querySelectorAll('#users-management-tbody tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
    });

    // Dashboard user activity search filter
    const dashUserSearch = document.getElementById('dash-user-search');
    dashUserSearch?.addEventListener('input', () => {
        const q = dashUserSearch.value.toLowerCase();
        document.querySelectorAll('#dash-users-tbody tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
    });

    // --- REAL-TIME DATA FETCHING ---
    let regChart = null;
    let careerChart = null;
    let careerDetailChart = null;

    async function fetchDashboardStats() {
        try {
            const res = await fetch(`${API_URL}/dashboard-stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 401 || res.status === 403) return forceLogout();
            const data = await res.json();
            if (data.success) {
                const stats = data.data;
                document.getElementById('stat-total-users').textContent = stats.totalUsers;
                document.getElementById('stat-active-users').textContent = stats.activeUsersToday;
                document.getElementById('stat-premium-subs').textContent = stats.premiumSubs;
                document.getElementById('stat-total-interviews').textContent = stats.totalInterviews;
                document.getElementById('stat-revenue').textContent = 'Rs ' + (stats.revenue || 0).toLocaleString();
                
                // New stats
                const aiStat = document.getElementById('stat-ai-conversations');
                if (aiStat) aiStat.textContent = stats.totalAiConversations || 0;
                
                const intTodayStat = document.getElementById('stat-interviews-today');
                if (intTodayStat) intTodayStat.textContent = stats.interviewsToday || 0;   document.getElementById('stat-ai-chats').textContent = stats.totalAiChats.toLocaleString();
                
                // If there are elements for these, update them
                const elInterviews = document.getElementById('stat-interviews');
                if (elInterviews) elInterviews.textContent = stats.totalInterviews.toLocaleString();
                const elRevenue = document.getElementById('stat-revenue');
                if (elRevenue) elRevenue.textContent = 'Rs. ' + stats.revenue.toLocaleString();

                updateCharts(stats.registrationTrend, stats.careerInterests);
                populateCareerPanel(stats.careerInterests, stats.totalUsers);
                populateAiPanel(stats.totalAiChats, stats.totalUsers);
                populateMockPanel(stats.totalInterviews);
                populatePremiumPanel(stats.premiumSubs, stats.revenue, stats.totalUsers);
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
                    populateAnalyticsActivityLists(data.logs);
                }
            }
        } catch (error) {
            console.error('Error fetching activity logs:', error);
            const logsTbody = document.getElementById('activity-logs-tbody');
            if (logsTbody) logsTbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:2.5rem;color:var(--color-red);">Error connecting to server. Please ensure backend is running.</td></tr>`;
        }
    }

    async function fetchSubscriptions() {
        try {
            const res = await fetch(`${API_URL}/subscriptions`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 401 || res.status === 403) return forceLogout();
            const data = await res.json();
            if (data.success) {
                const subTbody = document.getElementById('subscriptions-tbody');
                if (subTbody) {
                    if (data.subscriptions.length === 0) {
                        subTbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:2.5rem;color:var(--text-muted);">No subscriptions found.</td></tr>`;
                        return;
                    }
                    subTbody.innerHTML = data.subscriptions.map(s => {
                        const amount = s.amountPaid ? `Rs. ${s.amountPaid}` : '—';
                        const start = s.startDate ? new Date(s.startDate).toLocaleDateString() : '—';
                        const end = s.endDate ? new Date(s.endDate).toLocaleDateString() : '—';
                        const statusColor = s.status === 'active' ? 'badge-green' : (s.status === 'expired' ? 'badge-red' : 'badge-yellow');
                        
                        return `
                        <tr>
                            <td><strong>${s.userName}</strong><br><small style="color:var(--text-muted)">${s.userEmail}</small></td>
                            <td><span class="badge badge-purple">${s.planId}</span></td>
                            <td><span class="badge ${statusColor}">${s.status}</span></td>
                            <td>${amount}</td>
                            <td>${s.paymentMethod || '—'}</td>
                            <td style="font-family:monospace;font-size:0.85rem;">${s.transactionId || '—'}</td>
                            <td style="color:var(--text-muted);font-size:0.85rem;">${start}</td>
                            <td style="color:var(--text-muted);font-size:0.85rem;">${end}</td>
                        </tr>`;
                    }).join('');
                }
            }
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
            const subTbody = document.getElementById('subscriptions-tbody');
            if (subTbody) subTbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:2.5rem;color:var(--color-red);">Error connecting to server.</td></tr>`;
        }
    }

    async function fetchInterviews() {
        try {
            const res = await fetch(`${API_URL}/interviews`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 401 || res.status === 403) return forceLogout();
            const data = await res.json();
            if (data.success) {
                const intTbody = document.getElementById('interviews-tbody');
                if (intTbody) {
                    if (data.interviews.length === 0) {
                        intTbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:2.5rem;color:var(--text-muted);">No interviews found.</td></tr>`;
                        return;
                    }
                    intTbody.innerHTML = data.interviews.map(i => {
                        const date = i.createdAt ? new Date(i.createdAt).toLocaleDateString() : '—';
                        const score = Math.round(i.overallScore || 0);
                        const statusColor = i.completed ? 'badge-green' : 'badge-yellow';
                        const statusText = i.completed ? 'Completed' : 'In Progress';
                        
                        return `
                        <tr>
                            <td><strong>${i.userName}</strong><br><small style="color:var(--text-muted)">${i.userEmail}</small></td>
                            <td><span class="badge badge-purple">${i.jobRole || '—'}</span></td>
                            <td><strong>${score}%</strong></td>
                            <td><span class="badge ${statusColor}">${statusText}</span></td>
                            <td style="color:var(--text-muted);font-size:0.85rem;">${date}</td>
                            <td>${i.questionsAsked ? i.questionsAsked.length : 0} Qs</td>
                        </tr>`;
                    }).join('');
                }
            }
        } catch (error) {
            console.error('Error fetching interviews:', error);
            const intTbody = document.getElementById('interviews-tbody');
            if (intTbody) intTbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:2.5rem;color:var(--color-red);">Error connecting to server.</td></tr>`;
        }
    }

    async function fetchChatLogs() {
        try {
            const res = await fetch(`${API_URL}/chat-logs`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 401 || res.status === 403) return forceLogout();
            const data = await res.json();
            if (data.success) {
                window.adminChatLogs = data.chatLogs; // cache for search
                renderChatLogs(data.chatLogs);
            }
        } catch (error) {
            console.error('Error fetching chat logs:', error);
            const el = document.getElementById('chat-logs-list');
            if (el) el.innerHTML = `<p style="color:var(--color-red);text-align:center;padding:2rem;">Error connecting to server.</p>`;
        }
    }

    function renderChatLogs(chatLogs) {
        const el = document.getElementById('chat-logs-list');
        if (!el) return;
        if (!chatLogs || chatLogs.length === 0) {
            el.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:2rem;">No chat logs found. Users need to start chatting first.</p>`;
            return;
        }
        el.innerHTML = chatLogs.map(u => {
            const msgs = u.chatHistory || [];
            const msgHtml = msgs.map(msg => {
                const isUser = msg.role === 'user';
                const ts = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : '';
                const bg = isUser ? '#eff6ff' : '#f0fdf4';
                const label = isUser ? '🧑 User' : '🤖 AI';
                const labelColor = isUser ? '#2563eb' : '#059669';
                return `<div style="margin-bottom:6px;padding:7px 10px;background:${bg};border-radius:5px;">
                    <div style="font-size:0.72rem;font-weight:700;color:${labelColor};margin-bottom:2px;">${label} ${ts ? `<span style="color:#94a3b8;font-weight:400;">· ${ts}</span>` : ''}</div>
                    <div style="font-size:0.85rem;color:#1e293b;line-height:1.5;">${msg.content}</div>
                </div>`;
            }).join('');

            return `<div class="glass-card" style="margin-bottom:1rem;padding:1rem;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:0.75rem;">
                    <div style="width:36px;height:36px;background:#eff6ff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#2563eb;font-size:0.9rem;flex-shrink:0;">${(u.userName || '?').charAt(0).toUpperCase()}</div>
                    <div style="flex:1;">
                        <div style="font-weight:700;color:#0f172a;">${u.userName}</div>
                        <div style="font-size:0.8rem;color:#64748b;">${u.userEmail}</div>
                    </div>
                    <span class="badge badge-blue">${u.totalMessages} total msgs</span>
                    <span class="badge" style="background:#f0fdf4;color:#059669;">${msgs.length} saved</span>
                </div>
                ${msgs.length > 0 ? `<div style="max-height:300px;overflow-y:auto;border-top:1px solid #e2e8f0;padding-top:0.75rem;">${msgHtml}</div>` : '<p style="color:#94a3b8;font-size:0.85rem;">No saved messages yet.</p>'}
            </div>`;
        }).join('');
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
                        const studiedCount   = u.studiedLessonsCount !== undefined ? u.studiedLessonsCount : (u.progressRecords ? u.progressRecords.length : 0);
                        const quizCount      = u.quizCount !== undefined ? u.quizCount : (u.quizScoresFromProgress ? Object.keys(u.quizScoresFromProgress).length : 0);
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
                                <button class="btn btn-sm btn-outline" title="View Profile" onclick="viewUserDetails('${u._id}')">
                                    <i class="fas fa-eye"></i> View
                                </button>
                            </td>
                        </tr>`;
                    }).join('');
                }
                renderDashboardUserTable(data.users);
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

    // ── Analytics panel population helpers ─────────────────────────

    function populateCareerPanel(careerInterests, totalUsers) {
        if (!careerInterests) return;
        if (careerDetailChart && careerInterests.length > 0) {
            careerDetailChart.data.labels = careerInterests.map(c => c._id || 'Undecided');
            careerDetailChart.data.datasets[0].data = careerInterests.map(c => c.count);
            careerDetailChart.update();
        }
        const listEl = document.getElementById('career-paths-list');
        if (!listEl) return;
        if (!careerInterests.length) {
            listEl.innerHTML = `<p style="color:var(--text-muted);font-size:0.875rem;text-align:center;padding:2rem;">No career path selections yet.</p>`;
            return;
        }
        const maxCount = careerInterests[0].count || 1;
        const colors = ['#2563eb', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6'];
        listEl.innerHTML = careerInterests.map((c, i) => {
            const pct = Math.round((c.count / (totalUsers || 1)) * 100);
            const barW = Math.round((c.count / maxCount) * 100);
            const col = colors[i % colors.length];
            return `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-light);">
                <div style="width:26px;height:26px;background:${col}22;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:800;color:${col};flex-shrink:0;">${i + 1}</div>
                <div style="flex:1;min-width:0;">
                    <div style="font-weight:600;font-size:0.875rem;color:var(--text-main);margin-bottom:4px;">${c._id || 'Undecided'}</div>
                    <div style="height:5px;background:#e2e8f0;border-radius:4px;overflow:hidden;"><div style="width:${barW}%;height:100%;background:${col};border-radius:4px;"></div></div>
                </div>
                <div style="text-align:right;flex-shrink:0;">
                    <div style="font-weight:700;font-size:0.875rem;color:var(--text-main);">${c.count}</div>
                    <div style="font-size:0.7rem;color:var(--text-muted);">${pct}%</div>
                </div>
            </div>`;
        }).join('');
    }

    function populateAiPanel(totalChats, totalUsers) {
        const el = document.getElementById('ai-stat-chats');
        const elU = document.getElementById('ai-stat-users');
        const elA = document.getElementById('ai-stat-avg');
        if (el) el.textContent = (totalChats || 0).toLocaleString();
        if (elU) elU.textContent = (totalUsers || 0).toLocaleString();
        if (elA) elA.textContent = totalUsers ? (totalChats / totalUsers).toFixed(1) : '0';
    }

    function populateMockPanel(totalInterviews) {
        const el = document.getElementById('mock-stat-total');
        if (el) el.textContent = (totalInterviews || 0).toLocaleString();
    }

    function populatePremiumPanel(premiumSubs, revenue, totalUsers) {
        const elS = document.getElementById('premium-stat-subs');
        const elR = document.getElementById('premium-stat-revenue');
        const elC = document.getElementById('premium-stat-conversion');
        if (elS) elS.textContent = (premiumSubs || 0).toLocaleString();
        if (elR) elR.textContent = 'Rs. ' + (revenue || 0).toLocaleString();
        if (elC) elC.textContent = totalUsers ? Math.round((premiumSubs / totalUsers) * 100) + '%' : '0%';
    }

    function renderDashboardUserTable(users) {
        const tbody = document.getElementById('dash-users-tbody');
        if (!tbody) return;

        const rows = users.filter(u => !u.isAdmin);
        if (!rows.length) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--text-muted);">No users registered yet.</td></tr>`;
            return;
        }

        tbody.innerHTML = rows.map(u => {
            const completedCount = u.completedModules ? u.completedModules.length : 0;
            const studiedCount   = u.studiedLessonsCount !== undefined ? u.studiedLessonsCount : (u.progressRecords ? u.progressRecords.length : 0);
            const quizCount      = u.quizCount !== undefined ? u.quizCount : (u.quizScoresFromProgress ? Object.keys(u.quizScoresFromProgress).length : 0);
            const lastActive     = u.lastLoginDate ? new Date(u.lastLoginDate).toLocaleDateString() : '—';
            const pathLabel      = u.selectedPath
                ? `<span class="badge badge-blue" style="font-size:0.7rem;max-width:130px;overflow:hidden;text-overflow:ellipsis;display:inline-block;">${u.selectedPath}</span>`
                : `<span style="color:var(--text-muted);font-size:0.82rem;font-style:italic;">Not chosen</span>`;

            const completedColor = completedCount > 0 ? 'badge-green' : '';
            const completedStyle = completedCount === 0 ? 'background:#f1f5f9;color:#94a3b8;' : '';

            return `<tr>
                <td>
                    <strong style="font-size:0.9rem;">${u.name || '—'}</strong><br>
                    <small style="color:var(--text-muted)">${u.email}</small>
                </td>
                <td>${pathLabel}</td>
                <td><span class="badge ${completedColor}" style="${completedStyle}padding:3px 10px;">${completedCount}</span></td>
                <td><span class="badge" style="background:#eff6ff;color:#2563eb;padding:3px 10px;">${studiedCount}</span></td>
                <td><span class="badge badge-purple" style="padding:3px 10px;">${quizCount}</span></td>
                <td style="color:var(--text-muted);font-size:0.875rem;">${(u.chatMessagesUsed || 0).toLocaleString()}</td>
                <td style="color:var(--text-muted);font-size:0.82rem;white-space:nowrap;">${lastActive}</td>
                <td>
                    <button class="btn btn-sm" style="background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;padding:4px 10px;border-radius:5px;font-size:0.8rem;cursor:pointer;" onclick="viewUserDetails('${u._id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            </tr>`;
        }).join('');
    }

    function populateAnalyticsActivityLists(logs) {
        const renderTable = (items) => {
            if (!items.length) return `<p style="color:var(--text-muted);font-size:0.875rem;text-align:center;padding:2rem;">No activity logged yet.</p>`;
            return `<div class="table-container"><table class="data-table"><thead><tr><th>User</th><th>Details</th><th>Time</th></tr></thead><tbody>` +
                items.map(l => `<tr>
                    <td><strong>${l.userName}</strong><br><small style="color:var(--text-muted)">${l.userEmail}</small></td>
                    <td style="color:var(--text-muted);font-size:0.85rem;">${l.details || '—'}</td>
                    <td style="color:var(--text-muted);font-size:0.82rem;white-space:nowrap;">${new Date(l.timestamp).toLocaleString()}</td>
                </tr>`).join('') + `</tbody></table></div>`;
        };

        const aiList = document.getElementById('ai-activity-list');
        const aiLogs = logs.filter(l => l.actionType === 'AI Chat Usage');
        if (aiList) aiList.innerHTML = renderTable(aiLogs);

        const mockLogs = logs.filter(l => l.actionType && l.actionType.toLowerCase().includes('interview'));
        const mockList = document.getElementById('mock-activity-list');
        if (mockList) mockList.innerHTML = renderTable(mockLogs);

        const today = new Date().toDateString();
        const mockTodayEl = document.getElementById('mock-stat-today');
        if (mockTodayEl) mockTodayEl.textContent = mockLogs.filter(l => new Date(l.timestamp).toDateString() === today).length;

        const premiumLogs = logs.filter(l => l.actionType && l.actionType.toLowerCase().includes('premium'));
        const premiumList = document.getElementById('premium-activity-list');
        if (premiumList) premiumList.innerHTML = renderTable(premiumLogs);
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

        // --- Learning Analytics Charts (start empty, filled by renderRoadmapData) ---
        const ctxCourseComp = document.getElementById('courseCompletionChart');
        if (ctxCourseComp) {
            ctxCourseComp._chartInstance = new Chart(ctxCourseComp, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Completions',
                        data: [],
                        backgroundColor: '#10b981',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, ticks: { precision: 0, color: '#94a3b8' }, grid: { color: '#eef2fb' } },
                        x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
                    }
                }
            });
        }

        const ctxDropoff = document.getElementById('roadmapDropoffChart');
        if (ctxDropoff) {
            ctxDropoff._chartInstance = new Chart(ctxDropoff, {
                type: 'line',
                data: {
                    labels: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5', 'Stage 6'],
                    datasets: [{
                        label: 'Users Completed Stage',
                        data: [0, 0, 0, 0, 0, 0],
                        borderColor: '#f43f5e',
                        backgroundColor: 'rgba(244, 63, 94, 0.08)',
                        fill: true,
                        tension: 0.3,
                        pointBackgroundColor: '#f43f5e',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, ticks: { precision: 0, color: '#94a3b8' }, grid: { color: '#eef2fb' } },
                        x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
                    }
                }
            });
        }

        // Career Detail Chart (Career Analytics panel)
        const ctxCareerDetail = document.getElementById('careerDetailChart');
        if (ctxCareerDetail) {
            careerDetailChart = new Chart(ctxCareerDetail, {
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
                    cutout: '70%',
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: { color: '#334155', font: { size: 12, weight: '600' }, padding: 16, boxWidth: 11, borderRadius: 3 }
                        }
                    }
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
    
    // Initialize data
    fetchDashboardStats();
    fetchUsers();
    fetchSubscriptions();
    fetchInterviews();
    fetchChatLogs();

    // Set interval for dashboard stats to auto-refresh (polling)
    setInterval(fetchDashboardStats, 10000); // Initial fetch
    const refreshData = () => {
        fetchDashboardStats();
        fetchActivityLogs();
        fetchUsers();
        fetchSubscriptions();
        fetchInterviews();
        fetchChatLogs();
    };

    const refreshIntervalId = setInterval(refreshData, 5000); // Poll every 5 seconds for real-time feel
    window.addEventListener('beforeunload', () => clearInterval(refreshIntervalId));

    // Chat logs search filter
    const chatSearchInput = document.getElementById('chat-logs-search');
    if (chatSearchInput) {
        chatSearchInput.addEventListener('input', () => {
            const q = chatSearchInput.value.toLowerCase().trim();
            const logs = window.adminChatLogs || [];
            const filtered = q ? logs.filter(u =>
                (u.userName || '').toLowerCase().includes(q) ||
                (u.userEmail || '').toLowerCase().includes(q)
            ) : logs;
            renderChatLogs(filtered);
        });
    }
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
                ctxCourseComp._chartInstance.data.labels = top5.map(([id]) =>
                    typeof resolveModuleTitle === 'function' ? resolveModuleTitle(id) : id);
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
