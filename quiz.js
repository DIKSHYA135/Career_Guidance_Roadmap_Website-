/* =========================================================
   quiz.js — Xyverra Assessment Engine
   All localStorage calls are marked with TODO comments
   so they can be replaced with real API calls later.
   ========================================================= */

// ── Quiz Data (will come from GET /api/quiz/:moduleId in production) ──
const QUIZ_DATA = {
    // Web Development
    "html": {
        title: "HTML Fundamentals",
        questions: [
            { q: "What is the primary purpose of semantic HTML tags?", opts: [{ text: "To style the webpage elements faster.", correct: false }, { text: "To provide meaning to the structure for browsers and screen readers.", correct: true }, { text: "To execute JavaScript code locally on the client.", correct: false }, { text: "To connect directly to a server database.", correct: false }] },
            { q: "Which HTML tag is used to define the most important heading?", opts: [{ text: "<h6>", correct: false }, { text: "<heading>", correct: false }, { text: "<h1>", correct: true }, { text: "<head>", correct: false }] },
            { q: "What does the 'alt' attribute in an <img> tag provide?", opts: [{ text: "Image alignment", correct: false }, { text: "Alternative text for accessibility", correct: true }, { text: "Image animation", correct: false }, { text: "A link to the image source", correct: false }] }
        ]
    },
    "css": {
        title: "CSS & Responsive Design",
        questions: [
            { q: "Which CSS property is used to change the background color of an element?", opts: [{ text: "bgcolor", correct: false }, { text: "color", correct: false }, { text: "background-color", correct: true }, { text: "bg-color", correct: false }] },
            { q: "Which CSS layout model allows you to create complex responsive layouts easily?", opts: [{ text: "Float", correct: false }, { text: "Grid", correct: true }, { text: "Position", correct: false }, { text: "Display block", correct: false }] },
            { q: "What does 'em' unit represent in CSS?", opts: [{ text: "Exact millimeters", correct: false }, { text: "Relative to the root font size", correct: false }, { text: "Relative to the parent element's font size", correct: true }, { text: "A fixed pixel unit", correct: false }] }
        ]
    },
    "js": {
        title: "JavaScript Essentials",
        questions: [
            { q: "How do you write 'Hello World' in an alert box in JavaScript?", opts: [{ text: "msg('Hello World');", correct: false }, { text: "alertBox('Hello World');", correct: false }, { text: "msgBox('Hello World');", correct: false }, { text: "alert('Hello World');", correct: true }] },
            { q: "Which keyword declares a block-scoped variable in modern JavaScript?", opts: [{ text: "var", correct: false }, { text: "let", correct: true }, { text: "define", correct: false }, { text: "set", correct: false }] },
            { q: "What does the === operator check in JavaScript?", opts: [{ text: "Value only", correct: false }, { text: "Type only", correct: false }, { text: "Value and type (strict equality)", correct: true }, { text: "Reference equality", correct: false }] }
        ]
    },
    "react": {
        title: "Frontend Frameworks (React)",
        questions: [
            { q: "What is used in React to keep track of a component's internal data?", opts: [{ text: "Props", correct: false }, { text: "State", correct: true }, { text: "Context", correct: false }, { text: "Refs", correct: false }] },
            { q: "What is JSX in React?", opts: [{ text: "A CSS framework", correct: false }, { text: "A JavaScript extension that looks like HTML", correct: true }, { text: "A database query language", correct: false }, { text: "A testing library", correct: false }] }
        ]
    },
    "web-dev-basics": { title: "Web Basics", questions: [{ q: "Which of the following is NOT a core web technology?", opts: [{ text: "HTML", correct: false }, { text: "CSS", correct: false }, { text: "JavaScript", correct: false }, { text: "C++", correct: true }] }] },
    "nodejs": { title: "Node.js Fundamentals", questions: [{ q: "Node.js is primarily used for:", opts: [{ text: "Client-side scripting", correct: false }, { text: "Styling web pages", correct: false }, { text: "Server-side scripting", correct: true }, { text: "Database administration", correct: false }] }] },
    "programming-basics": { title: "Backend Language", questions: [{ q: "Which of these is a common backend language?", opts: [{ text: "HTML", correct: false }, { text: "CSS", correct: false }, { text: "Python", correct: true }, { text: "React", correct: false }] }] },
    "api-design": { title: "API Design & REST", questions: [{ q: "In a REST API, which HTTP method is typically used to create a new resource?", opts: [{ text: "GET", correct: false }, { text: "POST", correct: true }, { text: "DELETE", correct: false }, { text: "PUT", correct: false }] }] },
    "database": { title: "Databases", questions: [{ q: "What does SQL stand for?", opts: [{ text: "Strong Question Language", correct: false }, { text: "Structured Query Language", correct: true }, { text: "Standard Query Logic", correct: false }, { text: "Simple Queue Language", correct: false }] }] },
    "auth": { title: "Authentication", questions: [{ q: "What does JWT stand for?", opts: [{ text: "Java Web Token", correct: false }, { text: "JSON Web Token", correct: true }, { text: "JavaScript Web Token", correct: false }, { text: "JSON Window Token", correct: false }] }] },
    "python-data": { title: "Python for Data Science", questions: [{ q: "Which library is commonly used for data manipulation in Python?", opts: [{ text: "TensorFlow", correct: false }, { text: "Pandas", correct: true }, { text: "Flask", correct: false }, { text: "Django", correct: false }] }] },
    "pandas-numpy": { title: "Data Manipulation", questions: [{ q: "What is the primary data structure in Pandas for 2D tabular data?", opts: [{ text: "Series", correct: false }, { text: "List", correct: false }, { text: "DataFrame", correct: true }, { text: "Dictionary", correct: false }] }] },
    "data-viz": { title: "Data Visualization", questions: [{ q: "Which Python library is famous for creating static, interactive, and animated visualizations?", opts: [{ text: "Numpy", correct: false }, { text: "Scipy", correct: false }, { text: "Matplotlib", correct: true }, { text: "Pandas", correct: false }] }] },
    "machine-learning": { title: "Machine Learning", questions: [{ q: "Which type of machine learning involves predicting a continuous numerical value?", opts: [{ text: "Classification", correct: false }, { text: "Clustering", correct: false }, { text: "Regression", correct: true }, { text: "Dimensionality Reduction", correct: false }] }] },
    "nlp-fundamentals": { title: "NLP Fundamentals", questions: [{ q: "What is tokenization in NLP?", opts: [{ text: "Translating text", correct: false }, { text: "Splitting text into smaller units like words", correct: true }, { text: "Converting text to speech", correct: false }, { text: "Encrypting text", correct: false }] }] },
    "transformers-llms": { title: "Transformers & LLMs", questions: [{ q: "What mechanism is central to the Transformer architecture?", opts: [{ text: "Recurrence", correct: false }, { text: "Convolution", correct: false }, { text: "Self-Attention", correct: true }, { text: "Pooling", correct: false }] }] },
    "linux-bash": { title: "Linux & Bash Scripting", questions: [{ q: "Which command is used to list files in a Linux directory?", opts: [{ text: "cd", correct: false }, { text: "mkdir", correct: false }, { text: "ls", correct: true }, { text: "pwd", correct: false }] }] },
    "docker": { title: "Containerization", questions: [{ q: "What file contains instructions to build a Docker image?", opts: [{ text: "Dockerfile", correct: true }, { text: "DockerImage", correct: false }, { text: "DockerConfig", correct: false }, { text: "Containerfile", correct: false }] }] },
    "cicd": { title: "CI/CD Pipelines", questions: [{ q: "What does CI stand for in CI/CD?", opts: [{ text: "Continuous Integration", correct: true }, { text: "Continuous Installation", correct: false }, { text: "Controlled Integration", correct: false }, { text: "Central Integration", correct: false }] }] },
    "cloud-providers": { title: "Cloud Platforms", questions: [{ q: "Which is NOT a major public cloud provider?", opts: [{ text: "Amazon Web Services", correct: false }, { text: "Microsoft Azure", correct: false }, { text: "Google Cloud Platform", correct: false }, { text: "Apple Cloud", correct: true }] }] },
    "design-fundamentals": { title: "Design Principles", questions: [{ q: "Which principle refers to the arrangement of elements to signify importance?", opts: [{ text: "Contrast", correct: false }, { text: "Visual Hierarchy", correct: true }, { text: "Alignment", correct: false }, { text: "Proximity", correct: false }] }] },
    "figma": { title: "Figma Mastery", questions: [{ q: "What Figma feature automatically resizes frames based on their content?", opts: [{ text: "Components", correct: false }, { text: "Auto Layout", correct: true }, { text: "Constraints", correct: false }, { text: "Variants", correct: false }] }] },
    "user-research": { title: "User Research", questions: [{ q: "What is a 'Persona' in UX design?", opts: [{ text: "A fictional character representing a user type", correct: true }, { text: "A color palette", correct: false }, { text: "A software testing tool", correct: false }, { text: "A type of animation", correct: false }] }] },
    "mobile-fundamentals": { title: "Mobile Fundamentals", questions: [{ q: "Which language is primarily used for Flutter development?", opts: [{ text: "JavaScript", correct: false }, { text: "Java", correct: false }, { text: "Dart", correct: true }, { text: "Swift", correct: false }] }] },
    "react-native-flutter": { title: "Cross-Platform Frameworks", questions: [{ q: "React Native allows you to build mobile apps using:", opts: [{ text: "Python", correct: false }, { text: "C#", correct: false }, { text: "JavaScript and React", correct: true }, { text: "Ruby", correct: false }] }] },
    "mobile-ui": { title: "Mobile UI", questions: [{ q: "What is a common pattern for navigating between sections in a mobile app?", opts: [{ text: "Hyperlinks in text", correct: false }, { text: "Bottom Tab Navigation", correct: true }, { text: "Browser Back Button", correct: false }, { text: "Scrollbars", correct: false }] }] },
    "networking-basics": { title: "Networking Basics", questions: [{ q: "What does IP stand for in networking?", opts: [{ text: "Internet Protocol", correct: true }, { text: "Internal Protocol", correct: false }, { text: "International Provider", correct: false }, { text: "Internet Provider", correct: false }] }] },
    "security-fundamentals": { title: "Security Fundamentals", questions: [{ q: "What is the primary purpose of encryption?", opts: [{ text: "To make data smaller", correct: false }, { text: "To make data unreadable to unauthorized users", correct: true }, { text: "To speed up data transmission", correct: false }, { text: "To organize data in a database", correct: false }] }] },
    "ethical-hacking": { title: "Ethical Hacking", questions: [{ q: "What is 'penetration testing'?", opts: [{ text: "Writing secure code", correct: false }, { text: "Authorized simulated cyberattack to evaluate security", correct: true }, { text: "Testing the durability of hardware", correct: false }, { text: "Installing antivirus software", correct: false }] }] },
    "excel-advanced": { title: "Advanced Excel", questions: [{ q: "Which Excel feature allows you to summarize and analyze large data dynamically?", opts: [{ text: "VLOOKUP", correct: false }, { text: "Macros", correct: false }, { text: "Pivot Tables", correct: true }, { text: "Conditional Formatting", correct: false }] }] },
    "sql-analytics": { title: "SQL for Analytics", questions: [{ q: "Which SQL clause groups rows with the same values into summary rows?", opts: [{ text: "ORDER BY", correct: false }, { text: "GROUP BY", correct: true }, { text: "JOIN", correct: false }, { text: "WHERE", correct: false }] }] },
    "bi-tools": { title: "BI Tools", questions: [{ q: "What is the primary purpose of BI tools like Tableau or Power BI?", opts: [{ text: "To write databases", correct: false }, { text: "To visualize and analyze data", correct: true }, { text: "To develop web apps", correct: false }, { text: "To train AI models", correct: false }] }] },
    "capstone": { title: "Capstone Project", questions: [{ q: "What is the purpose of a capstone project in a learning roadmap?", opts: [{ text: "To write a research paper", correct: false }, { text: "To demonstrate job-ready skills through a real-world project", correct: true }, { text: "To study theory only", correct: false }, { text: "To pass a multiple-choice exam", correct: false }] }] }
};

