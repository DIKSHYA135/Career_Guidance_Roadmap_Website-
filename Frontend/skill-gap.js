/* ==========================================================
   skill-gap.js — Skill Gap Analysis (fully path-driven)
   TODO: Replace localStorage with GET /api/user/skill-gap/:path
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Load selected path & its required skills ────────
    // TODO: GET /api/user/me → { selectedPath }
    const selectedPath = localStorage.getItem('xyverra_selected_path') || 'Web Development';

    // Get required skills for this path from app-data.js (PATH_SKILLS)
    const requiredSkills = (typeof PATH_SKILLS !== 'undefined' && PATH_SKILLS[selectedPath])
        ? PATH_SKILLS[selectedPath]
        : PATH_SKILLS['Web Development'];

    // Update header target label
    const targetLabel = document.getElementById('sg-target-path');
    if (targetLabel) targetLabel.textContent = selectedPath;

    // ── 2. Load user's actual skill names ──────────────────
    // TODO: GET /api/user/skills → [{ name, level, proficiency, verified }]
    let userSkillNames = [];
    try {
        const raw = localStorage.getItem('userSkills');
        if (raw) {
            const parsed = JSON.parse(raw);
            userSkillNames = Array.isArray(parsed)
                ? parsed.map(s => (typeof s === 'string' ? s : s.name).toLowerCase())
                : [];
        }
    } catch { /* ignore */ }

    // ── 3. Categorize gaps ────────────────────────────────
    const criticalGaps = [];   // Skills not at all in user profile
    const needsImprovement = []; // Skills user has but at beginner / low proficiency
    const validated = [];   // Skills user has at intermediate+ / verified

    requiredSkills.forEach(skill => {
        const owned = userSkillNames.includes(skill.name.toLowerCase());
        if (!owned) {
            criticalGaps.push(skill);
        } else {
            if ((skill.level === 'beginner') || (skill.proficiency < 50)) {
                needsImprovement.push(skill);
            } else {
                validated.push(skill);
            }
        }
    });

    const totalRequired = requiredSkills.length;
    const matchedCount = validated.length + needsImprovement.length;
    const readinessPct = Math.round((matchedCount / totalRequired) * 100);

    // ── 4. Update Readiness Card ───────────────────────────
    const scoreEl = document.getElementById('readiness-score');
    const textEl = document.getElementById('readiness-text');
    const progressEl = document.getElementById('readiness-progress');

    if (scoreEl) scoreEl.textContent = `${readinessPct}%`;
    if (textEl) textEl.textContent = `${matchedCount} / ${totalRequired} Skills Acquired`;
    if (progressEl) {
        setTimeout(() => { progressEl.style.width = `${readinessPct}%`; }, 150);
    }

    // Time estimate
    const gapsCount = criticalGaps.length;
    const timeEl = document.getElementById('time-estimate');
    if (timeEl) {
        const weeks = gapsCount * 3;
        timeEl.textContent = weeks < 4 ? `~${weeks} weeks` : `~${Math.round(weeks / 4)} months`;
    }

    // ── 5. Donut Chart ─────────────────────────────────────
    drawDonutChart('distribution-chart', matchedCount, criticalGaps.length);

    // ── 6. Render skill lists with course links ─────────────
    renderList('critical-gaps-list', criticalGaps, 'badge-critical', 'Missing', true);
    renderList('other-missing-list', needsImprovement, 'badge-improvement', 'Improve', true);
    renderList('validated-skills-list', validated, 'badge-validated', 'Validated', false);
});

// ── Render a list of skills with optional course link ─────
function renderList(elementId, items, badgeClass, badgeText, showCourseLink) {
    const container = document.getElementById(elementId);
    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = `<p class="sg-empty">No items in this category. 🎉</p>`;
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="skill-item">
            <div class="skill-info">
                <span class="skill-name">${item.name || item}</span>
                <span class="skill-category-text">${item.category || ''}</span>
            </div>
            <div class="sg-item-right">
                <span class="sg-badge ${badgeClass}">${badgeText}</span>
                ${showCourseLink && item.courseUrl ? `
                <a href="${item.courseUrl}" target="_blank" rel="noopener" class="sg-course-link" title="${item.courseName || 'Learn'}">
                    <i class="fas fa-external-link-alt"></i>
                </a>` : ''}
            </div>
        </div>
    `).join('');
}

// ── Donut Chart (canvas-based) ─────────────────────────────
function drawDonutChart(canvasId, owned, missing) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 130;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2, cy = size / 2;
    const radius = size / 2 - 6;
    const holeR = radius * 0.65;
    const total = owned + missing || 1;
    const startA = -Math.PI / 2;
    const ownedA = startA + (Math.PI * 2 * (owned / total));

    // Owned arc
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startA, ownedA);
    ctx.fillStyle = '#6366F1';
    ctx.fill();

    // Missing arc
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, ownedA, startA + Math.PI * 2);
    ctx.fillStyle = '#EF4444';
    ctx.fill();

    // Hole
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx, cy, holeR, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // Center text
    ctx.fillStyle = '#0F172A';
    ctx.font = `bold ${Math.round(size * 0.18)}px Plus Jakarta Sans, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.round((owned / total) * 100)}%`, cx, cy);
}
