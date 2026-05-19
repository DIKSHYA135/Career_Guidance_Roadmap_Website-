// --- State Management ---
// Fake user database for prototype
let currentUser = null;

// Roadmap Course Data
const coursesData = {
    "Web Development": [
        { id: 1, title: "HTML Fundamentals", desc: "Learn the structure of web pages.", locked: false, completed: false },
        { id: 2, title: "CSS & Responsive Design", desc: "Styling and flexible layouts.", locked: true, completed: false },
        { id: 3, title: "JavaScript Essentials", desc: "Make pages interactive.", locked: true, completed: false },
        { id: 4, title: "React Basics", desc: "Modern frontend library.", locked: true, completed: false },
        { id: 5, title: "Capstone Project", desc: "Build a complete web app.", locked: true, completed: false }
    ],
    "Data Science": [
        { id: 1, title: "Python Basics", desc: "Core programming concepts.", locked: false, completed: false },
        { id: 2, title: "Pandas & Data Wrangling", desc: "Data manipulation.", locked: true, completed: false },
        { id: 3, title: "Data Visualization", desc: "Matplotlib & Seaborn.", locked: true, completed: false },
        { id: 4, title: "Machine Learning Intro", desc: "Scikit-learn algorithms.", locked: true, completed: false },
        { id: 5, title: "Capstone Project", desc: "Predictive model application.", locked: true, completed: false }
    ],
    // Default fallback
    "Default": [
        { id: 1, title: "Module 1 Fundamentals", desc: "Core principles.", locked: false, completed: false },
        { id: 2, title: "Module 2 Intermediate", desc: "Build upon basics.", locked: true, completed: false },
        { id: 3, title: "Module 3 Advanced", desc: "Complex concepts.", locked: true, completed: false }
    ]
};

// --- DOM Elements ---
const views = document.querySelectorAll('.view');
// Auth
const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginError = document.getElementById('login-error');
const signupError = document.getElementById('signup-error');
// Setup
const careerCards = document.querySelectorAll('#career-options .option-card');
const btnCareerNext = document.getElementById('btn-career-next');
const levelCards = document.querySelectorAll('.level-card');
const btnLevelNext = document.getElementById('btn-level-next');
const existingSkillsInput = document.getElementById('existing-skills-input');
const stepCareer = document.getElementById('step-career');
const stepLevel = document.getElementById('step-level');
const stepProcessing = document.getElementById('step-processing');
// Dashboard
const btnLogout = document.getElementById('btn-logout');
const studentNameDisplay = document.getElementById('student-name');
const studentLevelDisplay = document.getElementById('student-level');
const overallProgressBar = document.getElementById('overall-progress-bar');
const scoreText = document.getElementById('score-text');
const roleText = document.getElementById('role-text');
const roadmapTimeline = document.getElementById('roadmap-timeline');
// Quiz
const btnStartQuiz = document.getElementById('btn-start-quiz');
const btnExitQuiz = document.getElementById('btn-exit-quiz');


// --- View Navigation Helper ---
function switchView(targetViewId) {
    views.forEach(view => {
        if (view.id === targetViewId) {
            view.classList.add('active');
        } else {
            view.classList.remove('active');
        }
    });
}

// --- Initialization Check ---
function checkAuth() {
    const savedUser = localStorage.getItem('xyverra_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        // Direct Course Redirection Logic
        if (currentUser.isSetupComplete) {
            setupDashboard();
            switchView('course-view');
        } else {
            // Edge case: Setup not finished
            switchView('setup-view');
        }
    } else {
        switchView('auth-view');
    }
}

// --- Auth Event Listeners ---
showSignupBtn.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
});

showLoginBtn.addEventListener('click', () => {
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (password.length < 8) {
        signupError.textContent = 'Password must be at least 8 characters long.';
        return;
    }

    // Save initial user state
    currentUser = {
        name,
        email,
        password,
        role: null,
        levelCategory: null,
        score: 0,
        isSetupComplete: false
    };
    localStorage.setItem('xyverra_user', JSON.stringify(currentUser));
    
    // Move to Career Setup ONLY ON SIGNUP
    switchView('setup-view');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const savedUser = localStorage.getItem('xyverra_user');
    if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.email === email && parsed.password === password) {
            currentUser = parsed;
            // Immediate Redirection to Course View
            setupDashboard();
            switchView('course-view');
        } else {
            loginError.textContent = 'Invalid credentials.';
        }
    } else {
        loginError.textContent = 'No account found. Please sign up.';
    }
});

