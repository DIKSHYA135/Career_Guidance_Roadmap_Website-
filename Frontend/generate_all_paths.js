const fs = require('fs');
const path = require('path');

const paths = [
    {
        key: "Backend / APIs",
        dir: "Backend_APIs",
        prefix: "be",
        modules: [
            { title: "Backend Languages", lessons: ["Python Basics", "Node.js Basics", "Java Basics"] },
            { title: "API Design", lessons: ["REST Principles", "HTTP Methods", "Status Codes"] },
            { title: "Databases & ORMs", lessons: ["SQL vs NoSQL", "Using ORMs", "Database Migrations"] },
            { title: "Authentication", lessons: ["JWT Tokens", "OAuth 2.0", "Role-based Access"] },
            { title: "Microservices", lessons: ["Monolith vs Microservices", "Docker Basics", "Service Discovery"] },
            { title: "Backend Capstone", lessons: ["System Architecture", "Building the API", "Deployment"] }
        ]
    },
    {
        key: "Data Science",
        dir: "Data_Science",
        prefix: "ds",
        modules: [
            { title: "Python for Data", lessons: ["Syntax", "Data Types", "Functions"] },
            { title: "Data Manipulation", lessons: ["Pandas DataFrames", "Data Cleaning", "NumPy Arrays"] },
            { title: "Data Visualization", lessons: ["Matplotlib", "Seaborn", "Interactive Charts"] },
            { title: "Intro to ML", lessons: ["Supervised Learning", "Scikit-Learn", "Model Evaluation"] },
            { title: "Advanced ML", lessons: ["Unsupervised Learning", "Feature Engineering", "Hyperparameters"] },
            { title: "Data Science Capstone", lessons: ["Data Gathering", "Analysis", "Presentation"] }
        ]
    },
    {
        key: "Machine Learning",
        dir: "Machine_Learning",
        prefix: "ml",
        modules: [
            { title: "Python & Math", lessons: ["Linear Algebra", "Calculus for ML", "Probability"] },
            { title: "Data Prep", lessons: ["Scaling Data", "Handling Missing Values", "Encoding"] },
            { title: "Supervised Learning", lessons: ["Linear Regression", "Logistic Regression", "Decision Trees"] },
            { title: "Unsupervised Learning", lessons: ["K-Means Clustering", "PCA", "Anomaly Detection"] },
            { title: "Deep Learning Intro", lessons: ["Neural Networks", "PyTorch Basics", "TensorFlow Basics"] },
            { title: "ML Capstone", lessons: ["Model Training", "Deployment", "Monitoring"] }
        ]
    },
    {
        key: "NLP / AI",
        dir: "NLP_AI",
        prefix: "nlp",
        modules: [
            { title: "Text Processing", lessons: ["Tokenization", "Stemming & Lemmatization", "Stop Words"] },
            { title: "Feature Extraction", lessons: ["Bag of Words", "TF-IDF", "Word Embeddings"] },
            { title: "Sequential Models", lessons: ["RNNs", "LSTMs", "Attention Mechanism"] },
            { title: "Transformers", lessons: ["Transformer Architecture", "BERT", "GPT Models"] },
            { title: "LLMs & Prompting", lessons: ["Prompt Engineering", "Fine-Tuning", "RAG Systems"] },
            { title: "AI Capstone", lessons: ["Building an AI Chatbot", "Model Evaluation", "Deployment"] }
        ]
    },
    {
        key: "Cloud / DevOps",
        dir: "Cloud_DevOps",
        prefix: "cdo",
        modules: [
            { title: "Linux Basics", lessons: ["Command Line", "File Permissions", "Shell Scripting"] },
            { title: "Networking & DNS", lessons: ["OSI Model", "TCP/IP", "DNS Management"] },
            { title: "Containers", lessons: ["Docker Images", "Docker Compose", "Registry"] },
            { title: "CI/CD & Cloud", lessons: ["GitHub Actions", "AWS Basics", "EC2 & S3"] },
            { title: "Orchestration", lessons: ["Kubernetes Architecture", "Pods & Services", "Helm Charts"] },
            { title: "Cloud Capstone", lessons: ["Infrastructure as Code", "Deploying the App", "Security Audit"] }
        ]
    },
    {
        key: "Cybersecurity",
        dir: "Cybersecurity",
        prefix: "cs",
        modules: [
            { title: "Networking & Protocols", lessons: ["Network Fundamentals", "Wireshark", "Common Ports"] },
            { title: "Ethical Hacking Intro", lessons: ["Kali Linux", "Reconnaissance", "Nmap"] },
            { title: "Web Vulnerabilities", lessons: ["OWASP Top 10", "SQL Injection", "XSS"] },
            { title: "Cryptography", lessons: ["Symmetric vs Asymmetric", "Hashing Algorithms", "PKI"] },
            { title: "Defensive Security", lessons: ["Firewalls", "Intrusion Detection", "SIEM"] },
            { title: "Cybersecurity Capstone", lessons: ["Penetration Testing", "Vulnerability Report", "Mitigation"] }
        ]
    },
    {
        key: "UI/UX Design",
        dir: "UI_UX_Design",
        prefix: "ux",
        modules: [
            { title: "Design Principles", lessons: ["Color Theory", "Typography", "Layouts"] },
            { title: "UX Research", lessons: ["User Personas", "Journey Mapping", "Usability Testing"] },
            { title: "Wireframing", lessons: ["Low Fidelity Wireframes", "High Fidelity Mockups", "Prototyping"] },
            { title: "Figma Mastery", lessons: ["Components", "Auto Layout", "Variables"] },
            { title: "Design Systems", lessons: ["Style Guides", "Token Management", "Documentation"] },
            { title: "UX Capstone", lessons: ["Case Study", "Portfolio Prep", "Finalizing Designs"] }
        ]
    },
    {
        key: "Mobile Development",
        dir: "Mobile_Development",
        prefix: "md",
        modules: [
            { title: "Programming Fundamentals", lessons: ["JS / Dart Basics", "Functions", "OOP"] },
            { title: "Framework Basics", lessons: ["React Native Intro", "Flutter Intro", "Components"] },
            { title: "Mobile UI", lessons: ["Layouts", "Styling", "Animations"] },
            { title: "Navigation", lessons: ["Stack Navigation", "Tab Navigation", "Drawer Navigation"] },
            { title: "State Management", lessons: ["Redux / Provider", "Context API", "Local Storage"] },
            { title: "Mobile Capstone", lessons: ["Building the App", "Performance Profiling", "App Store Deployment"] }
        ]
    },
    {
        key: "Data Analytics",
        dir: "Data_Analytics",
        prefix: "da",
        modules: [
            { title: "Spreadsheets Mastery", lessons: ["Pivot Tables", "VLOOKUP", "Macros"] },
            { title: "SQL for Analytics", lessons: ["Joins", "Window Functions", "CTEs"] },
            { title: "Python Analytics", lessons: ["Pandas Basics", "Data Cleaning", "Exploratory Analysis"] },
            { title: "BI Tools Intro", lessons: ["Tableau Basics", "Power BI Basics", "Connecting Data"] },
            { title: "Dashboarding", lessons: ["Interactive Visuals", "DAX Formulas", "Storytelling"] },
            { title: "Analytics Capstone", lessons: ["Data Gathering", "Analysis", "Presentation"] }
        ]
    }
];

