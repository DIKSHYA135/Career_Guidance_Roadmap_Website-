document.addEventListener('DOMContentLoaded', () => {
    // 1. Required Skills Definition
    const requiredSkillsList = [
        { name: "HTML", category: "Web Fundamentals", type: "core" },
        { name: "CSS", category: "Web Fundamentals", type: "core" },
        { name: "JavaScript", category: "Programming", type: "core" },
        { name: "React", category: "Frontend", type: "core" },
        { name: "Git", category: "Tools", type: "core" },
        { name: "REST APIs", category: "Backend", type: "critical" },
        { name: "TypeScript", category: "Programming", type: "critical" },
        { name: "Testing", category: "Tools", type: "important" },
        { name: "Webpack", category: "Tools", type: "important" },
        { name: "Figma", category: "Design", type: "important" },
        { name: "Node.js", category: "Backend", type: "important" }
    ];

    // 2. Fetch User Skills from LocalStorage
    let userSkills = [];
    try {
        const stored = localStorage.getItem("skills");
        if (stored) {
            userSkills = JSON.parse(stored);
        } else {
            // Default skills if empty, mimicking skills.js behavior
            userSkills = [
                { name: 'HTML', category: 'Web Fundamentals', level: 'advanced', verified: true, proficiency: 95 },
                { name: 'CSS', category: 'Web Fundamentals', level: 'advanced', verified: true, proficiency: 90 },
                { name: 'JavaScript', category: 'Programming', level: 'intermediate', verified: false, proficiency: 65 },
                { name: 'React', category: 'Frontend', level: 'intermediate', verified: false, proficiency: 60 },
                { name: 'Node.js', category: 'Backend', level: 'beginner', verified: false, proficiency: 25 },
                { name: 'Git', category: 'Tools', level: 'advanced', verified: true, proficiency: 85 }
            ];
            localStorage.setItem("skills", JSON.stringify(userSkills));
        }
    } catch(e) {
        console.error("Error parsing skills", e);
    }

    // Normalized lists
    const userSkillNames = userSkills.map(s => (s.name || s).toLowerCase());
    
    let matchedCount = 0;
    const totalRequired = requiredSkillsList.length;

    const criticalGaps = [];
    const importantGaps = [];
    const needsImprovement = [];
    const validatedCore = [];

    // 3. Categorize Skills based on Required List
    requiredSkillsList.forEach(reqSkill => {
        const index = userSkillNames.indexOf(reqSkill.name.toLowerCase());
        if (index !== -1) {
            matchedCount++;
            const userSkill = userSkills[index];
            const level = (userSkill.level || "beginner").toLowerCase();
            const isBeginner = level === "beginner";
            const proficiency = userSkill.proficiency || 0;
            
            // Define improvement if level is beginner or proficiency < 50
            if (isBeginner || proficiency < 50) {
                needsImprovement.push(userSkill);
            } else {
                validatedCore.push(userSkill);
            }
        } else {
            if (reqSkill.type === "critical") {
                criticalGaps.push(reqSkill);
            } else {
                importantGaps.push(reqSkill);
            }
        }
    });

    // 4. Update Readiness Card
    const percentage = Math.round((matchedCount / totalRequired) * 100);
    document.getElementById('readiness-score').textContent = `${percentage}%`;
    document.getElementById('readiness-text').textContent = `${matchedCount} / ${totalRequired} Core Skills Acquired`;
    
    setTimeout(() => {
        document.getElementById('readiness-progress').style.width = `${percentage}%`;
    }, 100);

    // 5. Draw Donut Chart
    drawDonutChart('distribution-chart', matchedCount, totalRequired - matchedCount);

    // 6. Render Lists
    renderList('critical-gaps-list', criticalGaps, 'badge-critical', 'Critical');
    renderList('other-missing-list', importantGaps, 'badge-important', 'Important');
    renderList('needs-improvement-list', needsImprovement, 'badge-improvement', 'Needs Improvement');
    renderList('validated-skills-list', validatedCore, 'badge-validated', 'Validated');

    // 7. Session Restore
    const userName = localStorage.getItem('xyverra_user_name') || localStorage.getItem('userName');
    if (userName) {
        const sidebarUserName = document.getElementById('user-display-name');
        const sidebarAvatar = document.getElementById('user-avatar');
        
        if (sidebarUserName) sidebarUserName.textContent = userName;
        if (sidebarAvatar) {
            const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            sidebarAvatar.textContent = initials;
        }
    }

    // Sidebar Navigation Logic
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && href !== '') {
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});

function renderList(elementId, items, badgeClass, badgeText) {
    const container = document.getElementById(elementId);
    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = `<p style="color:var(--text-muted); font-size:0.875rem; padding: 0.5rem 0; text-align: center;">No items in this category.</p>`;
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="skill-item">
            <div class="skill-info">
                <span class="skill-name">${item.name || item}</span>
                <span class="skill-category-text">${item.category || 'Other'}</span>
            </div>
            <span class="sg-badge ${badgeClass}">${badgeText}</span>
        </div>
    `).join('');
}

function drawDonutChart(canvasId, owned, missing) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Support high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    const width = rect.width;
    const height = rect.height;
    const radius = Math.min(width, height) / 2;
    const cx = width / 2;
    const cy = height / 2;
    const holeRadius = radius * 0.70;

    const total = owned + missing;
    if (total === 0) return;

    const ownedRatio = owned / total;
    const startAngle = -Math.PI / 2;
    const ownedEndAngle = startAngle + (Math.PI * 2 * ownedRatio);

    ctx.clearRect(0, 0, width, height);

    // Draw Owned (Blue)
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, ownedEndAngle);
    ctx.fillStyle = '#5a4bfa';
    ctx.fill();

    // Draw Missing (Red)
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, ownedEndAngle, startAngle + (Math.PI * 2));
    ctx.fillStyle = '#ef4444';
    ctx.fill();

    // Draw Inner Hole
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; // match card background
    ctx.fill();
}