// ── Option labels ──
const OPTION_LABELS = ['A', 'B', 'C', 'D'];

// ── State ──
let quizTimerInterval = null;
let timeLeft = 20;
let quizPhase = 'read';      // 'read' | 'answer'
let currentQuestionIndex = 0;
let selectedOptionIndex = null;
let score = 0;
let moduleId = 'html';
let questions = [];

document.addEventListener("DOMContentLoaded", () => {
    // ── Read module from URL ──
    const urlParams = new URLSearchParams(window.location.search);
    moduleId = urlParams.get('module') || 'html';

    // TODO: Replace with GET /api/quiz/:moduleId
    const quizData = QUIZ_DATA[moduleId] || QUIZ_DATA['html'];
    questions = quizData.questions;

    // ── Set page title ──
    const moduleTitle = document.getElementById('quiz-module-title');
    if (moduleTitle) moduleTitle.textContent = quizData.title + ' Assessment';

    // ── DOM refs ──
    const quizQuestionTxt   = document.getElementById('quiz-question');
    const quizOptionsCont   = document.getElementById('quiz-options-container');
    const timerBar          = document.getElementById('quiz-timer');
    const timerText         = document.getElementById('timer-text');
    const quizStatus        = document.getElementById('quiz-status');
    const btnNextQuestion   = document.getElementById('btn-next-question');
    const btnExitQuiz       = document.getElementById('btn-exit-quiz');
    const resultContainer   = document.getElementById('quiz-result-container');
    const quizBody          = document.getElementById('quiz-body');
    const questionMeta      = document.getElementById('question-meta-text');

    // ── Exit button — always goes back to roadmap ──
    btnExitQuiz.addEventListener('click', () => {
        clearInterval(quizTimerInterval);
        window.location.href = 'roadmap.html';
    });

    // ── Next question ──
    btnNextQuestion.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    // ── Start first question ──
    loadQuestion();

    // ────────────────────────────────────────────────────
    function loadQuestion() {
        clearInterval(quizTimerInterval);
        selectedOptionIndex = null;
        btnNextQuestion.style.display = 'none';
        quizPhase = 'read';

        if (currentQuestionIndex >= questions.length) {
            showResults();
            return;
        }

        const q = questions[currentQuestionIndex];

        // Update question counter
        if (questionMeta) {
            questionMeta.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        }

        // Set question text
        quizQuestionTxt.textContent = q.q;

        // Clear and disable options during reading time
        quizOptionsCont.innerHTML = '';
        quizOptionsCont.classList.add('disabled');

        // Render option buttons (hidden during reading)
        q.opts.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.id = `option-${i}`;
            btn.innerHTML = `
                <span class="option-letter">${OPTION_LABELS[i]}</span>
                <span class="option-text">${opt.text}</span>
            `;
            btn.addEventListener('click', () => selectOption(i, opt.correct, q.opts));
            quizOptionsCont.appendChild(btn);
        });

        // Status: reading phase
        quizStatus.textContent = 'Read the question carefully. Options will unlock in 20 seconds.';
        quizStatus.className = 'quiz-status warning';

        // Timer: 20s reading, then 30s answering
        timeLeft = 20;
        updateTimerBar(timeLeft, 20, timerBar);
        timerText.textContent = `${timeLeft}s Reading Time`;

        quizTimerInterval = setInterval(() => {
            timeLeft--;
            updateTimerBar(timeLeft, quizPhase === 'read' ? 20 : 30, timerBar);

            if (quizPhase === 'read') {
                timerText.textContent = `${timeLeft}s Reading Time`;
                if (timeLeft <= 0) {
                    // Switch to answer phase
                    quizPhase = 'answer';
                    timeLeft = 30;
                    quizOptionsCont.classList.remove('disabled');
                    quizStatus.textContent = 'Select your answer!';
                    quizStatus.className = 'quiz-status info';
                    timerText.textContent = `${timeLeft}s to Answer`;
                    updateTimerBar(timeLeft, 30, timerBar);
                }
            } else {
                timerText.textContent = `${timeLeft}s to Answer`;
                if (timeLeft <= 0) {
                    // Time's up — auto-mark wrong
                    clearInterval(quizTimerInterval);
                    quizOptionsCont.classList.add('disabled');
                    // Highlight correct answer
                    q.opts.forEach((opt, i) => {
                        if (opt.correct) {
                            document.getElementById(`option-${i}`).classList.add('correct');
                        }
                    });
                    quizStatus.textContent = "⏰ Time's up! The correct answer is highlighted.";
                    quizStatus.className = 'quiz-status error';
                    timerText.textContent = 'Time Up!';
                    btnNextQuestion.style.display = 'inline-flex';
                    btnNextQuestion.textContent = currentQuestionIndex + 1 < questions.length ? 'Next Question →' : 'See Results →';
                }
            }
        }, 1000);
    }

    // ────────────────────────────────────────────────────
    function selectOption(index, isCorrect, opts) {
        if (quizPhase !== 'answer' || selectedOptionIndex !== null) return;
        clearInterval(quizTimerInterval);

        selectedOptionIndex = index;
        quizOptionsCont.classList.add('disabled');

        const selectedBtn = document.getElementById(`option-${index}`);

        if (isCorrect) {
            selectedBtn.classList.add('correct');
            quizStatus.textContent = '✅ Correct! Well done!';
            quizStatus.className = 'quiz-status success';
            score++;
        } else {
            selectedBtn.classList.add('wrong');
            quizStatus.textContent = '❌ Incorrect. The correct answer is highlighted.';
            quizStatus.className = 'quiz-status error';
            // Highlight correct
            opts.forEach((opt, i) => {
                if (opt.correct) {
                    document.getElementById(`option-${i}`).classList.add('correct');
                }
            });
        }

        timerText.textContent = 'Answered';
        btnNextQuestion.style.display = 'inline-flex';
        btnNextQuestion.textContent = currentQuestionIndex + 1 < questions.length ? 'Next Question →' : 'See Results →';
    }

    // ────────────────────────────────────────────────────
    function updateTimerBar(current, total, bar) {
        if (!bar) return;
        const pct = Math.max(0, (current / total) * 100);
        bar.style.width = `${pct}%`;
        if (pct > 50) bar.style.background = 'linear-gradient(90deg, var(--primary), var(--accent))';
        else if (pct > 25) bar.style.background = 'linear-gradient(90deg, #F59E0B, #FBBF24)';
        else bar.style.background = 'linear-gradient(90deg, var(--error), #F87171)';
    }

    // ────────────────────────────────────────────────────
    function showResults() {
        clearInterval(quizTimerInterval);

        const pct = Math.round((score / questions.length) * 100);
        const passed = pct >= 70;

        // Hide quiz body, show result
        if (quizBody) quizBody.style.display = 'none';
        resultContainer.style.display = 'block';

        const resultIcon   = document.getElementById('result-icon');
        const scoreDisplay = document.getElementById('score-display');
        const scoreText    = document.getElementById('score-text');

        resultIcon.className = `result-icon ${passed ? 'success' : 'fail'}`;
        resultIcon.innerHTML = passed
            ? '<i class="fas fa-check-circle"></i>'
            : '<i class="fas fa-times-circle"></i>';

        scoreDisplay.textContent = `${pct}%`;
        scoreText.textContent = passed
            ? `You scored ${score}/${questions.length} — Module Verified! 🎉`
            : `You scored ${score}/${questions.length} — Try again to pass (70% needed).`;

        // Timer bar full green on completion
        const timerBar = document.getElementById('quiz-timer');
        if (timerBar) {
            timerBar.style.width = '100%';
            timerBar.style.background = passed
                ? 'linear-gradient(90deg, var(--success), #34D399)'
                : 'linear-gradient(90deg, var(--error), #F87171)';
        }

        timerText.textContent = passed ? '🎉 Passed!' : '💪 Keep Learning';
        quizStatus.textContent = '';

        // Exit button → always roadmap
        btnExitQuiz.textContent = '← Back to Roadmap';
        btnNextQuestion.style.display = 'none';

        // Save if passed
        if (passed) {
            // TODO: POST /api/quiz/submit { moduleId, score, total: questions.length }
            let completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
            if (!completedModules.includes(moduleId)) {
                completedModules.push(moduleId);
                localStorage.setItem('completedModules', JSON.stringify(completedModules));
            }

            // TODO: Update user skill score via PATCH /api/user/score
            let currentScore = parseInt(localStorage.getItem('xyverra_skill_score') || '0');
            localStorage.setItem('xyverra_skill_score', currentScore + 10);
        }
    }
});
