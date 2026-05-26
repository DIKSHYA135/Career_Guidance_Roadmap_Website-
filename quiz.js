/* =========================================================
   quiz.js — Xyverra Assessment Engine
   All localStorage calls are marked with TODO comments
   so they can be replaced with real API calls later.
   ========================================================= */

// ── Quiz Data (will come from GET /api/quiz/:moduleId in production) ──
const QUIZ_DATA = {
    "html": {
        title: "HTML Fundamentals",
        questions: [
            { q: "What is the primary purpose of semantic HTML tags?", opts: [{ text: "To execute JavaScript code locally on the client.", correct: false }, { text: "To provide meaning to the structure for browsers and screen readers.", correct: true }, { text: "To style the webpage elements faster.", correct: false }, { text: "To connect directly to a server database.", correct: false }] },
            { q: "Which HTML tag is used to define the most important heading?", opts: [{ text: "<heading>", correct: false }, { text: "<h1>", correct: true }, { text: "<head>", correct: false }, { text: "<h6>", correct: false }] },
            { q: "What does the 'alt' attribute in an <img> tag provide?", opts: [{ text: "Image animation", correct: false }, { text: "A link to the image source", correct: false }, { text: "Alternative text for accessibility", correct: true }, { text: "Image alignment", correct: false }] },
            { q: "Which element is used to create a hyperlink?", opts: [{ text: "<link>", correct: false }, { text: "<href>", correct: false }, { text: "<a>", correct: true }, { text: "<url>", correct: false }] },
            { q: "Which tag is used to create an unordered list?", opts: [{ text: "<list>", correct: false }, { text: "<ul>", correct: true }, { text: "<li>", correct: false }, { text: "<ol>", correct: false }] },
            { q: "What is the correct HTML element for inserting a line break?", opts: [{ text: "<br>", correct: true }, { text: "<break>", correct: false }, { text: "<hr>", correct: false }, { text: "<lb>", correct: false }] }
        ]
    },
    "css": {
        title: "CSS & Responsive Design",
        questions: [
            { q: "Which property is used in CSS to change the background color?", opts: [{ text: "bgcolor", correct: false }, { text: "background-color", correct: true }, { text: "bg-color", correct: false }, { text: "color", correct: false }] },
            { q: "Which CSS layout model allows you to create complex responsive layouts easily?", opts: [{ text: "Position", correct: false }, { text: "Grid", correct: true }, { text: "Display block", correct: false }, { text: "Float", correct: false }] },
            { q: "What does 'em' unit represent in CSS?", opts: [{ text: "Relative to the parent element's font size", correct: true }, { text: "A fixed pixel unit", correct: false }, { text: "Relative to the root font size", correct: false }, { text: "Exact millimeters", correct: false }] },
            { q: "How do you select an element with id 'demo'?", opts: [{ text: ".demo", correct: false }, { text: "demo", correct: false }, { text: "#demo", correct: true }, { text: "*demo", correct: false }] },
            { q: "Which property is used to change the text color?", opts: [{ text: "font-color", correct: false }, { text: "text-color", correct: false }, { text: "color", correct: true }, { text: "fgcolor", correct: false }] },
            { q: "What does CSS stand for?", opts: [{ text: "Colorful Style Sheets", correct: false }, { text: "Cascading Style Sheets", correct: true }, { text: "Creative Style Sheets", correct: false }, { text: "Computer Style Sheets", correct: false }] }
        ]
    },
    "js": {
        title: "JavaScript Essentials",
        questions: [
            { q: "How do you write 'Hello World' in an alert box?", opts: [{ text: "msg('Hello World');", correct: false }, { text: "alertBox('Hello World');", correct: false }, { text: "msgBox('Hello World');", correct: false }, { text: "alert('Hello World');", correct: true }] },
            { q: "Which keyword declares a block-scoped variable in modern JavaScript?", opts: [{ text: "var", correct: false }, { text: "let", correct: true }, { text: "define", correct: false }, { text: "set", correct: false }] },
            { q: "What does the === operator check?", opts: [{ text: "Value and type", correct: true }, { text: "Value only", correct: false }, { text: "Reference equality", correct: false }, { text: "Type only", correct: false }] },
            { q: "How do you create a function in JavaScript?", opts: [{ text: "def myFunction()", correct: false }, { text: "create myFunction()", correct: false }, { text: "function:myFunction()", correct: false }, { text: "function myFunction()", correct: true }] },
            { q: "How to write an IF statement in JavaScript?", opts: [{ text: "if i = 5", correct: false }, { text: "if i == 5 then", correct: false }, { text: "if i = 5 then", correct: false }, { text: "if (i == 5)", correct: true }] },
            { q: "Which event occurs when the user clicks on an HTML element?", opts: [{ text: "onclick", correct: true }, { text: "onmouseclick", correct: false }, { text: "onchange", correct: false }, { text: "onmouseover", correct: false }] }
        ]
    },
    "react": {
        title: "Frontend Frameworks (React)",
        questions: [
            { q: "What is used in React to keep track of a component's internal data?", opts: [{ text: "Context", correct: false }, { text: "Props", correct: false }, { text: "State", correct: true }, { text: "Refs", correct: false }] },
            { q: "What is JSX in React?", opts: [{ text: "A testing library", correct: false }, { text: "A database query language", correct: false }, { text: "A CSS framework", correct: false }, { text: "A JavaScript extension that looks like HTML", correct: true }] },
            { q: "Which hook is used to perform side effects in a function component?", opts: [{ text: "useState", correct: false }, { text: "useContext", correct: false }, { text: "useReducer", correct: false }, { text: "useEffect", correct: true }] },
            { q: "How do you pass data from parent to child component?", opts: [{ text: "Props", correct: true }, { text: "Redux", correct: false }, { text: "Context", correct: false }, { text: "State", correct: false }] },
            { q: "What is the virtual DOM?", opts: [{ text: "A database", correct: false }, { text: "A lightweight copy of the actual DOM", correct: true }, { text: "A separate browser window", correct: false }, { text: "A testing environment", correct: false }] },
            { q: "Which method is used to render a component to the DOM in React 18?", opts: [{ text: "ReactDOM.render", correct: false }, { text: "createRoot", correct: true }, { text: "renderRoot", correct: false }, { text: "DOM.render", correct: false }] }
        ]
    },
    "web-dev-basics": {
        title: "Web Basics",
        questions: [
            { q: "Which of the following is NOT a core web technology?", opts: [{ text: "JavaScript", correct: false }, { text: "HTML", correct: false }, { text: "CSS", correct: false }, { text: "C++", correct: true }] },
            { q: "What does HTTP stand for?", opts: [{ text: "HyperText Transmission Protocol", correct: false }, { text: "HyperText Transfer Program", correct: false }, { text: "HyperText Transfer Protocol", correct: true }, { text: "HyperText Transmission Program", correct: false }] },
            { q: "What is a URL?", opts: [{ text: "Universal Resource Locator", correct: false }, { text: "Uniform Resource Locator", correct: true }, { text: "Universal Resource Link", correct: false }, { text: "Uniform Resource Link", correct: false }] },
            { q: "Which of the following is a web browser?", opts: [{ text: "Windows", correct: false }, { text: "Linux", correct: false }, { text: "Chrome", correct: true }, { text: "MacOS", correct: false }] },
            { q: "What is the main function of a DNS server?", opts: [{ text: "To store databases", correct: false }, { text: "To secure web traffic", correct: false }, { text: "To host websites", correct: false }, { text: "To translate domain names to IP addresses", correct: true }] },
            { q: "What does DOM stand for?", opts: [{ text: "Data Orientation Model", correct: false }, { text: "Document Object Model", correct: true }, { text: "Data Object Model", correct: false }, { text: "Document Orientation Model", correct: false }] }
        ]
    },
    "nodejs": {
        title: "Node.js Fundamentals",
        questions: [
            { q: "Node.js is primarily used for:", opts: [{ text: "Styling web pages", correct: false }, { text: "Database administration", correct: false }, { text: "Server-side scripting", correct: true }, { text: "Client-side scripting", correct: false }] },
            { q: "What is npm?", opts: [{ text: "New Package Manager", correct: false }, { text: "Node Programming Manager", correct: false }, { text: "Node Package Manager", correct: true }, { text: "Node Project Manager", correct: false }] },
            { q: "Which module is used to create a web server in Node.js?", opts: [{ text: "fs", correct: false }, { text: "url", correct: false }, { text: "path", correct: false }, { text: "http", correct: true }] },
            { q: "How do you import a module in CommonJS?", opts: [{ text: "import 'module'", correct: false }, { text: "require('module')", correct: true }, { text: "load('module')", correct: false }, { text: "include('module')", correct: false }] },
            { q: "Node.js is built on which JavaScript engine?", opts: [{ text: "JavaScriptCore", correct: false }, { text: "Chakra", correct: false }, { text: "SpiderMonkey", correct: false }, { text: "V8", correct: true }] },
            { q: "Which of the following is a popular Node.js web framework?", opts: [{ text: "Django", correct: false }, { text: "Flask", correct: false }, { text: "Laravel", correct: false }, { text: "Express", correct: true }] }
        ]
    },
    "programming-basics": {
        title: "Backend Language",
        questions: [
            { q: "Which of these is a common backend language?", opts: [{ text: "React", correct: false }, { text: "Python", correct: true }, { text: "CSS", correct: false }, { text: "HTML", correct: false }] },
            { q: "What is a variable?", opts: [{ text: "A function", correct: false }, { text: "A database table", correct: false }, { text: "A named storage location in memory", correct: true }, { text: "A mathematical equation", correct: false }] },
            { q: "What is an array?", opts: [{ text: "A loop", correct: false }, { text: "A data structure containing a collection of elements", correct: true }, { text: "A conditional statement", correct: false }, { text: "A single value", correct: false }] },
            { q: "What does IDE stand for?", opts: [{ text: "Internal Design Environment", correct: false }, { text: "Internal Development Environment", correct: false }, { text: "Integrated Design Environment", correct: false }, { text: "Integrated Development Environment", correct: true }] },
            { q: "Which loop executes a block of code a specified number of times?", opts: [{ text: "for loop", correct: true }, { text: "do-while loop", correct: false }, { text: "infinite loop", correct: false }, { text: "while loop", correct: false }] },
            { q: "What is a boolean?", opts: [{ text: "A string of text", correct: false }, { text: "A data type with two possible values (true/false)", correct: true }, { text: "A function", correct: false }, { text: "A number", correct: false }] }
        ]
    },
    "api-design": {
        title: "API Design & REST",
        questions: [
            { q: "In a REST API, which HTTP method is typically used to create a new resource?", opts: [{ text: "DELETE", correct: false }, { text: "GET", correct: false }, { text: "PUT", correct: false }, { text: "POST", correct: true }] },
            { q: "What does API stand for?", opts: [{ text: "Application Protocol Interface", correct: false }, { text: "Application Programming Interface", correct: true }, { text: "Applied Protocol Interface", correct: false }, { text: "Applied Programming Interface", correct: false }] },
            { q: "Which HTTP method is used to update an existing resource completely?", opts: [{ text: "PATCH", correct: false }, { text: "POST", correct: false }, { text: "PUT", correct: true }, { text: "GET", correct: false }] },
            { q: "What format is commonly used to send data in a REST API?", opts: [{ text: "JSON", correct: true }, { text: "XML", correct: false }, { text: "CSV", correct: false }, { text: "HTML", correct: false }] },
            { q: "What does a 404 HTTP status code mean?", opts: [{ text: "Server Error", correct: false }, { text: "OK", correct: false }, { text: "Unauthorized", correct: false }, { text: "Not Found", correct: true }] },
            { q: "Which part of the HTTP request holds metadata like tokens?", opts: [{ text: "URL", correct: false }, { text: "Headers", correct: true }, { text: "Method", correct: false }, { text: "Body", correct: false }] }
        ]
    },
    "database": {
        title: "Databases",
        questions: [
            { q: "What does SQL stand for?", opts: [{ text: "Structured Query Language", correct: true }, { text: "Simple Queue Language", correct: false }, { text: "Standard Query Logic", correct: false }, { text: "Strong Question Language", correct: false }] },
            { q: "What is a primary key?", opts: [{ text: "A unique identifier for a record in a table", correct: true }, { text: "A database name", correct: false }, { text: "A foreign key", correct: false }, { text: "A table name", correct: false }] },
            { q: "Which type of database stores data in documents instead of tables?", opts: [{ text: "SQL", correct: false }, { text: "NoSQL", correct: true }, { text: "Tabular", correct: false }, { text: "Relational", correct: false }] },
            { q: "Which SQL command is used to retrieve data?", opts: [{ text: "SELECT", correct: true }, { text: "GET", correct: false }, { text: "PULL", correct: false }, { text: "FETCH", correct: false }] },
            { q: "What is a foreign key?", opts: [{ text: "A field that links to the primary key of another table", correct: true }, { text: "A unique identifier", correct: false }, { text: "An index", correct: false }, { text: "A database password", correct: false }] },
            { q: "Which of the following is a NoSQL database?", opts: [{ text: "MySQL", correct: false }, { text: "Oracle", correct: false }, { text: "PostgreSQL", correct: false }, { text: "MongoDB", correct: true }] }
        ]
    },
    "auth": {
        title: "Authentication",
        questions: [
            { q: "What does JWT stand for?", opts: [{ text: "JavaScript Web Token", correct: false }, { text: "JSON Web Token", correct: true }, { text: "Java Web Token", correct: false }, { text: "JSON Window Token", correct: false }] },
            { q: "What is the purpose of hashing a password?", opts: [{ text: "To speed up login", correct: false }, { text: "To make it unreadable even if the database is breached", correct: true }, { text: "To encrypt it so it can be decrypted later", correct: false }, { text: "To make it shorter", correct: false }] },
            { q: "What does OAuth primarily handle?", opts: [{ text: "Authentication", correct: false }, { text: "Encryption", correct: false }, { text: "Database management", correct: false }, { text: "Authorization", correct: true }] },
            { q: "Which of these is a common hashing algorithm?", opts: [{ text: "AES", correct: false }, { text: "RSA", correct: false }, { text: "bcrypt", correct: true }, { text: "Base64", correct: false }] },
            { q: "What is MFA?", opts: [{ text: "Multiple File Access", correct: false }, { text: "Main Frame Authorization", correct: false }, { text: "Multi-Factor Authentication", correct: true }, { text: "Master File Authorization", correct: false }] },
            { q: "In a JWT, which part contains the claims (data)?", opts: [{ text: "Payload", correct: true }, { text: "Signature", correct: false }, { text: "Footer", correct: false }, { text: "Header", correct: false }] }
        ]
    },
    "python-data": {
        title: "Python for Data Science",
        questions: [
            { q: "Which library is commonly used for data manipulation in Python?", opts: [{ text: "TensorFlow", correct: false }, { text: "Pandas", correct: true }, { text: "Django", correct: false }, { text: "Flask", correct: false }] },
            { q: "Which data structure is mutable in Python?", opts: [{ text: "Tuple", correct: false }, { text: "Integer", correct: false }, { text: "String", correct: false }, { text: "List", correct: true }] },
            { q: "How do you define a function in Python?", opts: [{ text: "create my_func():", correct: false }, { text: "fn my_func():", correct: false }, { text: "def my_func():", correct: true }, { text: "function my_func():", correct: false }] },
            { q: "What is a Python dictionary?", opts: [{ text: "A text file", correct: false }, { text: "A mathematical set", correct: false }, { text: "An ordered list", correct: false }, { text: "A collection of key-value pairs", correct: true }] },
            { q: "Which library is used for scientific computing?", opts: [{ text: "SciPy", correct: true }, { text: "BeautifulSoup", correct: false }, { text: "Requests", correct: false }, { text: "Flask", correct: false }] },
            { q: "How do you import a module in Python?", opts: [{ text: "include module_name", correct: false }, { text: "load module_name", correct: false }, { text: "require module_name", correct: false }, { text: "import module_name", correct: true }] }
        ]
    },
    "pandas-numpy": {
        title: "Data Manipulation",
        questions: [
            { q: "What is the primary data structure in Pandas for 2D tabular data?", opts: [{ text: "DataFrame", correct: true }, { text: "Series", correct: false }, { text: "Dictionary", correct: false }, { text: "List", correct: false }] },
            { q: "Which NumPy object is used for storing multi-dimensional data?", opts: [{ text: "Series", correct: false }, { text: "List", correct: false }, { text: "DataFrame", correct: false }, { text: "ndarray", correct: true }] },
            { q: "How do you read a CSV file using Pandas?", opts: [{ text: "pd.get_csv()", correct: false }, { text: "pd.open_csv()", correct: false }, { text: "pd.read_csv()", correct: true }, { text: "pd.load_csv()", correct: false }] },
            { q: "What does df.head() do?", opts: [{ text: "Returns the last 5 rows", correct: false }, { text: "Returns the headers", correct: false }, { text: "Returns the first 5 rows of a DataFrame", correct: true }, { text: "Returns the index", correct: false }] },
            { q: "How do you filter a DataFrame 'df' for values where 'Age' > 30?", opts: [{ text: "df.where('Age' > 30)", correct: false }, { text: "df.query(Age > 30)", correct: false }, { text: "df[df['Age'] > 30]", correct: true }, { text: "df.filter('Age' > 30)", correct: false }] },
            { q: "Which method is used to handle missing data in Pandas?", opts: [{ text: "fillna()", correct: true }, { text: "dropnull()", correct: false }, { text: "remove_na()", correct: false }, { text: "clean()", correct: false }] }
        ]
    },
    "data-viz": {
        title: "Data Visualization",
        questions: [
            { q: "Which Python library is famous for creating static, interactive, and animated visualizations?", opts: [{ text: "Pandas", correct: false }, { text: "Scipy", correct: false }, { text: "Numpy", correct: false }, { text: "Matplotlib", correct: true }] },
            { q: "Which library is built on top of Matplotlib and provides a high-level interface?", opts: [{ text: "Plotly", correct: false }, { text: "Seaborn", correct: true }, { text: "Altair", correct: false }, { text: "Bokeh", correct: false }] },
            { q: "Which chart type is best for showing trends over time?", opts: [{ text: "Bar chart", correct: false }, { text: "Line chart", correct: true }, { text: "Pie chart", correct: false }, { text: "Scatter plot", correct: false }] },
            { q: "What does a scatter plot visualize?", opts: [{ text: "The total sum of categories", correct: false }, { text: "The distribution of a single variable", correct: false }, { text: "The relationship between two variables", correct: true }, { text: "Hierarchical data", correct: false }] },
            { q: "Which library is commonly used for interactive dashboards in Python?", opts: [{ text: "Matplotlib", correct: false }, { text: "Seaborn", correct: false }, { text: "Statsmodels", correct: false }, { text: "Plotly/Dash", correct: true }] },
            { q: "In Matplotlib, what command displays the plot?", opts: [{ text: "plt.render()", correct: false }, { text: "plt.display()", correct: false }, { text: "plt.plot()", correct: false }, { text: "plt.show()", correct: true }] }
        ]
    },
    "machine-learning": {
        title: "Machine Learning",
        questions: [
            { q: "Which type of machine learning involves predicting a continuous numerical value?", opts: [{ text: "Clustering", correct: false }, { text: "Regression", correct: true }, { text: "Classification", correct: false }, { text: "Dimensionality Reduction", correct: false }] },
            { q: "What is supervised learning?", opts: [{ text: "Learning with labeled data", correct: true }, { text: "Learning through rewards", correct: false }, { text: "Learning without data", correct: false }, { text: "Learning with unlabeled data", correct: false }] },
            { q: "Which metric is commonly used to evaluate a classification model?", opts: [{ text: "Accuracy", correct: true }, { text: "Mean Squared Error", correct: false }, { text: "Silhouette Score", correct: false }, { text: "R-squared", correct: false }] },
            { q: "What does 'overfitting' mean?", opts: [{ text: "The model performs poorly on all data", correct: false }, { text: "The model trains too quickly", correct: false }, { text: "The model performs well on training data but poorly on unseen data", correct: true }, { text: "The model is too simple", correct: false }] },
            { q: "Which algorithm is an example of an ensemble method?", opts: [{ text: "Random Forest", correct: true }, { text: "Linear Regression", correct: false }, { text: "Logistic Regression", correct: false }, { text: "K-Means", correct: false }] },
            { q: "What is the purpose of a train/test split?", opts: [{ text: "To reduce the number of features", correct: false }, { text: "To evaluate the model's performance on unseen data", correct: true }, { text: "To train the model faster", correct: false }, { text: "To increase the size of the dataset", correct: false }] }
        ]
    },
    "nlp-fundamentals": {
        title: "NLP Fundamentals",
        questions: [
            { q: "What is tokenization in NLP?", opts: [{ text: "Encrypting text", correct: false }, { text: "Translating text", correct: false }, { text: "Splitting text into smaller units like words", correct: true }, { text: "Converting text to speech", correct: false }] },
            { q: "What is 'stop word' removal?", opts: [{ text: "Removing numbers", correct: false }, { text: "Removing offensive language", correct: false }, { text: "Removing punctuation", correct: false }, { text: "Removing common words like 'the', 'is', 'in' that carry little meaning", correct: true }] },
            { q: "What does TF-IDF stand for?", opts: [{ text: "Term Frequency-Inverse Document Frequency", correct: true }, { text: "Term Format-Inverse Data Frequency", correct: false }, { text: "Text Frequency-Inverse Document Format", correct: false }, { text: "Text Format-Inverse Data Format", correct: false }] },
            { q: "What is stemming?", opts: [{ text: "Converting words to numbers", correct: false }, { text: "Reducing words to their root form", correct: true }, { text: "Translating words", correct: false }, { text: "Finding synonyms", correct: false }] },
            { q: "Which of the following is a common NLP task?", opts: [{ text: "Sentiment Analysis", correct: true }, { text: "Database Querying", correct: false }, { text: "Image Recognition", correct: false }, { text: "Pathfinding", correct: false }] },
            { q: "What is Word2Vec?", opts: [{ text: "A tokenization algorithm", correct: false }, { text: "A translation model", correct: false }, { text: "A spell checker", correct: false }, { text: "A technique to convert words into dense vectors", correct: true }] }
        ]
    },
    "transformers-llms": {
        title: "Transformers & LLMs",
        questions: [
            { q: "What mechanism is central to the Transformer architecture?", opts: [{ text: "Pooling", correct: false }, { text: "Convolution", correct: false }, { text: "Recurrence", correct: false }, { text: "Self-Attention", correct: true }] },
            { q: "What does LLM stand for?", opts: [{ text: "Large Linear Model", correct: false }, { text: "Local Language Machine", correct: false }, { text: "Large Language Model", correct: true }, { text: "Local Linear Machine", correct: false }] },
            { q: "Which paper introduced the Transformer architecture?", opts: [{ text: "Deep Residual Learning", correct: false }, { text: "Attention Is All You Need", correct: true }, { text: "ImageNet Classification", correct: false }, { text: "BERT: Pre-training of Deep Bidirectional Transformers", correct: false }] },
            { q: "What is 'fine-tuning' in the context of LLMs?", opts: [{ text: "Training a model from scratch", correct: false }, { text: "Compressing the model", correct: false }, { text: "Training a pre-trained model on a specific task or dataset", correct: true }, { text: "Translating the model's output", correct: false }] },
            { q: "What is GPT an acronym for?", opts: [{ text: "Generative Predictive Text", correct: false }, { text: "Generative Pre-trained Transformer", correct: true }, { text: "General Predictive Text", correct: false }, { text: "General Purpose Transformer", correct: false }] },
            { q: "What is the purpose of the 'decoder' in a Transformer?", opts: [{ text: "To process the input sequence", correct: false }, { text: "To calculate loss", correct: false }, { text: "To generate the output sequence", correct: true }, { text: "To compress data", correct: false }] }
        ]
    },
    "linux-bash": {
        title: "Linux & Bash Scripting",
        questions: [
            { q: "Which command is used to list files in a Linux directory?", opts: [{ text: "cd", correct: false }, { text: "ls", correct: true }, { text: "mkdir", correct: false }, { text: "pwd", correct: false }] },
            { q: "How do you change directories in Linux?", opts: [{ text: "cd", correct: true }, { text: "cp", correct: false }, { text: "mv", correct: false }, { text: "ls", correct: false }] },
            { q: "What command is used to display the contents of a file?", opts: [{ text: "echo", correct: false }, { text: "cat", correct: true }, { text: "find", correct: false }, { text: "grep", correct: false }] },
            { q: "Which command searches for a pattern in a file?", opts: [{ text: "search", correct: false }, { text: "find", correct: false }, { text: "locate", correct: false }, { text: "grep", correct: true }] },
            { q: "How do you change file permissions?", opts: [{ text: "chown", correct: false }, { text: "passwd", correct: false }, { text: "chmod", correct: true }, { text: "sudo", correct: false }] },
            { q: "What does 'pwd' stand for?", opts: [{ text: "Password", correct: false }, { text: "Process Working Directory", correct: false }, { text: "Personal Web Directory", correct: false }, { text: "Print Working Directory", correct: true }] }
        ]
    },
    "docker": {
        title: "Containerization",
        questions: [
            { q: "What file contains instructions to build a Docker image?", opts: [{ text: "DockerConfig", correct: false }, { text: "DockerImage", correct: false }, { text: "Dockerfile", correct: true }, { text: "Containerfile", correct: false }] },
            { q: "What is a Docker container?", opts: [{ text: "A lightweight, standalone, executable package of software", correct: true }, { text: "A database", correct: false }, { text: "A virtual machine", correct: false }, { text: "A code repository", correct: false }] },
            { q: "Which command is used to run a Docker container?", opts: [{ text: "docker run", correct: true }, { text: "docker build", correct: false }, { text: "docker execute", correct: false }, { text: "docker start", correct: false }] },
            { q: "What is Docker Hub?", opts: [{ text: "A programming language", correct: false }, { text: "A cloud-based registry service for sharing Docker images", correct: true }, { text: "A local network", correct: false }, { text: "A continuous integration tool", correct: false }] },
            { q: "Which command builds an image from a Dockerfile?", opts: [{ text: "docker make", correct: false }, { text: "docker compile", correct: false }, { text: "docker create", correct: false }, { text: "docker build", correct: true }] },
            { q: "What is Docker Compose used for?", opts: [{ text: "Monitoring containers", correct: false }, { text: "Hosting Docker images", correct: false }, { text: "Writing Dockerfiles", correct: false }, { text: "Defining and running multi-container Docker applications", correct: true }] }
        ]
    },
    "cicd": {
        title: "CI/CD Pipelines",
        questions: [
            { q: "What does CI stand for in CI/CD?", opts: [{ text: "Continuous Installation", correct: false }, { text: "Continuous Integration", correct: true }, { text: "Controlled Integration", correct: false }, { text: "Central Integration", correct: false }] },
            { q: "What does CD typically stand for?", opts: [{ text: "Continuous Delivery / Deployment", correct: true }, { text: "Controlled Delivery", correct: false }, { text: "Central Deployment", correct: false }, { text: "Continuous Development", correct: false }] },
            { q: "Which tool is commonly used for CI/CD?", opts: [{ text: "Photoshop", correct: false }, { text: "Excel", correct: false }, { text: "Jenkins", correct: true }, { text: "Word", correct: false }] },
            { q: "What is the main goal of CI/CD?", opts: [{ text: "To manage databases", correct: false }, { text: "To write code faster", correct: false }, { text: "To design user interfaces", correct: false }, { text: "To automate the software release process", correct: true }] },
            { q: "What is a 'pipeline' in CI/CD?", opts: [{ text: "A database table", correct: false }, { text: "A code repository", correct: false }, { text: "A network connection", correct: false }, { text: "A series of automated steps to deliver software", correct: true }] },
            { q: "Which platform provides built-in CI/CD called 'Actions'?", opts: [{ text: "StackOverflow", correct: false }, { text: "GitHub", correct: true }, { text: "Jira", correct: false }, { text: "Trello", correct: false }] }
        ]
    },
    "cloud-providers": {
        title: "Cloud Platforms",
        questions: [
            { q: "Which is NOT a major public cloud provider?", opts: [{ text: "Apple Cloud", correct: true }, { text: "Microsoft Azure", correct: false }, { text: "Amazon Web Services", correct: false }, { text: "Google Cloud Platform", correct: false }] },
            { q: "What does AWS stand for?", opts: [{ text: "Automated Web Systems", correct: false }, { text: "Amazon Web Services", correct: true }, { text: "Amazon Web Solutions", correct: false }, { text: "Advanced Web Solutions", correct: false }] },
            { q: "What is an S3 bucket in AWS?", opts: [{ text: "A virtual machine", correct: false }, { text: "A database", correct: false }, { text: "Object storage", correct: true }, { text: "A serverless function", correct: false }] },
            { q: "Which Azure service is used for hosting virtual machines?", opts: [{ text: "Azure Blob Storage", correct: false }, { text: "Azure Virtual Machines", correct: true }, { text: "Azure Functions", correct: false }, { text: "Azure SQL", correct: false }] },
            { q: "What is 'Serverless' computing?", opts: [{ text: "A cloud model where the provider dynamically manages the allocation of machine resources", correct: true }, { text: "A local server setup", correct: false }, { text: "Computing without any physical servers", correct: false }, { text: "A type of database", correct: false }] },
            { q: "What is a VPC?", opts: [{ text: "Visual Private Cloud", correct: false }, { text: "Virtual Public Cloud", correct: false }, { text: "Virtual Private Cloud", correct: true }, { text: "Visual Public Cloud", correct: false }] }
        ]
    },
    "design-fundamentals": {
        title: "Design Principles",
        questions: [
            { q: "Which principle refers to the arrangement of elements to signify importance?", opts: [{ text: "Alignment", correct: false }, { text: "Visual Hierarchy", correct: true }, { text: "Contrast", correct: false }, { text: "Proximity", correct: false }] },
            { q: "What is 'White Space' in design?", opts: [{ text: "A background image", correct: false }, { text: "The color white", correct: false }, { text: "Empty space around elements", correct: true }, { text: "A specific font", correct: false }] },
            { q: "What is the purpose of contrast?", opts: [{ text: "To hide elements", correct: false }, { text: "To make elements stand out and improve readability", correct: true }, { text: "To make everything look the same", correct: false }, { text: "To reduce file size", correct: false }] },
            { q: "What does 'Proximity' imply in design?", opts: [{ text: "Items should be colorful", correct: false }, { text: "Items should be random", correct: false }, { text: "Related items should be grouped together", correct: true }, { text: "Items should be evenly spaced", correct: false }] },
            { q: "What is Typography?", opts: [{ text: "The study of colors", correct: false }, { text: "The study of shapes", correct: false }, { text: "The study of animation", correct: false }, { text: "The art and technique of arranging type", correct: true }] },
            { q: "Which color scheme uses variations in lightness and saturation of a single color?", opts: [{ text: "Analogous", correct: false }, { text: "Monochromatic", correct: true }, { text: "Triadic", correct: false }, { text: "Complementary", correct: false }] }
        ]
    },
    "figma": {
        title: "Figma Mastery",
        questions: [
            { q: "What Figma feature automatically resizes frames based on their content?", opts: [{ text: "Components", correct: false }, { text: "Auto Layout", correct: true }, { text: "Constraints", correct: false }, { text: "Variants", correct: false }] },
            { q: "What are 'Components' in Figma?", opts: [{ text: "Text styles", correct: false }, { text: "Color palettes", correct: false }, { text: "Reusable design elements", correct: true }, { text: "Exported images", correct: false }] },
            { q: "How do you create a Prototype link in Figma?", opts: [{ text: "Write HTML code", correct: false }, { text: "Create a new frame", correct: false }, { text: "Export the file", correct: false }, { text: "Switch to the Prototype tab and connect nodes", correct: true }] },
            { q: "What is the shortcut to create a Frame in Figma?", opts: [{ text: "F", correct: true }, { text: "T", correct: false }, { text: "R", correct: false }, { text: "C", correct: false }] },
            { q: "What do 'Constraints' do in Figma?", opts: [{ text: "Define how layers respond when their parent frame is resized", correct: true }, { text: "Lock layers from editing", correct: false }, { text: "Limit the number of layers", correct: false }, { text: "Restrict who can view the file", correct: false }] },
            { q: "Which feature allows you to combine multiple component variations?", opts: [{ text: "Pages", correct: false }, { text: "Groups", correct: false }, { text: "Frames", correct: false }, { text: "Variants", correct: true }] }
        ]
    },
    "user-research": {
        title: "User Research",
        questions: [
            { q: "What is a 'Persona' in UX design?", opts: [{ text: "A color palette", correct: false }, { text: "A type of animation", correct: false }, { text: "A software testing tool", correct: false }, { text: "A fictional character representing a user type", correct: true }] },
            { q: "What is A/B testing?", opts: [{ text: "A type of user interview", correct: false }, { text: "Testing software bugs", correct: false }, { text: "Testing the alphabet", correct: false }, { text: "Comparing two versions of a webpage to see which performs better", correct: true }] },
            { q: "What is a wireframe?", opts: [{ text: "A fully coded website", correct: false }, { text: "A final polished design", correct: false }, { text: "A low-fidelity visual representation of a layout", correct: true }, { text: "A user survey", correct: false }] },
            { q: "What is the purpose of usability testing?", opts: [{ text: "To design a logo", correct: false }, { text: "To measure loading speed", correct: false }, { text: "To evaluate a product by testing it on users", correct: true }, { text: "To check code for errors", correct: false }] },
            { q: "What is qualitative research?", opts: [{ text: "Research using surveys", correct: false }, { text: "Research using A/B tests", correct: false }, { text: "Research based on non-numerical data like observations and interviews", correct: true }, { text: "Research based on numbers and statistics", correct: false }] },
            { q: "What does 'UX' stand for?", opts: [{ text: "User Expression", correct: false }, { text: "Unified Expression", correct: false }, { text: "User Experience", correct: true }, { text: "Unified Experience", correct: false }] }
        ]
    },
    "mobile-fundamentals": {
        title: "Mobile Fundamentals",
        questions: [
            { q: "Which language is primarily used for Flutter development?", opts: [{ text: "JavaScript", correct: false }, { text: "Java", correct: false }, { text: "Dart", correct: true }, { text: "Swift", correct: false }] },
            { q: "Which language is used for native iOS development?", opts: [{ text: "Swift", correct: true }, { text: "Kotlin", correct: false }, { text: "Java", correct: false }, { text: "C#", correct: false }] },
            { q: "Which language is currently the official standard for native Android development?", opts: [{ text: "Java", correct: false }, { text: "Objective-C", correct: false }, { text: "Swift", correct: false }, { text: "Kotlin", correct: true }] },
            { q: "What is an API?", opts: [{ text: "Apple Programming Interface", correct: false }, { text: "Application Protocol Interface", correct: false }, { text: "Android Programming Interface", correct: false }, { text: "Application Programming Interface", correct: true }] },
            { q: "What does 'Responsive Design' mean?", opts: [{ text: "Designing a secure app", correct: false }, { text: "Designing a UI that adapts to different screen sizes", correct: true }, { text: "Designing a fast app", correct: false }, { text: "Designing an app with animations", correct: false }] },
            { q: "Which of these is a mobile operating system?", opts: [{ text: "macOS", correct: false }, { text: "Windows", correct: false }, { text: "Linux", correct: false }, { text: "Android", correct: true }] }
        ]
    },
    "react-native-flutter": {
        title: "Cross-Platform Frameworks",
        questions: [
            { q: "React Native allows you to build mobile apps using:", opts: [{ text: "JavaScript and React", correct: true }, { text: "Ruby", correct: false }, { text: "Python", correct: false }, { text: "C#", correct: false }] },
            { q: "Who created Flutter?", opts: [{ text: "Apple", correct: false }, { text: "Google", correct: true }, { text: "Microsoft", correct: false }, { text: "Facebook", correct: false }] },
            { q: "What is a 'Widget' in Flutter?", opts: [{ text: "A background process", correct: false }, { text: "A network request", correct: false }, { text: "The basic building block of a Flutter UI", correct: true }, { text: "A database table", correct: false }] },
            { q: "Which component is used for scrolling lists in React Native?", opts: [{ text: "ScrollViewer", correct: false }, { text: "FlatList", correct: true }, { text: "ListView", correct: false }, { text: "RecyclerList", correct: false }] },
            { q: "Who created React Native?", opts: [{ text: "Facebook", correct: true }, { text: "Twitter", correct: false }, { text: "Google", correct: false }, { text: "Amazon", correct: false }] },
            { q: "What compiles React Native code to native views?", opts: [{ text: "Webpack", correct: false }, { text: "Gradle", correct: false }, { text: "Babel", correct: false }, { text: "Metro bundler", correct: true }] }
        ]
    },
    "mobile-ui": {
        title: "Mobile UI",
        questions: [
            { q: "What is a common pattern for navigating between sections in a mobile app?", opts: [{ text: "Browser Back Button", correct: false }, { text: "Scrollbars", correct: false }, { text: "Hyperlinks in text", correct: false }, { text: "Bottom Tab Navigation", correct: true }] },
            { q: "What is a 'Hamburger Menu'?", opts: [{ text: "A database schema", correct: false }, { text: "A type of food delivery app", correct: false }, { text: "An icon consisting of three horizontal lines used for navigation", correct: true }, { text: "A color palette", correct: false }] },
            { q: "Which design system was developed by Google?", opts: [{ text: "Human Interface Guidelines", correct: false }, { text: "Material Design", correct: true }, { text: "Carbon Design", correct: false }, { text: "Fluent Design", correct: false }] },
            { q: "What is a 'Modal' in UI design?", opts: [{ text: "A specific font", correct: false }, { text: "A background image", correct: false }, { text: "A type of animation", correct: false }, { text: "A dialog box that requires users to interact with it before returning to the main app", correct: true }] },
            { q: "What does 'Onboarding' refer to?", opts: [{ text: "Updating the app", correct: false }, { text: "Loading data", correct: false }, { text: "The process of familiarizing a new user with an app", correct: true }, { text: "Logging out", correct: false }] },
            { q: "Which element provides a brief, temporary message at the bottom of the screen?", opts: [{ text: "Snackbar/Toast", correct: true }, { text: "Dialog", correct: false }, { text: "Tooltip", correct: false }, { text: "Banner", correct: false }] }
        ]
    },
    "networking-basics": {
        title: "Networking Basics",
        questions: [
            { q: "What does IP stand for in networking?", opts: [{ text: "Internet Protocol", correct: true }, { text: "Internal Protocol", correct: false }, { text: "International Provider", correct: false }, { text: "Internet Provider", correct: false }] },
            { q: "What is the function of a router?", opts: [{ text: "To write code", correct: false }, { text: "To display webpages", correct: false }, { text: "To store databases", correct: false }, { text: "To forward data packets between computer networks", correct: true }] },
            { q: "What does DNS do?", opts: [{ text: "Assigns IP addresses", correct: false }, { text: "Transfers files", correct: false }, { text: "Secures network traffic", correct: false }, { text: "Translates domain names to IP addresses", correct: true }] },
            { q: "Which protocol is used to transfer webpages?", opts: [{ text: "FTP", correct: false }, { text: "SSH", correct: false }, { text: "SMTP", correct: false }, { text: "HTTP", correct: true }] },
            { q: "What is a MAC address?", opts: [{ text: "A website URL", correct: false }, { text: "An IP address", correct: false }, { text: "A routing protocol", correct: false }, { text: "A unique identifier assigned to a network interface controller", correct: true }] },
            { q: "What does LAN stand for?", opts: [{ text: "Logical Area Network", correct: false }, { text: "Local Area Network", correct: true }, { text: "Large Area Network", correct: false }, { text: "Local Access Network", correct: false }] }
        ]
    },
    "security-fundamentals": {
        title: "Security Fundamentals",
        questions: [
            { q: "What is the primary purpose of encryption?", opts: [{ text: "To make data unreadable to unauthorized users", correct: true }, { text: "To speed up data transmission", correct: false }, { text: "To make data smaller", correct: false }, { text: "To organize data in a database", correct: false }] },
            { q: "What is Phishing?", opts: [{ text: "A secure network", correct: false }, { text: "An encryption algorithm", correct: false }, { text: "A type of firewall", correct: false }, { text: "A cyber attack that uses disguised email as a weapon", correct: true }] },
            { q: "What does VPN stand for?", opts: [{ text: "Virtual Public Network", correct: false }, { text: "Virtual Private Network", correct: true }, { text: "Visual Public Network", correct: false }, { text: "Visual Private Network", correct: false }] },
            { q: "What is a Firewall?", opts: [{ text: "An encryption tool", correct: false }, { text: "A network security system that monitors and controls traffic", correct: true }, { text: "A database", correct: false }, { text: "A computer virus", correct: false }] },
            { q: "What is Malware?", opts: [{ text: "A type of hardware", correct: false }, { text: "A secure operating system", correct: false }, { text: "A networking protocol", correct: false }, { text: "Malicious software designed to cause damage", correct: true }] },
            { q: "What does HTTPS provide over HTTP?", opts: [{ text: "Encryption and secure communication", correct: true }, { text: "Larger file sizes", correct: false }, { text: "Faster speeds", correct: false }, { text: "Better graphics", correct: false }] }
        ]
    },
    "ethical-hacking": {
        title: "Ethical Hacking",
        questions: [
            { q: "What is 'penetration testing'?", opts: [{ text: "Testing the durability of hardware", correct: false }, { text: "Writing secure code", correct: false }, { text: "Authorized simulated cyberattack to evaluate security", correct: true }, { text: "Installing antivirus software", correct: false }] },
            { q: "Who is a 'White Hat' hacker?", opts: [{ text: "An ethical hacker who identifies vulnerabilities to fix them", correct: true }, { text: "A software developer", correct: false }, { text: "A malicious hacker", correct: false }, { text: "A government spy", correct: false }] },
            { q: "What is a DDoS attack?", opts: [{ text: "Distributed Denial of Service", correct: true }, { text: "Direct Data Overload System", correct: false }, { text: "Direct Denial of Security", correct: false }, { text: "Distributed Data Operator Service", correct: false }] },
            { q: "Which tool is commonly used for network scanning?", opts: [{ text: "Excel", correct: false }, { text: "Photoshop", correct: false }, { text: "Visual Studio", correct: false }, { text: "Nmap", correct: true }] },
            { q: "What is Social Engineering?", opts: [{ text: "Designing databases", correct: false }, { text: "Manipulating people into giving up confidential information", correct: true }, { text: "Building networks", correct: false }, { text: "Writing secure code", correct: false }] },
            { q: "What is a 'zero-day' vulnerability?", opts: [{ text: "A bug fixed on day zero", correct: false }, { text: "A completely secure system", correct: false }, { text: "A software flaw unknown to the vendor", correct: true }, { text: "A network failure", correct: false }] }
        ]
    },
    "excel-advanced": {
        title: "Advanced Excel",
        questions: [
            { q: "Which Excel feature allows you to summarize and analyze large data dynamically?", opts: [{ text: "Conditional Formatting", correct: false }, { text: "Macros", correct: false }, { text: "Pivot Tables", correct: true }, { text: "VLOOKUP", correct: false }] },
            { q: "What does VLOOKUP do?", opts: [{ text: "Formats cells", correct: false }, { text: "Searches for a value in the first column of a table array and returns a value in the same row", correct: true }, { text: "Creates a chart", correct: false }, { text: "Calculates the sum of a column", correct: false }] },
            { q: "Which function is used to add numbers conditionally?", opts: [{ text: "TOTALIF", correct: false }, { text: "ADDIF", correct: false }, { text: "SUMIF", correct: true }, { text: "CONDITIONSUM", correct: false }] },
            { q: "What is a Macro in Excel?", opts: [{ text: "A large file", correct: false }, { text: "A specific chart type", correct: false }, { text: "A formatting tool", correct: false }, { text: "A recorded sequence of commands to automate tasks", correct: true }] },
            { q: "Which feature highlights cells that meet a certain criteria?", opts: [{ text: "Pivot Tables", correct: false }, { text: "Conditional Formatting", correct: true }, { text: "Filtering", correct: false }, { text: "Data Validation", correct: false }] },
            { q: "What does the INDEX function do?", opts: [{ text: "Looks up a value vertically", correct: false }, { text: "Calculates the average", correct: false }, { text: "Returns the value of a cell in a specific row and column", correct: true }, { text: "Finds the position of an item", correct: false }] }
        ]
    },
    "sql-analytics": {
        title: "SQL for Analytics",
        questions: [
            { q: "Which SQL clause groups rows with the same values into summary rows?", opts: [{ text: "JOIN", correct: false }, { text: "GROUP BY", correct: true }, { text: "ORDER BY", correct: false }, { text: "WHERE", correct: false }] },
            { q: "Which function is used to count the number of rows?", opts: [{ text: "MAX()", correct: false }, { text: "AVG()", correct: false }, { text: "COUNT()", correct: true }, { text: "SUM()", correct: false }] },
            { q: "What does the HAVING clause do?", opts: [{ text: "Filters records that work on summarized GROUP BY results", correct: true }, { text: "Selects distinct values", correct: false }, { text: "Sorts the data", correct: false }, { text: "Joins two tables", correct: false }] },
            { q: "Which JOIN returns all rows when there is a match in either left or right table?", opts: [{ text: "LEFT JOIN", correct: false }, { text: "FULL OUTER JOIN", correct: true }, { text: "RIGHT JOIN", correct: false }, { text: "INNER JOIN", correct: false }] },
            { q: "What is a Subquery?", opts: [{ text: "A query nested inside another query", correct: true }, { text: "A primary key", correct: false }, { text: "A database", correct: false }, { text: "A table", correct: false }] },
            { q: "Which keyword is used to sort the result-set?", opts: [{ text: "ORDER BY", correct: true }, { text: "FILTER BY", correct: false }, { text: "SORT BY", correct: false }, { text: "GROUP BY", correct: false }] }
        ]
    },
    "bi-tools": {
        title: "BI Tools",
        questions: [
            { q: "What is the primary purpose of BI tools like Tableau or Power BI?", opts: [{ text: "To visualize and analyze data", correct: true }, { text: "To develop web apps", correct: false }, { text: "To write databases", correct: false }, { text: "To train AI models", correct: false }] },
            { q: "What does BI stand for?", opts: [{ text: "Basic Information", correct: false }, { text: "Business Information", correct: false }, { text: "Business Intelligence", correct: true }, { text: "Basic Intelligence", correct: false }] },
            { q: "Which company developed Power BI?", opts: [{ text: "Tableau", correct: false }, { text: "Microsoft", correct: true }, { text: "Google", correct: false }, { text: "Amazon", correct: false }] },
            { q: "What is a 'Dashboard' in BI?", opts: [{ text: "A database", correct: false }, { text: "A spreadsheet", correct: false }, { text: "A server", correct: false }, { text: "A visual display of the most important information", correct: true }] },
            { q: "Which of the following is a key feature of Tableau?", opts: [{ text: "Writing backend code", correct: false }, { text: "Training neural networks", correct: false }, { text: "Drag-and-drop interactive visualizations", correct: true }, { text: "Hosting websites", correct: false }] },
            { q: "What does ETL stand for?", opts: [{ text: "Execute, Transfer, Load", correct: false }, { text: "Extract, Transfer, Logic", correct: false }, { text: "Extract, Transform, Load", correct: true }, { text: "Execute, Transform, Logic", correct: false }] }
        ]
    },
    "capstone": {
        title: "Capstone Project",
        questions: [
            { q: "What is the purpose of a capstone project?", opts: [{ text: "To write a research paper", correct: false }, { text: "To demonstrate job-ready skills through a real-world project", correct: true }, { text: "To study theory only", correct: false }, { text: "To pass a multiple-choice exam", correct: false }] },
            { q: "Which is a typical step in a capstone project?", opts: [{ text: "Watching tutorials passively", correct: false }, { text: "Planning and requirement gathering", correct: true }, { text: "Memorizing textbook definitions", correct: false }, { text: "Taking daily quizzes", correct: false }] },
            { q: "What is the benefit of a portfolio project?", opts: [{ text: "It showcases your practical skills to employers", correct: true }, { text: "It provides a certificate automatically", correct: false }, { text: "It pays you money immediately", correct: false }, { text: "It replaces a college degree", correct: false }] },
            { q: "What does 'Deployment' mean in a software project?", opts: [{ text: "Designing the UI", correct: false }, { text: "Making the application available for users on the internet", correct: true }, { text: "Writing the code", correct: false }, { text: "Testing the app locally", correct: false }] },
            { q: "Why is writing a README file important for a project?", opts: [{ text: "It secures the code", correct: false }, { text: "It explains what the project does and how to run it", correct: true }, { text: "It makes the code run faster", correct: false }, { text: "It is required by the compiler", correct: false }] },
            { q: "What is version control (like Git) used for?", opts: [{ text: "To write code faster", correct: false }, { text: "To deploy the app", correct: false }, { text: "To track changes in code and collaborate with others", correct: true }, { text: "To design graphics", correct: false }] }
        ]
    }
};

