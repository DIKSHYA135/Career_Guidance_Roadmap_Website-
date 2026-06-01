/* ==========================================================
   app-data.js — Central Data Store for Xyverra
   All data here will be replaced by API calls in production.
   TODO: Replace with GET /api/paths, GET /api/skills/:path
   ========================================================== */

const PATH_SKILLS = {
  "Web Development": [
    { name: "HTML5", category: "Web Fundamentals", level: "beginner", description: "Semantic elements, forms, accessibility, and SEO basics.", proficiency: 0, verified: false, courseUrl: "https://www.w3schools.com/html/", courseName: "W3Schools HTML" },
    { name: "CSS3", category: "Web Fundamentals", level: "beginner", description: "Flexbox, Grid, animations, and responsive design.", proficiency: 0, verified: false, courseUrl: "https://www.w3schools.com/css/", courseName: "W3Schools CSS" },
    { name: "JavaScript", category: "Programming", level: "beginner", description: "DOM manipulation, ES6+, async/await, and events.", proficiency: 0, verified: false, courseUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", courseName: "MDN JS Guide" },
    { name: "React", category: "Frontend", level: "intermediate", description: "Components, hooks, state management, and JSX.", proficiency: 0, verified: false, courseUrl: "https://react.dev/learn", courseName: "React Official Docs" },
    { name: "Git", category: "Tools", level: "beginner", description: "Version control, branching, and GitHub workflows.", proficiency: 0, verified: false, courseUrl: "https://learngitbranching.js.org/", courseName: "Learn Git Branching" },
    { name: "REST APIs", category: "Backend", level: "intermediate", description: "Consuming APIs with fetch/axios and handling responses.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=-MTSQjw5DrM", courseName: "REST API Crash Course" },
    { name: "TypeScript", category: "Programming", level: "intermediate", description: "Static typing, interfaces, and type-safe React.", proficiency: 0, verified: false, courseUrl: "https://www.typescriptlang.org/docs/", courseName: "TypeScript Docs" },
    { name: "Responsive Design", category: "Web Fundamentals", level: "beginner", description: "Mobile-first design, media queries, and fluid layouts.", proficiency: 0, verified: false, courseUrl: "https://web.dev/learn/design/", courseName: "web.dev Responsive Design" }
  ],
  "Full Stack Development": [
    { name: "HTML/CSS/JS", category: "Web Fundamentals", level: "beginner", description: "Core web technologies for building interfaces.", proficiency: 0, verified: false, courseUrl: "https://www.theodinproject.com/paths/foundations/courses/foundations", courseName: "The Odin Project - Foundations" },
    { name: "Node.js", category: "Backend", level: "intermediate", description: "Server-side JS, event loop, and npm ecosystem.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=TlB_eWDSMt4", courseName: "Node.js Crash Course" },
    { name: "Express.js", category: "Backend", level: "intermediate", description: "REST API routing, middleware, and MVC pattern.", proficiency: 0, verified: false, courseUrl: "https://expressjs.com/en/guide/routing.html", courseName: "Express.js Guide" },
    { name: "React", category: "Frontend", level: "intermediate", description: "Component-based UI with hooks and context.", proficiency: 0, verified: false, courseUrl: "https://react.dev/learn", courseName: "React Official Docs" },
    { name: "SQL", category: "Database", level: "beginner", description: "CRUD operations, joins, and relational databases.", proficiency: 0, verified: false, courseUrl: "https://www.w3schools.com/sql/", courseName: "W3Schools SQL" },
    { name: "MongoDB", category: "Database", level: "intermediate", description: "NoSQL document storage, aggregation, and Mongoose.", proficiency: 0, verified: false, courseUrl: "https://learn.mongodb.com/", courseName: "MongoDB University" },
    { name: "JWT Auth", category: "Security", level: "intermediate", description: "Token-based authentication and authorization.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=mbsmsiPbO33", courseName: "JWT Crash Course" },
    { name: "Git & GitHub", category: "Tools", level: "beginner", description: "Version control, PRs, and collaborative workflows.", proficiency: 0, verified: false, courseUrl: "https://learngitbranching.js.org/", courseName: "Learn Git Branching" }
  ],
  "Backend / APIs": [
    { name: "Python", category: "Programming", level: "beginner", description: "Core Python syntax, OOP, and standard library.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", courseName: "Python for Beginners" },
    { name: "REST API Design", category: "Backend", level: "intermediate", description: "RESTful principles, status codes, and versioning.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=-mN3VyJuCjM", courseName: "REST API Concepts" },
    { name: "SQL & ORMs", category: "Database", level: "beginner", description: "Relational databases and ORM frameworks.", proficiency: 0, verified: false, courseUrl: "https://www.w3schools.com/sql/", courseName: "W3Schools SQL" },
    { name: "Authentication", category: "Security", level: "intermediate", description: "JWT, OAuth 2.0, and secure password hashing.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=mbsmsiPbO33", courseName: "JWT Crash Course" },
    { name: "FastAPI / Flask", category: "Backend", level: "intermediate", description: "Building production-grade APIs with Python.", proficiency: 0, verified: false, courseUrl: "https://fastapi.tiangolo.com/", courseName: "FastAPI Docs" },
    { name: "Docker", category: "DevOps", level: "intermediate", description: "Containerizing APIs for consistent deployment.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=pTFZFxd4hOI", courseName: "Docker Tutorial" }
  ],
  "Data Science": [
    { name: "Python", category: "Programming", level: "beginner", description: "Python fundamentals for data manipulation.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw", courseName: "Python for Beginners" },
    { name: "Pandas", category: "Data", level: "intermediate", description: "DataFrame operations, merging, and cleaning.", proficiency: 0, verified: false, courseUrl: "https://www.kaggle.com/learn/pandas", courseName: "Kaggle Pandas" },
    { name: "NumPy", category: "Data", level: "intermediate", description: "Array operations and numerical computing.", proficiency: 0, verified: false, courseUrl: "https://numpy.org/learn/", courseName: "NumPy Learn" },
    { name: "Matplotlib", category: "Visualization", level: "beginner", description: "Static charts and plot customization.", proficiency: 0, verified: false, courseUrl: "https://www.kaggle.com/learn/data-visualization", courseName: "Kaggle Data Viz" },
    { name: "Scikit-learn", category: "ML", level: "intermediate", description: "Machine learning pipelines, regression, classification.", proficiency: 0, verified: false, courseUrl: "https://scikit-learn.org/stable/tutorial/", courseName: "Scikit-learn Tutorial" },
    { name: "Statistics", category: "Mathematics", level: "beginner", description: "Probability, distributions, and hypothesis testing.", proficiency: 0, verified: false, courseUrl: "https://www.khanacademy.org/math/statistics-probability", courseName: "Khan Academy Stats" }
  ],
  "NLP / AI": [
    { name: "Python", category: "Programming", level: "beginner", description: "Python fundamentals for AI development.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw", courseName: "Python for Beginners" },
    { name: "Machine Learning", category: "ML", level: "intermediate", description: "Foundational ML concepts and algorithms.", proficiency: 0, verified: false, courseUrl: "https://course.fast.ai/", courseName: "Fast.ai ML" },
    { name: "NLP Fundamentals", category: "NLP", level: "intermediate", description: "Tokenization, embeddings, and text classification.", proficiency: 0, verified: false, courseUrl: "https://huggingface.co/learn/nlp-course/chapter1/1", courseName: "HuggingFace NLP Course" },
    { name: "Transformers", category: "AI", level: "advanced", description: "Attention mechanisms, BERT, GPT fine-tuning.", proficiency: 0, verified: false, courseUrl: "https://web.stanford.edu/class/cs224n/", courseName: "Stanford CS224N" },
    { name: "PyTorch", category: "ML", level: "intermediate", description: "Tensor operations, autograd, and model training.", proficiency: 0, verified: false, courseUrl: "https://pytorch.org/tutorials/", courseName: "PyTorch Tutorials" },
    { name: "Prompt Engineering", category: "AI", level: "beginner", description: "Crafting effective prompts for LLMs.", proficiency: 0, verified: false, courseUrl: "https://www.deeplearning.ai/short-courses/", courseName: "DeepLearning.AI Short Courses" }
  ],
  "Cloud / DevOps": [
    { name: "Linux & Bash", category: "Systems", level: "beginner", description: "Command line, shell scripting, and file system.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=v_1oa8pu0MQ", courseName: "Linux Crash Course" },
    { name: "Docker", category: "Containers", level: "intermediate", description: "Images, containers, Dockerfile, and Compose.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=pTFZFxd4hOI", courseName: "Docker Tutorial" },
    { name: "CI/CD", category: "DevOps", level: "intermediate", description: "GitHub Actions, automated testing and deployment.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=R8_veQiYBjI", courseName: "GitHub Actions Tutorial" },
    { name: "AWS", category: "Cloud", level: "intermediate", description: "EC2, S3, Lambda, and cloud architecture.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=SOTamWNgDKc", courseName: "AWS Cloud Practitioner" },
    { name: "Kubernetes", category: "Containers", level: "advanced", description: "Container orchestration, pods, and deployments.", proficiency: 0, verified: false, courseUrl: "https://kubernetes.io/docs/tutorials/", courseName: "Kubernetes Tutorials" },
    { name: "Terraform", category: "IaC", level: "intermediate", description: "Infrastructure as code for cloud provisioning.", proficiency: 0, verified: false, courseUrl: "https://developer.hashicorp.com/terraform/tutorials", courseName: "Terraform Tutorials" }
  ],
  "UI/UX Design": [
    { name: "Design Principles", category: "Design", level: "beginner", description: "Color, typography, spacing, and visual hierarchy.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU", courseName: "YouTube UI/UX Basics" },
    { name: "Figma", category: "Tools", level: "intermediate", description: "Components, auto-layout, prototyping, and variants.", proficiency: 0, verified: false, courseUrl: "https://help.figma.com/hc/en-us", courseName: "Figma Learn" },
    { name: "User Research", category: "UX", level: "beginner", description: "Personas, user interviews, and usability testing.", proficiency: 0, verified: false, courseUrl: "https://www.coursera.org/professional-certificates/google-ux-design", courseName: "Google UX Design" },
    { name: "Wireframing", category: "UX", level: "beginner", description: "Low and high-fidelity wireframes for user flows.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=Gu1so3pz4bA", courseName: "YouTube Figma Course" },
    { name: "Accessibility (a11y)", category: "Design", level: "intermediate", description: "WCAG guidelines and inclusive design patterns.", proficiency: 0, verified: false, courseUrl: "https://web.dev/learn/accessibility/", courseName: "web.dev Accessibility" },
    { name: "Design Systems", category: "Design", level: "advanced", description: "Component libraries, tokens, and style guides.", proficiency: 0, verified: false, courseUrl: "https://www.coursera.org/specializations/ui-ux-design", courseName: "Coursera UI/UX" }
  ],
  "Mobile Development": [
    { name: "JavaScript", category: "Programming", level: "beginner", description: "Core JS for React Native development.", proficiency: 0, verified: false, courseUrl: "https://javascript.info/", courseName: "JavaScript.info" },
    { name: "React Native", category: "Mobile", level: "intermediate", description: "Cross-platform mobile apps with React Native.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc", courseName: "React Native Crash Course" },
    { name: "Dart / Flutter", category: "Mobile", level: "intermediate", description: "Flutter widgets, state management, and navigation.", proficiency: 0, verified: false, courseUrl: "https://flutter.dev/learn", courseName: "Flutter Learn" },
    { name: "Mobile Navigation", category: "Mobile", level: "intermediate", description: "Stack, tab, and drawer navigators.", proficiency: 0, verified: false, courseUrl: "https://reactnavigation.org/", courseName: "React Navigation Docs" },
    { name: "App Store Deployment", category: "DevOps", level: "advanced", description: "Publishing to Google Play Store and Apple App Store.", proficiency: 0, verified: false, courseUrl: "https://developer.android.com/distribute", courseName: "Google Play Distribution" }
  ],
  "Cybersecurity": [
    { name: "Networking", category: "Infrastructure", level: "beginner", description: "TCP/IP, DNS, HTTP/S, and the OSI model.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=qiQR5rTSshw", courseName: "Network+ Training" },
    { name: "Security Fundamentals", category: "Security", level: "beginner", description: "Cryptography, hashing, and security postures.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=9sgZGvJ22E8", courseName: "Security+ Training" },
    { name: "Ethical Hacking", category: "Offensive", level: "intermediate", description: "Penetration testing and vulnerability scanning.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=3Kq1MIfTWCE", courseName: "TryHackMe - Ethical Hacking" },
    { name: "Linux", category: "Systems", level: "beginner", description: "Command-line skills essential for security work.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=v_1oa8pu0MQ", courseName: "Linux Crash Course" },
    { name: "OWASP Top 10", category: "Security", level: "intermediate", description: "Web application security vulnerabilities and mitigations.", proficiency: 0, verified: false, courseUrl: "https://owasp.org/www-project-top-ten/", courseName: "OWASP Top 10" },
    { name: "Wireshark", category: "Tools", level: "intermediate", description: "Packet analysis and network traffic inspection.", proficiency: 0, verified: false, courseUrl: "https://www.wireshark.org/docs/", courseName: "Wireshark Docs" }
  ],
  "Data Analytics": [
    { name: "Excel / Sheets", category: "Tools", level: "beginner", description: "Pivot tables, VLOOKUP, and advanced formulas.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=rwbho0CgEAE", courseName: "Excel Tutorial" },
    { name: "SQL", category: "Database", level: "beginner", description: "Aggregations, joins, and window functions.", proficiency: 0, verified: false, courseUrl: "https://www.udacity.com/course/sql-for-data-analysis--ud198", courseName: "SQL for Data Analysis" },
    { name: "Power BI", category: "BI Tools", level: "intermediate", description: "Interactive dashboards and DAX formulas.", proficiency: 0, verified: false, courseUrl: "https://www.youtube.com/watch?v=TmhQCQr_DCA", courseName: "Power BI Tutorial" },
    { name: "Tableau", category: "BI Tools", level: "intermediate", description: "Visual analytics and Tableau Public dashboards.", proficiency: 0, verified: false, courseUrl: "https://www.tableau.com/learn/training", courseName: "Tableau Training" },
    { name: "Python / Pandas", category: "Programming", level: "intermediate", description: "Data wrangling and exploratory analysis.", proficiency: 0, verified: false, courseUrl: "https://www.kaggle.com/learn/pandas", courseName: "Kaggle Pandas" },
    { name: "Statistics", category: "Mathematics", level: "beginner", description: "Descriptive stats, correlation, and A/B testing.", proficiency: 0, verified: false, courseUrl: "https://www.khanacademy.org/math/statistics-probability", courseName: "Khan Academy Stats" }
  ]
};

const SKILLS_DATA = {
  "Web Development": {
    "beginner": ["HTML", "CSS", "JavaScript"],
    "intermediate": ["React", "Tailwind CSS", "TypeScript"],
    "advanced": ["Next.js", "Performance Optimization", "System Design"]
  },
  "Full Stack Development": {
    "beginner": ["HTML/CSS/JS", "Git & GitHub", "Command Line Basics"],
    "intermediate": ["Node.js", "Express.js", "SQL / NoSQL"],
    "advanced": ["Microservices", "Docker & Kubernetes", "Cloud Architecture"]
  },
  "Backend / APIs": {
    "beginner": ["Python / JS", "REST APIs", "SQL Basics"],
    "intermediate": ["FastAPI / Flask", "Authentication (JWT)", "Database Design"],
    "advanced": ["GraphQL", "Message Queues", "Caching (Redis)"]
  },
  "Data Science": {
    "beginner": ["Python", "NumPy", "Pandas"],
    "intermediate": ["Statistics", "Machine Learning", "Data Visualization"],
    "advanced": ["Deep Learning", "MLOps", "Research Engineering"]
  },
  "NLP / AI": {
    "beginner": ["Python", "Prompt Engineering", "OpenAI APIs"],
    "intermediate": ["Transformers", "LangChain", "RAG"],
    "advanced": ["Fine Tuning", "Agentic Systems", "LLM Infrastructure"]
  },
  "Cloud / DevOps": {
    "beginner": ["Linux Basics", "Networking", "Bash Scripting"],
    "intermediate": ["Docker", "CI/CD Pipelines", "AWS / GCP / Azure Basics"],
    "advanced": ["Kubernetes", "Terraform / IaC", "Site Reliability Engineering"]
  },
  "UI/UX Design": {
    "beginner": ["Color Theory", "Typography", "Wireframing"],
    "intermediate": ["Figma", "User Research", "Prototyping"],
    "advanced": ["Design Systems", "Accessibility (WCAG)", "UX Strategy"]
  },
  "Mobile Development": {
    "beginner": ["JavaScript / Dart", "Mobile UI Patterns", "State Management Basics"],
    "intermediate": ["React Native / Flutter", "API Integration", "Local Storage"],
    "advanced": ["Native Modules", "Performance Profiling", "App Store Deployment"]
  },
  "Cybersecurity": {
    "beginner": ["Networking Concepts", "Linux Command Line", "Security Fundamentals"],
    "intermediate": ["Ethical Hacking", "OWASP Top 10", "Cryptography"],
    "advanced": ["Penetration Testing", "Reverse Engineering", "Incident Response"]
  },
  "Data Analytics": {
    "beginner": ["Excel / Google Sheets", "SQL Basics", "Basic Statistics"],
    "intermediate": ["Tableau / Power BI", "Python / R", "Data Cleaning"],
    "advanced": ["Predictive Modeling", "A/B Testing", "Advanced Data Storytelling"]
  }
};

const MODULES_DATA = {
  "Web Development": {
    "Beginner": [
      { id: "wd-beg-1", title: "HTML Fundamentals", desc: "Learn the core structure of the web." },
      { id: "wd-beg-2", title: "CSS Fundamentals", desc: "Style your websites with modern CSS." },
      { id: "wd-beg-3", title: "JavaScript Basics", desc: "Add interactivity to your pages." }
    ],
    "Intermediate": [
      { id: "wd-int-1", title: "React", desc: "Build component-based UIs." },
      { id: "wd-int-2", title: "TypeScript", desc: "Type-safe JavaScript." },
      { id: "wd-int-3", title: "Tailwind CSS", desc: "Utility-first CSS framework." }
    ],
    "Advanced": [
      { id: "wd-adv-1", title: "Next.js", desc: "React framework for production." },
      { id: "wd-adv-2", title: "Performance Optimization", desc: "Make your apps blazing fast." },
      { id: "wd-adv-3", title: "System Design", desc: "Architect scalable frontend systems." }
    ]
  },
  "Data Science": {
    "Beginner": [
      { id: "ds-beg-1", title: "Python Basics", desc: "Core Python programming." },
      { id: "ds-beg-2", title: "NumPy", desc: "Numerical computing." },
      { id: "ds-beg-3", title: "Pandas", desc: "Data manipulation." }
    ],
    "Intermediate": [
      { id: "ds-int-1", title: "Statistics", desc: "Core statistical concepts." },
      { id: "ds-int-2", title: "Machine Learning", desc: "Predictive modeling basics." },
      { id: "ds-int-3", title: "Data Visualization", desc: "Plotting with Matplotlib and Seaborn." }
    ],
    "Advanced": [
      { id: "ds-adv-1", title: "Deep Learning", desc: "Neural networks with PyTorch/TF." },
      { id: "ds-adv-2", title: "MLOps", desc: "Deploying ML models." },
      { id: "ds-adv-3", title: "Research Engineering", desc: "Reading and implementing papers." }
    ]
  },
  "NLP / AI": {
    "Beginner": [
      { id: "nlp-beg-1", title: "Python for AI", desc: "AI-specific Python skills." },
      { id: "nlp-beg-2", title: "Prompt Engineering", desc: "Effective prompting." },
      { id: "nlp-beg-3", title: "OpenAI APIs", desc: "Integrating GPT models." }
    ],
    "Intermediate": [
      { id: "nlp-int-1", title: "Transformers", desc: "Understanding attention mechanisms." },
      { id: "nlp-int-2", title: "LangChain", desc: "Building LLM applications." },
      { id: "nlp-int-3", title: "RAG Systems", desc: "Retrieval-Augmented Generation." }
    ],
    "Advanced": [
      { id: "nlp-adv-1", title: "Fine Tuning", desc: "Customizing foundation models." },
      { id: "nlp-adv-2", title: "Agent Architectures", desc: "Building autonomous agents." },
      { id: "nlp-adv-3", title: "LLM Infrastructure", desc: "Serving and scaling LLMs." }
    ]
  }
};

// Full Stack Development
MODULES_DATA["Full Stack Development"] = {
  "Beginner": [
    { id: "web-dev-basics", title: "Web Basics (HTML/CSS/JS)", desc: "Core web technologies for building interfaces." },
    { id: "nodejs",         title: "Node.js & Express",        desc: "Build backend REST APIs using JavaScript." }
  ],
  "Intermediate": [
    { id: "database", title: "Databases (SQL/NoSQL)",          desc: "Data modeling, CRUD operations, and querying." },
    { id: "react",    title: "Frontend Frameworks (React)",    desc: "Build interactive client-side interfaces." }
  ],
  "Advanced": [
    { id: "capstone", title: "Full Stack Capstone", desc: "Build a full stack MERN or PERN application." }
  ]
};

// Backend / APIs
MODULES_DATA["Backend / APIs"] = {
  "Beginner": [
    { id: "programming-basics", title: "Backend Language (Python/Node)", desc: "Learn a core backend language like Python or Node.js." },
    { id: "api-design",         title: "API Design & REST",              desc: "Principles of designing stateless APIs." }
  ],
  "Intermediate": [
    { id: "database", title: "Databases & ORMs",            desc: "SQL/NoSQL and connecting to them securely." },
    { id: "auth",     title: "Authentication & Security",   desc: "JWT, OAuth, and securing your endpoints." }
  ],
  "Advanced": [
    { id: "capstone", title: "Backend Capstone", desc: "Build a secure REST API with authentication and database." }
  ]
};

// Cloud / DevOps
MODULES_DATA["Cloud / DevOps"] = {
  "Beginner": [
    { id: "linux-bash", title: "Linux & Bash Scripting",      desc: "Master the command line and shell scripting." },
    { id: "docker",     title: "Containerization (Docker)",   desc: "Package applications consistently with Docker." }
  ],
  "Intermediate": [
    { id: "cicd",            title: "CI/CD Pipelines",                    desc: "GitHub Actions or Jenkins for automation." },
    { id: "cloud-providers", title: "Cloud Platforms (AWS/GCP/Azure)",    desc: "Deploying applications to the cloud." }
  ],
  "Advanced": [
    { id: "capstone", title: "DevOps Capstone", desc: "Deploy an automated multi-container app to the cloud." }
  ]
};

// UI/UX Design
MODULES_DATA["UI/UX Design"] = {
  "Beginner": [
    { id: "design-fundamentals", title: "Design Principles",  desc: "Color theory, typography, spacing, and visual hierarchy." },
    { id: "figma",               title: "Figma Mastery",      desc: "Components, auto-layout, prototyping, and collaboration." }
  ],
  "Intermediate": [
    { id: "user-research",               title: "User Research & Testing",        desc: "Personas, wireframes, and usability testing." },
    { id: "accessibility-design-systems", title: "Accessibility & Design Systems", desc: "WCAG guidelines and scalable component libraries." }
  ],
  "Advanced": [
    { id: "capstone", title: "Design Capstone", desc: "Design a complete app prototype with research backing." }
  ]
};

// Mobile Development
MODULES_DATA["Mobile Development"] = {
  "Beginner": [
    { id: "mobile-fundamentals",  title: "Programming Fundamentals",    desc: "JavaScript for React Native or Dart for Flutter." },
    { id: "react-native-flutter", title: "Cross-Platform Frameworks",   desc: "React Native or Flutter basics." }
  ],
  "Intermediate": [
    { id: "mobile-ui",      title: "Mobile UI & Navigation",              desc: "Stack navigation, tabs, and gestures." },
    { id: "mobile-advanced", title: "Performance & App Store Deployment", desc: "Optimize performance and publish your app." }
  ],
  "Advanced": [
    { id: "capstone", title: "Mobile Capstone", desc: "Publish a working app to an app store." }
  ]
};

// Cybersecurity
MODULES_DATA["Cybersecurity"] = {
  "Beginner": [
    { id: "networking-basics",    title: "Networking & Protocols",    desc: "TCP/IP, DNS, HTTP/S, and OSI model." },
    { id: "security-fundamentals", title: "Security Fundamentals",    desc: "Cryptography, hashes, and security postures." }
  ],
  "Intermediate": [
    { id: "ethical-hacking", title: "Ethical Hacking",                      desc: "Penetration testing and vulnerability scanning." },
    { id: "cyber-advanced",  title: "Advanced Threats & Incident Response", desc: "Reverse engineering, exploit development, and incident handling." }
  ],
  "Advanced": [
    { id: "capstone", title: "Security Capstone", desc: "Perform and document a penetration test." }
  ]
};

// Data Analytics
MODULES_DATA["Data Analytics"] = {
  "Beginner": [
    { id: "excel-advanced", title: "Advanced Excel/Spreadsheets", desc: "Pivot tables, VLOOKUP, and macros." },
    { id: "sql-analytics",  title: "SQL for Analytics",           desc: "Aggregations, joins, and window functions." }
  ],
  "Intermediate": [
    { id: "bi-tools",           title: "BI Tools (Tableau/Power BI)",        desc: "Creating interactive dashboards." },
    { id: "analytics-advanced", title: "Predictive Analytics & Storytelling", desc: "A/B testing, predictive modeling, and data storytelling." }
  ],
  "Advanced": [
    { id: "capstone", title: "Analytics Capstone", desc: "Analyze a dataset and present a BI dashboard." }
  ]
};
