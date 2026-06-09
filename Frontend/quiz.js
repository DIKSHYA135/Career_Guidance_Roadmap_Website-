/* =========================================================
   quiz.js — Xyverra Assessment Engine
   All localStorage calls are marked with TODO comments
   so they can be replaced with real API calls later.
   ========================================================= */

// ── Quiz Data (will come from GET /api/quiz/:moduleId in production) ──
const QUIZ_DATA = {
    "html": {
        "title": "HTML Fundamentals",
        "questions": [
            {
                "q": "What is the primary purpose of semantic HTML tags?",
                "opts": [
                    {
                        "text": "To execute JavaScript code locally on the client.",
                        "correct": false
                    },
                    {
                        "text": "To provide meaning to the structure for browsers and screen readers.",
                        "correct": true
                    },
                    {
                        "text": "To style the webpage elements faster.",
                        "correct": false
                    },
                    {
                        "text": "To connect directly to a server database.",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which HTML tag is used to define the most important heading?",
                "opts": [
                    {
                        "text": "<heading>",
                        "correct": false
                    },
                    {
                        "text": "<h1>",
                        "correct": true
                    },
                    {
                        "text": "<head>",
                        "correct": false
                    },
                    {
                        "text": "<h6>",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the 'alt' attribute in an <img> tag provide?",
                "opts": [
                    {
                        "text": "Image animation",
                        "correct": false
                    },
                    {
                        "text": "A link to the image source",
                        "correct": false
                    },
                    {
                        "text": "Alternative text for accessibility",
                        "correct": true
                    },
                    {
                        "text": "Image alignment",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which element is used to create a hyperlink?",
                "opts": [
                    {
                        "text": "<link>",
                        "correct": false
                    },
                    {
                        "text": "<href>",
                        "correct": false
                    },
                    {
                        "text": "<a>",
                        "correct": true
                    },
                    {
                        "text": "<url>",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tag is used to create an unordered list?",
                "opts": [
                    {
                        "text": "<list>",
                        "correct": false
                    },
                    {
                        "text": "<ul>",
                        "correct": true
                    },
                    {
                        "text": "<li>",
                        "correct": false
                    },
                    {
                        "text": "<ol>",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the correct HTML element for inserting a line break?",
                "opts": [
                    {
                        "text": "<br>",
                        "correct": true
                    },
                    {
                        "text": "<break>",
                        "correct": false
                    },
                    {
                        "text": "<hr>",
                        "correct": false
                    },
                    {
                        "text": "<lb>",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does HTML stand for?",
                "opts": [
                    {
                        "text": "Hyper Text Preprocessor",
                        "correct": false
                    },
                    {
                        "text": "Hyper Text Markup Language",
                        "correct": true
                    },
                    {
                        "text": "Hyper Text Multiple Language",
                        "correct": false
                    },
                    {
                        "text": "Hyper Tool Multi Language",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which HTML element is used for the largest heading?",
                "opts": [
                    {
                        "text": "<heading>",
                        "correct": false
                    },
                    {
                        "text": "<h1>",
                        "correct": true
                    },
                    {
                        "text": "<head>",
                        "correct": false
                    },
                    {
                        "text": "<h6>",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the correct HTML element to define important text?",
                "opts": [
                    {
                        "text": "<strong>",
                        "correct": true
                    },
                    {
                        "text": "<b>",
                        "correct": false
                    },
                    {
                        "text": "<important>",
                        "correct": false
                    },
                    {
                        "text": "<i>",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which character is used to indicate an end tag?",
                "opts": [
                    {
                        "text": "*",
                        "correct": false
                    },
                    {
                        "text": "/",
                        "correct": true
                    },
                    {
                        "text": "<",
                        "correct": false
                    },
                    {
                        "text": "^",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How can you make a numbered list?",
                "opts": [
                    {
                        "text": "<list>",
                        "correct": false
                    },
                    {
                        "text": "<ul>",
                        "correct": false
                    },
                    {
                        "text": "<dl>",
                        "correct": false
                    },
                    {
                        "text": "<ol>",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which HTML element defines the title of a document?",
                "opts": [
                    {
                        "text": "<meta>",
                        "correct": false
                    },
                    {
                        "text": "<head>",
                        "correct": false
                    },
                    {
                        "text": "<title>",
                        "correct": true
                    },
                    {
                        "text": "<body>",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "css": {
        "title": "CSS & Responsive Design",
        "questions": [
            {
                "q": "Which property is used in CSS to change the background color?",
                "opts": [
                    {
                        "text": "bgcolor",
                        "correct": false
                    },
                    {
                        "text": "background-color",
                        "correct": true
                    },
                    {
                        "text": "bg-color",
                        "correct": false
                    },
                    {
                        "text": "color",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which CSS layout model allows you to create complex responsive layouts easily?",
                "opts": [
                    {
                        "text": "Position",
                        "correct": false
                    },
                    {
                        "text": "Grid",
                        "correct": true
                    },
                    {
                        "text": "Display block",
                        "correct": false
                    },
                    {
                        "text": "Float",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does 'em' unit represent in CSS?",
                "opts": [
                    {
                        "text": "Relative to the parent element's font size",
                        "correct": true
                    },
                    {
                        "text": "A fixed pixel unit",
                        "correct": false
                    },
                    {
                        "text": "Relative to the root font size",
                        "correct": false
                    },
                    {
                        "text": "Exact millimeters",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How do you select an element with id 'demo'?",
                "opts": [
                    {
                        "text": ".demo",
                        "correct": false
                    },
                    {
                        "text": "demo",
                        "correct": false
                    },
                    {
                        "text": "#demo",
                        "correct": true
                    },
                    {
                        "text": "*demo",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which property is used to change the text color?",
                "opts": [
                    {
                        "text": "font-color",
                        "correct": false
                    },
                    {
                        "text": "text-color",
                        "correct": false
                    },
                    {
                        "text": "color",
                        "correct": true
                    },
                    {
                        "text": "fgcolor",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does CSS stand for?",
                "opts": [
                    {
                        "text": "Colorful Style Sheets",
                        "correct": false
                    },
                    {
                        "text": "Cascading Style Sheets",
                        "correct": true
                    },
                    {
                        "text": "Creative Style Sheets",
                        "correct": false
                    },
                    {
                        "text": "Computer Style Sheets",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Where in an HTML document is the correct place to refer to an external style sheet?",
                "opts": [
                    {
                        "text": "In the <body> section",
                        "correct": false
                    },
                    {
                        "text": "At the end of the document",
                        "correct": false
                    },
                    {
                        "text": "In the <head> section",
                        "correct": true
                    },
                    {
                        "text": "In the <title> section",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which HTML tag is used to define an internal style sheet?",
                "opts": [
                    {
                        "text": "<script>",
                        "correct": false
                    },
                    {
                        "text": "<style>",
                        "correct": true
                    },
                    {
                        "text": "<css>",
                        "correct": false
                    },
                    {
                        "text": "<link>",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which property is used to change the left margin of an element?",
                "opts": [
                    {
                        "text": "margin-left",
                        "correct": true
                    },
                    {
                        "text": "padding-left",
                        "correct": false
                    },
                    {
                        "text": "indent",
                        "correct": false
                    },
                    {
                        "text": "spacing-left",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How do you make the text bold?",
                "opts": [
                    {
                        "text": "style:bold;",
                        "correct": false
                    },
                    {
                        "text": "font-weight:bold;",
                        "correct": true
                    },
                    {
                        "text": "font:bold;",
                        "correct": false
                    },
                    {
                        "text": "text-weight:bold;",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which property is used to change the font of an element?",
                "opts": [
                    {
                        "text": "font-family",
                        "correct": true
                    },
                    {
                        "text": "font-style",
                        "correct": false
                    },
                    {
                        "text": "font-weight",
                        "correct": false
                    },
                    {
                        "text": "text-font",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How do you select elements with class name 'test'?",
                "opts": [
                    {
                        "text": "#test",
                        "correct": false
                    },
                    {
                        "text": "*test",
                        "correct": false
                    },
                    {
                        "text": "test",
                        "correct": false
                    },
                    {
                        "text": ".test",
                        "correct": true
                    }
                ]
            }
        ]
    },
    "js": {
        "title": "JavaScript Essentials",
        "questions": [
            {
                "q": "How do you write 'Hello World' in an alert box?",
                "opts": [
                    {
                        "text": "msg('Hello World');",
                        "correct": false
                    },
                    {
                        "text": "alertBox('Hello World');",
                        "correct": false
                    },
                    {
                        "text": "msgBox('Hello World');",
                        "correct": false
                    },
                    {
                        "text": "alert('Hello World');",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which keyword declares a block-scoped variable in modern JavaScript?",
                "opts": [
                    {
                        "text": "var",
                        "correct": false
                    },
                    {
                        "text": "let",
                        "correct": true
                    },
                    {
                        "text": "define",
                        "correct": false
                    },
                    {
                        "text": "set",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the === operator check?",
                "opts": [
                    {
                        "text": "Value and type",
                        "correct": true
                    },
                    {
                        "text": "Value only",
                        "correct": false
                    },
                    {
                        "text": "Reference equality",
                        "correct": false
                    },
                    {
                        "text": "Type only",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How do you create a function in JavaScript?",
                "opts": [
                    {
                        "text": "def myFunction()",
                        "correct": false
                    },
                    {
                        "text": "create myFunction()",
                        "correct": false
                    },
                    {
                        "text": "function:myFunction()",
                        "correct": false
                    },
                    {
                        "text": "function myFunction()",
                        "correct": true
                    }
                ]
            },
            {
                "q": "How to write an IF statement in JavaScript?",
                "opts": [
                    {
                        "text": "if i = 5",
                        "correct": false
                    },
                    {
                        "text": "if i == 5 then",
                        "correct": false
                    },
                    {
                        "text": "if i = 5 then",
                        "correct": false
                    },
                    {
                        "text": "if (i == 5)",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which event occurs when the user clicks on an HTML element?",
                "opts": [
                    {
                        "text": "onclick",
                        "correct": true
                    },
                    {
                        "text": "onmouseclick",
                        "correct": false
                    },
                    {
                        "text": "onchange",
                        "correct": false
                    },
                    {
                        "text": "onmouseover",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Inside which HTML element do we put the JavaScript?",
                "opts": [
                    {
                        "text": "<script>",
                        "correct": true
                    },
                    {
                        "text": "<javascript>",
                        "correct": false
                    },
                    {
                        "text": "<scripting>",
                        "correct": false
                    },
                    {
                        "text": "<js>",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How do you create a function in JavaScript?",
                "opts": [
                    {
                        "text": "function myFunction()",
                        "correct": true
                    },
                    {
                        "text": "function:myFunction()",
                        "correct": false
                    },
                    {
                        "text": "function = myFunction()",
                        "correct": false
                    },
                    {
                        "text": "def myFunction()",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How do you call a function named 'myFunction'?",
                "opts": [
                    {
                        "text": "call function myFunction()",
                        "correct": false
                    },
                    {
                        "text": "myFunction()",
                        "correct": true
                    },
                    {
                        "text": "call myFunction()",
                        "correct": false
                    },
                    {
                        "text": "execute myFunction()",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How to write an IF statement in JavaScript?",
                "opts": [
                    {
                        "text": "if i = 5",
                        "correct": false
                    },
                    {
                        "text": "if i == 5 then",
                        "correct": false
                    },
                    {
                        "text": "if (i == 5)",
                        "correct": true
                    },
                    {
                        "text": "if i = 5 then",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How does a FOR loop start?",
                "opts": [
                    {
                        "text": "for (i = 0; i <= 5; i++)",
                        "correct": true
                    },
                    {
                        "text": "for (i = 0; i <= 5)",
                        "correct": false
                    },
                    {
                        "text": "for i = 1 to 5",
                        "correct": false
                    },
                    {
                        "text": "for (i <= 5; i++)",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How can you add a comment in a JavaScript?",
                "opts": [
                    {
                        "text": "<!--This is a comment-->",
                        "correct": false
                    },
                    {
                        "text": "//This is a comment",
                        "correct": true
                    },
                    {
                        "text": "'This is a comment",
                        "correct": false
                    },
                    {
                        "text": "*This is a comment*",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "react": {
        "title": "Frontend Frameworks (React)",
        "questions": [
            {
                "q": "What is used in React to keep track of a component's internal data?",
                "opts": [
                    {
                        "text": "Context",
                        "correct": false
                    },
                    {
                        "text": "Props",
                        "correct": false
                    },
                    {
                        "text": "State",
                        "correct": true
                    },
                    {
                        "text": "Refs",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is JSX in React?",
                "opts": [
                    {
                        "text": "A testing library",
                        "correct": false
                    },
                    {
                        "text": "A database query language",
                        "correct": false
                    },
                    {
                        "text": "A CSS framework",
                        "correct": false
                    },
                    {
                        "text": "A JavaScript extension that looks like HTML",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which hook is used to perform side effects in a function component?",
                "opts": [
                    {
                        "text": "useState",
                        "correct": false
                    },
                    {
                        "text": "useContext",
                        "correct": false
                    },
                    {
                        "text": "useReducer",
                        "correct": false
                    },
                    {
                        "text": "useEffect",
                        "correct": true
                    }
                ]
            },
            {
                "q": "How do you pass data from parent to child component?",
                "opts": [
                    {
                        "text": "Props",
                        "correct": true
                    },
                    {
                        "text": "Redux",
                        "correct": false
                    },
                    {
                        "text": "Context",
                        "correct": false
                    },
                    {
                        "text": "State",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the virtual DOM?",
                "opts": [
                    {
                        "text": "A database",
                        "correct": false
                    },
                    {
                        "text": "A lightweight copy of the actual DOM",
                        "correct": true
                    },
                    {
                        "text": "A separate browser window",
                        "correct": false
                    },
                    {
                        "text": "A testing environment",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which method is used to render a component to the DOM in React 18?",
                "opts": [
                    {
                        "text": "ReactDOM.render",
                        "correct": false
                    },
                    {
                        "text": "createRoot",
                        "correct": true
                    },
                    {
                        "text": "renderRoot",
                        "correct": false
                    },
                    {
                        "text": "DOM.render",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is React mainly used for?",
                "opts": [
                    {
                        "text": "Database management",
                        "correct": false
                    },
                    {
                        "text": "Building user interfaces",
                        "correct": true
                    },
                    {
                        "text": "Server-side routing",
                        "correct": false
                    },
                    {
                        "text": "Operating system development",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a React component?",
                "opts": [
                    {
                        "text": "A CSS file",
                        "correct": false
                    },
                    {
                        "text": "A database query",
                        "correct": false
                    },
                    {
                        "text": "A reusable piece of UI",
                        "correct": true
                    },
                    {
                        "text": "A network request",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which hook is used for state management?",
                "opts": [
                    {
                        "text": "useEffect",
                        "correct": false
                    },
                    {
                        "text": "useContext",
                        "correct": false
                    },
                    {
                        "text": "useState",
                        "correct": true
                    },
                    {
                        "text": "useMemo",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What are props in React?",
                "opts": [
                    {
                        "text": "Internal component state",
                        "correct": false
                    },
                    {
                        "text": "Arguments passed into React components",
                        "correct": true
                    },
                    {
                        "text": "CSS styles",
                        "correct": false
                    },
                    {
                        "text": "HTML tags",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How do you pass a prop 'name' with value 'John' to a Component?",
                "opts": [
                    {
                        "text": "<Component name='John' />",
                        "correct": true
                    },
                    {
                        "text": "<Component prop='John' />",
                        "correct": false
                    },
                    {
                        "text": "<Component {name: 'John'} />",
                        "correct": false
                    },
                    {
                        "text": "<Component>John</Component>",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the use of useEffect?",
                "opts": [
                    {
                        "text": "To perform side effects in function components",
                        "correct": true
                    },
                    {
                        "text": "To manage local state",
                        "correct": false
                    },
                    {
                        "text": "To style components",
                        "correct": false
                    },
                    {
                        "text": "To define routes",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "web-dev-basics": {
        "title": "Web Basics",
        "questions": [
            {
                "q": "Which of the following is NOT a core web technology?",
                "opts": [
                    {
                        "text": "JavaScript",
                        "correct": false
                    },
                    {
                        "text": "HTML",
                        "correct": false
                    },
                    {
                        "text": "CSS",
                        "correct": false
                    },
                    {
                        "text": "C++",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What does HTTP stand for?",
                "opts": [
                    {
                        "text": "HyperText Transmission Protocol",
                        "correct": false
                    },
                    {
                        "text": "HyperText Transfer Program",
                        "correct": false
                    },
                    {
                        "text": "HyperText Transfer Protocol",
                        "correct": true
                    },
                    {
                        "text": "HyperText Transmission Program",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a URL?",
                "opts": [
                    {
                        "text": "Universal Resource Locator",
                        "correct": false
                    },
                    {
                        "text": "Uniform Resource Locator",
                        "correct": true
                    },
                    {
                        "text": "Universal Resource Link",
                        "correct": false
                    },
                    {
                        "text": "Uniform Resource Link",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a web browser?",
                "opts": [
                    {
                        "text": "Windows",
                        "correct": false
                    },
                    {
                        "text": "Linux",
                        "correct": false
                    },
                    {
                        "text": "Chrome",
                        "correct": true
                    },
                    {
                        "text": "MacOS",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the main function of a DNS server?",
                "opts": [
                    {
                        "text": "To store databases",
                        "correct": false
                    },
                    {
                        "text": "To secure web traffic",
                        "correct": false
                    },
                    {
                        "text": "To host websites",
                        "correct": false
                    },
                    {
                        "text": "To translate domain names to IP addresses",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What does DOM stand for?",
                "opts": [
                    {
                        "text": "Data Orientation Model",
                        "correct": false
                    },
                    {
                        "text": "Document Object Model",
                        "correct": true
                    },
                    {
                        "text": "Data Object Model",
                        "correct": false
                    },
                    {
                        "text": "Document Orientation Model",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Web Basics?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Web Basics?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Web Basics?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Web Basics, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Web Basics?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Web Basics?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "nodejs": {
        "title": "Node.js Fundamentals",
        "questions": [
            {
                "q": "Node.js is primarily used for:",
                "opts": [
                    {
                        "text": "Styling web pages",
                        "correct": false
                    },
                    {
                        "text": "Database administration",
                        "correct": false
                    },
                    {
                        "text": "Server-side scripting",
                        "correct": true
                    },
                    {
                        "text": "Client-side scripting",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is npm?",
                "opts": [
                    {
                        "text": "New Package Manager",
                        "correct": false
                    },
                    {
                        "text": "Node Programming Manager",
                        "correct": false
                    },
                    {
                        "text": "Node Package Manager",
                        "correct": true
                    },
                    {
                        "text": "Node Project Manager",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which module is used to create a web server in Node.js?",
                "opts": [
                    {
                        "text": "fs",
                        "correct": false
                    },
                    {
                        "text": "url",
                        "correct": false
                    },
                    {
                        "text": "path",
                        "correct": false
                    },
                    {
                        "text": "http",
                        "correct": true
                    }
                ]
            },
            {
                "q": "How do you import a module in CommonJS?",
                "opts": [
                    {
                        "text": "import 'module'",
                        "correct": false
                    },
                    {
                        "text": "require('module')",
                        "correct": true
                    },
                    {
                        "text": "load('module')",
                        "correct": false
                    },
                    {
                        "text": "include('module')",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Node.js is built on which JavaScript engine?",
                "opts": [
                    {
                        "text": "JavaScriptCore",
                        "correct": false
                    },
                    {
                        "text": "Chakra",
                        "correct": false
                    },
                    {
                        "text": "SpiderMonkey",
                        "correct": false
                    },
                    {
                        "text": "V8",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which of the following is a popular Node.js web framework?",
                "opts": [
                    {
                        "text": "Django",
                        "correct": false
                    },
                    {
                        "text": "Flask",
                        "correct": false
                    },
                    {
                        "text": "Laravel",
                        "correct": false
                    },
                    {
                        "text": "Express",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Node.js Fundamentals?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Node.js Fundamentals?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Node.js Fundamentals?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Node.js Fundamentals, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Node.js Fundamentals?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Node.js Fundamentals?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "programming-basics": {
        "title": "Backend Language",
        "questions": [
            {
                "q": "Which of these is a common backend language?",
                "opts": [
                    {
                        "text": "React",
                        "correct": false
                    },
                    {
                        "text": "Python",
                        "correct": true
                    },
                    {
                        "text": "CSS",
                        "correct": false
                    },
                    {
                        "text": "HTML",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a variable?",
                "opts": [
                    {
                        "text": "A function",
                        "correct": false
                    },
                    {
                        "text": "A database table",
                        "correct": false
                    },
                    {
                        "text": "A named storage location in memory",
                        "correct": true
                    },
                    {
                        "text": "A mathematical equation",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is an array?",
                "opts": [
                    {
                        "text": "A loop",
                        "correct": false
                    },
                    {
                        "text": "A data structure containing a collection of elements",
                        "correct": true
                    },
                    {
                        "text": "A conditional statement",
                        "correct": false
                    },
                    {
                        "text": "A single value",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does IDE stand for?",
                "opts": [
                    {
                        "text": "Internal Design Environment",
                        "correct": false
                    },
                    {
                        "text": "Internal Development Environment",
                        "correct": false
                    },
                    {
                        "text": "Integrated Design Environment",
                        "correct": false
                    },
                    {
                        "text": "Integrated Development Environment",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which loop executes a block of code a specified number of times?",
                "opts": [
                    {
                        "text": "for loop",
                        "correct": true
                    },
                    {
                        "text": "do-while loop",
                        "correct": false
                    },
                    {
                        "text": "infinite loop",
                        "correct": false
                    },
                    {
                        "text": "while loop",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a boolean?",
                "opts": [
                    {
                        "text": "A string of text",
                        "correct": false
                    },
                    {
                        "text": "A data type with two possible values (true/false)",
                        "correct": true
                    },
                    {
                        "text": "A function",
                        "correct": false
                    },
                    {
                        "text": "A number",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Backend Language?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Backend Language?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Backend Language?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Backend Language, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Backend Language?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Backend Language?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "api-design": {
        "title": "API Design & REST",
        "questions": [
            {
                "q": "In a REST API, which HTTP method is typically used to create a new resource?",
                "opts": [
                    {
                        "text": "DELETE",
                        "correct": false
                    },
                    {
                        "text": "GET",
                        "correct": false
                    },
                    {
                        "text": "PUT",
                        "correct": false
                    },
                    {
                        "text": "POST",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What does API stand for?",
                "opts": [
                    {
                        "text": "Application Protocol Interface",
                        "correct": false
                    },
                    {
                        "text": "Application Programming Interface",
                        "correct": true
                    },
                    {
                        "text": "Applied Protocol Interface",
                        "correct": false
                    },
                    {
                        "text": "Applied Programming Interface",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which HTTP method is used to update an existing resource completely?",
                "opts": [
                    {
                        "text": "PATCH",
                        "correct": false
                    },
                    {
                        "text": "POST",
                        "correct": false
                    },
                    {
                        "text": "PUT",
                        "correct": true
                    },
                    {
                        "text": "GET",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What format is commonly used to send data in a REST API?",
                "opts": [
                    {
                        "text": "JSON",
                        "correct": true
                    },
                    {
                        "text": "XML",
                        "correct": false
                    },
                    {
                        "text": "CSV",
                        "correct": false
                    },
                    {
                        "text": "HTML",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does a 404 HTTP status code mean?",
                "opts": [
                    {
                        "text": "Server Error",
                        "correct": false
                    },
                    {
                        "text": "OK",
                        "correct": false
                    },
                    {
                        "text": "Unauthorized",
                        "correct": false
                    },
                    {
                        "text": "Not Found",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which part of the HTTP request holds metadata like tokens?",
                "opts": [
                    {
                        "text": "URL",
                        "correct": false
                    },
                    {
                        "text": "Headers",
                        "correct": true
                    },
                    {
                        "text": "Method",
                        "correct": false
                    },
                    {
                        "text": "Body",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in API Design & REST?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering API Design & REST?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with API Design & REST?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of API Design & REST, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for API Design & REST?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in API Design & REST?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "database": {
        "title": "Databases",
        "questions": [
            {
                "q": "What does SQL stand for?",
                "opts": [
                    {
                        "text": "Structured Query Language",
                        "correct": true
                    },
                    {
                        "text": "Simple Queue Language",
                        "correct": false
                    },
                    {
                        "text": "Standard Query Logic",
                        "correct": false
                    },
                    {
                        "text": "Strong Question Language",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a primary key?",
                "opts": [
                    {
                        "text": "A unique identifier for a record in a table",
                        "correct": true
                    },
                    {
                        "text": "A database name",
                        "correct": false
                    },
                    {
                        "text": "A foreign key",
                        "correct": false
                    },
                    {
                        "text": "A table name",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which type of database stores data in documents instead of tables?",
                "opts": [
                    {
                        "text": "SQL",
                        "correct": false
                    },
                    {
                        "text": "NoSQL",
                        "correct": true
                    },
                    {
                        "text": "Tabular",
                        "correct": false
                    },
                    {
                        "text": "Relational",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which SQL command is used to retrieve data?",
                "opts": [
                    {
                        "text": "SELECT",
                        "correct": true
                    },
                    {
                        "text": "GET",
                        "correct": false
                    },
                    {
                        "text": "PULL",
                        "correct": false
                    },
                    {
                        "text": "FETCH",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a foreign key?",
                "opts": [
                    {
                        "text": "A field that links to the primary key of another table",
                        "correct": true
                    },
                    {
                        "text": "A unique identifier",
                        "correct": false
                    },
                    {
                        "text": "An index",
                        "correct": false
                    },
                    {
                        "text": "A database password",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a NoSQL database?",
                "opts": [
                    {
                        "text": "MySQL",
                        "correct": false
                    },
                    {
                        "text": "Oracle",
                        "correct": false
                    },
                    {
                        "text": "PostgreSQL",
                        "correct": false
                    },
                    {
                        "text": "MongoDB",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Databases?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Databases?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Databases?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Databases, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Databases?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Databases?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "auth": {
        "title": "Authentication",
        "questions": [
            {
                "q": "What does JWT stand for?",
                "opts": [
                    {
                        "text": "JavaScript Web Token",
                        "correct": false
                    },
                    {
                        "text": "JSON Web Token",
                        "correct": true
                    },
                    {
                        "text": "Java Web Token",
                        "correct": false
                    },
                    {
                        "text": "JSON Window Token",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of hashing a password?",
                "opts": [
                    {
                        "text": "To speed up login",
                        "correct": false
                    },
                    {
                        "text": "To make it unreadable even if the database is breached",
                        "correct": true
                    },
                    {
                        "text": "To encrypt it so it can be decrypted later",
                        "correct": false
                    },
                    {
                        "text": "To make it shorter",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does OAuth primarily handle?",
                "opts": [
                    {
                        "text": "Authentication",
                        "correct": false
                    },
                    {
                        "text": "Encryption",
                        "correct": false
                    },
                    {
                        "text": "Database management",
                        "correct": false
                    },
                    {
                        "text": "Authorization",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which of these is a common hashing algorithm?",
                "opts": [
                    {
                        "text": "AES",
                        "correct": false
                    },
                    {
                        "text": "RSA",
                        "correct": false
                    },
                    {
                        "text": "bcrypt",
                        "correct": true
                    },
                    {
                        "text": "Base64",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is MFA?",
                "opts": [
                    {
                        "text": "Multiple File Access",
                        "correct": false
                    },
                    {
                        "text": "Main Frame Authorization",
                        "correct": false
                    },
                    {
                        "text": "Multi-Factor Authentication",
                        "correct": true
                    },
                    {
                        "text": "Master File Authorization",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In a JWT, which part contains the claims (data)?",
                "opts": [
                    {
                        "text": "Payload",
                        "correct": true
                    },
                    {
                        "text": "Signature",
                        "correct": false
                    },
                    {
                        "text": "Footer",
                        "correct": false
                    },
                    {
                        "text": "Header",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Authentication?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Authentication?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Authentication?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Authentication, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Authentication?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Authentication?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "python-data": {
        "title": "Python for Data Science",
        "questions": [
            {
                "q": "Which library is commonly used for data manipulation in Python?",
                "opts": [
                    {
                        "text": "TensorFlow",
                        "correct": false
                    },
                    {
                        "text": "Pandas",
                        "correct": true
                    },
                    {
                        "text": "Django",
                        "correct": false
                    },
                    {
                        "text": "Flask",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which data structure is mutable in Python?",
                "opts": [
                    {
                        "text": "Tuple",
                        "correct": false
                    },
                    {
                        "text": "Integer",
                        "correct": false
                    },
                    {
                        "text": "String",
                        "correct": false
                    },
                    {
                        "text": "List",
                        "correct": true
                    }
                ]
            },
            {
                "q": "How do you define a function in Python?",
                "opts": [
                    {
                        "text": "create my_func():",
                        "correct": false
                    },
                    {
                        "text": "fn my_func():",
                        "correct": false
                    },
                    {
                        "text": "def my_func():",
                        "correct": true
                    },
                    {
                        "text": "function my_func():",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Python dictionary?",
                "opts": [
                    {
                        "text": "A text file",
                        "correct": false
                    },
                    {
                        "text": "A mathematical set",
                        "correct": false
                    },
                    {
                        "text": "An ordered list",
                        "correct": false
                    },
                    {
                        "text": "A collection of key-value pairs",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which library is used for scientific computing?",
                "opts": [
                    {
                        "text": "SciPy",
                        "correct": true
                    },
                    {
                        "text": "BeautifulSoup",
                        "correct": false
                    },
                    {
                        "text": "Requests",
                        "correct": false
                    },
                    {
                        "text": "Flask",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How do you import a module in Python?",
                "opts": [
                    {
                        "text": "include module_name",
                        "correct": false
                    },
                    {
                        "text": "load module_name",
                        "correct": false
                    },
                    {
                        "text": "require module_name",
                        "correct": false
                    },
                    {
                        "text": "import module_name",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Python for Data Science?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Python for Data Science?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Python for Data Science?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Python for Data Science, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Python for Data Science?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Python for Data Science?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "pandas-numpy": {
        "title": "Data Manipulation",
        "questions": [
            {
                "q": "What is the primary data structure in Pandas for 2D tabular data?",
                "opts": [
                    {
                        "text": "DataFrame",
                        "correct": true
                    },
                    {
                        "text": "Series",
                        "correct": false
                    },
                    {
                        "text": "Dictionary",
                        "correct": false
                    },
                    {
                        "text": "List",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which NumPy object is used for storing multi-dimensional data?",
                "opts": [
                    {
                        "text": "Series",
                        "correct": false
                    },
                    {
                        "text": "List",
                        "correct": false
                    },
                    {
                        "text": "DataFrame",
                        "correct": false
                    },
                    {
                        "text": "ndarray",
                        "correct": true
                    }
                ]
            },
            {
                "q": "How do you read a CSV file using Pandas?",
                "opts": [
                    {
                        "text": "pd.get_csv()",
                        "correct": false
                    },
                    {
                        "text": "pd.open_csv()",
                        "correct": false
                    },
                    {
                        "text": "pd.read_csv()",
                        "correct": true
                    },
                    {
                        "text": "pd.load_csv()",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does df.head() do?",
                "opts": [
                    {
                        "text": "Returns the last 5 rows",
                        "correct": false
                    },
                    {
                        "text": "Returns the headers",
                        "correct": false
                    },
                    {
                        "text": "Returns the first 5 rows of a DataFrame",
                        "correct": true
                    },
                    {
                        "text": "Returns the index",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How do you filter a DataFrame 'df' for values where 'Age' > 30?",
                "opts": [
                    {
                        "text": "df.where('Age' > 30)",
                        "correct": false
                    },
                    {
                        "text": "df.query(Age > 30)",
                        "correct": false
                    },
                    {
                        "text": "df[df['Age'] > 30]",
                        "correct": true
                    },
                    {
                        "text": "df.filter('Age' > 30)",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which method is used to handle missing data in Pandas?",
                "opts": [
                    {
                        "text": "fillna()",
                        "correct": true
                    },
                    {
                        "text": "dropnull()",
                        "correct": false
                    },
                    {
                        "text": "remove_na()",
                        "correct": false
                    },
                    {
                        "text": "clean()",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Data Manipulation?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Data Manipulation?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Data Manipulation?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Data Manipulation, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Data Manipulation?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Data Manipulation?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "data-viz": {
        "title": "Data Visualization",
        "questions": [
            {
                "q": "Which Python library is famous for creating static, interactive, and animated visualizations?",
                "opts": [
                    {
                        "text": "Pandas",
                        "correct": false
                    },
                    {
                        "text": "Scipy",
                        "correct": false
                    },
                    {
                        "text": "Numpy",
                        "correct": false
                    },
                    {
                        "text": "Matplotlib",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which library is built on top of Matplotlib and provides a high-level interface?",
                "opts": [
                    {
                        "text": "Plotly",
                        "correct": false
                    },
                    {
                        "text": "Seaborn",
                        "correct": true
                    },
                    {
                        "text": "Altair",
                        "correct": false
                    },
                    {
                        "text": "Bokeh",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which chart type is best for showing trends over time?",
                "opts": [
                    {
                        "text": "Bar chart",
                        "correct": false
                    },
                    {
                        "text": "Line chart",
                        "correct": true
                    },
                    {
                        "text": "Pie chart",
                        "correct": false
                    },
                    {
                        "text": "Scatter plot",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does a scatter plot visualize?",
                "opts": [
                    {
                        "text": "The total sum of categories",
                        "correct": false
                    },
                    {
                        "text": "The distribution of a single variable",
                        "correct": false
                    },
                    {
                        "text": "The relationship between two variables",
                        "correct": true
                    },
                    {
                        "text": "Hierarchical data",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which library is commonly used for interactive dashboards in Python?",
                "opts": [
                    {
                        "text": "Matplotlib",
                        "correct": false
                    },
                    {
                        "text": "Seaborn",
                        "correct": false
                    },
                    {
                        "text": "Statsmodels",
                        "correct": false
                    },
                    {
                        "text": "Plotly/Dash",
                        "correct": true
                    }
                ]
            },
            {
                "q": "In Matplotlib, what command displays the plot?",
                "opts": [
                    {
                        "text": "plt.render()",
                        "correct": false
                    },
                    {
                        "text": "plt.display()",
                        "correct": false
                    },
                    {
                        "text": "plt.plot()",
                        "correct": false
                    },
                    {
                        "text": "plt.show()",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Data Visualization?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Data Visualization?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Data Visualization?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Data Visualization, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Data Visualization?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Data Visualization?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "machine-learning": {
        "title": "Machine Learning",
        "questions": [
            {
                "q": "Which type of machine learning involves predicting a continuous numerical value?",
                "opts": [
                    {
                        "text": "Clustering",
                        "correct": false
                    },
                    {
                        "text": "Regression",
                        "correct": true
                    },
                    {
                        "text": "Classification",
                        "correct": false
                    },
                    {
                        "text": "Dimensionality Reduction",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is supervised learning?",
                "opts": [
                    {
                        "text": "Learning with labeled data",
                        "correct": true
                    },
                    {
                        "text": "Learning through rewards",
                        "correct": false
                    },
                    {
                        "text": "Learning without data",
                        "correct": false
                    },
                    {
                        "text": "Learning with unlabeled data",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which metric is commonly used to evaluate a classification model?",
                "opts": [
                    {
                        "text": "Accuracy",
                        "correct": true
                    },
                    {
                        "text": "Mean Squared Error",
                        "correct": false
                    },
                    {
                        "text": "Silhouette Score",
                        "correct": false
                    },
                    {
                        "text": "R-squared",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does 'overfitting' mean?",
                "opts": [
                    {
                        "text": "The model performs poorly on all data",
                        "correct": false
                    },
                    {
                        "text": "The model trains too quickly",
                        "correct": false
                    },
                    {
                        "text": "The model performs well on training data but poorly on unseen data",
                        "correct": true
                    },
                    {
                        "text": "The model is too simple",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which algorithm is an example of an ensemble method?",
                "opts": [
                    {
                        "text": "Random Forest",
                        "correct": true
                    },
                    {
                        "text": "Linear Regression",
                        "correct": false
                    },
                    {
                        "text": "Logistic Regression",
                        "correct": false
                    },
                    {
                        "text": "K-Means",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of a train/test split?",
                "opts": [
                    {
                        "text": "To reduce the number of features",
                        "correct": false
                    },
                    {
                        "text": "To evaluate the model's performance on unseen data",
                        "correct": true
                    },
                    {
                        "text": "To train the model faster",
                        "correct": false
                    },
                    {
                        "text": "To increase the size of the dataset",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Machine Learning?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Machine Learning?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Machine Learning?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Machine Learning, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Machine Learning?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Machine Learning?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "nlp-fundamentals": {
        "title": "NLP Fundamentals",
        "questions": [
            {
                "q": "What is tokenization in NLP?",
                "opts": [
                    {
                        "text": "Encrypting text",
                        "correct": false
                    },
                    {
                        "text": "Translating text",
                        "correct": false
                    },
                    {
                        "text": "Splitting text into smaller units like words",
                        "correct": true
                    },
                    {
                        "text": "Converting text to speech",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is 'stop word' removal?",
                "opts": [
                    {
                        "text": "Removing numbers",
                        "correct": false
                    },
                    {
                        "text": "Removing offensive language",
                        "correct": false
                    },
                    {
                        "text": "Removing punctuation",
                        "correct": false
                    },
                    {
                        "text": "Removing common words like 'the', 'is', 'in' that carry little meaning",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What does TF-IDF stand for?",
                "opts": [
                    {
                        "text": "Term Frequency-Inverse Document Frequency",
                        "correct": true
                    },
                    {
                        "text": "Term Format-Inverse Data Frequency",
                        "correct": false
                    },
                    {
                        "text": "Text Frequency-Inverse Document Format",
                        "correct": false
                    },
                    {
                        "text": "Text Format-Inverse Data Format",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is stemming?",
                "opts": [
                    {
                        "text": "Converting words to numbers",
                        "correct": false
                    },
                    {
                        "text": "Reducing words to their root form",
                        "correct": true
                    },
                    {
                        "text": "Translating words",
                        "correct": false
                    },
                    {
                        "text": "Finding synonyms",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a common NLP task?",
                "opts": [
                    {
                        "text": "Sentiment Analysis",
                        "correct": true
                    },
                    {
                        "text": "Database Querying",
                        "correct": false
                    },
                    {
                        "text": "Image Recognition",
                        "correct": false
                    },
                    {
                        "text": "Pathfinding",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Word2Vec?",
                "opts": [
                    {
                        "text": "A tokenization algorithm",
                        "correct": false
                    },
                    {
                        "text": "A translation model",
                        "correct": false
                    },
                    {
                        "text": "A spell checker",
                        "correct": false
                    },
                    {
                        "text": "A technique to convert words into dense vectors",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in NLP Fundamentals?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering NLP Fundamentals?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with NLP Fundamentals?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of NLP Fundamentals, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for NLP Fundamentals?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in NLP Fundamentals?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "transformers-llms": {
        "title": "Transformers & LLMs",
        "questions": [
            {
                "q": "What mechanism is central to the Transformer architecture?",
                "opts": [
                    {
                        "text": "Pooling",
                        "correct": false
                    },
                    {
                        "text": "Convolution",
                        "correct": false
                    },
                    {
                        "text": "Recurrence",
                        "correct": false
                    },
                    {
                        "text": "Self-Attention",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What does LLM stand for?",
                "opts": [
                    {
                        "text": "Large Linear Model",
                        "correct": false
                    },
                    {
                        "text": "Local Language Machine",
                        "correct": false
                    },
                    {
                        "text": "Large Language Model",
                        "correct": true
                    },
                    {
                        "text": "Local Linear Machine",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which paper introduced the Transformer architecture?",
                "opts": [
                    {
                        "text": "Deep Residual Learning",
                        "correct": false
                    },
                    {
                        "text": "Attention Is All You Need",
                        "correct": true
                    },
                    {
                        "text": "ImageNet Classification",
                        "correct": false
                    },
                    {
                        "text": "BERT: Pre-training of Deep Bidirectional Transformers",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is 'fine-tuning' in the context of LLMs?",
                "opts": [
                    {
                        "text": "Training a model from scratch",
                        "correct": false
                    },
                    {
                        "text": "Compressing the model",
                        "correct": false
                    },
                    {
                        "text": "Training a pre-trained model on a specific task or dataset",
                        "correct": true
                    },
                    {
                        "text": "Translating the model's output",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is GPT an acronym for?",
                "opts": [
                    {
                        "text": "Generative Predictive Text",
                        "correct": false
                    },
                    {
                        "text": "Generative Pre-trained Transformer",
                        "correct": true
                    },
                    {
                        "text": "General Predictive Text",
                        "correct": false
                    },
                    {
                        "text": "General Purpose Transformer",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of the 'decoder' in a Transformer?",
                "opts": [
                    {
                        "text": "To process the input sequence",
                        "correct": false
                    },
                    {
                        "text": "To calculate loss",
                        "correct": false
                    },
                    {
                        "text": "To generate the output sequence",
                        "correct": true
                    },
                    {
                        "text": "To compress data",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Transformers & LLMs?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Transformers & LLMs?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Transformers & LLMs?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Transformers & LLMs, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Transformers & LLMs?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Transformers & LLMs?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "linux-bash": {
        "title": "Linux & Bash Scripting",
        "questions": [
            {
                "q": "Which command is used to list files in a Linux directory?",
                "opts": [
                    {
                        "text": "cd",
                        "correct": false
                    },
                    {
                        "text": "ls",
                        "correct": true
                    },
                    {
                        "text": "mkdir",
                        "correct": false
                    },
                    {
                        "text": "pwd",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How do you change directories in Linux?",
                "opts": [
                    {
                        "text": "cd",
                        "correct": true
                    },
                    {
                        "text": "cp",
                        "correct": false
                    },
                    {
                        "text": "mv",
                        "correct": false
                    },
                    {
                        "text": "ls",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What command is used to display the contents of a file?",
                "opts": [
                    {
                        "text": "echo",
                        "correct": false
                    },
                    {
                        "text": "cat",
                        "correct": true
                    },
                    {
                        "text": "find",
                        "correct": false
                    },
                    {
                        "text": "grep",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which command searches for a pattern in a file?",
                "opts": [
                    {
                        "text": "search",
                        "correct": false
                    },
                    {
                        "text": "find",
                        "correct": false
                    },
                    {
                        "text": "locate",
                        "correct": false
                    },
                    {
                        "text": "grep",
                        "correct": true
                    }
                ]
            },
            {
                "q": "How do you change file permissions?",
                "opts": [
                    {
                        "text": "chown",
                        "correct": false
                    },
                    {
                        "text": "passwd",
                        "correct": false
                    },
                    {
                        "text": "chmod",
                        "correct": true
                    },
                    {
                        "text": "sudo",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does 'pwd' stand for?",
                "opts": [
                    {
                        "text": "Password",
                        "correct": false
                    },
                    {
                        "text": "Process Working Directory",
                        "correct": false
                    },
                    {
                        "text": "Personal Web Directory",
                        "correct": false
                    },
                    {
                        "text": "Print Working Directory",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Linux & Bash Scripting?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Linux & Bash Scripting?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Linux & Bash Scripting?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Linux & Bash Scripting, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Linux & Bash Scripting?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Linux & Bash Scripting?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "docker": {
        "title": "Containerization",
        "questions": [
            {
                "q": "What file contains instructions to build a Docker image?",
                "opts": [
                    {
                        "text": "DockerConfig",
                        "correct": false
                    },
                    {
                        "text": "DockerImage",
                        "correct": false
                    },
                    {
                        "text": "Dockerfile",
                        "correct": true
                    },
                    {
                        "text": "Containerfile",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Docker container?",
                "opts": [
                    {
                        "text": "A lightweight, standalone, executable package of software",
                        "correct": true
                    },
                    {
                        "text": "A database",
                        "correct": false
                    },
                    {
                        "text": "A virtual machine",
                        "correct": false
                    },
                    {
                        "text": "A code repository",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which command is used to run a Docker container?",
                "opts": [
                    {
                        "text": "docker run",
                        "correct": true
                    },
                    {
                        "text": "docker build",
                        "correct": false
                    },
                    {
                        "text": "docker execute",
                        "correct": false
                    },
                    {
                        "text": "docker start",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Docker Hub?",
                "opts": [
                    {
                        "text": "A programming language",
                        "correct": false
                    },
                    {
                        "text": "A cloud-based registry service for sharing Docker images",
                        "correct": true
                    },
                    {
                        "text": "A local network",
                        "correct": false
                    },
                    {
                        "text": "A continuous integration tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which command builds an image from a Dockerfile?",
                "opts": [
                    {
                        "text": "docker make",
                        "correct": false
                    },
                    {
                        "text": "docker compile",
                        "correct": false
                    },
                    {
                        "text": "docker create",
                        "correct": false
                    },
                    {
                        "text": "docker build",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What is Docker Compose used for?",
                "opts": [
                    {
                        "text": "Monitoring containers",
                        "correct": false
                    },
                    {
                        "text": "Hosting Docker images",
                        "correct": false
                    },
                    {
                        "text": "Writing Dockerfiles",
                        "correct": false
                    },
                    {
                        "text": "Defining and running multi-container Docker applications",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Containerization?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Containerization?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Containerization?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Containerization, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Containerization?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Containerization?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "cicd": {
        "title": "CI/CD Pipelines",
        "questions": [
            {
                "q": "What does CI stand for in CI/CD?",
                "opts": [
                    {
                        "text": "Continuous Installation",
                        "correct": false
                    },
                    {
                        "text": "Continuous Integration",
                        "correct": true
                    },
                    {
                        "text": "Controlled Integration",
                        "correct": false
                    },
                    {
                        "text": "Central Integration",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does CD typically stand for?",
                "opts": [
                    {
                        "text": "Continuous Delivery / Deployment",
                        "correct": true
                    },
                    {
                        "text": "Controlled Delivery",
                        "correct": false
                    },
                    {
                        "text": "Central Deployment",
                        "correct": false
                    },
                    {
                        "text": "Continuous Development",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is commonly used for CI/CD?",
                "opts": [
                    {
                        "text": "Photoshop",
                        "correct": false
                    },
                    {
                        "text": "Excel",
                        "correct": false
                    },
                    {
                        "text": "Jenkins",
                        "correct": true
                    },
                    {
                        "text": "Word",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the main goal of CI/CD?",
                "opts": [
                    {
                        "text": "To manage databases",
                        "correct": false
                    },
                    {
                        "text": "To write code faster",
                        "correct": false
                    },
                    {
                        "text": "To design user interfaces",
                        "correct": false
                    },
                    {
                        "text": "To automate the software release process",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What is a 'pipeline' in CI/CD?",
                "opts": [
                    {
                        "text": "A database table",
                        "correct": false
                    },
                    {
                        "text": "A code repository",
                        "correct": false
                    },
                    {
                        "text": "A network connection",
                        "correct": false
                    },
                    {
                        "text": "A series of automated steps to deliver software",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which platform provides built-in CI/CD called 'Actions'?",
                "opts": [
                    {
                        "text": "StackOverflow",
                        "correct": false
                    },
                    {
                        "text": "GitHub",
                        "correct": true
                    },
                    {
                        "text": "Jira",
                        "correct": false
                    },
                    {
                        "text": "Trello",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in CI/CD Pipelines?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering CI/CD Pipelines?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with CI/CD Pipelines?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of CI/CD Pipelines, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for CI/CD Pipelines?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in CI/CD Pipelines?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "cloud-providers": {
        "title": "Cloud Platforms",
        "questions": [
            {
                "q": "Which is NOT a major public cloud provider?",
                "opts": [
                    {
                        "text": "Apple Cloud",
                        "correct": true
                    },
                    {
                        "text": "Microsoft Azure",
                        "correct": false
                    },
                    {
                        "text": "Amazon Web Services",
                        "correct": false
                    },
                    {
                        "text": "Google Cloud Platform",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does AWS stand for?",
                "opts": [
                    {
                        "text": "Automated Web Systems",
                        "correct": false
                    },
                    {
                        "text": "Amazon Web Services",
                        "correct": true
                    },
                    {
                        "text": "Amazon Web Solutions",
                        "correct": false
                    },
                    {
                        "text": "Advanced Web Solutions",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is an S3 bucket in AWS?",
                "opts": [
                    {
                        "text": "A virtual machine",
                        "correct": false
                    },
                    {
                        "text": "A database",
                        "correct": false
                    },
                    {
                        "text": "Object storage",
                        "correct": true
                    },
                    {
                        "text": "A serverless function",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which Azure service is used for hosting virtual machines?",
                "opts": [
                    {
                        "text": "Azure Blob Storage",
                        "correct": false
                    },
                    {
                        "text": "Azure Virtual Machines",
                        "correct": true
                    },
                    {
                        "text": "Azure Functions",
                        "correct": false
                    },
                    {
                        "text": "Azure SQL",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is 'Serverless' computing?",
                "opts": [
                    {
                        "text": "A cloud model where the provider dynamically manages the allocation of machine resources",
                        "correct": true
                    },
                    {
                        "text": "A local server setup",
                        "correct": false
                    },
                    {
                        "text": "Computing without any physical servers",
                        "correct": false
                    },
                    {
                        "text": "A type of database",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a VPC?",
                "opts": [
                    {
                        "text": "Visual Private Cloud",
                        "correct": false
                    },
                    {
                        "text": "Virtual Public Cloud",
                        "correct": false
                    },
                    {
                        "text": "Virtual Private Cloud",
                        "correct": true
                    },
                    {
                        "text": "Visual Public Cloud",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Cloud Platforms?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Cloud Platforms?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Cloud Platforms?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Cloud Platforms, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Cloud Platforms?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Cloud Platforms?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "design-fundamentals": {
        "title": "Design Principles",
        "questions": [
            {
                "q": "Which principle refers to the arrangement of elements to signify importance?",
                "opts": [
                    {
                        "text": "Alignment",
                        "correct": false
                    },
                    {
                        "text": "Visual Hierarchy",
                        "correct": true
                    },
                    {
                        "text": "Contrast",
                        "correct": false
                    },
                    {
                        "text": "Proximity",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is 'White Space' in design?",
                "opts": [
                    {
                        "text": "A background image",
                        "correct": false
                    },
                    {
                        "text": "The color white",
                        "correct": false
                    },
                    {
                        "text": "Empty space around elements",
                        "correct": true
                    },
                    {
                        "text": "A specific font",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of contrast?",
                "opts": [
                    {
                        "text": "To hide elements",
                        "correct": false
                    },
                    {
                        "text": "To make elements stand out and improve readability",
                        "correct": true
                    },
                    {
                        "text": "To make everything look the same",
                        "correct": false
                    },
                    {
                        "text": "To reduce file size",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does 'Proximity' imply in design?",
                "opts": [
                    {
                        "text": "Items should be colorful",
                        "correct": false
                    },
                    {
                        "text": "Items should be random",
                        "correct": false
                    },
                    {
                        "text": "Related items should be grouped together",
                        "correct": true
                    },
                    {
                        "text": "Items should be evenly spaced",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Typography?",
                "opts": [
                    {
                        "text": "The study of colors",
                        "correct": false
                    },
                    {
                        "text": "The study of shapes",
                        "correct": false
                    },
                    {
                        "text": "The study of animation",
                        "correct": false
                    },
                    {
                        "text": "The art and technique of arranging type",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which color scheme uses variations in lightness and saturation of a single color?",
                "opts": [
                    {
                        "text": "Analogous",
                        "correct": false
                    },
                    {
                        "text": "Monochromatic",
                        "correct": true
                    },
                    {
                        "text": "Triadic",
                        "correct": false
                    },
                    {
                        "text": "Complementary",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Design Principles?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Design Principles?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Design Principles?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Design Principles, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Design Principles?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Design Principles?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "figma": {
        "title": "Figma Mastery",
        "questions": [
            {
                "q": "What Figma feature automatically resizes frames based on their content?",
                "opts": [
                    {
                        "text": "Components",
                        "correct": false
                    },
                    {
                        "text": "Auto Layout",
                        "correct": true
                    },
                    {
                        "text": "Constraints",
                        "correct": false
                    },
                    {
                        "text": "Variants",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What are 'Components' in Figma?",
                "opts": [
                    {
                        "text": "Text styles",
                        "correct": false
                    },
                    {
                        "text": "Color palettes",
                        "correct": false
                    },
                    {
                        "text": "Reusable design elements",
                        "correct": true
                    },
                    {
                        "text": "Exported images",
                        "correct": false
                    }
                ]
            },
            {
                "q": "How do you create a Prototype link in Figma?",
                "opts": [
                    {
                        "text": "Write HTML code",
                        "correct": false
                    },
                    {
                        "text": "Create a new frame",
                        "correct": false
                    },
                    {
                        "text": "Export the file",
                        "correct": false
                    },
                    {
                        "text": "Switch to the Prototype tab and connect nodes",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What is the shortcut to create a Frame in Figma?",
                "opts": [
                    {
                        "text": "F",
                        "correct": true
                    },
                    {
                        "text": "T",
                        "correct": false
                    },
                    {
                        "text": "R",
                        "correct": false
                    },
                    {
                        "text": "C",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What do 'Constraints' do in Figma?",
                "opts": [
                    {
                        "text": "Define how layers respond when their parent frame is resized",
                        "correct": true
                    },
                    {
                        "text": "Lock layers from editing",
                        "correct": false
                    },
                    {
                        "text": "Limit the number of layers",
                        "correct": false
                    },
                    {
                        "text": "Restrict who can view the file",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which feature allows you to combine multiple component variations?",
                "opts": [
                    {
                        "text": "Pages",
                        "correct": false
                    },
                    {
                        "text": "Groups",
                        "correct": false
                    },
                    {
                        "text": "Frames",
                        "correct": false
                    },
                    {
                        "text": "Variants",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Figma Mastery?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Figma Mastery?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Figma Mastery?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Figma Mastery, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Figma Mastery?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Figma Mastery?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "user-research": {
        "title": "User Research",
        "questions": [
            {
                "q": "What is a 'Persona' in UX design?",
                "opts": [
                    {
                        "text": "A color palette",
                        "correct": false
                    },
                    {
                        "text": "A type of animation",
                        "correct": false
                    },
                    {
                        "text": "A software testing tool",
                        "correct": false
                    },
                    {
                        "text": "A fictional character representing a user type",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What is A/B testing?",
                "opts": [
                    {
                        "text": "A type of user interview",
                        "correct": false
                    },
                    {
                        "text": "Testing software bugs",
                        "correct": false
                    },
                    {
                        "text": "Testing the alphabet",
                        "correct": false
                    },
                    {
                        "text": "Comparing two versions of a webpage to see which performs better",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What is a wireframe?",
                "opts": [
                    {
                        "text": "A fully coded website",
                        "correct": false
                    },
                    {
                        "text": "A final polished design",
                        "correct": false
                    },
                    {
                        "text": "A low-fidelity visual representation of a layout",
                        "correct": true
                    },
                    {
                        "text": "A user survey",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of usability testing?",
                "opts": [
                    {
                        "text": "To design a logo",
                        "correct": false
                    },
                    {
                        "text": "To measure loading speed",
                        "correct": false
                    },
                    {
                        "text": "To evaluate a product by testing it on users",
                        "correct": true
                    },
                    {
                        "text": "To check code for errors",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is qualitative research?",
                "opts": [
                    {
                        "text": "Research using surveys",
                        "correct": false
                    },
                    {
                        "text": "Research using A/B tests",
                        "correct": false
                    },
                    {
                        "text": "Research based on non-numerical data like observations and interviews",
                        "correct": true
                    },
                    {
                        "text": "Research based on numbers and statistics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does 'UX' stand for?",
                "opts": [
                    {
                        "text": "User Expression",
                        "correct": false
                    },
                    {
                        "text": "Unified Expression",
                        "correct": false
                    },
                    {
                        "text": "User Experience",
                        "correct": true
                    },
                    {
                        "text": "Unified Experience",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in User Research?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering User Research?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with User Research?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of User Research, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for User Research?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in User Research?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "mobile-fundamentals": {
        "title": "Mobile Fundamentals",
        "questions": [
            {
                "q": "Which language is primarily used for Flutter development?",
                "opts": [
                    {
                        "text": "JavaScript",
                        "correct": false
                    },
                    {
                        "text": "Java",
                        "correct": false
                    },
                    {
                        "text": "Dart",
                        "correct": true
                    },
                    {
                        "text": "Swift",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which language is used for native iOS development?",
                "opts": [
                    {
                        "text": "Swift",
                        "correct": true
                    },
                    {
                        "text": "Kotlin",
                        "correct": false
                    },
                    {
                        "text": "Java",
                        "correct": false
                    },
                    {
                        "text": "C#",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which language is currently the official standard for native Android development?",
                "opts": [
                    {
                        "text": "Java",
                        "correct": false
                    },
                    {
                        "text": "Objective-C",
                        "correct": false
                    },
                    {
                        "text": "Swift",
                        "correct": false
                    },
                    {
                        "text": "Kotlin",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What is an API?",
                "opts": [
                    {
                        "text": "Apple Programming Interface",
                        "correct": false
                    },
                    {
                        "text": "Application Protocol Interface",
                        "correct": false
                    },
                    {
                        "text": "Android Programming Interface",
                        "correct": false
                    },
                    {
                        "text": "Application Programming Interface",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What does 'Responsive Design' mean?",
                "opts": [
                    {
                        "text": "Designing a secure app",
                        "correct": false
                    },
                    {
                        "text": "Designing a UI that adapts to different screen sizes",
                        "correct": true
                    },
                    {
                        "text": "Designing a fast app",
                        "correct": false
                    },
                    {
                        "text": "Designing an app with animations",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a mobile operating system?",
                "opts": [
                    {
                        "text": "macOS",
                        "correct": false
                    },
                    {
                        "text": "Windows",
                        "correct": false
                    },
                    {
                        "text": "Linux",
                        "correct": false
                    },
                    {
                        "text": "Android",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Mobile Fundamentals?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Mobile Fundamentals?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Mobile Fundamentals?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Mobile Fundamentals, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Mobile Fundamentals?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Mobile Fundamentals?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "react-native-flutter": {
        "title": "Cross-Platform Frameworks",
        "questions": [
            {
                "q": "React Native allows you to build mobile apps using:",
                "opts": [
                    {
                        "text": "JavaScript and React",
                        "correct": true
                    },
                    {
                        "text": "Ruby",
                        "correct": false
                    },
                    {
                        "text": "Python",
                        "correct": false
                    },
                    {
                        "text": "C#",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Who created Flutter?",
                "opts": [
                    {
                        "text": "Apple",
                        "correct": false
                    },
                    {
                        "text": "Google",
                        "correct": true
                    },
                    {
                        "text": "Microsoft",
                        "correct": false
                    },
                    {
                        "text": "Facebook",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a 'Widget' in Flutter?",
                "opts": [
                    {
                        "text": "A background process",
                        "correct": false
                    },
                    {
                        "text": "A network request",
                        "correct": false
                    },
                    {
                        "text": "The basic building block of a Flutter UI",
                        "correct": true
                    },
                    {
                        "text": "A database table",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which component is used for scrolling lists in React Native?",
                "opts": [
                    {
                        "text": "ScrollViewer",
                        "correct": false
                    },
                    {
                        "text": "FlatList",
                        "correct": true
                    },
                    {
                        "text": "ListView",
                        "correct": false
                    },
                    {
                        "text": "RecyclerList",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Who created React Native?",
                "opts": [
                    {
                        "text": "Facebook",
                        "correct": true
                    },
                    {
                        "text": "Twitter",
                        "correct": false
                    },
                    {
                        "text": "Google",
                        "correct": false
                    },
                    {
                        "text": "Amazon",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What compiles React Native code to native views?",
                "opts": [
                    {
                        "text": "Webpack",
                        "correct": false
                    },
                    {
                        "text": "Gradle",
                        "correct": false
                    },
                    {
                        "text": "Babel",
                        "correct": false
                    },
                    {
                        "text": "Metro bundler",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Cross-Platform Frameworks?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Cross-Platform Frameworks?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Cross-Platform Frameworks?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Cross-Platform Frameworks, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Cross-Platform Frameworks?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Cross-Platform Frameworks?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "mobile-ui": {
        "title": "Mobile UI",
        "questions": [
            {
                "q": "What is a common pattern for navigating between sections in a mobile app?",
                "opts": [
                    {
                        "text": "Browser Back Button",
                        "correct": false
                    },
                    {
                        "text": "Scrollbars",
                        "correct": false
                    },
                    {
                        "text": "Hyperlinks in text",
                        "correct": false
                    },
                    {
                        "text": "Bottom Tab Navigation",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What is a 'Hamburger Menu'?",
                "opts": [
                    {
                        "text": "A database schema",
                        "correct": false
                    },
                    {
                        "text": "A type of food delivery app",
                        "correct": false
                    },
                    {
                        "text": "An icon consisting of three horizontal lines used for navigation",
                        "correct": true
                    },
                    {
                        "text": "A color palette",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which design system was developed by Google?",
                "opts": [
                    {
                        "text": "Human Interface Guidelines",
                        "correct": false
                    },
                    {
                        "text": "Material Design",
                        "correct": true
                    },
                    {
                        "text": "Carbon Design",
                        "correct": false
                    },
                    {
                        "text": "Fluent Design",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a 'Modal' in UI design?",
                "opts": [
                    {
                        "text": "A specific font",
                        "correct": false
                    },
                    {
                        "text": "A background image",
                        "correct": false
                    },
                    {
                        "text": "A type of animation",
                        "correct": false
                    },
                    {
                        "text": "A dialog box that requires users to interact with it before returning to the main app",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What does 'Onboarding' refer to?",
                "opts": [
                    {
                        "text": "Updating the app",
                        "correct": false
                    },
                    {
                        "text": "Loading data",
                        "correct": false
                    },
                    {
                        "text": "The process of familiarizing a new user with an app",
                        "correct": true
                    },
                    {
                        "text": "Logging out",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which element provides a brief, temporary message at the bottom of the screen?",
                "opts": [
                    {
                        "text": "Snackbar/Toast",
                        "correct": true
                    },
                    {
                        "text": "Dialog",
                        "correct": false
                    },
                    {
                        "text": "Tooltip",
                        "correct": false
                    },
                    {
                        "text": "Banner",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Mobile UI?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Mobile UI?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Mobile UI?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Mobile UI, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Mobile UI?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Mobile UI?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "networking-basics": {
        "title": "Networking Basics",
        "questions": [
            {
                "q": "What does IP stand for in networking?",
                "opts": [
                    {
                        "text": "Internet Protocol",
                        "correct": true
                    },
                    {
                        "text": "Internal Protocol",
                        "correct": false
                    },
                    {
                        "text": "International Provider",
                        "correct": false
                    },
                    {
                        "text": "Internet Provider",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the function of a router?",
                "opts": [
                    {
                        "text": "To write code",
                        "correct": false
                    },
                    {
                        "text": "To display webpages",
                        "correct": false
                    },
                    {
                        "text": "To store databases",
                        "correct": false
                    },
                    {
                        "text": "To forward data packets between computer networks",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What does DNS do?",
                "opts": [
                    {
                        "text": "Assigns IP addresses",
                        "correct": false
                    },
                    {
                        "text": "Transfers files",
                        "correct": false
                    },
                    {
                        "text": "Secures network traffic",
                        "correct": false
                    },
                    {
                        "text": "Translates domain names to IP addresses",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which protocol is used to transfer webpages?",
                "opts": [
                    {
                        "text": "FTP",
                        "correct": false
                    },
                    {
                        "text": "SSH",
                        "correct": false
                    },
                    {
                        "text": "SMTP",
                        "correct": false
                    },
                    {
                        "text": "HTTP",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What is a MAC address?",
                "opts": [
                    {
                        "text": "A website URL",
                        "correct": false
                    },
                    {
                        "text": "An IP address",
                        "correct": false
                    },
                    {
                        "text": "A routing protocol",
                        "correct": false
                    },
                    {
                        "text": "A unique identifier assigned to a network interface controller",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What does LAN stand for?",
                "opts": [
                    {
                        "text": "Logical Area Network",
                        "correct": false
                    },
                    {
                        "text": "Local Area Network",
                        "correct": true
                    },
                    {
                        "text": "Large Area Network",
                        "correct": false
                    },
                    {
                        "text": "Local Access Network",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Networking Basics?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Networking Basics?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Networking Basics?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Networking Basics, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Networking Basics?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Networking Basics?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "security-fundamentals": {
        "title": "Security Fundamentals",
        "questions": [
            {
                "q": "What is the primary purpose of encryption?",
                "opts": [
                    {
                        "text": "To make data unreadable to unauthorized users",
                        "correct": true
                    },
                    {
                        "text": "To speed up data transmission",
                        "correct": false
                    },
                    {
                        "text": "To make data smaller",
                        "correct": false
                    },
                    {
                        "text": "To organize data in a database",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Phishing?",
                "opts": [
                    {
                        "text": "A secure network",
                        "correct": false
                    },
                    {
                        "text": "An encryption algorithm",
                        "correct": false
                    },
                    {
                        "text": "A type of firewall",
                        "correct": false
                    },
                    {
                        "text": "A cyber attack that uses disguised email as a weapon",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What does VPN stand for?",
                "opts": [
                    {
                        "text": "Virtual Public Network",
                        "correct": false
                    },
                    {
                        "text": "Virtual Private Network",
                        "correct": true
                    },
                    {
                        "text": "Visual Public Network",
                        "correct": false
                    },
                    {
                        "text": "Visual Private Network",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Firewall?",
                "opts": [
                    {
                        "text": "An encryption tool",
                        "correct": false
                    },
                    {
                        "text": "A network security system that monitors and controls traffic",
                        "correct": true
                    },
                    {
                        "text": "A database",
                        "correct": false
                    },
                    {
                        "text": "A computer virus",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Malware?",
                "opts": [
                    {
                        "text": "A type of hardware",
                        "correct": false
                    },
                    {
                        "text": "A secure operating system",
                        "correct": false
                    },
                    {
                        "text": "A networking protocol",
                        "correct": false
                    },
                    {
                        "text": "Malicious software designed to cause damage",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What does HTTPS provide over HTTP?",
                "opts": [
                    {
                        "text": "Encryption and secure communication",
                        "correct": true
                    },
                    {
                        "text": "Larger file sizes",
                        "correct": false
                    },
                    {
                        "text": "Faster speeds",
                        "correct": false
                    },
                    {
                        "text": "Better graphics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Security Fundamentals?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Security Fundamentals?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Security Fundamentals?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Security Fundamentals, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Security Fundamentals?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Security Fundamentals?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "ethical-hacking": {
        "title": "Ethical Hacking",
        "questions": [
            {
                "q": "What is 'penetration testing'?",
                "opts": [
                    {
                        "text": "Testing the durability of hardware",
                        "correct": false
                    },
                    {
                        "text": "Writing secure code",
                        "correct": false
                    },
                    {
                        "text": "Authorized simulated cyberattack to evaluate security",
                        "correct": true
                    },
                    {
                        "text": "Installing antivirus software",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Who is a 'White Hat' hacker?",
                "opts": [
                    {
                        "text": "An ethical hacker who identifies vulnerabilities to fix them",
                        "correct": true
                    },
                    {
                        "text": "A software developer",
                        "correct": false
                    },
                    {
                        "text": "A malicious hacker",
                        "correct": false
                    },
                    {
                        "text": "A government spy",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a DDoS attack?",
                "opts": [
                    {
                        "text": "Distributed Denial of Service",
                        "correct": true
                    },
                    {
                        "text": "Direct Data Overload System",
                        "correct": false
                    },
                    {
                        "text": "Direct Denial of Security",
                        "correct": false
                    },
                    {
                        "text": "Distributed Data Operator Service",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is commonly used for network scanning?",
                "opts": [
                    {
                        "text": "Excel",
                        "correct": false
                    },
                    {
                        "text": "Photoshop",
                        "correct": false
                    },
                    {
                        "text": "Visual Studio",
                        "correct": false
                    },
                    {
                        "text": "Nmap",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What is Social Engineering?",
                "opts": [
                    {
                        "text": "Designing databases",
                        "correct": false
                    },
                    {
                        "text": "Manipulating people into giving up confidential information",
                        "correct": true
                    },
                    {
                        "text": "Building networks",
                        "correct": false
                    },
                    {
                        "text": "Writing secure code",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a 'zero-day' vulnerability?",
                "opts": [
                    {
                        "text": "A bug fixed on day zero",
                        "correct": false
                    },
                    {
                        "text": "A completely secure system",
                        "correct": false
                    },
                    {
                        "text": "A software flaw unknown to the vendor",
                        "correct": true
                    },
                    {
                        "text": "A network failure",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Ethical Hacking?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Ethical Hacking?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Ethical Hacking?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Ethical Hacking, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Ethical Hacking?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Ethical Hacking?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "excel-advanced": {
        "title": "Advanced Excel",
        "questions": [
            {
                "q": "Which Excel feature allows you to summarize and analyze large data dynamically?",
                "opts": [
                    {
                        "text": "Conditional Formatting",
                        "correct": false
                    },
                    {
                        "text": "Macros",
                        "correct": false
                    },
                    {
                        "text": "Pivot Tables",
                        "correct": true
                    },
                    {
                        "text": "VLOOKUP",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does VLOOKUP do?",
                "opts": [
                    {
                        "text": "Formats cells",
                        "correct": false
                    },
                    {
                        "text": "Searches for a value in the first column of a table array and returns a value in the same row",
                        "correct": true
                    },
                    {
                        "text": "Creates a chart",
                        "correct": false
                    },
                    {
                        "text": "Calculates the sum of a column",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which function is used to add numbers conditionally?",
                "opts": [
                    {
                        "text": "TOTALIF",
                        "correct": false
                    },
                    {
                        "text": "ADDIF",
                        "correct": false
                    },
                    {
                        "text": "SUMIF",
                        "correct": true
                    },
                    {
                        "text": "CONDITIONSUM",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Macro in Excel?",
                "opts": [
                    {
                        "text": "A large file",
                        "correct": false
                    },
                    {
                        "text": "A specific chart type",
                        "correct": false
                    },
                    {
                        "text": "A formatting tool",
                        "correct": false
                    },
                    {
                        "text": "A recorded sequence of commands to automate tasks",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which feature highlights cells that meet a certain criteria?",
                "opts": [
                    {
                        "text": "Pivot Tables",
                        "correct": false
                    },
                    {
                        "text": "Conditional Formatting",
                        "correct": true
                    },
                    {
                        "text": "Filtering",
                        "correct": false
                    },
                    {
                        "text": "Data Validation",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the INDEX function do?",
                "opts": [
                    {
                        "text": "Looks up a value vertically",
                        "correct": false
                    },
                    {
                        "text": "Calculates the average",
                        "correct": false
                    },
                    {
                        "text": "Returns the value of a cell in a specific row and column",
                        "correct": true
                    },
                    {
                        "text": "Finds the position of an item",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Advanced Excel?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Advanced Excel?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Advanced Excel?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Advanced Excel, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Advanced Excel?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Advanced Excel?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "sql-analytics": {
        "title": "SQL for Analytics",
        "questions": [
            {
                "q": "Which SQL clause groups rows with the same values into summary rows?",
                "opts": [
                    {
                        "text": "JOIN",
                        "correct": false
                    },
                    {
                        "text": "GROUP BY",
                        "correct": true
                    },
                    {
                        "text": "ORDER BY",
                        "correct": false
                    },
                    {
                        "text": "WHERE",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which function is used to count the number of rows?",
                "opts": [
                    {
                        "text": "MAX()",
                        "correct": false
                    },
                    {
                        "text": "AVG()",
                        "correct": false
                    },
                    {
                        "text": "COUNT()",
                        "correct": true
                    },
                    {
                        "text": "SUM()",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the HAVING clause do?",
                "opts": [
                    {
                        "text": "Filters records that work on summarized GROUP BY results",
                        "correct": true
                    },
                    {
                        "text": "Selects distinct values",
                        "correct": false
                    },
                    {
                        "text": "Sorts the data",
                        "correct": false
                    },
                    {
                        "text": "Joins two tables",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which JOIN returns all rows when there is a match in either left or right table?",
                "opts": [
                    {
                        "text": "LEFT JOIN",
                        "correct": false
                    },
                    {
                        "text": "FULL OUTER JOIN",
                        "correct": true
                    },
                    {
                        "text": "RIGHT JOIN",
                        "correct": false
                    },
                    {
                        "text": "INNER JOIN",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Subquery?",
                "opts": [
                    {
                        "text": "A query nested inside another query",
                        "correct": true
                    },
                    {
                        "text": "A primary key",
                        "correct": false
                    },
                    {
                        "text": "A database",
                        "correct": false
                    },
                    {
                        "text": "A table",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which keyword is used to sort the result-set?",
                "opts": [
                    {
                        "text": "ORDER BY",
                        "correct": true
                    },
                    {
                        "text": "FILTER BY",
                        "correct": false
                    },
                    {
                        "text": "SORT BY",
                        "correct": false
                    },
                    {
                        "text": "GROUP BY",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in SQL for Analytics?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering SQL for Analytics?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with SQL for Analytics?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of SQL for Analytics, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for SQL for Analytics?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in SQL for Analytics?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "bi-tools": {
        "title": "BI Tools",
        "questions": [
            {
                "q": "What is the primary purpose of BI tools like Tableau or Power BI?",
                "opts": [
                    {
                        "text": "To visualize and analyze data",
                        "correct": true
                    },
                    {
                        "text": "To develop web apps",
                        "correct": false
                    },
                    {
                        "text": "To write databases",
                        "correct": false
                    },
                    {
                        "text": "To train AI models",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does BI stand for?",
                "opts": [
                    {
                        "text": "Basic Information",
                        "correct": false
                    },
                    {
                        "text": "Business Information",
                        "correct": false
                    },
                    {
                        "text": "Business Intelligence",
                        "correct": true
                    },
                    {
                        "text": "Basic Intelligence",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which company developed Power BI?",
                "opts": [
                    {
                        "text": "Tableau",
                        "correct": false
                    },
                    {
                        "text": "Microsoft",
                        "correct": true
                    },
                    {
                        "text": "Google",
                        "correct": false
                    },
                    {
                        "text": "Amazon",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a 'Dashboard' in BI?",
                "opts": [
                    {
                        "text": "A database",
                        "correct": false
                    },
                    {
                        "text": "A spreadsheet",
                        "correct": false
                    },
                    {
                        "text": "A server",
                        "correct": false
                    },
                    {
                        "text": "A visual display of the most important information",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which of the following is a key feature of Tableau?",
                "opts": [
                    {
                        "text": "Writing backend code",
                        "correct": false
                    },
                    {
                        "text": "Training neural networks",
                        "correct": false
                    },
                    {
                        "text": "Drag-and-drop interactive visualizations",
                        "correct": true
                    },
                    {
                        "text": "Hosting websites",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does ETL stand for?",
                "opts": [
                    {
                        "text": "Execute, Transfer, Load",
                        "correct": false
                    },
                    {
                        "text": "Extract, Transfer, Logic",
                        "correct": false
                    },
                    {
                        "text": "Extract, Transform, Load",
                        "correct": true
                    },
                    {
                        "text": "Execute, Transform, Logic",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in BI Tools?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering BI Tools?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with BI Tools?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of BI Tools, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for BI Tools?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in BI Tools?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "capstone": {
        "title": "Capstone Project",
        "questions": [
            {
                "q": "What is the purpose of a capstone project?",
                "opts": [
                    {
                        "text": "To write a research paper",
                        "correct": false
                    },
                    {
                        "text": "To demonstrate job-ready skills through a real-world project",
                        "correct": true
                    },
                    {
                        "text": "To study theory only",
                        "correct": false
                    },
                    {
                        "text": "To pass a multiple-choice exam",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which is a typical step in a capstone project?",
                "opts": [
                    {
                        "text": "Watching tutorials passively",
                        "correct": false
                    },
                    {
                        "text": "Planning and requirement gathering",
                        "correct": true
                    },
                    {
                        "text": "Memorizing textbook definitions",
                        "correct": false
                    },
                    {
                        "text": "Taking daily quizzes",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the benefit of a portfolio project?",
                "opts": [
                    {
                        "text": "It showcases your practical skills to employers",
                        "correct": true
                    },
                    {
                        "text": "It provides a certificate automatically",
                        "correct": false
                    },
                    {
                        "text": "It pays you money immediately",
                        "correct": false
                    },
                    {
                        "text": "It replaces a college degree",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does 'Deployment' mean in a software project?",
                "opts": [
                    {
                        "text": "Designing the UI",
                        "correct": false
                    },
                    {
                        "text": "Making the application available for users on the internet",
                        "correct": true
                    },
                    {
                        "text": "Writing the code",
                        "correct": false
                    },
                    {
                        "text": "Testing the app locally",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is writing a README file important for a project?",
                "opts": [
                    {
                        "text": "It secures the code",
                        "correct": false
                    },
                    {
                        "text": "It explains what the project does and how to run it",
                        "correct": true
                    },
                    {
                        "text": "It makes the code run faster",
                        "correct": false
                    },
                    {
                        "text": "It is required by the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is version control (like Git) used for?",
                "opts": [
                    {
                        "text": "To write code faster",
                        "correct": false
                    },
                    {
                        "text": "To deploy the app",
                        "correct": false
                    },
                    {
                        "text": "To track changes in code and collaborate with others",
                        "correct": true
                    },
                    {
                        "text": "To design graphics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a key concept in Capstone Project?",
                "opts": [
                    {
                        "text": "Abstraction",
                        "correct": true
                    },
                    {
                        "text": "Photosynthesis",
                        "correct": false
                    },
                    {
                        "text": "Gravity",
                        "correct": false
                    },
                    {
                        "text": "Aerodynamics",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary benefit of mastering Capstone Project?",
                "opts": [
                    {
                        "text": "Building better applications",
                        "correct": true
                    },
                    {
                        "text": "Fixing hardware",
                        "correct": false
                    },
                    {
                        "text": "Designing logos",
                        "correct": false
                    },
                    {
                        "text": "Writing novels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which tool is most commonly associated with Capstone Project?",
                "opts": [
                    {
                        "text": "A code editor",
                        "correct": true
                    },
                    {
                        "text": "A hammer",
                        "correct": false
                    },
                    {
                        "text": "A paintbrush",
                        "correct": false
                    },
                    {
                        "text": "A calculator",
                        "correct": false
                    }
                ]
            },
            {
                "q": "In the context of Capstone Project, what does 'optimization' mean?",
                "opts": [
                    {
                        "text": "Making it run faster and more efficiently",
                        "correct": true
                    },
                    {
                        "text": "Making it colorful",
                        "correct": false
                    },
                    {
                        "text": "Deleting all files",
                        "correct": false
                    },
                    {
                        "text": "Printing it on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Why is documentation important for Capstone Project?",
                "opts": [
                    {
                        "text": "To help others understand and use the system",
                        "correct": true
                    },
                    {
                        "text": "To make the file size larger",
                        "correct": false
                    },
                    {
                        "text": "To hide secrets",
                        "correct": false
                    },
                    {
                        "text": "To slow down the compiler",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of these is a best practice in Capstone Project?",
                "opts": [
                    {
                        "text": "Following established design patterns",
                        "correct": true
                    },
                    {
                        "text": "Ignoring errors",
                        "correct": false
                    },
                    {
                        "text": "Hardcoding passwords",
                        "correct": false
                    },
                    {
                        "text": "Using random variables",
                        "correct": false
                    }
                ]
            }
        ]
    }
,
    "ts": {
            "title": "TypeScript",
            "questions": [
                    {
                            "q": "What does TypeScript add to JavaScript?",
                            "opts": [
                                    {
                                            "text": "Static type checking",
                                            "correct": true
                                    },
                                    {
                                            "text": "Database access",
                                            "correct": false
                                    },
                                    {
                                            "text": "CSS styling",
                                            "correct": false
                                    },
                                    {
                                            "text": "Image processing",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "Which keyword is used to define a type alias in TypeScript?",
                            "opts": [
                                    {
                                            "text": "type",
                                            "correct": true
                                    },
                                    {
                                            "text": "class",
                                            "correct": false
                                    },
                                    {
                                            "text": "var",
                                            "correct": false
                                    },
                                    {
                                            "text": "define",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is an 'interface' in TypeScript?",
                            "opts": [
                                    {
                                            "text": "A contract that defines the shape of an object",
                                            "correct": true
                                    },
                                    {
                                            "text": "A CSS class",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database table",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of loop",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you specify that a variable is a number in TypeScript?",
                            "opts": [
                                    {
                                            "text": "let x: number = 5",
                                            "correct": true
                                    },
                                    {
                                            "text": "let x = number(5)",
                                            "correct": false
                                    },
                                    {
                                            "text": "number let x = 5",
                                            "correct": false
                                    },
                                    {
                                            "text": "let x = (number) 5",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a 'union type' in TypeScript?",
                            "opts": [
                                    {
                                            "text": "A type that can be one of several types (string | number)",
                                            "correct": true
                                    },
                                    {
                                            "text": "A combined database query",
                                            "correct": false
                                    },
                                    {
                                            "text": "A way to merge two objects",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS selector",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does the 'any' type represent in TypeScript?",
                            "opts": [
                                    {
                                            "text": "A type that disables type checking for that variable",
                                            "correct": true
                                    },
                                    {
                                            "text": "An error type",
                                            "correct": false
                                    },
                                    {
                                            "text": "An empty string",
                                            "correct": false
                                    },
                                    {
                                            "text": "A null value",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What tool compiles TypeScript to JavaScript?",
                            "opts": [
                                    {
                                            "text": "tsc (TypeScript Compiler)",
                                            "correct": true
                                    },
                                    {
                                            "text": "gcc",
                                            "correct": false
                                    },
                                    {
                                            "text": "babel only",
                                            "correct": false
                                    },
                                    {
                                            "text": "webpack only",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What are generics used for in TypeScript?",
                            "opts": [
                                    {
                                            "text": "Creating reusable components that work with multiple types",
                                            "correct": true
                                    },
                                    {
                                            "text": "Generating random numbers",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creating CSS animations",
                                            "correct": false
                                    },
                                    {
                                            "text": "Managing database connections",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is 'enum' in TypeScript?",
                            "opts": [
                                    {
                                            "text": "A set of named constants",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of function",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS property",
                                            "correct": false
                                    },
                                    {
                                            "text": "A loop construct",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you make a property optional in a TypeScript interface?",
                            "opts": [
                                    {
                                            "text": "Add a ? after the property name",
                                            "correct": true
                                    },
                                    {
                                            "text": "Add 'optional' keyword",
                                            "correct": false
                                    },
                                    {
                                            "text": "Use square brackets",
                                            "correct": false
                                    },
                                    {
                                            "text": "Use the 'maybe' type",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is 'type narrowing' in TypeScript?",
                            "opts": [
                                    {
                                            "text": "Refining a type to a more specific type using checks",
                                            "correct": true
                                    },
                                    {
                                            "text": "Making font sizes smaller",
                                            "correct": false
                                    },
                                    {
                                            "text": "Reducing file size",
                                            "correct": false
                                    },
                                    {
                                            "text": "Compressing images",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'readonly' do in TypeScript?",
                            "opts": [
                                    {
                                            "text": "Prevents a property from being reassigned after initialization",
                                            "correct": true
                                    },
                                    {
                                            "text": "Makes a file read-only on disk",
                                            "correct": false
                                    },
                                    {
                                            "text": "Hides a property from the console",
                                            "correct": false
                                    },
                                    {
                                            "text": "Encrypts the property value",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "tailwind": {
            "title": "Tailwind CSS",
            "questions": [
                    {
                            "q": "What is Tailwind CSS?",
                            "opts": [
                                    {
                                            "text": "A utility-first CSS framework",
                                            "correct": true
                                    },
                                    {
                                            "text": "A JavaScript library",
                                            "correct": false
                                    },
                                    {
                                            "text": "A backend framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you apply a blue background in Tailwind?",
                            "opts": [
                                    {
                                            "text": "bg-blue-500",
                                            "correct": true
                                    },
                                    {
                                            "text": "background-blue",
                                            "correct": false
                                    },
                                    {
                                            "text": "color-blue-bg",
                                            "correct": false
                                    },
                                    {
                                            "text": "blue-background",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'flex' class do in Tailwind?",
                            "opts": [
                                    {
                                            "text": "Sets display to flexbox",
                                            "correct": true
                                    },
                                    {
                                            "text": "Makes text flexible",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creates an animation",
                                            "correct": false
                                    },
                                    {
                                            "text": "Sets font weight",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you make text bold in Tailwind?",
                            "opts": [
                                    {
                                            "text": "font-bold",
                                            "correct": true
                                    },
                                    {
                                            "text": "text-bold",
                                            "correct": false
                                    },
                                    {
                                            "text": "bold-text",
                                            "correct": false
                                    },
                                    {
                                            "text": "weight-bold",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the purpose of the Tailwind config file?",
                            "opts": [
                                    {
                                            "text": "To customize themes, colors, and extend the framework",
                                            "correct": true
                                    },
                                    {
                                            "text": "To store database credentials",
                                            "correct": false
                                    },
                                    {
                                            "text": "To define API routes",
                                            "correct": false
                                    },
                                    {
                                            "text": "To compile JavaScript",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How does Tailwind handle responsive design?",
                            "opts": [
                                    {
                                            "text": "Using prefix breakpoints like sm:, md:, lg:",
                                            "correct": true
                                    },
                                    {
                                            "text": "Using JavaScript media queries",
                                            "correct": false
                                    },
                                    {
                                            "text": "It doesn't support responsive design",
                                            "correct": false
                                    },
                                    {
                                            "text": "Using separate CSS files per device",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'p-4' mean in Tailwind?",
                            "opts": [
                                    {
                                            "text": "Padding of 1rem (16px) on all sides",
                                            "correct": true
                                    },
                                    {
                                            "text": "4 paragraphs",
                                            "correct": false
                                    },
                                    {
                                            "text": "Position 4",
                                            "correct": false
                                    },
                                    {
                                            "text": "Priority level 4",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is @apply in Tailwind?",
                            "opts": [
                                    {
                                            "text": "A directive to use Tailwind utilities inside custom CSS",
                                            "correct": true
                                    },
                                    {
                                            "text": "A JavaScript decorator",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database command",
                                            "correct": false
                                    },
                                    {
                                            "text": "An HTML attribute",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'hover:bg-red-500' do?",
                            "opts": [
                                    {
                                            "text": "Applies red background on hover",
                                            "correct": true
                                    },
                                    {
                                            "text": "Makes text red permanently",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creates a red border",
                                            "correct": false
                                    },
                                    {
                                            "text": "Shows an error message",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you hide an element in Tailwind?",
                            "opts": [
                                    {
                                            "text": "hidden",
                                            "correct": true
                                    },
                                    {
                                            "text": "display-none",
                                            "correct": false
                                    },
                                    {
                                            "text": "invisible-element",
                                            "correct": false
                                    },
                                    {
                                            "text": "remove",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is 'purging' in Tailwind CSS?",
                            "opts": [
                                    {
                                            "text": "Removing unused CSS classes to reduce file size",
                                            "correct": true
                                    },
                                    {
                                            "text": "Deleting all styles",
                                            "correct": false
                                    },
                                    {
                                            "text": "Clearing the browser cache",
                                            "correct": false
                                    },
                                    {
                                            "text": "Removing JavaScript errors",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'mx-auto' do in Tailwind?",
                            "opts": [
                                    {
                                            "text": "Centers an element horizontally with auto margins",
                                            "correct": true
                                    },
                                    {
                                            "text": "Sets maximum width to auto",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creates an animation",
                                            "correct": false
                                    },
                                    {
                                            "text": "Makes text uppercase",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "nextjs": {
            "title": "Next.js",
            "questions": [
                    {
                            "q": "What is Next.js?",
                            "opts": [
                                    {
                                            "text": "A React framework for production with SSR and SSG",
                                            "correct": true
                                    },
                                    {
                                            "text": "A CSS framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database management tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A testing library",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does SSR stand for in Next.js?",
                            "opts": [
                                    {
                                            "text": "Server-Side Rendering",
                                            "correct": true
                                    },
                                    {
                                            "text": "Static Site Routing",
                                            "correct": false
                                    },
                                    {
                                            "text": "Secure Server Response",
                                            "correct": false
                                    },
                                    {
                                            "text": "Simple Style Reset",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the 'pages' directory used for in Next.js?",
                            "opts": [
                                    {
                                            "text": "File-based routing — each file becomes a route",
                                            "correct": true
                                    },
                                    {
                                            "text": "Storing images",
                                            "correct": false
                                    },
                                    {
                                            "text": "Database configurations",
                                            "correct": false
                                    },
                                    {
                                            "text": "Test files",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is getStaticProps used for?",
                            "opts": [
                                    {
                                            "text": "Fetching data at build time for static generation",
                                            "correct": true
                                    },
                                    {
                                            "text": "Getting CSS properties",
                                            "correct": false
                                    },
                                    {
                                            "text": "Defining component props types",
                                            "correct": false
                                    },
                                    {
                                            "text": "Setting environment variables",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the difference between SSR and SSG?",
                            "opts": [
                                    {
                                            "text": "SSR renders on each request; SSG pre-renders at build time",
                                            "correct": true
                                    },
                                    {
                                            "text": "They are the same thing",
                                            "correct": false
                                    },
                                    {
                                            "text": "SSG is for servers; SSR is for clients",
                                            "correct": false
                                    },
                                    {
                                            "text": "SSR is faster than SSG always",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the Next.js Image component for?",
                            "opts": [
                                    {
                                            "text": "Automatic image optimization with lazy loading",
                                            "correct": true
                                    },
                                    {
                                            "text": "Creating image galleries",
                                            "correct": false
                                    },
                                    {
                                            "text": "Editing images",
                                            "correct": false
                                    },
                                    {
                                            "text": "Converting images to PDF",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do API routes work in Next.js?",
                            "opts": [
                                    {
                                            "text": "Files in pages/api/ become serverless API endpoints",
                                            "correct": true
                                    },
                                    {
                                            "text": "They require a separate Express server",
                                            "correct": false
                                    },
                                    {
                                            "text": "They only work with GraphQL",
                                            "correct": false
                                    },
                                    {
                                            "text": "They are client-side only",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is getServerSideProps?",
                            "opts": [
                                    {
                                            "text": "A function that runs on every request to fetch data server-side",
                                            "correct": true
                                    },
                                    {
                                            "text": "A CSS property getter",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database query function",
                                            "correct": false
                                    },
                                    {
                                            "text": "A client-side state hook",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is Incremental Static Regeneration (ISR)?",
                            "opts": [
                                    {
                                            "text": "Updating static pages after build time without full rebuild",
                                            "correct": true
                                    },
                                    {
                                            "text": "A CSS animation technique",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database migration tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A testing strategy",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does next/link provide?",
                            "opts": [
                                    {
                                            "text": "Client-side navigation between pages without full page reload",
                                            "correct": true
                                    },
                                    {
                                            "text": "External link validation",
                                            "correct": false
                                    },
                                    {
                                            "text": "Database linking",
                                            "correct": false
                                    },
                                    {
                                            "text": "CSS link imports",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is middleware in Next.js?",
                            "opts": [
                                    {
                                            "text": "Code that runs before a request is completed for auth, redirects, etc.",
                                            "correct": true
                                    },
                                    {
                                            "text": "CSS preprocessor",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database layer",
                                            "correct": false
                                    },
                                    {
                                            "text": "A testing utility",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the App Router in Next.js 13+?",
                            "opts": [
                                    {
                                            "text": "A new routing system using the app/ directory with React Server Components",
                                            "correct": true
                                    },
                                    {
                                            "text": "A mobile navigation library",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database router",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS routing tool",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "performance": {
            "title": "Performance Optimization",
            "questions": [
                    {
                            "q": "What is code splitting?",
                            "opts": [
                                    {
                                            "text": "Breaking code into smaller bundles loaded on demand",
                                            "correct": true
                                    },
                                    {
                                            "text": "Dividing code into multiple files manually",
                                            "correct": false
                                    },
                                    {
                                            "text": "Splitting a team into groups",
                                            "correct": false
                                    },
                                    {
                                            "text": "Removing comments from code",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is lazy loading?",
                            "opts": [
                                    {
                                            "text": "Loading resources only when they are needed",
                                            "correct": true
                                    },
                                    {
                                            "text": "Loading everything at once",
                                            "correct": false
                                    },
                                    {
                                            "text": "A slow internet connection",
                                            "correct": false
                                    },
                                    {
                                            "text": "A debugging technique",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does a CDN do?",
                            "opts": [
                                    {
                                            "text": "Serves content from geographically closer servers",
                                            "correct": true
                                    },
                                    {
                                            "text": "Compiles code faster",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creates database connections",
                                            "correct": false
                                    },
                                    {
                                            "text": "Generates CSS",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the critical rendering path?",
                            "opts": [
                                    {
                                            "text": "The sequence of steps the browser takes to render a page",
                                            "correct": true
                                    },
                                    {
                                            "text": "A file path on the server",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS animation path",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database query path",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does minification do?",
                            "opts": [
                                    {
                                            "text": "Removes whitespace and shortens variable names to reduce file size",
                                            "correct": true
                                    },
                                    {
                                            "text": "Makes fonts smaller",
                                            "correct": false
                                    },
                                    {
                                            "text": "Reduces image resolution",
                                            "correct": false
                                    },
                                    {
                                            "text": "Deletes unused database tables",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is tree shaking?",
                            "opts": [
                                    {
                                            "text": "Eliminating unused code from the final bundle",
                                            "correct": true
                                    },
                                    {
                                            "text": "A CSS animation effect",
                                            "correct": false
                                    },
                                    {
                                            "text": "Reorganizing folder structure",
                                            "correct": false
                                    },
                                    {
                                            "text": "A debugging technique",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the purpose of browser caching?",
                            "opts": [
                                    {
                                            "text": "Storing resources locally to avoid re-downloading them",
                                            "correct": true
                                    },
                                    {
                                            "text": "Clearing browser history",
                                            "correct": false
                                    },
                                    {
                                            "text": "Blocking cookies",
                                            "correct": false
                                    },
                                    {
                                            "text": "Encrypting data",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does the Lighthouse tool measure?",
                            "opts": [
                                    {
                                            "text": "Performance, accessibility, SEO, and best practices of a web page",
                                            "correct": true
                                    },
                                    {
                                            "text": "Server uptime",
                                            "correct": false
                                    },
                                    {
                                            "text": "Database speed",
                                            "correct": false
                                    },
                                    {
                                            "text": "Code complexity",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is debouncing?",
                            "opts": [
                                    {
                                            "text": "Delaying a function call until after a pause in events",
                                            "correct": true
                                    },
                                    {
                                            "text": "Removing bounce animations",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of error handling",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS property",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "Why should images be optimized for the web?",
                            "opts": [
                                    {
                                            "text": "To reduce page load time and bandwidth usage",
                                            "correct": true
                                    },
                                    {
                                            "text": "To make them look blurry",
                                            "correct": false
                                    },
                                    {
                                            "text": "To increase file size",
                                            "correct": false
                                    },
                                    {
                                            "text": "To add watermarks",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the First Contentful Paint (FCP)?",
                            "opts": [
                                    {
                                            "text": "The time when the browser renders the first piece of content",
                                            "correct": true
                                    },
                                    {
                                            "text": "The first CSS rule applied",
                                            "correct": false
                                    },
                                    {
                                            "text": "The first JavaScript function called",
                                            "correct": false
                                    },
                                    {
                                            "text": "The time the server starts",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a service worker?",
                            "opts": [
                                    {
                                            "text": "A script that runs in the background to enable offline functionality and caching",
                                            "correct": true
                                    },
                                    {
                                            "text": "A backend API endpoint",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database administrator",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS preprocessor",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "system-design": {
            "title": "System Design",
            "questions": [
                    {
                            "q": "What is horizontal scaling?",
                            "opts": [
                                    {
                                            "text": "Adding more machines to handle increased load",
                                            "correct": true
                                    },
                                    {
                                            "text": "Making a single machine more powerful",
                                            "correct": false
                                    },
                                    {
                                            "text": "Increasing font size",
                                            "correct": false
                                    },
                                    {
                                            "text": "Adding more CSS files",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a load balancer?",
                            "opts": [
                                    {
                                            "text": "A system that distributes traffic across multiple servers",
                                            "correct": true
                                    },
                                    {
                                            "text": "A CSS layout tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A JavaScript optimization library",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database backup tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is caching in system design?",
                            "opts": [
                                    {
                                            "text": "Storing frequently accessed data in fast storage for quick retrieval",
                                            "correct": true
                                    },
                                    {
                                            "text": "Deleting old files",
                                            "correct": false
                                    },
                                    {
                                            "text": "Encrypting passwords",
                                            "correct": false
                                    },
                                    {
                                            "text": "Compressing images",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a microservices architecture?",
                            "opts": [
                                    {
                                            "text": "An approach where an application is split into small independent services",
                                            "correct": true
                                    },
                                    {
                                            "text": "Using very small CSS classes",
                                            "correct": false
                                    },
                                    {
                                            "text": "Writing minimal JavaScript",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of database",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does CAP theorem state?",
                            "opts": [
                                    {
                                            "text": "A distributed system can only guarantee two of: Consistency, Availability, Partition tolerance",
                                            "correct": true
                                    },
                                    {
                                            "text": "CSS Always Processes faster",
                                            "correct": false
                                    },
                                    {
                                            "text": "Code Always Passes tests",
                                            "correct": false
                                    },
                                    {
                                            "text": "Caching Always Performs better",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a message queue?",
                            "opts": [
                                    {
                                            "text": "A system for asynchronous communication between services",
                                            "correct": true
                                    },
                                    {
                                            "text": "A list of error messages",
                                            "correct": false
                                    },
                                    {
                                            "text": "A chat application feature",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS animation queue",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is database sharding?",
                            "opts": [
                                    {
                                            "text": "Splitting a database into smaller, faster parts across servers",
                                            "correct": true
                                    },
                                    {
                                            "text": "Deleting database tables",
                                            "correct": false
                                    },
                                    {
                                            "text": "Encrypting database files",
                                            "correct": false
                                    },
                                    {
                                            "text": "Backing up databases",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is an API gateway?",
                            "opts": [
                                    {
                                            "text": "A single entry point that routes requests to appropriate microservices",
                                            "correct": true
                                    },
                                    {
                                            "text": "A web browser",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database interface",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is eventual consistency?",
                            "opts": [
                                    {
                                            "text": "A model where all replicas eventually converge to the same state",
                                            "correct": true
                                    },
                                    {
                                            "text": "Code that eventually works after debugging",
                                            "correct": false
                                    },
                                    {
                                            "text": "CSS that loads slowly",
                                            "correct": false
                                    },
                                    {
                                            "text": "A testing approach",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a CDN in system design?",
                            "opts": [
                                    {
                                            "text": "A network of servers that delivers content based on user geography",
                                            "correct": true
                                    },
                                    {
                                            "text": "A code delivery network for deployments",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS distribution node",
                                            "correct": false
                                    },
                                    {
                                            "text": "A centralized data node",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is rate limiting?",
                            "opts": [
                                    {
                                            "text": "Restricting the number of requests a user can make in a time window",
                                            "correct": true
                                    },
                                    {
                                            "text": "Limiting CSS animation speed",
                                            "correct": false
                                    },
                                    {
                                            "text": "Reducing database size",
                                            "correct": false
                                    },
                                    {
                                            "text": "Slowing down page load",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a reverse proxy?",
                            "opts": [
                                    {
                                            "text": "A server that forwards client requests to backend servers",
                                            "correct": true
                                    },
                                    {
                                            "text": "A proxy that works backwards in time",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS transform property",
                                            "correct": false
                                    },
                                    {
                                            "text": "A JavaScript debugging tool",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "ds-beg-1": {
            "title": "Python Basics",
            "questions": [
                    {
                            "q": "What is Python primarily known for?",
                            "opts": [
                                    {
                                            "text": "Readability and simplicity",
                                            "correct": true
                                    },
                                    {
                                            "text": "Fastest execution speed",
                                            "correct": false
                                    },
                                    {
                                            "text": "Only web development",
                                            "correct": false
                                    },
                                    {
                                            "text": "Hardware programming",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you create a list in Python?",
                            "opts": [
                                    {
                                            "text": "my_list = [1, 2, 3]",
                                            "correct": true
                                    },
                                    {
                                            "text": "my_list = {1, 2, 3}",
                                            "correct": false
                                    },
                                    {
                                            "text": "my_list = (1, 2, 3)",
                                            "correct": false
                                    },
                                    {
                                            "text": "my_list = <1, 2, 3>",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'len()' do in Python?",
                            "opts": [
                                    {
                                            "text": "Returns the length of an object",
                                            "correct": true
                                    },
                                    {
                                            "text": "Converts to lowercase",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creates a new line",
                                            "correct": false
                                    },
                                    {
                                            "text": "Logs an error",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "Which keyword is used for conditional statements in Python?",
                            "opts": [
                                    {
                                            "text": "if",
                                            "correct": true
                                    },
                                    {
                                            "text": "when",
                                            "correct": false
                                    },
                                    {
                                            "text": "check",
                                            "correct": false
                                    },
                                    {
                                            "text": "test",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you define a function in Python?",
                            "opts": [
                                    {
                                            "text": "def my_function():",
                                            "correct": true
                                    },
                                    {
                                            "text": "function my_function():",
                                            "correct": false
                                    },
                                    {
                                            "text": "fn my_function():",
                                            "correct": false
                                    },
                                    {
                                            "text": "create my_function():",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'pip' do in Python?",
                            "opts": [
                                    {
                                            "text": "Installs and manages Python packages",
                                            "correct": true
                                    },
                                    {
                                            "text": "Runs Python scripts faster",
                                            "correct": false
                                    },
                                    {
                                            "text": "Debugs Python code",
                                            "correct": false
                                    },
                                    {
                                            "text": "Compiles Python to machine code",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a dictionary in Python?",
                            "opts": [
                                    {
                                            "text": "A collection of key-value pairs",
                                            "correct": true
                                    },
                                    {
                                            "text": "A list of words",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of loop",
                                            "correct": false
                                    },
                                    {
                                            "text": "A file format",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you write a for loop in Python?",
                            "opts": [
                                    {
                                            "text": "for item in list:",
                                            "correct": true
                                    },
                                    {
                                            "text": "for (item; list; item++)",
                                            "correct": false
                                    },
                                    {
                                            "text": "foreach item in list",
                                            "correct": false
                                    },
                                    {
                                            "text": "loop item in list:",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a 'tuple' in Python?",
                            "opts": [
                                    {
                                            "text": "An immutable ordered collection",
                                            "correct": true
                                    },
                                    {
                                            "text": "A mutable list",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of function",
                                            "correct": false
                                    },
                                    {
                                            "text": "A file type",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'import' do in Python?",
                            "opts": [
                                    {
                                            "text": "Loads external modules for use in your code",
                                            "correct": true
                                    },
                                    {
                                            "text": "Exports code to another file",
                                            "correct": false
                                    },
                                    {
                                            "text": "Deletes a module",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creates a new variable",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is an f-string in Python?",
                            "opts": [
                                    {
                                            "text": "A formatted string literal for embedding expressions",
                                            "correct": true
                                    },
                                    {
                                            "text": "A file string",
                                            "correct": false
                                    },
                                    {
                                            "text": "A function string",
                                            "correct": false
                                    },
                                    {
                                            "text": "A float string",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you handle errors in Python?",
                            "opts": [
                                    {
                                            "text": "Using try/except blocks",
                                            "correct": true
                                    },
                                    {
                                            "text": "Using if/else only",
                                            "correct": false
                                    },
                                    {
                                            "text": "Errors cannot be handled",
                                            "correct": false
                                    },
                                    {
                                            "text": "Using catch/throw",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "ds-beg-2": {
            "title": "NumPy",
            "questions": [
                    {
                            "q": "What is NumPy used for?",
                            "opts": [
                                    {
                                            "text": "Numerical computing with arrays and matrices",
                                            "correct": true
                                    },
                                    {
                                            "text": "Web development",
                                            "correct": false
                                    },
                                    {
                                            "text": "Image editing",
                                            "correct": false
                                    },
                                    {
                                            "text": "Database management",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a NumPy array?",
                            "opts": [
                                    {
                                            "text": "A grid of values of the same type",
                                            "correct": true
                                    },
                                    {
                                            "text": "A Python dictionary",
                                            "correct": false
                                    },
                                    {
                                            "text": "A web component",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS grid",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you create a NumPy array?",
                            "opts": [
                                    {
                                            "text": "np.array([1, 2, 3])",
                                            "correct": true
                                    },
                                    {
                                            "text": "numpy.list([1, 2, 3])",
                                            "correct": false
                                    },
                                    {
                                            "text": "np.create([1, 2, 3])",
                                            "correct": false
                                    },
                                    {
                                            "text": "array.new([1, 2, 3])",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does np.zeros() do?",
                            "opts": [
                                    {
                                            "text": "Creates an array filled with zeros",
                                            "correct": true
                                    },
                                    {
                                            "text": "Deletes all zeros from an array",
                                            "correct": false
                                    },
                                    {
                                            "text": "Counts zeros in data",
                                            "correct": false
                                    },
                                    {
                                            "text": "Converts zeros to ones",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is vectorization in NumPy?",
                            "opts": [
                                    {
                                            "text": "Performing operations on entire arrays without loops",
                                            "correct": true
                                    },
                                    {
                                            "text": "Converting arrays to vectors",
                                            "correct": false
                                    },
                                    {
                                            "text": "Drawing vector graphics",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of sorting",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does .shape return?",
                            "opts": [
                                    {
                                            "text": "The dimensions of the array",
                                            "correct": true
                                    },
                                    {
                                            "text": "The data type",
                                            "correct": false
                                    },
                                    {
                                            "text": "The memory usage",
                                            "correct": false
                                    },
                                    {
                                            "text": "The array name",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you calculate the mean of a NumPy array?",
                            "opts": [
                                    {
                                            "text": "np.mean(array)",
                                            "correct": true
                                    },
                                    {
                                            "text": "array.average()",
                                            "correct": false
                                    },
                                    {
                                            "text": "mean(array)",
                                            "correct": false
                                    },
                                    {
                                            "text": "np.avg(array)",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is broadcasting in NumPy?",
                            "opts": [
                                    {
                                            "text": "Automatically expanding arrays to compatible shapes for operations",
                                            "correct": true
                                    },
                                    {
                                            "text": "Sending data over a network",
                                            "correct": false
                                    },
                                    {
                                            "text": "Printing array values",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of loop",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does np.reshape() do?",
                            "opts": [
                                    {
                                            "text": "Changes the shape of an array without changing data",
                                            "correct": true
                                    },
                                    {
                                            "text": "Sorts the array",
                                            "correct": false
                                    },
                                    {
                                            "text": "Deletes elements",
                                            "correct": false
                                    },
                                    {
                                            "text": "Copies the array",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you perform matrix multiplication in NumPy?",
                            "opts": [
                                    {
                                            "text": "np.dot(a, b) or a @ b",
                                            "correct": true
                                    },
                                    {
                                            "text": "a * b",
                                            "correct": false
                                    },
                                    {
                                            "text": "np.multiply(a, b)",
                                            "correct": false
                                    },
                                    {
                                            "text": "matrix.mult(a, b)",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is np.linspace used for?",
                            "opts": [
                                    {
                                            "text": "Creating evenly spaced numbers over a range",
                                            "correct": true
                                    },
                                    {
                                            "text": "Adding line breaks",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creating linear equations",
                                            "correct": false
                                    },
                                    {
                                            "text": "Formatting text",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What advantage does NumPy have over Python lists?",
                            "opts": [
                                    {
                                            "text": "Much faster computation due to C-based implementation",
                                            "correct": true
                                    },
                                    {
                                            "text": "More flexible data types",
                                            "correct": false
                                    },
                                    {
                                            "text": "Easier to learn",
                                            "correct": false
                                    },
                                    {
                                            "text": "Better string handling",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "ds-beg-3": {
            "title": "Pandas",
            "questions": [
                    {
                            "q": "What is a DataFrame in Pandas?",
                            "opts": [
                                    {
                                            "text": "A 2D labeled data structure with columns of potentially different types",
                                            "correct": true
                                    },
                                    {
                                            "text": "A picture frame widget",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database connection",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of chart",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you read a CSV file in Pandas?",
                            "opts": [
                                    {
                                            "text": "pd.read_csv('file.csv')",
                                            "correct": true
                                    },
                                    {
                                            "text": "pd.open('file.csv')",
                                            "correct": false
                                    },
                                    {
                                            "text": "pd.load_csv('file.csv')",
                                            "correct": false
                                    },
                                    {
                                            "text": "csv.read('file.csv')",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does .head() do?",
                            "opts": [
                                    {
                                            "text": "Returns the first 5 rows of a DataFrame",
                                            "correct": true
                                    },
                                    {
                                            "text": "Returns the column headers",
                                            "correct": false
                                    },
                                    {
                                            "text": "Returns the largest values",
                                            "correct": false
                                    },
                                    {
                                            "text": "Returns the first character of each cell",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you select a column in Pandas?",
                            "opts": [
                                    {
                                            "text": "df['column_name']",
                                            "correct": true
                                    },
                                    {
                                            "text": "df.get_column('name')",
                                            "correct": false
                                    },
                                    {
                                            "text": "df->column_name",
                                            "correct": false
                                    },
                                    {
                                            "text": "select(df, 'column_name')",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does .describe() provide?",
                            "opts": [
                                    {
                                            "text": "Summary statistics of numerical columns",
                                            "correct": true
                                    },
                                    {
                                            "text": "A description of the DataFrame schema",
                                            "correct": false
                                    },
                                    {
                                            "text": "Column names only",
                                            "correct": false
                                    },
                                    {
                                            "text": "Data types only",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you handle missing values in Pandas?",
                            "opts": [
                                    {
                                            "text": "Using .dropna() or .fillna()",
                                            "correct": true
                                    },
                                    {
                                            "text": "Ignoring them",
                                            "correct": false
                                    },
                                    {
                                            "text": "Using .remove_null()",
                                            "correct": false
                                    },
                                    {
                                            "text": "Converting them to strings",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the difference between loc and iloc?",
                            "opts": [
                                    {
                                            "text": "loc uses labels; iloc uses integer positions",
                                            "correct": true
                                    },
                                    {
                                            "text": "They are the same",
                                            "correct": false
                                    },
                                    {
                                            "text": "loc is for rows; iloc is for columns",
                                            "correct": false
                                    },
                                    {
                                            "text": "loc is faster than iloc",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you group data in Pandas?",
                            "opts": [
                                    {
                                            "text": "df.groupby('column')",
                                            "correct": true
                                    },
                                    {
                                            "text": "df.group('column')",
                                            "correct": false
                                    },
                                    {
                                            "text": "df.categorize('column')",
                                            "correct": false
                                    },
                                    {
                                            "text": "df.sort_by('column')",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does .merge() do?",
                            "opts": [
                                    {
                                            "text": "Combines two DataFrames based on common columns (like SQL JOIN)",
                                            "correct": true
                                    },
                                    {
                                            "text": "Merges cells together",
                                            "correct": false
                                    },
                                    {
                                            "text": "Combines all values into one cell",
                                            "correct": false
                                    },
                                    {
                                            "text": "Deletes duplicate rows",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you sort a DataFrame?",
                            "opts": [
                                    {
                                            "text": "df.sort_values('column')",
                                            "correct": true
                                    },
                                    {
                                            "text": "df.order('column')",
                                            "correct": false
                                    },
                                    {
                                            "text": "df.arrange('column')",
                                            "correct": false
                                    },
                                    {
                                            "text": "sort(df, 'column')",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a Series in Pandas?",
                            "opts": [
                                    {
                                            "text": "A one-dimensional labeled array",
                                            "correct": true
                                    },
                                    {
                                            "text": "A TV series dataset",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of chart",
                                            "correct": false
                                    },
                                    {
                                            "text": "A sequence of DataFrames",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you apply a function to every element in a column?",
                            "opts": [
                                    {
                                            "text": "df['col'].apply(func)",
                                            "correct": true
                                    },
                                    {
                                            "text": "df['col'].run(func)",
                                            "correct": false
                                    },
                                    {
                                            "text": "df['col'].execute(func)",
                                            "correct": false
                                    },
                                    {
                                            "text": "df.map_col(func)",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "ds-int-1": {
            "title": "Statistics",
            "questions": [
                    {
                            "q": "What is the mean of a dataset?",
                            "opts": [
                                    {
                                            "text": "The average of all values",
                                            "correct": true
                                    },
                                    {
                                            "text": "The middle value",
                                            "correct": false
                                    },
                                    {
                                            "text": "The most frequent value",
                                            "correct": false
                                    },
                                    {
                                            "text": "The range of values",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is standard deviation?",
                            "opts": [
                                    {
                                            "text": "A measure of how spread out values are from the mean",
                                            "correct": true
                                    },
                                    {
                                            "text": "The average of a dataset",
                                            "correct": false
                                    },
                                    {
                                            "text": "The total sum of values",
                                            "correct": false
                                    },
                                    {
                                            "text": "The number of data points",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the median?",
                            "opts": [
                                    {
                                            "text": "The middle value when data is sorted",
                                            "correct": true
                                    },
                                    {
                                            "text": "The average value",
                                            "correct": false
                                    },
                                    {
                                            "text": "The most common value",
                                            "correct": false
                                    },
                                    {
                                            "text": "The largest value",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a normal distribution?",
                            "opts": [
                                    {
                                            "text": "A bell-shaped curve where data clusters around the mean",
                                            "correct": true
                                    },
                                    {
                                            "text": "Data that is evenly distributed",
                                            "correct": false
                                    },
                                    {
                                            "text": "Data with no pattern",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of bar chart",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is correlation?",
                            "opts": [
                                    {
                                            "text": "A statistical measure of the relationship between two variables",
                                            "correct": true
                                    },
                                    {
                                            "text": "The cause of one variable by another",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of graph",
                                            "correct": false
                                    },
                                    {
                                            "text": "A data cleaning technique",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does a p-value represent?",
                            "opts": [
                                    {
                                            "text": "The probability that results occurred by chance",
                                            "correct": true
                                    },
                                    {
                                            "text": "The percentage of correct predictions",
                                            "correct": false
                                    },
                                    {
                                            "text": "The population size",
                                            "correct": false
                                    },
                                    {
                                            "text": "The profit margin",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the difference between population and sample?",
                            "opts": [
                                    {
                                            "text": "Population is the entire group; sample is a subset",
                                            "correct": true
                                    },
                                    {
                                            "text": "They are the same thing",
                                            "correct": false
                                    },
                                    {
                                            "text": "Sample is always larger",
                                            "correct": false
                                    },
                                    {
                                            "text": "Population refers to people only",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a hypothesis test?",
                            "opts": [
                                    {
                                            "text": "A statistical test to determine if there is enough evidence to reject a null hypothesis",
                                            "correct": true
                                    },
                                    {
                                            "text": "A guess about the data",
                                            "correct": false
                                    },
                                    {
                                            "text": "A data visualization technique",
                                            "correct": false
                                    },
                                    {
                                            "text": "A machine learning algorithm",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the mode?",
                            "opts": [
                                    {
                                            "text": "The most frequently occurring value in a dataset",
                                            "correct": true
                                    },
                                    {
                                            "text": "The middle value",
                                            "correct": false
                                    },
                                    {
                                            "text": "The average value",
                                            "correct": false
                                    },
                                    {
                                            "text": "The range of values",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is variance?",
                            "opts": [
                                    {
                                            "text": "The average of squared deviations from the mean",
                                            "correct": true
                                    },
                                    {
                                            "text": "The difference between max and min",
                                            "correct": false
                                    },
                                    {
                                            "text": "The number of unique values",
                                            "correct": false
                                    },
                                    {
                                            "text": "The total count of data points",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a confidence interval?",
                            "opts": [
                                    {
                                            "text": "A range of values that likely contains the true population parameter",
                                            "correct": true
                                    },
                                    {
                                            "text": "How confident you are in your code",
                                            "correct": false
                                    },
                                    {
                                            "text": "The accuracy of a model",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of error bar",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is regression analysis?",
                            "opts": [
                                    {
                                            "text": "A method to model the relationship between dependent and independent variables",
                                            "correct": true
                                    },
                                    {
                                            "text": "Going back to a previous version of data",
                                            "correct": false
                                    },
                                    {
                                            "text": "Removing outliers",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of classification",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "ds-int-2": {
            "title": "Machine Learning",
            "questions": [
                    {
                            "q": "What is supervised learning?",
                            "opts": [
                                    {
                                            "text": "Learning from labeled training data",
                                            "correct": true
                                    },
                                    {
                                            "text": "Learning without any data",
                                            "correct": false
                                    },
                                    {
                                            "text": "Learning by watching videos",
                                            "correct": false
                                    },
                                    {
                                            "text": "Learning from unlabeled data only",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the difference between classification and regression?",
                            "opts": [
                                    {
                                            "text": "Classification predicts categories; regression predicts continuous values",
                                            "correct": true
                                    },
                                    {
                                            "text": "They are the same",
                                            "correct": false
                                    },
                                    {
                                            "text": "Regression is always more accurate",
                                            "correct": false
                                    },
                                    {
                                            "text": "Classification only works with numbers",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is overfitting?",
                            "opts": [
                                    {
                                            "text": "When a model learns noise in training data and performs poorly on new data",
                                            "correct": true
                                    },
                                    {
                                            "text": "When a model is too simple",
                                            "correct": false
                                    },
                                    {
                                            "text": "When training takes too long",
                                            "correct": false
                                    },
                                    {
                                            "text": "When the dataset is too large",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a training/test split?",
                            "opts": [
                                    {
                                            "text": "Dividing data into training set for learning and test set for evaluation",
                                            "correct": true
                                    },
                                    {
                                            "text": "Splitting code into two files",
                                            "correct": false
                                    },
                                    {
                                            "text": "Running tests in parallel",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of cross-validation",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a decision tree?",
                            "opts": [
                                    {
                                            "text": "A model that makes predictions by following a tree of if/else decisions",
                                            "correct": true
                                    },
                                    {
                                            "text": "A file system structure",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of neural network",
                                            "correct": false
                                    },
                                    {
                                            "text": "A data visualization",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is cross-validation?",
                            "opts": [
                                    {
                                            "text": "A technique to evaluate models by splitting data into multiple folds",
                                            "correct": true
                                    },
                                    {
                                            "text": "Checking code across browsers",
                                            "correct": false
                                    },
                                    {
                                            "text": "Validating two datasets against each other",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of encryption",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a confusion matrix?",
                            "opts": [
                                    {
                                            "text": "A table showing true/false positives and negatives for classification",
                                            "correct": true
                                    },
                                    {
                                            "text": "A matrix that causes errors",
                                            "correct": false
                                    },
                                    {
                                            "text": "A visualization of data confusion",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of neural network layer",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is k-nearest neighbors (KNN)?",
                            "opts": [
                                    {
                                            "text": "An algorithm that classifies based on the majority class of nearest data points",
                                            "correct": true
                                    },
                                    {
                                            "text": "A database query method",
                                            "correct": false
                                    },
                                    {
                                            "text": "A web framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of neural network",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is feature engineering?",
                            "opts": [
                                    {
                                            "text": "Creating or selecting relevant input variables to improve model performance",
                                            "correct": true
                                    },
                                    {
                                            "text": "Building new software features",
                                            "correct": false
                                    },
                                    {
                                            "text": "Engineering hardware",
                                            "correct": false
                                    },
                                    {
                                            "text": "A deployment technique",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the bias-variance tradeoff?",
                            "opts": [
                                    {
                                            "text": "Balancing model simplicity (bias) against sensitivity to data (variance)",
                                            "correct": true
                                    },
                                    {
                                            "text": "Choosing between two datasets",
                                            "correct": false
                                    },
                                    {
                                            "text": "A hardware optimization",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of data cleaning",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is unsupervised learning?",
                            "opts": [
                                    {
                                            "text": "Learning patterns from unlabeled data",
                                            "correct": true
                                    },
                                    {
                                            "text": "Learning without a computer",
                                            "correct": false
                                    },
                                    {
                                            "text": "Learning from labeled data",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of testing",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is accuracy in machine learning?",
                            "opts": [
                                    {
                                            "text": "The percentage of correct predictions out of total predictions",
                                            "correct": true
                                    },
                                    {
                                            "text": "How fast the model trains",
                                            "correct": false
                                    },
                                    {
                                            "text": "The size of the dataset",
                                            "correct": false
                                    },
                                    {
                                            "text": "The number of features used",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "ds-int-3": {
            "title": "Data Visualization",
            "questions": [
                    {
                            "q": "What is Matplotlib used for?",
                            "opts": [
                                    {
                                            "text": "Creating static, animated, and interactive visualizations in Python",
                                            "correct": true
                                    },
                                    {
                                            "text": "Mathematical computations",
                                            "correct": false
                                    },
                                    {
                                            "text": "Web development",
                                            "correct": false
                                    },
                                    {
                                            "text": "Database management",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a scatter plot best used for?",
                            "opts": [
                                    {
                                            "text": "Showing the relationship between two numerical variables",
                                            "correct": true
                                    },
                                    {
                                            "text": "Displaying categories",
                                            "correct": false
                                    },
                                    {
                                            "text": "Showing time series only",
                                            "correct": false
                                    },
                                    {
                                            "text": "Comparing text data",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "When should you use a bar chart?",
                            "opts": [
                                    {
                                            "text": "To compare quantities across different categories",
                                            "correct": true
                                    },
                                    {
                                            "text": "To show continuous data trends",
                                            "correct": false
                                    },
                                    {
                                            "text": "To display geographic data",
                                            "correct": false
                                    },
                                    {
                                            "text": "To show correlations",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is Seaborn?",
                            "opts": [
                                    {
                                            "text": "A statistical data visualization library built on Matplotlib",
                                            "correct": true
                                    },
                                    {
                                            "text": "A database tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A web framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A machine learning library",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does a heatmap show?",
                            "opts": [
                                    {
                                            "text": "Data values as colors in a matrix format",
                                            "correct": true
                                    },
                                    {
                                            "text": "Temperature data only",
                                            "correct": false
                                    },
                                    {
                                            "text": "Geographic maps",
                                            "correct": false
                                    },
                                    {
                                            "text": "Network traffic",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a histogram?",
                            "opts": [
                                    {
                                            "text": "A chart showing the distribution of numerical data",
                                            "correct": true
                                    },
                                    {
                                            "text": "A history of changes",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of bar chart for categories",
                                            "correct": false
                                    },
                                    {
                                            "text": "A timeline visualization",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the purpose of a box plot?",
                            "opts": [
                                    {
                                            "text": "To show data distribution through quartiles and identify outliers",
                                            "correct": true
                                    },
                                    {
                                            "text": "To draw boxes around data",
                                            "correct": false
                                    },
                                    {
                                            "text": "To create container layouts",
                                            "correct": false
                                    },
                                    {
                                            "text": "To box data for shipping",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does plt.show() do in Matplotlib?",
                            "opts": [
                                    {
                                            "text": "Displays the current figure on screen",
                                            "correct": true
                                    },
                                    {
                                            "text": "Saves the plot to a file",
                                            "correct": false
                                    },
                                    {
                                            "text": "Clears the plot",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creates a new figure",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a pie chart best suited for?",
                            "opts": [
                                    {
                                            "text": "Showing proportions of a whole",
                                            "correct": true
                                    },
                                    {
                                            "text": "Showing trends over time",
                                            "correct": false
                                    },
                                    {
                                            "text": "Comparing exact values",
                                            "correct": false
                                    },
                                    {
                                            "text": "Displaying correlations",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you add a title to a Matplotlib plot?",
                            "opts": [
                                    {
                                            "text": "plt.title('My Title')",
                                            "correct": true
                                    },
                                    {
                                            "text": "plt.name('My Title')",
                                            "correct": false
                                    },
                                    {
                                            "text": "plt.header('My Title')",
                                            "correct": false
                                    },
                                    {
                                            "text": "plot.set_title('My Title')",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a line chart best used for?",
                            "opts": [
                                    {
                                            "text": "Showing trends and changes over time",
                                            "correct": true
                                    },
                                    {
                                            "text": "Comparing categories",
                                            "correct": false
                                    },
                                    {
                                            "text": "Showing proportions",
                                            "correct": false
                                    },
                                    {
                                            "text": "Displaying geographic data",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is data storytelling?",
                            "opts": [
                                    {
                                            "text": "Using visualizations and narrative to communicate insights from data",
                                            "correct": true
                                    },
                                    {
                                            "text": "Writing fiction about data",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creating animated charts",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database backup process",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "ds-adv-1": {
            "title": "Deep Learning",
            "questions": [
                    {
                            "q": "What is a neural network?",
                            "opts": [
                                    {
                                            "text": "A computing system inspired by biological neural networks",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of database",
                                            "correct": false
                                    },
                                    {
                                            "text": "A network of computers",
                                            "correct": false
                                    },
                                    {
                                            "text": "A social media platform",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is backpropagation?",
                            "opts": [
                                    {
                                            "text": "An algorithm for training neural networks by computing gradients",
                                            "correct": true
                                    },
                                    {
                                            "text": "Going back to a previous version",
                                            "correct": false
                                    },
                                    {
                                            "text": "A backup process",
                                            "correct": false
                                    },
                                    {
                                            "text": "Reversing data flow",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a CNN (Convolutional Neural Network)?",
                            "opts": [
                                    {
                                            "text": "A neural network designed for processing image and spatial data",
                                            "correct": true
                                    },
                                    {
                                            "text": "A cable news network",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of database",
                                            "correct": false
                                    },
                                    {
                                            "text": "A compression algorithm",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is an activation function?",
                            "opts": [
                                    {
                                            "text": "A function that introduces non-linearity in neural networks",
                                            "correct": true
                                    },
                                    {
                                            "text": "A function that activates the computer",
                                            "correct": false
                                    },
                                    {
                                            "text": "A login function",
                                            "correct": false
                                    },
                                    {
                                            "text": "A data loading function",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is an epoch in deep learning?",
                            "opts": [
                                    {
                                            "text": "One complete pass through the entire training dataset",
                                            "correct": true
                                    },
                                    {
                                            "text": "A time period in history",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of layer",
                                            "correct": false
                                    },
                                    {
                                            "text": "A learning rate value",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is transfer learning?",
                            "opts": [
                                    {
                                            "text": "Using a pre-trained model and fine-tuning it for a new task",
                                            "correct": true
                                    },
                                    {
                                            "text": "Transferring data between servers",
                                            "correct": false
                                    },
                                    {
                                            "text": "Moving models to production",
                                            "correct": false
                                    },
                                    {
                                            "text": "Copying code from one project to another",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a loss function?",
                            "opts": [
                                    {
                                            "text": "A function that measures how well the model's predictions match actual values",
                                            "correct": true
                                    },
                                    {
                                            "text": "A function that causes data loss",
                                            "correct": false
                                    },
                                    {
                                            "text": "A function for handling errors",
                                            "correct": false
                                    },
                                    {
                                            "text": "A logging function",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is dropout in neural networks?",
                            "opts": [
                                    {
                                            "text": "Randomly deactivating neurons during training to prevent overfitting",
                                            "correct": true
                                    },
                                    {
                                            "text": "Removing layers from the network",
                                            "correct": false
                                    },
                                    {
                                            "text": "Students dropping out of courses",
                                            "correct": false
                                    },
                                    {
                                            "text": "Reducing the dataset size",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a GAN (Generative Adversarial Network)?",
                            "opts": [
                                    {
                                            "text": "A system where two networks compete to generate realistic data",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of database",
                                            "correct": false
                                    },
                                    {
                                            "text": "A network security tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A graph analysis network",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is gradient descent?",
                            "opts": [
                                    {
                                            "text": "An optimization algorithm to minimize the loss function",
                                            "correct": true
                                    },
                                    {
                                            "text": "A downhill data flow",
                                            "correct": false
                                    },
                                    {
                                            "text": "A sorting algorithm",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of neural network",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a recurrent neural network (RNN)?",
                            "opts": [
                                    {
                                            "text": "A neural network designed for sequential data like text and time series",
                                            "correct": true
                                    },
                                    {
                                            "text": "A network that runs repeatedly",
                                            "correct": false
                                    },
                                    {
                                            "text": "A recurring billing system",
                                            "correct": false
                                    },
                                    {
                                            "text": "A network backup system",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What framework is commonly used for deep learning in Python?",
                            "opts": [
                                    {
                                            "text": "PyTorch and TensorFlow",
                                            "correct": true
                                    },
                                    {
                                            "text": "Django and Flask",
                                            "correct": false
                                    },
                                    {
                                            "text": "React and Angular",
                                            "correct": false
                                    },
                                    {
                                            "text": "NumPy only",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "ds-adv-2": {
            "title": "MLOps",
            "questions": [
                    {
                            "q": "What is MLOps?",
                            "opts": [
                                    {
                                            "text": "Practices for deploying and maintaining ML models in production",
                                            "correct": true
                                    },
                                    {
                                            "text": "A machine learning algorithm",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of neural network",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database system",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "Why is model versioning important?",
                            "opts": [
                                    {
                                            "text": "To track changes and reproduce results reliably",
                                            "correct": true
                                    },
                                    {
                                            "text": "To make models look professional",
                                            "correct": false
                                    },
                                    {
                                            "text": "To increase model speed",
                                            "correct": false
                                    },
                                    {
                                            "text": "To reduce storage space",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a model registry?",
                            "opts": [
                                    {
                                            "text": "A centralized store for managing ML model versions and metadata",
                                            "correct": true
                                    },
                                    {
                                            "text": "A government registration for AI",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of database",
                                            "correct": false
                                    },
                                    {
                                            "text": "A model training tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is CI/CD in the context of MLOps?",
                            "opts": [
                                    {
                                            "text": "Continuous Integration and Deployment for ML pipelines",
                                            "correct": true
                                    },
                                    {
                                            "text": "A data cleaning method",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of model",
                                            "correct": false
                                    },
                                    {
                                            "text": "A visualization tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is model monitoring?",
                            "opts": [
                                    {
                                            "text": "Tracking model performance in production to detect drift",
                                            "correct": true
                                    },
                                    {
                                            "text": "Watching the model train",
                                            "correct": false
                                    },
                                    {
                                            "text": "A security measure",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of testing",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is data drift?",
                            "opts": [
                                    {
                                            "text": "When production data distribution changes from training data",
                                            "correct": true
                                    },
                                    {
                                            "text": "Data moving between servers",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of data loss",
                                            "correct": false
                                    },
                                    {
                                            "text": "A visualization technique",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What tool is commonly used for experiment tracking?",
                            "opts": [
                                    {
                                            "text": "MLflow",
                                            "correct": true
                                    },
                                    {
                                            "text": "Photoshop",
                                            "correct": false
                                    },
                                    {
                                            "text": "Excel only",
                                            "correct": false
                                    },
                                    {
                                            "text": "Notepad",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a feature store?",
                            "opts": [
                                    {
                                            "text": "A centralized repository for storing and serving ML features",
                                            "correct": true
                                    },
                                    {
                                            "text": "An app store for ML tools",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of database",
                                            "correct": false
                                    },
                                    {
                                            "text": "A model training environment",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "Why is reproducibility important in ML?",
                            "opts": [
                                    {
                                            "text": "To ensure results can be consistently replicated by anyone",
                                            "correct": true
                                    },
                                    {
                                            "text": "To make code look clean",
                                            "correct": false
                                    },
                                    {
                                            "text": "To increase model speed",
                                            "correct": false
                                    },
                                    {
                                            "text": "To reduce costs",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is containerization in MLOps?",
                            "opts": [
                                    {
                                            "text": "Packaging models with dependencies in Docker containers for consistent deployment",
                                            "correct": true
                                    },
                                    {
                                            "text": "Putting data in boxes",
                                            "correct": false
                                    },
                                    {
                                            "text": "A compression technique",
                                            "correct": false
                                    },
                                    {
                                            "text": "A data storage method",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is A/B testing for ML models?",
                            "opts": [
                                    {
                                            "text": "Comparing two model versions in production to see which performs better",
                                            "correct": true
                                    },
                                    {
                                            "text": "Testing models on datasets A and B",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of unit test",
                                            "correct": false
                                    },
                                    {
                                            "text": "Alphabetical testing",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is model serving?",
                            "opts": [
                                    {
                                            "text": "Making a trained model available to receive predictions in real-time",
                                            "correct": true
                                    },
                                    {
                                            "text": "Training a model on a server",
                                            "correct": false
                                    },
                                    {
                                            "text": "Storing model files",
                                            "correct": false
                                    },
                                    {
                                            "text": "Visualizing model results",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "ds-adv-3": {
            "title": "Research Engineering",
            "questions": [
                    {
                            "q": "What is a research paper?",
                            "opts": [
                                    {
                                            "text": "A formal document presenting original research findings",
                                            "correct": true
                                    },
                                    {
                                            "text": "A newspaper article",
                                            "correct": false
                                    },
                                    {
                                            "text": "A blog post",
                                            "correct": false
                                    },
                                    {
                                            "text": "A code comment",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'state of the art' mean in ML research?",
                            "opts": [
                                    {
                                            "text": "The best-performing model or technique currently known",
                                            "correct": true
                                    },
                                    {
                                            "text": "The most artistic model",
                                            "correct": false
                                    },
                                    {
                                            "text": "The oldest technique",
                                            "correct": false
                                    },
                                    {
                                            "text": "A museum exhibit",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is an ablation study?",
                            "opts": [
                                    {
                                            "text": "Systematically removing components to understand their contribution",
                                            "correct": true
                                    },
                                    {
                                            "text": "A medical procedure",
                                            "correct": false
                                    },
                                    {
                                            "text": "A data cleaning method",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of model",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a benchmark dataset?",
                            "opts": [
                                    {
                                            "text": "A standard dataset used to compare model performance",
                                            "correct": true
                                    },
                                    {
                                            "text": "A park bench data collection",
                                            "correct": false
                                    },
                                    {
                                            "text": "A training dataset",
                                            "correct": false
                                    },
                                    {
                                            "text": "A random dataset",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is reproducibility in research?",
                            "opts": [
                                    {
                                            "text": "The ability to obtain the same results using the same methods and data",
                                            "correct": true
                                    },
                                    {
                                            "text": "Copying someone else's work",
                                            "correct": false
                                    },
                                    {
                                            "text": "Publishing quickly",
                                            "correct": false
                                    },
                                    {
                                            "text": "Using the same computer",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a hyperparameter?",
                            "opts": [
                                    {
                                            "text": "A parameter set before training that controls the learning process",
                                            "correct": true
                                    },
                                    {
                                            "text": "A very large parameter",
                                            "correct": false
                                    },
                                    {
                                            "text": "A parameter learned during training",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of data",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is arXiv?",
                            "opts": [
                                    {
                                            "text": "A preprint server for sharing research papers before peer review",
                                            "correct": true
                                    },
                                    {
                                            "text": "A compression format",
                                            "correct": false
                                    },
                                    {
                                            "text": "A programming language",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database system",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the purpose of a literature review?",
                            "opts": [
                                    {
                                            "text": "To summarize and analyze existing research on a topic",
                                            "correct": true
                                    },
                                    {
                                            "text": "To review novels",
                                            "correct": false
                                    },
                                    {
                                            "text": "To check code quality",
                                            "correct": false
                                    },
                                    {
                                            "text": "To review database schemas",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What are evaluation metrics?",
                            "opts": [
                                    {
                                            "text": "Quantitative measures to assess model performance",
                                            "correct": true
                                    },
                                    {
                                            "text": "The number of lines of code",
                                            "correct": false
                                    },
                                    {
                                            "text": "How fast a model trains",
                                            "correct": false
                                    },
                                    {
                                            "text": "The cost of computation",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does peer review mean?",
                            "opts": [
                                    {
                                            "text": "Evaluation of research by experts in the field before publication",
                                            "correct": true
                                    },
                                    {
                                            "text": "Reviewing code with teammates",
                                            "correct": false
                                    },
                                    {
                                            "text": "Reading research papers casually",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of model evaluation",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is an attention mechanism?",
                            "opts": [
                                    {
                                            "text": "A technique allowing models to focus on relevant parts of input",
                                            "correct": true
                                    },
                                    {
                                            "text": "A way to get users' attention",
                                            "correct": false
                                    },
                                    {
                                            "text": "A UI design pattern",
                                            "correct": false
                                    },
                                    {
                                            "text": "A notification system",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is fine-tuning a pre-trained model?",
                            "opts": [
                                    {
                                            "text": "Training a few layers of a pre-trained model on new domain-specific data",
                                            "correct": true
                                    },
                                    {
                                            "text": "Making the model smaller",
                                            "correct": false
                                    },
                                    {
                                            "text": "Adjusting display settings",
                                            "correct": false
                                    },
                                    {
                                            "text": "Fixing bugs in the model",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "nlp-beg-1": {
            "title": "Python for AI",
            "questions": [
                    {
                            "q": "Why is Python popular for AI?",
                            "opts": [
                                    {
                                            "text": "Rich ecosystem of ML/AI libraries and simple syntax",
                                            "correct": true
                                    },
                                    {
                                            "text": "Fastest language available",
                                            "correct": false
                                    },
                                    {
                                            "text": "Only language that supports AI",
                                            "correct": false
                                    },
                                    {
                                            "text": "Best for mobile apps",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is Jupyter Notebook?",
                            "opts": [
                                    {
                                            "text": "An interactive environment for writing and running Python code",
                                            "correct": true
                                    },
                                    {
                                            "text": "A text editor",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A web browser",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'pip install' do?",
                            "opts": [
                                    {
                                            "text": "Downloads and installs Python packages",
                                            "correct": true
                                    },
                                    {
                                            "text": "Runs Python scripts",
                                            "correct": false
                                    },
                                    {
                                            "text": "Compiles Python code",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creates virtual environments",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a virtual environment?",
                            "opts": [
                                    {
                                            "text": "An isolated Python environment with its own packages",
                                            "correct": true
                                    },
                                    {
                                            "text": "A virtual reality application",
                                            "correct": false
                                    },
                                    {
                                            "text": "A cloud server",
                                            "correct": false
                                    },
                                    {
                                            "text": "A Docker container",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What library is commonly used for HTTP requests in Python?",
                            "opts": [
                                    {
                                            "text": "requests",
                                            "correct": true
                                    },
                                    {
                                            "text": "http-client",
                                            "correct": false
                                    },
                                    {
                                            "text": "fetch",
                                            "correct": false
                                    },
                                    {
                                            "text": "ajax",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is JSON in the context of AI APIs?",
                            "opts": [
                                    {
                                            "text": "A lightweight data format for exchanging data between systems",
                                            "correct": true
                                    },
                                    {
                                            "text": "A programming language",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of neural network",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'import torch' do?",
                            "opts": [
                                    {
                                            "text": "Imports the PyTorch deep learning library",
                                            "correct": true
                                    },
                                    {
                                            "text": "Creates a fire animation",
                                            "correct": false
                                    },
                                    {
                                            "text": "Imports a logging tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "Starts a web server",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is list comprehension in Python?",
                            "opts": [
                                    {
                                            "text": "A concise way to create lists using a single line of code",
                                            "correct": true
                                    },
                                    {
                                            "text": "Reading a list aloud",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of data structure",
                                            "correct": false
                                    },
                                    {
                                            "text": "A debugging technique",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a lambda function?",
                            "opts": [
                                    {
                                            "text": "A small anonymous function defined with the lambda keyword",
                                            "correct": true
                                    },
                                    {
                                            "text": "A function named lambda",
                                            "correct": false
                                    },
                                    {
                                            "text": "A Greek letter in code",
                                            "correct": false
                                    },
                                    {
                                            "text": "A serverless function",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'type()' return in Python?",
                            "opts": [
                                    {
                                            "text": "The data type of an object",
                                            "correct": true
                                    },
                                    {
                                            "text": "The typing speed",
                                            "correct": false
                                    },
                                    {
                                            "text": "The file type",
                                            "correct": false
                                    },
                                    {
                                            "text": "The keyboard layout",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is NumPy's role in AI?",
                            "opts": [
                                    {
                                            "text": "Efficient numerical operations on arrays and matrices",
                                            "correct": true
                                    },
                                    {
                                            "text": "Creating web interfaces",
                                            "correct": false
                                    },
                                    {
                                            "text": "Managing databases",
                                            "correct": false
                                    },
                                    {
                                            "text": "Text processing only",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "Why are GPUs important for AI?",
                            "opts": [
                                    {
                                            "text": "They can perform many parallel computations, speeding up training",
                                            "correct": true
                                    },
                                    {
                                            "text": "They display better graphics",
                                            "correct": false
                                    },
                                    {
                                            "text": "They store more data",
                                            "correct": false
                                    },
                                    {
                                            "text": "They are cheaper than CPUs",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "nlp-beg-2": {
            "title": "Prompt Engineering",
            "questions": [
                    {
                            "q": "What is prompt engineering?",
                            "opts": [
                                    {
                                            "text": "Designing effective inputs to get desired outputs from AI models",
                                            "correct": true
                                    },
                                    {
                                            "text": "Building hardware prompts",
                                            "correct": false
                                    },
                                    {
                                            "text": "Engineering software deployment",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creating database queries",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a system prompt?",
                            "opts": [
                                    {
                                            "text": "Instructions that define the AI's behavior and role",
                                            "correct": true
                                    },
                                    {
                                            "text": "An error message",
                                            "correct": false
                                    },
                                    {
                                            "text": "A computer startup message",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database connection string",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is 'few-shot prompting'?",
                            "opts": [
                                    {
                                            "text": "Providing a few examples in the prompt to guide the model's response",
                                            "correct": true
                                    },
                                    {
                                            "text": "Using a small model",
                                            "correct": false
                                    },
                                    {
                                            "text": "Training with few data points",
                                            "correct": false
                                    },
                                    {
                                            "text": "A photography technique",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is 'zero-shot prompting'?",
                            "opts": [
                                    {
                                            "text": "Asking the model to perform a task without any examples",
                                            "correct": true
                                    },
                                    {
                                            "text": "A model that has zero accuracy",
                                            "correct": false
                                    },
                                    {
                                            "text": "Training without data",
                                            "correct": false
                                    },
                                    {
                                            "text": "A camera setting",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is chain-of-thought prompting?",
                            "opts": [
                                    {
                                            "text": "Asking the model to reason step-by-step before giving an answer",
                                            "correct": true
                                    },
                                    {
                                            "text": "Linking multiple prompts together",
                                            "correct": false
                                    },
                                    {
                                            "text": "A blockchain technique",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of encryption",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "Why is context important in prompts?",
                            "opts": [
                                    {
                                            "text": "It helps the model understand the task and produce better outputs",
                                            "correct": true
                                    },
                                    {
                                            "text": "It makes prompts longer",
                                            "correct": false
                                    },
                                    {
                                            "text": "It is not important",
                                            "correct": false
                                    },
                                    {
                                            "text": "It confuses the model",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is 'temperature' in AI models?",
                            "opts": [
                                    {
                                            "text": "A parameter controlling randomness in the model's output",
                                            "correct": true
                                    },
                                    {
                                            "text": "The CPU temperature",
                                            "correct": false
                                    },
                                    {
                                            "text": "The room temperature for servers",
                                            "correct": false
                                    },
                                    {
                                            "text": "A measure of model accuracy",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a 'token' in the context of LLMs?",
                            "opts": [
                                    {
                                            "text": "A piece of text (word or sub-word) that the model processes",
                                            "correct": true
                                    },
                                    {
                                            "text": "An authentication token",
                                            "correct": false
                                    },
                                    {
                                            "text": "A cryptocurrency",
                                            "correct": false
                                    },
                                    {
                                            "text": "A game token",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the role of 'max_tokens' parameter?",
                            "opts": [
                                    {
                                            "text": "It limits the length of the model's response",
                                            "correct": true
                                    },
                                    {
                                            "text": "It sets the maximum number of API calls",
                                            "correct": false
                                    },
                                    {
                                            "text": "It controls model accuracy",
                                            "correct": false
                                    },
                                    {
                                            "text": "It limits the input length",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a hallucination in AI?",
                            "opts": [
                                    {
                                            "text": "When the model generates plausible but incorrect or fabricated information",
                                            "correct": true
                                    },
                                    {
                                            "text": "A visual effect in the UI",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of bug in code",
                                            "correct": false
                                    },
                                    {
                                            "text": "A hardware malfunction",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is 'role-playing' in prompts?",
                            "opts": [
                                    {
                                            "text": "Assigning the model a specific role or persona for better responses",
                                            "correct": true
                                    },
                                    {
                                            "text": "Playing games with the AI",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of testing",
                                            "correct": false
                                    },
                                    {
                                            "text": "A security technique",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'top-p' (nucleus sampling) control?",
                            "opts": [
                                    {
                                            "text": "The cumulative probability threshold for token selection",
                                            "correct": true
                                    },
                                    {
                                            "text": "The top prediction only",
                                            "correct": false
                                    },
                                    {
                                            "text": "The processing speed",
                                            "correct": false
                                    },
                                    {
                                            "text": "The number of paragraphs",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "nlp-beg-3": {
            "title": "OpenAI APIs",
            "questions": [
                    {
                            "q": "What is the OpenAI API?",
                            "opts": [
                                    {
                                            "text": "A service to access GPT models programmatically",
                                            "correct": true
                                    },
                                    {
                                            "text": "An open-source AI framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A free AI tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database API",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What format does the OpenAI Chat API use?",
                            "opts": [
                                    {
                                            "text": "A list of messages with roles (system, user, assistant)",
                                            "correct": true
                                    },
                                    {
                                            "text": "Plain text only",
                                            "correct": false
                                    },
                                    {
                                            "text": "XML format",
                                            "correct": false
                                    },
                                    {
                                            "text": "CSV format",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is an API key?",
                            "opts": [
                                    {
                                            "text": "A secret credential to authenticate API requests",
                                            "correct": true
                                    },
                                    {
                                            "text": "A physical key for servers",
                                            "correct": false
                                    },
                                    {
                                            "text": "A keyboard shortcut",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of encryption",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is 'streaming' in the API context?",
                            "opts": [
                                    {
                                            "text": "Receiving the response token by token as it is generated",
                                            "correct": true
                                    },
                                    {
                                            "text": "Playing music",
                                            "correct": false
                                    },
                                    {
                                            "text": "Watching videos",
                                            "correct": false
                                    },
                                    {
                                            "text": "Transferring files",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What model is commonly used for chat completions?",
                            "opts": [
                                    {
                                            "text": "gpt-4 or gpt-3.5-turbo",
                                            "correct": true
                                    },
                                    {
                                            "text": "model-v1",
                                            "correct": false
                                    },
                                    {
                                            "text": "ai-chat-basic",
                                            "correct": false
                                    },
                                    {
                                            "text": "llm-standard",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How are API costs typically calculated?",
                            "opts": [
                                    {
                                            "text": "Based on the number of input and output tokens used",
                                            "correct": true
                                    },
                                    {
                                            "text": "Monthly flat fee",
                                            "correct": false
                                    },
                                    {
                                            "text": "Per API key created",
                                            "correct": false
                                    },
                                    {
                                            "text": "Based on response quality",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is 'function calling' in the OpenAI API?",
                            "opts": [
                                    {
                                            "text": "Allowing the model to call predefined functions with structured arguments",
                                            "correct": true
                                    },
                                    {
                                            "text": "Calling OpenAI's phone support",
                                            "correct": false
                                    },
                                    {
                                            "text": "Running Python functions",
                                            "correct": false
                                    },
                                    {
                                            "text": "A deprecated feature",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What HTTP method is used to make API requests?",
                            "opts": [
                                    {
                                            "text": "POST",
                                            "correct": true
                                    },
                                    {
                                            "text": "GET",
                                            "correct": false
                                    },
                                    {
                                            "text": "DELETE",
                                            "correct": false
                                    },
                                    {
                                            "text": "PUT",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is rate limiting in APIs?",
                            "opts": [
                                    {
                                            "text": "Restricting the number of requests per time period",
                                            "correct": true
                                    },
                                    {
                                            "text": "Limiting response speed",
                                            "correct": false
                                    },
                                    {
                                            "text": "Reducing model accuracy",
                                            "correct": false
                                    },
                                    {
                                            "text": "A pricing model",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the embeddings API used for?",
                            "opts": [
                                    {
                                            "text": "Converting text into numerical vectors for similarity search",
                                            "correct": true
                                    },
                                    {
                                            "text": "Embedding images in websites",
                                            "correct": false
                                    },
                                    {
                                            "text": "Embedding videos",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creating HTML embeds",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the 'content moderation' endpoint?",
                            "opts": [
                                    {
                                            "text": "An API to check if text violates content policies",
                                            "correct": true
                                    },
                                    {
                                            "text": "A content management system",
                                            "correct": false
                                    },
                                    {
                                            "text": "A social media tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database cleanup tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How do you handle API errors properly?",
                            "opts": [
                                    {
                                            "text": "Using try/catch blocks and checking HTTP status codes",
                                            "correct": true
                                    },
                                    {
                                            "text": "Ignoring them",
                                            "correct": false
                                    },
                                    {
                                            "text": "Retrying infinitely",
                                            "correct": false
                                    },
                                    {
                                            "text": "Restarting the computer",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "nlp-int-1": {
            "title": "Transformers",
            "questions": [
                    {
                            "q": "What is the Transformer architecture?",
                            "opts": [
                                    {
                                            "text": "A neural network architecture based on self-attention mechanisms",
                                            "correct": true
                                    },
                                    {
                                            "text": "A robot from a movie",
                                            "correct": false
                                    },
                                    {
                                            "text": "An electrical transformer",
                                            "correct": false
                                    },
                                    {
                                            "text": "A data conversion tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is self-attention?",
                            "opts": [
                                    {
                                            "text": "A mechanism allowing each token to attend to all other tokens in a sequence",
                                            "correct": true
                                    },
                                    {
                                            "text": "A mindfulness technique",
                                            "correct": false
                                    },
                                    {
                                            "text": "A self-referencing data structure",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of loss function",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is BERT?",
                            "opts": [
                                    {
                                            "text": "A pre-trained model for bidirectional language understanding",
                                            "correct": true
                                    },
                                    {
                                            "text": "A character from Sesame Street",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database system",
                                            "correct": false
                                    },
                                    {
                                            "text": "A web browser",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is GPT?",
                            "opts": [
                                    {
                                            "text": "Generative Pre-trained Transformer for text generation",
                                            "correct": true
                                    },
                                    {
                                            "text": "General Purpose Technology",
                                            "correct": false
                                    },
                                    {
                                            "text": "A graphic processing tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database query language",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is tokenization?",
                            "opts": [
                                    {
                                            "text": "Breaking text into smaller units (tokens) for model processing",
                                            "correct": true
                                    },
                                    {
                                            "text": "Creating authentication tokens",
                                            "correct": false
                                    },
                                    {
                                            "text": "A cryptocurrency process",
                                            "correct": false
                                    },
                                    {
                                            "text": "Encrypting data",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is positional encoding?",
                            "opts": [
                                    {
                                            "text": "Adding position information to tokens since transformers have no inherent order",
                                            "correct": true
                                    },
                                    {
                                            "text": "Encoding GPS positions",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS positioning technique",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of encryption",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the encoder-decoder structure?",
                            "opts": [
                                    {
                                            "text": "Encoder processes input; decoder generates output",
                                            "correct": true
                                    },
                                    {
                                            "text": "A hardware encoding device",
                                            "correct": false
                                    },
                                    {
                                            "text": "A video compression tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database structure",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is multi-head attention?",
                            "opts": [
                                    {
                                            "text": "Running multiple attention computations in parallel for richer representations",
                                            "correct": true
                                    },
                                    {
                                            "text": "A multi-headed neural network",
                                            "correct": false
                                    },
                                    {
                                            "text": "Paying attention to multiple screens",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of CNN",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is fine-tuning a transformer?",
                            "opts": [
                                    {
                                            "text": "Training a pre-trained model on task-specific data",
                                            "correct": true
                                    },
                                    {
                                            "text": "Adjusting audio settings",
                                            "correct": false
                                    },
                                    {
                                            "text": "Fixing bugs in the code",
                                            "correct": false
                                    },
                                    {
                                            "text": "Optimizing database queries",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the 'attention is all you need' paper?",
                            "opts": [
                                    {
                                            "text": "The foundational paper introducing the Transformer architecture",
                                            "correct": true
                                    },
                                    {
                                            "text": "A self-help book",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS tutorial",
                                            "correct": false
                                    },
                                    {
                                            "text": "A marketing study",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is masked language modeling?",
                            "opts": [
                                    {
                                            "text": "Training by predicting masked (hidden) words in a sentence",
                                            "correct": true
                                    },
                                    {
                                            "text": "Hiding language from users",
                                            "correct": false
                                    },
                                    {
                                            "text": "A privacy technique",
                                            "correct": false
                                    },
                                    {
                                            "text": "Censoring text",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is HuggingFace?",
                            "opts": [
                                    {
                                            "text": "A platform and library for sharing and using pre-trained NLP models",
                                            "correct": true
                                    },
                                    {
                                            "text": "A social media app",
                                            "correct": false
                                    },
                                    {
                                            "text": "An emoji keyboard",
                                            "correct": false
                                    },
                                    {
                                            "text": "A facial recognition tool",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "nlp-int-2": {
            "title": "LangChain",
            "questions": [
                    {
                            "q": "What is LangChain?",
                            "opts": [
                                    {
                                            "text": "A framework for building applications with large language models",
                                            "correct": true
                                    },
                                    {
                                            "text": "A blockchain for languages",
                                            "correct": false
                                    },
                                    {
                                            "text": "A translation tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database chain",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What are 'chains' in LangChain?",
                            "opts": [
                                    {
                                            "text": "Sequences of calls to LLMs or tools combined together",
                                            "correct": true
                                    },
                                    {
                                            "text": "Physical chains",
                                            "correct": false
                                    },
                                    {
                                            "text": "Database relationships",
                                            "correct": false
                                    },
                                    {
                                            "text": "Email chains",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a 'prompt template' in LangChain?",
                            "opts": [
                                    {
                                            "text": "A reusable prompt structure with placeholders for dynamic content",
                                            "correct": true
                                    },
                                    {
                                            "text": "A CSS template",
                                            "correct": false
                                    },
                                    {
                                            "text": "An HTML template",
                                            "correct": false
                                    },
                                    {
                                            "text": "A pre-written email",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What are 'agents' in LangChain?",
                            "opts": [
                                    {
                                            "text": "LLM-powered systems that can use tools and make decisions",
                                            "correct": true
                                    },
                                    {
                                            "text": "Customer service representatives",
                                            "correct": false
                                    },
                                    {
                                            "text": "Security agents",
                                            "correct": false
                                    },
                                    {
                                            "text": "Database administrators",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a 'retriever' in LangChain?",
                            "opts": [
                                    {
                                            "text": "A component that fetches relevant documents from a knowledge base",
                                            "correct": true
                                    },
                                    {
                                            "text": "A search engine",
                                            "correct": false
                                    },
                                    {
                                            "text": "A data backup tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A dog breed",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is memory in LangChain?",
                            "opts": [
                                    {
                                            "text": "A mechanism to maintain conversation history across interactions",
                                            "correct": true
                                    },
                                    {
                                            "text": "Computer RAM",
                                            "correct": false
                                    },
                                    {
                                            "text": "A storage device",
                                            "correct": false
                                    },
                                    {
                                            "text": "A caching system",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a vector store?",
                            "opts": [
                                    {
                                            "text": "A database optimized for storing and querying vector embeddings",
                                            "correct": true
                                    },
                                    {
                                            "text": "A clothing store",
                                            "correct": false
                                    },
                                    {
                                            "text": "A file storage system",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of array",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is LCEL (LangChain Expression Language)?",
                            "opts": [
                                    {
                                            "text": "A declarative way to compose chains using the pipe operator",
                                            "correct": true
                                    },
                                    {
                                            "text": "A programming language",
                                            "correct": false
                                    },
                                    {
                                            "text": "A query language",
                                            "correct": false
                                    },
                                    {
                                            "text": "A configuration format",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a 'tool' in LangChain agents?",
                            "opts": [
                                    {
                                            "text": "A function the agent can call to perform actions like web search or calculations",
                                            "correct": true
                                    },
                                    {
                                            "text": "A physical tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A debugging utility",
                                            "correct": false
                                    },
                                    {
                                            "text": "A UI component",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is document loading in LangChain?",
                            "opts": [
                                    {
                                            "text": "Importing documents from various sources (PDF, web, etc.) for processing",
                                            "correct": true
                                    },
                                    {
                                            "text": "Uploading files to a server",
                                            "correct": false
                                    },
                                    {
                                            "text": "Printing documents",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creating new documents",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is text splitting?",
                            "opts": [
                                    {
                                            "text": "Breaking large documents into smaller chunks for embedding and retrieval",
                                            "correct": true
                                    },
                                    {
                                            "text": "Dividing text into paragraphs",
                                            "correct": false
                                    },
                                    {
                                            "text": "Splitting a file into parts",
                                            "correct": false
                                    },
                                    {
                                            "text": "Separating words",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "Why is LangChain useful?",
                            "opts": [
                                    {
                                            "text": "It simplifies building complex LLM applications with pre-built components",
                                            "correct": true
                                    },
                                    {
                                            "text": "It makes LLMs run faster",
                                            "correct": false
                                    },
                                    {
                                            "text": "It replaces all other frameworks",
                                            "correct": false
                                    },
                                    {
                                            "text": "It provides free API access",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "nlp-int-3": {
            "title": "RAG Systems",
            "questions": [
                    {
                            "q": "What does RAG stand for?",
                            "opts": [
                                    {
                                            "text": "Retrieval-Augmented Generation",
                                            "correct": true
                                    },
                                    {
                                            "text": "Random Algorithm Generator",
                                            "correct": false
                                    },
                                    {
                                            "text": "Rapid API Gateway",
                                            "correct": false
                                    },
                                    {
                                            "text": "Real-time Analytics Graph",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "How does RAG work?",
                            "opts": [
                                    {
                                            "text": "It retrieves relevant documents then uses them as context for the LLM to generate answers",
                                            "correct": true
                                    },
                                    {
                                            "text": "It generates random text",
                                            "correct": false
                                    },
                                    {
                                            "text": "It only searches databases",
                                            "correct": false
                                    },
                                    {
                                            "text": "It trains new models",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What are embeddings used for in RAG?",
                            "opts": [
                                    {
                                            "text": "Converting text to vectors for semantic similarity search",
                                            "correct": true
                                    },
                                    {
                                            "text": "Embedding images",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creating HTML elements",
                                            "correct": false
                                    },
                                    {
                                            "text": "Encrypting data",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a vector database?",
                            "opts": [
                                    {
                                            "text": "A database optimized for storing and querying high-dimensional vectors",
                                            "correct": true
                                    },
                                    {
                                            "text": "A regular SQL database",
                                            "correct": false
                                    },
                                    {
                                            "text": "A graph database",
                                            "correct": false
                                    },
                                    {
                                            "text": "A file system",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "Why is RAG better than fine-tuning for some use cases?",
                            "opts": [
                                    {
                                            "text": "It uses up-to-date information without retraining the model",
                                            "correct": true
                                    },
                                    {
                                            "text": "It is always faster",
                                            "correct": false
                                    },
                                    {
                                            "text": "It requires no data",
                                            "correct": false
                                    },
                                    {
                                            "text": "It is free",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is chunking in RAG?",
                            "opts": [
                                    {
                                            "text": "Splitting documents into smaller pieces for better retrieval",
                                            "correct": true
                                    },
                                    {
                                            "text": "Compressing data",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of error",
                                            "correct": false
                                    },
                                    {
                                            "text": "Grouping users",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is semantic search?",
                            "opts": [
                                    {
                                            "text": "Search based on meaning rather than exact keyword matching",
                                            "correct": true
                                    },
                                    {
                                            "text": "Searching by file size",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of web crawling",
                                            "correct": false
                                    },
                                    {
                                            "text": "Database indexing",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is cosine similarity?",
                            "opts": [
                                    {
                                            "text": "A metric measuring the angle between two vectors to determine similarity",
                                            "correct": true
                                    },
                                    {
                                            "text": "A trigonometry function",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS property",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of distance formula",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is Pinecone?",
                            "opts": [
                                    {
                                            "text": "A managed vector database service for RAG applications",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of tree",
                                            "correct": false
                                    },
                                    {
                                            "text": "A web framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A programming language",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the 'context window' limitation?",
                            "opts": [
                                    {
                                            "text": "The maximum amount of text an LLM can process at once",
                                            "correct": true
                                    },
                                    {
                                            "text": "A browser window size",
                                            "correct": false
                                    },
                                    {
                                            "text": "A time limit for responses",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS overflow property",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is hybrid search in RAG?",
                            "opts": [
                                    {
                                            "text": "Combining keyword search and semantic search for better results",
                                            "correct": true
                                    },
                                    {
                                            "text": "Using two different databases",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of car engine",
                                            "correct": false
                                    },
                                    {
                                            "text": "Mixing two models",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is reranking in RAG?",
                            "opts": [
                                    {
                                            "text": "Scoring and reordering retrieved documents by relevance before sending to LLM",
                                            "correct": true
                                    },
                                    {
                                            "text": "Sorting alphabetically",
                                            "correct": false
                                    },
                                    {
                                            "text": "Ranking web pages",
                                            "correct": false
                                    },
                                    {
                                            "text": "A leaderboard system",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "nlp-adv-1": {
            "title": "Fine Tuning",
            "questions": [
                    {
                            "q": "What is fine-tuning?",
                            "opts": [
                                    {
                                            "text": "Training a pre-trained model on domain-specific data",
                                            "correct": true
                                    },
                                    {
                                            "text": "Tuning a musical instrument",
                                            "correct": false
                                    },
                                    {
                                            "text": "Optimizing hardware",
                                            "correct": false
                                    },
                                    {
                                            "text": "Debugging code",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is LoRA?",
                            "opts": [
                                    {
                                            "text": "Low-Rank Adaptation — an efficient fine-tuning technique",
                                            "correct": true
                                    },
                                    {
                                            "text": "A radio frequency",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A programming language",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the advantage of PEFT?",
                            "opts": [
                                    {
                                            "text": "Parameter-Efficient Fine-Tuning uses fewer resources than full fine-tuning",
                                            "correct": true
                                    },
                                    {
                                            "text": "It makes models larger",
                                            "correct": false
                                    },
                                    {
                                            "text": "It requires more GPU memory",
                                            "correct": false
                                    },
                                    {
                                            "text": "It is only for images",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What format is training data typically in for fine-tuning?",
                            "opts": [
                                    {
                                            "text": "JSONL with prompt-completion pairs",
                                            "correct": true
                                    },
                                    {
                                            "text": "MP3 audio files",
                                            "correct": false
                                    },
                                    {
                                            "text": "PNG images",
                                            "correct": false
                                    },
                                    {
                                            "text": "PDF documents",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is catastrophic forgetting?",
                            "opts": [
                                    {
                                            "text": "When fine-tuning causes the model to lose its general capabilities",
                                            "correct": true
                                    },
                                    {
                                            "text": "Forgetting your password",
                                            "correct": false
                                    },
                                    {
                                            "text": "A memory leak",
                                            "correct": false
                                    },
                                    {
                                            "text": "Deleting a database",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is QLoRA?",
                            "opts": [
                                    {
                                            "text": "Quantized LoRA for fine-tuning with even less memory",
                                            "correct": true
                                    },
                                    {
                                            "text": "A query language",
                                            "correct": false
                                    },
                                    {
                                            "text": "A quality assurance tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of database",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "Why might you fine-tune instead of using prompt engineering?",
                            "opts": [
                                    {
                                            "text": "For consistent behavior, domain-specific knowledge, or cost reduction",
                                            "correct": true
                                    },
                                    {
                                            "text": "Fine-tuning is always better",
                                            "correct": false
                                    },
                                    {
                                            "text": "Prompt engineering doesn't work",
                                            "correct": false
                                    },
                                    {
                                            "text": "Fine-tuning is free",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a validation set in fine-tuning?",
                            "opts": [
                                    {
                                            "text": "Data held out from training to evaluate model performance during fine-tuning",
                                            "correct": true
                                    },
                                    {
                                            "text": "A set of passwords",
                                            "correct": false
                                    },
                                    {
                                            "text": "A testing framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A configuration file",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the learning rate in fine-tuning?",
                            "opts": [
                                    {
                                            "text": "A hyperparameter controlling how much the model updates per step",
                                            "correct": true
                                    },
                                    {
                                            "text": "How fast someone learns",
                                            "correct": false
                                    },
                                    {
                                            "text": "The internet speed",
                                            "correct": false
                                    },
                                    {
                                            "text": "The number of training steps",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is instruction tuning?",
                            "opts": [
                                    {
                                            "text": "Fine-tuning a model to follow instructions using instruction-response pairs",
                                            "correct": true
                                    },
                                    {
                                            "text": "Writing user manuals",
                                            "correct": false
                                    },
                                    {
                                            "text": "Teaching coding",
                                            "correct": false
                                    },
                                    {
                                            "text": "A deployment step",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What compute resources are needed for fine-tuning?",
                            "opts": [
                                    {
                                            "text": "GPUs with sufficient VRAM, typically A100 or equivalent",
                                            "correct": true
                                    },
                                    {
                                            "text": "Only a CPU is needed",
                                            "correct": false
                                    },
                                    {
                                            "text": "No special hardware",
                                            "correct": false
                                    },
                                    {
                                            "text": "A regular laptop",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is data quality's role in fine-tuning?",
                            "opts": [
                                    {
                                            "text": "High-quality, diverse data is crucial for good fine-tuning results",
                                            "correct": true
                                    },
                                    {
                                            "text": "Data quality doesn't matter",
                                            "correct": false
                                    },
                                    {
                                            "text": "Only quantity matters",
                                            "correct": false
                                    },
                                    {
                                            "text": "Noisy data is preferred",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "nlp-adv-2": {
            "title": "Agent Architectures",
            "questions": [
                    {
                            "q": "What is an AI agent?",
                            "opts": [
                                    {
                                            "text": "An autonomous system that can perceive, reason, and act to achieve goals",
                                            "correct": true
                                    },
                                    {
                                            "text": "A chatbot only",
                                            "correct": false
                                    },
                                    {
                                            "text": "A secret agent",
                                            "correct": false
                                    },
                                    {
                                            "text": "A customer service representative",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is ReAct in agent design?",
                            "opts": [
                                    {
                                            "text": "A framework combining Reasoning and Acting in LLM agents",
                                            "correct": true
                                    },
                                    {
                                            "text": "A JavaScript library",
                                            "correct": false
                                    },
                                    {
                                            "text": "A chemical reaction",
                                            "correct": false
                                    },
                                    {
                                            "text": "A UI pattern",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is tool use in agents?",
                            "opts": [
                                    {
                                            "text": "The ability to call external APIs, databases, or functions",
                                            "correct": true
                                    },
                                    {
                                            "text": "Using physical tools",
                                            "correct": false
                                    },
                                    {
                                            "text": "A debugging feature",
                                            "correct": false
                                    },
                                    {
                                            "text": "A build tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a multi-agent system?",
                            "opts": [
                                    {
                                            "text": "Multiple AI agents collaborating to solve complex tasks",
                                            "correct": true
                                    },
                                    {
                                            "text": "Multiple users on a platform",
                                            "correct": false
                                    },
                                    {
                                            "text": "A network of servers",
                                            "correct": false
                                    },
                                    {
                                            "text": "A multi-player game",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is planning in agent systems?",
                            "opts": [
                                    {
                                            "text": "Breaking down complex tasks into subtasks and executing them",
                                            "correct": true
                                    },
                                    {
                                            "text": "Project management",
                                            "correct": false
                                    },
                                    {
                                            "text": "Calendar scheduling",
                                            "correct": false
                                    },
                                    {
                                            "text": "Financial planning",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is an agent's 'scratchpad'?",
                            "opts": [
                                    {
                                            "text": "Working memory where the agent tracks its reasoning and actions",
                                            "correct": true
                                    },
                                    {
                                            "text": "A notepad application",
                                            "correct": false
                                    },
                                    {
                                            "text": "A temporary file",
                                            "correct": false
                                    },
                                    {
                                            "text": "A debugging log",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is reflection in AI agents?",
                            "opts": [
                                    {
                                            "text": "The agent evaluating its own outputs to improve future actions",
                                            "correct": true
                                    },
                                    {
                                            "text": "Displaying a mirror image",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS property",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of error",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is AutoGPT?",
                            "opts": [
                                    {
                                            "text": "An autonomous AI agent that can set and pursue goals with minimal input",
                                            "correct": true
                                    },
                                    {
                                            "text": "An automatic car",
                                            "correct": false
                                    },
                                    {
                                            "text": "A GPU optimization tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A text generator",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the observe-think-act loop?",
                            "opts": [
                                    {
                                            "text": "The fundamental cycle where agents perceive, reason, and take action",
                                            "correct": true
                                    },
                                    {
                                            "text": "A fitness routine",
                                            "correct": false
                                    },
                                    {
                                            "text": "A testing methodology",
                                            "correct": false
                                    },
                                    {
                                            "text": "A deployment process",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is guardrailing in agents?",
                            "opts": [
                                    {
                                            "text": "Setting boundaries to prevent agents from taking harmful or unintended actions",
                                            "correct": true
                                    },
                                    {
                                            "text": "Physical safety barriers",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS layout technique",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of validation",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a 'plugin' in agent architectures?",
                            "opts": [
                                    {
                                            "text": "An extensible module that adds capabilities like web browsing or code execution",
                                            "correct": true
                                    },
                                    {
                                            "text": "A power adapter",
                                            "correct": false
                                    },
                                    {
                                            "text": "A browser extension",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database connector",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What challenge do long-running agents face?",
                            "opts": [
                                    {
                                            "text": "Context window limits, error accumulation, and maintaining coherent goals",
                                            "correct": true
                                    },
                                    {
                                            "text": "Battery life",
                                            "correct": false
                                    },
                                    {
                                            "text": "Internet speed",
                                            "correct": false
                                    },
                                    {
                                            "text": "Screen resolution",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "nlp-adv-3": {
            "title": "LLM Infrastructure",
            "questions": [
                    {
                            "q": "What is model serving?",
                            "opts": [
                                    {
                                            "text": "Hosting a model to handle inference requests in production",
                                            "correct": true
                                    },
                                    {
                                            "text": "Training a model",
                                            "correct": false
                                    },
                                    {
                                            "text": "Storing model weights",
                                            "correct": false
                                    },
                                    {
                                            "text": "Downloading a model",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is quantization?",
                            "opts": [
                                    {
                                            "text": "Reducing model precision (e.g., float32 to int8) to decrease size and speed up inference",
                                            "correct": true
                                    },
                                    {
                                            "text": "Counting data points",
                                            "correct": false
                                    },
                                    {
                                            "text": "A quantum computing technique",
                                            "correct": false
                                    },
                                    {
                                            "text": "Increasing model accuracy",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is vLLM?",
                            "opts": [
                                    {
                                            "text": "A high-throughput inference engine for serving LLMs",
                                            "correct": true
                                    },
                                    {
                                            "text": "A virtual machine",
                                            "correct": false
                                    },
                                    {
                                            "text": "A video editor",
                                            "correct": false
                                    },
                                    {
                                            "text": "A programming language",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is model distillation?",
                            "opts": [
                                    {
                                            "text": "Training a smaller model to mimic a larger model's behavior",
                                            "correct": true
                                    },
                                    {
                                            "text": "Purifying water",
                                            "correct": false
                                    },
                                    {
                                            "text": "Compressing files",
                                            "correct": false
                                    },
                                    {
                                            "text": "A data cleaning technique",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is batching in inference?",
                            "opts": [
                                    {
                                            "text": "Processing multiple requests together for better GPU utilization",
                                            "correct": true
                                    },
                                    {
                                            "text": "Running tasks in sequence",
                                            "correct": false
                                    },
                                    {
                                            "text": "A cooking technique",
                                            "correct": false
                                    },
                                    {
                                            "text": "Grouping files",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is GGUF format?",
                            "opts": [
                                    {
                                            "text": "A file format for storing quantized LLM models for efficient inference",
                                            "correct": true
                                    },
                                    {
                                            "text": "A graphics format",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database format",
                                            "correct": false
                                    },
                                    {
                                            "text": "A video format",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is KV cache?",
                            "opts": [
                                    {
                                            "text": "Storing key-value pairs from attention to avoid recomputation during generation",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of Redis cache",
                                            "correct": false
                                    },
                                    {
                                            "text": "A browser cache",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS cache",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is model parallelism?",
                            "opts": [
                                    {
                                            "text": "Splitting a model across multiple GPUs to fit in memory",
                                            "correct": true
                                    },
                                    {
                                            "text": "Running multiple models simultaneously",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of data parallelism",
                                            "correct": false
                                    },
                                    {
                                            "text": "Parallel programming",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is Ollama?",
                            "opts": [
                                    {
                                            "text": "A tool for running LLMs locally on personal computers",
                                            "correct": true
                                    },
                                    {
                                            "text": "A llama simulator",
                                            "correct": false
                                    },
                                    {
                                            "text": "A cloud service",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the purpose of a load balancer for LLM serving?",
                            "opts": [
                                    {
                                            "text": "Distributing inference requests across multiple model instances",
                                            "correct": true
                                    },
                                    {
                                            "text": "Balancing training data",
                                            "correct": false
                                    },
                                    {
                                            "text": "A fitness tracking device",
                                            "correct": false
                                    },
                                    {
                                            "text": "Balancing GPU temperatures",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is RLHF?",
                            "opts": [
                                    {
                                            "text": "Reinforcement Learning from Human Feedback for aligning models",
                                            "correct": true
                                    },
                                    {
                                            "text": "Really Large Hidden Features",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database query method",
                                            "correct": false
                                    },
                                    {
                                            "text": "A web framework",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is prompt caching?",
                            "opts": [
                                    {
                                            "text": "Storing processed prompt embeddings to avoid redundant computation",
                                            "correct": true
                                    },
                                    {
                                            "text": "Saving prompts to a file",
                                            "correct": false
                                    },
                                    {
                                            "text": "Caching API keys",
                                            "correct": false
                                    },
                                    {
                                            "text": "Browser caching",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "accessibility-design-systems": {
            "title": "Accessibility & Design Systems",
            "questions": [
                    {
                            "q": "What does WCAG stand for?",
                            "opts": [
                                    {
                                            "text": "Web Content Accessibility Guidelines",
                                            "correct": true
                                    },
                                    {
                                            "text": "Web CSS Animation Guide",
                                            "correct": false
                                    },
                                    {
                                            "text": "World Computer Access Group",
                                            "correct": false
                                    },
                                    {
                                            "text": "Web Component Architecture Guide",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a design system?",
                            "opts": [
                                    {
                                            "text": "A collection of reusable components and design standards",
                                            "correct": true
                                    },
                                    {
                                            "text": "A computer operating system",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CAD software",
                                            "correct": false
                                    },
                                    {
                                            "text": "A file management system",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is color contrast ratio?",
                            "opts": [
                                    {
                                            "text": "The difference in brightness between text and background colors",
                                            "correct": true
                                    },
                                    {
                                            "text": "The number of colors used",
                                            "correct": false
                                    },
                                    {
                                            "text": "The monitor resolution",
                                            "correct": false
                                    },
                                    {
                                            "text": "The file size of images",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a screen reader?",
                            "opts": [
                                    {
                                            "text": "Software that reads screen content aloud for visually impaired users",
                                            "correct": true
                                    },
                                    {
                                            "text": "A screen capture tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A screen cleaning device",
                                            "correct": false
                                    },
                                    {
                                            "text": "A display monitor",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is ARIA?",
                            "opts": [
                                    {
                                            "text": "Accessible Rich Internet Applications — attributes for web accessibility",
                                            "correct": true
                                    },
                                    {
                                            "text": "A music streaming service",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A JavaScript library",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a design token?",
                            "opts": [
                                    {
                                            "text": "A named value representing a design decision (color, spacing, etc.)",
                                            "correct": true
                                    },
                                    {
                                            "text": "An authentication token",
                                            "correct": false
                                    },
                                    {
                                            "text": "A game token",
                                            "correct": false
                                    },
                                    {
                                            "text": "A cryptocurrency",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "Why is keyboard navigation important?",
                            "opts": [
                                    {
                                            "text": "Some users cannot use a mouse and rely on keyboard for navigation",
                                            "correct": true
                                    },
                                    {
                                            "text": "It makes websites faster",
                                            "correct": false
                                    },
                                    {
                                            "text": "It is required by CSS",
                                            "correct": false
                                    },
                                    {
                                            "text": "It improves SEO",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the purpose of alt text on images?",
                            "opts": [
                                    {
                                            "text": "To provide text descriptions for screen readers and when images fail to load",
                                            "correct": true
                                    },
                                    {
                                            "text": "To improve image quality",
                                            "correct": false
                                    },
                                    {
                                            "text": "To add captions for SEO only",
                                            "correct": false
                                    },
                                    {
                                            "text": "To compress images",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a component library?",
                            "opts": [
                                    {
                                            "text": "A collection of pre-built, reusable UI components",
                                            "correct": true
                                    },
                                    {
                                            "text": "A book library",
                                            "correct": false
                                    },
                                    {
                                            "text": "A JavaScript file",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is semantic HTML?",
                            "opts": [
                                    {
                                            "text": "Using HTML elements that convey meaning about their content",
                                            "correct": true
                                    },
                                    {
                                            "text": "Writing HTML comments",
                                            "correct": false
                                    },
                                    {
                                            "text": "Using div for everything",
                                            "correct": false
                                    },
                                    {
                                            "text": "Adding CSS classes",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is focus management?",
                            "opts": [
                                    {
                                            "text": "Controlling which element receives keyboard focus in the correct order",
                                            "correct": true
                                    },
                                    {
                                            "text": "Staying focused while coding",
                                            "correct": false
                                    },
                                    {
                                            "text": "A camera feature",
                                            "correct": false
                                    },
                                    {
                                            "text": "A meditation technique",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What minimum contrast ratio does WCAG AA require for normal text?",
                            "opts": [
                                    {
                                            "text": "4.5:1",
                                            "correct": true
                                    },
                                    {
                                            "text": "2:1",
                                            "correct": false
                                    },
                                    {
                                            "text": "10:1",
                                            "correct": false
                                    },
                                    {
                                            "text": "1:1",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "react-native-flutter": {
            "title": "Cross-Platform Frameworks",
            "questions": [
                    {
                            "q": "What is React Native?",
                            "opts": [
                                    {
                                            "text": "A framework for building native mobile apps using React",
                                            "correct": true
                                    },
                                    {
                                            "text": "A CSS framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A web browser",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is Flutter?",
                            "opts": [
                                    {
                                            "text": "Google's UI toolkit for building natively compiled apps from a single codebase",
                                            "correct": true
                                    },
                                    {
                                            "text": "A bird species",
                                            "correct": false
                                    },
                                    {
                                            "text": "A JavaScript library",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS animation",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What language does Flutter use?",
                            "opts": [
                                    {
                                            "text": "Dart",
                                            "correct": true
                                    },
                                    {
                                            "text": "JavaScript",
                                            "correct": false
                                    },
                                    {
                                            "text": "Python",
                                            "correct": false
                                    },
                                    {
                                            "text": "Swift",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a Widget in Flutter?",
                            "opts": [
                                    {
                                            "text": "The basic building block of a Flutter UI",
                                            "correct": true
                                    },
                                    {
                                            "text": "A desktop gadget",
                                            "correct": false
                                    },
                                    {
                                            "text": "A JavaScript component",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database record",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is JSX in React Native?",
                            "opts": [
                                    {
                                            "text": "A syntax extension that lets you write HTML-like code in JavaScript",
                                            "correct": true
                                    },
                                    {
                                            "text": "A new programming language",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database query language",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS preprocessor",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is hot reload?",
                            "opts": [
                                    {
                                            "text": "Instantly seeing code changes in the app without restarting",
                                            "correct": true
                                    },
                                    {
                                            "text": "Restarting the phone",
                                            "correct": false
                                    },
                                    {
                                            "text": "Overheating the device",
                                            "correct": false
                                    },
                                    {
                                            "text": "A debugging error",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the advantage of cross-platform development?",
                            "opts": [
                                    {
                                            "text": "Writing one codebase that runs on both iOS and Android",
                                            "correct": true
                                    },
                                    {
                                            "text": "Apps run faster",
                                            "correct": false
                                    },
                                    {
                                            "text": "Free app store listings",
                                            "correct": false
                                    },
                                    {
                                            "text": "No testing needed",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is state management in mobile apps?",
                            "opts": [
                                    {
                                            "text": "Controlling and updating data that drives the UI",
                                            "correct": true
                                    },
                                    {
                                            "text": "Managing US states",
                                            "correct": false
                                    },
                                    {
                                            "text": "A government regulation",
                                            "correct": false
                                    },
                                    {
                                            "text": "File management",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is Expo in React Native?",
                            "opts": [
                                    {
                                            "text": "A framework that simplifies React Native development with pre-built tools",
                                            "correct": true
                                    },
                                    {
                                            "text": "An exhibition",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the bridge in React Native?",
                            "opts": [
                                    {
                                            "text": "The communication layer between JavaScript and native platform code",
                                            "correct": true
                                    },
                                    {
                                            "text": "A physical bridge",
                                            "correct": false
                                    },
                                    {
                                            "text": "A network protocol",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS layout",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does 'native' mean in cross-platform context?",
                            "opts": [
                                    {
                                            "text": "Components compile to real platform UI elements, not web views",
                                            "correct": true
                                    },
                                    {
                                            "text": "Born in a specific country",
                                            "correct": false
                                    },
                                    {
                                            "text": "Written in C++",
                                            "correct": false
                                    },
                                    {
                                            "text": "Runs only on one platform",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is Material Design in Flutter?",
                            "opts": [
                                    {
                                            "text": "Google's design system providing pre-built UI components",
                                            "correct": true
                                    },
                                    {
                                            "text": "Physical material selection",
                                            "correct": false
                                    },
                                    {
                                            "text": "A 3D modeling tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database schema",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "mobile-ui": {
            "title": "Mobile UI & Navigation",
            "questions": [
                    {
                            "q": "What is stack navigation?",
                            "opts": [
                                    {
                                            "text": "Navigation where screens are pushed onto and popped from a stack",
                                            "correct": true
                                    },
                                    {
                                            "text": "Stacking UI elements vertically",
                                            "correct": false
                                    },
                                    {
                                            "text": "A data structure",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS property",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is tab navigation?",
                            "opts": [
                                    {
                                            "text": "Bottom or top tabs for switching between main app sections",
                                            "correct": true
                                    },
                                    {
                                            "text": "Opening browser tabs",
                                            "correct": false
                                    },
                                    {
                                            "text": "Tab key navigation",
                                            "correct": false
                                    },
                                    {
                                            "text": "A table layout",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a drawer navigation?",
                            "opts": [
                                    {
                                            "text": "A side panel that slides in to show navigation options",
                                            "correct": true
                                    },
                                    {
                                            "text": "A furniture drawer",
                                            "correct": false
                                    },
                                    {
                                            "text": "A drawing tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A hidden div",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is responsive design in mobile?",
                            "opts": [
                                    {
                                            "text": "Adapting UI layout to different screen sizes and orientations",
                                            "correct": true
                                    },
                                    {
                                            "text": "Fast response times",
                                            "correct": false
                                    },
                                    {
                                            "text": "Answering user questions",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of animation",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What are gestures in mobile apps?",
                            "opts": [
                                    {
                                            "text": "Touch interactions like swipe, pinch, and long press",
                                            "correct": true
                                    },
                                    {
                                            "text": "Hand signals",
                                            "correct": false
                                    },
                                    {
                                            "text": "CSS animations",
                                            "correct": false
                                    },
                                    {
                                            "text": "Keyboard shortcuts",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a modal in mobile UI?",
                            "opts": [
                                    {
                                            "text": "A dialog that overlays the screen requiring user action",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of model",
                                            "correct": false
                                    },
                                    {
                                            "text": "A modal verb",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database mode",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a bottom sheet?",
                            "opts": [
                                    {
                                            "text": "A UI panel that slides up from the bottom of the screen",
                                            "correct": true
                                    },
                                    {
                                            "text": "A spreadsheet at the bottom",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS footer",
                                            "correct": false
                                    },
                                    {
                                            "text": "A bed sheet",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the purpose of a splash screen?",
                            "opts": [
                                    {
                                            "text": "A loading screen shown when the app first launches",
                                            "correct": true
                                    },
                                    {
                                            "text": "A water effect",
                                            "correct": false
                                    },
                                    {
                                            "text": "An error screen",
                                            "correct": false
                                    },
                                    {
                                            "text": "A login screen",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is deep linking?",
                            "opts": [
                                    {
                                            "text": "Opening a specific screen in the app directly from a URL",
                                            "correct": true
                                    },
                                    {
                                            "text": "Creating deep copies",
                                            "correct": false
                                    },
                                    {
                                            "text": "Linking to deep web",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS pseudo-selector",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a safe area in mobile UI?",
                            "opts": [
                                    {
                                            "text": "The visible area that avoids notches, status bars, and system UI",
                                            "correct": true
                                    },
                                    {
                                            "text": "A secure network zone",
                                            "correct": false
                                    },
                                    {
                                            "text": "A password-protected area",
                                            "correct": false
                                    },
                                    {
                                            "text": "A backup location",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a list/FlatList component?",
                            "opts": [
                                    {
                                            "text": "An optimized scrollable list for rendering large datasets efficiently",
                                            "correct": true
                                    },
                                    {
                                            "text": "A flat design pattern",
                                            "correct": false
                                    },
                                    {
                                            "text": "A to-do list",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database table",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is adaptive vs responsive design?",
                            "opts": [
                                    {
                                            "text": "Adaptive serves different layouts per device; responsive fluidly adjusts",
                                            "correct": true
                                    },
                                    {
                                            "text": "They are identical",
                                            "correct": false
                                    },
                                    {
                                            "text": "Adaptive is only for mobile",
                                            "correct": false
                                    },
                                    {
                                            "text": "Responsive is only for desktop",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "mobile-advanced": {
            "title": "Performance & App Store Deployment",
            "questions": [
                    {
                            "q": "What is app performance profiling?",
                            "opts": [
                                    {
                                            "text": "Measuring and analyzing an app's speed, memory, and CPU usage",
                                            "correct": true
                                    },
                                    {
                                            "text": "Creating a user profile",
                                            "correct": false
                                    },
                                    {
                                            "text": "Marketing analysis",
                                            "correct": false
                                    },
                                    {
                                            "text": "Social media tracking",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the Google Play Console?",
                            "opts": [
                                    {
                                            "text": "A platform for publishing and managing Android apps",
                                            "correct": true
                                    },
                                    {
                                            "text": "A gaming console",
                                            "correct": false
                                    },
                                    {
                                            "text": "A JavaScript console",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is App Store Connect?",
                            "opts": [
                                    {
                                            "text": "Apple's platform for submitting and managing iOS apps",
                                            "correct": true
                                    },
                                    {
                                            "text": "A Wi-Fi connection app",
                                            "correct": false
                                    },
                                    {
                                            "text": "A social media platform",
                                            "correct": false
                                    },
                                    {
                                            "text": "A networking tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is code signing?",
                            "opts": [
                                    {
                                            "text": "Digitally signing an app to verify the developer's identity",
                                            "correct": true
                                    },
                                    {
                                            "text": "Writing your name in code",
                                            "correct": false
                                    },
                                    {
                                            "text": "Using sign language in code",
                                            "correct": false
                                    },
                                    {
                                            "text": "A commenting convention",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a build configuration?",
                            "opts": [
                                    {
                                            "text": "Settings for debug vs release builds (optimization, minification)",
                                            "correct": true
                                    },
                                    {
                                            "text": "A construction plan",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database schema",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS configuration",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What causes jank in mobile apps?",
                            "opts": [
                                    {
                                            "text": "Dropped frames due to heavy computation on the main/UI thread",
                                            "correct": true
                                    },
                                    {
                                            "text": "Bad internet connection",
                                            "correct": false
                                    },
                                    {
                                            "text": "Low battery",
                                            "correct": false
                                    },
                                    {
                                            "text": "Too many colors",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is ProGuard/R8?",
                            "opts": [
                                    {
                                            "text": "A tool that shrinks, optimizes, and obfuscates Android app code",
                                            "correct": true
                                    },
                                    {
                                            "text": "A security guard app",
                                            "correct": false
                                    },
                                    {
                                            "text": "A testing framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A design tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is TestFlight?",
                            "opts": [
                                    {
                                            "text": "Apple's platform for beta testing iOS apps before release",
                                            "correct": true
                                    },
                                    {
                                            "text": "A flight simulator",
                                            "correct": false
                                    },
                                    {
                                            "text": "A testing framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A travel app",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What are memory leaks in mobile apps?",
                            "opts": [
                                    {
                                            "text": "When the app fails to release unused memory, causing slowdowns or crashes",
                                            "correct": true
                                    },
                                    {
                                            "text": "Physical water damage",
                                            "correct": false
                                    },
                                    {
                                            "text": "Data leaks to the internet",
                                            "correct": false
                                    },
                                    {
                                            "text": "Battery drain",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a privacy policy requirement for app stores?",
                            "opts": [
                                    {
                                            "text": "A legal document explaining how user data is collected and used",
                                            "correct": true
                                    },
                                    {
                                            "text": "A password requirement",
                                            "correct": false
                                    },
                                    {
                                            "text": "An encryption method",
                                            "correct": false
                                    },
                                    {
                                            "text": "A UI design pattern",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is lazy loading in mobile apps?",
                            "opts": [
                                    {
                                            "text": "Loading content only when it scrolls into view",
                                            "correct": true
                                    },
                                    {
                                            "text": "An app that loads slowly",
                                            "correct": false
                                    },
                                    {
                                            "text": "A lazy developer practice",
                                            "correct": false
                                    },
                                    {
                                            "text": "An error state",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is OTA (Over-the-Air) updates?",
                            "opts": [
                                    {
                                            "text": "Pushing code updates to users without going through app store review",
                                            "correct": true
                                    },
                                    {
                                            "text": "Wireless charging",
                                            "correct": false
                                    },
                                    {
                                            "text": "Bluetooth connectivity",
                                            "correct": false
                                    },
                                    {
                                            "text": "Wi-Fi updates",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "networking-basics": {
            "title": "Networking & Protocols",
            "questions": [
                    {
                            "q": "What is TCP/IP?",
                            "opts": [
                                    {
                                            "text": "The foundational protocol suite for internet communication",
                                            "correct": true
                                    },
                                    {
                                            "text": "A programming language",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of cable",
                                            "correct": false
                                    },
                                    {
                                            "text": "A web browser",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does DNS stand for?",
                            "opts": [
                                    {
                                            "text": "Domain Name System — translates domain names to IP addresses",
                                            "correct": true
                                    },
                                    {
                                            "text": "Data Network Security",
                                            "correct": false
                                    },
                                    {
                                            "text": "Digital Naming Service",
                                            "correct": false
                                    },
                                    {
                                            "text": "Direct Network Switch",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is HTTP?",
                            "opts": [
                                    {
                                            "text": "HyperText Transfer Protocol for web communication",
                                            "correct": true
                                    },
                                    {
                                            "text": "High Tech Transfer Protocol",
                                            "correct": false
                                    },
                                    {
                                            "text": "Home Testing Tool Protocol",
                                            "correct": false
                                    },
                                    {
                                            "text": "Hardware Transfer Protocol",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the OSI model?",
                            "opts": [
                                    {
                                            "text": "A 7-layer conceptual framework for network communication",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of network cable",
                                            "correct": false
                                    },
                                    {
                                            "text": "An operating system",
                                            "correct": false
                                    },
                                    {
                                            "text": "A security protocol",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is an IP address?",
                            "opts": [
                                    {
                                            "text": "A unique numerical identifier for devices on a network",
                                            "correct": true
                                    },
                                    {
                                            "text": "An email address",
                                            "correct": false
                                    },
                                    {
                                            "text": "A physical address",
                                            "correct": false
                                    },
                                    {
                                            "text": "A web URL",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the difference between TCP and UDP?",
                            "opts": [
                                    {
                                            "text": "TCP is reliable and ordered; UDP is faster but unreliable",
                                            "correct": true
                                    },
                                    {
                                            "text": "They are the same",
                                            "correct": false
                                    },
                                    {
                                            "text": "UDP is more secure",
                                            "correct": false
                                    },
                                    {
                                            "text": "TCP is only for email",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a firewall?",
                            "opts": [
                                    {
                                            "text": "A security system that monitors and controls network traffic",
                                            "correct": true
                                    },
                                    {
                                            "text": "A physical wall that prevents fire",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of router",
                                            "correct": false
                                    },
                                    {
                                            "text": "A web browser",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a port number?",
                            "opts": [
                                    {
                                            "text": "A number identifying a specific service or process on a device",
                                            "correct": true
                                    },
                                    {
                                            "text": "A physical port on a computer",
                                            "correct": false
                                    },
                                    {
                                            "text": "A shipping port",
                                            "correct": false
                                    },
                                    {
                                            "text": "A version number",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is HTTPS?",
                            "opts": [
                                    {
                                            "text": "HTTP Secure — encrypted web communication using TLS/SSL",
                                            "correct": true
                                    },
                                    {
                                            "text": "A faster version of HTTP",
                                            "correct": false
                                    },
                                    {
                                            "text": "A different protocol unrelated to HTTP",
                                            "correct": false
                                    },
                                    {
                                            "text": "HTTP for servers only",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a subnet?",
                            "opts": [
                                    {
                                            "text": "A logical subdivision of an IP network",
                                            "correct": true
                                    },
                                    {
                                            "text": "An underwater network cable",
                                            "correct": false
                                    },
                                    {
                                            "text": "A sub-menu in networking tools",
                                            "correct": false
                                    },
                                    {
                                            "text": "A small internet",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a MAC address?",
                            "opts": [
                                    {
                                            "text": "A unique hardware identifier assigned to a network interface",
                                            "correct": true
                                    },
                                    {
                                            "text": "An Apple computer address",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of IP address",
                                            "correct": false
                                    },
                                    {
                                            "text": "A media access card",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a VPN?",
                            "opts": [
                                    {
                                            "text": "Virtual Private Network — creates a secure encrypted tunnel over the internet",
                                            "correct": true
                                    },
                                    {
                                            "text": "Very Private Network",
                                            "correct": false
                                    },
                                    {
                                            "text": "Virtual Protocol Number",
                                            "correct": false
                                    },
                                    {
                                            "text": "Video Processing Network",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "security-fundamentals": {
            "title": "Security Fundamentals",
            "questions": [
                    {
                            "q": "What is encryption?",
                            "opts": [
                                    {
                                            "text": "Converting data into a coded form to prevent unauthorized access",
                                            "correct": true
                                    },
                                    {
                                            "text": "Compressing files",
                                            "correct": false
                                    },
                                    {
                                            "text": "Deleting files permanently",
                                            "correct": false
                                    },
                                    {
                                            "text": "Backing up data",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is hashing?",
                            "opts": [
                                    {
                                            "text": "A one-way function that converts input to a fixed-size string",
                                            "correct": true
                                    },
                                    {
                                            "text": "Cutting data into pieces",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of encoding",
                                            "correct": false
                                    },
                                    {
                                            "text": "Encrypting passwords reversibly",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the CIA triad?",
                            "opts": [
                                    {
                                            "text": "Confidentiality, Integrity, and Availability — core security principles",
                                            "correct": true
                                    },
                                    {
                                            "text": "A government agency",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of virus",
                                            "correct": false
                                    },
                                    {
                                            "text": "A network protocol",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is phishing?",
                            "opts": [
                                    {
                                            "text": "A social engineering attack using fake communications to steal information",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of fishing",
                                            "correct": false
                                    },
                                    {
                                            "text": "A network protocol",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of malware",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is two-factor authentication (2FA)?",
                            "opts": [
                                    {
                                            "text": "Requiring two forms of verification to access an account",
                                            "correct": true
                                    },
                                    {
                                            "text": "Having two passwords",
                                            "correct": false
                                    },
                                    {
                                            "text": "Logging in from two devices",
                                            "correct": false
                                    },
                                    {
                                            "text": "A double firewall",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a vulnerability?",
                            "opts": [
                                    {
                                            "text": "A weakness in a system that can be exploited by attackers",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of virus",
                                            "correct": false
                                    },
                                    {
                                            "text": "A network connection",
                                            "correct": false
                                    },
                                    {
                                            "text": "A software feature",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is symmetric encryption?",
                            "opts": [
                                    {
                                            "text": "Encryption where the same key is used for both encryption and decryption",
                                            "correct": true
                                    },
                                    {
                                            "text": "Using two different keys",
                                            "correct": false
                                    },
                                    {
                                            "text": "Encryption that only works one way",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of hashing",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a brute force attack?",
                            "opts": [
                                    {
                                            "text": "Trying every possible combination until the correct one is found",
                                            "correct": true
                                    },
                                    {
                                            "text": "A physical attack on servers",
                                            "correct": false
                                    },
                                    {
                                            "text": "A DDoS attack",
                                            "correct": false
                                    },
                                    {
                                            "text": "A social engineering attack",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is SSL/TLS?",
                            "opts": [
                                    {
                                            "text": "Protocols that provide encrypted communication over the internet",
                                            "correct": true
                                    },
                                    {
                                            "text": "A programming language",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of firewall",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database protocol",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is access control?",
                            "opts": [
                                    {
                                            "text": "Restricting who can access resources and what actions they can perform",
                                            "correct": true
                                    },
                                    {
                                            "text": "Controlling internet access speed",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of keyboard",
                                            "correct": false
                                    },
                                    {
                                            "text": "A monitor setting",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a security audit?",
                            "opts": [
                                    {
                                            "text": "A systematic evaluation of an organization's security posture",
                                            "correct": true
                                    },
                                    {
                                            "text": "An accounting review",
                                            "correct": false
                                    },
                                    {
                                            "text": "A software update",
                                            "correct": false
                                    },
                                    {
                                            "text": "A hardware inspection",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the principle of least privilege?",
                            "opts": [
                                    {
                                            "text": "Giving users only the minimum access needed to perform their tasks",
                                            "correct": true
                                    },
                                    {
                                            "text": "Giving everyone admin access",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of encryption",
                                            "correct": false
                                    },
                                    {
                                            "text": "A networking protocol",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "ethical-hacking": {
            "title": "Ethical Hacking",
            "questions": [
                    {
                            "q": "What is ethical hacking?",
                            "opts": [
                                    {
                                            "text": "Authorized testing of systems to find and fix security vulnerabilities",
                                            "correct": true
                                    },
                                    {
                                            "text": "Hacking for fun",
                                            "correct": false
                                    },
                                    {
                                            "text": "Illegal hacking with good intentions",
                                            "correct": false
                                    },
                                    {
                                            "text": "A video game",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a penetration test?",
                            "opts": [
                                    {
                                            "text": "A simulated cyberattack to evaluate system security",
                                            "correct": true
                                    },
                                    {
                                            "text": "A physical strength test",
                                            "correct": false
                                    },
                                    {
                                            "text": "A software performance test",
                                            "correct": false
                                    },
                                    {
                                            "text": "A network speed test",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is Nmap used for?",
                            "opts": [
                                    {
                                            "text": "Network scanning and discovering hosts, services, and open ports",
                                            "correct": true
                                    },
                                    {
                                            "text": "Making maps",
                                            "correct": false
                                    },
                                    {
                                            "text": "A navigation app",
                                            "correct": false
                                    },
                                    {
                                            "text": "A code editor",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is SQL injection?",
                            "opts": [
                                    {
                                            "text": "Inserting malicious SQL code into application queries",
                                            "correct": true
                                    },
                                    {
                                            "text": "A database backup method",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of medication",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS injection",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is XSS (Cross-Site Scripting)?",
                            "opts": [
                                    {
                                            "text": "Injecting malicious scripts into web pages viewed by others",
                                            "correct": true
                                    },
                                    {
                                            "text": "Writing CSS across sites",
                                            "correct": false
                                    },
                                    {
                                            "text": "Cross-site searching",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of redirect",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is Kali Linux?",
                            "opts": [
                                    {
                                            "text": "A Linux distribution designed for penetration testing and security research",
                                            "correct": true
                                    },
                                    {
                                            "text": "A regular Linux distro",
                                            "correct": false
                                    },
                                    {
                                            "text": "A mobile operating system",
                                            "correct": false
                                    },
                                    {
                                            "text": "A web server",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is social engineering?",
                            "opts": [
                                    {
                                            "text": "Manipulating people into revealing confidential information",
                                            "correct": true
                                    },
                                    {
                                            "text": "Building social media apps",
                                            "correct": false
                                    },
                                    {
                                            "text": "Engineering social networks",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of coding",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a CVE?",
                            "opts": [
                                    {
                                            "text": "Common Vulnerabilities and Exposures — a catalog of known security flaws",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of virus",
                                            "correct": false
                                    },
                                    {
                                            "text": "A programming language",
                                            "correct": false
                                    },
                                    {
                                            "text": "A network protocol",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a reverse shell?",
                            "opts": [
                                    {
                                            "text": "A connection where the target machine connects back to the attacker's system",
                                            "correct": true
                                    },
                                    {
                                            "text": "A shell script that runs backwards",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of terminal",
                                            "correct": false
                                    },
                                    {
                                            "text": "A CSS property",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is privilege escalation?",
                            "opts": [
                                    {
                                            "text": "Gaining higher access rights than originally authorized",
                                            "correct": true
                                    },
                                    {
                                            "text": "Moving to a higher floor",
                                            "correct": false
                                    },
                                    {
                                            "text": "Increasing network speed",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of upgrade",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a vulnerability scanner?",
                            "opts": [
                                    {
                                            "text": "An automated tool that identifies security weaknesses in systems",
                                            "correct": true
                                    },
                                    {
                                            "text": "A physical scanner",
                                            "correct": false
                                    },
                                    {
                                            "text": "An antivirus program",
                                            "correct": false
                                    },
                                    {
                                            "text": "A barcode scanner",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is responsible disclosure?",
                            "opts": [
                                    {
                                            "text": "Reporting vulnerabilities to the vendor before making them public",
                                            "correct": true
                                    },
                                    {
                                            "text": "Publishing vulnerabilities immediately",
                                            "correct": false
                                    },
                                    {
                                            "text": "Keeping vulnerabilities secret forever",
                                            "correct": false
                                    },
                                    {
                                            "text": "Selling vulnerabilities",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "cyber-advanced": {
            "title": "Advanced Threats & Incident Response",
            "questions": [
                    {
                            "q": "What is an APT (Advanced Persistent Threat)?",
                            "opts": [
                                    {
                                            "text": "A prolonged, targeted cyberattack by a well-funded adversary",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of software package manager",
                                            "correct": false
                                    },
                                    {
                                            "text": "An antivirus tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "An app testing tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is incident response?",
                            "opts": [
                                    {
                                            "text": "The organized approach to handling security breaches",
                                            "correct": true
                                    },
                                    {
                                            "text": "Responding to customer complaints",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of emergency service",
                                            "correct": false
                                    },
                                    {
                                            "text": "A network monitoring tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is forensic analysis in cybersecurity?",
                            "opts": [
                                    {
                                            "text": "Investigating digital evidence to determine what happened during a breach",
                                            "correct": true
                                    },
                                    {
                                            "text": "A crime scene investigation",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of malware scan",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database audit",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is ransomware?",
                            "opts": [
                                    {
                                            "text": "Malware that encrypts files and demands payment for decryption",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of firewall",
                                            "correct": false
                                    },
                                    {
                                            "text": "An antivirus program",
                                            "correct": false
                                    },
                                    {
                                            "text": "A legitimate encryption tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a SIEM?",
                            "opts": [
                                    {
                                            "text": "Security Information and Event Management system for monitoring threats",
                                            "correct": true
                                    },
                                    {
                                            "text": "A social media platform",
                                            "correct": false
                                    },
                                    {
                                            "text": "A programming framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of database",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is threat modeling?",
                            "opts": [
                                    {
                                            "text": "Identifying and prioritizing potential security threats to a system",
                                            "correct": true
                                    },
                                    {
                                            "text": "Creating 3D models of threats",
                                            "correct": false
                                    },
                                    {
                                            "text": "A machine learning model",
                                            "correct": false
                                    },
                                    {
                                            "text": "A fashion modeling technique",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a zero-day vulnerability?",
                            "opts": [
                                    {
                                            "text": "A flaw unknown to the vendor that can be exploited before a patch exists",
                                            "correct": true
                                    },
                                    {
                                            "text": "A vulnerability that takes zero days to fix",
                                            "correct": false
                                    },
                                    {
                                            "text": "The first day of a security breach",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of DDoS attack",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is malware analysis?",
                            "opts": [
                                    {
                                            "text": "Studying malicious software to understand its behavior and impact",
                                            "correct": true
                                    },
                                    {
                                            "text": "Analyzing market trends",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of code review",
                                            "correct": false
                                    },
                                    {
                                            "text": "Analyzing network speed",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a honeypot?",
                            "opts": [
                                    {
                                            "text": "A decoy system designed to attract and study attackers",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of server",
                                            "correct": false
                                    },
                                    {
                                            "text": "A jar of honey",
                                            "correct": false
                                    },
                                    {
                                            "text": "A firewall configuration",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the MITRE ATT&CK framework?",
                            "opts": [
                                    {
                                            "text": "A knowledge base of adversary tactics and techniques",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of attack",
                                            "correct": false
                                    },
                                    {
                                            "text": "A military framework",
                                            "correct": false
                                    },
                                    {
                                            "text": "A programming framework",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is chain of custody in forensics?",
                            "opts": [
                                    {
                                            "text": "Documentation tracking the handling of digital evidence",
                                            "correct": true
                                    },
                                    {
                                            "text": "A blockchain technology",
                                            "correct": false
                                    },
                                    {
                                            "text": "A prison management system",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of encryption",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a DDoS attack?",
                            "opts": [
                                    {
                                            "text": "Overwhelming a system with traffic from multiple sources to make it unavailable",
                                            "correct": true
                                    },
                                    {
                                            "text": "Downloading data quickly",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of virus",
                                            "correct": false
                                    },
                                    {
                                            "text": "A debugging tool",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "excel-advanced": {
            "title": "Advanced Excel/Spreadsheets",
            "questions": [
                    {
                            "q": "What is a pivot table?",
                            "opts": [
                                    {
                                            "text": "A tool for summarizing and analyzing data by grouping and aggregating",
                                            "correct": true
                                    },
                                    {
                                            "text": "A rotating table animation",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database table",
                                            "correct": false
                                    },
                                    {
                                            "text": "An HTML table",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does VLOOKUP do?",
                            "opts": [
                                    {
                                            "text": "Searches for a value in the first column and returns a value from another column",
                                            "correct": true
                                    },
                                    {
                                            "text": "Looks up vocabulary words",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creates vertical layouts",
                                            "correct": false
                                    },
                                    {
                                            "text": "Validates data",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a macro in Excel?",
                            "opts": [
                                    {
                                            "text": "A recorded sequence of actions that can be replayed automatically",
                                            "correct": true
                                    },
                                    {
                                            "text": "A large spreadsheet",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of chart",
                                            "correct": false
                                    },
                                    {
                                            "text": "A formula",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is conditional formatting?",
                            "opts": [
                                    {
                                            "text": "Automatically applying formatting based on cell values or conditions",
                                            "correct": true
                                    },
                                    {
                                            "text": "Formatting that works sometimes",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of if-statement",
                                            "correct": false
                                    },
                                    {
                                            "text": "CSS in Excel",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is INDEX MATCH?",
                            "opts": [
                                    {
                                            "text": "A flexible lookup formula combining INDEX and MATCH functions",
                                            "correct": true
                                    },
                                    {
                                            "text": "A search engine feature",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database index",
                                            "correct": false
                                    },
                                    {
                                            "text": "A file matching tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is data validation in Excel?",
                            "opts": [
                                    {
                                            "text": "Restricting the type of data that can be entered into cells",
                                            "correct": true
                                    },
                                    {
                                            "text": "Checking if formulas are correct",
                                            "correct": false
                                    },
                                    {
                                            "text": "Validating file formats",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of formula",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a named range?",
                            "opts": [
                                    {
                                            "text": "A cell range assigned a descriptive name for easier reference in formulas",
                                            "correct": true
                                    },
                                    {
                                            "text": "A famous mountain range",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of chart",
                                            "correct": false
                                    },
                                    {
                                            "text": "A sorting method",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does SUMIFS do?",
                            "opts": [
                                    {
                                            "text": "Sums values that meet multiple criteria",
                                            "correct": true
                                    },
                                    {
                                            "text": "Sums all values",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creates a summary",
                                            "correct": false
                                    },
                                    {
                                            "text": "Counts unique values",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is Power Query?",
                            "opts": [
                                    {
                                            "text": "A tool for connecting, combining, and transforming data from multiple sources",
                                            "correct": true
                                    },
                                    {
                                            "text": "A powerful SQL query",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of database",
                                            "correct": false
                                    },
                                    {
                                            "text": "A search engine",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is an array formula?",
                            "opts": [
                                    {
                                            "text": "A formula that performs calculations on arrays of data simultaneously",
                                            "correct": true
                                    },
                                    {
                                            "text": "A formula stored in an array",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of programming",
                                            "correct": false
                                    },
                                    {
                                            "text": "A chart formula",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the TEXT function used for?",
                            "opts": [
                                    {
                                            "text": "Converting numbers to formatted text strings",
                                            "correct": true
                                    },
                                    {
                                            "text": "Adding text to cells",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creating text documents",
                                            "correct": false
                                    },
                                    {
                                            "text": "A text editor",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a slicer in Excel?",
                            "opts": [
                                    {
                                            "text": "A visual filter for pivot tables and charts",
                                            "correct": true
                                    },
                                    {
                                            "text": "A data cutting tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of chart",
                                            "correct": false
                                    },
                                    {
                                            "text": "A keyboard shortcut",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "sql-analytics": {
            "title": "SQL for Analytics",
            "questions": [
                    {
                            "q": "What does GROUP BY do?",
                            "opts": [
                                    {
                                            "text": "Groups rows with the same values for aggregate functions",
                                            "correct": true
                                    },
                                    {
                                            "text": "Groups files in folders",
                                            "correct": false
                                    },
                                    {
                                            "text": "Sorts data",
                                            "correct": false
                                    },
                                    {
                                            "text": "Joins tables",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a window function?",
                            "opts": [
                                    {
                                            "text": "A function that operates on a set of rows related to the current row",
                                            "correct": true
                                    },
                                    {
                                            "text": "A function for Windows OS",
                                            "correct": false
                                    },
                                    {
                                            "text": "A function for browser windows",
                                            "correct": false
                                    },
                                    {
                                            "text": "A GUI function",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the difference between WHERE and HAVING?",
                            "opts": [
                                    {
                                            "text": "WHERE filters before grouping; HAVING filters after grouping",
                                            "correct": true
                                    },
                                    {
                                            "text": "They are the same",
                                            "correct": false
                                    },
                                    {
                                            "text": "HAVING is faster",
                                            "correct": false
                                    },
                                    {
                                            "text": "WHERE works with aggregates",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does JOIN do?",
                            "opts": [
                                    {
                                            "text": "Combines rows from two or more tables based on related columns",
                                            "correct": true
                                    },
                                    {
                                            "text": "Joins text strings",
                                            "correct": false
                                    },
                                    {
                                            "text": "Merges databases",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creates new tables",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a subquery?",
                            "opts": [
                                    {
                                            "text": "A query nested inside another query",
                                            "correct": true
                                    },
                                    {
                                            "text": "A smaller database",
                                            "correct": false
                                    },
                                    {
                                            "text": "A backup query",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of index",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does COUNT DISTINCT do?",
                            "opts": [
                                    {
                                            "text": "Counts the number of unique values in a column",
                                            "correct": true
                                    },
                                    {
                                            "text": "Counts all rows",
                                            "correct": false
                                    },
                                    {
                                            "text": "Counts null values",
                                            "correct": false
                                    },
                                    {
                                            "text": "Counts distinct tables",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a CTE (Common Table Expression)?",
                            "opts": [
                                    {
                                            "text": "A named temporary result set defined using WITH clause",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of join",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database engine",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of index",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does COALESCE do?",
                            "opts": [
                                    {
                                            "text": "Returns the first non-null value from a list of arguments",
                                            "correct": true
                                    },
                                    {
                                            "text": "Combines two tables",
                                            "correct": false
                                    },
                                    {
                                            "text": "Converts data types",
                                            "correct": false
                                    },
                                    {
                                            "text": "Counts rows",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the ROW_NUMBER() function?",
                            "opts": [
                                    {
                                            "text": "Assigns a unique sequential number to each row in a result set",
                                            "correct": true
                                    },
                                    {
                                            "text": "Counts the total rows",
                                            "correct": false
                                    },
                                    {
                                            "text": "Selects a specific row",
                                            "correct": false
                                    },
                                    {
                                            "text": "Deletes a row",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is UNION?",
                            "opts": [
                                    {
                                            "text": "Combines results from two SELECT statements removing duplicates",
                                            "correct": true
                                    },
                                    {
                                            "text": "Joins two tables",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creates a new table",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of data type",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a CASE statement in SQL?",
                            "opts": [
                                    {
                                            "text": "A conditional expression that returns values based on conditions (like if/else)",
                                            "correct": true
                                    },
                                    {
                                            "text": "A file case (upper/lower)",
                                            "correct": false
                                    },
                                    {
                                            "text": "A court case",
                                            "correct": false
                                    },
                                    {
                                            "text": "A switch statement only",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What does ORDER BY do?",
                            "opts": [
                                    {
                                            "text": "Sorts the result set by one or more columns",
                                            "correct": true
                                    },
                                    {
                                            "text": "Orders products online",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creates an index",
                                            "correct": false
                                    },
                                    {
                                            "text": "Groups data",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "bi-tools": {
            "title": "BI Tools (Tableau/Power BI)",
            "questions": [
                    {
                            "q": "What is a dashboard in BI?",
                            "opts": [
                                    {
                                            "text": "A visual display of key metrics and data insights on a single screen",
                                            "correct": true
                                    },
                                    {
                                            "text": "A car dashboard",
                                            "correct": false
                                    },
                                    {
                                            "text": "A control panel for servers",
                                            "correct": false
                                    },
                                    {
                                            "text": "A code editor view",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is Power BI?",
                            "opts": [
                                    {
                                            "text": "Microsoft's business intelligence tool for interactive visualizations",
                                            "correct": true
                                    },
                                    {
                                            "text": "A powerful battery",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of database",
                                            "correct": false
                                    },
                                    {
                                            "text": "A programming language",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is Tableau?",
                            "opts": [
                                    {
                                            "text": "A visual analytics platform for creating interactive dashboards",
                                            "correct": true
                                    },
                                    {
                                            "text": "A table-related database tool",
                                            "correct": false
                                    },
                                    {
                                            "text": "A spreadsheet application",
                                            "correct": false
                                    },
                                    {
                                            "text": "A web framework",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is DAX?",
                            "opts": [
                                    {
                                            "text": "Data Analysis Expressions — a formula language in Power BI",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of database",
                                            "correct": false
                                    },
                                    {
                                            "text": "A data access extension",
                                            "correct": false
                                    },
                                    {
                                            "text": "A debugging tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a calculated field?",
                            "opts": [
                                    {
                                            "text": "A new field created from existing data using formulas",
                                            "correct": true
                                    },
                                    {
                                            "text": "A field with a calculator",
                                            "correct": false
                                    },
                                    {
                                            "text": "A mandatory form field",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database column",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is data blending?",
                            "opts": [
                                    {
                                            "text": "Combining data from multiple sources into a single view",
                                            "correct": true
                                    },
                                    {
                                            "text": "Mixing colors in charts",
                                            "correct": false
                                    },
                                    {
                                            "text": "A smoothie recipe",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of animation",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a KPI?",
                            "opts": [
                                    {
                                            "text": "Key Performance Indicator — a measurable value showing goal progress",
                                            "correct": true
                                    },
                                    {
                                            "text": "A keyboard shortcut",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of chart",
                                            "correct": false
                                    },
                                    {
                                            "text": "A programming interface",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is drill-down in BI?",
                            "opts": [
                                    {
                                            "text": "Navigating from summary to detailed data by clicking",
                                            "correct": true
                                    },
                                    {
                                            "text": "Using a drill machine",
                                            "correct": false
                                    },
                                    {
                                            "text": "Deleting data layers",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of sorting",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a filter in BI tools?",
                            "opts": [
                                    {
                                            "text": "A control that limits the data shown based on criteria",
                                            "correct": true
                                    },
                                    {
                                            "text": "A coffee filter",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of chart",
                                            "correct": false
                                    },
                                    {
                                            "text": "A data cleanup tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is ETL?",
                            "opts": [
                                    {
                                            "text": "Extract, Transform, Load — the process of moving data to a warehouse",
                                            "correct": true
                                    },
                                    {
                                            "text": "A programming language",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of database",
                                            "correct": false
                                    },
                                    {
                                            "text": "An error tracking log",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a data model in Power BI?",
                            "opts": [
                                    {
                                            "text": "The structure defining relationships between tables and calculated columns",
                                            "correct": true
                                    },
                                    {
                                            "text": "A fashion model",
                                            "correct": false
                                    },
                                    {
                                            "text": "A machine learning model",
                                            "correct": false
                                    },
                                    {
                                            "text": "A 3D model",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a story/narrative in Tableau?",
                            "opts": [
                                    {
                                            "text": "A sequence of visualizations that guide the viewer through insights",
                                            "correct": true
                                    },
                                    {
                                            "text": "A fictional story",
                                            "correct": false
                                    },
                                    {
                                            "text": "A book report",
                                            "correct": false
                                    },
                                    {
                                            "text": "A user manual",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    },
    "analytics-advanced": {
            "title": "Predictive Analytics & Storytelling",
            "questions": [
                    {
                            "q": "What is predictive analytics?",
                            "opts": [
                                    {
                                            "text": "Using data, statistics, and ML to forecast future outcomes",
                                            "correct": true
                                    },
                                    {
                                            "text": "Predicting the weather",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of dashboard",
                                            "correct": false
                                    },
                                    {
                                            "text": "Writing predictions",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is A/B testing?",
                            "opts": [
                                    {
                                            "text": "Comparing two versions to determine which performs better",
                                            "correct": true
                                    },
                                    {
                                            "text": "Testing grade A and B students",
                                            "correct": false
                                    },
                                    {
                                            "text": "Alphabetical testing",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of unit test",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is data storytelling?",
                            "opts": [
                                    {
                                            "text": "Communicating insights by combining data, visuals, and narrative",
                                            "correct": true
                                    },
                                    {
                                            "text": "Writing stories about data",
                                            "correct": false
                                    },
                                    {
                                            "text": "Creating animated charts",
                                            "correct": false
                                    },
                                    {
                                            "text": "A presentation tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a time series analysis?",
                            "opts": [
                                    {
                                            "text": "Analyzing data points collected over time to identify trends and patterns",
                                            "correct": true
                                    },
                                    {
                                            "text": "A type of clock",
                                            "correct": false
                                    },
                                    {
                                            "text": "Sorting data by time",
                                            "correct": false
                                    },
                                    {
                                            "text": "A scheduling tool",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is statistical significance?",
                            "opts": [
                                    {
                                            "text": "The likelihood that a result is not due to random chance",
                                            "correct": true
                                    },
                                    {
                                            "text": "Important statistics",
                                            "correct": false
                                    },
                                    {
                                            "text": "A large dataset",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of chart",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a cohort analysis?",
                            "opts": [
                                    {
                                            "text": "Analyzing behavior of groups who share common characteristics over time",
                                            "correct": true
                                    },
                                    {
                                            "text": "Studying a class of students",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of report",
                                            "correct": false
                                    },
                                    {
                                            "text": "A database query",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is customer segmentation?",
                            "opts": [
                                    {
                                            "text": "Dividing customers into groups based on shared characteristics",
                                            "correct": true
                                    },
                                    {
                                            "text": "Counting customers",
                                            "correct": false
                                    },
                                    {
                                            "text": "A customer service technique",
                                            "correct": false
                                    },
                                    {
                                            "text": "A marketing email",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is churn analysis?",
                            "opts": [
                                    {
                                            "text": "Analyzing why and when customers stop using a product",
                                            "correct": true
                                    },
                                    {
                                            "text": "Making butter",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of data cleaning",
                                            "correct": false
                                    },
                                    {
                                            "text": "Database maintenance",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a regression model used for in analytics?",
                            "opts": [
                                    {
                                            "text": "Predicting a continuous outcome variable based on input features",
                                            "correct": true
                                    },
                                    {
                                            "text": "Going back to previous data",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of visualization",
                                            "correct": false
                                    },
                                    {
                                            "text": "Database optimization",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is data-driven decision making?",
                            "opts": [
                                    {
                                            "text": "Using data and analysis rather than intuition to guide business decisions",
                                            "correct": true
                                    },
                                    {
                                            "text": "Driving data trucks",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of database",
                                            "correct": false
                                    },
                                    {
                                            "text": "Automated decision systems",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is a funnel analysis?",
                            "opts": [
                                    {
                                            "text": "Tracking user progression through stages of a process (e.g., sign-up to purchase)",
                                            "correct": true
                                    },
                                    {
                                            "text": "Pouring liquid through a funnel",
                                            "correct": false
                                    },
                                    {
                                            "text": "A type of chart",
                                            "correct": false
                                    },
                                    {
                                            "text": "A data pipeline",
                                            "correct": false
                                    }
                            ]
                    },
                    {
                            "q": "What is the difference between correlation and causation?",
                            "opts": [
                                    {
                                            "text": "Correlation shows a relationship; causation proves one thing causes another",
                                            "correct": true
                                    },
                                    {
                                            "text": "They are the same",
                                            "correct": false
                                    },
                                    {
                                            "text": "Causation is weaker than correlation",
                                            "correct": false
                                    },
                                    {
                                            "text": "Correlation is more important",
                                            "correct": false
                                    }
                            ]
                    }
            ]
    }
};;

// ── Option labels ──
const OPTION_LABELS = ['A', 'B', 'C', 'D'];

// ── State ──
let quizTimer = null;
let timeLeft = 20;
let quizPhase = 'read';      // 'read' | 'answer'
let currentQuestionIndex = 0;
let selectedOptionIndex = null;
let score = 0;
let moduleId = 'html';
let quizQuestions = [];
let totalQuestions = 0;
let quizTimerInterval;

// ── Utility Functions ──
function isValidQuestion(q) {
    // New format validation
    if (q && q.question && Array.isArray(q.options) && q.options.length === 4 && q.answer) {
        const hasEmptyOption = q.options.some(opt => typeof opt !== 'string' || opt.trim() === '');
        if (!hasEmptyOption) return true;
    }
    
    // Legacy format validation
    if (!q || typeof q.q !== 'string' || q.q.trim() === '') return false;
    if (!Array.isArray(q.opts) || q.opts.length !== 4) return false;
    let hasCorrect = false;
    for (const opt of q.opts) {
        if (!opt || typeof opt.text !== 'string' || opt.text.trim() === '') return false;
        if (opt.correct === true) hasCorrect = true;
    }
    return hasCorrect;
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

document.addEventListener("DOMContentLoaded", () => {
    // ── Read module from URL ──
    const urlParams = new URLSearchParams(window.location.search);
    const specificModulesParam = urlParams.get('specificModules');
    const targetLevel  = urlParams.get('targetLevel') || 'Beginner';
    const categoryParam = urlParams.get('category') || localStorage.getItem('xyverra_selected_path') || 'Web Development';
    moduleId = urlParams.get('module') || 'html';
    const isVerify = urlParams.get('verify') === 'true';

    // Set 10 questions for level assessment/scalable quiz, 6 for normal module quiz
    const QUESTION_LIMIT = specificModulesParam ? 10 : 6;

    let quizData = { title: "Assessment", questions: [] };
    let activeModuleIds = [];

    if (specificModulesParam) {
        activeModuleIds = specificModulesParam.split(',');

        // 1. Try SCALABLE_QUIZ_DATA first (organized by Category → Level)
        if (typeof SCALABLE_QUIZ_DATA !== 'undefined' && SCALABLE_QUIZ_DATA[categoryParam]) {
            const catData = SCALABLE_QUIZ_DATA[categoryParam];
            // Map targetLevel to which level of questions to pull
            // Beginner → pull Beginner questions
            // Intermediate → pull Beginner + partial Intermediate
            // Advanced → pull Beginner + Intermediate
            let levels = ['Beginner'];
            if (targetLevel === 'Intermediate') levels = ['Beginner'];
            if (targetLevel === 'Advanced') levels = ['Beginner', 'Intermediate'];

            let allQ = [];
            levels.forEach(lvl => {
                if (catData[lvl]) allQ = allQ.concat(catData[lvl]);
            });
            quizData.questions = allQ;
            quizData.title = `${categoryParam} — ${targetLevel} Assessment`;

        } else {
            // 2. Fallback: QUIZ_DATA by module ID
            let titles = [];
            activeModuleIds.forEach(id => {
                const data = QUIZ_DATA[id];
                if (data) {
                    titles.push(data.title);
                    quizData.questions = quizData.questions.concat(data.questions);
                }
            });
            if (titles.length > 0) quizData.title = titles.join(' & ') + ' Assessment';
        }
        if (activeModuleIds.length > 0) moduleId = activeModuleIds[0];

    } else {
        quizData = QUIZ_DATA[moduleId] || QUIZ_DATA['html'];
        activeModuleIds = [moduleId];
    }
    
    window.generateNewQuiz = function() {
        // Fetch recent from session storage to avoid reuse across reloads
        let recentlyUsed = JSON.parse(sessionStorage.getItem('xyverra_recent_qs_' + moduleId) || '[]');
        
        // Ensure all questions have a unique ID if missing
        let allQuestions = (quizData.questions || []).map(q => {
            if (!q.id) q.id = 'q_' + Math.random().toString(36).substr(2, 9);
            // Normalize to new format for validation
            if (q.q && q.opts && !q.question) {
                return {
                    id: q.id,
                    question: q.q,
                    options: q.opts.map(o => o.text),
                    answer: (q.opts.find(o => o.correct) || {}).text || ""
                };
            }
            return q;
        });

        // Validate strictly
        let validPool = allQuestions.filter(q => {
            if (!q.question || typeof q.question !== 'string' || q.question.trim() === '') return false;
            if (!q.options || !Array.isArray(q.options) || q.options.length !== 4) return false;
            if (q.options.some(opt => !opt || opt.trim() === '')) return false;
            if (!q.answer || typeof q.answer !== 'string' || q.answer.trim() === '') return false;
            return true;
        });

        // Filter out recently used
        let unusedPool = validPool.filter(q => !recentlyUsed.includes(q.id));
        
        // If not enough unused, clear recent memory
        if (unusedPool.length < QUESTION_LIMIT) {
            recentlyUsed = [];
            unusedPool = validPool;
        }

        const shuffled = shuffleArray(unusedPool);
        quizQuestions = shuffled.slice(0, QUESTION_LIMIT);
        totalQuestions = quizQuestions.length;

        // Add to recently used
        quizQuestions.forEach(q => recentlyUsed.push(q.id));
        sessionStorage.setItem('xyverra_recent_qs_' + moduleId, JSON.stringify(recentlyUsed));

        console.log("Quiz Loaded:", quizQuestions);
        console.log("Question Count:", quizQuestions.length);

        if (quizQuestions.length === 0) {
            console.error("No valid quiz questions generated");
        }
    };

    // Initialize the quiz
    generateNewQuiz();

    // BEFORE starting a quiz:
    if (!quizQuestions || !Array.isArray(quizQuestions) || quizQuestions.length === 0) {
        generateNewQuiz();
    }
    
    // Ensure enough valid questions before allowing start
    if (quizQuestions.length < QUESTION_LIMIT) {
        console.error(`Not enough valid questions to start quiz. Found: ${quizQuestions.length}, needed: ${QUESTION_LIMIT}`);
        const quizStatus = document.getElementById('quiz-status');
        if (quizStatus) {
            quizStatus.textContent = 'Error: Not enough valid questions available to start the quiz.';
            quizStatus.className = 'quiz-status error';
        }
        return; // Halt initialization
    }

    // ── Set page title ──
    const moduleTitle = document.getElementById('quiz-module-title');
    if (moduleTitle) moduleTitle.textContent = quizData.title + ' Assessment';

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

    // ── Exit button — always goes back to roadmap or verification ──
    btnExitQuiz.addEventListener('click', (e) => {
        e.preventDefault();
        clearInterval(quizTimerInterval);
        
        // Exit quiz behavior
        // clear current quiz state
        quizQuestions = [];
        currentQuestionIndex = 0;
        score = 0;
        
        // generate a completely new randomized quiz, avoid recently used, start from Q1
        generateNewQuiz();
        
        // In case the user stays on the page (though normally we redirect):
        loadQuestion();
        
        // Redirect as per normal UX
        window.location.href = isVerify ? 'skill-verification.html' : './roadmap.html';
    });

    // ── Next question ──
    btnNextQuestion.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    // ── Start first question ──
    loadQuestion();

    // ────────────────────────────────────────────────────
    function loadQuestion() {
        clearInterval(quizTimerInterval);
        selectedOptionIndex = null;
        if (btnNextQuestion) btnNextQuestion.style.display = 'none';
        quizPhase = 'read';

        // Quiz rendering: Do not show results page until currentQuestionIndex >= totalQuestions
        if (currentQuestionIndex >= totalQuestions) {
            showResults();
            return;
        }

        let currentQuestion = quizQuestions[currentQuestionIndex];
        
        // 2. Before rendering a question run validation
        if (
            !currentQuestion ||
            !currentQuestion.options ||
            !Array.isArray(currentQuestion.options) ||
            currentQuestion.options.length !== 4 ||
            currentQuestion.options.some(opt => !opt || opt.trim() === '') ||
            !currentQuestion.answer
        ) {
            console.warn("Invalid question detected during render, regenerating...", currentQuestion);
            // If validation fails: regenerate that question, do not continue with broken data.
            // Remove the broken question from the pool and fetch a new one to replace it
            quizQuestions.splice(currentQuestionIndex, 1);
            
            // Generate a single replacement question avoiding recent uses
            let recentlyUsed = JSON.parse(sessionStorage.getItem('xyverra_recent_qs_' + moduleId) || '[]');
            let validPool = (quizData.questions || []).map(q => {
                if (!q.id) q.id = 'q_' + Math.random().toString(36).substr(2, 9);
                if (q.q && q.opts && !q.question) {
                    return { id: q.id, question: q.q, options: q.opts.map(o => o.text), answer: (q.opts.find(o => o.correct) || {}).text || "" };
                }
                return q;
            }).filter(q => {
                if (!q.question || typeof q.question !== 'string' || q.question.trim() === '') return false;
                if (!q.options || !Array.isArray(q.options) || q.options.length !== 4) return false;
                if (q.options.some(opt => !opt || opt.trim() === '')) return false;
                if (!q.answer || typeof q.answer !== 'string' || q.answer.trim() === '') return false;
                // Don't pick ones already in quizQuestions
                if (quizQuestions.some(existing => existing.id === q.id)) return false;
                return true;
            });
            
            let replacementPool = validPool.filter(q => !recentlyUsed.includes(q.id));
            if (replacementPool.length === 0) replacementPool = validPool;
            
            if (replacementPool.length > 0) {
                const replacement = replacementPool[Math.floor(Math.random() * replacementPool.length)];
                quizQuestions.splice(currentQuestionIndex, 0, replacement);
                recentlyUsed.push(replacement.id);
                sessionStorage.setItem('xyverra_recent_qs_' + moduleId, JSON.stringify(recentlyUsed));
            } else {
                // If absolutely no replacement available, reduce total questions so it doesn't crash
                totalQuestions = quizQuestions.length;
            }
            
            loadQuestion(); 
            return;
        }

        console.log("Current Question:", currentQuestion);

        // 5. Add debugging
        console.log("QUESTION", currentQuestion);
        console.log("OPTIONS", currentQuestion.options);
        
        // Build a normalized options array
        let optionsToRender = currentQuestion.options.map(optText => ({
            text: optText,
            correct: optText === currentQuestion.answer
        }));
        
        // Shuffle options to randomize order
        optionsToRender = shuffleArray(optionsToRender);
        
        // Attach options to question object for selection reference
        currentQuestion.currentRenderedOptions = optionsToRender;

        // Update question counter
        if (questionMeta) {
            questionMeta.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
        }

        // Set question text (remove leading metadata like '[Beginner] Question 75 about Cloud / DevOps.')
        let cleanQuestion = currentQuestion.question
            .replace(/^\[.*?\]\s*/i, '') // Remove [Beginner], [Intermediate], etc.
            .replace(/^Question\s+\d+\s+about\s+.*?\.\s*/i, '') // Remove "Question 75 about Cloud / DevOps. "
            .replace(/^Question\s+\d+[\.\:\-]?\s*/i, '') // Remove "Question 1. "
            .replace(/^\d+[\.\)]\s*/, ''); // Remove "1. "
            
        quizQuestionTxt.textContent = cleanQuestion;

        // Clear and disable options during reading time
        quizOptionsCont.innerHTML = '';
        quizOptionsCont.classList.add('disabled');

        // 6. Render option text inside every option card
        // 7. Ensure HTML tags display as text (using textContent)
        optionsToRender.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.id = `option-${i}`;
            
            // Build the HTML structure
            btn.innerHTML = `
                <span class="option-letter">${OPTION_LABELS[i]}</span>
                <span class="option-text"></span>
            `;
            
            // Safely set the text content so HTML tags like <br> are not parsed by the browser
            btn.querySelector('.option-text').textContent = opt.text;
            
            btn.addEventListener('click', () => selectOption(i, opt.correct, optionsToRender));
            quizOptionsCont.appendChild(btn);
        });

        // Status: reading phase
        quizStatus.textContent = 'Read the question carefully. Options will unlock in 8 seconds.';
        quizStatus.className = 'quiz-status warning';

        // Timer: 8s reading, then 10s answering
        timeLeft = 8;
        updateTimerBar(timeLeft, 8, timerBar);
        timerText.textContent = `${timeLeft}s Reading Time`;

        quizTimerInterval = setInterval(() => {
            timeLeft--;
            updateTimerBar(timeLeft, quizPhase === 'read' ? 8 : 10, timerBar);

            if (quizPhase === 'read') {
                timerText.textContent = `${timeLeft}s Reading Time`;
                if (timeLeft <= 0) {
                    // Switch to answer phase
                    quizPhase = 'answer';
                    timeLeft = 10;
                    quizOptionsCont.classList.remove('disabled');
                    quizStatus.textContent = 'Select your answer!';
                    quizStatus.className = 'quiz-status info';
                    timerText.textContent = `${timeLeft}s to Answer`;
                    updateTimerBar(timeLeft, 10, timerBar);
                }
            } else {
                timerText.textContent = `${timeLeft}s to Answer`;
                if (timeLeft <= 0) {
                    // Time's up — auto-mark wrong
                    clearInterval(quizTimerInterval);
                    quizOptionsCont.classList.add('disabled');
                    // Highlight correct answer
                    if (currentQuestion.currentRenderedOptions) {
                        currentQuestion.currentRenderedOptions.forEach((opt, i) => {
                            if (opt.correct) {
                                const btn = document.getElementById(`option-${i}`);
                                if (btn) btn.classList.add('correct');
                            }
                        });
                    }
                    quizStatus.textContent = "⏰ Time's up! The correct answer is highlighted.";
                    quizStatus.className = 'quiz-status error';
                    timerText.textContent = 'Time Up!';
                    if (btnNextQuestion) {
                        btnNextQuestion.style.display = 'inline-flex';
                        btnNextQuestion.textContent = currentQuestionIndex + 1 < totalQuestions ? 'Next Question →' : 'See Results →';
                    }
                }
            }
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
            selectedBtn.classList.add('correct');
            quizStatus.textContent = '✅ Correct! Well done!';
            quizStatus.className = 'quiz-status success';
            score++;
        } else {
            selectedBtn.classList.add('wrong');
            quizStatus.textContent = '❌ Incorrect. The correct answer is highlighted.';
            quizStatus.className = 'quiz-status error';
            // Highlight correct
            if (opts) {
                opts.forEach((opt, i) => {
                    if (opt.correct) {
                        const btn = document.getElementById(`option-${i}`);
                        if (btn) btn.classList.add('correct');
                    }
                });
            }
        }

        if (timerText) timerText.textContent = 'Answered';
        if (btnNextQuestion) {
            btnNextQuestion.style.display = 'inline-flex';
            btnNextQuestion.textContent = currentQuestionIndex + 1 < totalQuestions ? 'Next Question →' : 'See Results →';
        }
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

        let pct = Math.round((score / totalQuestions) * 100);
        
        if (totalQuestions === 6) {
            if (score === 4) pct = 80;
            else if (score === 5) pct = 90;
        }
        
        const passed = pct >= 80;

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
            ? `You scored ${score}/${totalQuestions} — Module Verified! 🎉`
            : `You scored ${score}/${totalQuestions} — Try again to pass (80% needed).`;

        // Timer bar full green on completion
        const timerBar = document.getElementById('quiz-timer');
        if (timerBar) {
            timerBar.style.width = '100%';
            timerBar.style.background = passed
                ? 'linear-gradient(90deg, var(--success), #34D399)'
                : 'linear-gradient(90deg, var(--error), #F87171)';
        }

        timerText.textContent = passed ? '🎉 Passed!' : '💪 Keep Learning';
        quizStatus.textContent = '';

        // Exit button → always roadmap or verification
        btnExitQuiz.textContent = isVerify ? '← Back to Level Selection' : '← Back to Roadmap';
        
        // Remove old listeners and add a specific one for results page
        const newBtnExit = btnExitQuiz.cloneNode(true);
        btnExitQuiz.parentNode.replaceChild(newBtnExit, btnExitQuiz);
             if (isVerify) {
                 // Removed skill-input, so go to roadmap
                 window.location.href = 'roadmap.html';
             } else {
                 window.location.href = 'roadmap.html';
             }
        });
        
        // In verify mode, auto-redirect after 3 seconds
        if (isVerify) {
            setTimeout(() => {
                window.location.href = 'roadmap.html';
            }, 3000);
            const countdown = document.getElementById('score-text');
            if (countdown) {
                let secs = 3;
                const iv = setInterval(() => {
                    secs--;
                    if (secs <= 0) { clearInterval(iv); return; }
                    if (countdown) countdown.textContent = (passed
                        ? `✅ Verified! Returning in ${secs}s...`
                        : `❌ Score too low. Returning in ${secs}s...`);
                }, 1000);
            }
        }
        
        if (btnNextQuestion) btnNextQuestion.style.display = 'none';

        // Save if passed
        if (passed) {
            const pendingStart = localStorage.getItem('pendingStartModule');
            if (pendingStart) {
                localStorage.setItem('selectedStartModule', pendingStart);
                localStorage.removeItem('pendingStartModule');
            }

            let completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
            
            // Push all active modules
            activeModuleIds.forEach(id => {
                if (!completedModules.includes(id)) {
                    completedModules.push(id);
                }
            });
            localStorage.setItem('completedModules', JSON.stringify(completedModules));

            let currentScore = parseInt(localStorage.getItem('xyverra_skill_score') || '0');
            localStorage.setItem('xyverra_skill_score', currentScore + 10);
            
            // Backend update
            const token = localStorage.getItem('token');
            if (token) {
                const quizScoreData = {
                    skill: activeModuleIds.join(','),
                    score: pct,
                    passed: true,
                    xpEarned: 10
                };
                
                fetch('http://localhost:5000/api/user/save-quiz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(quizScoreData)
                }).then(res => res.json())
                  .then(data => console.log('Quiz saved to backend:', data))
                  .catch(err => console.error('Error saving quiz to backend:', err));
            }
        }
    }
});