// ── Option labels ──
const OPTION_LABELS = ['A', 'B', 'C', 'D'];

// ── State ──
let quizTimerInterval = null;
let timeLeft = 10;
let quizPhase = 'read';      // 'read' | 'answer'
let currentQuestionIndex = 0;
let selectedOptionIndex = null;
let score = 0;
let moduleId = 'html';
let questions = [];
let isVerify = false;
let isMandatory = false;

document.addEventListener("DOMContentLoaded", () => {
    // Enforce Fullscreen Quiz layout style
    document.body.classList.add('fullscreen-quiz');
    
    // Disable any sidebar/header links visually and functionally
    if (typeof QuizLockManager !== 'undefined') {
        QuizLockManager.disableNavigation();
    }

    // ── Read module & mode from URL ──
    const urlParams = new URLSearchParams(window.location.search);
    moduleId = urlParams.get('module') || 'html';
    isVerify = urlParams.get('verify') === 'true';
    
    // Check if mandatory sequence is active in local storage
    const hasMandatoryPending = typeof LocalStorageState !== 'undefined' && LocalStorageState.isMandatoryQuizPending();
    isMandatory = (urlParams.get('mandatory') === 'true') || hasMandatoryPending;

    let progress = null;
    let quizDetail = null;

    if (isMandatory && typeof LocalStorageState !== 'undefined') {
        progress = LocalStorageState.getCurrentQuizProgress();
        if (progress && progress.quizDetail) {
            quizDetail = progress.quizDetail;
            moduleId = quizDetail.moduleId;
        }
    }

    // TODO: Replace with GET /api/quiz/:moduleId
    const quizData = QUIZ_DATA[moduleId] || QUIZ_DATA['html'];
    questions = [...quizData.questions]; // copy array

    // ── Set page title ──
    const moduleTitle = document.getElementById('quiz-module-title');
    if (moduleTitle) {
        let titleSuffix = ' Assessment';
        if (isMandatory) titleSuffix = ' Required Assessment';
        else if (isVerify) titleSuffix = ' Verification';
        moduleTitle.textContent = quizData.title + titleSuffix;
    }

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

    // Custom exit confirmation modal elements
    const exitModal         = document.getElementById('quiz-exit-modal');
    const cancelExitBtn     = document.getElementById('btn-cancel-exit');
    const confirmExitBtn     = document.getElementById('btn-confirm-exit');

    // ── Restore saved state if exists ──
    let savedState = null;
    try {
        const raw = localStorage.getItem('xyverra_active_quiz');
        if (raw) {
            savedState = JSON.parse(raw);
        }
    } catch (e) {
        console.error("Error reading saved active quiz state:", e);
    }

    let restored = false;
    if (savedState && savedState.moduleId === moduleId && savedState.isVerify === isVerify && savedState.isMandatory === isMandatory) {
        currentQuestionIndex = savedState.currentQuestionIndex;
        score = savedState.score;
        quizPhase = savedState.quizPhase;
        timeLeft = savedState.timeLeft;
        selectedOptionIndex = savedState.selectedOptionIndex;
        questions = savedState.shuffledQuestions || questions;
        restored = true;
        console.log("Restored active quiz state from localStorage:", savedState);
    }

    // If it's mandatory, let's also check if we can restore from mandatory state
    if (!restored && isMandatory && quizDetail) {
        if (quizDetail.shuffledQuestions) {
            currentQuestionIndex = quizDetail.currentQuestionIndex;
            score = quizDetail.score;
            quizPhase = quizDetail.currentQuestionPhase || 'read';
            timeLeft = quizDetail.currentQuestionTimeLeft !== undefined ? quizDetail.currentQuestionTimeLeft : 10;
            selectedOptionIndex = quizDetail.selectedOptionIndex !== undefined ? quizDetail.selectedOptionIndex : null;
            questions = quizDetail.shuffledQuestions;
            restored = true;
            console.log("Restored active quiz from mandatoryQuizState sequence:", quizDetail);
        }
    }

    // If not restored, shuffle and start fresh!
    if (!restored) {
        currentQuestionIndex = 0;
        score = 0;
        quizPhase = 'read';
        timeLeft = 10;
        selectedOptionIndex = null;
        shuffleArray(questions);
        console.log("Started brand new quiz, shuffled questions.");
    }

    // ── Setup UI elements depending on mode ──
    if (isMandatory) {
        // Hide exit buttons & back links to enforce compliance
        const backLink = document.querySelector('.quiz-back-link');
        if (backLink) backLink.style.display = 'none';
        if (btnExitQuiz) btnExitQuiz.style.display = 'none';
    } else {
        // Standard leaving warning popup configuration
        if (btnExitQuiz) {
            btnExitQuiz.addEventListener('click', (e) => {
                e.preventDefault();
                if (exitModal) {
                    exitModal.style.display = 'flex';
                    requestAnimationFrame(() => {
                        exitModal.classList.add('active');
                    });
                }
            });
        }

        if (cancelExitBtn) {
            cancelExitBtn.addEventListener('click', () => {
                if (exitModal) {
                    exitModal.classList.remove('active');
                    setTimeout(() => {
                        exitModal.style.display = 'none';
                    }, 300);
                }
            });
        }

        if (confirmExitBtn) {
            confirmExitBtn.addEventListener('click', () => {
                clearInterval(quizTimerInterval);
                window.removeEventListener('beforeunload', handleBeforeUnload);
                clearState();
                window.location.href = isVerify ? 'skill-verification.html' : 'roadmap.html';
            });
        }
    }

    // Add beforeunload page event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // ── Next question handler ──
    btnNextQuestion.addEventListener('click', () => {
        currentQuestionIndex++;
        selectedOptionIndex = null;
        quizPhase = 'read';
        timeLeft = 10;
        loadQuestion();
    });

    // ── Start/Load the active question ──
    loadQuestion();

    // ────────────────────────────────────────────────────
    function handleBeforeUnload(e) {
        if (currentQuestionIndex < questions.length) {
            e.preventDefault();
            e.returnValue = 'Are you sure you want to leave? Your progress is saved, but you must complete this quiz to progress.';
            return e.returnValue;
        }
    }

    // ────────────────────────────────────────────────────
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // ────────────────────────────────────────────────────
    function saveState() {
        const stateObj = {
            moduleId: moduleId,
            isVerify: isVerify,
            isMandatory: isMandatory,
            currentQuestionIndex: currentQuestionIndex,
            score: score,
            quizPhase: quizPhase,
            timeLeft: timeLeft,
            selectedOptionIndex: selectedOptionIndex,
            shuffledQuestions: questions
        };
        localStorage.setItem('xyverra_active_quiz', JSON.stringify(stateObj));
        
        // Also update the mandatory sequence state if applicable
        if (isMandatory && typeof LocalStorageState !== 'undefined') {
            LocalStorageState.saveCurrentQuizProgress(
                currentQuestionIndex,
                score,
                questions,
                quizPhase,
                timeLeft,
                selectedOptionIndex
            );
        }
    }

    // ────────────────────────────────────────────────────
    function clearState() {
        localStorage.removeItem('xyverra_active_quiz');
    }

    // ────────────────────────────────────────────────────
    function drawProgressDots() {
        const dotsContainer = document.getElementById('quiz-progress-dots');
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < questions.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            if (i < currentQuestionIndex) {
                dot.classList.add('completed');
            } else if (i === currentQuestionIndex) {
                dot.classList.add('current');
            } else {
                dot.classList.add('pending');
            }
            dotsContainer.appendChild(dot);
        }
    }

    // ────────────────────────────────────────────────────
    function loadQuestion() {
        clearInterval(quizTimerInterval);
        
        // Draw segmented progress dots
        drawProgressDots();

        // Enforce saveState
        saveState();

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

        // Clear options
        quizOptionsCont.innerHTML = '';
        
        // Render option buttons
        const optionsToRender = q.opts || [];
        optionsToRender.forEach((opt, i) => {
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

        // Restore visual state if option already selected (e.g. after refresh)
        if (selectedOptionIndex !== null) {
            quizOptionsCont.classList.add('disabled');
            const selectedBtn = document.getElementById(`option-${selectedOptionIndex}`);
            const isCorrect = selectedOptionIndex >= 0 && q.opts[selectedOptionIndex] && q.opts[selectedOptionIndex].correct;
            
            if (selectedOptionIndex === -1) {
                // Was timed out
                q.opts.forEach((opt, idx) => {
                    if (opt.correct) {
                        const btn = document.getElementById(`option-${idx}`);
                        if (btn) btn.classList.add('correct');
                    }
                });
                quizStatus.textContent = "⏰ Time's up! The correct answer is highlighted.";
                quizStatus.className = 'quiz-status error';
                timerText.textContent = 'Time Up!';
            } else if (isCorrect) {
                if (selectedBtn) selectedBtn.classList.add('correct');
                quizStatus.textContent = '✅ Correct! Well done!';
                quizStatus.className = 'quiz-status success';
            } else {
                if (selectedBtn) selectedBtn.classList.add('wrong');
                quizStatus.textContent = '❌ Incorrect. The correct answer is highlighted.';
                quizStatus.className = 'quiz-status error';
                q.opts.forEach((opt, idx) => {
                    if (opt.correct) {
                        const btn = document.getElementById(`option-${idx}`);
                        if (btn) btn.classList.add('correct');
                    }
                });
            }

            timerText.textContent = 'Answered';
            btnNextQuestion.style.display = 'inline-flex';
            btnNextQuestion.textContent = currentQuestionIndex + 1 < questions.length ? 'Next Question →' : 'See Results →';
            return;
        }

        // Standard timer logic
        if (quizPhase === 'read') {
            quizOptionsCont.classList.add('disabled');
            quizStatus.textContent = 'Read the question carefully. Options will unlock in 10 seconds.';
            quizStatus.className = 'quiz-status warning';
            updateTimerBar(timeLeft, 10, timerBar);
            timerText.textContent = `${timeLeft}s Reading Time`;
        } else {
            quizOptionsCont.classList.remove('disabled');
            quizStatus.textContent = 'Select your answer!';
            quizStatus.className = 'quiz-status info';
            updateTimerBar(timeLeft, 5, timerBar);
            timerText.textContent = `${timeLeft}s to Answer`;
        }

        quizTimerInterval = setInterval(() => {
            timeLeft--;
            updateTimerBar(timeLeft, quizPhase === 'read' ? 10 : 5, timerBar);

            if (quizPhase === 'read') {
                timerText.textContent = `${timeLeft}s Reading Time`;
                if (timeLeft <= 0) {
                    quizPhase = 'answer';
                    timeLeft = 5;
                    quizOptionsCont.classList.remove('disabled');
                    quizStatus.textContent = 'Select your answer!';
                    quizStatus.className = 'quiz-status info';
                    timerText.textContent = `${timeLeft}s to Answer`;
                    updateTimerBar(timeLeft, 5, timerBar);
                }
            } else {
                timerText.textContent = `${timeLeft}s to Answer`;
                if (timeLeft <= 0) {
                    clearInterval(quizTimerInterval);
                    selectedOptionIndex = -1; // timed out
                    quizOptionsCont.classList.add('disabled');
                    
                    q.opts.forEach((opt, idx) => {
                        if (opt.correct) {
                            const btn = document.getElementById(`option-${idx}`);
                            if (btn) btn.classList.add('correct');
                        }
                    });
                    
                    quizStatus.textContent = "⏰ Time's up! The correct answer is highlighted.";
                    quizStatus.className = 'quiz-status error';
                    timerText.textContent = 'Time Up!';
                    btnNextQuestion.style.display = 'inline-flex';
                    btnNextQuestion.textContent = currentQuestionIndex + 1 < questions.length ? 'Next Question →' : 'See Results →';
                }
            }
            saveState(); // Save state on every timer tick!
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
            if (selectedBtn) selectedBtn.classList.add('correct');
            quizStatus.textContent = '✅ Correct! Well done!';
            quizStatus.className = 'quiz-status success';
            score++;
        } else {
            if (selectedBtn) selectedBtn.classList.add('wrong');
            quizStatus.textContent = '❌ Incorrect. The correct answer is highlighted.';
            quizStatus.className = 'quiz-status error';
            
            if (opts) {
                opts.forEach((opt, i) => {
                    if (opt.correct) {
                        const btn = document.getElementById(`option-${i}`);
                        if (btn) btn.classList.add('correct');
                    }
                });
            }
        }

        timerText.textContent = 'Answered';
        btnNextQuestion.style.display = 'inline-flex';
        btnNextQuestion.textContent = currentQuestionIndex + 1 < questions.length ? 'Next Question →' : 'See Results →';
        
        saveState(); // Save state when option selected!
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
        
        // Remove the page exit warning popup
        window.removeEventListener('beforeunload', handleBeforeUnload);
        
        // Clear active quiz state since it's completed!
        clearState();

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
        if (timerBar) {
            timerBar.style.width = '100%';
            timerBar.style.background = passed
                ? 'linear-gradient(90deg, var(--success), #34D399)'
                : 'linear-gradient(90deg, var(--error), #F87171)';
        }

        timerText.textContent = passed ? 'Passed!' : '💪 Keep Learning';
        quizStatus.textContent = '';

        // ── Actions Setup for Results Screen ──
        const footerActions = document.querySelector('.quiz-footer-actions');
        if (footerActions) {
            footerActions.innerHTML = ''; // Clear standard action buttons
        }

        if (isMandatory && typeof RoadmapUnlockLogic !== 'undefined') {
            if (passed) {
                // Handle passing logic via RoadmapUnlockLogic
                RoadmapUnlockLogic.handlePass(moduleId);

                const hasNext = progress && (progress.currentQuizIndex + 1 < progress.totalQuizzes);
                
                if (hasNext) {
                    const nextQuizBtn = document.createElement('button');
                    nextQuizBtn.className = 'btn btn-primary';
                    nextQuizBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                    nextQuizBtn.innerHTML = 'Start Next Required Quiz <i class="fas fa-arrow-right"></i>';
                    nextQuizBtn.addEventListener('click', () => {
                        RoadmapUnlockLogic.advanceToNextQuiz();
                        window.location.reload();
                    });
                    if (footerActions) footerActions.appendChild(nextQuizBtn);
                } else {
                    const unlockBtn = document.createElement('button');
                    unlockBtn.className = 'btn btn-primary';
                    unlockBtn.style.background = 'linear-gradient(135deg, #6366F1, #4F46E5)';
                    unlockBtn.innerHTML = 'Complete & Unlock Roadmap <i class="fas fa-unlock"></i>';
                    unlockBtn.addEventListener('click', () => {
                        RoadmapUnlockLogic.completeVerification();
                        window.location.href = 'roadmap.html';
                    });
                    if (footerActions) footerActions.appendChild(unlockBtn);
                }
            } else {
                const retakeBtn = document.createElement('button');
                retakeBtn.className = 'btn btn-primary';
                retakeBtn.style.background = 'linear-gradient(135deg, #EF4444, #F59E0B)';
                retakeBtn.innerHTML = '<i class="fas fa-redo"></i> Retake Required Quiz';
                retakeBtn.addEventListener('click', () => {
                    RoadmapUnlockLogic.handleFail(moduleId);
                    window.location.reload();
                });
                if (footerActions) footerActions.appendChild(retakeBtn);
            }
        } else {
            // Non-mandatory standard quiz handling
            if (passed) {
                let completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
                if (!completedModules.includes(moduleId)) {
                    completedModules.push(moduleId);
                    localStorage.setItem('completedModules', JSON.stringify(completedModules));
                }

                let currentScore = parseInt(localStorage.getItem('xyverra_skill_score') || '0');
                localStorage.setItem('xyverra_skill_score', currentScore + 10);
            }

            const doneBtn = document.createElement('button');
            doneBtn.className = 'btn btn-primary';
            doneBtn.innerHTML = isVerify ? '← Back to Verification' : '← Back to Roadmap';
            doneBtn.addEventListener('click', () => {
                window.location.href = isVerify 
                    ? (passed ? 'skill-verification.html' : `skill-verification.html?failed=${moduleId}`)
                    : 'roadmap.html';
            });
            if (footerActions) footerActions.appendChild(doneBtn);
        }
    }
});
});
