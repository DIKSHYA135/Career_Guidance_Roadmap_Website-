/* ==========================================================
   readiness.js — Canonical Job Readiness Score
   Single source of truth so Career Analytics, Dashboard, Progress
   and the Admin Panel never disagree. Deterministic (no AI calls)
   so the number is stable and reproducible.
   ========================================================== */

const User = require('../models/User');
const ROADMAP_DATA = require('./roadmapData');

// Helper to resolve the correct path key (mirrors frontend logic)
function resolveRoadmapPathKey(selectedPath) {
    if (!selectedPath) return null;
    const directMatch = Object.keys(ROADMAP_DATA).find(k => k === selectedPath);
    if (directMatch) return directMatch;
    
    // Fuzzy match fallback
    if (selectedPath.includes('AI') || selectedPath.includes('NLP')) return 'NLP / AI';
    if (selectedPath.includes('Data')) return 'Data Science';
    if (selectedPath.includes('Cloud') || selectedPath.includes('DevOps')) return 'Cloud / DevOps';
    
    const partialMatch = Object.keys(ROADMAP_DATA).find(k => selectedPath.includes(k) || k.includes(selectedPath));
    return partialMatch || null;
}

const DEFAULT_TOTAL_MODULES = 6;
const LESSONS_FOR_FULL_ENGAGEMENT_CREDIT = 20; // soft cap, mirrors existing progress.js heuristic

function clamp0to100(n) {
    return Math.max(0, Math.min(100, Math.round(n)));
}

// ── Classification bands (fixed thresholds) ──
function getReadinessLabel(score) {
    if (score >= 90) return { label: 'Outstanding', color: '#10b981' };
    if (score >= 70) return { label: 'Excellent', color: '#2563eb' };
    if (score >= 50) return { label: 'Good', color: '#f59e0b' };
    if (score >= 30) return { label: 'Fair', color: '#f97316' };
    return { label: 'Beginner', color: '#ef4444' };
}

// ── Pure formula: given a plain user object, compute the score ──
function computeReadinessScore(user) {
    const completedModules = user.completedModules || [];
    
    // Find the correct path data
    const matchedPathKey = resolveRoadmapPathKey(user.selectedPath);
    const pathData = matchedPathKey ? ROADMAP_DATA[matchedPathKey] : null;
    
    let totalModules = DEFAULT_TOTAL_MODULES;
    let relevantCompletedCount = 0;
    
    if (pathData) {
        totalModules = pathData.length;
        relevantCompletedCount = pathData.filter(m => completedModules.includes(m.id)).length;
    } else {
        relevantCompletedCount = completedModules.length; // fallback if no matching path
    }

    const roadmapProgressPct = clamp0to100((relevantCompletedCount / totalModules) * 100);

    const quizScoresObj = user.quizScores instanceof Map
        ? Object.fromEntries(user.quizScores)
        : (user.quizScores || {});
    const quizValues = Object.values(quizScoresObj).filter(v => typeof v === 'number');
    const quizAvgPct = quizValues.length > 0
        ? clamp0to100(quizValues.reduce((a, b) => a + b, 0) / quizValues.length)
        : 0;

    const completedLessons = user.completedLessons || [];
    const lessonsEngagementPct = clamp0to100((completedLessons.length / LESSONS_FOR_FULL_ENGAGEMENT_CREDIT) * 100);

    // Profile completion: path, level, at least one skill, DOB
    const profileFields = [user.selectedPath, user.selectedLevel, (user.skills || []).length > 0, user.dob];
    const profileCompletionPct = clamp0to100((profileFields.filter(Boolean).length / profileFields.length) * 100);

    const score = clamp0to100(
        (roadmapProgressPct * 0.40) +
        (quizAvgPct * 0.30) +
        (lessonsEngagementPct * 0.20) +
        (profileCompletionPct * 0.10)
    );

    return score;
}

// ── Recompute from the DB and persist. Returns the new score. ──
async function recomputeAndSaveReadiness(userId) {
    const user = await User.findById(userId).lean();
    if (!user) return 0;
    const score = computeReadinessScore(user);
    await User.findByIdAndUpdate(userId, { $set: { readinessScore: score } });
    return score;
}

module.exports = {
    TOTAL_MODULES_BY_PATH,
    computeReadinessScore,
    getReadinessLabel,
    recomputeAndSaveReadiness
};
