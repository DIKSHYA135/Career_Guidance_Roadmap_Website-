const ROADMAP_DATA = {
    "Web Development": [
        {
            id: "html", title: "HTML Fundamentals", desc: "Master semantic elements, forms, and basic SEO principles.", keywords: ["html", "html5", "markup", "web fundamentals"],
            courses: [
                { name: "MDN HTML Docs", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
                { name: "W3Schools HTML Tutorial", url: "https://www.w3schools.com/html/" },
                { name: "GeeksforGeeks HTML", url: "https://www.geeksforgeeks.org/html-tutorial/" }
            ]
        },
        {
            id: "css", title: "CSS & Responsive Design", desc: "Flexbox, Grid, and making layouts work on all devices.", keywords: ["css", "css3", "flexbox", "grid", "responsive", "styling"],
            courses: [
                { name: "MDN CSS Docs", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS" },
                { name: "W3Schools CSS Tutorial", url: "https://www.w3schools.com/css/" },
                { name: "Kevin Powell CSS (YouTube)", url: "https://www.youtube.com/@KevinPowell" }
            ]
        },
        {
            id: "js", title: "JavaScript Essentials", desc: "Functions, DOM manipulation, and basic application logic.", keywords: ["javascript", "js", "es6", "dom"],
            courses: [
                { name: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
                { name: "W3Schools JavaScript", url: "https://www.w3schools.com/js/" },
                { name: "JavaScript.info", url: "https://javascript.info/" },
                { name: "GeeksforGeeks JavaScript", url: "https://www.geeksforgeeks.org/javascript/" }
            ]
        },
        {
            id: "react", title: "Frontend Frameworks (React)", desc: "Build modern single-page applications efficiently.", keywords: ["react", "reactjs", "frontend framework", "jsx"],
            courses: [
                { name: "React Official Docs", url: "https://react.dev/learn" },
                { name: "GeeksforGeeks React", url: "https://www.geeksforgeeks.org/reactjs-tutorials/" },
                { name: "CS50W Web Programming (edX)", url: "https://www.edx.org/learn/web-programming/harvard-university-cs50-s-web-programming-with-python-and-javascript" }
            ]
        },
        { id: "capstone", title: "Capstone Project", desc: "Build an end-to-end project to prove job readiness.", keywords: [], courses: [] }
    ],
    "Full Stack Development": [
        {
            id: "web-dev-basics", title: "Web Basics (HTML/CSS/JS)", desc: "The core building blocks of the web.", keywords: ["html", "css", "javascript"],
            courses: [
                { name: "MDN Web Docs — Getting Started", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web" },
                { name: "W3Schools Web Tutorial", url: "https://www.w3schools.com/" },
                { name: "The Odin Project", url: "https://www.theodinproject.com/paths/foundations" }
            ]
        },
        {
            id: "nodejs", title: "Node.js & Express", desc: "Build backend REST APIs using JavaScript.", keywords: ["node", "express", "backend"],
            courses: [
                { name: "Node.js Crash Course (YouTube)", url: "https://www.youtube.com/watch?v=TlB_eWDSMt4" },
                { name: "GeeksforGeeks Node.js", url: "https://www.geeksforgeeks.org/nodejs/" },
                { name: "W3Schools Node.js", url: "https://www.w3schools.com/nodejs/" }
            ]
        },
        {
            id: "database", title: "Databases (SQL/NoSQL)", desc: "Data modeling, CRUD operations, and querying.", keywords: ["sql", "mysql", "mongodb"],
            courses: [
                { name: "W3Schools SQL Tutorial", url: "https://www.w3schools.com/sql/" },
                { name: "Khan Academy SQL", url: "https://www.khanacademy.org/computing/computer-programming/sql" },
                { name: "MongoDB University (Free)", url: "https://learn.mongodb.com/" }
            ]
        },
        {
            id: "react", title: "Frontend Frameworks (React)", desc: "Build interactive client-side interfaces.", keywords: ["react"],
            courses: [
                { name: "React Official Docs", url: "https://react.dev/learn" },
                { name: "GeeksforGeeks React Tutorial", url: "https://www.geeksforgeeks.org/reactjs-tutorials/" }
            ]
        },
        { id: "capstone", title: "Full Stack Capstone", desc: "Build a full stack MERN or PERN application.", keywords: [], courses: [] }
    ],
    "Backend / APIs": [
        {
            id: "programming-basics", title: "Backend Language (Python/Node)", desc: "Learn a core backend language like Python, Node.js or Java.", keywords: ["python", "nodejs", "java"],
            courses: [
                { name: "W3Schools Python", url: "https://www.w3schools.com/python/" },
                { name: "GeeksforGeeks Python", url: "https://www.geeksforgeeks.org/python-programming-language/" },
                { name: "CS50P — Python (edX)", url: "https://www.edx.org/learn/python/harvard-university-cs50-s-introduction-to-programming-with-python" }
            ]
        },
        {
            id: "api-design", title: "API Design & REST", desc: "Principles of designing stateless APIs.", keywords: ["api", "rest", "http"],
            courses: [
                { name: "MDN HTTP Overview", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" },
                { name: "REST API Concepts (YouTube)", url: "https://www.youtube.com/watch?v=-mN3VyJuCjM" },
                { name: "GeeksforGeeks REST API", url: "https://www.geeksforgeeks.org/rest-api-introduction/" }
            ]
        },
        {
            id: "database", title: "Databases & ORMs", desc: "SQL/NoSQL and connecting to them securely.", keywords: ["sql", "orm", "database"],
            courses: [
                { name: "W3Schools SQL Tutorial", url: "https://www.w3schools.com/sql/" },
                { name: "Khan Academy SQL", url: "https://www.khanacademy.org/computing/computer-programming/sql" }
            ]
        },
        {
            id: "auth", title: "Authentication & Security", desc: "JWT, OAuth, and securing your endpoints.", keywords: ["jwt", "oauth", "security"],
            courses: [
                { name: "MDN Web Security", url: "https://developer.mozilla.org/en-US/docs/Web/Security" },
                { name: "JWT Introduction", url: "https://jwt.io/introduction" },
                { name: "GeeksforGeeks Authentication", url: "https://www.geeksforgeeks.org/authentication-vs-authorization/" }
            ]
        },
        { id: "capstone", title: "Backend Capstone", desc: "Build a secure REST API with authentication and database.", keywords: [], courses: [] }
    ],
    "Data Science": [
        {
            id: "python-data", title: "Python for Data Science", desc: "Master Python fundamentals and syntax.", keywords: ["python"],
            courses: [
                { name: "W3Schools Python", url: "https://www.w3schools.com/python/" },
                { name: "Kaggle Python Course (Free)", url: "https://www.kaggle.com/learn/python" },
                { name: "CS50P Introduction to Python (edX)", url: "https://www.edx.org/learn/python/harvard-university-cs50-s-introduction-to-programming-with-python" }
            ]
        },
        {
            id: "pandas-numpy", title: "Data Manipulation (Pandas & NumPy)", desc: "Clean and manipulate datasets efficiently.", keywords: ["pandas", "numpy", "data manipulation"],
            courses: [
                { name: "Kaggle Pandas (Free)", url: "https://www.kaggle.com/learn/pandas" },
                { name: "W3Schools NumPy", url: "https://www.w3schools.com/python/numpy/" },
                { name: "GeeksforGeeks Pandas", url: "https://www.geeksforgeeks.org/pandas-tutorial/" }
            ]
        },
        {
            id: "data-viz", title: "Data Visualization", desc: "Create insightful charts with Matplotlib/Seaborn.", keywords: ["matplotlib", "seaborn", "visualization"],
            courses: [
                { name: "Kaggle Data Visualization (Free)", url: "https://www.kaggle.com/learn/data-visualization" },
                { name: "W3Schools Matplotlib", url: "https://www.w3schools.com/python/matplotlib_intro.asp" },
                { name: "GeeksforGeeks Matplotlib", url: "https://www.geeksforgeeks.org/matplotlib-tutorial/" }
            ]
        },
        {
            id: "machine-learning", title: "Intro to Machine Learning", desc: "Scikit-learn, regression, and classification.", keywords: ["ml", "scikit-learn", "machine learning"],
            courses: [
                { name: "Google ML Crash Course (Free)", url: "https://developers.google.com/machine-learning/crash-course" },
                { name: "Kaggle ML Intro (Free)", url: "https://www.kaggle.com/learn/intro-to-machine-learning" },
                { name: "Coursera ML (Audit Free)", url: "https://www.coursera.org/learn/machine-learning" }
            ]
        },
        { id: "capstone", title: "Data Science Capstone", desc: "Perform end-to-end data analysis on a real-world dataset.", keywords: [], courses: [] }
    ],
    "NLP / AI": [
        {
            id: "python-data", title: "Python Fundamentals", desc: "Master Python syntax and core features.", keywords: ["python"],
            courses: [
                { name: "W3Schools Python", url: "https://www.w3schools.com/python/" },
                { name: "Kaggle Python (Free)", url: "https://www.kaggle.com/learn/python" },
                { name: "CS50P Python (edX)", url: "https://www.edx.org/learn/python/harvard-university-cs50-s-introduction-to-programming-with-python" }
            ]
        },
        {
            id: "machine-learning", title: "Machine Learning Basics", desc: "Understand foundational ML concepts.", keywords: ["ml", "machine learning"],
            courses: [
                { name: "Fast.ai Practical ML (Free)", url: "https://course.fast.ai/" },
                { name: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" }
            ]
        },
        {
            id: "nlp-fundamentals", title: "NLP Fundamentals", desc: "Text processing, tokenization, and embeddings.", keywords: ["nlp", "text processing", "spacy", "nltk"],
            courses: [
                { name: "HuggingFace NLP Course (Free)", url: "https://huggingface.co/learn/nlp-course/chapter1/1" },
                { name: "GeeksforGeeks NLP Tutorial", url: "https://www.geeksforgeeks.org/natural-language-processing-nlp-tutorial/" }
            ]
        },
        {
            id: "transformers-llms", title: "Transformers & LLMs", desc: "Attention mechanisms, fine-tuning, and prompting.", keywords: ["llm", "transformers", "attention"],
            courses: [
                { name: "Stanford CS224N (Free Lectures)", url: "https://web.stanford.edu/class/cs224n/" },
                { name: "HuggingFace Transformers Docs", url: "https://huggingface.co/docs/transformers" }
            ]
        },
        { id: "capstone", title: "AI Capstone", desc: "Train or fine-tune an AI model for a specific task.", keywords: [], courses: [] }
    ],
    "Cloud / DevOps": [
        {
            id: "linux-bash", title: "Linux & Bash Scripting", desc: "Master the command line.", keywords: ["linux", "bash", "cli"],
            courses: [
                { name: "Linux Crash Course (YouTube)", url: "https://www.youtube.com/watch?v=v_1oa8pu0MQ" },
                { name: "W3Schools Linux Commands", url: "https://www.w3schools.blog/linux-commands" },
                { name: "GeeksforGeeks Linux", url: "https://www.geeksforgeeks.org/linux-tutorial/" }
            ]
        },
        {
            id: "docker", title: "Containerization (Docker)", desc: "Package applications consistently.", keywords: ["docker", "containers"],
            courses: [
                { name: "Docker Official Docs (Free)", url: "https://docs.docker.com/get-started/" },
                { name: "GeeksforGeeks Docker", url: "https://www.geeksforgeeks.org/docker-tutorial/" },
                { name: "Docker Tutorial (YouTube)", url: "https://www.youtube.com/watch?v=pTFZFxd4hOI" }
            ]
        },
        {
            id: "cicd", title: "CI/CD Pipelines", desc: "GitHub Actions or Jenkins for automation.", keywords: ["ci/cd", "github actions", "jenkins"],
            courses: [
                { name: "GitHub Actions Docs (Free)", url: "https://docs.github.com/en/actions" },
                { name: "GitHub Actions Tutorial (YouTube)", url: "https://www.youtube.com/watch?v=R8_veQiYBjI" }
            ]
        },
        {
            id: "cloud-providers", title: "Cloud Platforms (AWS/GCP/Azure)", desc: "Deploying applications to the cloud.", keywords: ["aws", "gcp", "azure", "cloud"],
            courses: [
                { name: "AWS Cloud Practitioner (YouTube)", url: "https://www.youtube.com/watch?v=SOTamWNgDKc" },
                { name: "Google Cloud Free Training", url: "https://cloud.google.com/training/free-labs" },
                { name: "edX Cloud Computing", url: "https://www.edx.org/learn/cloud-computing" }
            ]
        },
        { id: "capstone", title: "DevOps Capstone", desc: "Deploy an automated multi-container app to the cloud.", keywords: [], courses: [] }
    ],
    "UI/UX Design": [
        {
            id: "design-fundamentals", title: "Design Principles", desc: "Color theory, typography, spacing, and visual hierarchy.", keywords: ["design", "color theory", "typography", "ui"],
            courses: [
                { name: "Google UX Design (Coursera, Audit Free)", url: "https://www.coursera.org/professional-certificates/google-ux-design" },
                { name: "Khan Academy Art & Design", url: "https://www.khanacademy.org/humanities/ap-art-history/start-here-apah/introduction-to-methods/a/what-is-art-history" },
                { name: "UI/UX Basics (YouTube)", url: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU" }
            ]
        },
        {
            id: "figma", title: "Figma Mastery", desc: "Components, auto-layout, prototyping, and collaboration.", keywords: ["figma", "prototyping", "wireframing"],
            courses: [
                { name: "Figma Official Tutorials (Free)", url: "https://www.figma.com/resources/learn-design/" },
                { name: "Figma Crash Course (YouTube)", url: "https://www.youtube.com/watch?v=Gu1so3pz4bA" },
                { name: "GeeksforGeeks Figma", url: "https://www.geeksforgeeks.org/figma-tutorial/" }
            ]
        },
        {
            id: "user-research", title: "User Research & Testing", desc: "Personas, wireframes, and usability testing.", keywords: ["ux", "research", "wireframing"],
            courses: [
                { name: "Google UX Design (Coursera, Audit Free)", url: "https://www.coursera.org/professional-certificates/google-ux-design" },
                { name: "edX UX Research", url: "https://www.edx.org/learn/ux-design" }
            ]
        },
        {
            id: "accessibility-design-systems", title: "Accessibility & Design Systems", desc: "WCAG guidelines, inclusive design, and building scalable component libraries.", keywords: ["accessibility", "wcag", "design systems", "components"],
            courses: [
                { name: "web.dev Learn Accessibility (Free)", url: "https://web.dev/learn/accessibility/" },
                { name: "A11y Project", url: "https://www.a11yproject.com/" },
                { name: "Coursera UI/UX Design Specialization", url: "https://www.coursera.org/specializations/ui-ux-design" }
            ]
        },
        { id: "capstone", title: "Design Capstone", desc: "Design a complete app prototype with research backing.", keywords: [], courses: [] }
    ],
    "Mobile Development": [
        {
            id: "mobile-fundamentals", title: "Programming Fundamentals", desc: "JavaScript for React Native or Dart for Flutter.", keywords: ["javascript", "dart", "mobile"],
            courses: [
                { name: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
                { name: "W3Schools JavaScript", url: "https://www.w3schools.com/js/" },
                { name: "JavaScript.info", url: "https://javascript.info/" }
            ]
        },
        {
            id: "react-native-flutter", title: "Cross-Platform Frameworks", desc: "React Native or Flutter basics.", keywords: ["react native", "flutter"],
            courses: [
                { name: "React Native Docs (Free)", url: "https://reactnative.dev/docs/getting-started" },
                { name: "Flutter Official Docs (Free)", url: "https://docs.flutter.dev/" },
                { name: "React Native Crash Course (YouTube)", url: "https://www.youtube.com/watch?v=0-S5a0eXPoc" }
            ]
        },
        {
            id: "mobile-ui", title: "Mobile UI & Navigation", desc: "Stack navigation, tabs, and gestures.", keywords: ["navigation", "mobile ui"],
            courses: [
                { name: "React Navigation Docs (Free)", url: "https://reactnavigation.org/" },
                { name: "GeeksforGeeks React Native", url: "https://www.geeksforgeeks.org/react-native/" }
            ]
        },
        {
            id: "mobile-advanced", title: "Performance & App Store Deployment", desc: "Optimize performance, handle native modules, and publish to Google Play & App Store.", keywords: ["performance", "native modules", "app store", "google play"],
            courses: [
                { name: "Google Play Developer Docs (Free)", url: "https://developer.android.com/distribute" },
                { name: "Apple Developer Documentation (Free)", url: "https://developer.apple.com/documentation/" },
                { name: "React Native Performance (YouTube)", url: "https://www.youtube.com/watch?v=ZgaZrjgEGD8" }
            ]
        },
        { id: "capstone", title: "Mobile Capstone", desc: "Publish a working app to an app store.", keywords: [], courses: [] }
    ],
    "Cybersecurity": [
        {
            id: "networking-basics", title: "Networking & Protocols", desc: "TCP/IP, DNS, HTTP/S, and OSI model.", keywords: ["networking", "tcp", "dns"],
            courses: [
                { name: "Khan Academy Internet & Networking", url: "https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet" },
                { name: "GeeksforGeeks Computer Networks", url: "https://www.geeksforgeeks.org/computer-network-tutorials/" },
                { name: "Network+ Training (YouTube)", url: "https://www.youtube.com/watch?v=qiQR5rTSshw" }
            ]
        },
        {
            id: "security-fundamentals", title: "Security Fundamentals", desc: "Cryptography, hashes, and security postures.", keywords: ["security", "crypto"],
            courses: [
                { name: "CS50 Cybersecurity (edX)", url: "https://www.edx.org/learn/cybersecurity/harvard-university-cs50-s-introduction-to-cybersecurity" },
                { name: "MDN Web Security", url: "https://developer.mozilla.org/en-US/docs/Web/Security" },
                { name: "GeeksforGeeks Cybersecurity", url: "https://www.geeksforgeeks.org/cyber-security-tutorial/" }
            ]
        },
        {
            id: "ethical-hacking", title: "Ethical Hacking", desc: "Penetration testing and vulnerability scanning.", keywords: ["pentesting", "hacking"],
            courses: [
                { name: "TryHackMe — Jr Pentester Path (Free)", url: "https://tryhackme.com/path/outline/jrpenetrationtester" },
                { name: "GeeksforGeeks Ethical Hacking", url: "https://www.geeksforgeeks.org/ethical-hacking-tutorials/" }
            ]
        },
        {
            id: "cyber-advanced", title: "Advanced Threats & Incident Response", desc: "Reverse engineering, exploit development, and incident handling.", keywords: ["reverse engineering", "exploit", "incident response", "ctf"],
            courses: [
                { name: "TryHackMe — Advanced Path (Free)", url: "https://tryhackme.com/paths" },
                { name: "Malware Traffic Analysis (Free)", url: "https://www.malware-traffic-analysis.net/" },
                { name: "SANS Cyber Aces (Free)", url: "https://www.cyberaces.org/" }
            ]
        },
        { id: "capstone", title: "Security Capstone", desc: "Perform and document a penetration test.", keywords: [], courses: [] }
    ],
    "Data Analytics": [
        {
            id: "excel-advanced", title: "Advanced Excel/Spreadsheets", desc: "Pivot tables, VLOOKUP, and macros.", keywords: ["excel", "spreadsheets"],
            courses: [
                { name: "W3Schools Excel Tutorial", url: "https://www.w3schools.com/excel/" },
                { name: "Khan Academy Spreadsheets", url: "https://www.khanacademy.org/computing/computer-programming/spreadsheets" },
                { name: "Excel Tutorial (YouTube)", url: "https://www.youtube.com/watch?v=rwbho0CgEAE" }
            ]
        },
        {
            id: "sql-analytics", title: "SQL for Analytics", desc: "Aggregations, joins, and window functions.", keywords: ["sql", "analytics"],
            courses: [
                { name: "W3Schools SQL Tutorial", url: "https://www.w3schools.com/sql/" },
                { name: "Khan Academy SQL", url: "https://www.khanacademy.org/computing/computer-programming/sql" },
                { name: "GeeksforGeeks SQL", url: "https://www.geeksforgeeks.org/sql-tutorial/" }
            ]
        },
        {
            id: "bi-tools", title: "BI Tools (Tableau/Power BI)", desc: "Creating interactive dashboards.", keywords: ["tableau", "powerbi", "dashboard"],
            courses: [
                { name: "Tableau Public Free Training", url: "https://www.tableau.com/learn/training/20221" },
                { name: "Power BI Tutorial (YouTube)", url: "https://www.youtube.com/watch?v=TmhQCQr_DCA" },
{ name: "edX Data Analysis", url: "https://www.edx.org/learn/data-analysis" }
            ]
        },
        {
            id: "analytics-advanced", title: "Predictive Analytics & Storytelling", desc: "A/B testing, predictive modeling, and presenting insights for business decisions.", keywords: ["predictive modeling", "a/b testing", "storytelling", "analytics"],
            courses: [
                { name: "Kaggle Intro to ML (Free)", url: "https://www.kaggle.com/learn/intro-to-machine-learning" },
                { name: "Google Analytics Academy (Free)", url: "https://analytics.google.com/analytics/academy/" },
                { name: "edX Data Science (Audit Free)", url: "https://www.edx.org/learn/data-science" }
            ]
        },
        { id: "capstone", title: "Analytics Capstone", desc: "Analyze a dataset and present a BI dashboard.", keywords: [], courses: [] }
    ],
    "AI Engineer": [
        {
            id: "python-basics", title: "Python Basics", desc: "Master core Python syntax and structures.", keywords: ["python"],
            courses: [
                { name: "W3Schools Python", url: "https://www.w3schools.com/python/" },
                { name: "Kaggle Python Course (Free)", url: "https://www.kaggle.com/learn/python" }
            ]
        },
        {
            id: "problem-solving", title: "Problem Solving & Logic", desc: "Data structures and algorithms.", keywords: ["algorithms", "dsa", "logic"],
            courses: [
                { name: "LeetCode Crash Course", url: "https://leetcode.com/explore/" },
                { name: "GeeksforGeeks DSA", url: "https://www.geeksforgeeks.org/data-structures/" }
            ]
        },
        {
            id: "machine-learning", title: "Machine Learning", desc: "Supervised and unsupervised learning, Scikit-learn.", keywords: ["ml", "scikit-learn"],
            courses: [
                { name: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
                { name: "Kaggle ML Intro", url: "https://www.kaggle.com/learn/intro-to-machine-learning" }
            ]
        },
        {
            id: "data-analysis", title: "Data Analysis", desc: "Pandas, NumPy, and data wrangling.", keywords: ["pandas", "numpy"],
            courses: [
                { name: "Kaggle Pandas", url: "https://www.kaggle.com/learn/pandas" },
                { name: "W3Schools NumPy", url: "https://www.w3schools.com/python/numpy/" }
            ]
        },
        {
            id: "deep-learning", title: "Deep Learning", desc: "Neural networks, PyTorch, TensorFlow.", keywords: ["deep learning", "pytorch", "tensorflow"],
            courses: [
                { name: "Fast.ai Practical Deep Learning", url: "https://course.fast.ai/" },
                { name: "DeepLearning.AI (Coursera)", url: "https://www.coursera.org/specializations/deep-learning" }
            ]
        },
        {
            id: "mlops", title: "MLOps", desc: "Model deployment, tracking, and lifecycle management.", keywords: ["mlops", "deployment"],
            courses: [
                { name: "MLOps.org", url: "https://ml-ops.org/" },
                { name: "Hugging Face Deployment", url: "https://huggingface.co/docs" }
            ]
        },
        { id: "capstone", title: "Industry Project & Portfolio", desc: "Build an end-to-end AI project and showcase it.", keywords: [], courses: [] }
    ]
};

// Interest → ROADMAP_DATA key mapping
const INTEREST_TO_PATH = {
    'Web Development': 'Web Development',
    'Full Stack Development': 'Full Stack Development',
    'Backend Development': 'Backend / APIs',
    'Backend / APIs': 'Backend / APIs',
    'Data Science': 'Data Science',
    'Machine Learning': 'AI Engineer',
    'AI / Machine Learning': 'NLP / AI',
    'AI / ML': 'NLP / AI',
    'NLP / AI': 'NLP / AI',
    'Cloud / DevOps': 'Cloud / DevOps',
    'UI/UX Design': 'UI/UX Design',
    'Mobile Development': 'Mobile Development',
    'Cybersecurity': 'Cybersecurity',
    'Data Analytics': 'Data Analytics',
    'AI Engineer': 'AI Engineer'
};

document.addEventListener("DOMContentLoaded", () => {
    const accordionContainer = document.getElementById("roadmap-accordion");
    const overallProgressText = document.getElementById("overall-progress-text");
    const overallProgressBar = document.getElementById("overall-progress-bar");
    const topQuizBtn = document.getElementById("top-quiz-btn");
    const headerTitle = document.getElementById("roadmap-header-title");

    // Hide quiz button until roadmap renders
    if (topQuizBtn) topQuizBtn.style.display = 'none';
    
    // Load state — never fall back to a default path
    const targetCareer = localStorage.getItem('xyverra_target_career') || localStorage.getItem('xyverra_selected_path') || '';
    const selectedPath = localStorage.getItem("xyverra_selected_path") || '';

    // If the user has not chosen a path yet, send them to career discovery
    if (!selectedPath && !targetCareer) {
        if (accordionContainer) {
            accordionContainer.innerHTML = `
                <div style="text-align:center; padding: 3rem 2rem;">
                    <div style="font-size:3rem; margin-bottom:1rem;">🧭</div>
                    <h3 style="margin-bottom:0.75rem; color:var(--text-dark);">You haven't picked a career path yet!</h3>
                    <p style="color:var(--text-muted); margin-bottom:1.5rem;">Go through Career Discovery first — we'll help you find the perfect path.</p>
                    <a href="career-discovery.html" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:0.5rem;">
                        <i class="fas fa-compass"></i> Start Career Discovery
                    </a>
                </div>`;
        }
        return;
    }

    // Try exact match first, then interest mapping, then heuristic
    let matchedPathKey = ROADMAP_DATA[selectedPath] ? selectedPath : null;
    if (!matchedPathKey) matchedPathKey = INTEREST_TO_PATH[selectedPath] || INTEREST_TO_PATH[targetCareer];
    if (!matchedPathKey) {
        matchedPathKey = Object.keys(ROADMAP_DATA).find(key =>
            (targetCareer && targetCareer.toLowerCase().includes(key.toLowerCase())) ||
            (selectedPath && key.toLowerCase().includes(selectedPath.toLowerCase().split(' ')[0]))
        );
    }
    // If still no match, tell user to pick a path
    if (!matchedPathKey) {
        if (accordionContainer) {
            accordionContainer.innerHTML = `
                <div style="text-align:center; padding: 3rem 2rem;">
                    <div style="font-size:3rem; margin-bottom:1rem;">⚠️</div>
                    <h3 style="margin-bottom:0.75rem; color:var(--text-dark);">We couldn't match your path</h3>
                    <p style="color:var(--text-muted); margin-bottom:1.5rem;">Please go through Career Discovery to select a valid path.</p>
                    <a href="career-discovery.html" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:0.5rem;">
                        <i class="fas fa-compass"></i> Career Discovery
                    </a>
                </div>`;
        }
        return;
    }

    if (headerTitle) {
        headerTitle.innerText = `${targetCareer || selectedPath} Roadmap`;
    }

    const pathData = ROADMAP_DATA[matchedPathKey];
    if (accordionContainer) accordionContainer.innerHTML = "";

    let completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    let completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '[]');

    // Auto-unlock modules based on assigned userLevel
    const userLevelStr = localStorage.getItem('userLevel') || localStorage.getItem('xyverra_selected_level') || "Beginner";
    let startIdx = 0;
    
    // Most paths have 5 modules: 2 beginner, 2 intermediate, 1 capstone
    // We map levels roughly to these indexes
    if (userLevelStr === "Intermediate") {
        startIdx = 2;
    } else if (userLevelStr === "Advanced") {
        startIdx = 4;
    } else if (userLevelStr === "Capstone") {
        startIdx = pathData.length - 1;
    }

    if (startIdx > 0 && startIdx < pathData.length) {
        let changed = false;
        for (let i = 0; i < startIdx; i++) {
            const m = pathData[i];
            if (m.id !== 'capstone' && !completedModules.includes(m.id)) {
                completedModules.push(m.id);
                changed = true;
            }
        }
        if (changed) {
            localStorage.setItem('completedModules', JSON.stringify(completedModules));
        }
    }

    let visibleModulesData = [];

    // Helper: update overall progress
    const updateOverallProgress = () => {
        if (!visibleModulesData.length) return;
        let cCount = 0;
        visibleModulesData.forEach(m => {
            if (completedModules.includes(m.id)) cCount++;
        });
        const pct = Math.round((cCount / visibleModulesData.length) * 100);
        if (overallProgressText) overallProgressText.innerText = `${pct}%`;
        if (overallProgressBar) overallProgressBar.style.width = `${pct}%`;
    };

    // Helper: Build course ID
    const getCourseId = (moduleId, courseName) => `${moduleId}_${courseName.replace(/\s+/g, '')}`;

    // Helper: Check if a module is considered passed (quiz >= 70% OR pre-completed)
    const isModulePassed = (modId) => {
        if (completedModules.includes(modId)) return true;
        const scores = JSON.parse(localStorage.getItem('moduleQuizPassed') || '{}');
        return (scores[modId] || 0) >= 70;
    };

    // Helper: Render a group
    const renderGroup = (title, modulesToRender, pathStartIndex) => {
        if (!modulesToRender || modulesToRender.length === 0) return;
        
        const groupDiv = document.createElement("div");
        groupDiv.className = "accordion-group";
        
        const groupTitle = document.createElement("div");
        groupTitle.className = "accordion-group-title";
        groupTitle.innerHTML = `<i class="fas fa-layer-group" style="color:var(--primary); font-size:0.9rem;"></i> ${title}`;
        groupDiv.appendChild(groupTitle);

        modulesToRender.forEach((module, localIdx) => {
            const globalIdx = pathStartIndex + localIdx;

            // Lock if previous module hasn't been quiz-passed. The first module (globalIdx 0) is never locked so the user can start.
            let isLocked = false;
            if (globalIdx === 0) {
                isLocked = false;
            } else {
                isLocked = !isModulePassed(pathData[globalIdx - 1].id);
            }

            // Check course completion status
            const totalCourses = module.courses && module.courses.length > 0 ? module.courses.length : 1;
            let completedCount = 0;
            
            if (module.courses && module.courses.length > 0) {
                module.courses.forEach(c => {
                    if (completedCourses.includes(getCourseId(module.id, c.name))) {
                        completedCount++;
                    }
                });
            } else {
                if (completedCourses.includes(getCourseId(module.id, 'dummy_capstone'))) {
                    completedCount++;
                }
            }

            // Auto mark module complete if courses are 100%
            if (completedCount === totalCourses && !completedModules.includes(module.id)) {
                completedModules.push(module.id);
                localStorage.setItem('completedModules', JSON.stringify(completedModules));
            }
            
            const moduleCompleted = completedCount === totalCourses || completedModules.includes(module.id);
            const modulePct = moduleCompleted ? 100 : Math.round((completedCount / totalCourses) * 100);

            const accItem = document.createElement("div");
            accItem.className = `accordion-item ${moduleCompleted ? 'completed' : ''} ${isLocked ? 'module-locked' : ''}`;
            
            accItem.innerHTML = `
                <div class="accordion-header">
                    <div class="accordion-header-left">
                        <i class="fas ${isLocked ? 'fa-lock' : 'fa-chevron-right'} toggle-icon"></i>
                        <h4>${module.title}</h4>
                        ${isLocked ? '<span class="lock-badge">Locked</span>' : ''}
                    </div>
                    <div class="accordion-header-right">
                        <div class="module-progress-wrapper">
                            <div class="progress-bar-container">
                                <div class="progress-bar" style="width: ${modulePct}%; ${moduleCompleted ? 'background: #10B981;' : ''}"></div>
                            </div>
                            <span class="module-progress-text">${modulePct}%</span>
                        </div>
                    </div>
                </div>
                <div class="accordion-content">
                    <div class="accordion-content-inner">
                        ${isLocked ? `
                        <div class="module-locked-overlay">
                            <div class="lock-icon-big">🔒</div>
                            <p>Complete the previous module's quiz with <strong>75% or higher</strong> to unlock this module.</p>
                        </div>` : `
                        <p class="module-desc">${module.desc}</p>
                        <div class="course-list">
                            <!-- courses go here -->
                        </div>
                        <div class="module-quiz-action">
                            <a href="quiz.html?module=${module.id}" class="btn-take-quiz ${moduleCompleted ? 'btn-quiz-passed' : ''}">
                                ${moduleCompleted 
                                    ? '<i class="fas fa-check-circle"></i> Quiz Passed ✓' 
                                    : '<i class="fas fa-bolt"></i> Take Module Quiz'}
                            </a>
                            ${moduleCompleted ? '' : '<span class="quiz-unlock-hint">Score 75%+ to unlock the next module</span>'}
                        </div>`}
                    </div>
                </div>
            `;
            
            // Only add course checkboxes if module is not locked
            if (!isLocked) {
                const courseListContainer = accItem.querySelector('.course-list');
                if (courseListContainer) {
                    const addCourseItem = (cName, cUrl, isDummy = false) => {
                        const cId = getCourseId(module.id, cName);
                        const isChecked = completedCourses.includes(cId) || moduleCompleted;
                        
                        const cItem = document.createElement("label");
                        cItem.className = `course-item ${isChecked ? 'completed' : ''}`;
                        cItem.innerHTML = `
                            <input type="checkbox" class="course-checkbox" value="${cId}" ${isChecked ? 'checked' : ''}>
                            <div class="checkbox-custom">
                                <i class="fas fa-check"></i>
                            </div>
                            <div class="course-details">
                                <h5>${isDummy ? 'Submit ' + module.title : cName}</h5>
                                ${cUrl ? `<a href="study.html?url=${encodeURIComponent(cUrl)}&title=${encodeURIComponent(cName)}" class="course-link">Study In App <i class="fas fa-arrow-right"></i></a>` : ''}
                            </div>
                        `;
                        
                        const checkbox = cItem.querySelector('.course-checkbox');
                        checkbox.addEventListener('change', (e) => {
                            if (e.target.checked) {
                                if (!completedCourses.includes(cId)) completedCourses.push(cId);
                                cItem.classList.add('completed');
                            } else {
                                completedCourses = completedCourses.filter(id => id !== cId);
                                cItem.classList.remove('completed');
                            }
                            localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
                            
                            let currentCount = 0;
                            if (module.courses && module.courses.length > 0) {
                                module.courses.forEach(cx => {
                                    if (completedCourses.includes(getCourseId(module.id, cx.name))) currentCount++;
                                });
                            } else {
                                if (completedCourses.includes(getCourseId(module.id, 'dummy_capstone'))) currentCount++;
                            }
                            
                            const newPct = Math.round((currentCount / totalCourses) * 100);
                            accItem.querySelector('.progress-bar').style.width = `${newPct}%`;
                            accItem.querySelector('.module-progress-text').innerText = `${newPct}%`;
                            
                            if (currentCount === totalCourses) {
                                if (!completedModules.includes(module.id)) {
                                    completedModules.push(module.id);
                                    localStorage.setItem('completedModules', JSON.stringify(completedModules));
                                    
                                    // Trigger Quiz Popup
                                    const modal = document.getElementById('quiz-popup-modal');
                                    const titleEl = document.getElementById('completed-module-title');
                                    const takeBtn = document.getElementById('take-compulsory-quiz-btn');
                                    const closeBtn = document.getElementById('close-quiz-popup-btn');
                                    if (modal && titleEl && takeBtn) {
                                        titleEl.textContent = module.title;
                                        takeBtn.href = `quiz.html?module=${module.id}`;
                                        modal.style.display = 'flex';
                                        if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
                                    }
                                }
                                accItem.classList.add('completed');
                                accItem.querySelector('.progress-bar').style.background = '#10B981';
                            } else {
                                completedModules = completedModules.filter(id => id !== module.id);
                                localStorage.setItem('completedModules', JSON.stringify(completedModules));
                                accItem.classList.remove('completed');
                                accItem.querySelector('.progress-bar').style.background = 'var(--primary)';
                            }
                            
                            updateOverallProgress();
                        });
                        
                        courseListContainer.appendChild(cItem);
                    };

                    if (module.courses && module.courses.length > 0) {
                        module.courses.forEach(c => addCourseItem(c.name, c.url));
                    } else {
                        addCourseItem('dummy_capstone', null, true);
                    }
                }
            }
            
            const header = accItem.querySelector('.accordion-header');
            const content = accItem.querySelector('.accordion-content');
            header.addEventListener('click', () => {
                if (isLocked) return; // Don't expand locked modules
                const isActiveNow = accItem.classList.contains('active');
                document.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                });
                
                if (!isActiveNow) {
                    accItem.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });

            groupDiv.appendChild(accItem);
        });
        
        if (accordionContainer) accordionContainer.appendChild(groupDiv);
    };

    const beginnerModules = pathData.slice(0, 2);
    const intermediateModules = pathData.slice(2, 4);
    const advancedModules = pathData.slice(4);

    const quizLevel = localStorage.getItem('quizResultLevel');
    const quizScore = localStorage.getItem('quizResultScore');

    if (quizLevel) {
        const resultBanner = document.getElementById('quiz-result-banner');
        if (resultBanner) {
            resultBanner.style.display = 'block';
            const scoreEl = document.getElementById('quiz-score-display');
            const levelEl = document.getElementById('quiz-level-display');
            if (scoreEl) scoreEl.textContent = quizScore;
            if (levelEl) levelEl.textContent = quizLevel;
        }
    }

    // Update side panel target path
    const sideTargetPath = document.getElementById('side-target-path');
    if (sideTargetPath) sideTargetPath.textContent = targetCareer;

    // Render all groups (they will be locked automatically if prior modules aren't completed)
    renderGroup("🌱 Beginner",     beginnerModules,     0);
    renderGroup("⚡ Intermediate", intermediateModules, 2);
    renderGroup("🚀 Advanced",     advancedModules,     4);

    visibleModulesData.push(...beginnerModules, ...intermediateModules, ...advancedModules);

    updateOverallProgress();

    // Mark roadmap as generated and show quiz button
    localStorage.setItem('roadmapGenerated', 'true');
    if (topQuizBtn) {
        topQuizBtn.style.display = 'inline-flex';
        topQuizBtn.style.animation = 'fadeInUp 0.5s ease forwards';
    }

    setTimeout(() => {
        const allItems = document.querySelectorAll('.accordion-item');
        let expanded = false;
        allItems.forEach(item => {
            if (!item.classList.contains('completed') && !expanded) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + "px";
                expanded = true;
            }
        });
        if (!expanded && allItems.length > 0) {
            const lastItem = allItems[allItems.length - 1];
            lastItem.classList.add('active');
            const content = lastItem.querySelector('.accordion-content');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }, 100);

    if (typeof LocalStorageState !== 'undefined' && LocalStorageState.isMandatoryQuizPending()) {
        if (typeof QuizLockManager !== 'undefined') {
            QuizLockManager.applyRoadmapOverlay();
            QuizLockManager.disableNavigation();
        }
    }
});