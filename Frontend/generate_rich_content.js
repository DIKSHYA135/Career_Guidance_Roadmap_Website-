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
            { title: "Python for Data", lessons: ["Python Syntax", "Data Types in Python", "Writing Functions in Python"] },
            { title: "Data Manipulation", lessons: ["Pandas DataFrames", "Data Cleaning Techniques", "NumPy Arrays"] },
            { title: "Data Visualization", lessons: ["Plotting with Matplotlib", "Statistical Plots with Seaborn", "Interactive Charts with Plotly"] },
            { title: "Intro to ML", lessons: ["Supervised Learning", "Using Scikit-Learn", "Model Evaluation Metrics"] },
            { title: "Advanced ML", lessons: ["Unsupervised Learning", "Feature Engineering", "Hyperparameter Tuning"] },
            { title: "Data Science Capstone", lessons: ["Data Gathering & Cleaning", "Exploratory Analysis", "Presenting Findings"] }
        ]
    },
    {
        key: "Machine Learning",
        dir: "Machine_Learning",
        prefix: "ml",
        modules: [
            { title: "Python & Math", lessons: ["Linear Algebra for ML", "Calculus for ML", "Probability & Statistics"] },
            { title: "Data Prep", lessons: ["Scaling & Normalization", "Handling Missing Values", "Encoding Categorical Data"] },
            { title: "Supervised Learning", lessons: ["Linear Regression", "Logistic Regression", "Decision Trees & Random Forests"] },
            { title: "Unsupervised Learning", lessons: ["K-Means Clustering", "Dimensionality Reduction with PCA", "Anomaly Detection"] },
            { title: "Deep Learning Intro", lessons: ["Neural Network Architecture", "Getting Started with PyTorch", "Getting Started with TensorFlow"] },
            { title: "ML Capstone", lessons: ["Training & Evaluating a Model", "Deploying ML Models", "Monitoring in Production"] }
        ]
    },
    {
        key: "NLP / AI",
        dir: "NLP_AI",
        prefix: "nlp",
        modules: [
            { title: "Text Processing", lessons: ["Tokenization", "Stemming & Lemmatization", "Removing Stop Words"] },
            { title: "Feature Extraction", lessons: ["Bag of Words Model", "TF-IDF Vectorization", "Word Embeddings (Word2Vec)"] },
            { title: "Sequential Models", lessons: ["Recurrent Neural Networks (RNNs)", "Long Short-Term Memory (LSTMs)", "The Attention Mechanism"] },
            { title: "Transformers", lessons: ["The Transformer Architecture", "Understanding BERT", "Understanding GPT Models"] },
            { title: "LLMs & Prompting", lessons: ["Prompt Engineering Techniques", "Fine-Tuning Language Models", "Retrieval-Augmented Generation (RAG)"] },
            { title: "AI Capstone", lessons: ["Building an AI Chatbot", "Evaluating AI Model Performance", "Deploying an AI Application"] }
        ]
    },
    {
        key: "Cloud / DevOps",
        dir: "Cloud_DevOps",
        prefix: "cdo",
        modules: [
            { title: "Linux Basics", lessons: ["Navigating the Command Line", "Understanding File Permissions", "Writing Shell Scripts"] },
            { title: "Networking & DNS", lessons: ["The OSI Model Explained", "TCP/IP Fundamentals", "DNS Management"] },
            { title: "Containers", lessons: ["Docker Images & Containers", "Docker Compose for Multi-Service Apps", "Container Registries"] },
            { title: "CI/CD & Cloud", lessons: ["Automating with GitHub Actions", "Introduction to AWS", "Working with EC2 & S3"] },
            { title: "Orchestration", lessons: ["Kubernetes Architecture", "Pods, Services & Deployments", "Managing Apps with Helm"] },
            { title: "Cloud Capstone", lessons: ["Infrastructure as Code with Terraform", "Deploying a Real App to Cloud", "Cloud Security Audit"] }
        ]
    },
    {
        key: "Cybersecurity",
        dir: "Cybersecurity",
        prefix: "cs",
        modules: [
            { title: "Networking & Protocols", lessons: ["Network Fundamentals", "Packet Analysis with Wireshark", "Common Network Ports"] },
            { title: "Ethical Hacking Intro", lessons: ["Setting Up Kali Linux", "Reconnaissance Techniques", "Port Scanning with Nmap"] },
            { title: "Web Vulnerabilities", lessons: ["OWASP Top 10 Overview", "SQL Injection Attacks & Defense", "Cross-Site Scripting (XSS)"] },
            { title: "Cryptography", lessons: ["Symmetric vs Asymmetric Encryption", "Hashing Algorithms (MD5, SHA)", "Public Key Infrastructure (PKI)"] },
            { title: "Defensive Security", lessons: ["Firewalls & Network Security", "Intrusion Detection Systems (IDS)", "SIEM Tools & Log Analysis"] },
            { title: "Cybersecurity Capstone", lessons: ["Running a Penetration Test", "Writing a Vulnerability Report", "Implementing Security Mitigations"] }
        ]
    },
    {
        key: "UI/UX Design",
        dir: "UI_UX_Design",
        prefix: "ux",
        modules: [
            { title: "Design Principles", lessons: ["Color Theory for Designers", "Typography Fundamentals", "Layout & Composition"] },
            { title: "UX Research", lessons: ["Creating User Personas", "Journey Mapping", "Conducting Usability Tests"] },
            { title: "Wireframing", lessons: ["Low-Fidelity Wireframes", "High-Fidelity Mockups", "Interactive Prototyping"] },
            { title: "Figma Mastery", lessons: ["Components & Variants in Figma", "Auto Layout in Figma", "Using Variables & Tokens"] },
            { title: "Design Systems", lessons: ["Creating Style Guides", "Token Management", "Documentation Best Practices"] },
            { title: "UX Capstone", lessons: ["Full Case Study Walkthrough", "Portfolio Preparation", "Presenting & Finalizing Designs"] }
        ]
    },
    {
        key: "Mobile Development",
        dir: "Mobile_Development",
        prefix: "md",
        modules: [
            { title: "Programming Fundamentals", lessons: ["JavaScript & Dart Basics", "Functions & Scope", "Object-Oriented Programming"] },
            { title: "Framework Basics", lessons: ["Introduction to React Native", "Introduction to Flutter", "Building Your First Component"] },
            { title: "Mobile UI", lessons: ["Laying Out Mobile Screens", "Styling in React Native & Flutter", "Adding Animations"] },
            { title: "Navigation", lessons: ["Stack Navigation", "Tab-Based Navigation", "Drawer Navigation"] },
            { title: "State Management", lessons: ["Redux & Provider Explained", "React Context API", "Local Storage on Mobile"] },
            { title: "Mobile Capstone", lessons: ["Building a Full Mobile App", "Performance Profiling", "Deploying to App Stores"] }
        ]
    },
    {
        key: "Data Analytics",
        dir: "Data_Analytics",
        prefix: "da",
        modules: [
            { title: "Spreadsheets Mastery", lessons: ["Pivot Tables in Excel", "VLOOKUP & XLOOKUP", "Automating Tasks with Macros"] },
            { title: "SQL for Analytics", lessons: ["SQL Joins Explained", "Window Functions in SQL", "Common Table Expressions (CTEs)"] },
            { title: "Python Analytics", lessons: ["Introduction to Pandas", "Data Cleaning with Python", "Exploratory Data Analysis (EDA)"] },
            { title: "BI Tools Intro", lessons: ["Getting Started with Tableau", "Getting Started with Power BI", "Connecting Data Sources"] },
            { title: "Dashboarding", lessons: ["Building Interactive Dashboards", "DAX Formulas in Power BI", "Data Storytelling"] },
            { title: "Analytics Capstone", lessons: ["End-to-End Data Project", "Full Analysis Workflow", "Presenting Your Dashboard"] }
        ]
    },
    {
        key: "Web Development",
        dir: "Web_Development",
        prefix: "wd",
        modules: [
            { title: "The Foundations of the Web", lessons: ["How the Internet Works", "Introduction to HTML5", "Introduction to CSS3"] },
            { title: "Building Responsive Layouts", lessons: ["The CSS Box Model", "Flexbox Essentials", "CSS Grid & Responsive Design"] },
            { title: "Programming with JavaScript", lessons: ["JavaScript Basics", "Control Flow and Functions", "Arrays and Objects"] },
            { title: "Interactive Web Pages (The DOM)", lessons: ["Introduction to the DOM", "Event Listeners & Interaction", "Form Validation"] },
            { title: "Modern JavaScript & APIs", lessons: ["ES6+ Features", "Promises & Async Await", "Fetching API Data"] },
            { title: "Deployment & Career Readiness", lessons: ["Git and GitHub Basics", "Deploying with Vercel and Netlify", "Building Your Portfolio"] }
        ]
    },
    {
        key: "Full Stack Development",
        dir: "Full_Stack_Development",
        prefix: "fs",
        modules: [
            { title: "Frontend Refresher", lessons: ["HTML & CSS Review", "Advanced JavaScript Patterns", "DOM Mastery"] },
            { title: "React Fundamentals", lessons: ["Components & Props", "State & Hooks", "Client-Side Routing"] },
            { title: "Node.js Basics", lessons: ["The Node.js Event Loop", "Working with the File System", "NPM & Modules"] },
            { title: "Express.js APIs", lessons: ["Routing in Express", "Middleware Functions", "Error Handling in APIs"] },
            { title: "Databases", lessons: ["SQL Basics with PostgreSQL", "NoSQL Concepts with MongoDB", "Connecting Databases to Your App"] },
            { title: "Full Stack Capstone", lessons: ["Integrating Frontend & Backend", "Adding Authentication", "Deployment to Production"] }
        ]
    }
];