let globalQuizCode = "";

paths.forEach(p => {
    const dir = path.join(__dirname, 'Courses', p.dir);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    let qData = {};
    p.modules.forEach((m, modIdx) => {
        const modNum = modIdx + 1;
        m.lessons.forEach((l, lessIdx) => {
            const lessNum = lessIdx + 1;
            const file = path.join(dir, `Module_${modNum}_Lesson_${lessNum}.md`);
            const content = `# ${l}\n\nWelcome to Module ${modNum}, Lesson ${lessNum} of ${p.key}.\n\n## Introduction\nIn this lesson, we will explore ${l}, a fundamental topic in ${p.key}.\n\n## Core Concepts\n- **Foundations:** Learn the core principles.\n- **Application:** Apply what you've learned.\n- **Best Practices:** Follow industry standards.\n\n## Practical Example\n\`\`\`text\n// Example snippet for ${l}\nConcept: ${l}\n\`\`\`\n\n## Summary\nWe learned about the mechanics and importance of ${l}.\n\n### Key Takeaways\n- Master the fundamentals.\n- Keep learning and applying.`;
            fs.writeFileSync(file, content);
        });

        const genericQuestions = [
            { q: "What is the primary purpose of {concept}?", correct: "To manage and optimize it effectively", wrong: ["To delete system data", "To slow down the application", "It has no specific purpose"] },
            { q: "Which of the following best describes {concept}?", correct: "A key component in modern systems", wrong: ["An outdated legacy technology", "A physical hardware device", "A type of computer virus"] },
            { q: "When would you typically use {concept}?", correct: "When dealing with complex {module} tasks", wrong: ["Only when working offline", "Never", "When formatting a hard drive"] },
            { q: "What is a major benefit of using {concept}?", correct: "Improved efficiency and structure", wrong: ["Slower execution times", "Increased error rates", "Hardware degradation"] },
            { q: "How does {concept} relate to {module}?", correct: "It is a foundational element of the field", wrong: ["They are completely unrelated", "It replaces the entire field", "It is only used in legacy systems"] },
            { q: "What is a common challenge when implementing {concept}?", correct: "Ensuring proper configuration and integration", wrong: ["Buying the right monitor", "Finding an internet connection", "Installing a web browser"] },
            { q: "Which tool or technique is often paired with {concept}?", correct: "Industry standard best practices", wrong: ["A hammer", "A floppy disk", "A completely random algorithm"] },
            { q: "What is the first step in mastering {concept}?", correct: "Understanding the core fundamentals", wrong: ["Memorizing every single command", "Ignoring documentation", "Skipping straight to advanced topics"] },
            { q: "Why is {concept} considered important in {module}?", correct: "It solves critical industry problems", wrong: ["It is a passing trend", "It makes the code look longer", "It is required by older hardware"] },
            { q: "What is a common misconception about {concept}?", correct: "That it is too difficult to learn", wrong: ["That it is a type of food", "That it requires a supercomputer", "That it was invented yesterday"] }
        ];

        // Ensure we have at least 14 questions by repeating the templates with variations
        let templatesToUse = [];
        while (templatesToUse.length < 14) {
            templatesToUse = templatesToUse.concat(genericQuestions);
        }

        for(let i=0; i<14; i++) {
            if (!qData[`${p.prefix}_mod${modNum}`]) {
                qData[`${p.prefix}_mod${modNum}`] = {
                    title: `${p.key} - ${m.title}`,
                    questions: []
                };
            }
            
            // Pick a lesson title as the "concept"
            const concept = m.lessons[i % m.lessons.length];
            const tpl = templatesToUse[i];
            
            const questionText = tpl.q.replace(/{concept}/g, concept).replace(/{module}/g, m.title);
            const correctText = tpl.correct.replace(/{concept}/g, concept).replace(/{module}/g, m.title);
            
            qData[`${p.prefix}_mod${modNum}`].questions.push({
                id: `${p.prefix}_mod${modNum}_q${i+1}`,
                moduleId: `${p.prefix}_mod${modNum}`,
                q: questionText,
                opts: [
                    { text: correctText, correct: true },
                    { text: tpl.wrong[0], correct: false },
                    { text: tpl.wrong[1], correct: false },
                    { text: tpl.wrong[2], correct: false }
                ]
            });
        }
    });

    const output = `const ${p.prefix.toUpperCase()}_QUIZ_DATA = ${JSON.stringify(qData, null, 2)};
if (typeof window !== "undefined") {
    if(!window.QUIZ_DATA) window.QUIZ_DATA = {};
    Object.assign(window.QUIZ_DATA, ${p.prefix.toUpperCase()}_QUIZ_DATA);
}
`;
    fs.writeFileSync(path.join(__dirname, `${p.prefix}-quiz-data.js`), output);
    console.log(`Generated files for ${p.key}`);
});

let overrideCode = `
Object.assign(ROADMAP_DATA, {
`;
paths.forEach((p, index) => {
    const modulesArr = p.modules.map((m, modIdx) => {
        const modNum = modIdx + 1;
        const courses = m.lessons.map((l, lessIdx) => {
            const lessNum = lessIdx + 1;
            return `{ name: "${l}", url: "study.html?url=Courses/${p.dir}/Module_${modNum}_Lesson_${lessNum}.md&title=${l}" }`;
        }).join(',\n                ');
        
        return `        {
            id: "${p.prefix}_mod${modNum}", title: "Module ${modNum}: ${m.title}", desc: "Master the fundamentals of ${m.title}.", keywords: ["${p.prefix}", "module${modNum}"],
            courses: [
                ${courses}
            ]
        }`;
    }).join(',\n');
    overrideCode += `    "${p.key}": [\n${modulesArr}\n    ]${index < paths.length - 1 ? ',' : ''}\n`;
});
overrideCode += `});\n`;
fs.writeFileSync(path.join(__dirname, 'roadmap-data-override.js'), overrideCode);

console.log("All 9 paths generated successfully.");
