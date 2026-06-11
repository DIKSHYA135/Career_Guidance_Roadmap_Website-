/* quiz-lock-manager.js
   Provides the QuizLockManager helper used by quiz.js and roadmap.js.
   Callers safely check `typeof QuizLockManager !== 'undefined'` before calling.

   Enforces STRICT sequential progression:
   - A quiz is only accessible once every course in its module has been opened/studied.
   - A module is only unlocked when the PREVIOUS module's quiz score is >= PASS_THRESHOLD.
*/
(function (global) {
    'use strict';

    // ── Constants / storage keys ─────────────────────────────
    const SCORES_KEY          = 'xyverra_quiz_scores';   // { moduleId: score }
    const OPENED_KEY          = 'openedCourses';          // array of opened course IDs
    const STUDY_TIME_KEY      = 'xyverra_study_time';     // { courseId: ms }
    const PASS_THRESHOLD      = 75;                        // % required on previous quiz to unlock next
    const MIN_TIME_PER_COURSE = 0;                         // optional min ms per course (0 = disabled)

    // ── Internal helpers ─────────────────────────────────────
    function readJSON(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (e) {
            return fallback;
        }
    }

    function writeJSON(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            /* storage unavailable — fail silently */
        }
    }

    // Must exactly match roadmap.js getCourseId — double underscore, non-alphanumeric → dash.
    function getCourseId(moduleId, courseName) {
        return `${moduleId}__${String(courseName).replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
    }

    function getOpenedCourses() {
        const opened = readJSON(OPENED_KEY, []);
        return Array.isArray(opened) ? opened : [];
    }

    // Normalize a `courses` argument into an array of course IDs.
    // Accepts: ["Course A", ...] OR [{name:"Course A"}, ...] OR [{id:"..."}].
    function normalizeCourseIds(moduleId, courses) {
        if (!Array.isArray(courses)) return [];
        return courses.map(c => {
            if (c == null) return null;
            if (typeof c === 'string') return getCourseId(moduleId, c);
            if (c.id) return c.id;
            if (c.name) return getCourseId(moduleId, c.name);
            return null;
        }).filter(Boolean);
    }

    function findModuleIndex(moduleId, allModules) {
        if (!Array.isArray(allModules)) return -1;
        return allModules.findIndex(m => (m && m.id === moduleId) || m === moduleId);
    }

    // ── Public API ───────────────────────────────────────────
    const QuizLockManager = {

        // 1. canAccessQuiz — true only when every course in the module is opened
        //    (and, optionally, the minimum study time per course is satisfied).
        canAccessQuiz(moduleId, courses) {
            const ids = normalizeCourseIds(moduleId, courses);
            // A module with no courses (e.g. capstone) has no study gate.
            if (ids.length === 0) return true;

            const opened = getOpenedCourses();
            const allOpened = ids.every(id => opened.includes(id));
            if (!allOpened) return false;

            if (MIN_TIME_PER_COURSE > 0) {
                const times = readJSON(STUDY_TIME_KEY, {});
                const enoughTime = ids.every(id => (times[id] || 0) >= MIN_TIME_PER_COURSE);
                if (!enoughTime) return false;
            }
            return true;
        },

        // 2. isModuleUnlocked — first module is always open; otherwise the
        //    previous module's quiz score must be >= PASS_THRESHOLD.
        isModuleUnlocked(moduleId, allModules) {
            const idx = findModuleIndex(moduleId, allModules);
            // Unknown module or first module → unlocked so the user can start.
            if (idx <= 0) return true;

            const prev = allModules[idx - 1];
            const prevId = (prev && prev.id) ? prev.id : prev;
            const prevScore = this.getQuizScore(prevId);
            return prevScore !== null && prevScore >= PASS_THRESHOLD;
        },

        // 3. getLockedMessage — helpful reason a module/quiz is locked.
        getLockedMessage(moduleId, allModules) {
            const idx = findModuleIndex(moduleId, allModules);
            if (idx <= 0) return '';

            const prev = allModules[idx - 1];
            const prevTitle = (prev && (prev.title || prev.id)) || 'the previous module';
            const prevId = (prev && prev.id) ? prev.id : prev;
            const prevScore = this.getQuizScore(prevId);

            if (prevScore === null) {
                return `Pass the ${prevTitle} quiz first (score ${PASS_THRESHOLD}% or higher).`;
            }
            return `You scored ${prevScore}% on ${prevTitle}. Score ${PASS_THRESHOLD}% or higher to unlock this module.`;
        },

        // 4. markCourseStudied — record that a course has been opened/studied.
        //    Accepts a full courseId, or a (courseName, moduleId) pair.
        markCourseStudied(courseId, moduleId) {
            if (!courseId) return;
            const id = (moduleId !== undefined) ? getCourseId(moduleId, courseId) : courseId;
            const opened = getOpenedCourses();
            if (!opened.includes(id)) {
                opened.push(id);
                writeJSON(OPENED_KEY, opened);
            }
            return id;
        },

        // 5. getModuleProgress — { studied, total, percent }
        getModuleProgress(moduleId, courses) {
            const ids = normalizeCourseIds(moduleId, courses);
            const total = ids.length;
            if (total === 0) return { studied: 0, total: 0, percent: 100 };

            const opened = getOpenedCourses();
            const studied = ids.filter(id => opened.includes(id)).length;
            const percent = Math.round((studied / total) * 100);
            return { studied, total, percent };
        },

        // 6. saveQuizScore — persist a score for a module (keeps the best score).
        saveQuizScore(moduleId, score) {
            if (!moduleId) return;
            const num = Number(score);
            if (!Number.isFinite(num)) return;
            const scores = readJSON(SCORES_KEY, {});
            const prev = Number(scores[moduleId]);
            // Keep the highest score so a later failed retake never re-locks progress.
            scores[moduleId] = Number.isFinite(prev) ? Math.max(prev, num) : num;
            writeJSON(SCORES_KEY, scores);
            return scores[moduleId];
        },

        // 7. getQuizScore — returns the stored score (number) or null.
        getQuizScore(moduleId) {
            const scores = readJSON(SCORES_KEY, {});
            const val = scores ? scores[moduleId] : undefined;
            if (val === undefined || val === null) return null;
            const num = Number(val);
            return Number.isFinite(num) ? num : null;
        },

        // Expose the threshold for callers/UI.
        PASS_THRESHOLD: PASS_THRESHOLD,

        // ── Existing UI helpers (preserved) ──────────────────
        disableNavigation() {
            document.querySelectorAll('.nav-item, .sidebar-brand a').forEach(link => {
                link.style.pointerEvents = 'none';
                link.style.opacity = '0.4';
                link.style.cursor = 'not-allowed';
            });
        },

        enableNavigation() {
            document.querySelectorAll('.nav-item, .sidebar-brand a').forEach(link => {
                link.style.pointerEvents = '';
                link.style.opacity = '';
                link.style.cursor = '';
            });
        },

        // Referenced by roadmap.js when a mandatory quiz is pending.
        applyRoadmapOverlay() {
            if (typeof document === 'undefined') return;
            if (document.getElementById('quiz-lock-overlay')) return;
            const overlay = document.createElement('div');
            overlay.id = 'quiz-lock-overlay';
            overlay.style.cssText =
                'position:fixed;inset:0;z-index:9998;background:rgba(15,23,42,0.55);' +
                'backdrop-filter:blur(2px);pointer-events:auto;';
            document.body.appendChild(overlay);
        },

        removeRoadmapOverlay() {
            if (typeof document === 'undefined') return;
            const overlay = document.getElementById('quiz-lock-overlay');
            if (overlay) overlay.remove();
        }
    };

    // ── 8. Export ────────────────────────────────────────────
    global.QuizLockManager = QuizLockManager;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = QuizLockManager;
    }

})(typeof window !== 'undefined' ? window : this);