btnLogout.addEventListener('click', () => {
    currentUser = null;
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    switchView('auth-view');
});


// --- Setup Wizard Logic (Signup Only) ---
let selectedCareer = null;
let selectedLevel = null;

careerCards.forEach(card => {
    card.addEventListener('click', () => {
        careerCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedCareer = card.getAttribute('data-domain');
        btnCareerNext.classList.remove('disabled');
        btnCareerNext.removeAttribute('disabled');
    });
});

btnCareerNext.addEventListener('click', () => {
    document.getElementById('selected-domain-display').textContent = selectedCareer;
    stepCareer.classList.add('hidden');
    stepLevel.classList.remove('hidden');
});

document.getElementById('btn-level-back').addEventListener('click', () => {
    stepLevel.classList.add('hidden');
    stepCareer.classList.remove('hidden');
});

levelCards.forEach(card => {
    card.addEventListener('click', () => {
        levelCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedLevel = card.getAttribute('data-level');
        btnLevelNext.classList.remove('disabled');
        btnLevelNext.removeAttribute('disabled');

        if (selectedLevel === 'Existing') {
            existingSkillsInput.classList.remove('hidden');
        } else {
            existingSkillsInput.classList.add('hidden');
        }
    });
});

btnLevelNext.addEventListener('click', () => {
    // Process Data
    currentUser.role = selectedCareer;
    
    // Calculate Score Logic
    let calculatedScore = 15; // default Beginner score
    let strLevel = "Beginner";
    
    if (selectedLevel === 'Existing') {
        const skillsText = document.getElementById('user-skills').value;
        const github = document.getElementById('user-github').value;
        let points = 25; // base intermediate
        if (skillsText.split(',').length > 3) points += 20;
        if (github.length > 5) points += 15;
        
        calculatedScore = points;
        if (points >= 80) strLevel = "Ultra";
        else if (points >= 40) strLevel = "Advanced";
        else strLevel = "Intermediate";
    }

    currentUser.score = calculatedScore;
    currentUser.levelCategory = strLevel;
    currentUser.isSetupComplete = true;

    // Simulate Processing Delay
    stepLevel.classList.add('hidden');
    document.getElementById('target-career-text').textContent = selectedCareer;
    stepProcessing.classList.remove('hidden');

    setTimeout(() => {
        localStorage.setItem('xyverra_user', JSON.stringify(currentUser));
        setupDashboard();
        switchView('course-view');
        // Reset setup view for future sessions
        stepProcessing.classList.add('hidden');
        stepCareer.classList.remove('hidden');
    }, 2000);
});

// --- Dashboard / Roadmap Setup ---
function setupDashboard() {
    studentNameDisplay.textContent = currentUser.name;
    studentLevelDisplay.textContent = currentUser.levelCategory;
    
    // Set fixed progress bar (fixes UI hover issue)
    overallProgressBar.style.width = `${currentUser.score}%`;
    scoreText.textContent = `${currentUser.score}% Skill Match`;
    roleText.textContent = currentUser.role;

    // Build Roadmap Timeline
    const track = coursesData[currentUser.role] || coursesData["Default"];
    roadmapTimeline.innerHTML = '';

    track.forEach((course) => {
        // Adjust status based on score natively for demo
        // E.g. high score auto completes beginner courses
        let statusClass = 'locked';
        let pillText = 'Locked';
        
        if (currentUser.score > 30 && course.id === 1) {
            statusClass = 'completed'; pillText = 'Completed';
        } else if (currentUser.score <= 30 && course.id === 1) {
            statusClass = 'active'; pillText = 'Current Module';
        } else if (currentUser.score > 30 && course.id === 2) {
            statusClass = 'active'; pillText = 'Current Module';
        }

        const item = document.createElement('div');
        item.className = `timeline-item ${statusClass}`;
        item.innerHTML = `
            <div class="timeline-content">
                <h4>${course.title}</h4>
                <p>${course.desc}</p>
                <span class="timeline-pill">${pillText}</span>
            </div>
        `;
        roadmapTimeline.appendChild(item);
    });
}

