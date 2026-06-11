document.addEventListener('DOMContentLoaded', () => {
    const REQUIRED_SECONDS = 30;

    const urlParams = new URLSearchParams(window.location.search);
    let courseUrl = urlParams.get('url');
    const courseTitle = urlParams.get('title') || 'Course Material';
    const courseId = urlParams.get('courseId') || '';
    const moduleId = urlParams.get('moduleId') || '';
    const returnTo = urlParams.get('returnTo') || 'roadmap';

    // --- Element refs ---
    const iframe = document.getElementById('course-frame');
    const loader = document.getElementById('loader');
    const newTabBtn1 = document.getElementById('open-new-tab');
    const newTabBtn2 = document.getElementById('fallback-new-tab');
    const backBtn = document.getElementById('back-btn');
    const completeBtn = document.getElementById('mark-complete');
    const completeLabel = document.getElementById('complete-label');
    const timerText = document.getElementById('timer-text');
    const timerFill = document.getElementById('timer-fill');
    const timerHint = document.getElementById('timer-hint');

    document.getElementById('display-title').textContent = courseTitle;
    document.title = courseTitle + ' - Study Mode';

    // --- Resolve / normalize the course URL ---
    if (!courseUrl) {
        courseUrl = 'roadmap.html';
    }
    if (courseUrl.includes('youtube.com/watch?v=')) {
        courseUrl = courseUrl.replace('watch?v=', 'embed/');
    } else if (courseUrl.includes('youtu.be/')) {
        const id = courseUrl.split('youtu.be/')[1].split(/[?&]/)[0];
        courseUrl = 'https://www.youtube.com/embed/' + id;
    }

    newTabBtn1.href = courseUrl;
    newTabBtn2.href = courseUrl;
    iframe.src = courseUrl;

    // --- localStorage helpers ---
    function getOpenedCourses() {
        try {
            const raw = localStorage.getItem('openedCourses');
            const arr = raw ? JSON.parse(raw) : [];
            return Array.isArray(arr) ? arr : [];
        } catch (e) {
            return [];
        }
    }

    function markCourseOpened(id) {
        if (!id) return;
        const set = new Set(getOpenedCourses());
        set.add(id);
        try {
            localStorage.setItem('openedCourses', JSON.stringify(Array.from(set)));
        } catch (e) { /* storage full / blocked */ }
    }

    function persistTimeSpent(id, seconds) {
        if (!id) return;
        try {
            localStorage.setItem('timeSpent_' + id, String(seconds));
        } catch (e) { /* ignore */ }
    }


    // ── API: report lesson studied to server (fire-and-forget) ──────────────
    function reportLessonStudied(id, mod, secs) {
        const token = localStorage.getItem('token');
        if (!id || !token) return;
        fetch('http://localhost:5000/api/user/mark-lesson-studied', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ courseId: id, moduleId: mod || null, timeSpentSeconds: secs || 0 })
        }).catch(() => { /* non-blocking; localStorage is source of truth */ });
    }
    // --- Loader handling ---
    let loaderHidden = false;
    function hideLoader() {
        if (loaderHidden) return;
        loaderHidden = true;
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 300);
    }

    iframe.onload = hideLoader;

    setTimeout(() => {
        if (!loaderHidden) {
            hideLoader();
            // Let the fallback message show through if the frame is blank/blocked.
            iframe.style.background = 'transparent';
        }
    }, 4000);

    // --- Progress timer ---
    // Resume from any previously stored time for this course.
    let seconds = 0;
    if (courseId) {
        const prior = parseInt(localStorage.getItem('timeSpent_' + courseId) || '0', 10);
        if (!isNaN(prior) && prior > 0) seconds = Math.min(prior, REQUIRED_SECONDS);
    }

    let unlocked = false;

    function renderTimer() {
        const capped = Math.min(seconds, REQUIRED_SECONDS);
        const pct = Math.round((capped / REQUIRED_SECONDS) * 100);
        timerText.textContent = capped + '/' + REQUIRED_SECONDS + 's';
        timerFill.style.width = pct + '%';

        if (seconds >= REQUIRED_SECONDS) {
            if (!unlocked) unlockComplete();
        } else {
            const remaining = REQUIRED_SECONDS - seconds;
            timerHint.textContent = 'You need to spend ' + remaining + ' more second' + (remaining === 1 ? '' : 's') + ' on this lesson';
        }
    }

    function unlockComplete() {
        unlocked = true;
        completeBtn.disabled = false;
        completeBtn.classList.add('ready');
        completeLabel.textContent = 'Mark as Complete';
        timerFill.classList.add('done');
        timerHint.textContent = 'Lesson time met. You can mark this lesson complete.';
    }

    renderTimer();

    const intervalId = setInterval(() => {
        seconds += 1;
        if (courseId) persistTimeSpent(courseId, seconds);
        renderTimer();
        if (seconds >= REQUIRED_SECONDS) {
            clearInterval(intervalId);
        }
    }, 1000);

    // --- Navigation helpers ---
    function buildReturnUrl(completed) {
        const params = new URLSearchParams();
        params.set('returnTo', returnTo);
        if (completed && courseId) params.set('completed', courseId);
        if (moduleId) params.set('moduleId', moduleId);
        return 'roadmap.html?' + params.toString();
    }

    function completeLesson() {
        if (courseId) {
            markCourseOpened(courseId);
            persistTimeSpent(courseId, Math.max(seconds, REQUIRED_SECONDS));
            reportLessonStudied(courseId, moduleId, Math.max(seconds, REQUIRED_SECONDS));
        }
        clearInterval(intervalId);
        window.location.href = buildReturnUrl(true);
    }

    completeBtn.addEventListener('click', () => {
        if (!unlocked && seconds < REQUIRED_SECONDS) return;
        completeLesson();
    });

    // --- Back button: pass courseId back if time was spent; mark studied if >=30s ---
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        clearInterval(intervalId);

        const metRequirement = seconds >= REQUIRED_SECONDS;
        if (metRequirement && courseId) {
            markCourseOpened(courseId);
            reportLessonStudied(courseId, moduleId, seconds);
        }
        // Pass courseId back as "completed" only when the requirement was met;
        // otherwise just return to the roadmap (time is already persisted).
        if (seconds > 0 && courseId) {
            window.location.href = buildReturnUrl(metRequirement);
        } else {
            window.location.href = buildReturnUrl(false);
        }
    });
});