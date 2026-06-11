/* ==========================================================
   skill-gap.js — Skill Gap Analysis (Career Path Driven)
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    const targetCareer = localStorage.getItem('xyverra_target_career') || localStorage.getItem('xyverra_selected_path');
    
    if (!targetCareer) {
        const container = document.querySelector('.dashboard-container');
        if (container) {
            container.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60vh; text-align:center; padding:3rem 2rem;">
                    <div style="font-size:4rem; margin-bottom:1.25rem;">🧭</div>
                    <h2 style="font-size:1.6rem; font-weight:800; color:var(--text-dark); margin-bottom:0.75rem;">No career path selected yet</h2>
                    <p style="color:var(--text-muted); max-width:480px; line-height:1.65; margin-bottom:2rem;">
                        You haven't picked a career path yet! Start with Career Discovery. We'll ask you a few questions and match you to the best tech career for you.
                    </p>
                    <a href="career-discovery.html" class="btn btn-primary" style="font-size:1rem; padding:12px 28px; display:inline-flex; align-items:center; gap:0.5rem;">
                        <i class="fas fa-compass"></i> Start Career Discovery
                    </a>
                </div>
            `;
        }
        return;
    }
    
    // Update header target label
    const targetLabel = document.getElementById('sg-target-path');
    if (targetLabel) targetLabel.textContent = targetCareer;

    // 1. Mock required skills based on the career name
    const requiredSkills = [
        { name: "Core Fundamentals", level: "advanced", proficiency: 100, category: "Foundation" },
        { name: "Advanced " + targetCareer + " Concepts", level: "intermediate", proficiency: 60, category: "Specialization" },
        { name: "Industry Tools & Workflows", level: "beginner", proficiency: 20, category: "Practical" },
        { name: "System Architecture", level: "none", proficiency: 0, category: "Advanced" },
        { name: "Performance Optimization", level: "none", proficiency: 0, category: "Advanced" },
        { name: "Security Best Practices", level: "none", proficiency: 0, category: "Advanced" }
    ];

    // 2. Categorize gaps based on roadmap progress
    let completedModules = [];
    try { completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]') || []; }
    catch (e) { completedModules = []; }
    if (!Array.isArray(completedModules)) completedModules = [];
    const progressFactor = Math.min(completedModules.length / 6, 1); // Mock progression
    
    const criticalGaps = [];
    const needsImprovement = [];
    const validated = [];

    // Simple deterministic logic based on progress
    requiredSkills.forEach((skill, index) => {
        const threshold = (index + 1) / requiredSkills.length;
        if (progressFactor >= threshold) {
            validated.push(skill);
        } else if (progressFactor >= threshold - 0.3) {
            needsImprovement.push(skill);
        } else {
            criticalGaps.push(skill);
        }
    });

    const totalRequired = requiredSkills.length;
    const matchedCount = validated.length + (needsImprovement.length > 0 ? 1 : 0);
    const readinessPct = Math.round((matchedCount / totalRequired) * 100);

    // 3. Update Readiness Card
    const scoreEl = document.getElementById('readiness-score');
    const scoreBigEl = document.getElementById('readiness-score-big');
    const textEl = document.getElementById('readiness-text');
    const progressEl = document.getElementById('readiness-progress');

    if (scoreEl) scoreEl.textContent = `${readinessPct}%`;
    if (scoreBigEl) scoreBigEl.textContent = `${readinessPct}%`;
    if (textEl) textEl.textContent = `${matchedCount} / ${totalRequired} Core Skills Acquired`;
    if (progressEl) {
        setTimeout(() => { progressEl.style.width = `${readinessPct}%`; }, 150);
    }

    // Time estimate
    const gapsCount = criticalGaps.length;
    const timeEl = document.getElementById('time-estimate');
    if (timeEl) {
        const weeks = gapsCount * 3;
        timeEl.textContent = weeks === 0 ? 'Ready!' : (weeks < 4 ? `~${weeks} weeks` : `~${Math.round(weeks / 4)} months`);
    }

    // Update legend counts
    const ownedCount = document.getElementById('owned-count');
    const improveCount = document.getElementById('improve-count');
    const missingCount = document.getElementById('missing-count');
    if (ownedCount) ownedCount.textContent = `${validated.length} skills`;
    if (improveCount) improveCount.textContent = `${needsImprovement.length} skills`;
    if (missingCount) missingCount.textContent = `${criticalGaps.length} skills`;

    // 4. Donut Chart
    drawDonutChart('distribution-chart', validated.length, needsImprovement.length, criticalGaps.length);

    // 5. Render lists with icons
    renderList('critical-gaps-list', criticalGaps, 'badge-critical', 'Missing', '❌');
    renderList('other-missing-list', needsImprovement, 'badge-improvement', 'Improve', '⚠');
    renderList('needs-improvement-list', needsImprovement, 'badge-improvement', 'Improve', '⚠');
    renderList('validated-skills-list', validated, 'badge-validated', 'Validated', '✓');

    // 6. Action Banner
    const banner = document.getElementById('sg-action-banner');
    const actionTitle = document.getElementById('action-title');
    if (banner && actionTitle) {
        banner.style.display = 'flex';
        if (criticalGaps.length > 0) {
            actionTitle.textContent = 'Critical Gaps Detected';
        } else if (needsImprovement.length > 0) {
            actionTitle.textContent = 'Refine Your Skills';
        } else {
            actionTitle.textContent = 'You are Job Ready!';
        }
    }
});

// Render list of skills
function renderList(elementId, items, badgeClass, badgeText, icon) {
    const container = document.getElementById(elementId);
    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = `<p class="sg-empty">No skills here. 🎉</p>`;
        return;
    }

    container.innerHTML = items.map(item => {
        const skillName = item.name || item;
        
        // Mock Learning Resources for missing/improve skills
        let resourcesHtml = '';
        if (icon === '❌' || icon === '⚠') {
            resourcesHtml = `
            <div class="learning-resources" style="margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border); font-size: 0.85rem;">
                <p style="margin: 0 0 6px 0; font-weight: 600; color: var(--text-dark);">Recommended Resources:</p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <a href="https://www.coursera.org/search?query=${encodeURIComponent(skillName)}" target="_blank" style="color: var(--primary); text-decoration: none; background: rgba(37,99,235,0.1); padding: 4px 8px; border-radius: 4px;"><i class="fas fa-graduation-cap"></i> Courses</a>
                    <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(skillName + ' tutorial')}" target="_blank" style="color: #EF4444; text-decoration: none; background: rgba(239,68,68,0.1); padding: 4px 8px; border-radius: 4px;"><i class="fab fa-youtube"></i> YouTube</a>
                    <a href="https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(skillName)}" target="_blank" style="color: #10B981; text-decoration: none; background: rgba(16,185,129,0.1); padding: 4px 8px; border-radius: 4px;"><i class="fas fa-book"></i> Docs</a>
                </div>
            </div>`;
        }

        return `
        <div class="skill-item" style="display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div class="skill-info">
                    <span class="skill-name">${skillName} <span style="margin-left: 6px; font-size: 1.1rem;">${icon}</span></span>
                    <span class="skill-category-text">${item.category || ''}</span>
                </div>
                <div class="sg-item-right">
                    <span class="sg-badge ${badgeClass}">${badgeText}</span>
                </div>
            </div>
            ${resourcesHtml}
        </div>
        `;
    }).join('');
}

// Donut Chart
function drawDonutChart(canvasId, owned, improve, missing) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 140;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2, cy = size / 2;
    const radius = size / 2 - 8;
    const holeR = radius * 0.7;
    const total = owned + improve + missing || 1;
    
    let startA = -Math.PI / 2;
    
    const drawSlice = (count, color) => {
        if (count === 0) return;
        const angle = (Math.PI * 2 * (count / total));
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startA, startA + angle);
        ctx.fillStyle = color;
        ctx.fill();
        startA += angle;
    };

    drawSlice(owned, '#2563EB');   // Blue
    drawSlice(improve, '#F59E0B'); // Amber
    drawSlice(missing, '#EF4444'); // Red

    // Hole
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx, cy, holeR, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // Center text
    ctx.fillStyle = '#0F172A';
    ctx.font = `bold ${Math.round(size * 0.2)}px Plus Jakarta Sans, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.round((owned / total) * 100)}%`, cx, cy);
}
