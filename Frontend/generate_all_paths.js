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

    let qData = [];

    p.modules.forEach((m, modIdx) => {
        const modNum = modIdx + 1;
        m.lessons.forEach((l, lessIdx) => {
            const lessNum = lessIdx + 1;
            const file = path.join(dir, `Module_${modNum}_Lesson_${lessNum}.md`);
            const content = `# ${l}\n\nWelcome to Module ${modNum}, Lesson ${lessNum} of ${p.key}.\n\n## Introduction\nIn this lesson, we will explore ${l}, a fundamental topic in ${p.key}.\n\n## Core Concepts\n- **Foundations:** Learn the core principles.\n- **Application:** Apply what you've learned.\n- **Best Practices:** Follow industry standards.\n\n## Practical Example\n\`\`\`text\n// Example snippet for ${l}\nConcept: ${l}\n\`\`\`\n\n## Summary\nWe learned about the mechanics and importance of ${l}.\n\n### Key Takeaways\n- Master the fundamentals.\n- Keep learning and applying.`;
            fs.writeFileSync(file, content);
        });

        for(let i=1; i<=14; i++) {
            qData.push({
                id: `${p.prefix}_mod${modNum}_q${i}`,
                moduleId: `${p.prefix}_mod${modNum}`,
                text: `What is a core concept taught in ${p.key} Module ${modNum}, Question ${i}?`,
                opts: [
                    { text: `Correct Answer for Mod ${modNum} Q${i}`, correct: true },
                    { text: "Incorrect Option A", correct: false },
                    { text: "Incorrect Option B", correct: false },
                    { text: "Incorrect Option C", correct: false }
                ]
            });
        }
    });

    const output = `const ${p.prefix.toUpperCase()}_QUIZ_DATA = {
  "${p.prefix}_mod1": [], "${p.prefix}_mod2": [], "${p.prefix}_mod3": [], "${p.prefix}_mod4": [], "${p.prefix}_mod5": [], "${p.prefix}_mod6": []
};
const raw_${p.prefix}_QuizData = ${JSON.stringify(qData, null, 2)};
raw_${p.prefix}_QuizData.forEach(q => ${p.prefix.toUpperCase()}_QUIZ_DATA[q.moduleId].push(q));
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
