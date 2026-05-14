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
