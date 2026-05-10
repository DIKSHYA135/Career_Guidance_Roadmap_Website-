const fs = require('fs');

let content = fs.readFileSync('quiz.js', 'utf8');

const startIdx = content.indexOf('const QUIZ_DATA = {');
const endIdx = content.indexOf('document.addEventListener');

const newQuizData = `const QUIZ_DATA = {
    // Web Development
    "html": { title: "HTML Fundamentals", questions: [{ q: "What is the primary purpose of semantic HTML tags?", opts: [{ text: "To style the webpage elements faster.", correct: false }, { text: "To provide meaning to the structure for browsers and screen readers.", correct: true }, { text: "To execute JavaScript code locally on the client.", correct: false }, { text: "To connect directly to a server database.", correct: false }] }] },
    "css": { title: "CSS & Responsive Design", questions: [{ q: "Which property is used in CSS to change the background color?", opts: [{ text: "bgcolor", correct: false }, { text: "color", correct: false }, { text: "background-color", correct: true }, { text: "bg-color", correct: false }] }] },
    "js": { title: "JavaScript Essentials", questions: [{ q: "How do you write 'Hello World' in an alert box in JavaScript?", opts: [{ text: "msg('Hello World');", correct: false }, { text: "alertBox('Hello World');", correct: false }, { text: "msgBox('Hello World');", correct: false }, { text: "alert('Hello World');", correct: true }] }] },
    "react": { title: "Frontend Frameworks (React)", questions: [{ q: "What is used in React to keep track of a component's internal data?", opts: [{ text: "Props", correct: false }, { text: "State", correct: true }, { text: "Context", correct: false }, { text: "Refs", correct: false }] }] },
    
    // Full Stack Development
    "web-dev-basics": { title: "Web Basics", questions: [{ q: "Which of the following is NOT a core web technology?", opts: [{ text: "HTML", correct: false }, { text: "CSS", correct: false }, { text: "JavaScript", correct: false }, { text: "C++", correct: true }] }] },
    "nodejs": { title: "Node.js Fundamentals", questions: [{ q: "Node.js is primarily used for:", opts: [{ text: "Client-side scripting", correct: false }, { text: "Styling web pages", correct: false }, { text: "Server-side scripting", correct: true }, { text: "Database administration", correct: false }] }] },
    
    // Backend / APIs
    "programming-basics": { title: "Backend Language", questions: [{ q: "Which of these is a common backend language?", opts: [{ text: "HTML", correct: false }, { text: "CSS", correct: false }, { text: "Python", correct: true }, { text: "React", correct: false }] }] },
    "api-design": { title: "API Design & REST", questions: [{ q: "In a REST API, which HTTP method is typically used to create a new resource?", opts: [{ text: "GET", correct: false }, { text: "POST", correct: true }, { text: "DELETE", correct: false }, { text: "PUT", correct: false }] }] },
    "database": { title: "Databases", questions: [{ q: "What does SQL stand for?", opts: [{ text: "Strong Question Language", correct: false }, { text: "Structured Query Language", correct: true }, { text: "Standard Query Logic", correct: false }, { text: "Simple Queue Language", correct: false }] }] },
    "auth": { title: "Authentication", questions: [{ q: "What does JWT stand for?", opts: [{ text: "Java Web Token", correct: false }, { text: "JSON Web Token", correct: true }, { text: "JavaScript Web Token", correct: false }, { text: "JSON Window Token", correct: false }] }] },
    
    // Data Science
    "python-data": { title: "Python for Data", questions: [{ q: "Which library is commonly used for data manipulation in Python?", opts: [{ text: "TensorFlow", correct: false }, { text: "Pandas", correct: true }, { text: "Flask", correct: false }, { text: "Django", correct: false }] }] },
    "pandas-numpy": { title: "Data Manipulation", questions: [{ q: "What is the primary data structure in Pandas for 2D tabular data?", opts: [{ text: "Series", correct: false }, { text: "List", correct: false }, { text: "DataFrame", correct: true }, { text: "Dictionary", correct: false }] }] },
    "data-viz": { title: "Data Visualization", questions: [{ q: "Which Python library is famous for creating static, interactive, and animated visualizations?", opts: [{ text: "Numpy", correct: false }, { text: "Scipy", correct: false }, { text: "Matplotlib", correct: true }, { text: "Pandas", correct: false }] }] },
    "machine-learning": { title: "Machine Learning", questions: [{ q: "Which type of machine learning involves predicting a continuous numerical value?", opts: [{ text: "Classification", correct: false }, { text: "Clustering", correct: false }, { text: "Regression", correct: true }, { text: "Dimensionality Reduction", correct: false }] }] },
    
    // NLP / AI
    "nlp-fundamentals": { title: "NLP Fundamentals", questions: [{ q: "What is tokenization in NLP?", opts: [{ text: "Translating text", correct: false }, { text: "Splitting text into smaller units like words", correct: true }, { text: "Converting text to speech", correct: false }, { text: "Encrypting text", correct: false }] }] },
    "transformers-llms": { title: "Transformers & LLMs", questions: [{ q: "What mechanism is central to the Transformer architecture?", opts: [{ text: "Recurrence", correct: false }, { text: "Convolution", correct: false }, { text: "Self-Attention", correct: true }, { text: "Pooling", correct: false }] }] },
    
    // Cloud / DevOps
    "linux-bash": { title: "Linux & Bash Scripting", questions: [{ q: "Which command is used to list files in a Linux directory?", opts: [{ text: "cd", correct: false }, { text: "mkdir", correct: false }, { text: "ls", correct: true }, { text: "pwd", correct: false }] }] },
    "docker": { title: "Containerization", questions: [{ q: "What is the file called that contains instructions to build a Docker image?", opts: [{ text: "Dockerfile", correct: true }, { text: "DockerImage", correct: false }, { text: "DockerConfig", correct: false }, { text: "Containerfile", correct: false }] }] },
    "cicd": { title: "CI/CD Pipelines", questions: [{ q: "What does CI stand for in CI/CD?", opts: [{ text: "Continuous Integration", correct: true }, { text: "Continuous Installation", correct: false }, { text: "Controlled Integration", correct: false }, { text: "Central Integration", correct: false }] }] },
    "cloud-providers": { title: "Cloud Platforms", questions: [{ q: "Which of the following is NOT a major public cloud provider?", opts: [{ text: "Amazon Web Services", correct: false }, { text: "Microsoft Azure", correct: false }, { text: "Google Cloud Platform", correct: false }, { text: "Apple Cloud", correct: true }] }] },
    
    // UI/UX Design
    "design-fundamentals": { title: "Design Principles", questions: [{ q: "Which principle refers to the arrangement of elements to signify importance?", opts: [{ text: "Contrast", correct: false }, { text: "Visual Hierarchy", correct: true }, { text: "Alignment", correct: false }, { text: "Proximity", correct: false }] }] },
    "figma": { title: "Figma Mastery", questions: [{ q: "What Figma feature automatically resizes frames based on their content?", opts: [{ text: "Components", correct: false }, { text: "Auto Layout", correct: true }, { text: "Constraints", correct: false }, { text: "Variants", correct: false }] }] },
    "user-research": { title: "User Research", questions: [{ q: "What is a 'Persona' in UX design?", opts: [{ text: "A fictional character representing a user type", correct: true }, { text: "A color palette", correct: false }, { text: "A software testing tool", correct: false }, { text: "A type of animation", correct: false }] }] },
    
    // Mobile Development
    "mobile-fundamentals": { title: "Mobile Fundamentals", questions: [{ q: "Which language is primarily used for Flutter development?", opts: [{ text: "JavaScript", correct: false }, { text: "Java", correct: false }, { text: "Dart", correct: true }, { text: "Swift", correct: false }] }] },
    "react-native-flutter": { title: "Cross-Platform Frameworks", questions: [{ q: "React Native allows you to build mobile apps using:", opts: [{ text: "Python", correct: false }, { text: "C#", correct: false }, { text: "JavaScript and React", correct: true }, { text: "Ruby", correct: false }] }] },
    "mobile-ui": { title: "Mobile UI", questions: [{ q: "What is a common pattern for navigating between major sections in a mobile app?", opts: [{ text: "Hyperlinks in text", correct: false }, { text: "Bottom Tab Navigation", correct: true }, { text: "Browser Back Button", correct: false }, { text: "Scrollbars", correct: false }] }] },
    
    // Cybersecurity
    "networking-basics": { title: "Networking Basics", questions: [{ q: "What does IP stand for in networking?", opts: [{ text: "Internet Protocol", correct: true }, { text: "Internal Protocol", correct: false }, { text: "International Provider", correct: false }, { text: "Internet Provider", correct: false }] }] },
    "security-fundamentals": { title: "Security Fundamentals", questions: [{ q: "What is the primary purpose of encryption?", opts: [{ text: "To make data smaller", correct: false }, { text: "To make data unreadable to unauthorized users", correct: true }, { text: "To speed up data transmission", correct: false }, { text: "To organize data in a database", correct: false }] }] },
    "ethical-hacking": { title: "Ethical Hacking", questions: [{ q: "What is 'penetration testing'?", opts: [{ text: "Writing secure code", correct: false }, { text: "Authorized simulated cyberattack on a system to evaluate its security", correct: true }, { text: "Testing the durability of hardware", correct: false }, { text: "Installing antivirus software", correct: false }] }] },
    
    // Data Analytics
    "excel-advanced": { title: "Advanced Excel", questions: [{ q: "Which Excel feature allows you to summarize and analyze large amounts of data dynamically?", opts: [{ text: "VLOOKUP", correct: false }, { text: "Macros", correct: false }, { text: "Pivot Tables", correct: true }, { text: "Conditional Formatting", correct: false }] }] },
    "sql-analytics": { title: "SQL for Analytics", questions: [{ q: "Which SQL clause is used to group rows that have the same values into summary rows?", opts: [{ text: "ORDER BY", correct: false }, { text: "GROUP BY", correct: true }, { text: "JOIN", correct: false }, { text: "WHERE", correct: false }] }] },
    "bi-tools": { title: "BI Tools", questions: [{ q: "What is the primary purpose of BI (Business Intelligence) tools like Tableau or Power BI?", opts: [{ text: "To write databases", correct: false }, { text: "To visualize and analyze data", correct: true }, { text: "To develop web apps", correct: false }, { text: "To train AI models", correct: false }] }] }
};
`;

content = content.substring(0, startIdx) + newQuizData + '\n' + content.substring(endIdx);

fs.writeFileSync('quiz.js', content, 'utf8');

console.log("quiz.js updated successfully");
