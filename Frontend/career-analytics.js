/* career-analytics.js */

document.addEventListener('DOMContentLoaded', async () => {
    // Pro Check
    if (typeof window.XyRequirePro === 'function') {
        if (!window.XyRequirePro('Career Analytics Dashboard')) return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    let targetCareer = localStorage.getItem('xyverra_selected_path') || 'Software Engineer';
    document.getElementById('an-career-target').textContent = targetCareer;

    try {
        const res = await fetch('http://localhost:5000/api/analytics/dashboard', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (data.success) {
            renderDashboard(data.data, targetCareer);
        } else {
            window.XyError ? window.XyError('Analytics Error', data.message || 'Failed to load analytics.') : alert(data.message);
        }
    } catch (e) {
        console.error(e);
        window.XyNetworkError ? window.XyNetworkError() : alert('Server connection error.');
    }
});

function renderDashboard(data, targetCareer) {
    const { salaryTrends, jobDemand, topSkillsInDemand, userProgress } = data;

    // Stat Cards
    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    
    document.getElementById('an-salary-range').textContent = `${formatCurrency(userProgress.projectedSalaryRange.min)} - ${formatCurrency(userProgress.projectedSalaryRange.max)}`;
    document.getElementById('an-job-demand').textContent = jobDemand;
    document.getElementById('an-readiness').textContent = `${userProgress.readinessScore}/100`;

    // Skills List
    const skillsList = document.getElementById('an-top-skills');
    skillsList.innerHTML = topSkillsInDemand.map(skill => `
        <div class="trending-skill-item">
            <i class="fas fa-check-circle trending-skill-icon"></i>
            <span class="trending-skill-name">${skill}</span>
            <span class="trending-skill-trend"><i class="fas fa-arrow-up"></i> Trending</span>
        </div>
    `).join('');

    // Chart.js
    const ctx = document.getElementById('salary-chart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: salaryTrends.map(t => t.year),
                datasets: [{
                    label: `Average Salary (${targetCareer})`,
                    data: salaryTrends.map(t => t.average),
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#2563eb',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000) + 'k';
                            }
                        }
                    }
                }
            }
        });
    }
}
