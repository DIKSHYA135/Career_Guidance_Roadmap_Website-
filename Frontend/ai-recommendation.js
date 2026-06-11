/* ==========================================================
   ai-recommendation.js — AI Pathway Diagnostics Engine
   Populates the right-hand AI insights panel on roadmap.html
   with live data computed from the user's actual progress.
   ========================================================== */

(function AiRecommendation() {
    'use strict';

    function safeParseJSON(key, fallback) {
        try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
        catch (e) { return fallback; }
    }

    function init() {
        const selectedPath  = localStorage.getItem('xyverra_selected_path') || 'Web Developer';
        const selectedLevel = localStorage.getItem('xyverra_selected_level') || 'Beginner';

        // ── 1. Update target path label ──────────────────────────────
        const sideTargetPath = document.getElementById('side-target-path');
        if (sideTargetPath) sideTargetPath.textContent = selectedPath;

        // ── 2. Compute Role Match Affinity from average quiz scores ──
        const quizScores    = safeParseJSON('xyverra_quiz_scores', {});
        const scoreValues   = Object.values(quizScores).filter(s => typeof s === 'number' && s >= 0);
        const avgScore      = scoreValues.length
            ? Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length)
            : 0;
        const roleAffinity  = Math.min(95, Math.max(5, avgScore));

        // ── 3. Compute Structural Skill Gap from roadmap progress ────
        const completedModules = safeParseJSON('completedModules', []);
        let totalModules = 0;
        if (typeof ROADMAP_DATA !== 'undefined' && ROADMAP_DATA[selectedPath]) {
            totalModules = ROADMAP_DATA[selectedPath].filter(Boolean).length;
        }
        const completedCount  = completedModules.length;
        const completionPct   = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
        const gapPct          = 100 - completionPct;
        const gapRisk         = gapPct < 30 ? 'Low Risk' : gapPct < 60 ? 'Medium Risk' : 'High Risk';
        const gapColor        = gapPct < 30 ? '#059669'  : gapPct < 60 ? '#D97706'      : '#DC2626';

        // ── 4. Estimate weeks to completion (avg 2 weeks / module) ──
        const remaining         = Math.max(0, totalModules - completedCount);
        const weeksToCompletion = remaining > 0 ? remaining * 2 : 1;

        // ── 5. Market value boost by level ──────────────────────────
        const marketBoost = {
            'Beginner':     '+25% skill value',
            'Intermediate': '+45% skill value',
            'Advanced':     '+75% skill value',
            'Expert':       '+120% skill value',
            'Capstone':     '+120% skill value'
        }[selectedLevel] || '+45% skill value';

        // ── 6. Update DOM ────────────────────────────────────────────
        updateDiagnosticBars(roleAffinity, gapPct, gapRisk, gapColor);
        updatePredictionItems(weeksToCompletion, marketBoost);
    }

    function updateDiagnosticBars(roleAffinity, gapPct, gapRisk, gapColor) {
        const diagItems = document.querySelectorAll('.diag-item');

        // Row 0 — Role Match Affinity
        if (diagItems[0]) {
            const bar  = diagItems[0].querySelector('.progress-bar');
            const meta = diagItems[0].querySelectorAll('.diag-meta span');
            if (bar)     bar.style.width = roleAffinity + '%';
            if (meta[1]) meta[1].textContent = roleAffinity + '% Score';
        }

        // Row 1 — Structural Skill Gap
        if (diagItems[1]) {
            const bar  = diagItems[1].querySelector('.progress-bar');
            const meta = diagItems[1].querySelectorAll('.diag-meta span');
            if (bar) {
                bar.style.width      = Math.min(100, gapPct) + '%';
                bar.style.background = `linear-gradient(90deg, ${gapColor}, ${gapColor})`;
            }
            if (meta[1]) {
                meta[1].textContent = gapRisk;
                meta[1].style.color = gapColor;
            }
        }
    }

    function updatePredictionItems(weeksToCompletion, marketBoost) {
        const predItems = document.querySelectorAll('.pred-item');

        // Row 0 — Market Value Projection
        if (predItems[0]) {
            const strong = predItems[0].querySelector('strong');
            if (strong) strong.textContent = marketBoost;
        }

        // Row 1 — Competency Runway
        if (predItems[1]) {
            const strong = predItems[1].querySelector('strong');
            if (strong) strong.textContent = weeksToCompletion + ' Weeks';
        }
    }

    // Run after DOM is ready; small delay so roadmap.js can set ROADMAP_DATA
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 120); });
    } else {
        setTimeout(init, 120);
    }
})();
