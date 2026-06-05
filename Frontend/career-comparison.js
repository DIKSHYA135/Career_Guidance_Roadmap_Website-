/* =========================================================
   career-comparison.js  – Builds the comparison table
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    let compareIds = [];
    try {
        compareIds = JSON.parse(localStorage.getItem('xyverra_compare_careers') || '[]');
    } catch (e) {}

    // Fallback: show all 3 if navigated directly
    if (compareIds.length === 0) compareIds = ['ai-engineer', 'data-scientist', 'ui-ux-designer'];

    const db = {
        'ai-engineer': {
            icon: '🤖', title: 'AI Engineer', match: 94,
            salary: '$120k – $185k',
            demand: 'Very High (35% YoY)', demandClass: 'demand-vhigh',
            difficulty: 'Hard', diffClass: 'difficulty-hard',
            growth: 'Junior → Mid → Lead AI Engineer → Head of AI / CAO',
            timeToReady: '9 – 14 Months',
            skills: ['Python', 'TensorFlow', 'Machine Learning', 'Docker', 'Cloud APIs'],
            opportunities: '350,000+ open roles globally',
            remoteFriendly: '✅ Highly Remote-Friendly'
        },
        'data-scientist': {
            icon: '📊', title: 'Data Scientist', match: 88,
            salary: '$110k – $165k',
            demand: 'High (28% YoY)', demandClass: 'demand-high',
            difficulty: 'Hard', diffClass: 'difficulty-hard',
            growth: 'Analyst → Data Scientist → Senior DS → VP of Data / CDO',
            timeToReady: '8 – 12 Months',
            skills: ['Python/R', 'SQL', 'Statistics', 'Tableau', 'Pandas/Scikit'],
            opportunities: '280,000+ open roles globally',
            remoteFriendly: '✅ Very Remote-Friendly'
        },
        'ui-ux-designer': {
            icon: '🎨', title: 'UI/UX Designer', match: 76,
            salary: '$85k – $135k',
            demand: 'High (20% YoY)', demandClass: 'demand-high',
            difficulty: 'Medium', diffClass: 'difficulty-med',
            growth: 'Junior Designer → UX/UI Designer → Lead Designer → Creative Director',
            timeToReady: '6 – 9 Months',
            skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'HTML/CSS Basics'],
            opportunities: '150,000+ open roles globally',
            remoteFriendly: '✅ Remote-Friendly'
        },
        'full-stack-dev': {
            icon: '💻', title: 'Full Stack Developer', match: 82,
            salary: '$100k – $155k',
            demand: 'High (25% YoY)', demandClass: 'demand-high',
            difficulty: 'Medium-Hard', diffClass: 'difficulty-med',
            growth: 'Junior Dev → Mid Dev → Senior Dev → Engineering Manager',
            timeToReady: '8 – 12 Months',
            skills: ['React', 'Node.js', 'SQL', 'REST APIs', 'Git'],
            opportunities: '400,000+ open roles globally',
            remoteFriendly: '✅ Highly Remote-Friendly'
        },
        'cloud-engineer': {
            icon: '☁️', title: 'Cloud/DevOps Engineer', match: 71,
            salary: '$115k – $170k',
            demand: 'Very High (32% YoY)', demandClass: 'demand-vhigh',
            difficulty: 'Hard', diffClass: 'difficulty-hard',
            growth: 'Junior DevOps → DevOps Engineer → Cloud Architect → VP of Engineering',
            timeToReady: '10 – 16 Months',
            skills: ['AWS/GCP/Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
            opportunities: '290,000+ open roles globally',
            remoteFriendly: '✅ Very Remote-Friendly'
        }
    };

    const careers = compareIds.map(id => ({ id, ...db[id] })).filter(c => c.title);

    const iconBgs = [
        'background:linear-gradient(135deg,rgba(37,99,235,0.12),rgba(124,58,237,0.12))',
        'background:linear-gradient(135deg,rgba(6,182,212,0.12),rgba(59,130,246,0.12))',
        'background:linear-gradient(135deg,rgba(245,158,11,0.12),rgba(239,68,68,0.12))'
    ];

    const table = document.getElementById('comparison-table');

    if (!careers.length) {
        table.innerHTML = '<thead><tr><th>No career data found. <a href="career-recommendation.html">Go back.</a></th></tr></thead>';
        return;
    }

    // ── Header ──
    let headerRow = '<tr><th class="row-label"></th>';
    careers.forEach((c, i) => {
        headerRow += `
        <th>
            <div class="career-col-header">
                <div class="career-col-icon" style="${iconBgs[i] || iconBgs[0]}">${c.icon}</div>
                <div>
                    <div class="career-col-name">${c.title}</div>
                    <div class="career-col-match"><i class="fas fa-star" style="font-size:0.65rem;"></i> ${c.match}% Match</div>
                </div>
            </div>
        </th>`;
    });
    headerRow += '</tr>';

    // ── Body rows ──
    const rows = [
        {
            label: 'Salary Range',
            render: c => `<strong>${c.salary}</strong>`
        },
        {
            label: 'Industry Demand',
            render: c => `<span class="${c.demandClass}">${c.demand}</span>`
        },
        {
            label: 'Learning Curve',
            render: c => `<span class="${c.diffClass}">${c.difficulty}</span>`
        },
        {
            label: 'Time to Job-Ready',
            render: c => c.timeToReady
        },
        {
            label: 'Career Growth',
            render: c => `<span style="font-size:0.85rem;line-height:1.6;">${c.growth}</span>`
        },
        {
            label: 'Required Skills',
            render: c => c.skills.map(s => `<span class="ct-chip">${s}</span>`).join('')
        },
        {
            label: 'Job Opportunities',
            render: c => c.opportunities
        },
        {
            label: 'Remote Work',
            render: c => c.remoteFriendly
        }
    ];

    let bodyHtml = '';
    rows.forEach(row => {
        bodyHtml += `<tr><td class="row-label">${row.label}</td>`;
        careers.forEach(c => {
            bodyHtml += `<td>${row.render(c)}</td>`;
        });
        bodyHtml += '</tr>';
    });

    // ── Footer CTA ──
    let footerHtml = '<tr><td class="row-label">Action</td>';
    careers.forEach(c => {
        footerHtml += `
        <td>
            <button class="btn btn-primary action-cell-btn" data-id="${c.id}">
                View Details <i class="fas fa-arrow-right"></i>
            </button>
        </td>`;
    });
    footerHtml += '</tr>';

    table.innerHTML = `
        <thead>${headerRow}</thead>
        <tbody>${bodyHtml}</tbody>
        <tfoot>${footerHtml}</tfoot>
    `;

    // Wire up CTA buttons
    table.querySelectorAll('.action-cell-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.setItem('xyverra_selected_career_detail', btn.getAttribute('data-id'));
            window.location.href = 'career-details.html';
        });
    });
});