// --- Quiz Timer Logic ---
let quizTimerInterval;
let timeLeft = 20;
let quizPhase = 'read'; // 'read' or 'answer'

const quizQuestionTxt = document.getElementById('quiz-question');
const quizOptionsCont = document.getElementById('quiz-options-container');
const timerText = document.getElementById('timer-text');
const quizStatus = document.getElementById('quiz-status');
const btnNextQuestion = document.getElementById('btn-next-question');

btnStartQuiz.addEventListener('click', () => {
    switchView('quiz-view');
    startQuizCycle();
});

btnExitQuiz.addEventListener('click', () => {
    clearInterval(quizTimerInterval);
    switchView('course-view');
});

btnNextQuestion.addEventListener('click', () => {
    startQuizCycle();
});

function startQuizCycle() {
    clearInterval(quizTimerInterval);
    quizPhase = 'read';
    timeLeft = 20; // 20s read
    
    quizQuestionTxt.textContent = "What is the primary purpose of semantic HTML tags?";
    quizOptionsCont.innerHTML = `
        <div class="quiz-option" data-correct="false">To style the webpage elements faster.</div>
        <div class="quiz-option" data-correct="true">To provide meaning to the structure for browsers and screen readers.</div>
        <div class="quiz-option" data-correct="false">To execute JavaScript code locally on the client.</div>
        <div class="quiz-option" data-correct="false">To connect directly to a server database.</div>
    `;
    quizOptionsCont.classList.add('disabled');
    
    btnNextQuestion.classList.add('hidden');
    quizStatus.textContent = "Read the question carefully. Answer options will unlock shortly.";
    quizStatus.className = "warning";
    timerText.textContent = `20s Reading Time`;

    quizTimerInterval = setInterval(updateQuizTimer, 1000);
}

function updateQuizTimer() {
    timeLeft--;
    
    if (quizPhase === 'read') {
        timerText.textContent = `${timeLeft}s Reading Time`;
        if (timeLeft <= 0) {
            quizPhase = 'answer';
            timeLeft = 20; // 20s answer
            quizOptionsCont.classList.remove('disabled');
            quizStatus.textContent = "Time to answer! Select an option.";
            quizStatus.className = "";
            attachQuizListeners();
        }
    } else if (quizPhase === 'answer') {
        timerText.textContent = `${timeLeft}s to Answer`;
        if (timeLeft <= 0) {
            clearInterval(quizTimerInterval);
            handleQuizTimeout();
        }
    }
}

function attachQuizListeners() {
    const options = quizOptionsCont.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.addEventListener('click', (e) => {
            if (quizOptionsCont.classList.contains('disabled')) return;
            handleQuizSelection(e.target);
        });
    });
}

function handleQuizSelection(selectedElement) {
    clearInterval(quizTimerInterval);
    quizOptionsCont.classList.add('disabled'); // lock further choices
    
    const isCorrect = selectedElement.getAttribute('data-correct') === 'true';
    
    if (isCorrect) {
        selectedElement.classList.add('correct');
        selectedElement.innerHTML += ' <span class="icon">✅</span>';
        quizStatus.textContent = "Correct! Well done.";
        quizStatus.className = "warning" // Reusing warning class for styling, ideally add success class
        quizStatus.style.color = "var(--success)";
    } else {
        selectedElement.classList.add('wrong');
        selectedElement.innerHTML += ' <span class="icon">❌</span>';
        quizStatus.textContent = "Incorrect. Review the module materials.";
        quizStatus.style.color = "var(--danger)";
        
        // Highlight correct one
        const correctOpt = quizOptionsCont.querySelector('[data-correct="true"]');
        if (correctOpt) {
            correctOpt.classList.add('correct');
        }
    }
    
    btnNextQuestion.classList.remove('hidden');
}

function handleQuizTimeout() {
    quizOptionsCont.classList.add('disabled');
    quizStatus.textContent = "Time's up!";
    quizStatus.style.color = "var(--danger)";
    
    const correctOpt = quizOptionsCont.querySelector('[data-correct="true"]');
    if (correctOpt) {
        correctOpt.classList.add('correct');
    }
    btnNextQuestion.classList.remove('hidden');
}

// Initial Boot
checkAuth();
