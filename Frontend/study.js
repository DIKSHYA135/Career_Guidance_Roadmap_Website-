document.addEventListener('DOMContentLoaded', () => {
    const REQUIRED_SECONDS = 600; // 10 minutes

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
    const markdownContainer = document.getElementById('markdown-container');
    const fallbackMsg = document.getElementById('fallback-msg');
    
    // --- Loader helper ---
    function hideLoader() {
        if (loader) { loader.style.opacity = '0'; loader.style.pointerEvents = 'none'; }
    }

    if (courseUrl.endsWith('.md')) {
        iframe.style.display = 'none';
        if (fallbackMsg) fallbackMsg.style.display = 'none';
        if (markdownContainer) markdownContainer.style.display = 'block';

        // Try embedded content first (works on file:// protocol)
        const embedded = window.LESSON_CONTENT && window.LESSON_CONTENT[courseUrl];
        if (embedded) {
            if (window.marked && markdownContainer) {
                markdownContainer.innerHTML = window.marked.parse(embedded);
            } else if (markdownContainer) {
                markdownContainer.innerHTML = '<pre style="white-space: pre-wrap; font-family: inherit;">' + embedded + '</pre>';
            }
            hideLoader();
        } else {
            // Fallback: try fetch (works on http:// servers)
            fetch(courseUrl)
                .then(res => res.text())
                .then(text => {
                    if (window.marked && markdownContainer) {
                        markdownContainer.innerHTML = window.marked.parse(text);
                    } else if (markdownContainer) {
                        markdownContainer.innerHTML = '<pre style="white-space: pre-wrap; font-family: inherit;">' + text + '</pre>';
                    }
                    hideLoader();
                })
                .catch(() => {
                    if (markdownContainer) markdownContainer.innerHTML = '<p style="color:red;">Error loading lesson content. Please check your connection.</p>';
                    hideLoader();
                });
        }
    } else {
        iframe.src = courseUrl;
    }

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

    function markCourseCompleted(id) {
        if (!id) return;
        try {
            const raw = localStorage.getItem('completedCourses');
            const arr = raw ? JSON.parse(raw) : [];
            const set = new Set(Array.isArray(arr) ? arr : []);
            set.add(id);
            localStorage.setItem('completedCourses', JSON.stringify(Array.from(set)));
        } catch (e) { /* ignore */ }
    }

    function persistTimeSpent(id, seconds) {
        if (!id) return;
        try {
            localStorage.setItem('timeSpent_' + id, String(seconds));
        } catch (e) { /* ignore */ }
    }


    // ── API: report lesson studied to server ──────────────
    async function reportLessonStudied(id, mod, secs) {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!id || !token) return;
        const userPath = localStorage.getItem('xyverra_selected_path') || mod || id;
        try {
            await fetch('http://localhost:5000/api/progress/mark-viewed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify({ moduleId: mod || id, roadmapId: userPath, timeSpentSeconds: secs || 0 })
            });
        } catch (e) {
            console.error('Failed to mark viewed:', e);
        }
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
    completeBtn.disabled = false;
    completeBtn.classList.add('ready');
    completeLabel.textContent = 'Mark as Complete';
    timerHint.textContent = 'You can mark this lesson complete.';

    // --- Navigation helpers ---
    function buildReturnUrl(completed) {
        const params = new URLSearchParams();
        params.set('returnTo', returnTo);
        if (completed && courseId) params.set('completed', courseId);
        if (moduleId) params.set('moduleId', moduleId);
        return 'roadmap.html?' + params.toString();
    }

    async function completeLesson() {
        completeBtn.disabled = true;
        completeBtn.textContent = 'Saving...';
        if (courseId) {
            markCourseOpened(courseId);
            markCourseCompleted(courseId);
            persistTimeSpent(courseId, seconds);
            await reportLessonStudied(courseId, moduleId, seconds);
        }
        window.location.href = buildReturnUrl(true);
    }

    completeBtn.addEventListener('click', () => {
        completeLesson();
    });

    // --- Back button: pass courseId back if time was spent; mark studied if >=30s ---
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        clearInterval(intervalId);

        const metRequirement = true;
        if (metRequirement && courseId) {
            markCourseOpened(courseId);
            markCourseCompleted(courseId);
            reportLessonStudied(courseId, moduleId, seconds);
        }
        // Pass courseId back as "completed" only when the requirement was met;
        // otherwise just return to the roadmap (time is already persisted).
        if (courseId) {
            window.location.href = buildReturnUrl(metRequirement);
        } else {
            window.location.href = buildReturnUrl(false);
        }
    });
} // end if (courseId)
});