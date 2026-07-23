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
    const allCompletedLessons = user.completedLessons || [];

    // Resolve the correct roadmap path
    const matchedPathKey = resolveRoadmapPathKey(user.selectedPath);
    const pathData = matchedPathKey ? ROADMAP_DATA[matchedPathKey] : null;

    // ── PRIMARY SIGNAL: Lessons completed in current roadmap ──
    // Each module lists its courses[] array — this is the ground truth for
    // how many lessons exist. We compare completedLessons IDs (format:
    // `${moduleId}_${courseName}`) against each module's course names.
    let lessonProgressPct = 0;

    if (pathData && pathData.length > 0) {
        // Build the full set of lesson IDs that belong to this roadmap.
        // Format mirrors the frontend: `${module.id}_${course.name}`
        const pathLessonIds = new Set();
        for (const mod of pathData) {
            for (const course of (mod.courses || [])) {
                pathLessonIds.add(`${mod.id}_${course.name}`);
            }
        }

        const totalPathLessons = pathLessonIds.size;

        // Count how many the user has actually completed
        let completedPathLessons = allCompletedLessons.filter(id => pathLessonIds.has(id)).length;

        // Legacy fallback: old IDs (pre-migration) don't match the current format.
        // If strict filter yields nothing but the user has lesson records, count
        // all their lessons capped to the total so they still get partial credit.
        if (completedPathLessons === 0 && allCompletedLessons.length > 0 && totalPathLessons > 0) {
            completedPathLessons = Math.min(allCompletedLessons.length, totalPathLessons);
        }

        lessonProgressPct = totalPathLessons > 0
            ? clamp0to100((completedPathLessons / totalPathLessons) * 100)
            : 0;
    } else if (allCompletedLessons.length > 0) {
        // No path data — use raw count against a sensible default
        const DEFAULT_TOTAL_LESSONS = DEFAULT_TOTAL_MODULES * 3; // 3 lessons/module average
        lessonProgressPct = clamp0to100((allCompletedLessons.length / DEFAULT_TOTAL_LESSONS) * 100);
    }

    // ── SECONDARY SIGNAL: Module completions (quiz passed) ──
    const pathModuleIds = pathData ? new Set(pathData.map(m => m.id)) : null;
    let totalModules = pathData ? pathData.length : DEFAULT_TOTAL_MODULES;
    let relevantCompletedCount = 0;

    if (pathData) {
        relevantCompletedCount = pathData.filter(m => completedModules.includes(m.id)).length;
        if (relevantCompletedCount === 0 && completedModules.length > 0) {
            relevantCompletedCount = Math.min(completedModules.length, totalModules);
        }
    } else {
        relevantCompletedCount = completedModules.length;
    }

    const moduleProgressPct = clamp0to100((relevantCompletedCount / totalModules) * 100);

    // ── Quiz scores ──
    const quizScoresObj = user.quizScores instanceof Map
        ? Object.fromEntries(user.quizScores)
        : (user.quizScores || {});

    let quizEntries = pathModuleIds
        ? Object.entries(quizScoresObj).filter(([key]) => pathModuleIds.has(key))
        : Object.entries(quizScoresObj);

    if (pathModuleIds && quizEntries.length === 0 && Object.keys(quizScoresObj).length > 0) {
        quizEntries = Object.entries(quizScoresObj);
    }

    const quizValues = quizEntries.map(([, v]) => v).filter(v => typeof v === 'number');
    const quizAvgPct = quizValues.length > 0
        ? clamp0to100(quizValues.reduce((a, b) => a + b, 0) / quizValues.length)
        : 0;

    // ── Profile completion ──
    const profileFields = [user.selectedPath, user.selectedLevel, (user.skills || []).length > 0, user.dob];
    const profileCompletionPct = clamp0to100((profileFields.filter(Boolean).length / profileFields.length) * 100);

    // ── Mock Interview Performance ──
    // Expects avgInterviewScore to be passed in, or attached to user object.
    const interviewAvgPct = clamp0to100(user.avgInterviewScore || 0);

    // ── Final formula (The "Employability" Model) ──
    // 50% Foundational Knowledge (Roadmap Progress)
    // 25% Practical Application (Mock Interviews)
    // 15% Competence (Quizzes)
    // 10% Professional Branding (Profile Completion)
    const score = clamp0to100(
        (lessonProgressPct    * 0.50) +
        (interviewAvgPct      * 0.25) +
        (quizAvgPct           * 0.15) +
        (profileCompletionPct * 0.10)
    );

    return score;
}

const InterviewSession = require('../models/InterviewSession');

// ── Recompute from the DB and persist. Returns the new score. ──
async function recomputeAndSaveReadiness(userId) {
    const user = await User.findById(userId).lean();
    if (!user) return 0;

    // Fetch average interview score
    const scoreAgg = await InterviewSession.aggregate([
        { $match: { userId: user._id, $or: [{ status: 'completed' }, { completed: true }] } },
        { $group: { _id: null, avgScore: { $avg: '$overallScore' } } }
    ]);
    user.avgInterviewScore = scoreAgg.length > 0 ? scoreAgg[0].avgScore : 0;

    const score = computeReadinessScore(user);
    await User.findByIdAndUpdate(userId, { $set: { readinessScore: score } });
    return score;
}

module.exports = {
    computeReadinessScore,
    getReadinessLabel,
    recomputeAndSaveReadiness,
    resolveRoadmapPathKey
};
