/* quiz-lock-manager.js
   Provides the QuizLockManager helper used by quiz.js.
   quiz.js safely checks `typeof QuizLockManager !== 'undefined'` before calling.
*/
const QuizLockManager = {
    disableNavigation() {
        // Visually disable sidebar nav links during a quiz session
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
    }
};