const richContent = {
    "How the Internet Works": `# How the Internet Works\n\nThe Internet is the global network that connects billions of devices worldwide. Understanding how it works is the very first step to becoming a web developer.\n\n## What is the Internet?\nThe **Internet** is a massive network of computers and servers connected to each other using cables, fiber optics, and wireless signals. When you type a website address into your browser, a complex series of events happens within milliseconds to deliver that page to you.\n\n## Key Concepts You Must Know\n\n### 1. IP Addresses\nEvery device on the internet has a unique **IP address** (Internet Protocol address), like \`192.168.1.1\`. Think of it like a home mailing address — it tells the network exactly where to deliver data.\n\n### 2. DNS (Domain Name System)\nHumans can't remember IP addresses easily, so we use **domain names** like \`google.com\`. The DNS system is like a giant phonebook — it translates domain names into their corresponding IP addresses.\n\n**How it works:**\n1. You type \`google.com\` in your browser.\n2. Your computer asks a DNS server: "What is the IP for google.com?"\n3. The DNS server responds with an IP like \`142.250.182.14\`.\n4. Your browser connects to that IP address.\n\n### 3. HTTP & HTTPS\n**HTTP** (HyperText Transfer Protocol) is the language that browsers and web servers use to communicate.\n\n**HTTPS** is the secure version — it encrypts the data so no one can spy on your conversation with the server.\n\nWhen you see the padlock 🔒 in your browser bar, that means the site uses HTTPS.\n\n### 4. Clients & Servers\n- **Client:** Your browser (Chrome, Firefox) — it *requests* web pages.\n- **Server:** A powerful computer that *stores* website files and *responds* to requests.\n\nWhen you visit a website, your browser (client) sends an **HTTP request** to the server, and the server sends back an **HTTP response** containing the HTML, CSS, and JavaScript files.\n\n### 5. The Request-Response Cycle\n\`\`\`\nYou type google.com\n       ↓\nDNS Lookup → finds IP 142.250.182.14\n       ↓\nHTTP Request → "GET /index.html"\n       ↓\nServer sends back HTML, CSS, JS\n       ↓\nBrowser renders the page\n\`\`\`\n\n## Protocols That Power the Web\n| Protocol | Purpose |\n|---|---|\n| HTTP/HTTPS | Loading web pages |\n| FTP | File transfers |\n| SMTP | Sending emails |\n| TCP/IP | Core data transmission |\n\n## Summary\nThe internet is a network of networks where data travels as small packets. Understanding IP addresses, DNS, HTTP/HTTPS, and the client-server model gives you the foundation to understand everything else in web development.\n`,

    "Introduction to HTML5": `# Introduction to HTML5\n\nHTML (HyperText Markup Language) is the **skeleton of every web page**. It provides the structure and content that browsers display.\n\n## What is HTML?\nHTML is not a programming language — it is a **markup language**. You use special tags to tell the browser what each piece of content is.\n\n\`\`\`html\n<h1>This is a heading</h1>\n<p>This is a paragraph of text.</p>\n<img src="photo.jpg" alt="A beautiful photo">\n<a href="https://google.com">Click to visit Google</a>\n\`\`\`\n\n## The HTML Document Structure\nEvery valid HTML page has this basic structure:\n\n\`\`\`html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My First Web Page</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n    <p>Welcome to my website!</p>\n</body>\n</html>\n\`\`\`\n\n**Breaking it down:**\n- \`<!DOCTYPE html>\` — Tells the browser this is an HTML5 document.\n- \`<html>\` — The root element that wraps everything.\n- \`<head>\` — Contains meta-information (title, charset, links to CSS). Not visible to users.\n- \`<body>\` — Contains all visible content.\n\n## Essential HTML Tags\n\n### Headings\n\`\`\`html\n<h1>Most Important Heading</h1>\n<h2>Second Level</h2>\n<h3>Third Level</h3>\n<!-- h4, h5, h6 exist too -->\n\`\`\`\n\n### Paragraphs & Text Formatting\n\`\`\`html\n<p>This is a paragraph.</p>\n<strong>Bold text</strong>\n<em>Italic text</em>\n<br>  <!-- Line break -->\n\`\`\`\n\n### Links\n\`\`\`html\n<a href="https://example.com">Visit Example</a>\n<a href="about.html">Go to About Page</a>  <!-- Relative link -->\n\`\`\`\n\n### Images\n\`\`\`html\n<img src="cat.jpg" alt="A cute cat" width="300">\n\`\`\`\nThe \`alt\` attribute is important for accessibility and SEO.\n\n### Lists\n\`\`\`html\n<!-- Unordered List -->\n<ul>\n    <li>HTML</li>\n    <li>CSS</li>\n    <li>JavaScript</li>\n</ul>\n\n<!-- Ordered List -->\n<ol>\n    <li>Step 1: Learn HTML</li>\n    <li>Step 2: Learn CSS</li>\n    <li>Step 3: Build a project</li>\n</ol>\n\`\`\`\n\n### Semantic HTML5 Elements\nHTML5 introduced **semantic tags** — elements that describe their meaning:\n\n\`\`\`html\n<header>   <!-- Top of the page or section -->\n<nav>      <!-- Navigation links -->\n<main>     <!-- Primary content area -->\n<section>  <!-- A distinct section of content -->\n<article>  <!-- Self-contained content like a blog post -->\n<aside>    <!-- Sidebar content -->\n<footer>   <!-- Bottom of the page -->\n\`\`\`\n\nUsing semantic HTML is better for SEO and accessibility than using \`<div>\` everywhere.\n\n## Summary\nHTML is the foundation of all web pages. You use tags to structure your content, and the browser interprets those tags to render a visual page. Master these core tags and you're ready to start styling with CSS!`,
};

