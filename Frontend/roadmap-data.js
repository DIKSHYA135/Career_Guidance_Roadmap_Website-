const ROADMAP_DATA = {
    "Web Development": [
        {
            id: "web_mod1", title: "Module 1: The Foundations of the Web", desc: "Learn how the internet works and build your first pages with HTML5 and CSS3.", keywords: ["html", "html5", "css", "css3", "web basics"],
            courses: [
                { name: "How the Internet Works", url: "study.html?url=Courses/Web_Development/Module_1_Lesson_1.md&title=How the Internet Works" },
                { name: "Introduction to HTML5", url: "study.html?url=Courses/Web_Development/Module_1_Lesson_2.md&title=Introduction to HTML5" },
                { name: "Introduction to CSS3", url: "study.html?url=Courses/Web_Development/Module_1_Lesson_3.md&title=Introduction to CSS3" }
            ]
        },
        {
            id: "web_mod2", title: "Module 2: Building Responsive Layouts", desc: "Master the CSS Box Model, Flexbox, and CSS Grid to create mobile-friendly layouts.", keywords: ["css", "flexbox", "grid", "responsive"],
            courses: [
                { name: "The CSS Box Model", url: "study.html?url=Courses/Web_Development/Module_2_Lesson_1.md&title=The CSS Box Model" },
                { name: "Flexbox Essentials", url: "study.html?url=Courses/Web_Development/Module_2_Lesson_2.md&title=Flexbox Essentials" },
                { name: "CSS Grid & Responsive Design", url: "study.html?url=Courses/Web_Development/Module_2_Lesson_3.md&title=CSS Grid & Responsive Design" }
            ]
        },
        {
            id: "web_mod3", title: "Module 3: Programming with JavaScript", desc: "Learn core programming concepts including variables, loops, functions, and data structures.", keywords: ["javascript", "js", "programming", "logic"],
            courses: [
                { name: "JavaScript Basics", url: "study.html?url=Courses/Web_Development/Module_3_Lesson_1.md&title=JavaScript Basics" },
                { name: "Control Flow and Functions", url: "study.html?url=Courses/Web_Development/Module_3_Lesson_2.md&title=Control Flow and Functions" },
                { name: "Arrays and Objects", url: "study.html?url=Courses/Web_Development/Module_3_Lesson_3.md&title=Arrays and Objects" }
            ]
        },
        {
            id: "web_mod4", title: "Module 4: Interactive Web Pages (The DOM)", desc: "Use JavaScript to select elements, listen for events, and validate user forms.", keywords: ["dom", "events", "validation", "interactive"],
            courses: [
                { name: "Introduction to the DOM", url: "study.html?url=Courses/Web_Development/Module_4_Lesson_1.md&title=Introduction to the DOM" },
                { name: "Event Listeners & Interaction", url: "study.html?url=Courses/Web_Development/Module_4_Lesson_2.md&title=Event Listeners" },
                { name: "Form Validation", url: "study.html?url=Courses/Web_Development/Module_4_Lesson_3.md&title=Form Validation" }
            ]
        },
        {
            id: "web_mod5", title: "Module 5: Modern JavaScript & APIs", desc: "Upgrade to ES6+, handle asynchronous code, and fetch live data from REST APIs.", keywords: ["es6", "async", "await", "api", "fetch"],
            courses: [
                { name: "ES6+ Features", url: "study.html?url=Courses/Web_Development/Module_5_Lesson_1.md&title=ES6+ Features" },
                { name: "Promises & Async/Await", url: "study.html?url=Courses/Web_Development/Module_5_Lesson_2.md&title=Promises & Async/Await" },
                { name: "Fetching API Data", url: "study.html?url=Courses/Web_Development/Module_5_Lesson_3.md&title=Fetching API Data" }
            ]
        },
        {
            id: "web_mod6", title: "Module 6: Deployment & Career Readiness", desc: "Manage code with Git, host on Vercel/Netlify, and prepare your portfolio.", keywords: ["git", "github", "deployment", "portfolio"],
            courses: [
                { name: "Version Control with Git", url: "study.html?url=Courses/Web_Development/Module_6_Lesson_1.md&title=Version Control with Git" },
                { name: "Hosting Your Website", url: "study.html?url=Courses/Web_Development/Module_6_Lesson_2.md&title=Hosting Your Website" },
                { name: "Portfolio & Interviews", url: "study.html?url=Courses/Web_Development/Module_6_Lesson_3.md&title=Portfolio & Interviews" }
            ]
        }
    ],
    "Full Stack Development": [
        {
            id: "fs_mod1", title: "Module 1: Web Basics Review", desc: "A fast-paced review of HTML, CSS, and Client-side JS.", keywords: ["html", "css", "javascript"],
            courses: [
                { name: "HTML & CSS Structure", url: "study.html?url=Courses/Full_Stack_Development/Module_1_Lesson_1.md&title=HTML & CSS Structure" },
                { name: "JavaScript Fundamentals", url: "study.html?url=Courses/Full_Stack_Development/Module_1_Lesson_2.md&title=JavaScript Fundamentals" },
                { name: "DOM Manipulation Review", url: "study.html?url=Courses/Full_Stack_Development/Module_1_Lesson_3.md&title=DOM Manipulation Review" }
            ]
        },
        {
            id: "fs_mod2", title: "Module 2: Intro to Backend & Node.js", desc: "Running JavaScript on the server, built-in modules, npm.", keywords: ["node", "backend", "npm"],
            courses: [
                { name: "Introduction to Node.js", url: "study.html?url=Courses/Full_Stack_Development/Module_2_Lesson_1.md&title=Introduction to Node.js" },
                { name: "NPM & Package Management", url: "study.html?url=Courses/Full_Stack_Development/Module_2_Lesson_2.md&title=NPM & Package Management" },
                { name: "Building a Simple Web Server", url: "study.html?url=Courses/Full_Stack_Development/Module_2_Lesson_3.md&title=Building a Simple Web Server" }
            ]
        },
        {
            id: "fs_mod3", title: "Module 3: Databases (SQL/NoSQL)", desc: "Data modeling, MongoDB, and PostgreSQL basics.", keywords: ["sql", "mysql", "mongodb"],
            courses: [
                { name: "Relational Databases (SQL)", url: "study.html?url=Courses/Full_Stack_Development/Module_3_Lesson_1.md&title=Relational Databases (SQL)" },
                { name: "NoSQL Databases (MongoDB)", url: "study.html?url=Courses/Full_Stack_Development/Module_3_Lesson_2.md&title=NoSQL Databases (MongoDB)" },
                { name: "Connecting Databases to Node", url: "study.html?url=Courses/Full_Stack_Development/Module_3_Lesson_3.md&title=Connecting Databases to Node" }
            ]
        },
        {
            id: "fs_mod4", title: "Module 4: RESTful APIs & Express.js", desc: "Routing, middleware, handling requests/responses.", keywords: ["express", "api", "rest"],
            courses: [
                { name: "Introduction to Express.js", url: "study.html?url=Courses/Full_Stack_Development/Module_4_Lesson_1.md&title=Introduction to Express.js" },
                { name: "Building RESTful Routes", url: "study.html?url=Courses/Full_Stack_Development/Module_4_Lesson_2.md&title=Building RESTful Routes" },
                { name: "Middleware & Error Handling", url: "study.html?url=Courses/Full_Stack_Development/Module_4_Lesson_3.md&title=Middleware & Error Handling" }
            ]
        },
        {
            id: "fs_mod5", title: "Module 5: Frontend Frameworks (React)", desc: "Components, State, Hooks, fetching from APIs.", keywords: ["react", "frontend"],
            courses: [
                { name: "React Components & JSX", url: "study.html?url=Courses/Full_Stack_Development/Module_5_Lesson_1.md&title=React Components & JSX" },
                { name: "State & Hooks", url: "study.html?url=Courses/Full_Stack_Development/Module_5_Lesson_2.md&title=State & Hooks" },
                { name: "Connecting React to APIs", url: "study.html?url=Courses/Full_Stack_Development/Module_5_Lesson_3.md&title=Connecting React to APIs" }
            ]
        },
        {
            id: "fs_mod6", title: "Module 6: Capstone & Deployment", desc: "Connecting React to Express, authentication basics, and deployment.", keywords: ["deployment", "mern"],
            courses: [
                { name: "Full Stack Authentication", url: "study.html?url=Courses/Full_Stack_Development/Module_6_Lesson_1.md&title=Full Stack Authentication" },
                { name: "The MERN Stack Architecture", url: "study.html?url=Courses/Full_Stack_Development/Module_6_Lesson_2.md&title=The MERN Stack Architecture" },
                { name: "Deploying Full Stack Apps", url: "study.html?url=Courses/Full_Stack_Development/Module_6_Lesson_3.md&title=Deploying Full Stack Apps" }
            ]
        }
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
    "Machine Learning": [
        {
            id: "python-data", title: "Python for Data Science", desc: "NumPy, Pandas, Matplotlib — the essential data science stack.", keywords: ["python", "numpy", "pandas", "matplotlib"],
            courses: [
                { name: "Kaggle Python Course (Free)", url: "https://www.kaggle.com/learn/python" },
                { name: "W3Schools Python", url: "https://www.w3schools.com/python/" },
                { name: "CS50P — Python (edX)", url: "https://www.edx.org/learn/python/harvard-university-cs50-s-introduction-to-programming-with-python" }
            ]
        },
        {
            id: "pandas-numpy", title: "Data Manipulation", desc: "Clean and manipulate datasets efficiently with Pandas.", keywords: ["pandas", "numpy", "data manipulation"],
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
            id: "machine-learning", title: "Machine Learning", desc: "Supervised vs unsupervised learning, model evaluation, and Scikit-learn.", keywords: ["supervised", "unsupervised", "regression", "classification", "scikit-learn"],
            courses: [
                { name: "Kaggle Intro to ML (Free)", url: "https://www.kaggle.com/learn/intro-to-machine-learning" },
                { name: "Google ML Crash Course (Free)", url: "https://developers.google.com/machine-learning/crash-course" },
                { name: "Coursera ML (Audit Free)", url: "https://www.coursera.org/learn/machine-learning" }
            ]
        },
        { id: "capstone", title: "ML Capstone Project", desc: "Build, train, and deploy an end-to-end ML model on a real dataset.", keywords: [], courses: [] }
    ]
};

// ── Canonical path resolver ──────────────────────────────────────────────
// Single source of truth for turning a stored `selectedPath` value into a
// real ROADMAP_DATA key. Used by roadmap.js, progress.js, and dashboard.js so
// all three pages always agree on the same roadmap for the same user —
// previously each page had its own separate (and inconsistent) matching
// logic, which is how a user could see the Web Development roadmap on one
// page and the correct one on another for the exact same selected path.
//
// Also covers legacy/aliased labels (e.g. "Backend Development" was used by
// an earlier version of the Career Discovery flow before it was corrected to
// "Backend / APIs") so users who already have an old label saved are fixed
// immediately, without needing to redo Career Discovery.
window.resolveRoadmapPathKey = function(selectedPath) {
    if (!selectedPath) return "Web Development";
    if (ROADMAP_DATA[selectedPath]) return selectedPath;

    const p = selectedPath.toLowerCase();
    const ALIASES = [
        { test: p => p.includes('full stack') || p.includes('fullstack'), key: "Full Stack Development" },
        { test: p => p.includes('backend') || p.includes('back-end') || p.includes('api'), key: "Backend / APIs" },
        { test: p => p.includes('machine learning') || /\bml\b/.test(p), key: "Machine Learning" },
        { test: p => p.includes('nlp') || p.includes('natural language') || /\bai\b/.test(p), key: "NLP / AI" },
        { test: p => p.includes('data science'), key: "Data Science" },
        { test: p => p.includes('data analytics') || p.includes('analytics'), key: "Data Analytics" },
        { test: p => p.includes('cloud') || p.includes('devops'), key: "Cloud / DevOps" },
        { test: p => p.includes('cyber') || p.includes('security'), key: "Cybersecurity" },
        { test: p => p.includes('ui') || p.includes('ux') || p.includes('design'), key: "UI/UX Design" },
        { test: p => p.includes('mobile'), key: "Mobile Development" },
        { test: p => p.includes('web'), key: "Web Development" },
    ];
    const matched = ALIASES.find(a => a.test(p));
    if (matched && ROADMAP_DATA[matched.key]) return matched.key;

    // Last-resort fuzzy match in both directions
    const found = Object.keys(ROADMAP_DATA).find(key =>
        p.includes(key.toLowerCase()) || key.toLowerCase().includes(p.split(' ')[0])
    );
    return found || "Web Development";
};

// ── Resolve a raw module id (e.g. "web_mod4", "ux_mod2", "html") to its
// human-readable title. Used anywhere a moduleId is shown to a user or admin
// (Dashboard activity timeline, Admin Panel quiz attempts) instead of the raw
// internal id. Searches ROADMAP_DATA first, then falls back to the legacy
// MODULES_DATA structure (app-data.js) if it happens to be loaded on the page.
window.resolveModuleTitle = function(moduleId) {
    if (!moduleId || typeof moduleId !== 'string') return moduleId;

    for (const modules of Object.values(ROADMAP_DATA)) {
        const match = modules.find(m => m.id === moduleId);
        if (match) return match.title;
    }

    if (typeof MODULES_DATA !== 'undefined') {
        for (const levels of Object.values(MODULES_DATA)) {
            for (const modules of Object.values(levels)) {
                const match = modules.find(m => m.id === moduleId);
                if (match) return match.title;
            }
        }
    }

    return moduleId;
};