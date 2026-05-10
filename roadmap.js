const ROADMAP_DATA = {
    "Web Development": [
        {
            id: "html", title: "HTML Fundamentals", desc: "Master semantic elements, forms, and basic SEO principles.", keywords: ["html", "html5", "markup", "web fundamentals"],
            courses: [
                { name: "W3Schools HTML", url: "https://www.w3schools.com/html/" },
                { name: "freeCodeCamp HTML", url: "https://www.freecodecamp.org/learn/responsive-web-design/" }
            ]
        },
        {
            id: "css", title: "CSS & Responsive Design", desc: "Flexbox, Grid, and making layouts work on all devices.", keywords: ["css", "css3", "flexbox", "grid", "responsive", "styling"],
            courses: [
                { name: "W3Schools CSS", url: "https://www.w3schools.com/css/" },
                { name: "Kevin Powell CSS", url: "https://www.youtube.com/@KevinPowell" }
            ]
        },
        {
            id: "js", title: "JavaScript Essentials", desc: "Functions, DOM manipulation, and basic application logic.", keywords: ["javascript", "js", "es6", "dom"],
            courses: [
                { name: "MDN JS Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
                { name: "freeCodeCamp JS", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/" }
            ]
        },
        {
            id: "react", title: "Frontend Frameworks (React)", desc: "Build modern single-page applications efficiently.", keywords: ["react", "reactjs", "frontend framework", "jsx"],
            courses: [
                { name: "React Official Docs", url: "https://react.dev/learn" },
                { name: "YouTube React Course", url: "https://www.youtube.com/watch?v=bMknfKXIFA8" }
            ]
        },
        { id: "capstone", title: "Capstone Project", desc: "Build an end-to-end project to prove job readiness.", keywords: [], courses: [] }
    ],
    "Full Stack Development": [
        {
            id: "web-dev-basics", title: "Web Basics (HTML/CSS/JS)", desc: "The core building blocks of the web.", keywords: ["html", "css", "javascript"],
            courses: [{ name: "freeCodeCamp Web Design", url: "https://www.freecodecamp.org/" }]
        },
        {
            id: "nodejs", title: "Node.js & Express", desc: "Build backend REST APIs using JavaScript.", keywords: ["node", "express", "backend"],
            courses: [{ name: "Node.js Crash Course", url: "https://www.youtube.com/watch?v=TlB_eWDSMt4" }]
        },
        {
            id: "database", title: "Databases (SQL/NoSQL)", desc: "Data modeling, CRUD operations, and querying.", keywords: ["sql", "mysql", "mongodb"],
            courses: [{ name: "W3Schools SQL", url: "https://www.w3schools.com/sql/" }, { name: "MongoDB University", url: "https://learn.mongodb.com/" }]
        },
        {
            id: "react", title: "Frontend Frameworks (React)", desc: "Build interactive client-side interfaces.", keywords: ["react"],
            courses: [{ name: "React Official Docs", url: "https://react.dev/learn" }]
        },
        { id: "capstone", title: "Full Stack Capstone", desc: "Build a full stack MERN or PERN application.", keywords: [], courses: [] }
    ],
    "Backend / APIs": [
        {
            id: "programming-basics", title: "Backend Language (Python/Node)", desc: "Learn a core backend language like Python, Node.js or Java.", keywords: ["python", "nodejs", "java"],
            courses: [{ name: "Python for Beginners", url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc" }]
        },
        {
            id: "api-design", title: "API Design & REST", desc: "Principles of designing stateless APIs.", keywords: ["api", "rest", "http"],
            courses: [{ name: "REST API Concepts", url: "https://www.youtube.com/watch?v=-mN3VyJuCjM" }]
        },
        {
            id: "database", title: "Databases & ORMs", desc: "SQL/NoSQL and connecting to them securely.", keywords: ["sql", "orm", "database"],
            courses: [{ name: "SQL Tutorial", url: "https://www.w3schools.com/sql/" }]
        },
        {
            id: "auth", title: "Authentication & Security", desc: "JWT, OAuth, and securing your endpoints.", keywords: ["jwt", "oauth", "security"],
            courses: [{ name: "JWT Crash Course", url: "https://www.youtube.com/watch?v=mbsmsiPbO33" }]
        },
        { id: "capstone", title: "Backend Capstone", desc: "Build a secure REST API with authentication and database.", keywords: [], courses: [] }
    ],
    "Data Science": [
        {
            id: "python-data", title: "Python for Data Science", desc: "Master Python fundamentals and syntax.", keywords: ["python"],
            courses: [{ name: "Python for Beginners", url: "https://www.youtube.com/watch?v=rfscVS0vtbw" }]
        },
        {
            id: "pandas-numpy", title: "Data Manipulation (Pandas & NumPy)", desc: "Clean and manipulate datasets efficiently.", keywords: ["pandas", "numpy", "data manipulation"],
            courses: [{ name: "Kaggle Pandas", url: "https://www.kaggle.com/learn/pandas" }]
        },
        {
            id: "data-viz", title: "Data Visualization", desc: "Create insightful charts with Matplotlib/Seaborn.", keywords: ["matplotlib", "seaborn", "visualization"],
            courses: [{ name: "Kaggle Data Viz", url: "https://www.kaggle.com/learn/data-visualization" }]
        },
        {
            id: "machine-learning", title: "Intro to Machine Learning", desc: "Scikit-learn, regression, and classification.", keywords: ["ml", "scikit-learn", "machine learning"],
            courses: [{ name: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" }]
        },
        { id: "capstone", title: "Data Science Capstone", desc: "Perform end-to-end data analysis on a real-world dataset.", keywords: [], courses: [] }
    ],
    "NLP / AI": [
        {
            id: "python-data", title: "Python Fundamentals", desc: "Master Python syntax and core features.", keywords: ["python"],
            courses: [{ name: "freeCodeCamp Python", url: "https://www.youtube.com/watch?v=rfscVS0vtbw" }]
        },
        {
            id: "machine-learning", title: "Machine Learning Basics", desc: "Understand foundational ML concepts.", keywords: ["ml", "machine learning"],
            courses: [{ name: "Fast.ai ML", url: "https://course.fast.ai/" }]
        },
        {
            id: "nlp-fundamentals", title: "NLP Fundamentals", desc: "Text processing, tokenization, and embeddings.", keywords: ["nlp", "text processing", "spacy", "nltk"],
            courses: [{ name: "HuggingFace NLP Course", url: "https://huggingface.co/learn/nlp-course/chapter1/1" }]
        },
        {
            id: "transformers-llms", title: "Transformers & LLMs", desc: "Attention mechanisms, fine-tuning, and prompting.", keywords: ["llm", "transformers", "attention"],
            courses: [{ name: "Stanford CS224N", url: "https://web.stanford.edu/class/cs224n/" }]
        },
        { id: "capstone", title: "AI Capstone", desc: "Train or fine-tune an AI model for a specific task.", keywords: [], courses: [] }
    ],
    "Cloud / DevOps": [
        {
            id: "linux-bash", title: "Linux & Bash Scripting", desc: "Master the command line.", keywords: ["linux", "bash", "cli"],
            courses: [{ name: "Linux Crash Course", url: "https://www.youtube.com/watch?v=v_1oa8pu0MQ" }]
        },
        {
            id: "docker", title: "Containerization (Docker)", desc: "Package applications consistently.", keywords: ["docker", "containers"],
            courses: [{ name: "Docker Tutorial", url: "https://www.youtube.com/watch?v=pTFZFxd4hOI" }]
        },
        {
            id: "cicd", title: "CI/CD Pipelines", desc: "GitHub Actions or Jenkins for automation.", keywords: ["ci/cd", "github actions", "jenkins"],
            courses: [{ name: "GitHub Actions Tutorial", url: "https://www.youtube.com/watch?v=R8_veQiYBjI" }]
        },
        {
            id: "cloud-providers", title: "Cloud Platforms (AWS/GCP/Azure)", desc: "Deploying applications to the cloud.", keywords: ["aws", "gcp", "azure", "cloud"],
            courses: [{ name: "AWS Cloud Practitioner", url: "https://www.youtube.com/watch?v=SOTamWNgDKc" }]
        },
        { id: "capstone", title: "DevOps Capstone", desc: "Deploy an automated multi-container app to the cloud.", keywords: [], courses: [] }
    ],
    "UI/UX Design": [
        {
            id: "design-fundamentals", title: "Design Principles", desc: "Color theory, typography, spacing, and visual hierarchy.", keywords: ["design", "color theory", "typography", "ui"],
            courses: [
                { name: "Coursera UI/UX", url: "https://www.coursera.org/specializations/ui-ux-design" },
                { name: "YouTube UI/UX Basics", url: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU" }
            ]
        },
        {
            id: "figma", title: "Figma Mastery", desc: "Components, auto-layout, prototyping, and collaboration.", keywords: ["figma", "prototyping", "wireframing"],
            courses: [
                { name: "Figma Learn", url: "https://help.figma.com/hc/en-us" },
                { name: "YouTube Figma Course", url: "https://www.youtube.com/watch?v=Gu1so3pz4bA" }
            ]
        },
        {
            id: "user-research", title: "User Research & Testing", desc: "Personas, wireframes, and usability testing.", keywords: ["ux", "research", "wireframing"],
            courses: [{ name: "Google UX Design", url: "https://www.coursera.org/professional-certificates/google-ux-design" }]
        },
        { id: "capstone", title: "Design Capstone", desc: "Design a complete app prototype with research backing.", keywords: [], courses: [] }
    ],
    "Mobile Development": [
        {
            id: "mobile-fundamentals", title: "Programming Fundamentals", desc: "JavaScript for React Native or Dart for Flutter.", keywords: ["javascript", "dart", "mobile"],
            courses: [{ name: "freeCodeCamp JS", url: "https://www.freecodecamp.org/" }]
        },
        {
            id: "react-native-flutter", title: "Cross-Platform Frameworks", desc: "React Native or Flutter basics.", keywords: ["react native", "flutter"],
            courses: [{ name: "React Native Crash Course", url: "https://www.youtube.com/watch?v=0-S5a0eXPoc" }]
        },
        {
            id: "mobile-ui", title: "Mobile UI & Navigation", desc: "Stack navigation, tabs, and gestures.", keywords: ["navigation", "mobile ui"],
            courses: [{ name: "React Navigation Docs", url: "https://reactnavigation.org/" }]
        },
        { id: "capstone", title: "Mobile Capstone", desc: "Publish a working app to an app store.", keywords: [], courses: [] }
    ],
    "Cybersecurity": [
        {
            id: "networking-basics", title: "Networking & Protocols", desc: "TCP/IP, DNS, HTTP/S, and OSI model.", keywords: ["networking", "tcp", "dns"],
            courses: [{ name: "Network+ Training", url: "https://www.youtube.com/watch?v=qiQR5rTSshw" }]
        },
        {
            id: "security-fundamentals", title: "Security Fundamentals", desc: "Cryptography, hashes, and security postures.", keywords: ["security", "crypto"],
            courses: [{ name: "Security+ Training", url: "https://www.youtube.com/watch?v=9sgZGvJ22E8" }]
        },
        {
            id: "ethical-hacking", title: "Ethical Hacking", desc: "Penetration testing and vulnerability scanning.", keywords: ["pentesting", "hacking"],
            courses: [{ name: "freeCodeCamp Ethical Hacking", url: "https://www.youtube.com/watch?v=3Kq1MIfTWCE" }]
        },
        { id: "capstone", title: "Security Capstone", desc: "Perform and document a penetration test.", keywords: [], courses: [] }
    ],
    "Data Analytics": [
        {
            id: "excel-advanced", title: "Advanced Excel/Spreadsheets", desc: "Pivot tables, VLOOKUP, and macros.", keywords: ["excel", "spreadsheets"],
            courses: [{ name: "Excel Tutorial", url: "https://www.youtube.com/watch?v=rwbho0CgEAE" }]
        },
        {
            id: "sql-analytics", title: "SQL for Analytics", desc: "Aggregations, joins, and window functions.", keywords: ["sql", "analytics"],
            courses: [{ name: "SQL for Data Analysis", url: "https://www.udacity.com/course/sql-for-data-analysis--ud198" }]
        },
        {
            id: "bi-tools", title: "BI Tools (Tableau/Power BI)", desc: "Creating interactive dashboards.", keywords: ["tableau", "powerbi", "dashboard"],
            courses: [{ name: "Power BI Tutorial", url: "https://www.youtube.com/watch?v=TmhQCQr_DCA" }]
        },
        { id: "capstone", title: "Analytics Capstone", desc: "Analyze a dataset and present a BI dashboard.", keywords: [], courses: [] }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    const timelineContainer = document.getElementById("roadmap-timeline");
    const topQuizBtn = document.getElementById("top-quiz-btn");
    const headerTitle = document.getElementById("roadmap-header-title");
    
    // Load state
    const selectedPath = localStorage.getItem("xyverra_selected_path") || "Web Development";
    const userLevel = localStorage.getItem("userLevel") || "Beginner";
    
    // Fallback logic for path selection text mismatch (if any)
    let matchedPathKey = selectedPath;
    if (!ROADMAP_DATA[matchedPathKey]) {
        // Find closest match or default to Frontend
        matchedPathKey = Object.keys(ROADMAP_DATA).find(key => selectedPath.includes(key)) || "Web Development";
    }
    
    let userSkills = [];
    try {
        const storedSkills = localStorage.getItem("userSkills");
        if (storedSkills) {
            userSkills = JSON.parse(storedSkills).map(s => s.toLowerCase().trim());
        }
    } catch (e) {
        console.error("Error parsing user skills");
    }

    if (headerTitle) {
        headerTitle.innerText = `${matchedPathKey} Roadmap`;
    }

    const pathData = ROADMAP_DATA[matchedPathKey];
    if (timelineContainer) timelineContainer.innerHTML = ""; // Clear existing nodes
    
    let currentModuleFound = false;
    let completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');

    pathData.forEach((module, index) => {
        const isCapstone = module.id === 'capstone';
        let isCompleted = completedModules.includes(module.id);

        let statusClass = "locked";
        let statusText = "Locked";
        
        if (isCompleted) {
            statusClass = "completed";
            statusText = "Completed";
        } else if (!currentModuleFound && !isCapstone) {
            statusClass = "active";
            statusText = "Current Module";
            currentModuleFound = true;
            
            // Set top quiz button URL to this module
            if (topQuizBtn) {
                topQuizBtn.href = `quiz.html?module=${module.id}`;
                topQuizBtn.style.display = "inline-flex"; // Show it
            }
        } else if (isCapstone && !currentModuleFound) {
            // If all previous were skipped/completed, capstone is current
            statusClass = "active";
            statusText = "Current Module";
            currentModuleFound = true;
        } else if (isCapstone) {
            statusClass = "locked capstone";
            statusText = "Requires previous completion";
        }

        // Render HTML for node
        const itemDiv = document.createElement("div");
        itemDiv.className = `timeline-item ${statusClass}`;
        
        let coursesHTML = "";
        if (module.courses && module.courses.length > 0) {
            coursesHTML = `<div class="course-suggestions" style="margin-top: 10px; font-size: 0.9em;">
                <strong>Recommended Free Resources:</strong>
                <ul style="list-style-type: none; padding-left: 0; margin-top: 5px;">
                    ${module.courses.map(course => 
                        `<li style="margin-bottom: 3px;">
                            <i class="fas fa-external-link-alt" style="color: #4F46E5; font-size: 0.8em; margin-right: 5px;"></i>
                            <a href="${course.url}" target="_blank" style="color: #4F46E5; text-decoration: none;">${course.name}</a>
                        </li>`
                    ).join('')}
                </ul>
            </div>`;
        }

        let actionBtnHTML = "";
        if (statusClass === "active" && !isCapstone) {
            actionBtnHTML = `<a href="quiz.html?module=${module.id}" class="btn btn-outline" style="margin-top: 15px; font-size: 0.85em; padding: 6px 12px; display: inline-block;">Take Module Quiz</a>`;
        }

        itemDiv.innerHTML = `
            <div class="timeline-content">
                <h4>${module.title}</h4>
                <p>${module.desc}</p>
                ${statusClass !== "completed" && statusClass !== "locked" && statusClass !== "locked capstone" ? coursesHTML : ""}
                ${actionBtnHTML}
                <span class="timeline-pill ${statusClass === 'active' ? 'current' : ''}">${statusText}</span>
            </div>
        `;
        
        if (timelineContainer) timelineContainer.appendChild(itemDiv);
    });

    if (!currentModuleFound && topQuizBtn) {
        topQuizBtn.style.display = "none";
    }
});
