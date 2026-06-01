/* localstorage-state-management.js
   Provides the LocalStorageState helper used by quiz.js.
   quiz.js safely checks `typeof LocalStorageState !== 'undefined'` before calling.
*/
const LocalStorageState = {
    isMandatoryQuizPending() {
        try {
            const raw = localStorage.getItem('xyverra_mandatory_quiz_state');
            if (!raw) return false;
            const state = JSON.parse(raw);
            return !!(state && state.isActive && state.assignedQuizzes &&
                state.assignedQuizzes.some(q => q.status !== 'passed'));
        } catch (e) { return false; }
    },
    getCurrentQuizProgress() {
        try {
            const raw = localStorage.getItem('xyverra_mandatory_quiz_state');
            if (!raw) return null;
            const state = JSON.parse(raw);
            if (!state || !state.isActive) return null;
            const pending = state.assignedQuizzes.find(q => q.status !== 'passed');
            if (!pending) return null;
            return { quizDetail: pending };
        } catch (e) { return null; }
    }
};