function generateRichContent(pathName, moduleName, lessonName) {
    if (richContent[lessonName]) return richContent[lessonName];

    const pathDescriptions = {
        "Backend / APIs": "building robust, scalable server-side systems and APIs that power modern applications.",
        "Data Science": "extracting meaningful insights from complex datasets using Python, statistics, and machine learning.",
        "Machine Learning": "building systems that can learn from data and make predictions without being explicitly programmed.",
        "NLP / AI": "teaching computers to understand, interpret, and generate human language using artificial intelligence.",
        "Cloud / DevOps": "deploying, scaling, and operating applications reliably in cloud environments using automation.",
        "Cybersecurity": "protecting systems, networks, and data from digital attacks and unauthorized access.",
        "UI/UX Design": "creating intuitive, beautiful digital experiences that solve real user problems.",
        "Mobile Development": "building high-performance native and cross-platform mobile applications.",
        "Data Analytics": "transforming raw data into actionable business intelligence using tools like SQL, Python, and BI platforms.",
        "Web Development": "creating interactive, responsive websites and web applications using HTML, CSS, and JavaScript.",
        "Full Stack Development": "building complete web applications from the user interface all the way to the server and database."
    };

    const pathDesc = pathDescriptions[pathName] || "mastering this technical domain.";

    return `# ${lessonName}

## What Is ${lessonName}?

${lessonName} is a core topic in **${moduleName}**, and a fundamental skill for anyone pursuing a career in **${pathName}**. Without a solid understanding of ${lessonName}, it becomes very difficult to progress to more advanced concepts in this field.

In this lesson, you will learn exactly what ${lessonName} is, why it matters, and how it is applied in real professional environments.

---

## Why ${lessonName} Matters

Every professional working in ${pathName} needs to understand ${lessonName}. The reason is simple: this field is all about ${pathDesc} ${lessonName} plays a direct role in making that happen effectively.

Here is what you gain by mastering ${lessonName}:

- ✅ A deeper understanding of how ${moduleName} works end-to-end
- ✅ The ability to design, implement, and debug ${lessonName}-related problems
- ✅ Confidence in technical interviews when asked about ${moduleName}
- ✅ A practical skill you can immediately apply to real projects

---

## Core Concepts Explained

### Concept 1: The Fundamentals of ${lessonName}

At its most basic level, ${lessonName} refers to the set of principles, tools, or techniques used to accomplish a specific task within ${moduleName}. Before you can apply it, you need to understand the theory behind it.

**Think of it like this:** Before driving a car, you need to understand how the engine, steering, and brakes work together. The same applies here — before you use ${lessonName} in a project, you need to understand what it is doing behind the scenes.

### Concept 2: How ${lessonName} Fits Into ${moduleName}

${lessonName} does not exist in isolation. It is part of a larger system — the ${moduleName} ecosystem. Understanding how it connects with the other components you will study makes your learning much more effective.

For example, once you understand ${lessonName}, you will be much better equipped to understand the next lessons in this module, because they all build on top of this foundation.

### Concept 3: Practical Usage in the Industry

In the real world, professionals in ${pathName} use ${lessonName} regularly. Here are some concrete scenarios:

- **Scenario A:** A senior engineer is reviewing a system architecture. They identify that ${lessonName} is being misused and explain to the team the correct approach.
- **Scenario B:** A junior developer is debugging a production issue. Their understanding of ${lessonName} helps them quickly isolate the root cause.
- **Scenario C:** A team is designing a new feature. They use ${lessonName} as the foundation of their design to ensure scalability and maintainability.

---

## Step-By-Step: Applying ${lessonName}

Follow these steps whenever you need to apply ${lessonName} in a real project:

**Step 1 — Plan First**
Before writing any code or creating anything, take 10 minutes to plan your approach. Ask yourself: "What problem am I solving? How does ${lessonName} help solve it?"

**Step 2 — Start Small**
Do not try to implement everything at once. Start with the simplest version of ${lessonName} that works. Get it working first, then optimize.

**Step 3 — Test Your Understanding**
After implementing, ask yourself: "Can I explain what I just built and why it works?" If you cannot explain it clearly, revisit the fundamentals.

**Step 4 — Iterate & Improve**
Real-world usage of ${lessonName} always requires iteration. Review your implementation, gather feedback, and make improvements.

---

## Common Mistakes to Avoid

Even experienced developers make these mistakes with ${lessonName}. Learn from them now so you do not repeat them:

❌ **Mistake 1: Skipping the theory**
Many beginners want to jump straight to code without understanding *why* ${lessonName} works the way it does. This leads to fragile implementations that break under edge cases.

❌ **Mistake 2: Over-engineering**
Just because ${lessonName} *can* be complex does not mean your implementation should be. Always prefer the simplest solution that satisfies your requirements.

❌ **Mistake 3: Ignoring documentation**
Every technology related to ${lessonName} has official documentation. Make reading official docs a habit — it is the fastest way to get accurate, up-to-date information.

---

## Quick Reference Summary

| Concept | Key Takeaway |
|---|---|
| What it is | A core technique in ${moduleName} within ${pathName} |
| Why it matters | Enables professional-level implementation of ${moduleName} |
| When to use it | Whenever working on ${moduleName}-related features or problems |
| Common pitfall | Skipping fundamentals and copying code without understanding |

---

## What's Next?

You have now built a solid understanding of **${lessonName}**. In the next lesson, we will continue exploring **${moduleName}** and go one level deeper. Each lesson in this module builds directly on top of the previous one, so make sure you feel confident with this material before moving on.

> 💡 **Pro Tip:** The best way to solidify your understanding of ${lessonName} is to explain it to someone else. Try explaining the core concept in your own words — if you can do that clearly, you truly understand it.
`;
}

const allContent = {};

paths.forEach(p => {
    const dir = path.join(__dirname, 'Courses', p.dir);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    p.modules.forEach((m, modIdx) => {
        const modNum = modIdx + 1;
        m.lessons.forEach((l, lessIdx) => {
            const lessNum = lessIdx + 1;
            const filePath = path.join(dir, 'Module_' + modNum + '_Lesson_' + lessNum + '.md');
            const content = generateRichContent(p.key, m.title, l);
            fs.writeFileSync(filePath, content);
            const key = 'Courses/' + p.dir + '/Module_' + modNum + '_Lesson_' + lessNum + '.md';
            allContent[key] = content;
        });
    });
    console.log('Done: ' + p.key);
});

// Write the embedded content JS file
const jsContent = '// Auto-generated embedded lesson content - loaded inline to avoid fetch() issues\nwindow.LESSON_CONTENT = ' + JSON.stringify(allContent, null, 2) + ';\n';
fs.writeFileSync(path.join(__dirname, 'lesson-content.js'), jsContent);

console.log('lesson-content.js written with ' + Object.keys(allContent).length + ' lessons embedded.');
