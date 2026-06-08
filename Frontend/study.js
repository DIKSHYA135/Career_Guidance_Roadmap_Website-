document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    let courseUrl = urlParams.get('url');
    const courseTitle = urlParams.get('title') || 'Course Material';
    
    document.getElementById('display-title').textContent = courseTitle;
    
    const iframe = document.getElementById('course-frame');
    const loader = document.getElementById('loader');
    const newTabBtn1 = document.getElementById('open-new-tab');
    const newTabBtn2 = document.getElementById('fallback-new-tab');

    if (!courseUrl) {
        courseUrl = 'roadmap.html';
    }

    // Attempt to fix YouTube links to be embeddable
    if (courseUrl.includes('youtube.com/watch?v=')) {
        courseUrl = courseUrl.replace('watch?v=', 'embed/');
    } else if (courseUrl.includes('youtu.be/')) {
        const id = courseUrl.split('youtu.be/')[1];
        courseUrl = 'https://www.youtube.com/embed/' + id;
    }

    newTabBtn1.href = courseUrl;
    newTabBtn2.href = courseUrl;

    iframe.src = courseUrl;

    // Remove loader once iframe triggers load event
    iframe.onload = () => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 300);
    };

    // Fallback: If it takes too long, just hide loader so they can see the message behind it
    setTimeout(() => {
        if (loader.style.display !== 'none') {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 300);
            iframe.style.background = 'transparent'; // Let the fallback message show through if nothing loaded
        }
    }, 4000);
});
