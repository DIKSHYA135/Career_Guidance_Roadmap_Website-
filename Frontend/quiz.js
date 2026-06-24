/* =========================================================
   quiz.js — Xyverra Assessment Engine
   All localStorage calls are marked with TODO comments
   so they can be replaced with real API calls later.
   ========================================================= */

// ── Quiz Data (will come from GET /api/quiz/:moduleId in production) ──
const QUIZ_DATA = {
    "webDevelopment": {
        "title": "Web evelopment",
        "questions": [
            {
                "q": "What does HTML stand for?",
                "opts": [
                    {
                        "text": "Hyper Text Markup Language",
                        "correct": true
                    },
                    {
                        "text": "High Text Machine Language",
                        "correct": false
                    },
                    {
                        "text": "Hyper Transfer Markup Language",
                        "correct": false
                    },
                    {
                        "text": "Hyper Tool Markup Language",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which HTML tag is used to create a hyperlink?",
                "opts": [
                    {
                        "text": "<link>",
                        "correct": false
                    },
                    {
                        "text": "<a>",
                        "correct": true
                    },
                    {
                        "text": "<href>",
                        "correct": false
                    },
                    {
                        "text": "<url>",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which CSS property is used to change the text color?",
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
                        "text": "foreground",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does DOM stand for?",
                "opts": [
                    {
                        "text": "Document Object Model",
                        "correct": true
                    },
                    {
                        "text": "Data Object Management",
                        "correct": false
                    },
                    {
                        "text": "Document Oriented Model",
                        "correct": false
                    },
                    {
                        "text": "Dynamic Object Module",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which keyword declares a block-scoped variable in JavaScript?",
                "opts": [
                    {
                        "text": "var",
                        "correct": false
                    },
                    {
                        "text": "function",
                        "correct": false
                    },
                    {
                        "text": "let",
                        "correct": true
                    },
                    {
                        "text": "define",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of the `alt` attribute on an <img> tag?",
                "opts": [
                    {
                        "text": "Sets image alignment",
                        "correct": false
                    },
                    {
                        "text": "Provides alternative text if image fails to load",
                        "correct": true
                    },
                    {
                        "text": "Defines image dimensions",
                        "correct": false
                    },
                    {
                        "text": "Sets image borders",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does CSS stand for?",
                "opts": [
                    {
                        "text": "Creative Style Sheets",
                        "correct": false
                    },
                    {
                        "text": "Computer Style Sheets",
                        "correct": false
                    },
                    {
                        "text": "Cascading Style Sheets",
                        "correct": true
                    },
                    {
                        "text": "Colorful Style Sheets",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which HTML element is used for the largest heading?",
                "opts": [
                    {
                        "text": "<h6>",
                        "correct": false
                    },
                    {
                        "text": "<heading>",
                        "correct": false
                    },
                    {
                        "text": "<head>",
                        "correct": false
                    },
                    {
                        "text": "<h1>",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which CSS unit is relative to the viewport width?",
                "opts": [
                    {
                        "text": "em",
                        "correct": false
                    },
                    {
                        "text": "px",
                        "correct": false
                    },
                    {
                        "text": "vw",
                        "correct": true
                    },
                    {
                        "text": "%",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which JavaScript method adds an element at the end of an array?",
                "opts": [
                    {
                        "text": "push()",
                        "correct": true
                    },
                    {
                        "text": "pop()",
                        "correct": false
                    },
                    {
                        "text": "shift()",
                        "correct": false
                    },
                    {
                        "text": "append()",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the default display value of a <div> element?",
                "opts": [
                    {
                        "text": "inline",
                        "correct": false
                    },
                    {
                        "text": "flex",
                        "correct": false
                    },
                    {
                        "text": "block",
                        "correct": true
                    },
                    {
                        "text": "inline-block",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which HTTP method is typically used to submit form data to a server?",
                "opts": [
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
                    },
                    {
                        "text": "POST",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What CSS property controls the space between an element's border and its content?",
                "opts": [
                    {
                        "text": "margin",
                        "correct": false
                    },
                    {
                        "text": "border-spacing",
                        "correct": false
                    },
                    {
                        "text": "gap",
                        "correct": false
                    },
                    {
                        "text": "padding",
                        "correct": true
                    }
                ]
            },
            {
                "q": "Which HTML tag defines an unordered list?",
                "opts": [
                    {
                        "text": "<ol>",
                        "correct": false
                    },
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
                    }
                ]
            },
            {
                "q": "What does JSON stand for?",
                "opts": [
                    {
                        "text": "JavaScript Object Notation",
                        "correct": true
                    },
                    {
                        "text": "JavaScript Oriented Notation",
                        "correct": false
                    },
                    {
                        "text": "Java Standard Object Notation",
                        "correct": false
                    },
                    {
                        "text": "JavaScript Online Notation",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which selector targets all elements with class `btn` in CSS?",
                "opts": [
                    {
                        "text": "#btn",
                        "correct": false
                    },
                    {
                        "text": ".btn",
                        "correct": true
                    },
                    {
                        "text": "*btn",
                        "correct": false
                    },
                    {
                        "text": "btn",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the `console.log()` function do in JavaScript?",
                "opts": [
                    {
                        "text": "Writes to a file",
                        "correct": false
                    },
                    {
                        "text": "Logs output to browser console",
                        "correct": true
                    },
                    {
                        "text": "Opens a dialog box",
                        "correct": false
                    },
                    {
                        "text": "Sends data to the server",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which HTML attribute specifies where a form's data is sent?",
                "opts": [
                    {
                        "text": "method",
                        "correct": false
                    },
                    {
                        "text": "target",
                        "correct": false
                    },
                    {
                        "text": "action",
                        "correct": true
                    },
                    {
                        "text": "src",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the `z-index` CSS property control?",
                "opts": [
                    {
                        "text": "Transparency",
                        "correct": false
                    },
                    {
                        "text": "Stack order of elements",
                        "correct": true
                    },
                    {
                        "text": "Zoom level",
                        "correct": false
                    },
                    {
                        "text": "Rotation",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which method selects a single element by its ID in JavaScript?",
                "opts": [
                    {
                        "text": "document.querySelector()",
                        "correct": false
                    },
                    {
                        "text": "document.getElementByClass()",
                        "correct": false
                    },
                    {
                        "text": "document.getElementsByTagName()",
                        "correct": false
                    },
                    {
                        "text": "document.getElementById()",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What is the CSS Box Model composed of?",
                "opts": [
                    {
                        "text": "Content, padding, border, margin",
                        "correct": true
                    },
                    {
                        "text": "Content, space, frame, boundary",
                        "correct": false
                    },
                    {
                        "text": "Core, wrap, outline, offset",
                        "correct": false
                    },
                    {
                        "text": "Inner, outer, frame, gap",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the key difference between `==` and `===` in JavaScript?",
                "opts": [
                    {
                        "text": "=== is faster",
                        "correct": false
                    },
                    {
                        "text": "== compares only type, === compares value",
                        "correct": false
                    },
                    {
                        "text": "=== checks both value and type, == only value",
                        "correct": true
                    },
                    {
                        "text": "There is no difference",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is event bubbling in JavaScript?",
                "opts": [
                    {
                        "text": "An event that is cancelled",
                        "correct": false
                    },
                    {
                        "text": "Events propagating from child to parent elements",
                        "correct": true
                    },
                    {
                        "text": "Events only firing on the root element",
                        "correct": false
                    },
                    {
                        "text": "An error in event handling",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the primary purpose of CSS media queries?",
                "opts": [
                    {
                        "text": "Import external stylesheets",
                        "correct": false
                    },
                    {
                        "text": "Animate elements",
                        "correct": false
                    },
                    {
                        "text": "Apply styles based on device characteristics like screen width",
                        "correct": true
                    },
                    {
                        "text": "Select elements by attribute",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the key difference between `localStorage` and `sessionStorage`?",
                "opts": [
                    {
                        "text": "localStorage is larger",
                        "correct": false
                    },
                    {
                        "text": "sessionStorage persists after the tab is closed, localStorage does not",
                        "correct": false
                    },
                    {
                        "text": "localStorage is cleared when the tab closes, sessionStorage persists",
                        "correct": true
                    },
                    {
                        "text": "They are identical",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a JavaScript closure?",
                "opts": [
                    {
                        "text": "A syntax error",
                        "correct": false
                    },
                    {
                        "text": "A function that has access to variables from its outer scope",
                        "correct": true
                    },
                    {
                        "text": "A method that stops function execution",
                        "correct": false
                    },
                    {
                        "text": "An immediately invoked function",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does `position: sticky` do in CSS?",
                "opts": [
                    {
                        "text": "Fixes element to the viewport always",
                        "correct": false
                    },
                    {
                        "text": "Positions relative to parent",
                        "correct": false
                    },
                    {
                        "text": "Behaves like relative until scroll threshold, then sticks",
                        "correct": true
                    },
                    {
                        "text": "Removes element from document flow",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of the `defer` attribute on a `<script>` tag?",
                "opts": [
                    {
                        "text": "Loads script synchronously",
                        "correct": false
                    },
                    {
                        "text": "Prevents the script from running",
                        "correct": false
                    },
                    {
                        "text": "Loads script after HTML is fully parsed",
                        "correct": true
                    },
                    {
                        "text": "Loads script in a web worker",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is CSS specificity?",
                "opts": [
                    {
                        "text": "How fast CSS loads",
                        "correct": false
                    },
                    {
                        "text": "The order of CSS rules in the file",
                        "correct": false
                    },
                    {
                        "text": "A weight system that determines which CSS rule applies when multiple rules target the same element",
                        "correct": true
                    },
                    {
                        "text": "The number of CSS files loaded",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the Fetch API return?",
                "opts": [
                    {
                        "text": "An XMLHttpRequest object",
                        "correct": false
                    },
                    {
                        "text": "A raw response string",
                        "correct": false
                    },
                    {
                        "text": "A Promise",
                        "correct": true
                    },
                    {
                        "text": "A callback function",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is CSS Flexbox primarily used for?",
                "opts": [
                    {
                        "text": "3D animations",
                        "correct": false
                    },
                    {
                        "text": "Creating one-dimensional layouts (row or column)",
                        "correct": true
                    },
                    {
                        "text": "Adding gradients",
                        "correct": false
                    },
                    {
                        "text": "Managing font sizes",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does `Array.prototype.map()` return in JavaScript?",
                "opts": [
                    {
                        "text": "The original array, modified in place",
                        "correct": false
                    },
                    {
                        "text": "undefined",
                        "correct": false
                    },
                    {
                        "text": "A new array with the results of calling a function on each element",
                        "correct": true
                    },
                    {
                        "text": "A Boolean",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is CORS?",
                "opts": [
                    {
                        "text": "A caching mechanism",
                        "correct": false
                    },
                    {
                        "text": "A type of CSS layout",
                        "correct": false
                    },
                    {
                        "text": "Cross-Origin Resource Sharing – a browser security policy",
                        "correct": true
                    },
                    {
                        "text": "A server-side language",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is destructuring assignment in JavaScript?",
                "opts": [
                    {
                        "text": "Deleting properties from objects",
                        "correct": false
                    },
                    {
                        "text": "A syntax to unpack values from arrays or properties from objects into variables",
                        "correct": true
                    },
                    {
                        "text": "Converting objects to strings",
                        "correct": false
                    },
                    {
                        "text": "A way to merge arrays",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between `em` and `rem` CSS units?",
                "opts": [
                    {
                        "text": "`em` is larger than `rem`",
                        "correct": false
                    },
                    {
                        "text": "Both are always equal to 16px",
                        "correct": false
                    },
                    {
                        "text": "`em` is relative to parent element font size; `rem` is relative to root element font size",
                        "correct": true
                    },
                    {
                        "text": "They are identical",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the `async` keyword do when placed before a function?",
                "opts": [
                    {
                        "text": "Makes the function run in parallel",
                        "correct": false
                    },
                    {
                        "text": "Causes the function to always return a Promise",
                        "correct": true
                    },
                    {
                        "text": "Prevents the function from being called",
                        "correct": false
                    },
                    {
                        "text": "Adds error handling automatically",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a CSS pseudo-class?",
                "opts": [
                    {
                        "text": "A class defined in JavaScript",
                        "correct": false
                    },
                    {
                        "text": "A keyword added to a selector specifying a special state of the element",
                        "correct": true
                    },
                    {
                        "text": "A class that duplicates styles",
                        "correct": false
                    },
                    {
                        "text": "An invalid class name",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is event delegation in JavaScript?",
                "opts": [
                    {
                        "text": "Assigning multiple handlers to one event",
                        "correct": false
                    },
                    {
                        "text": "Removing events from elements",
                        "correct": false
                    },
                    {
                        "text": "Attaching a single event listener to a parent to handle events from child elements",
                        "correct": true
                    },
                    {
                        "text": "Blocking event propagation",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of `use strict` in JavaScript?",
                "opts": [
                    {
                        "text": "Enables strict types",
                        "correct": false
                    },
                    {
                        "text": "Throws errors for silent mistakes and prevents use of undeclared variables",
                        "correct": true
                    },
                    {
                        "text": "Makes code run faster",
                        "correct": false
                    },
                    {
                        "text": "Disables ES6 features",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which CSS Grid property defines the columns of the grid?",
                "opts": [
                    {
                        "text": "grid-row",
                        "correct": false
                    },
                    {
                        "text": "grid-template-columns",
                        "correct": true
                    },
                    {
                        "text": "column-count",
                        "correct": false
                    },
                    {
                        "text": "grid-area",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Critical Rendering Path (CRP)?",
                "opts": [
                    {
                        "text": "The order CSS is loaded",
                        "correct": false
                    },
                    {
                        "text": "The sequence of steps browsers take to convert HTML, CSS, and JavaScript into pixels on screen",
                        "correct": true
                    },
                    {
                        "text": "The fastest network route to a server",
                        "correct": false
                    },
                    {
                        "text": "The way JavaScript minifiers work",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Service Worker?",
                "opts": [
                    {
                        "text": "A Node.js background process",
                        "correct": false
                    },
                    {
                        "text": "A script running in the browser background, enabling offline support and push notifications",
                        "correct": true
                    },
                    {
                        "text": "A CSS animation helper",
                        "correct": false
                    },
                    {
                        "text": "A JavaScript worker for UI tasks",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the JavaScript Event Loop responsible for?",
                "opts": [
                    {
                        "text": "Managing CSS animations",
                        "correct": false
                    },
                    {
                        "text": "Executing synchronous code only",
                        "correct": false
                    },
                    {
                        "text": "Allowing JavaScript to perform non-blocking operations via a call stack and task queue",
                        "correct": true
                    },
                    {
                        "text": "Handling HTTP requests directly",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is code splitting in the context of web performance?",
                "opts": [
                    {
                        "text": "Splitting CSS from HTML",
                        "correct": false
                    },
                    {
                        "text": "Separating server and client code",
                        "correct": false
                    },
                    {
                        "text": "Breaking a large JavaScript bundle into smaller chunks loaded on demand",
                        "correct": true
                    },
                    {
                        "text": "Distributing code across multiple servers",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Shadow DOM?",
                "opts": [
                    {
                        "text": "A hidden iframe",
                        "correct": false
                    },
                    {
                        "text": "An encapsulated, separate DOM tree attached to an element, isolated from the main document",
                        "correct": true
                    },
                    {
                        "text": "A deprecated DOM API",
                        "correct": false
                    },
                    {
                        "text": "The DOM rendered on the server",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is tree shaking in JavaScript build tools?",
                "opts": [
                    {
                        "text": "Traversing the DOM tree",
                        "correct": false
                    },
                    {
                        "text": "Removing duplicate elements",
                        "correct": false
                    },
                    {
                        "text": "Eliminating dead/unused code from the final bundle",
                        "correct": true
                    },
                    {
                        "text": "Organizing import statements",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the key difference between Server-Side Rendering (SSR) and Client-Side Rendering (CSR)?",
                "opts": [
                    {
                        "text": "SSR is only for React apps",
                        "correct": false
                    },
                    {
                        "text": "In CSR the server sends HTML; in SSR the browser renders",
                        "correct": false
                    },
                    {
                        "text": "In SSR the server sends fully rendered HTML; in CSR the browser renders via JavaScript",
                        "correct": true
                    },
                    {
                        "text": "There is no performance difference",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the Intersection Observer API do?",
                "opts": [
                    {
                        "text": "Observes CSS property changes",
                        "correct": false
                    },
                    {
                        "text": "Tracks DOM mutations",
                        "correct": false
                    },
                    {
                        "text": "Asynchronously observes when elements enter or leave the viewport",
                        "correct": true
                    },
                    {
                        "text": "Monitors network requests",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is WebAssembly (WASM)?",
                "opts": [
                    {
                        "text": "A new JavaScript framework",
                        "correct": false
                    },
                    {
                        "text": "A web server protocol",
                        "correct": false
                    },
                    {
                        "text": "A binary instruction format allowing near-native performance in the browser",
                        "correct": true
                    },
                    {
                        "text": "A replacement for CSS",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of Content Security Policy (CSP)?",
                "opts": [
                    {
                        "text": "To compress web content",
                        "correct": false
                    },
                    {
                        "text": "A browser security feature that prevents XSS by specifying trusted content sources",
                        "correct": true
                    },
                    {
                        "text": "To set cache headers",
                        "correct": false
                    },
                    {
                        "text": "To manage API keys",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "fullStackDevelopment": {
        "title": "Full tack evelopment",
        "questions": [
            {
                "q": "What does 'full stack' development refer to?",
                "opts": [
                    {
                        "text": "Only frontend development",
                        "correct": false
                    },
                    {
                        "text": "Only backend development",
                        "correct": false
                    },
                    {
                        "text": "Development of both frontend (client-side) and backend (server-side) of an application",
                        "correct": true
                    },
                    {
                        "text": "Database management only",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which of the following is a popular JavaScript runtime for backend development?",
                "opts": [
                    {
                        "text": "Apache",
                        "correct": false
                    },
                    {
                        "text": "Django",
                        "correct": false
                    },
                    {
                        "text": "Node.js",
                        "correct": true
                    },
                    {
                        "text": "Laravel",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a relational database?",
                "opts": [
                    {
                        "text": "A database with no structure",
                        "correct": false
                    },
                    {
                        "text": "A database that stores data in tables with predefined relationships",
                        "correct": true
                    },
                    {
                        "text": "A database stored in files",
                        "correct": false
                    },
                    {
                        "text": "A type of NoSQL database",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is npm?",
                "opts": [
                    {
                        "text": "A JavaScript framework",
                        "correct": false
                    },
                    {
                        "text": "Node Package Manager – used to install and manage JavaScript libraries",
                        "correct": true
                    },
                    {
                        "text": "A database system",
                        "correct": false
                    },
                    {
                        "text": "A testing tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is version control and why is it important?",
                "opts": [
                    {
                        "text": "A way to control app versions",
                        "correct": false
                    },
                    {
                        "text": "A system to track and manage changes to code over time",
                        "correct": true
                    },
                    {
                        "text": "A type of database",
                        "correct": false
                    },
                    {
                        "text": "A deployment strategy",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is an API?",
                "opts": [
                    {
                        "text": "A programming language",
                        "correct": false
                    },
                    {
                        "text": "Application Programming Interface – a set of rules for how software components interact",
                        "correct": true
                    },
                    {
                        "text": "A type of database",
                        "correct": false
                    },
                    {
                        "text": "A web server",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is React?",
                "opts": [
                    {
                        "text": "A backend framework",
                        "correct": false
                    },
                    {
                        "text": "A database",
                        "correct": false
                    },
                    {
                        "text": "A JavaScript library for building user interfaces",
                        "correct": true
                    },
                    {
                        "text": "An HTTP server",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does CRUD stand for?",
                "opts": [
                    {
                        "text": "Create, Run, Update, Delete",
                        "correct": false
                    },
                    {
                        "text": "Create, Read, Update, Delete",
                        "correct": true
                    },
                    {
                        "text": "Connect, Read, Upload, Display",
                        "correct": false
                    },
                    {
                        "text": "Copy, Read, Undo, Deploy",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a REST API?",
                "opts": [
                    {
                        "text": "An API that runs in real-time",
                        "correct": false
                    },
                    {
                        "text": "Representational State Transfer – a stateless architectural style for distributed systems",
                        "correct": true
                    },
                    {
                        "text": "A real-time socket API",
                        "correct": false
                    },
                    {
                        "text": "A GraphQL variation",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is MongoDB?",
                "opts": [
                    {
                        "text": "A relational database",
                        "correct": false
                    },
                    {
                        "text": "A NoSQL document database",
                        "correct": true
                    },
                    {
                        "text": "A JavaScript framework",
                        "correct": false
                    },
                    {
                        "text": "A caching system",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of a `.env` file in a web project?",
                "opts": [
                    {
                        "text": "To store HTML templates",
                        "correct": false
                    },
                    {
                        "text": "To define environment-specific configuration variables like API keys",
                        "correct": true
                    },
                    {
                        "text": "To configure routing",
                        "correct": false
                    },
                    {
                        "text": "To store CSS variables",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Express.js?",
                "opts": [
                    {
                        "text": "A CSS framework",
                        "correct": false
                    },
                    {
                        "text": "A database ORM",
                        "correct": false
                    },
                    {
                        "text": "A fast, minimalist web framework for Node.js",
                        "correct": true
                    },
                    {
                        "text": "A React state manager",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does SPA stand for in web development?",
                "opts": [
                    {
                        "text": "Single Page Application",
                        "correct": true
                    },
                    {
                        "text": "Secure Protocol Application",
                        "correct": false
                    },
                    {
                        "text": "Server-side Page Application",
                        "correct": false
                    },
                    {
                        "text": "Standard Page Architecture",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of middleware in Express.js?",
                "opts": [
                    {
                        "text": "To render HTML templates",
                        "correct": false
                    },
                    {
                        "text": "Functions that execute between the request and response in a Node.js app",
                        "correct": true
                    },
                    {
                        "text": "To manage databases",
                        "correct": false
                    },
                    {
                        "text": "To style responses",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is JWT used for?",
                "opts": [
                    {
                        "text": "Database queries",
                        "correct": false
                    },
                    {
                        "text": "JavaScript testing",
                        "correct": false
                    },
                    {
                        "text": "JSON Web Token – used for authentication and secure information exchange",
                        "correct": true
                    },
                    {
                        "text": "Job scheduling",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between SQL and NoSQL databases?",
                "opts": [
                    {
                        "text": "SQL is newer than NoSQL",
                        "correct": false
                    },
                    {
                        "text": "SQL databases are schema-less; NoSQL have fixed schemas",
                        "correct": false
                    },
                    {
                        "text": "SQL uses structured tables with fixed schemas; NoSQL is flexible and schema-less",
                        "correct": true
                    },
                    {
                        "text": "They are the same technology",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the MVC architecture pattern?",
                "opts": [
                    {
                        "text": "Model-View-Controller – separates application into data, UI, and logic layers",
                        "correct": true
                    },
                    {
                        "text": "Main-View-Command design pattern",
                        "correct": false
                    },
                    {
                        "text": "Multi-Version Control system",
                        "correct": false
                    },
                    {
                        "text": "Modular-View-Component framework",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is authentication vs. authorization?",
                "opts": [
                    {
                        "text": "They are the same thing",
                        "correct": false
                    },
                    {
                        "text": "Authentication verifies identity; authorization determines what an authenticated user can do",
                        "correct": true
                    },
                    {
                        "text": "Authorization verifies identity; authentication controls access",
                        "correct": false
                    },
                    {
                        "text": "Neither is related to security",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is an ORM?",
                "opts": [
                    {
                        "text": "Object-Relational Mapping – maps database tables to objects in code",
                        "correct": true
                    },
                    {
                        "text": "Open Resource Management tool",
                        "correct": false
                    },
                    {
                        "text": "Online Rendering Module",
                        "correct": false
                    },
                    {
                        "text": "Output Response Manager",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of HTTPS?",
                "opts": [
                    {
                        "text": "Faster data transfer",
                        "correct": false
                    },
                    {
                        "text": "Adding HTML headers",
                        "correct": false
                    },
                    {
                        "text": "Encrypting data in transit between client and server",
                        "correct": true
                    },
                    {
                        "text": "A new HTTP version",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is database indexing?",
                "opts": [
                    {
                        "text": "Sorting data alphabetically",
                        "correct": false
                    },
                    {
                        "text": "A data structure that improves the speed of data retrieval operations",
                        "correct": true
                    },
                    {
                        "text": "Numbering database rows",
                        "correct": false
                    },
                    {
                        "text": "Archiving old data",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a RESTful resource?",
                "opts": [
                    {
                        "text": "A CSS asset",
                        "correct": false
                    },
                    {
                        "text": "An entity exposed via a URL that can be acted upon with HTTP methods",
                        "correct": true
                    },
                    {
                        "text": "A database record",
                        "correct": false
                    },
                    {
                        "text": "A JavaScript object",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is session-based authentication?",
                "opts": [
                    {
                        "text": "Token stored in the database",
                        "correct": false
                    },
                    {
                        "text": "Client stores a JWT",
                        "correct": false
                    },
                    {
                        "text": "Server stores session data and client holds a session ID cookie",
                        "correct": true
                    },
                    {
                        "text": "Storing password in localStorage",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the role of a CDN (Content Delivery Network)?",
                "opts": [
                    {
                        "text": "Running backend code",
                        "correct": false
                    },
                    {
                        "text": "Hosting databases",
                        "correct": false
                    },
                    {
                        "text": "Distributing static assets globally to reduce latency",
                        "correct": true
                    },
                    {
                        "text": "Handling authentication",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a monorepo?",
                "opts": [
                    {
                        "text": "A single-server architecture",
                        "correct": false
                    },
                    {
                        "text": "A single repository containing multiple projects/packages",
                        "correct": true
                    },
                    {
                        "text": "A repository with only one file",
                        "correct": false
                    },
                    {
                        "text": "A type of database",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is GraphQL?",
                "opts": [
                    {
                        "text": "A graph database",
                        "correct": false
                    },
                    {
                        "text": "A query language and runtime for APIs that lets clients request exactly the data they need",
                        "correct": true
                    },
                    {
                        "text": "A JavaScript graph library",
                        "correct": false
                    },
                    {
                        "text": "A REST alternative that uses XML",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does horizontal scaling mean?",
                "opts": [
                    {
                        "text": "Adding more CPU to one server",
                        "correct": false
                    },
                    {
                        "text": "Adding more servers to distribute load",
                        "correct": true
                    },
                    {
                        "text": "Increasing database storage",
                        "correct": false
                    },
                    {
                        "text": "Optimizing code to use fewer resources",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of an API Gateway?",
                "opts": [
                    {
                        "text": "A type of database",
                        "correct": false
                    },
                    {
                        "text": "A single entry point for clients to access multiple backend services",
                        "correct": true
                    },
                    {
                        "text": "A browser extension",
                        "correct": false
                    },
                    {
                        "text": "A CSS minifier",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is React's virtual DOM?",
                "opts": [
                    {
                        "text": "A separate browser DOM",
                        "correct": false
                    },
                    {
                        "text": "A lightweight in-memory representation of the real DOM used to optimize updates",
                        "correct": true
                    },
                    {
                        "text": "A DOM without JavaScript",
                        "correct": false
                    },
                    {
                        "text": "A server-side DOM",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is CI/CD?",
                "opts": [
                    {
                        "text": "Code Integration/Code Deployment",
                        "correct": false
                    },
                    {
                        "text": "Continuous Integration/Continuous Delivery – automating build, test, and deployment pipelines",
                        "correct": true
                    },
                    {
                        "text": "Content Integrity/Content Delivery",
                        "correct": false
                    },
                    {
                        "text": "Client Interface/Client Development",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a microservices architecture?",
                "opts": [
                    {
                        "text": "An architecture with a single large server",
                        "correct": false
                    },
                    {
                        "text": "An architecture where an application is broken into small, independently deployable services",
                        "correct": true
                    },
                    {
                        "text": "A type of database architecture",
                        "correct": false
                    },
                    {
                        "text": "A frontend architecture pattern",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the N+1 query problem?",
                "opts": [
                    {
                        "text": "A database normalization issue",
                        "correct": false
                    },
                    {
                        "text": "Running N additional queries to fetch related data for each of N results, causing performance issues",
                        "correct": true
                    },
                    {
                        "text": "An infinite loop in queries",
                        "correct": false
                    },
                    {
                        "text": "A query with too many JOINs",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Docker?",
                "opts": [
                    {
                        "text": "A programming language",
                        "correct": false
                    },
                    {
                        "text": "A containerization platform that packages applications and dependencies",
                        "correct": true
                    },
                    {
                        "text": "A cloud hosting provider",
                        "correct": false
                    },
                    {
                        "text": "A database management system",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between PUT and PATCH HTTP methods?",
                "opts": [
                    {
                        "text": "They are identical",
                        "correct": false
                    },
                    {
                        "text": "PUT replaces the entire resource; PATCH partially updates it",
                        "correct": true
                    },
                    {
                        "text": "PATCH replaces entirely; PUT partially updates",
                        "correct": false
                    },
                    {
                        "text": "Both only update specific fields",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is caching in web applications?",
                "opts": [
                    {
                        "text": "Compressing files",
                        "correct": false
                    },
                    {
                        "text": "Storing frequently accessed data in a fast-access layer to reduce load and latency",
                        "correct": true
                    },
                    {
                        "text": "Encrypting data",
                        "correct": false
                    },
                    {
                        "text": "Archiving old records",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the CAP theorem?",
                "opts": [
                    {
                        "text": "A sorting algorithm",
                        "correct": false
                    },
                    {
                        "text": "The theorem that a distributed system can guarantee only two of: Consistency, Availability, Partition Tolerance",
                        "correct": true
                    },
                    {
                        "text": "A theorem about algorithm complexity",
                        "correct": false
                    },
                    {
                        "text": "A CSS layout algorithm",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is eventual consistency in distributed systems?",
                "opts": [
                    {
                        "text": "Data is always immediately consistent",
                        "correct": false
                    },
                    {
                        "text": "A consistency model where data will become consistent eventually, but may be temporarily inconsistent",
                        "correct": true
                    },
                    {
                        "text": "Data is never consistent",
                        "correct": false
                    },
                    {
                        "text": "A database transaction property",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Saga pattern in microservices?",
                "opts": [
                    {
                        "text": "A UI design pattern",
                        "correct": false
                    },
                    {
                        "text": "A pattern for managing distributed transactions across services without 2-phase commit",
                        "correct": true
                    },
                    {
                        "text": "A CI/CD pipeline pattern",
                        "correct": false
                    },
                    {
                        "text": "A database indexing strategy",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between optimistic and pessimistic locking?",
                "opts": [
                    {
                        "text": "Optimistic locking is always faster",
                        "correct": false
                    },
                    {
                        "text": "Pessimistic locking assumes conflict is rare; optimistic assumes conflicts are likely",
                        "correct": false
                    },
                    {
                        "text": "Optimistic locking locks records immediately; pessimistic checks at commit",
                        "correct": false
                    },
                    {
                        "text": "They are identical",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is CQRS (Command Query Responsibility Segregation)?",
                "opts": [
                    {
                        "text": "A CSS naming convention",
                        "correct": false
                    },
                    {
                        "text": "Separating read (query) and write (command) operations into different models",
                        "correct": true
                    },
                    {
                        "text": "A type of REST API",
                        "correct": false
                    },
                    {
                        "text": "A database sharding strategy",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is OAuth 2.0?",
                "opts": [
                    {
                        "text": "A database protocol",
                        "correct": false
                    },
                    {
                        "text": "A password hashing algorithm",
                        "correct": false
                    },
                    {
                        "text": "An open standard for authorization that allows third-party apps to access resources without sharing passwords",
                        "correct": true
                    },
                    {
                        "text": "A REST API specification",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is database sharding?",
                "opts": [
                    {
                        "text": "Splitting a database into backups",
                        "correct": false
                    },
                    {
                        "text": "Horizontally partitioning data across multiple databases to scale",
                        "correct": true
                    },
                    {
                        "text": "Indexing all columns",
                        "correct": false
                    },
                    {
                        "text": "Compressing database files",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a message queue?",
                "opts": [
                    {
                        "text": "A chat system",
                        "correct": false
                    },
                    {
                        "text": "A database for messages",
                        "correct": false
                    },
                    {
                        "text": "An asynchronous communication pattern where producers send messages to a queue consumed by workers",
                        "correct": true
                    },
                    {
                        "text": "A synchronous API call mechanism",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the strangler fig pattern in software architecture?",
                "opts": [
                    {
                        "text": "A security vulnerability",
                        "correct": false
                    },
                    {
                        "text": "A pattern for gradually migrating a legacy system to a new architecture incrementally",
                        "correct": true
                    },
                    {
                        "text": "A database indexing technique",
                        "correct": false
                    },
                    {
                        "text": "A React rendering pattern",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a WebSocket?",
                "opts": [
                    {
                        "text": "A regular HTTP connection",
                        "correct": false
                    },
                    {
                        "text": "A protocol providing full-duplex, persistent communication channels over a single TCP connection",
                        "correct": true
                    },
                    {
                        "text": "A type of REST endpoint",
                        "correct": false
                    },
                    {
                        "text": "A database connection",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Twelve-Factor App methodology?",
                "opts": [
                    {
                        "text": "12 rules for writing CSS",
                        "correct": false
                    },
                    {
                        "text": "A methodology for building scalable, maintainable SaaS applications",
                        "correct": true
                    },
                    {
                        "text": "12 REST API design rules",
                        "correct": false
                    },
                    {
                        "text": "A JavaScript coding standard",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is rate limiting in APIs?",
                "opts": [
                    {
                        "text": "Limiting database query speed",
                        "correct": false
                    },
                    {
                        "text": "Restricting the number of requests a client can make to an API within a time window",
                        "correct": true
                    },
                    {
                        "text": "Limiting server memory usage",
                        "correct": false
                    },
                    {
                        "text": "Throttling database connections",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is server-sent events (SSE)?",
                "opts": [
                    {
                        "text": "A push notification system",
                        "correct": false
                    },
                    {
                        "text": "A one-directional server-to-client streaming protocol over HTTP",
                        "correct": true
                    },
                    {
                        "text": "A bidirectional socket protocol",
                        "correct": false
                    },
                    {
                        "text": "A REST webhook",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is dead letter queue (DLQ)?",
                "opts": [
                    {
                        "text": "A deleted database",
                        "correct": false
                    },
                    {
                        "text": "A queue that holds messages that failed to be processed after maximum retries",
                        "correct": true
                    },
                    {
                        "text": "A network packet loss metric",
                        "correct": false
                    },
                    {
                        "text": "A failed deployment log",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is blue-green deployment?",
                "opts": [
                    {
                        "text": "A CSS color strategy",
                        "correct": false
                    },
                    {
                        "text": "A deployment strategy with two identical environments, switching traffic from old (blue) to new (green)",
                        "correct": true
                    },
                    {
                        "text": "A Git branching strategy",
                        "correct": false
                    },
                    {
                        "text": "A database migration strategy",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "backendApis": {
        "title": "Backend pis",
        "questions": [
            {
                "q": "What does Node.js use as its JavaScript engine?",
                "opts": [
                    {
                        "text": "SpiderMonkey",
                        "correct": false
                    },
                    {
                        "text": "Chakra",
                        "correct": false
                    },
                    {
                        "text": "V8",
                        "correct": true
                    },
                    {
                        "text": "JavaScriptCore",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which HTTP status code indicates a successful response?",
                "opts": [
                    {
                        "text": "404",
                        "correct": false
                    },
                    {
                        "text": "500",
                        "correct": false
                    },
                    {
                        "text": "301",
                        "correct": false
                    },
                    {
                        "text": "200",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What is the purpose of the `body-parser` middleware in Express?",
                "opts": [
                    {
                        "text": "To compress responses",
                        "correct": false
                    },
                    {
                        "text": "To parse incoming request bodies (e.g., JSON, form data)",
                        "correct": true
                    },
                    {
                        "text": "To route requests",
                        "correct": false
                    },
                    {
                        "text": "To authenticate users",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is an HTTP header?",
                "opts": [
                    {
                        "text": "The first line of HTML",
                        "correct": false
                    },
                    {
                        "text": "Metadata sent with HTTP requests and responses",
                        "correct": true
                    },
                    {
                        "text": "The URL of the request",
                        "correct": false
                    },
                    {
                        "text": "The response body",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the HTTP DELETE method do?",
                "opts": [
                    {
                        "text": "Removes a user session",
                        "correct": false
                    },
                    {
                        "text": "Marks a resource as archived",
                        "correct": false
                    },
                    {
                        "text": "Requests the server to delete a specified resource",
                        "correct": true
                    },
                    {
                        "text": "Updates a resource partially",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is SQL?",
                "opts": [
                    {
                        "text": "A JavaScript framework",
                        "correct": false
                    },
                    {
                        "text": "Structured Query Language – used to manage relational databases",
                        "correct": true
                    },
                    {
                        "text": "Server Query Language for APIs",
                        "correct": false
                    },
                    {
                        "text": "A NoSQL database type",
                        "correct": false
                    }
                ]
            },
            {
                "q": "Which HTTP header is used to send a JWT token?",
                "opts": [
                    {
                        "text": "Content-Type",
                        "correct": false
                    },
                    {
                        "text": "X-Auth-Token",
                        "correct": false
                    },
                    {
                        "text": "Authorization",
                        "correct": true
                    },
                    {
                        "text": "Accept",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a primary key in a database?",
                "opts": [
                    {
                        "text": "The first column in a table",
                        "correct": false
                    },
                    {
                        "text": "A column that uniquely identifies each row in a table",
                        "correct": true
                    },
                    {
                        "text": "An index on multiple columns",
                        "correct": false
                    },
                    {
                        "text": "A foreign reference column",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between GET and POST HTTP methods?",
                "opts": [
                    {
                        "text": "GET is for forms only",
                        "correct": false
                    },
                    {
                        "text": "GET retrieves data; POST sends data to create a resource",
                        "correct": true
                    },
                    {
                        "text": "POST is safer than GET",
                        "correct": false
                    },
                    {
                        "text": "They are interchangeable",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a foreign key in a relational database?",
                "opts": [
                    {
                        "text": "An encrypted primary key",
                        "correct": false
                    },
                    {
                        "text": "A column that links rows in one table to rows in another table",
                        "correct": true
                    },
                    {
                        "text": "An external API key",
                        "correct": false
                    },
                    {
                        "text": "A unique identifier",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What command initializes a new Node.js project?",
                "opts": [
                    {
                        "text": "node init",
                        "correct": false
                    },
                    {
                        "text": "npm start",
                        "correct": false
                    },
                    {
                        "text": "npm init -y",
                        "correct": true
                    },
                    {
                        "text": "node create",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does `res.json()` do in Express.js?",
                "opts": [
                    {
                        "text": "Redirects the request",
                        "correct": false
                    },
                    {
                        "text": "Renders an HTML template",
                        "correct": false
                    },
                    {
                        "text": "Sends a JSON response with the correct Content-Type header",
                        "correct": true
                    },
                    {
                        "text": "Reads the request body",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is middleware in the context of web servers?",
                "opts": [
                    {
                        "text": "A database layer",
                        "correct": false
                    },
                    {
                        "text": "Software that acts as a bridge between different systems or processes a request before it reaches its final handler",
                        "correct": true
                    },
                    {
                        "text": "A frontend library",
                        "correct": false
                    },
                    {
                        "text": "A type of API",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a 404 HTTP error?",
                "opts": [
                    {
                        "text": "Server error",
                        "correct": false
                    },
                    {
                        "text": "Unauthorized access",
                        "correct": false
                    },
                    {
                        "text": "Resource Not Found",
                        "correct": true
                    },
                    {
                        "text": "Redirect",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What SQL keyword is used to retrieve data?",
                "opts": [
                    {
                        "text": "FETCH",
                        "correct": false
                    },
                    {
                        "text": "GET",
                        "correct": false
                    },
                    {
                        "text": "RETRIEVE",
                        "correct": false
                    },
                    {
                        "text": "SELECT",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What is connection pooling in databases?",
                "opts": [
                    {
                        "text": "Grouping database queries",
                        "correct": false
                    },
                    {
                        "text": "Maintaining a cache of database connections to reuse rather than creating a new connection for each request",
                        "correct": true
                    },
                    {
                        "text": "A backup strategy",
                        "correct": false
                    },
                    {
                        "text": "A replication technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is SQL injection?",
                "opts": [
                    {
                        "text": "A way to speed up SQL queries",
                        "correct": false
                    },
                    {
                        "text": "A vulnerability where malicious SQL code is inserted into a query via user input",
                        "correct": true
                    },
                    {
                        "text": "A database normalization technique",
                        "correct": false
                    },
                    {
                        "text": "A type of SQL JOIN",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is database normalization?",
                "opts": [
                    {
                        "text": "Compressing database files",
                        "correct": false
                    },
                    {
                        "text": "Organizing data to reduce redundancy and improve integrity",
                        "correct": true
                    },
                    {
                        "text": "Encrypting database columns",
                        "correct": false
                    },
                    {
                        "text": "Scaling the database horizontally",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of indexing in databases?",
                "opts": [
                    {
                        "text": "To sort data alphabetically",
                        "correct": false
                    },
                    {
                        "text": "To create backups",
                        "correct": false
                    },
                    {
                        "text": "To create a data structure that speeds up data retrieval",
                        "correct": true
                    },
                    {
                        "text": "To enforce foreign key constraints",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is JWT (JSON Web Token) structure?",
                "opts": [
                    {
                        "text": "Username, password, token",
                        "correct": false
                    },
                    {
                        "text": "Header.Payload.Signature",
                        "correct": true
                    },
                    {
                        "text": "Token, expiry, user",
                        "correct": false
                    },
                    {
                        "text": "ID, data, checksum",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between bcrypt and MD5 for password hashing?",
                "opts": [
                    {
                        "text": "MD5 is more secure",
                        "correct": false
                    },
                    {
                        "text": "bcrypt is a fast hash; MD5 is slow",
                        "correct": false
                    },
                    {
                        "text": "bcrypt is a slow, adaptive hash designed for passwords; MD5 is fast and cryptographically broken",
                        "correct": true
                    },
                    {
                        "text": "They are equally secure",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is REST API versioning?",
                "opts": [
                    {
                        "text": "Saving multiple API backups",
                        "correct": false
                    },
                    {
                        "text": "A strategy for managing changes to an API without breaking existing clients",
                        "correct": true
                    },
                    {
                        "text": "Documenting API endpoints",
                        "correct": false
                    },
                    {
                        "text": "Rate limiting API versions",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is an async/await pattern in Node.js?",
                "opts": [
                    {
                        "text": "Syntax for creating web workers",
                        "correct": false
                    },
                    {
                        "text": "Syntax for running code in parallel threads",
                        "correct": false
                    },
                    {
                        "text": "Syntactic sugar over Promises for writing asynchronous code that looks synchronous",
                        "correct": true
                    },
                    {
                        "text": "A callback-based pattern",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the SQL JOIN operation do?",
                "opts": [
                    {
                        "text": "Merges two databases",
                        "correct": false
                    },
                    {
                        "text": "Combines rows from two tables based on a related column",
                        "correct": true
                    },
                    {
                        "text": "Deletes duplicate rows",
                        "correct": false
                    },
                    {
                        "text": "Sorts data from multiple tables",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of ACID properties in databases?",
                "opts": [
                    {
                        "text": "A data compression standard",
                        "correct": false
                    },
                    {
                        "text": "Atomicity, Consistency, Isolation, Durability – properties ensuring reliable database transactions",
                        "correct": true
                    },
                    {
                        "text": "A caching strategy",
                        "correct": false
                    },
                    {
                        "text": "An API security standard",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Redis?",
                "opts": [
                    {
                        "text": "A relational database",
                        "correct": false
                    },
                    {
                        "text": "A JavaScript runtime",
                        "correct": false
                    },
                    {
                        "text": "An in-memory data store used for caching, session storage, and pub/sub",
                        "correct": true
                    },
                    {
                        "text": "A message queue only",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of the `next()` function in Express middleware?",
                "opts": [
                    {
                        "text": "Sends the response",
                        "correct": false
                    },
                    {
                        "text": "Skips the current route",
                        "correct": false
                    },
                    {
                        "text": "Passes control to the next middleware or route handler",
                        "correct": true
                    },
                    {
                        "text": "Ends the request-response cycle",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is API pagination?",
                "opts": [
                    {
                        "text": "Splitting an API into versions",
                        "correct": false
                    },
                    {
                        "text": "Dividing large data responses into smaller chunks (pages) to improve performance",
                        "correct": true
                    },
                    {
                        "text": "Caching API responses",
                        "correct": false
                    },
                    {
                        "text": "Authenticating API requests",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a stored procedure in SQL?",
                "opts": [
                    {
                        "text": "A database index",
                        "correct": false
                    },
                    {
                        "text": "A precompiled SQL code block stored in the database that can be executed repeatedly",
                        "correct": true
                    },
                    {
                        "text": "A database view",
                        "correct": false
                    },
                    {
                        "text": "A trigger function",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between `process.env` and hardcoded config values?",
                "opts": [
                    {
                        "text": "No difference",
                        "correct": false
                    },
                    {
                        "text": "process.env reads environment variables at runtime, keeping sensitive data outside source code",
                        "correct": true
                    },
                    {
                        "text": "process.env is slower",
                        "correct": false
                    },
                    {
                        "text": "Hardcoded values are more secure",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is N-tier architecture?",
                "opts": [
                    {
                        "text": "An architecture with N databases",
                        "correct": false
                    },
                    {
                        "text": "Separating an application into N distinct layers (e.g., presentation, logic, data)",
                        "correct": true
                    },
                    {
                        "text": "A microservices pattern",
                        "correct": false
                    },
                    {
                        "text": "A REST design pattern",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the event-driven architecture pattern?",
                "opts": [
                    {
                        "text": "A UI design pattern",
                        "correct": false
                    },
                    {
                        "text": "Services communicate by producing and consuming events, decoupling producers from consumers",
                        "correct": true
                    },
                    {
                        "text": "A database design pattern",
                        "correct": false
                    },
                    {
                        "text": "A synchronous API pattern",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a database transaction?",
                "opts": [
                    {
                        "text": "A single SQL query",
                        "correct": false
                    },
                    {
                        "text": "A sequence of database operations treated as a single logical unit that must fully succeed or be fully rolled back",
                        "correct": true
                    },
                    {
                        "text": "A backup operation",
                        "correct": false
                    },
                    {
                        "text": "A read-only query",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between horizontal and vertical database scaling?",
                "opts": [
                    {
                        "text": "Horizontal = more tables; vertical = more rows",
                        "correct": false
                    },
                    {
                        "text": "Horizontal = adding more database servers; vertical = adding more resources (CPU/RAM) to existing server",
                        "correct": true
                    },
                    {
                        "text": "Horizontal scaling is more expensive",
                        "correct": false
                    },
                    {
                        "text": "Vertical scaling handles more concurrent connections",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Circuit Breaker pattern?",
                "opts": [
                    {
                        "text": "A CSS animation technique",
                        "correct": false
                    },
                    {
                        "text": "A design pattern that prevents cascading failures by stopping calls to a failing service",
                        "correct": true
                    },
                    {
                        "text": "A React state pattern",
                        "correct": false
                    },
                    {
                        "text": "A database locking mechanism",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is an idempotent operation in APIs?",
                "opts": [
                    {
                        "text": "A slow operation",
                        "correct": false
                    },
                    {
                        "text": "An operation that produces the same result no matter how many times it's applied",
                        "correct": true
                    },
                    {
                        "text": "An operation that changes state",
                        "correct": false
                    },
                    {
                        "text": "A cached operation",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Two-Phase Commit (2PC) protocol?",
                "opts": [
                    {
                        "text": "A code review process",
                        "correct": false
                    },
                    {
                        "text": "A distributed transaction protocol that ensures all nodes commit or all rollback",
                        "correct": true
                    },
                    {
                        "text": "A deployment strategy",
                        "correct": false
                    },
                    {
                        "text": "A database indexing algorithm",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is eventual consistency vs. strong consistency?",
                "opts": [
                    {
                        "text": "Strong = faster, eventual = slower",
                        "correct": false
                    },
                    {
                        "text": "Strong consistency guarantees every read sees the latest write; eventual allows temporary inconsistency for higher availability",
                        "correct": true
                    },
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "Eventual consistency is only for NoSQL",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is backpressure in streaming systems?",
                "opts": [
                    {
                        "text": "A server memory issue",
                        "correct": false
                    },
                    {
                        "text": "A mechanism where a slow consumer signals a fast producer to slow down",
                        "correct": true
                    },
                    {
                        "text": "A network compression technique",
                        "correct": false
                    },
                    {
                        "text": "An API rate limiting strategy",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is database denormalization?",
                "opts": [
                    {
                        "text": "Removing all indexes",
                        "correct": false
                    },
                    {
                        "text": "Intentionally introducing redundancy for performance gains (faster reads at the cost of some data duplication)",
                        "correct": true
                    },
                    {
                        "text": "Removing all constraints",
                        "correct": false
                    },
                    {
                        "text": "Splitting tables into more tables",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is gRPC?",
                "opts": [
                    {
                        "text": "A CSS grid system",
                        "correct": false
                    },
                    {
                        "text": "A high-performance, open-source RPC framework using Protocol Buffers",
                        "correct": true
                    },
                    {
                        "text": "A GraphQL variant",
                        "correct": false
                    },
                    {
                        "text": "A REST API tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Outbox pattern?",
                "opts": [
                    {
                        "text": "A UI notification pattern",
                        "correct": false
                    },
                    {
                        "text": "A reliable event publishing pattern that avoids dual-write problems by writing events to an outbox table in the same transaction",
                        "correct": true
                    },
                    {
                        "text": "A database backup strategy",
                        "correct": false
                    },
                    {
                        "text": "A caching pattern",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is connection multiplexing in HTTP/2?",
                "opts": [
                    {
                        "text": "Using multiple servers",
                        "correct": false
                    },
                    {
                        "text": "Sending multiple requests/responses simultaneously over a single TCP connection",
                        "correct": true
                    },
                    {
                        "text": "Compressing HTTP headers",
                        "correct": false
                    },
                    {
                        "text": "Encrypting individual requests",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between synchronous and asynchronous replication?",
                "opts": [
                    {
                        "text": "Async is always better",
                        "correct": false
                    },
                    {
                        "text": "Sync replication waits for acknowledgment from replicas before confirming write; async does not",
                        "correct": true
                    },
                    {
                        "text": "Async replication is more consistent",
                        "correct": false
                    },
                    {
                        "text": "They are the same",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Bulkhead pattern in distributed systems?",
                "opts": [
                    {
                        "text": "A security firewall pattern",
                        "correct": false
                    },
                    {
                        "text": "Isolating elements of an application into pools so that failures in one won't cascade to others",
                        "correct": true
                    },
                    {
                        "text": "A database partitioning strategy",
                        "correct": false
                    },
                    {
                        "text": "A load balancing algorithm",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Event Sourcing?",
                "opts": [
                    {
                        "text": "Using events for UI updates",
                        "correct": false
                    },
                    {
                        "text": "Storing the state of a system as a sequence of events rather than just current state",
                        "correct": true
                    },
                    {
                        "text": "A pub/sub messaging pattern",
                        "correct": false
                    },
                    {
                        "text": "A React pattern",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What are database views?",
                "opts": [
                    {
                        "text": "Database backups",
                        "correct": false
                    },
                    {
                        "text": "Virtual tables defined by a SELECT query, providing a simplified interface to underlying data",
                        "correct": true
                    },
                    {
                        "text": "Database indexes",
                        "correct": false
                    },
                    {
                        "text": "Stored procedures",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is service mesh?",
                "opts": [
                    {
                        "text": "A cloud provider network",
                        "correct": false
                    },
                    {
                        "text": "An infrastructure layer handling service-to-service communication (security, load balancing, observability)",
                        "correct": true
                    },
                    {
                        "text": "A database cluster",
                        "correct": false
                    },
                    {
                        "text": "A CSS grid system",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a write-ahead log (WAL)?",
                "opts": [
                    {
                        "text": "A logging framework",
                        "correct": false
                    },
                    {
                        "text": "A database technique where changes are logged before being applied to the actual data, ensuring durability",
                        "correct": true
                    },
                    {
                        "text": "A network logging protocol",
                        "correct": false
                    },
                    {
                        "text": "A cache invalidation strategy",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Sidecar pattern?",
                "opts": [
                    {
                        "text": "A UI component pattern",
                        "correct": false
                    },
                    {
                        "text": "Deploying a helper container alongside a main service container to provide supporting features",
                        "correct": true
                    },
                    {
                        "text": "A database pattern",
                        "correct": false
                    },
                    {
                        "text": "A CSS layout technique",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "dataScience": {
        "title": "Data cience",
        "questions": [
            {
                "q": "What is Pandas in Python?",
                "opts": [
                    {
                        "text": "A machine learning library",
                        "correct": false
                    },
                    {
                        "text": "A data manipulation and analysis library",
                        "correct": true
                    },
                    {
                        "text": "A web framework",
                        "correct": false
                    },
                    {
                        "text": "A visualization tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a DataFrame in Pandas?",
                "opts": [
                    {
                        "text": "A graph data structure",
                        "correct": false
                    },
                    {
                        "text": "A two-dimensional, labeled data structure with columns of potentially different types",
                        "correct": true
                    },
                    {
                        "text": "A one-dimensional array",
                        "correct": false
                    },
                    {
                        "text": "A neural network layer",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does NumPy stand for?",
                "opts": [
                    {
                        "text": "Number Python",
                        "correct": false
                    },
                    {
                        "text": "Numerical Python",
                        "correct": true
                    },
                    {
                        "text": "New Python",
                        "correct": false
                    },
                    {
                        "text": "None of the above",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the mean of the dataset [2, 4, 6, 8, 10]?",
                "opts": [
                    {
                        "text": "4",
                        "correct": false
                    },
                    {
                        "text": "5",
                        "correct": false
                    },
                    {
                        "text": "6",
                        "correct": true
                    },
                    {
                        "text": "7",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is data cleaning?",
                "opts": [
                    {
                        "text": "Deleting all data",
                        "correct": false
                    },
                    {
                        "text": "The process of fixing or removing incorrect, corrupted, or incomplete data",
                        "correct": true
                    },
                    {
                        "text": "Sorting data alphabetically",
                        "correct": false
                    },
                    {
                        "text": "Visualizing data",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is machine learning?",
                "opts": [
                    {
                        "text": "Programming computers manually for every task",
                        "correct": false
                    },
                    {
                        "text": "A type of AI that enables systems to learn and improve from experience without being explicitly programmed",
                        "correct": true
                    },
                    {
                        "text": "A database system",
                        "correct": false
                    },
                    {
                        "text": "A web scraping technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a training dataset?",
                "opts": [
                    {
                        "text": "A dataset used to test model performance",
                        "correct": false
                    },
                    {
                        "text": "Data used to teach the model to learn patterns",
                        "correct": true
                    },
                    {
                        "text": "Data collected from production",
                        "correct": false
                    },
                    {
                        "text": "A dataset with no labels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does CSV stand for in data science?",
                "opts": [
                    {
                        "text": "Comma Separated Values",
                        "correct": true
                    },
                    {
                        "text": "Computer Stored Values",
                        "correct": false
                    },
                    {
                        "text": "Column Sorted Variables",
                        "correct": false
                    },
                    {
                        "text": "Computed Statistical Values",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the median?",
                "opts": [
                    {
                        "text": "The most frequent value in a dataset",
                        "correct": false
                    },
                    {
                        "text": "The middle value when data is sorted",
                        "correct": true
                    },
                    {
                        "text": "The arithmetic average",
                        "correct": false
                    },
                    {
                        "text": "The range between max and min",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does `df.head()` do in Pandas?",
                "opts": [
                    {
                        "text": "Returns the column headers",
                        "correct": false
                    },
                    {
                        "text": "Returns the first 5 rows of a DataFrame",
                        "correct": true
                    },
                    {
                        "text": "Returns all rows",
                        "correct": false
                    },
                    {
                        "text": "Returns the data types",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is supervised learning?",
                "opts": [
                    {
                        "text": "Training without any data",
                        "correct": false
                    },
                    {
                        "text": "Learning from labeled data where the model maps inputs to known outputs",
                        "correct": true
                    },
                    {
                        "text": "Learning without labels",
                        "correct": false
                    },
                    {
                        "text": "Unsupervised pattern detection",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a null value in a dataset?",
                "opts": [
                    {
                        "text": "A value of zero",
                        "correct": false
                    },
                    {
                        "text": "A missing or undefined value",
                        "correct": true
                    },
                    {
                        "text": "A string value",
                        "correct": false
                    },
                    {
                        "text": "A negative value",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What library is commonly used for data visualization in Python?",
                "opts": [
                    {
                        "text": "NumPy",
                        "correct": false
                    },
                    {
                        "text": "Flask",
                        "correct": false
                    },
                    {
                        "text": "Matplotlib",
                        "correct": true
                    },
                    {
                        "text": "Scikit-learn",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is an outlier in data?",
                "opts": [
                    {
                        "text": "The most common value",
                        "correct": false
                    },
                    {
                        "text": "A data point that differs significantly from other observations",
                        "correct": true
                    },
                    {
                        "text": "The median value",
                        "correct": false
                    },
                    {
                        "text": "A duplicate value",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the mode in statistics?",
                "opts": [
                    {
                        "text": "The middle value",
                        "correct": false
                    },
                    {
                        "text": "The arithmetic average",
                        "correct": false
                    },
                    {
                        "text": "The most frequently occurring value",
                        "correct": true
                    },
                    {
                        "text": "The difference between max and min",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between supervised and unsupervised learning?",
                "opts": [
                    {
                        "text": "Supervised uses more data",
                        "correct": false
                    },
                    {
                        "text": "Supervised uses labeled data; unsupervised finds patterns in unlabeled data",
                        "correct": true
                    },
                    {
                        "text": "Unsupervised is always more accurate",
                        "correct": false
                    },
                    {
                        "text": "They are the same",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is feature engineering?",
                "opts": [
                    {
                        "text": "Designing machine learning models",
                        "correct": false
                    },
                    {
                        "text": "The process of creating new input features from raw data to improve model performance",
                        "correct": true
                    },
                    {
                        "text": "Testing model accuracy",
                        "correct": false
                    },
                    {
                        "text": "Deploying ML models",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is overfitting in machine learning?",
                "opts": [
                    {
                        "text": "When the model is too simple",
                        "correct": false
                    },
                    {
                        "text": "When a model learns training data too well, including noise, and performs poorly on new data",
                        "correct": true
                    },
                    {
                        "text": "When training takes too long",
                        "correct": false
                    },
                    {
                        "text": "When the dataset is too small",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is cross-validation?",
                "opts": [
                    {
                        "text": "Validating with a separate team",
                        "correct": false
                    },
                    {
                        "text": "A technique to assess model generalization by splitting data into multiple train/test folds",
                        "correct": true
                    },
                    {
                        "text": "Comparing two models",
                        "correct": false
                    },
                    {
                        "text": "A feature selection technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the Pearson correlation coefficient measure?",
                "opts": [
                    {
                        "text": "Causation between variables",
                        "correct": false
                    },
                    {
                        "text": "The linear relationship strength between two variables (ranging from -1 to 1)",
                        "correct": true
                    },
                    {
                        "text": "The mean difference between datasets",
                        "correct": false
                    },
                    {
                        "text": "The variance of a dataset",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is dimensionality reduction?",
                "opts": [
                    {
                        "text": "Removing rows from data",
                        "correct": false
                    },
                    {
                        "text": "Reducing the number of features while preserving important information",
                        "correct": true
                    },
                    {
                        "text": "Compressing data files",
                        "correct": false
                    },
                    {
                        "text": "Scaling numeric features",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the bias-variance tradeoff?",
                "opts": [
                    {
                        "text": "The tradeoff between accuracy and speed",
                        "correct": false
                    },
                    {
                        "text": "The balance between underfitting (high bias) and overfitting (high variance)",
                        "correct": true
                    },
                    {
                        "text": "The tradeoff between training and test data size",
                        "correct": false
                    },
                    {
                        "text": "A model tuning technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a confusion matrix?",
                "opts": [
                    {
                        "text": "A disorganized dataset",
                        "correct": false
                    },
                    {
                        "text": "A table showing actual vs. predicted classifications to evaluate model performance",
                        "correct": true
                    },
                    {
                        "text": "A correlation matrix",
                        "correct": false
                    },
                    {
                        "text": "A feature importance table",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is precision in a classification model?",
                "opts": [
                    {
                        "text": "The percentage of correct total predictions",
                        "correct": false
                    },
                    {
                        "text": "Of all positive predictions made, the percentage that were actually positive",
                        "correct": true
                    },
                    {
                        "text": "Of all actual positives, the percentage correctly predicted",
                        "correct": false
                    },
                    {
                        "text": "A measure of model speed",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is recall (sensitivity) in a classification model?",
                "opts": [
                    {
                        "text": "The percentage of correct negative predictions",
                        "correct": false
                    },
                    {
                        "text": "Of all actual positives, the percentage the model correctly identified",
                        "correct": true
                    },
                    {
                        "text": "The model's training speed",
                        "correct": false
                    },
                    {
                        "text": "Of all predictions, the percentage correct",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the F1 score?",
                "opts": [
                    {
                        "text": "The mean of precision and accuracy",
                        "correct": false
                    },
                    {
                        "text": "The harmonic mean of precision and recall",
                        "correct": true
                    },
                    {
                        "text": "The sum of precision and recall",
                        "correct": false
                    },
                    {
                        "text": "A measure of training time",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does pandas `groupby()` do?",
                "opts": [
                    {
                        "text": "Sorts a DataFrame",
                        "correct": false
                    },
                    {
                        "text": "Groups data by one or more columns for aggregation",
                        "correct": true
                    },
                    {
                        "text": "Filters rows",
                        "correct": false
                    },
                    {
                        "text": "Merges DataFrames",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is feature scaling and why is it important?",
                "opts": [
                    {
                        "text": "Removing features",
                        "correct": false
                    },
                    {
                        "text": "Normalizing feature values to a similar range so distance-based algorithms aren't biased by magnitude",
                        "correct": true
                    },
                    {
                        "text": "Selecting important features",
                        "correct": false
                    },
                    {
                        "text": "Encoding categorical variables",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is one-hot encoding?",
                "opts": [
                    {
                        "text": "A hashing technique",
                        "correct": false
                    },
                    {
                        "text": "Converting categorical variables into binary (0/1) columns, one per category",
                        "correct": true
                    },
                    {
                        "text": "A text tokenization method",
                        "correct": false
                    },
                    {
                        "text": "An image compression technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is gradient descent?",
                "opts": [
                    {
                        "text": "A type of neural network",
                        "correct": false
                    },
                    {
                        "text": "An optimization algorithm that iteratively minimizes a loss function by moving in the direction of the steepest descent",
                        "correct": true
                    },
                    {
                        "text": "A feature selection method",
                        "correct": false
                    },
                    {
                        "text": "A data cleaning technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is regularization in machine learning?",
                "opts": [
                    {
                        "text": "Scaling input features",
                        "correct": false
                    },
                    {
                        "text": "Adding a penalty term to the loss function to discourage model complexity and prevent overfitting",
                        "correct": true
                    },
                    {
                        "text": "Removing outliers",
                        "correct": false
                    },
                    {
                        "text": "Normalizing output values",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the ROC-AUC score?",
                "opts": [
                    {
                        "text": "A regression metric",
                        "correct": false
                    },
                    {
                        "text": "Area Under the ROC Curve – measures a classifier's ability to distinguish between classes across all thresholds",
                        "correct": true
                    },
                    {
                        "text": "A measure of training speed",
                        "correct": false
                    },
                    {
                        "text": "A loss function",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Principal Component Analysis (PCA)?",
                "opts": [
                    {
                        "text": "A clustering algorithm",
                        "correct": false
                    },
                    {
                        "text": "A supervised classification technique",
                        "correct": false
                    },
                    {
                        "text": "A dimensionality reduction technique that transforms features into uncorrelated principal components",
                        "correct": true
                    },
                    {
                        "text": "A feature engineering method",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between bagging and boosting?",
                "opts": [
                    {
                        "text": "Bagging is sequential; boosting is parallel",
                        "correct": false
                    },
                    {
                        "text": "Bagging trains models in parallel independently; boosting trains models sequentially, each correcting previous errors",
                        "correct": true
                    },
                    {
                        "text": "They are identical",
                        "correct": false
                    },
                    {
                        "text": "Boosting uses more models than bagging",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the curse of dimensionality?",
                "opts": [
                    {
                        "text": "Too much training data",
                        "correct": false
                    },
                    {
                        "text": "As dimensions increase, data becomes sparse and distances become meaningless, degrading algorithm performance",
                        "correct": true
                    },
                    {
                        "text": "A GPU memory limitation",
                        "correct": false
                    },
                    {
                        "text": "Overfitting in neural networks",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is stochastic gradient descent (SGD)?",
                "opts": [
                    {
                        "text": "A type of neural network",
                        "correct": false
                    },
                    {
                        "text": "Gradient descent using the entire dataset per update",
                        "correct": false
                    },
                    {
                        "text": "Gradient descent updating parameters using one random training example (or mini-batch) per iteration",
                        "correct": true
                    },
                    {
                        "text": "A clustering algorithm",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between parametric and non-parametric models?",
                "opts": [
                    {
                        "text": "Parametric models are always better",
                        "correct": false
                    },
                    {
                        "text": "Parametric models assume a fixed form with finite parameters; non-parametric models grow with data",
                        "correct": true
                    },
                    {
                        "text": "Non-parametric models are always more accurate",
                        "correct": false
                    },
                    {
                        "text": "They are the same",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is SMOTE used for?",
                "opts": [
                    {
                        "text": "Feature selection",
                        "correct": false
                    },
                    {
                        "text": "Hyperparameter tuning",
                        "correct": false
                    },
                    {
                        "text": "Synthetic Minority Oversampling Technique – generating synthetic examples to handle class imbalance",
                        "correct": true
                    },
                    {
                        "text": "Model compression",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between L1 and L2 regularization?",
                "opts": [
                    {
                        "text": "L1 is stronger than L2",
                        "correct": false
                    },
                    {
                        "text": "L1 (Lasso) produces sparse models by zeroing out features; L2 (Ridge) shrinks all coefficients uniformly",
                        "correct": true
                    },
                    {
                        "text": "L2 produces sparser models",
                        "correct": false
                    },
                    {
                        "text": "They produce identical results",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is k-fold cross-validation?",
                "opts": [
                    {
                        "text": "Splitting data into k equal parts and running k iterations where each part serves as the test set once",
                        "correct": true
                    },
                    {
                        "text": "Using k different models",
                        "correct": false
                    },
                    {
                        "text": "Training on k% of the data",
                        "correct": false
                    },
                    {
                        "text": "Validating k hyperparameters",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is ensemble learning?",
                "opts": [
                    {
                        "text": "Training one powerful model",
                        "correct": false
                    },
                    {
                        "text": "Using a single neural network",
                        "correct": false
                    },
                    {
                        "text": "Combining predictions from multiple models to produce better results than any single model",
                        "correct": true
                    },
                    {
                        "text": "A feature selection strategy",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Shapley value in ML explainability?",
                "opts": [
                    {
                        "text": "A loss function",
                        "correct": false
                    },
                    {
                        "text": "A feature importance metric from game theory that attributes each feature's contribution to a prediction",
                        "correct": true
                    },
                    {
                        "text": "A regularization technique",
                        "correct": false
                    },
                    {
                        "text": "A clustering metric",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is time series analysis?",
                "opts": [
                    {
                        "text": "Analyzing spatial data",
                        "correct": false
                    },
                    {
                        "text": "Statistical analysis of data points collected or recorded at specific time intervals",
                        "correct": true
                    },
                    {
                        "text": "A classification technique",
                        "correct": false
                    },
                    {
                        "text": "A text analysis technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between interpolation and extrapolation?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "Interpolation estimates within the observed data range; extrapolation estimates beyond it",
                        "correct": true
                    },
                    {
                        "text": "Extrapolation is always more accurate",
                        "correct": false
                    },
                    {
                        "text": "Interpolation is only for time series",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a hyperparameter in machine learning?",
                "opts": [
                    {
                        "text": "A parameter learned from training data",
                        "correct": false
                    },
                    {
                        "text": "A configuration value set before training that controls the learning process",
                        "correct": true
                    },
                    {
                        "text": "A feature in the dataset",
                        "correct": false
                    },
                    {
                        "text": "A type of neural network layer",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Gini impurity in decision trees?",
                "opts": [
                    {
                        "text": "A measure of node depth",
                        "correct": false
                    },
                    {
                        "text": "A measure of how often a randomly chosen element would be misclassified if labeled by the node's class distribution",
                        "correct": true
                    },
                    {
                        "text": "A pruning technique",
                        "correct": false
                    },
                    {
                        "text": "A splitting criterion based on information gain",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is transfer learning?",
                "opts": [
                    {
                        "text": "Copying a model from one server to another",
                        "correct": false
                    },
                    {
                        "text": "Using a pre-trained model's knowledge as the starting point for a new task",
                        "correct": true
                    },
                    {
                        "text": "A data augmentation technique",
                        "correct": false
                    },
                    {
                        "text": "Training the same model on multiple datasets",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the silhouette score in clustering?",
                "opts": [
                    {
                        "text": "A measure of cluster colors",
                        "correct": false
                    },
                    {
                        "text": "A metric measuring how similar a point is to its own cluster compared to other clusters",
                        "correct": true
                    },
                    {
                        "text": "A measure of model accuracy",
                        "correct": false
                    },
                    {
                        "text": "A neural network metric",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a pipeline in scikit-learn?",
                "opts": [
                    {
                        "text": "A data pipeline for ETL",
                        "correct": false
                    },
                    {
                        "text": "A sequence of data processing steps and a model chained together to prevent data leakage",
                        "correct": true
                    },
                    {
                        "text": "A visualization tool",
                        "correct": false
                    },
                    {
                        "text": "A hyperparameter tuning method",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is A/B testing?",
                "opts": [
                    {
                        "text": "Testing model A vs. model B offline",
                        "correct": false
                    },
                    {
                        "text": "A controlled experiment comparing two variants to determine which performs better",
                        "correct": true
                    },
                    {
                        "text": "A data cleaning technique",
                        "correct": false
                    },
                    {
                        "text": "A feature selection method",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "nlpAi": {
        "title": "Nlp i",
        "questions": [
            {
                "q": "What does NLP stand for?",
                "opts": [
                    {
                        "text": "Neural Language Processing",
                        "correct": false
                    },
                    {
                        "text": "Natural Language Processing",
                        "correct": true
                    },
                    {
                        "text": "Network Layer Protocol",
                        "correct": false
                    },
                    {
                        "text": "Nested Learning Paradigm",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is tokenization in NLP?",
                "opts": [
                    {
                        "text": "Encrypting text data",
                        "correct": false
                    },
                    {
                        "text": "Splitting text into smaller units (tokens) like words or sentences",
                        "correct": true
                    },
                    {
                        "text": "Removing punctuation",
                        "correct": false
                    },
                    {
                        "text": "Converting text to lowercase",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Large Language Model (LLM)?",
                "opts": [
                    {
                        "text": "A large database",
                        "correct": false
                    },
                    {
                        "text": "A deep learning model trained on massive text data to generate and understand language",
                        "correct": true
                    },
                    {
                        "text": "A cloud computing service",
                        "correct": false
                    },
                    {
                        "text": "A graph neural network",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is machine learning?",
                "opts": [
                    {
                        "text": "Explicitly programming rules for every task",
                        "correct": false
                    },
                    {
                        "text": "A type of AI where systems learn patterns from data without being explicitly programmed",
                        "correct": true
                    },
                    {
                        "text": "A type of database",
                        "correct": false
                    },
                    {
                        "text": "A network protocol",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a neural network?",
                "opts": [
                    {
                        "text": "A computer network",
                        "correct": false
                    },
                    {
                        "text": "A computational model inspired by the brain's structure, with interconnected layers of nodes",
                        "correct": true
                    },
                    {
                        "text": "A database architecture",
                        "correct": false
                    },
                    {
                        "text": "A type of sorting algorithm",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of stop word removal in NLP?",
                "opts": [
                    {
                        "text": "Removing all words",
                        "correct": false
                    },
                    {
                        "text": "Removing common words (the, is, a) that add little meaning to reduce noise",
                        "correct": true
                    },
                    {
                        "text": "Removing punctuation",
                        "correct": false
                    },
                    {
                        "text": "Correcting spelling errors",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is sentiment analysis?",
                "opts": [
                    {
                        "text": "Analyzing financial markets",
                        "correct": false
                    },
                    {
                        "text": "Classifying text as positive, negative, or neutral based on emotional tone",
                        "correct": true
                    },
                    {
                        "text": "Detecting language of text",
                        "correct": false
                    },
                    {
                        "text": "Counting word frequencies",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is deep learning?",
                "opts": [
                    {
                        "text": "Programming deeply nested loops",
                        "correct": false
                    },
                    {
                        "text": "A subset of ML using neural networks with many layers to learn hierarchical representations",
                        "correct": true
                    },
                    {
                        "text": "A database storage technique",
                        "correct": false
                    },
                    {
                        "text": "A type of SQL query",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Transformer architecture?",
                "opts": [
                    {
                        "text": "An image compression algorithm",
                        "correct": false
                    },
                    {
                        "text": "A deep learning architecture using self-attention mechanisms, the foundation of modern LLMs",
                        "correct": true
                    },
                    {
                        "text": "A database design pattern",
                        "correct": false
                    },
                    {
                        "text": "A type of recurrent network",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is an embedding in NLP?",
                "opts": [
                    {
                        "text": "Inserting images in text",
                        "correct": false
                    },
                    {
                        "text": "A dense vector representation of words/tokens in a continuous space capturing semantic meaning",
                        "correct": true
                    },
                    {
                        "text": "A way to store data",
                        "correct": false
                    },
                    {
                        "text": "A type of tokenizer",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of a loss function in machine learning?",
                "opts": [
                    {
                        "text": "To visualize data",
                        "correct": false
                    },
                    {
                        "text": "A mathematical function measuring how wrong the model's predictions are",
                        "correct": true
                    },
                    {
                        "text": "To select features",
                        "correct": false
                    },
                    {
                        "text": "To initialize model weights",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is prompt engineering?",
                "opts": [
                    {
                        "text": "Writing code prompts for IDEs",
                        "correct": false
                    },
                    {
                        "text": "Crafting inputs to guide LLM outputs effectively",
                        "correct": true
                    },
                    {
                        "text": "Optimizing database queries",
                        "correct": false
                    },
                    {
                        "text": "A neural network training technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does GPT stand for?",
                "opts": [
                    {
                        "text": "General Processing Toolkit",
                        "correct": false
                    },
                    {
                        "text": "General Purpose Transformer",
                        "correct": false
                    },
                    {
                        "text": "Generative Pre-trained Transformer",
                        "correct": true
                    },
                    {
                        "text": "Graph Processing Tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is AI bias?",
                "opts": [
                    {
                        "text": "When AI runs slowly",
                        "correct": false
                    },
                    {
                        "text": "When AI systems produce unfair or discriminatory outputs due to biased training data or design choices",
                        "correct": true
                    },
                    {
                        "text": "A type of overfitting",
                        "correct": false
                    },
                    {
                        "text": "An error in the AI code",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is named entity recognition (NER)?",
                "opts": [
                    {
                        "text": "Naming variables in code",
                        "correct": false
                    },
                    {
                        "text": "Identifying and classifying named entities (people, places, organizations) in text",
                        "correct": true
                    },
                    {
                        "text": "Recognizing handwriting",
                        "correct": false
                    },
                    {
                        "text": "A type of image classification",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the attention mechanism in Transformers?",
                "opts": [
                    {
                        "text": "Focusing the model on specific training examples",
                        "correct": false
                    },
                    {
                        "text": "A mechanism that computes weighted relevance scores between all token pairs in a sequence",
                        "correct": true
                    },
                    {
                        "text": "A dropout technique",
                        "correct": false
                    },
                    {
                        "text": "A type of pooling layer",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is fine-tuning an LLM?",
                "opts": [
                    {
                        "text": "Adjusting model architecture",
                        "correct": false
                    },
                    {
                        "text": "Training a pre-trained model further on a specific smaller dataset to adapt it to a new task",
                        "correct": true
                    },
                    {
                        "text": "Compressing the model",
                        "correct": false
                    },
                    {
                        "text": "Changing the tokenizer",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is BERT and how does it differ from GPT?",
                "opts": [
                    {
                        "text": "They are identical",
                        "correct": false
                    },
                    {
                        "text": "BERT uses bidirectional encoding (good for understanding); GPT is unidirectional (good for generation)",
                        "correct": true
                    },
                    {
                        "text": "GPT is bidirectional; BERT is unidirectional",
                        "correct": false
                    },
                    {
                        "text": "BERT is only for images",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is zero-shot learning in LLMs?",
                "opts": [
                    {
                        "text": "Training with no data",
                        "correct": false
                    },
                    {
                        "text": "Performing a task the model was never explicitly trained on using only a natural language description",
                        "correct": true
                    },
                    {
                        "text": "A type of data augmentation",
                        "correct": false
                    },
                    {
                        "text": "Training with zero labels",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is few-shot learning in the context of LLMs?",
                "opts": [
                    {
                        "text": "Training a model with very little data",
                        "correct": false
                    },
                    {
                        "text": "Providing a few examples in the prompt to guide LLM behavior without fine-tuning",
                        "correct": true
                    },
                    {
                        "text": "A type of reinforcement learning",
                        "correct": false
                    },
                    {
                        "text": "Training with fewer epochs",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is retrieval-augmented generation (RAG)?",
                "opts": [
                    {
                        "text": "A type of GAN",
                        "correct": false
                    },
                    {
                        "text": "A pattern combining LLMs with a retrieval system to ground responses in real, up-to-date knowledge",
                        "correct": true
                    },
                    {
                        "text": "A text summarization technique",
                        "correct": false
                    },
                    {
                        "text": "A reinforcement learning method",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a hallucination in LLMs?",
                "opts": [
                    {
                        "text": "Visual processing in AI",
                        "correct": false
                    },
                    {
                        "text": "When an LLM generates confident-sounding but factually incorrect information",
                        "correct": true
                    },
                    {
                        "text": "A data augmentation technique",
                        "correct": false
                    },
                    {
                        "text": "A training data issue",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of temperature in LLM generation?",
                "opts": [
                    {
                        "text": "Hardware cooling",
                        "correct": false
                    },
                    {
                        "text": "A parameter controlling randomness in output – higher temperature = more creative/random, lower = more deterministic",
                        "correct": true
                    },
                    {
                        "text": "A training hyperparameter",
                        "correct": false
                    },
                    {
                        "text": "A measure of model performance",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the TF-IDF score?",
                "opts": [
                    {
                        "text": "A neural network metric",
                        "correct": false
                    },
                    {
                        "text": "Term Frequency-Inverse Document Frequency – a statistical measure of a word's importance in a document relative to a corpus",
                        "correct": true
                    },
                    {
                        "text": "A text generation technique",
                        "correct": false
                    },
                    {
                        "text": "A clustering algorithm",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is word2vec?",
                "opts": [
                    {
                        "text": "A word counting tool",
                        "correct": false
                    },
                    {
                        "text": "A neural network model that learns dense word embeddings from co-occurrence in text",
                        "correct": true
                    },
                    {
                        "text": "A speech recognition model",
                        "correct": false
                    },
                    {
                        "text": "A text classification model",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between NLU and NLG?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "NLU (Understanding) processes language input; NLG (Generation) produces natural language output",
                        "correct": true
                    },
                    {
                        "text": "NLG understands language; NLU generates it",
                        "correct": false
                    },
                    {
                        "text": "NLU is for audio; NLG is for text",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a convolutional neural network (CNN) primarily used for?",
                "opts": [
                    {
                        "text": "Time series forecasting",
                        "correct": false
                    },
                    {
                        "text": "Text generation",
                        "correct": false
                    },
                    {
                        "text": "Image recognition by detecting spatial patterns",
                        "correct": true
                    },
                    {
                        "text": "Audio classification only",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of dropout in neural networks?",
                "opts": [
                    {
                        "text": "Speeding up inference",
                        "correct": false
                    },
                    {
                        "text": "Randomly deactivating neurons during training to prevent overfitting",
                        "correct": true
                    },
                    {
                        "text": "Initializing weights",
                        "correct": false
                    },
                    {
                        "text": "Selecting features",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is reinforcement learning from human feedback (RLHF)?",
                "opts": [
                    {
                        "text": "Training AI to play games",
                        "correct": false
                    },
                    {
                        "text": "A technique to fine-tune LLMs using human preference rankings to align model outputs with human values",
                        "correct": true
                    },
                    {
                        "text": "A data collection method",
                        "correct": false
                    },
                    {
                        "text": "An NLP preprocessing technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a knowledge graph?",
                "opts": [
                    {
                        "text": "A bar chart of knowledge",
                        "correct": false
                    },
                    {
                        "text": "A structured representation of facts and relationships between entities",
                        "correct": true
                    },
                    {
                        "text": "A type of neural network",
                        "correct": false
                    },
                    {
                        "text": "A database index",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the self-attention mechanism in detail?",
                "opts": [
                    {
                        "text": "Attention based on one previous token",
                        "correct": false
                    },
                    {
                        "text": "Each token computing query, key, and value vectors, then computing weighted sums based on dot-product similarities",
                        "correct": true
                    },
                    {
                        "text": "A bidirectional RNN",
                        "correct": false
                    },
                    {
                        "text": "An image attention mechanism",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is RLHF and why was it critical for ChatGPT?",
                "opts": [
                    {
                        "text": "A training technique only for games",
                        "correct": false
                    },
                    {
                        "text": "Reinforcement Learning from Human Feedback – aligning LLM behavior to human preferences to make models safer and more helpful",
                        "correct": true
                    },
                    {
                        "text": "A data augmentation method",
                        "correct": false
                    },
                    {
                        "text": "A fine-tuning technique without human input",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is positional encoding in Transformers?",
                "opts": [
                    {
                        "text": "Encoding the position of training examples",
                        "correct": false
                    },
                    {
                        "text": "Adding information about token positions in the sequence, since Transformers have no inherent sequence awareness",
                        "correct": true
                    },
                    {
                        "text": "A compression technique",
                        "correct": false
                    },
                    {
                        "text": "A dropout variant",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is quantization in LLMs?",
                "opts": [
                    {
                        "text": "Measuring model performance",
                        "correct": false
                    },
                    {
                        "text": "Reducing model precision (e.g., from 32-bit to 4-bit weights) to decrease memory usage and speed up inference",
                        "correct": true
                    },
                    {
                        "text": "Adding more parameters to a model",
                        "correct": false
                    },
                    {
                        "text": "A type of attention mechanism",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is LoRA (Low-Rank Adaptation)?",
                "opts": [
                    {
                        "text": "A learning rate technique",
                        "correct": false
                    },
                    {
                        "text": "A parameter-efficient fine-tuning method that adds trainable low-rank decomposition matrices to frozen model weights",
                        "correct": true
                    },
                    {
                        "text": "A type of attention mechanism",
                        "correct": false
                    },
                    {
                        "text": "A data preprocessing method",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the context window in LLMs?",
                "opts": [
                    {
                        "text": "The browser window showing the LLM",
                        "correct": false
                    },
                    {
                        "text": "The maximum number of tokens an LLM can process in one inference call",
                        "correct": true
                    },
                    {
                        "text": "The training dataset size",
                        "correct": false
                    },
                    {
                        "text": "The number of attention heads",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is constitutional AI?",
                "opts": [
                    {
                        "text": "A US government AI policy",
                        "correct": false
                    },
                    {
                        "text": "A training approach where AI models are trained to be helpful, harmless, and honest using a set of principles (constitution)",
                        "correct": true
                    },
                    {
                        "text": "An AI architecture",
                        "correct": false
                    },
                    {
                        "text": "A fine-tuning dataset",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a mixture of experts (MoE) architecture?",
                "opts": [
                    {
                        "text": "Combining multiple ML frameworks",
                        "correct": false
                    },
                    {
                        "text": "A neural network architecture where different 'expert' sub-networks handle different inputs, with a gating mechanism routing each input",
                        "correct": true
                    },
                    {
                        "text": "An ensemble of separate models",
                        "correct": false
                    },
                    {
                        "text": "A type of multi-head attention",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is chain-of-thought prompting?",
                "opts": [
                    {
                        "text": "Linking multiple prompts together",
                        "correct": false
                    },
                    {
                        "text": "A prompting technique that asks LLMs to show step-by-step reasoning, improving accuracy on complex tasks",
                        "correct": true
                    },
                    {
                        "text": "A fine-tuning method",
                        "correct": false
                    },
                    {
                        "text": "An embedding technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is catastrophic forgetting in neural networks?",
                "opts": [
                    {
                        "text": "Model crashes during training",
                        "correct": false
                    },
                    {
                        "text": "When a neural network forgets previously learned information upon learning new tasks",
                        "correct": true
                    },
                    {
                        "text": "A type of data corruption",
                        "correct": false
                    },
                    {
                        "text": "A network architecture flaw",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a vector database?",
                "opts": [
                    {
                        "text": "A database storing random vectors",
                        "correct": false
                    },
                    {
                        "text": "A database optimized for storing and querying high-dimensional embedding vectors, enabling semantic search",
                        "correct": true
                    },
                    {
                        "text": "A key-value store",
                        "correct": false
                    },
                    {
                        "text": "A graph database",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the vanishing gradient problem?",
                "opts": [
                    {
                        "text": "Gradients increasing too much during training",
                        "correct": false
                    },
                    {
                        "text": "Gradients becoming extremely small as they're backpropagated through many layers, preventing early layers from learning",
                        "correct": true
                    },
                    {
                        "text": "A problem with optimizer selection",
                        "correct": false
                    },
                    {
                        "text": "A data preprocessing issue",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is in-context learning (ICL)?",
                "opts": [
                    {
                        "text": "Learning from training data",
                        "correct": false
                    },
                    {
                        "text": "The ability of LLMs to perform new tasks by conditioning on examples in the prompt without updating model weights",
                        "correct": true
                    },
                    {
                        "text": "A fine-tuning technique",
                        "correct": false
                    },
                    {
                        "text": "An attention mechanism",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is model distillation?",
                "opts": [
                    {
                        "text": "Removing noise from training data",
                        "correct": false
                    },
                    {
                        "text": "Training a smaller 'student' model to mimic the behavior of a larger 'teacher' model",
                        "correct": true
                    },
                    {
                        "text": "Compressing weights through quantization",
                        "correct": false
                    },
                    {
                        "text": "A data augmentation technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is multi-head attention?",
                "opts": [
                    {
                        "text": "Multiple attention layers stacked",
                        "correct": false
                    },
                    {
                        "text": "Running the self-attention mechanism multiple times in parallel with different learned projection matrices",
                        "correct": true
                    },
                    {
                        "text": "Attention applied to multiple inputs",
                        "correct": false
                    },
                    {
                        "text": "A type of multi-task learning",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Retrieval-Augmented Generation (RAG) and when would you use it over fine-tuning?",
                "opts": [
                    {
                        "text": "RAG is always better",
                        "correct": false
                    },
                    {
                        "text": "Use RAG when you need up-to-date or private knowledge at inference time; fine-tune when you need style/behavior changes",
                        "correct": true
                    },
                    {
                        "text": "Fine-tuning is always better",
                        "correct": false
                    },
                    {
                        "text": "They solve the same problem",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is speculative decoding in LLM inference?",
                "opts": [
                    {
                        "text": "A prompt engineering technique",
                        "correct": false
                    },
                    {
                        "text": "A technique using a small draft model to generate multiple candidate tokens, verified in parallel by the large model, speeding up inference",
                        "correct": true
                    },
                    {
                        "text": "A quantization method",
                        "correct": false
                    },
                    {
                        "text": "A fine-tuning approach",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Constitutional AI's RLAIF approach?",
                "opts": [
                    {
                        "text": "Human-only feedback",
                        "correct": false
                    },
                    {
                        "text": "Using AI-generated feedback to rate responses according to a set of principles, replacing human preference labeling",
                        "correct": true
                    },
                    {
                        "text": "A reinforcement learning algorithm",
                        "correct": false
                    },
                    {
                        "text": "A fine-tuning method",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the scaling hypothesis in AI?",
                "opts": [
                    {
                        "text": "Models stop improving after a certain size",
                        "correct": false
                    },
                    {
                        "text": "The empirical observation that model capabilities reliably improve with more parameters, data, and compute",
                        "correct": true
                    },
                    {
                        "text": "A theorem about neural network convergence",
                        "correct": false
                    },
                    {
                        "text": "A hypothesis about AI safety",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is AI alignment?",
                "opts": [
                    {
                        "text": "Aligning AI model weights",
                        "correct": false
                    },
                    {
                        "text": "The challenge of ensuring AI systems behave in accordance with human values and intentions, especially as capabilities increase",
                        "correct": true
                    },
                    {
                        "text": "Calibrating model confidence",
                        "correct": false
                    },
                    {
                        "text": "A fine-tuning technique",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "cloudDevOps": {
        "title": "Cloud ev ps",
        "questions": [
            {
                "q": "What does the `ls` command do in Linux?",
                "opts": [
                    {
                        "text": "Logs out of the system",
                        "correct": false
                    },
                    {
                        "text": "Lists files and directories",
                        "correct": true
                    },
                    {
                        "text": "Loads a script",
                        "correct": false
                    },
                    {
                        "text": "Links files",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Docker?",
                "opts": [
                    {
                        "text": "A cloud provider",
                        "correct": false
                    },
                    {
                        "text": "A containerization platform that packages apps and dependencies",
                        "correct": true
                    },
                    {
                        "text": "A CI/CD tool",
                        "correct": false
                    },
                    {
                        "text": "A Linux distribution",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a container in Docker?",
                "opts": [
                    {
                        "text": "A server rack",
                        "correct": false
                    },
                    {
                        "text": "A running instance of a Docker image",
                        "correct": true
                    },
                    {
                        "text": "A type of virtual machine",
                        "correct": false
                    },
                    {
                        "text": "A cloud storage bucket",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does CI stand for in CI/CD?",
                "opts": [
                    {
                        "text": "Container Integration",
                        "correct": false
                    },
                    {
                        "text": "Continuous Integration – frequently merging code changes and automatically testing them",
                        "correct": true
                    },
                    {
                        "text": "Cloud Infrastructure",
                        "correct": false
                    },
                    {
                        "text": "Code Inspection",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is AWS?",
                "opts": [
                    {
                        "text": "A Linux distribution",
                        "correct": false
                    },
                    {
                        "text": "Amazon Web Services – a comprehensive cloud computing platform",
                        "correct": true
                    },
                    {
                        "text": "An open-source framework",
                        "correct": false
                    },
                    {
                        "text": "A container orchestration tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What command changes directory in Linux?",
                "opts": [
                    {
                        "text": "mv",
                        "correct": false
                    },
                    {
                        "text": "ls",
                        "correct": false
                    },
                    {
                        "text": "cd",
                        "correct": true
                    },
                    {
                        "text": "dir",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Dockerfile?",
                "opts": [
                    {
                        "text": "A Docker configuration file",
                        "correct": false
                    },
                    {
                        "text": "A text file containing instructions to build a Docker image",
                        "correct": true
                    },
                    {
                        "text": "A Docker networking config",
                        "correct": false
                    },
                    {
                        "text": "A container health check",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does `sudo` do in Linux?",
                "opts": [
                    {
                        "text": "Runs a command as the superuser/root",
                        "correct": true
                    },
                    {
                        "text": "Installs packages",
                        "correct": false
                    },
                    {
                        "text": "Shows disk usage",
                        "correct": false
                    },
                    {
                        "text": "Opens a terminal",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is S3 in AWS?",
                "opts": [
                    {
                        "text": "A server computing service",
                        "correct": false
                    },
                    {
                        "text": "Simple Storage Service – scalable object storage",
                        "correct": true
                    },
                    {
                        "text": "A database service",
                        "correct": false
                    },
                    {
                        "text": "A networking service",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of `git pull`?",
                "opts": [
                    {
                        "text": "Pushes code to remote",
                        "correct": false
                    },
                    {
                        "text": "Deletes a branch",
                        "correct": false
                    },
                    {
                        "text": "Fetches and merges changes from the remote repository to local",
                        "correct": true
                    },
                    {
                        "text": "Initializes a repository",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a virtual machine (VM)?",
                "opts": [
                    {
                        "text": "A Docker container",
                        "correct": false
                    },
                    {
                        "text": "An emulation of a physical computer running its own OS within a host machine",
                        "correct": true
                    },
                    {
                        "text": "A cloud database",
                        "correct": false
                    },
                    {
                        "text": "A load balancer",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the `chmod` command do in Linux?",
                "opts": [
                    {
                        "text": "Changes file ownership",
                        "correct": false
                    },
                    {
                        "text": "Changes file or directory permissions",
                        "correct": true
                    },
                    {
                        "text": "Lists running processes",
                        "correct": false
                    },
                    {
                        "text": "Moves files",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a load balancer?",
                "opts": [
                    {
                        "text": "A type of server",
                        "correct": false
                    },
                    {
                        "text": "A device/service that distributes incoming network traffic across multiple servers",
                        "correct": true
                    },
                    {
                        "text": "A database cluster",
                        "correct": false
                    },
                    {
                        "text": "A monitoring tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does CD stand for in CI/CD?",
                "opts": [
                    {
                        "text": "Container Deployment",
                        "correct": false
                    },
                    {
                        "text": "Continuous Delivery/Deployment – automatically delivering/deploying tested code",
                        "correct": true
                    },
                    {
                        "text": "Cloud Distribution",
                        "correct": false
                    },
                    {
                        "text": "Code Distribution",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the `grep` command used for in Linux?",
                "opts": [
                    {
                        "text": "Creating files",
                        "correct": false
                    },
                    {
                        "text": "Searching for patterns within files",
                        "correct": true
                    },
                    {
                        "text": "Moving files",
                        "correct": false
                    },
                    {
                        "text": "Compressing archives",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Kubernetes?",
                "opts": [
                    {
                        "text": "A Docker image",
                        "correct": false
                    },
                    {
                        "text": "A container registry",
                        "correct": false
                    },
                    {
                        "text": "An open-source container orchestration platform for automating deployment, scaling, and management of containers",
                        "correct": true
                    },
                    {
                        "text": "A CI/CD tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Infrastructure as Code (IaC)?",
                "opts": [
                    {
                        "text": "Writing code that connects to infrastructure",
                        "correct": false
                    },
                    {
                        "text": "Managing and provisioning infrastructure through machine-readable config files rather than manual processes",
                        "correct": true
                    },
                    {
                        "text": "A cloud billing tool",
                        "correct": false
                    },
                    {
                        "text": "A monitoring technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Kubernetes Pod?",
                "opts": [
                    {
                        "text": "A Docker image",
                        "correct": false
                    },
                    {
                        "text": "The smallest deployable unit in Kubernetes – one or more containers sharing network and storage",
                        "correct": true
                    },
                    {
                        "text": "A Kubernetes node",
                        "correct": false
                    },
                    {
                        "text": "A cluster configuration",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between a Deployment and a StatefulSet in Kubernetes?",
                "opts": [
                    {
                        "text": "They are identical",
                        "correct": false
                    },
                    {
                        "text": "Deployments manage stateless apps with interchangeable pods; StatefulSets manage stateful apps with stable network identity and storage",
                        "correct": true
                    },
                    {
                        "text": "StatefulSets are for web servers",
                        "correct": false
                    },
                    {
                        "text": "Deployments require persistent storage",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Terraform?",
                "opts": [
                    {
                        "text": "A Linux package manager",
                        "correct": false
                    },
                    {
                        "text": "An open-source IaC tool by HashiCorp for provisioning cloud infrastructure using declarative config files",
                        "correct": true
                    },
                    {
                        "text": "A container runtime",
                        "correct": false
                    },
                    {
                        "text": "A CI/CD platform",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Kubernetes Service?",
                "opts": [
                    {
                        "text": "A pod running a web server",
                        "correct": false
                    },
                    {
                        "text": "An abstraction that exposes a set of pods as a stable network endpoint",
                        "correct": true
                    },
                    {
                        "text": "A configuration file",
                        "correct": false
                    },
                    {
                        "text": "A health check",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of environment variables in containerized applications?",
                "opts": [
                    {
                        "text": "Configuring the host OS",
                        "correct": false
                    },
                    {
                        "text": "Passing configuration values to containers at runtime without hardcoding them in images",
                        "correct": true
                    },
                    {
                        "text": "Speeding up containers",
                        "correct": false
                    },
                    {
                        "text": "Managing container networking",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Kubernetes Ingress?",
                "opts": [
                    {
                        "text": "A pod type",
                        "correct": false
                    },
                    {
                        "text": "A traffic rule object that manages external access to services, typically HTTP routing",
                        "correct": true
                    },
                    {
                        "text": "A storage class",
                        "correct": false
                    },
                    {
                        "text": "A deployment strategy",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a blue-green deployment?",
                "opts": [
                    {
                        "text": "A CSS color strategy",
                        "correct": false
                    },
                    {
                        "text": "A deployment strategy maintaining two identical environments, switching traffic from old (blue) to new (green)",
                        "correct": true
                    },
                    {
                        "text": "A git branching model",
                        "correct": false
                    },
                    {
                        "text": "A monitoring technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is monitoring vs. observability?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "Monitoring tracks predefined metrics; observability is the ability to understand system internal state from external outputs",
                        "correct": true
                    },
                    {
                        "text": "Observability is a subset of monitoring",
                        "correct": false
                    },
                    {
                        "text": "Monitoring requires code changes; observability doesn't",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Docker volume?",
                "opts": [
                    {
                        "text": "Docker's memory allocation",
                        "correct": false
                    },
                    {
                        "text": "A mechanism for persisting data generated by containers, surviving container restarts",
                        "correct": true
                    },
                    {
                        "text": "A container network",
                        "correct": false
                    },
                    {
                        "text": "A Docker image layer",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is AWS EC2?",
                "opts": [
                    {
                        "text": "A storage service",
                        "correct": false
                    },
                    {
                        "text": "Elastic Compute Cloud – virtual server instances in the cloud",
                        "correct": true
                    },
                    {
                        "text": "A database service",
                        "correct": false
                    },
                    {
                        "text": "A CDN service",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between containers and virtual machines?",
                "opts": [
                    {
                        "text": "Containers are always larger",
                        "correct": false
                    },
                    {
                        "text": "Containers share the host OS kernel and are lightweight; VMs run full guest OS and are heavier",
                        "correct": true
                    },
                    {
                        "text": "VMs share the host kernel",
                        "correct": false
                    },
                    {
                        "text": "They are identical",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Prometheus?",
                "opts": [
                    {
                        "text": "A cloud provider",
                        "correct": false
                    },
                    {
                        "text": "An open-source monitoring and alerting system that scrapes metrics from instrumented targets",
                        "correct": true
                    },
                    {
                        "text": "A CI/CD tool",
                        "correct": false
                    },
                    {
                        "text": "A Kubernetes network plugin",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a rolling update in Kubernetes?",
                "opts": [
                    {
                        "text": "Restarting all pods simultaneously",
                        "correct": false
                    },
                    {
                        "text": "Gradually replacing old pod instances with new ones, maintaining availability during updates",
                        "correct": true
                    },
                    {
                        "text": "A backup strategy",
                        "correct": false
                    },
                    {
                        "text": "A database migration technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between Kubernetes Deployments and DaemonSets?",
                "opts": [
                    {
                        "text": "DaemonSets run fewer pods",
                        "correct": false
                    },
                    {
                        "text": "Deployments run a specified number of pod replicas anywhere; DaemonSets run exactly one pod per node",
                        "correct": true
                    },
                    {
                        "text": "DaemonSets don't support updates",
                        "correct": false
                    },
                    {
                        "text": "They are identical",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is GitOps?",
                "opts": [
                    {
                        "text": "Using Git for code only",
                        "correct": false
                    },
                    {
                        "text": "A practice using Git as the single source of truth for declarative infrastructure and applications, with automated sync",
                        "correct": true
                    },
                    {
                        "text": "A CI/CD pipeline",
                        "correct": false
                    },
                    {
                        "text": "A branching strategy",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a service mesh?",
                "opts": [
                    {
                        "text": "A cloud networking service",
                        "correct": false
                    },
                    {
                        "text": "An infrastructure layer handling service-to-service communication with mTLS, load balancing, and observability",
                        "correct": true
                    },
                    {
                        "text": "A Kubernetes node type",
                        "correct": false
                    },
                    {
                        "text": "A Docker networking driver",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is chaos engineering?",
                "opts": [
                    {
                        "text": "Debugging distributed systems",
                        "correct": false
                    },
                    {
                        "text": "Deliberately introducing failures into production systems to test resilience",
                        "correct": true
                    },
                    {
                        "text": "A CI/CD strategy",
                        "correct": false
                    },
                    {
                        "text": "A container networking technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the etcd component in Kubernetes?",
                "opts": [
                    {
                        "text": "A container runtime",
                        "correct": false
                    },
                    {
                        "text": "A distributed key-value store that stores all cluster state and configuration",
                        "correct": true
                    },
                    {
                        "text": "A networking plugin",
                        "correct": false
                    },
                    {
                        "text": "A scheduling component",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is FinOps?",
                "opts": [
                    {
                        "text": "A financial accounting system",
                        "correct": false
                    },
                    {
                        "text": "A practice combining finance and DevOps to maximize cloud value through cost optimization and accountability",
                        "correct": true
                    },
                    {
                        "text": "A cloud security framework",
                        "correct": false
                    },
                    {
                        "text": "A CI/CD methodology",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Kubernetes RBAC?",
                "opts": [
                    {
                        "text": "Remote Backend Access Control",
                        "correct": false
                    },
                    {
                        "text": "Role-Based Access Control – limiting what users and service accounts can do within the cluster",
                        "correct": true
                    },
                    {
                        "text": "A network policy",
                        "correct": false
                    },
                    {
                        "text": "A pod scheduling constraint",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of Kubernetes Horizontal Pod Autoscaler (HPA)?",
                "opts": [
                    {
                        "text": "Adding nodes to the cluster",
                        "correct": false
                    },
                    {
                        "text": "Automatically scaling the number of pods based on CPU/memory metrics or custom metrics",
                        "correct": true
                    },
                    {
                        "text": "Managing database connections",
                        "correct": false
                    },
                    {
                        "text": "Load balancing between pods",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is OpenTelemetry?",
                "opts": [
                    {
                        "text": "A cloud monitoring vendor",
                        "correct": false
                    },
                    {
                        "text": "A vendor-neutral standard and SDK for collecting traces, metrics, and logs from distributed systems",
                        "correct": true
                    },
                    {
                        "text": "A Kubernetes plugin",
                        "correct": false
                    },
                    {
                        "text": "A CI/CD framework",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a canary deployment?",
                "opts": [
                    {
                        "text": "A deployment for canary testing environments",
                        "correct": false
                    },
                    {
                        "text": "Releasing new features to a small percentage of users first to test in production before full rollout",
                        "correct": true
                    },
                    {
                        "text": "A blue-green variant",
                        "correct": false
                    },
                    {
                        "text": "A rollback strategy",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is mTLS (mutual TLS)?",
                "opts": [
                    {
                        "text": "Standard TLS from servers",
                        "correct": false
                    },
                    {
                        "text": "A TLS variant where both client and server authenticate each other with certificates",
                        "correct": true
                    },
                    {
                        "text": "A network compression technique",
                        "correct": false
                    },
                    {
                        "text": "An HTTP/2 feature",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Kubernetes control plane?",
                "opts": [
                    {
                        "text": "The worker nodes",
                        "correct": false
                    },
                    {
                        "text": "The set of components (API server, scheduler, controller manager, etcd) that manage cluster state",
                        "correct": true
                    },
                    {
                        "text": "The pod network",
                        "correct": false
                    },
                    {
                        "text": "The ingress controller",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is AWS Lambda?",
                "opts": [
                    {
                        "text": "A networking service",
                        "correct": false
                    },
                    {
                        "text": "A serverless compute service running code in response to events without provisioning or managing servers",
                        "correct": true
                    },
                    {
                        "text": "A container service",
                        "correct": false
                    },
                    {
                        "text": "A database service",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Helm in Kubernetes?",
                "opts": [
                    {
                        "text": "A security tool",
                        "correct": false
                    },
                    {
                        "text": "A package manager for Kubernetes, using 'charts' to define, install, and manage applications",
                        "correct": true
                    },
                    {
                        "text": "A monitoring dashboard",
                        "correct": false
                    },
                    {
                        "text": "A service mesh",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Kubernetes ConfigMap?",
                "opts": [
                    {
                        "text": "A Docker config file",
                        "correct": false
                    },
                    {
                        "text": "A Kubernetes object storing non-sensitive configuration data as key-value pairs, decoupled from pod specs",
                        "correct": true
                    },
                    {
                        "text": "An environment variable file",
                        "correct": false
                    },
                    {
                        "text": "A Kubernetes secret",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is VPC (Virtual Private Cloud)?",
                "opts": [
                    {
                        "text": "A type of container",
                        "correct": false
                    },
                    {
                        "text": "A logically isolated section of the cloud where you can launch resources in a defined virtual network",
                        "correct": true
                    },
                    {
                        "text": "A Kubernetes namespace",
                        "correct": false
                    },
                    {
                        "text": "A CDN service",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of a Kubernetes Namespace?",
                "opts": [
                    {
                        "text": "A networking isolation layer",
                        "correct": false
                    },
                    {
                        "text": "A virtual cluster within a Kubernetes cluster for resource isolation between teams or environments",
                        "correct": true
                    },
                    {
                        "text": "A pod scheduling policy",
                        "correct": false
                    },
                    {
                        "text": "A storage class",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is container image layer caching and why does it matter?",
                "opts": [
                    {
                        "text": "Storing containers in cache",
                        "correct": false
                    },
                    {
                        "text": "Docker builds images in layers; unchanged layers are cached, dramatically speeding up subsequent builds",
                        "correct": true
                    },
                    {
                        "text": "A runtime optimization",
                        "correct": false
                    },
                    {
                        "text": "A networking feature",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is eBPF in modern cloud-native systems?",
                "opts": [
                    {
                        "text": "A container format",
                        "correct": false
                    },
                    {
                        "text": "A Linux kernel technology allowing safe programs to run in the kernel for networking, security, and observability without kernel modules",
                        "correct": true
                    },
                    {
                        "text": "A Kubernetes networking plugin",
                        "correct": false
                    },
                    {
                        "text": "A service mesh sidecar",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between stateful and stateless applications in Kubernetes?",
                "opts": [
                    {
                        "text": "Stateless apps require more storage",
                        "correct": false
                    },
                    {
                        "text": "Stateless apps don't retain data between requests and scale easily; stateful apps maintain session/data state requiring stable identity and storage",
                        "correct": true
                    },
                    {
                        "text": "Stateful apps are always faster",
                        "correct": false
                    },
                    {
                        "text": "They are identical",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "uiUxDesign": {
        "title": "Ui x esign",
        "questions": [
            {
                "q": "What does UI stand for?",
                "opts": [
                    {
                        "text": "User Interface",
                        "correct": true
                    },
                    {
                        "text": "Universal Interface",
                        "correct": false
                    },
                    {
                        "text": "User Integration",
                        "correct": false
                    },
                    {
                        "text": "Unique Interface",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does UX stand for?",
                "opts": [
                    {
                        "text": "User Experience",
                        "correct": true
                    },
                    {
                        "text": "Universal Exchange",
                        "correct": false
                    },
                    {
                        "text": "User Expression",
                        "correct": false
                    },
                    {
                        "text": "Unique Experience",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a wireframe in UI/UX design?",
                "opts": [
                    {
                        "text": "A color scheme",
                        "correct": false
                    },
                    {
                        "text": "A low-fidelity blueprint showing the structure and layout of an interface without visual design",
                        "correct": true
                    },
                    {
                        "text": "A finished design mockup",
                        "correct": false
                    },
                    {
                        "text": "A prototype with interactions",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a prototype in UX design?",
                "opts": [
                    {
                        "text": "A final product",
                        "correct": false
                    },
                    {
                        "text": "A simulation of a design that demonstrates interaction and flow for testing",
                        "correct": true
                    },
                    {
                        "text": "A design system",
                        "correct": false
                    },
                    {
                        "text": "A color palette",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is user research?",
                "opts": [
                    {
                        "text": "Reading design books",
                        "correct": false
                    },
                    {
                        "text": "Studying competitors' apps",
                        "correct": false
                    },
                    {
                        "text": "Systematically gathering insights about users' needs, behaviors, and pain points",
                        "correct": true
                    },
                    {
                        "text": "Analyzing website analytics only",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of a color palette in UI design?",
                "opts": [
                    {
                        "text": "To make designs colorful",
                        "correct": false
                    },
                    {
                        "text": "To establish a consistent visual language that conveys brand identity and guides user attention",
                        "correct": true
                    },
                    {
                        "text": "To follow trend",
                        "correct": false
                    },
                    {
                        "text": "To differentiate from competitors",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is typography in UI design?",
                "opts": [
                    {
                        "text": "Adding images to designs",
                        "correct": false
                    },
                    {
                        "text": "The art of arranging text — fonts, sizes, spacing — to make it readable and visually appealing",
                        "correct": true
                    },
                    {
                        "text": "A type of animation",
                        "correct": false
                    },
                    {
                        "text": "A grid system",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a CTA (Call to Action)?",
                "opts": [
                    {
                        "text": "A navigation menu",
                        "correct": false
                    },
                    {
                        "text": "A button or design element that prompts users to take a specific action",
                        "correct": true
                    },
                    {
                        "text": "A page header",
                        "correct": false
                    },
                    {
                        "text": "An error message",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is white space (negative space) in design?",
                "opts": [
                    {
                        "text": "Empty background only",
                        "correct": false
                    },
                    {
                        "text": "The empty space between design elements that improves readability and visual clarity",
                        "correct": true
                    },
                    {
                        "text": "A type of color",
                        "correct": false
                    },
                    {
                        "text": "Unused screen space that should be filled",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a design system?",
                "opts": [
                    {
                        "text": "A collection of design tools",
                        "correct": false
                    },
                    {
                        "text": "A set of reusable components, guidelines, and standards ensuring design consistency across a product",
                        "correct": true
                    },
                    {
                        "text": "A UI framework like Bootstrap",
                        "correct": false
                    },
                    {
                        "text": "A type of prototype",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is usability in UX?",
                "opts": [
                    {
                        "text": "The visual beauty of a product",
                        "correct": false
                    },
                    {
                        "text": "The degree to which a product can be used effectively, efficiently, and satisfactorily by specified users",
                        "correct": true
                    },
                    {
                        "text": "The technical performance of a system",
                        "correct": false
                    },
                    {
                        "text": "The color choices in a design",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a persona in UX design?",
                "opts": [
                    {
                        "text": "A user account",
                        "correct": false
                    },
                    {
                        "text": "A fictional character representing a key user segment, based on user research",
                        "correct": true
                    },
                    {
                        "text": "A type of user interface",
                        "correct": false
                    },
                    {
                        "text": "A design template",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Figma?",
                "opts": [
                    {
                        "text": "A CSS framework",
                        "correct": false
                    },
                    {
                        "text": "A cloud-based collaborative UI design tool",
                        "correct": true
                    },
                    {
                        "text": "A project management tool",
                        "correct": false
                    },
                    {
                        "text": "A frontend framework",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is visual hierarchy in UI design?",
                "opts": [
                    {
                        "text": "The order of design tools",
                        "correct": false
                    },
                    {
                        "text": "Organizing elements to guide users' attention in order of importance",
                        "correct": true
                    },
                    {
                        "text": "A color theory concept",
                        "correct": false
                    },
                    {
                        "text": "A grid layout",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is accessibility in UI/UX design?",
                "opts": [
                    {
                        "text": "Designing only for mobile",
                        "correct": false
                    },
                    {
                        "text": "Ensuring products can be used by people with varying disabilities and needs",
                        "correct": true
                    },
                    {
                        "text": "Making designs free to access",
                        "correct": false
                    },
                    {
                        "text": "Designing for international audiences",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Gestalt principles' relevance to UI design?",
                "opts": [
                    {
                        "text": "A color theory",
                        "correct": false
                    },
                    {
                        "text": "A set of principles describing how humans perceive visual elements as unified wholes (proximity, similarity, closure, etc.)",
                        "correct": true
                    },
                    {
                        "text": "A typography rule",
                        "correct": false
                    },
                    {
                        "text": "A grid system",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Fitts' Law and its application in UI?",
                "opts": [
                    {
                        "text": "A color contrast rule",
                        "correct": false
                    },
                    {
                        "text": "The time to acquire a target is a function of distance to and size of the target – larger, closer elements are easier to click",
                        "correct": true
                    },
                    {
                        "text": "A typography scale",
                        "correct": false
                    },
                    {
                        "text": "A mobile design rule",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a user journey map?",
                "opts": [
                    {
                        "text": "A website sitemap",
                        "correct": false
                    },
                    {
                        "text": "A visual representation of a user's experience across all touchpoints with a product or service over time",
                        "correct": true
                    },
                    {
                        "text": "A navigation menu design",
                        "correct": false
                    },
                    {
                        "text": "A user flow diagram",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is information architecture (IA)?",
                "opts": [
                    {
                        "text": "Software architecture",
                        "correct": false
                    },
                    {
                        "text": "The structural design of information spaces to support usability and findability",
                        "correct": true
                    },
                    {
                        "text": "A visual design system",
                        "correct": false
                    },
                    {
                        "text": "A content management system",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between UX and UI design?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "UX focuses on overall experience, research, and flow; UI focuses on visual design and interactive elements",
                        "correct": true
                    },
                    {
                        "text": "UI is more important than UX",
                        "correct": false
                    },
                    {
                        "text": "UX only applies to mobile apps",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is WCAG and what are its compliance levels?",
                "opts": [
                    {
                        "text": "A design tool",
                        "correct": false
                    },
                    {
                        "text": "Web Content Accessibility Guidelines – with three compliance levels: A (minimum), AA (standard), AAA (enhanced)",
                        "correct": true
                    },
                    {
                        "text": "A color system",
                        "correct": false
                    },
                    {
                        "text": "A UI framework",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a usability test?",
                "opts": [
                    {
                        "text": "A software quality test",
                        "correct": false
                    },
                    {
                        "text": "Observing real users attempting tasks with a product to identify usability problems",
                        "correct": true
                    },
                    {
                        "text": "A design review session",
                        "correct": false
                    },
                    {
                        "text": "An A/B test",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of heatmaps in UX research?",
                "opts": [
                    {
                        "text": "Color palette testing",
                        "correct": false
                    },
                    {
                        "text": "Visualizing where users click, move, and scroll on a page to understand behavior",
                        "correct": true
                    },
                    {
                        "text": "Thermal imaging for devices",
                        "correct": false
                    },
                    {
                        "text": "A/B testing visual designs",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a grid system in UI design?",
                "opts": [
                    {
                        "text": "A CSS Grid layout",
                        "correct": false
                    },
                    {
                        "text": "A framework of columns and gutters providing structure and alignment for design elements",
                        "correct": true
                    },
                    {
                        "text": "A table design pattern",
                        "correct": false
                    },
                    {
                        "text": "A responsive breakpoint",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the 60-30-10 color rule in design?",
                "opts": [
                    {
                        "text": "60% primary color, 30% secondary, 10% accent",
                        "correct": true
                    },
                    {
                        "text": "60% white space, 30% content, 10% color",
                        "correct": false
                    },
                    {
                        "text": "60% text, 30% images, 10% buttons",
                        "correct": false
                    },
                    {
                        "text": "60% background, 30% text, 10% links",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is progressive disclosure in UX?",
                "opts": [
                    {
                        "text": "Showing all features upfront",
                        "correct": false
                    },
                    {
                        "text": "A technique presenting information incrementally, showing only what's necessary at each step to reduce cognitive load",
                        "correct": true
                    },
                    {
                        "text": "A loading animation",
                        "correct": false
                    },
                    {
                        "text": "A onboarding flow",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a design sprint?",
                "opts": [
                    {
                        "text": "A 5-day process for rapidly solving design problems and testing ideas",
                        "correct": true
                    },
                    {
                        "text": "A CSS animation framework",
                        "correct": false
                    },
                    {
                        "text": "A rapid coding session",
                        "correct": false
                    },
                    {
                        "text": "A project management methodology",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between low-fidelity and high-fidelity prototypes?",
                "opts": [
                    {
                        "text": "High-fidelity is always better",
                        "correct": false
                    },
                    {
                        "text": "Low-fidelity (wireframes) are quick, rough, and focus on structure; high-fidelity are polished, detailed, and visually complete",
                        "correct": true
                    },
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "Low-fidelity is for developers only",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is affinity mapping in UX research?",
                "opts": [
                    {
                        "text": "A color matching technique",
                        "correct": false
                    },
                    {
                        "text": "Organizing qualitative research data into categories to identify patterns and themes",
                        "correct": true
                    },
                    {
                        "text": "A user segmentation method",
                        "correct": false
                    },
                    {
                        "text": "A typography technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a design pattern in UI?",
                "opts": [
                    {
                        "text": "A visual color pattern",
                        "correct": false
                    },
                    {
                        "text": "A reusable solution to a commonly occurring design problem",
                        "correct": true
                    },
                    {
                        "text": "A code template",
                        "correct": false
                    },
                    {
                        "text": "A CSS framework",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Double Diamond design process?",
                "opts": [
                    {
                        "text": "A jewelry design method",
                        "correct": false
                    },
                    {
                        "text": "A four-phase design framework: Discover, Define, Develop, Deliver – diverging and converging thinking at each stage",
                        "correct": true
                    },
                    {
                        "text": "A color mixing process",
                        "correct": false
                    },
                    {
                        "text": "A Figma plugin",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a mental model in UX design?",
                "opts": [
                    {
                        "text": "A cognitive science term",
                        "correct": false
                    },
                    {
                        "text": "A user's internal representation of how a system works, which should align with the actual system behavior",
                        "correct": true
                    },
                    {
                        "text": "A design pattern",
                        "correct": false
                    },
                    {
                        "text": "A research method",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the HEART framework for UX metrics?",
                "opts": [
                    {
                        "text": "A design principle",
                        "correct": false
                    },
                    {
                        "text": "Happiness, Engagement, Adoption, Retention, Task Success – a Google framework for measuring UX quality",
                        "correct": true
                    },
                    {
                        "text": "An accessibility standard",
                        "correct": false
                    },
                    {
                        "text": "A research method",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is experience design (XD) vs. UX design?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "XD encompasses all touchpoints of a brand experience (physical, digital, service); UX focuses on digital product interactions",
                        "correct": true
                    },
                    {
                        "text": "XD is only for Adobe",
                        "correct": false
                    },
                    {
                        "text": "UX is broader than XD",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is motion design and its role in UX?",
                "opts": [
                    {
                        "text": "Video production",
                        "correct": false
                    },
                    {
                        "text": "Using animation and transitions purposefully to improve feedback, guide attention, and enhance delight",
                        "correct": true
                    },
                    {
                        "text": "A CSS technique",
                        "correct": false
                    },
                    {
                        "text": "A type of illustration",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Jobs-to-be-Done (JTBD) framework?",
                "opts": [
                    {
                        "text": "A project management framework",
                        "correct": false
                    },
                    {
                        "text": "A framework focusing on the 'job' users hire a product to do, rather than demographics or personas",
                        "correct": true
                    },
                    {
                        "text": "An agile methodology",
                        "correct": false
                    },
                    {
                        "text": "A design pattern",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is cognitive load in UX design?",
                "opts": [
                    {
                        "text": "The processing power required by the app",
                        "correct": false
                    },
                    {
                        "text": "The mental effort required by users to understand and interact with an interface",
                        "correct": true
                    },
                    {
                        "text": "A measure of visual complexity",
                        "correct": false
                    },
                    {
                        "text": "The number of UI elements",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is service design?",
                "opts": [
                    {
                        "text": "UI design for services",
                        "correct": false
                    },
                    {
                        "text": "Holistically designing services from end to end, including all touchpoints, people, and processes that deliver value",
                        "correct": true
                    },
                    {
                        "text": "Backend architecture design",
                        "correct": false
                    },
                    {
                        "text": "A UX research method",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a design token?",
                "opts": [
                    {
                        "text": "A password for design tools",
                        "correct": false
                    },
                    {
                        "text": "A named variable storing design decisions (colors, spacing, typography) enabling consistent design across platforms",
                        "correct": true
                    },
                    {
                        "text": "A UI component",
                        "correct": false
                    },
                    {
                        "text": "A Figma feature",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between quantitative and qualitative UX research?",
                "opts": [
                    {
                        "text": "Quantitative is better",
                        "correct": false
                    },
                    {
                        "text": "Quantitative gives numerical data (what/how many); qualitative gives contextual understanding (why/how)",
                        "correct": true
                    },
                    {
                        "text": "Qualitative is more accurate",
                        "correct": false
                    },
                    {
                        "text": "They are the same",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the AIDA model in UX/marketing?",
                "opts": [
                    {
                        "text": "A design tool",
                        "correct": false
                    },
                    {
                        "text": "Attention, Interest, Desire, Action – a model describing user's cognitive stages toward a conversion",
                        "correct": true
                    },
                    {
                        "text": "An accessibility framework",
                        "correct": false
                    },
                    {
                        "text": "A research method",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is ethnographic research in UX?",
                "opts": [
                    {
                        "text": "Statistical user surveys",
                        "correct": false
                    },
                    {
                        "text": "Observing users in their natural environment to understand real-world context and behavior",
                        "correct": true
                    },
                    {
                        "text": "Remote usability testing",
                        "correct": false
                    },
                    {
                        "text": "A/B testing",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is participatory design?",
                "opts": [
                    {
                        "text": "A design competition",
                        "correct": false
                    },
                    {
                        "text": "A design approach involving users as active co-designers rather than just subjects of research",
                        "correct": true
                    },
                    {
                        "text": "A team retrospective",
                        "correct": false
                    },
                    {
                        "text": "A design sprint variant",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Fogg Behavior Model in UX?",
                "opts": [
                    {
                        "text": "A color theory",
                        "correct": false
                    },
                    {
                        "text": "A model stating behavior = motivation × ability × prompt, used to design persuasive systems",
                        "correct": true
                    },
                    {
                        "text": "A typography scale",
                        "correct": false
                    },
                    {
                        "text": "A grid system",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is inclusive design?",
                "opts": [
                    {
                        "text": "Designing for all screen sizes",
                        "correct": false
                    },
                    {
                        "text": "A design philosophy that creates solutions accessible to the widest range of people regardless of ability, age, or circumstance",
                        "correct": true
                    },
                    {
                        "text": "A government mandate",
                        "correct": false
                    },
                    {
                        "text": "A design framework for emerging markets",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is system thinking in UX design?",
                "opts": [
                    {
                        "text": "Designing operating systems",
                        "correct": false
                    },
                    {
                        "text": "Understanding and designing for the complex interconnections between users, touchpoints, contexts, and business systems",
                        "correct": true
                    },
                    {
                        "text": "A design sprint technique",
                        "correct": false
                    },
                    {
                        "text": "A wireframing method",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the SUS (System Usability Scale)?",
                "opts": [
                    {
                        "text": "A design rating system",
                        "correct": false
                    },
                    {
                        "text": "A 10-item questionnaire providing a quick, reliable measure of perceived usability",
                        "correct": true
                    },
                    {
                        "text": "A color accessibility standard",
                        "correct": false
                    },
                    {
                        "text": "A design pattern library",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is content strategy in UX?",
                "opts": [
                    {
                        "text": "Writing marketing copy",
                        "correct": false
                    },
                    {
                        "text": "Planning, creating, organizing, and governing content so it delivers the right information to users at the right time",
                        "correct": true
                    },
                    {
                        "text": "A navigation design pattern",
                        "correct": false
                    },
                    {
                        "text": "A social media strategy",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the concept of dark patterns in UX?",
                "opts": [
                    {
                        "text": "Dark mode UI designs",
                        "correct": false
                    },
                    {
                        "text": "Deceptive design practices that trick users into unintended actions (e.g., hidden subscriptions, hard-to-cancel buttons)",
                        "correct": true
                    },
                    {
                        "text": "A dark color theme guideline",
                        "correct": false
                    },
                    {
                        "text": "A security design pattern",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is desire path in UX?",
                "opts": [
                    {
                        "text": "A user goal",
                        "correct": false
                    },
                    {
                        "text": "A path users naturally take (often ignoring the designed path), revealing how they actually want to interact",
                        "correct": true
                    },
                    {
                        "text": "A navigation pattern",
                        "correct": false
                    },
                    {
                        "text": "A color flow",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "mobileDevelopment": {
        "title": "Mobile evelopment",
        "questions": [
            {
                "q": "What is Flutter?",
                "opts": [
                    {
                        "text": "An Android-only framework",
                        "correct": false
                    },
                    {
                        "text": "Google's open-source UI toolkit for building natively compiled apps for mobile, web, and desktop from a single codebase",
                        "correct": true
                    },
                    {
                        "text": "An iOS-only framework",
                        "correct": false
                    },
                    {
                        "text": "A backend framework",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What programming language does Flutter use?",
                "opts": [
                    {
                        "text": "JavaScript",
                        "correct": false
                    },
                    {
                        "text": "Kotlin",
                        "correct": false
                    },
                    {
                        "text": "Swift",
                        "correct": false
                    },
                    {
                        "text": "Dart",
                        "correct": true
                    }
                ]
            },
            {
                "q": "What is React Native?",
                "opts": [
                    {
                        "text": "A React web framework",
                        "correct": false
                    },
                    {
                        "text": "A JavaScript framework for building native mobile apps using React components",
                        "correct": true
                    },
                    {
                        "text": "A Flutter competitor for web",
                        "correct": false
                    },
                    {
                        "text": "An iOS-only framework",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What language is used for native Android development?",
                "opts": [
                    {
                        "text": "Swift",
                        "correct": false
                    },
                    {
                        "text": "Kotlin or Java",
                        "correct": true
                    },
                    {
                        "text": "Dart",
                        "correct": false
                    },
                    {
                        "text": "JavaScript",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What language is used for native iOS development?",
                "opts": [
                    {
                        "text": "Kotlin",
                        "correct": false
                    },
                    {
                        "text": "JavaScript",
                        "correct": false
                    },
                    {
                        "text": "Swift or Objective-C",
                        "correct": true
                    },
                    {
                        "text": "Dart",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is APK in Android development?",
                "opts": [
                    {
                        "text": "Apple Package Kit",
                        "correct": false
                    },
                    {
                        "text": "Android Package Kit – the file format for installing Android apps",
                        "correct": true
                    },
                    {
                        "text": "Application Protocol Key",
                        "correct": false
                    },
                    {
                        "text": "A testing tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the iOS App Store used for?",
                "opts": [
                    {
                        "text": "Downloading Android apps",
                        "correct": false
                    },
                    {
                        "text": "Apple's distribution platform for iOS, iPadOS, macOS, and watchOS applications",
                        "correct": true
                    },
                    {
                        "text": "A development tool",
                        "correct": false
                    },
                    {
                        "text": "A testing service",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a Widget in Flutter?",
                "opts": [
                    {
                        "text": "A screen only",
                        "correct": false
                    },
                    {
                        "text": "Everything in Flutter – the fundamental building block of the UI, from structural elements to styling",
                        "correct": true
                    },
                    {
                        "text": "A backend service",
                        "correct": false
                    },
                    {
                        "text": "A state manager",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a mobile-first design approach?",
                "opts": [
                    {
                        "text": "Designing for desktop first",
                        "correct": false
                    },
                    {
                        "text": "Designing for mobile screen sizes first, then scaling up to larger screens",
                        "correct": true
                    },
                    {
                        "text": "Only building mobile apps",
                        "correct": false
                    },
                    {
                        "text": "A React Native design pattern",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does SDK stand for in mobile development?",
                "opts": [
                    {
                        "text": "Software Design Kit",
                        "correct": false
                    },
                    {
                        "text": "Software Development Kit – tools and libraries for building apps on a specific platform",
                        "correct": true
                    },
                    {
                        "text": "System Developer Kit",
                        "correct": false
                    },
                    {
                        "text": "Standard Design Kernel",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Xcode?",
                "opts": [
                    {
                        "text": "A cross-platform IDE",
                        "correct": false
                    },
                    {
                        "text": "Apple's integrated development environment for macOS and iOS app development",
                        "correct": true
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
                "q": "What is Android Studio?",
                "opts": [
                    {
                        "text": "A graphic design tool",
                        "correct": false
                    },
                    {
                        "text": "The official IDE for Android app development, based on IntelliJ IDEA",
                        "correct": true
                    },
                    {
                        "text": "A testing platform",
                        "correct": false
                    },
                    {
                        "text": "A cloud service",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is push notification?",
                "opts": [
                    {
                        "text": "A gesture interaction",
                        "correct": false
                    },
                    {
                        "text": "A message sent from a server to a user's device that appears even when the app isn't open",
                        "correct": true
                    },
                    {
                        "text": "A form of in-app messaging",
                        "correct": false
                    },
                    {
                        "text": "A network request",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Expo in React Native development?",
                "opts": [
                    {
                        "text": "A testing library",
                        "correct": false
                    },
                    {
                        "text": "A framework and platform built around React Native that simplifies setup, development, and deployment",
                        "correct": true
                    },
                    {
                        "text": "An iOS simulator",
                        "correct": false
                    },
                    {
                        "text": "A backend service",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a native app vs. a hybrid app?",
                "opts": [
                    {
                        "text": "There is no difference",
                        "correct": false
                    },
                    {
                        "text": "Native apps are built for one platform using platform languages; hybrid apps use web technologies wrapped in a native shell",
                        "correct": true
                    },
                    {
                        "text": "Hybrid apps are always faster",
                        "correct": false
                    },
                    {
                        "text": "Native apps work on all platforms",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Flutter's StatelessWidget vs. StatefulWidget?",
                "opts": [
                    {
                        "text": "They are identical",
                        "correct": false
                    },
                    {
                        "text": "StatelessWidget displays static, unchanging UI; StatefulWidget manages mutable state that can trigger UI rebuilds",
                        "correct": true
                    },
                    {
                        "text": "StatefulWidget is always faster",
                        "correct": false
                    },
                    {
                        "text": "StatelessWidget cannot display images",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is state management in mobile apps?",
                "opts": [
                    {
                        "text": "Managing app settings",
                        "correct": false
                    },
                    {
                        "text": "How an app stores, manages, and shares data that can change over time across the widget/component tree",
                        "correct": true
                    },
                    {
                        "text": "Database management",
                        "correct": false
                    },
                    {
                        "text": "Network request handling",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is AsyncStorage in React Native?",
                "opts": [
                    {
                        "text": "A network caching system",
                        "correct": false
                    },
                    {
                        "text": "An unencrypted, asynchronous, persistent key-value storage system for React Native",
                        "correct": true
                    },
                    {
                        "text": "A state management library",
                        "correct": false
                    },
                    {
                        "text": "An image caching solution",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between async and sync operations in mobile development?",
                "opts": [
                    {
                        "text": "Async operations are always faster",
                        "correct": false
                    },
                    {
                        "text": "Sync operations block the UI thread; async operations run in the background without freezing the UI",
                        "correct": true
                    },
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "Sync is preferred for network calls",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is deep linking in mobile apps?",
                "opts": [
                    {
                        "text": "An app loading optimization",
                        "correct": false
                    },
                    {
                        "text": "A technique allowing apps to be opened to specific content via URLs (web or custom scheme)",
                        "correct": true
                    },
                    {
                        "text": "A push notification feature",
                        "correct": false
                    },
                    {
                        "text": "A navigation pattern",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the BLoC pattern in Flutter?",
                "opts": [
                    {
                        "text": "A build lifecycle pattern",
                        "correct": false
                    },
                    {
                        "text": "Business Logic Component – separating business logic from UI using streams",
                        "correct": true
                    },
                    {
                        "text": "A database access pattern",
                        "correct": false
                    },
                    {
                        "text": "A widget composition pattern",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is biometric authentication in mobile apps?",
                "opts": [
                    {
                        "text": "A face detection feature",
                        "correct": false
                    },
                    {
                        "text": "Using device biometrics (fingerprint, Face ID) to authenticate users",
                        "correct": true
                    },
                    {
                        "text": "A password strength meter",
                        "correct": false
                    },
                    {
                        "text": "A device security check",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is over-the-air (OTA) update in mobile development?",
                "opts": [
                    {
                        "text": "A cloud backup",
                        "correct": false
                    },
                    {
                        "text": "Pushing JavaScript/asset updates to users without going through the App Store review process",
                        "correct": true
                    },
                    {
                        "text": "A push notification",
                        "correct": false
                    },
                    {
                        "text": "A streaming feature",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between foreground and background services on Android?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "Foreground services show a persistent notification and have higher priority; background services run without user notice but may be killed",
                        "correct": true
                    },
                    {
                        "text": "Foreground services run faster",
                        "correct": false
                    },
                    {
                        "text": "Background services are always killed",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Jetpack Compose?",
                "opts": [
                    {
                        "text": "A React Native alternative",
                        "correct": false
                    },
                    {
                        "text": "Android's modern declarative UI toolkit for building native UIs using Kotlin",
                        "correct": true
                    },
                    {
                        "text": "A testing framework",
                        "correct": false
                    },
                    {
                        "text": "A navigation library",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is SwiftUI?",
                "opts": [
                    {
                        "text": "A CSS framework",
                        "correct": false
                    },
                    {
                        "text": "Apple's declarative framework for building UIs across all Apple platforms using Swift",
                        "correct": true
                    },
                    {
                        "text": "An animation library",
                        "correct": false
                    },
                    {
                        "text": "A testing tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of the Keychain on iOS?",
                "opts": [
                    {
                        "text": "Storing app preferences",
                        "correct": false
                    },
                    {
                        "text": "A secure, encrypted storage for sensitive data like passwords and tokens on iOS",
                        "correct": true
                    },
                    {
                        "text": "A biometric authentication system",
                        "correct": false
                    },
                    {
                        "text": "A network caching system",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is App Store Optimization (ASO)?",
                "opts": [
                    {
                        "text": "Speeding up app performance",
                        "correct": false
                    },
                    {
                        "text": "Optimizing app store listings (title, keywords, screenshots) to improve visibility and downloads",
                        "correct": true
                    },
                    {
                        "text": "App security optimization",
                        "correct": false
                    },
                    {
                        "text": "A testing technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between portrait and landscape orientation in mobile UI?",
                "opts": [
                    {
                        "text": "Portrait is taller; landscape is wider",
                        "correct": true
                    },
                    {
                        "text": "They are identical",
                        "correct": false
                    },
                    {
                        "text": "Landscape is for tablets only",
                        "correct": false
                    },
                    {
                        "text": "Portrait requires different APIs",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a gesture detector in mobile development?",
                "opts": [
                    {
                        "text": "A motion sensor",
                        "correct": false
                    },
                    {
                        "text": "A component that detects and responds to touch gestures (tap, swipe, pinch, long press)",
                        "correct": true
                    },
                    {
                        "text": "A hardware accelerometer",
                        "correct": false
                    },
                    {
                        "text": "A biometric sensor",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between React Native's bridge and JSI?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "The bridge serialized JSON between JS and native asynchronously; JSI (JavaScript Interface) allows direct, synchronous communication",
                        "correct": true
                    },
                    {
                        "text": "JSI is slower than the bridge",
                        "correct": false
                    },
                    {
                        "text": "The bridge is newer than JSI",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Flutter's rendering pipeline?",
                "opts": [
                    {
                        "text": "Flutter uses native platform widgets",
                        "correct": false
                    },
                    {
                        "text": "Flutter uses its own rendering engine (Skia/Impeller) to draw every pixel, bypassing platform UI completely",
                        "correct": true
                    },
                    {
                        "text": "Flutter compiles to web assembly",
                        "correct": false
                    },
                    {
                        "text": "Flutter uses HTML canvas",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is memory management in iOS (ARC)?",
                "opts": [
                    {
                        "text": "Manual garbage collection",
                        "correct": false
                    },
                    {
                        "text": "Automatic Reference Counting – the compiler automatically inserts retain/release calls to manage object lifetime",
                        "correct": true
                    },
                    {
                        "text": "A memory profiling tool",
                        "correct": false
                    },
                    {
                        "text": "A testing framework",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Kotlin Coroutines?",
                "opts": [
                    {
                        "text": "Background threads in Kotlin",
                        "correct": false
                    },
                    {
                        "text": "Kotlin's solution for asynchronous programming using suspending functions that don't block threads",
                        "correct": true
                    },
                    {
                        "text": "A testing library",
                        "correct": false
                    },
                    {
                        "text": "A UI component",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Model-View-ViewModel (MVVM) pattern in mobile?",
                "opts": [
                    {
                        "text": "A database architecture",
                        "correct": false
                    },
                    {
                        "text": "An architecture separating View (UI), ViewModel (state and logic), and Model (data), with reactive data binding",
                        "correct": true
                    },
                    {
                        "text": "A networking pattern",
                        "correct": false
                    },
                    {
                        "text": "A testing strategy",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is App Thinning on iOS?",
                "opts": [
                    {
                        "text": "Reducing app icon sizes",
                        "correct": false
                    },
                    {
                        "text": "Apple's process of delivering app variants optimized for specific devices, reducing download size via slicing, bitcode, and on-demand resources",
                        "correct": true
                    },
                    {
                        "text": "A code optimization technique",
                        "correct": false
                    },
                    {
                        "text": "An app permission system",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between cold start and warm start in mobile apps?",
                "opts": [
                    {
                        "text": "Temperature-based loading",
                        "correct": false
                    },
                    {
                        "text": "Cold start: app process doesn't exist, maximum initialization required. Warm start: app process exists in background, faster resume.",
                        "correct": true
                    },
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "Cold start is always faster",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is ProGuard/R8 in Android?",
                "opts": [
                    {
                        "text": "A testing tool",
                        "correct": false
                    },
                    {
                        "text": "A code shrinker, obfuscator, and optimizer that reduces APK size and makes reverse engineering harder",
                        "correct": true
                    },
                    {
                        "text": "A build tool",
                        "correct": false
                    },
                    {
                        "text": "A dependency manager",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of Hermes in React Native?",
                "opts": [
                    {
                        "text": "A testing framework",
                        "correct": false
                    },
                    {
                        "text": "A JavaScript engine optimized for React Native, improving startup time and reducing memory usage",
                        "correct": true
                    },
                    {
                        "text": "A navigation library",
                        "correct": false
                    },
                    {
                        "text": "A state manager",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is accessibility in mobile development?",
                "opts": [
                    {
                        "text": "Supporting multiple languages",
                        "correct": false
                    },
                    {
                        "text": "Building apps usable by people with visual, auditory, motor, or cognitive disabilities using platform accessibility APIs",
                        "correct": true
                    },
                    {
                        "text": "Making apps work on all devices",
                        "correct": false
                    },
                    {
                        "text": "Network accessibility",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between implicit and explicit intents in Android?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "Explicit intents target a specific component; implicit intents declare an action and let the system find appropriate components",
                        "correct": true
                    },
                    {
                        "text": "Implicit intents are faster",
                        "correct": false
                    },
                    {
                        "text": "Explicit intents work across apps",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Android Fragment?",
                "opts": [
                    {
                        "text": "A widget",
                        "correct": false
                    },
                    {
                        "text": "A reusable portion of UI with its own lifecycle, hosted within an Activity",
                        "correct": true
                    },
                    {
                        "text": "A background service",
                        "correct": false
                    },
                    {
                        "text": "A database unit",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Riverpod in Flutter?",
                "opts": [
                    {
                        "text": "A networking library",
                        "correct": false
                    },
                    {
                        "text": "A reactive state management library that improves on Provider with compile-time safety and no context requirement",
                        "correct": true
                    },
                    {
                        "text": "An animation library",
                        "correct": false
                    },
                    {
                        "text": "A UI component library",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between SharedPreferences (Android) and UserDefaults (iOS)?",
                "opts": [
                    {
                        "text": "They are the same API",
                        "correct": false
                    },
                    {
                        "text": "Both are platform-specific key-value stores for persisting small amounts of simple data",
                        "correct": true
                    },
                    {
                        "text": "SharedPreferences is encrypted; UserDefaults is not",
                        "correct": false
                    },
                    {
                        "text": "UserDefaults supports complex objects; SharedPreferences doesn't",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of the runOnUiThread method in Android?",
                "opts": [
                    {
                        "text": "Starting a background service",
                        "correct": false
                    },
                    {
                        "text": "Running a code block on the main UI thread from a background thread, required for all UI updates",
                        "correct": true
                    },
                    {
                        "text": "Creating a new thread",
                        "correct": false
                    },
                    {
                        "text": "Canceling a background task",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of unit testing in mobile development?",
                "opts": [
                    {
                        "text": "Testing the full app manually",
                        "correct": false
                    },
                    {
                        "text": "Testing individual functions and classes in isolation to verify correctness",
                        "correct": true
                    },
                    {
                        "text": "UI interaction testing",
                        "correct": false
                    },
                    {
                        "text": "Performance testing",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Firebase and its key services for mobile?",
                "opts": [
                    {
                        "text": "A CSS framework",
                        "correct": false
                    },
                    {
                        "text": "Google's BaaS platform providing authentication, real-time database, Firestore, analytics, and crash reporting for mobile apps",
                        "correct": true
                    },
                    {
                        "text": "A testing platform",
                        "correct": false
                    },
                    {
                        "text": "A React Native library",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is code signing in iOS development?",
                "opts": [
                    {
                        "text": "Adding code comments",
                        "correct": false
                    },
                    {
                        "text": "Cryptographically signing app binaries to prove they come from a known developer and haven't been tampered with",
                        "correct": true
                    },
                    {
                        "text": "Code minification",
                        "correct": false
                    },
                    {
                        "text": "A version control process",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of Fastlane in mobile development?",
                "opts": [
                    {
                        "text": "A React Native library",
                        "correct": false
                    },
                    {
                        "text": "An automation tool for mobile deployment – automating screenshots, code signing, and app store releases",
                        "correct": true
                    },
                    {
                        "text": "A testing framework",
                        "correct": false
                    },
                    {
                        "text": "A navigation library",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between SQLite and Realm in mobile databases?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "SQLite is a SQL-based relational database; Realm is an object database designed specifically for mobile with reactive data",
                        "correct": true
                    },
                    {
                        "text": "Realm uses SQL",
                        "correct": false
                    },
                    {
                        "text": "SQLite is faster for all use cases",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "cybersecurity": {
        "title": "Cybersecurity",
        "questions": [
            {
                "q": "What is cybersecurity?",
                "opts": [
                    {
                        "text": "Building firewalls only",
                        "correct": false
                    },
                    {
                        "text": "The practice of protecting systems, networks, and programs from digital attacks",
                        "correct": true
                    },
                    {
                        "text": "Network monitoring only",
                        "correct": false
                    },
                    {
                        "text": "Physical security of servers",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does OWASP stand for?",
                "opts": [
                    {
                        "text": "Open Web Application Security Project",
                        "correct": true
                    },
                    {
                        "text": "Open World Access Security Platform",
                        "correct": false
                    },
                    {
                        "text": "Online Web Application Standard Project",
                        "correct": false
                    },
                    {
                        "text": "Operational Web API Security Protocol",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is phishing?",
                "opts": [
                    {
                        "text": "A network scanning technique",
                        "correct": false
                    },
                    {
                        "text": "A social engineering attack that tricks users into revealing sensitive information via deceptive emails or websites",
                        "correct": true
                    },
                    {
                        "text": "A type of malware",
                        "correct": false
                    },
                    {
                        "text": "A password cracking method",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is malware?",
                "opts": [
                    {
                        "text": "Malfunctioning hardware",
                        "correct": false
                    },
                    {
                        "text": "Malicious software designed to damage, disrupt, or gain unauthorized access to systems",
                        "correct": true
                    },
                    {
                        "text": "A network protocol",
                        "correct": false
                    },
                    {
                        "text": "An encryption algorithm",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a firewall?",
                "opts": [
                    {
                        "text": "A physical security barrier",
                        "correct": false
                    },
                    {
                        "text": "A network security device that monitors and filters network traffic based on security rules",
                        "correct": true
                    },
                    {
                        "text": "An antivirus program",
                        "correct": false
                    },
                    {
                        "text": "An encryption tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a strong password?",
                "opts": [
                    {
                        "text": "Any password over 6 characters",
                        "correct": false
                    },
                    {
                        "text": "A password with minimum 12 characters including uppercase, lowercase, numbers, and symbols",
                        "correct": true
                    },
                    {
                        "text": "Your name followed by numbers",
                        "correct": false
                    },
                    {
                        "text": "A password written on paper",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is two-factor authentication (2FA)?",
                "opts": [
                    {
                        "text": "Having two passwords",
                        "correct": false
                    },
                    {
                        "text": "A security layer requiring a second verification factor (OTP, hardware key) in addition to a password",
                        "correct": true
                    },
                    {
                        "text": "Logging in from two devices",
                        "correct": false
                    },
                    {
                        "text": "Two-step email confirmation",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is encryption?",
                "opts": [
                    {
                        "text": "Compressing data",
                        "correct": false
                    },
                    {
                        "text": "Converting data into an unreadable format that can only be decoded with the correct key",
                        "correct": true
                    },
                    {
                        "text": "Backing up data",
                        "correct": false
                    },
                    {
                        "text": "Deleting sensitive files",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a VPN?",
                "opts": [
                    {
                        "text": "A type of virus",
                        "correct": false
                    },
                    {
                        "text": "Virtual Private Network – encrypts internet traffic and masks IP address by routing through a secure server",
                        "correct": true
                    },
                    {
                        "text": "A network monitoring tool",
                        "correct": false
                    },
                    {
                        "text": "A firewall variant",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is social engineering in cybersecurity?",
                "opts": [
                    {
                        "text": "Building social media apps",
                        "correct": false
                    },
                    {
                        "text": "Manipulating people into revealing confidential information or performing actions through psychological deception",
                        "correct": true
                    },
                    {
                        "text": "Writing social media bots",
                        "correct": false
                    },
                    {
                        "text": "Network social protocol",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does HTTP stand for?",
                "opts": [
                    {
                        "text": "Hypertext Transfer Protocol",
                        "correct": true
                    },
                    {
                        "text": "Hypertext Transfer Privacy",
                        "correct": false
                    },
                    {
                        "text": "High Transfer Text Protocol",
                        "correct": false
                    },
                    {
                        "text": "Host Transfer Text Protocol",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is ransomware?",
                "opts": [
                    {
                        "text": "Software that speeds up computers",
                        "correct": false
                    },
                    {
                        "text": "Malware that encrypts victim files and demands payment for the decryption key",
                        "correct": true
                    },
                    {
                        "text": "A type of phishing",
                        "correct": false
                    },
                    {
                        "text": "Network monitoring software",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the principle of least privilege?",
                "opts": [
                    {
                        "text": "Giving all users admin rights",
                        "correct": false
                    },
                    {
                        "text": "Granting users only the minimum access permissions required to perform their job functions",
                        "correct": true
                    },
                    {
                        "text": "Limiting password length",
                        "correct": false
                    },
                    {
                        "text": "Blocking all internet access",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a DDoS attack?",
                "opts": [
                    {
                        "text": "Direct Database Operation",
                        "correct": false
                    },
                    {
                        "text": "Distributed Denial of Service – overwhelming a target with traffic from multiple sources to make it unavailable",
                        "correct": true
                    },
                    {
                        "text": "A data theft attack",
                        "correct": false
                    },
                    {
                        "text": "A phishing variant",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a security vulnerability?",
                "opts": [
                    {
                        "text": "A bug in the code",
                        "correct": false
                    },
                    {
                        "text": "A weakness in a system that can be exploited by attackers to compromise security",
                        "correct": true
                    },
                    {
                        "text": "A network configuration",
                        "correct": false
                    },
                    {
                        "text": "A password requirement",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is SQL injection?",
                "opts": [
                    {
                        "text": "A fast SQL query technique",
                        "correct": false
                    },
                    {
                        "text": "An attack where malicious SQL code is inserted via user input to manipulate database queries",
                        "correct": true
                    },
                    {
                        "text": "A database optimization",
                        "correct": false
                    },
                    {
                        "text": "A SQL JOIN type",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Cross-Site Scripting (XSS)?",
                "opts": [
                    {
                        "text": "Cross-server communication",
                        "correct": false
                    },
                    {
                        "text": "An attack where malicious scripts are injected into web pages viewed by other users",
                        "correct": true
                    },
                    {
                        "text": "A CSS styling technique",
                        "correct": false
                    },
                    {
                        "text": "A cross-origin request",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is CSRF (Cross-Site Request Forgery)?",
                "opts": [
                    {
                        "text": "A type of XSS attack",
                        "correct": false
                    },
                    {
                        "text": "An attack tricking authenticated users into unknowingly executing unauthorized actions",
                        "correct": true
                    },
                    {
                        "text": "A network attack",
                        "correct": false
                    },
                    {
                        "text": "A SQL injection variant",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the OWASP Top 10?",
                "opts": [
                    {
                        "text": "A top 10 security tools list",
                        "correct": false
                    },
                    {
                        "text": "A regularly updated list of the 10 most critical web application security risks",
                        "correct": true
                    },
                    {
                        "text": "A security certification",
                        "correct": false
                    },
                    {
                        "text": "A network monitoring standard",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is penetration testing?",
                "opts": [
                    {
                        "text": "Testing network speed",
                        "correct": false
                    },
                    {
                        "text": "Authorized simulated cyberattacks to evaluate security posture and find vulnerabilities",
                        "correct": true
                    },
                    {
                        "text": "Physical security testing",
                        "correct": false
                    },
                    {
                        "text": "Code performance testing",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a zero-day vulnerability?",
                "opts": [
                    {
                        "text": "A bug fixed in zero days",
                        "correct": false
                    },
                    {
                        "text": "A vulnerability unknown to the vendor/developer, with no existing patch",
                        "correct": true
                    },
                    {
                        "text": "A very old vulnerability",
                        "correct": false
                    },
                    {
                        "text": "A network configuration error",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is TLS and its purpose?",
                "opts": [
                    {
                        "text": "Text Level Security",
                        "correct": false
                    },
                    {
                        "text": "Transport Layer Security – a cryptographic protocol securing communications over networks, the successor to SSL",
                        "correct": true
                    },
                    {
                        "text": "Token Level Security",
                        "correct": false
                    },
                    {
                        "text": "A network routing protocol",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a man-in-the-middle (MITM) attack?",
                "opts": [
                    {
                        "text": "A rogue admin account",
                        "correct": false
                    },
                    {
                        "text": "An attack where a malicious actor intercepts communication between two parties without their knowledge",
                        "correct": true
                    },
                    {
                        "text": "A DDoS variant",
                        "correct": false
                    },
                    {
                        "text": "A phishing attack",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is password hashing?",
                "opts": [
                    {
                        "text": "Encrypting passwords reversibly",
                        "correct": false
                    },
                    {
                        "text": "One-way transformation of passwords into a fixed-length digest, making the original password unrecoverable",
                        "correct": true
                    },
                    {
                        "text": "Storing passwords in plaintext",
                        "correct": false
                    },
                    {
                        "text": "Compressing passwords",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is network segmentation?",
                "opts": [
                    {
                        "text": "Splitting network cables",
                        "correct": false
                    },
                    {
                        "text": "Dividing a network into isolated segments to limit lateral movement and contain breaches",
                        "correct": true
                    },
                    {
                        "text": "Monitoring network traffic",
                        "correct": false
                    },
                    {
                        "text": "Configuring firewalls",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a security audit?",
                "opts": [
                    {
                        "text": "Reviewing design patterns",
                        "correct": false
                    },
                    {
                        "text": "A systematic evaluation of an organization's security posture against standards and policies",
                        "correct": true
                    },
                    {
                        "text": "A penetration test",
                        "correct": false
                    },
                    {
                        "text": "A code review",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between symmetric and asymmetric encryption?",
                "opts": [
                    {
                        "text": "Symmetric is newer",
                        "correct": false
                    },
                    {
                        "text": "Symmetric uses one shared key; asymmetric uses a key pair (public/private)",
                        "correct": true
                    },
                    {
                        "text": "Asymmetric is faster for large data",
                        "correct": false
                    },
                    {
                        "text": "They are the same",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a certificate authority (CA)?",
                "opts": [
                    {
                        "text": "A government security agency",
                        "correct": false
                    },
                    {
                        "text": "A trusted entity that issues digital certificates verifying the identity of websites and organizations",
                        "correct": true
                    },
                    {
                        "text": "A firewall vendor",
                        "correct": false
                    },
                    {
                        "text": "A password manager",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is input validation and why is it important?",
                "opts": [
                    {
                        "text": "Validating user form aesthetics",
                        "correct": false
                    },
                    {
                        "text": "Verifying that all user input meets expected format, type, and range before processing, preventing injection attacks",
                        "correct": true
                    },
                    {
                        "text": "Testing UI inputs",
                        "correct": false
                    },
                    {
                        "text": "A performance optimization",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is an intrusion detection system (IDS)?",
                "opts": [
                    {
                        "text": "A firewall variant",
                        "correct": false
                    },
                    {
                        "text": "A system monitoring network/system activity for malicious activity or policy violations and generating alerts",
                        "correct": true
                    },
                    {
                        "text": "A password manager",
                        "correct": false
                    },
                    {
                        "text": "An encryption tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the kill chain in cybersecurity?",
                "opts": [
                    {
                        "text": "A network attack type",
                        "correct": false
                    },
                    {
                        "text": "A model describing the phases of a cyberattack: Reconnaissance→Weaponization→Delivery→Exploitation→Installation→C2→Actions",
                        "correct": true
                    },
                    {
                        "text": "A security audit framework",
                        "correct": false
                    },
                    {
                        "text": "A malware classification",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is threat modeling?",
                "opts": [
                    {
                        "text": "Creating security personas",
                        "correct": false
                    },
                    {
                        "text": "A structured process for identifying, prioritizing, and mitigating potential threats to a system",
                        "correct": true
                    },
                    {
                        "text": "Penetration testing",
                        "correct": false
                    },
                    {
                        "text": "Security code review",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the MITRE ATT&CK framework?",
                "opts": [
                    {
                        "text": "A government cybersecurity standard",
                        "correct": false
                    },
                    {
                        "text": "A globally-accessible knowledge base of adversary tactics, techniques, and procedures based on real-world observations",
                        "correct": true
                    },
                    {
                        "text": "A penetration testing tool",
                        "correct": false
                    },
                    {
                        "text": "A network monitoring standard",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is privilege escalation?",
                "opts": [
                    {
                        "text": "Getting a promotion",
                        "correct": false
                    },
                    {
                        "text": "An attack where a user gains higher permissions than intended, allowing access to restricted resources",
                        "correct": true
                    },
                    {
                        "text": "A network attack",
                        "correct": false
                    },
                    {
                        "text": "A type of injection",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a botnet?",
                "opts": [
                    {
                        "text": "A network of bots for testing",
                        "correct": false
                    },
                    {
                        "text": "A network of compromised computers controlled by an attacker, used for DDoS, spam, and credential stuffing",
                        "correct": true
                    },
                    {
                        "text": "A security monitoring tool",
                        "correct": false
                    },
                    {
                        "text": "A network protocol",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is defense in depth?",
                "opts": [
                    {
                        "text": "A single strong firewall",
                        "correct": false
                    },
                    {
                        "text": "A security strategy implementing multiple layers of defense so that if one fails, others still protect",
                        "correct": true
                    },
                    {
                        "text": "Physical security only",
                        "correct": false
                    },
                    {
                        "text": "A network monitoring approach",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is fuzzing in security testing?",
                "opts": [
                    {
                        "text": "Blurring sensitive data",
                        "correct": false
                    },
                    {
                        "text": "Automated testing that sends invalid, unexpected, or random data to find bugs and vulnerabilities",
                        "correct": true
                    },
                    {
                        "text": "A network attack simulation",
                        "correct": false
                    },
                    {
                        "text": "A cryptographic technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is PKI (Public Key Infrastructure)?",
                "opts": [
                    {
                        "text": "A network protocol",
                        "correct": false
                    },
                    {
                        "text": "A system of digital certificates, CAs, and cryptographic processes enabling secure electronic communication",
                        "correct": true
                    },
                    {
                        "text": "A firewall architecture",
                        "correct": false
                    },
                    {
                        "text": "A password management system",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a supply chain attack?",
                "opts": [
                    {
                        "text": "An attack on logistics systems",
                        "correct": false
                    },
                    {
                        "text": "Compromising a third-party software or hardware component to reach the ultimate target through trusted channels",
                        "correct": true
                    },
                    {
                        "text": "A phishing attack",
                        "correct": false
                    },
                    {
                        "text": "A DDoS variant",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is SIEM?",
                "opts": [
                    {
                        "text": "A firewall type",
                        "correct": false
                    },
                    {
                        "text": "Security Information and Event Management – collecting, correlating, and analyzing security logs for threat detection",
                        "correct": true
                    },
                    {
                        "text": "A network monitoring protocol",
                        "correct": false
                    },
                    {
                        "text": "A penetration testing framework",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between a red team and a blue team?",
                "opts": [
                    {
                        "text": "Different compliance frameworks",
                        "correct": false
                    },
                    {
                        "text": "Red team simulates attackers; blue team defends and detects. Purple teams combine both for collaborative improvement.",
                        "correct": true
                    },
                    {
                        "text": "Red team handles compliance; blue team handles networking",
                        "correct": false
                    },
                    {
                        "text": "They use different programming languages",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is lateral movement in a cyberattack?",
                "opts": [
                    {
                        "text": "Moving servers physically",
                        "correct": false
                    },
                    {
                        "text": "An attacker's technique of pivoting through a network after initial compromise to reach valuable targets",
                        "correct": true
                    },
                    {
                        "text": "A network routing technique",
                        "correct": false
                    },
                    {
                        "text": "A type of DDoS",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a honeypot in cybersecurity?",
                "opts": [
                    {
                        "text": "A vulnerable database",
                        "correct": false
                    },
                    {
                        "text": "A decoy system designed to attract attackers, detect intrusions, and study attack techniques",
                        "correct": true
                    },
                    {
                        "text": "A firewall rule",
                        "correct": false
                    },
                    {
                        "text": "A security audit tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is container security?",
                "opts": [
                    {
                        "text": "Physical server security",
                        "correct": false
                    },
                    {
                        "text": "Securing containerized workloads by scanning images, enforcing least privilege, and isolating containers",
                        "correct": true
                    },
                    {
                        "text": "Docker performance tuning",
                        "correct": false
                    },
                    {
                        "text": "A Kubernetes feature",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of a security operations center (SOC)?",
                "opts": [
                    {
                        "text": "A physical server room",
                        "correct": false
                    },
                    {
                        "text": "A dedicated team and facility for monitoring, detecting, and responding to security incidents 24/7",
                        "correct": true
                    },
                    {
                        "text": "A compliance department",
                        "correct": false
                    },
                    {
                        "text": "A penetration testing team",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is broken access control (OWASP #1)?",
                "opts": [
                    {
                        "text": "A broken URL",
                        "correct": false
                    },
                    {
                        "text": "Failures enforcing what authenticated users are allowed to do, leading to unauthorized data access or actions",
                        "correct": true
                    },
                    {
                        "text": "A password policy failure",
                        "correct": false
                    },
                    {
                        "text": "A network misconfiguration",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is cryptographic agility?",
                "opts": [
                    {
                        "text": "Fast encryption",
                        "correct": false
                    },
                    {
                        "text": "Designing systems to easily switch cryptographic algorithms when vulnerabilities are discovered",
                        "correct": true
                    },
                    {
                        "text": "A quantum computing defense",
                        "correct": false
                    },
                    {
                        "text": "An encryption standard",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is SSRF (Server-Side Request Forgery)?",
                "opts": [
                    {
                        "text": "A client-side attack",
                        "correct": false
                    },
                    {
                        "text": "An attack where an attacker can cause the server to make requests to unintended locations, bypassing firewalls",
                        "correct": true
                    },
                    {
                        "text": "A type of XSS",
                        "correct": false
                    },
                    {
                        "text": "A SQL injection variant",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the concept of security by design?",
                "opts": [
                    {
                        "text": "Making secure-looking UIs",
                        "correct": false
                    },
                    {
                        "text": "Integrating security requirements and best practices from the earliest stages of design and architecture, not as an afterthought",
                        "correct": true
                    },
                    {
                        "text": "Compliance auditing",
                        "correct": false
                    },
                    {
                        "text": "Security-focused code review",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is certificate pinning?",
                "opts": [
                    {
                        "text": "Pinning physical certificates",
                        "correct": false
                    },
                    {
                        "text": "A technique associating a host with its expected certificate or public key, preventing MITM with rogue certificates",
                        "correct": true
                    },
                    {
                        "text": "An SSL configuration",
                        "correct": false
                    },
                    {
                        "text": "A CA policy",
                        "correct": false
                    }
                ]
            }
        ]
    },
    "dataAnalytics": {
        "title": "Data nalytics",
        "questions": [
            {
                "q": "What is data analytics?",
                "opts": [
                    {
                        "text": "Storing large datasets",
                        "correct": false
                    },
                    {
                        "text": "The process of examining data to draw conclusions, identify patterns, and support decision-making",
                        "correct": true
                    },
                    {
                        "text": "Programming databases",
                        "correct": false
                    },
                    {
                        "text": "Creating data visualizations only",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a KPI?",
                "opts": [
                    {
                        "text": "Knowledge Process Integration",
                        "correct": false
                    },
                    {
                        "text": "Key Performance Indicator – a measurable value demonstrating how effectively a company achieves business objectives",
                        "correct": true
                    },
                    {
                        "text": "Kernel Process Index",
                        "correct": false
                    },
                    {
                        "text": "Key Productivity Index",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Microsoft Excel primarily used for?",
                "opts": [
                    {
                        "text": "Web development",
                        "correct": false
                    },
                    {
                        "text": "Spreadsheet data organization, analysis, and visualization",
                        "correct": true
                    },
                    {
                        "text": "Video editing",
                        "correct": false
                    },
                    {
                        "text": "Database management",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a pivot table in Excel?",
                "opts": [
                    {
                        "text": "A special Excel theme",
                        "correct": false
                    },
                    {
                        "text": "An interactive table that summarizes and aggregates large datasets for analysis",
                        "correct": true
                    },
                    {
                        "text": "A chart type",
                        "correct": false
                    },
                    {
                        "text": "A formula function",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is SQL used for in data analytics?",
                "opts": [
                    {
                        "text": "Building websites",
                        "correct": false
                    },
                    {
                        "text": "Querying and manipulating data stored in relational databases",
                        "correct": true
                    },
                    {
                        "text": "Machine learning",
                        "correct": false
                    },
                    {
                        "text": "Data visualization",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is data visualization?",
                "opts": [
                    {
                        "text": "Visualizing code",
                        "correct": false
                    },
                    {
                        "text": "Representing data graphically (charts, graphs, maps) to make patterns and trends easier to understand",
                        "correct": true
                    },
                    {
                        "text": "A data cleaning step",
                        "correct": false
                    },
                    {
                        "text": "A database design technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Tableau?",
                "opts": [
                    {
                        "text": "A programming language",
                        "correct": false
                    },
                    {
                        "text": "A leading business intelligence and data visualization tool",
                        "correct": true
                    },
                    {
                        "text": "A SQL database",
                        "correct": false
                    },
                    {
                        "text": "A cloud service",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is Power BI?",
                "opts": [
                    {
                        "text": "A Python library",
                        "correct": false
                    },
                    {
                        "text": "Microsoft's business analytics service for creating interactive reports and dashboards",
                        "correct": true
                    },
                    {
                        "text": "An Excel plugin only",
                        "correct": false
                    },
                    {
                        "text": "A database system",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What does the SQL GROUP BY clause do?",
                "opts": [
                    {
                        "text": "Sorts query results",
                        "correct": false
                    },
                    {
                        "text": "Groups rows that share values in specified columns for aggregate functions",
                        "correct": true
                    },
                    {
                        "text": "Filters query results",
                        "correct": false
                    },
                    {
                        "text": "Joins multiple tables",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a bar chart best used for?",
                "opts": [
                    {
                        "text": "Showing trends over time",
                        "correct": false
                    },
                    {
                        "text": "Comparing categorical data across different groups",
                        "correct": true
                    },
                    {
                        "text": "Showing proportions of a whole",
                        "correct": false
                    },
                    {
                        "text": "Displaying geographic data",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between data and information?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "Data is raw, unprocessed facts; information is processed, contextualized data that conveys meaning",
                        "correct": true
                    },
                    {
                        "text": "Information is larger than data",
                        "correct": false
                    },
                    {
                        "text": "Data is always numbers",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is descriptive analytics?",
                "opts": [
                    {
                        "text": "Predicting future events",
                        "correct": false
                    },
                    {
                        "text": "Analyzing historical data to understand what happened in the past",
                        "correct": true
                    },
                    {
                        "text": "Recommending actions",
                        "correct": false
                    },
                    {
                        "text": "Finding root causes",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is data cleaning?",
                "opts": [
                    {
                        "text": "Erasing data",
                        "correct": false
                    },
                    {
                        "text": "The process of detecting and correcting inaccurate, incomplete, or irrelevant data",
                        "correct": true
                    },
                    {
                        "text": "Sorting data alphabetically",
                        "correct": false
                    },
                    {
                        "text": "Archiving old data",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a line chart best suited for?",
                "opts": [
                    {
                        "text": "Comparing categories",
                        "correct": false
                    },
                    {
                        "text": "Showing trends and changes over time",
                        "correct": true
                    },
                    {
                        "text": "Displaying proportions",
                        "correct": false
                    },
                    {
                        "text": "Plotting correlations",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is an ETL process?",
                "opts": [
                    {
                        "text": "Encoding Text Language",
                        "correct": false
                    },
                    {
                        "text": "Extract, Transform, Load – a data integration process moving data from source systems to a data warehouse",
                        "correct": true
                    },
                    {
                        "text": "Edit, Transform, Link",
                        "correct": false
                    },
                    {
                        "text": "Extract, Test, Load",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a data warehouse?",
                "opts": [
                    {
                        "text": "Physical storage for servers",
                        "correct": false
                    },
                    {
                        "text": "A centralized repository of integrated data from multiple sources, optimized for reporting and analysis",
                        "correct": true
                    },
                    {
                        "text": "A database for one application",
                        "correct": false
                    },
                    {
                        "text": "A cloud backup service",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between OLTP and OLAP?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "OLTP handles transactional operations (many small reads/writes); OLAP handles analytical queries (complex reads over large data)",
                        "correct": true
                    },
                    {
                        "text": "OLAP is faster for all queries",
                        "correct": false
                    },
                    {
                        "text": "OLTP is only for databases",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a star schema in data warehousing?",
                "opts": [
                    {
                        "text": "A network topology",
                        "correct": false
                    },
                    {
                        "text": "A data warehouse schema with a central fact table connected to dimension tables, resembling a star shape",
                        "correct": true
                    },
                    {
                        "text": "A visualization pattern",
                        "correct": false
                    },
                    {
                        "text": "A database index type",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a data lake?",
                "opts": [
                    {
                        "text": "A data backup system",
                        "correct": false
                    },
                    {
                        "text": "A centralized repository storing structured and unstructured data at any scale in its raw format",
                        "correct": true
                    },
                    {
                        "text": "A type of database",
                        "correct": false
                    },
                    {
                        "text": "A data cleaning tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is DAX in Power BI?",
                "opts": [
                    {
                        "text": "A database language",
                        "correct": false
                    },
                    {
                        "text": "Data Analysis Expressions – a formula language used in Power BI, Excel Power Pivot, and SSAS for calculations",
                        "correct": true
                    },
                    {
                        "text": "A type of visualization",
                        "correct": false
                    },
                    {
                        "text": "A data connection protocol",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a cohort analysis?",
                "opts": [
                    {
                        "text": "A type of cluster analysis",
                        "correct": false
                    },
                    {
                        "text": "Analyzing behavior of groups of users who share a common characteristic (e.g., acquisition date) over time",
                        "correct": true
                    },
                    {
                        "text": "A survey analysis method",
                        "correct": false
                    },
                    {
                        "text": "A regression technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between a metric and a dimension in analytics?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "A dimension is a categorical attribute (Product, Region); a metric is a numerical measurement (Revenue, Count)",
                        "correct": true
                    },
                    {
                        "text": "Metrics are always percentages",
                        "correct": false
                    },
                    {
                        "text": "Dimensions are always time-based",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is data normalization in databases?",
                "opts": [
                    {
                        "text": "Scaling numeric values",
                        "correct": false
                    },
                    {
                        "text": "Organizing data to reduce redundancy by decomposing tables into related smaller tables",
                        "correct": true
                    },
                    {
                        "text": "Removing outliers",
                        "correct": false
                    },
                    {
                        "text": "Encrypting data",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a scatter plot used for?",
                "opts": [
                    {
                        "text": "Showing trends over time",
                        "correct": false
                    },
                    {
                        "text": "Showing the relationship and correlation between two numerical variables",
                        "correct": true
                    },
                    {
                        "text": "Comparing categorical data",
                        "correct": false
                    },
                    {
                        "text": "Displaying proportions",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is data aggregation?",
                "opts": [
                    {
                        "text": "Deleting duplicate data",
                        "correct": false
                    },
                    {
                        "text": "Combining data from multiple sources or summarizing data to a higher level of granularity",
                        "correct": true
                    },
                    {
                        "text": "Sorting data",
                        "correct": false
                    },
                    {
                        "text": "Visualizing data",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the purpose of VLOOKUP in Excel?",
                "opts": [
                    {
                        "text": "Creating charts",
                        "correct": false
                    },
                    {
                        "text": "Looking up a value in the first column of a table and returning a value in the same row from another column",
                        "correct": true
                    },
                    {
                        "text": "Filtering data",
                        "correct": false
                    },
                    {
                        "text": "Sorting data",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is predictive analytics?",
                "opts": [
                    {
                        "text": "Analyzing what happened",
                        "correct": false
                    },
                    {
                        "text": "Using statistical models and machine learning to forecast future events and trends",
                        "correct": true
                    },
                    {
                        "text": "Recommending specific actions",
                        "correct": false
                    },
                    {
                        "text": "Analyzing root causes",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a heatmap in data visualization?",
                "opts": [
                    {
                        "text": "A geographic map",
                        "correct": false
                    },
                    {
                        "text": "A matrix visualization using color to represent values, showing patterns across two dimensions",
                        "correct": true
                    },
                    {
                        "text": "A chart showing page load times",
                        "correct": false
                    },
                    {
                        "text": "A network diagram",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is data governance?",
                "opts": [
                    {
                        "text": "Government regulations on data",
                        "correct": false
                    },
                    {
                        "text": "The overall management of availability, usability, integrity, and security of enterprise data",
                        "correct": true
                    },
                    {
                        "text": "A data cleaning process",
                        "correct": false
                    },
                    {
                        "text": "A database design principle",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between structured and unstructured data?",
                "opts": [
                    {
                        "text": "Structured is larger",
                        "correct": false
                    },
                    {
                        "text": "Structured data has predefined format in tables; unstructured lacks predefined format (text, images, video)",
                        "correct": true
                    },
                    {
                        "text": "Unstructured is always better",
                        "correct": false
                    },
                    {
                        "text": "They require the same storage",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Kimball methodology in data warehousing?",
                "opts": [
                    {
                        "text": "A network design methodology",
                        "correct": false
                    },
                    {
                        "text": "A bottom-up approach to data warehouse design using dimensional modeling (star/snowflake schemas)",
                        "correct": true
                    },
                    {
                        "text": "A data cleaning framework",
                        "correct": false
                    },
                    {
                        "text": "A SQL optimization technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is slowly changing dimension (SCD) in data warehousing?",
                "opts": [
                    {
                        "text": "A slowly loading data table",
                        "correct": false
                    },
                    {
                        "text": "A technique for managing historical changes to dimension attribute values over time",
                        "correct": true
                    },
                    {
                        "text": "A data compression method",
                        "correct": false
                    },
                    {
                        "text": "A SQL query optimization",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between data mesh and data lake architectures?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "Data mesh is a decentralized approach where domain teams own and serve their data as products; data lake is centralized",
                        "correct": true
                    },
                    {
                        "text": "Data lake is newer than data mesh",
                        "correct": false
                    },
                    {
                        "text": "Data mesh requires NoSQL only",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is a time series database?",
                "opts": [
                    {
                        "text": "A database storing dates",
                        "correct": false
                    },
                    {
                        "text": "A database optimized for time-stamped data with efficient time-range queries and aggregations",
                        "correct": true
                    },
                    {
                        "text": "A relational database with timestamps",
                        "correct": false
                    },
                    {
                        "text": "A data lake",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is dbt (data build tool)?",
                "opts": [
                    {
                        "text": "A database testing tool",
                        "correct": false
                    },
                    {
                        "text": "A transformation framework that enables analysts to write modular SQL SELECT statements that compile into transformation jobs",
                        "correct": true
                    },
                    {
                        "text": "A data backup tool",
                        "correct": false
                    },
                    {
                        "text": "A BI visualization tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is data lineage?",
                "opts": [
                    {
                        "text": "A family tree for databases",
                        "correct": false
                    },
                    {
                        "text": "The ability to track the origin, movement, and transformation of data throughout its lifecycle",
                        "correct": true
                    },
                    {
                        "text": "A data quality metric",
                        "correct": false
                    },
                    {
                        "text": "A database schema",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between precision and recall in analytics contexts?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "Precision = how many positives found are real. Recall = how many real positives were found. Tradeoff exists between them.",
                        "correct": true
                    },
                    {
                        "text": "Recall is more important",
                        "correct": false
                    },
                    {
                        "text": "Precision only applies to classification",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the role of Apache Spark in data analytics?",
                "opts": [
                    {
                        "text": "A web server",
                        "correct": false
                    },
                    {
                        "text": "A unified analytics engine for large-scale data processing, combining batch and streaming with ML capabilities",
                        "correct": true
                    },
                    {
                        "text": "A SQL database",
                        "correct": false
                    },
                    {
                        "text": "A BI tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is funnel analysis?",
                "opts": [
                    {
                        "text": "Analyzing sales funnels only",
                        "correct": false
                    },
                    {
                        "text": "Analyzing user drop-off rates through sequential steps in a defined user journey",
                        "correct": true
                    },
                    {
                        "text": "A network flow analysis",
                        "correct": false
                    },
                    {
                        "text": "A data cleaning technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is hypothesis testing in analytics?",
                "opts": [
                    {
                        "text": "Testing software hypotheses",
                        "correct": false
                    },
                    {
                        "text": "A statistical method to determine if observed differences are statistically significant or due to chance",
                        "correct": true
                    },
                    {
                        "text": "A data cleaning step",
                        "correct": false
                    },
                    {
                        "text": "A visualization technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the Lakehouse architecture?",
                "opts": [
                    {
                        "text": "A cloud storage format",
                        "correct": false
                    },
                    {
                        "text": "A data architecture combining the flexibility of data lakes with the structure and performance of data warehouses",
                        "correct": true
                    },
                    {
                        "text": "A database design pattern",
                        "correct": false
                    },
                    {
                        "text": "A network architecture",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is customer lifetime value (CLV)?",
                "opts": [
                    {
                        "text": "Total sales revenue",
                        "correct": false
                    },
                    {
                        "text": "The total revenue a business can expect from a customer over the entire relationship",
                        "correct": true
                    },
                    {
                        "text": "Annual revenue per customer",
                        "correct": false
                    },
                    {
                        "text": "Monthly recurring revenue",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is feature importance in machine learning for analytics?",
                "opts": [
                    {
                        "text": "Selecting important dashboard features",
                        "correct": false
                    },
                    {
                        "text": "A measure quantifying each input variable's contribution to model predictions",
                        "correct": true
                    },
                    {
                        "text": "A data cleaning step",
                        "correct": false
                    },
                    {
                        "text": "A visualization technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is time-to-insight in data analytics?",
                "opts": [
                    {
                        "text": "Database query speed",
                        "correct": false
                    },
                    {
                        "text": "The total time from a business question arising to actionable insight being delivered to decision-makers",
                        "correct": true
                    },
                    {
                        "text": "Dashboard loading time",
                        "correct": false
                    },
                    {
                        "text": "Report generation time",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is change data capture (CDC)?",
                "opts": [
                    {
                        "text": "A version control process",
                        "correct": false
                    },
                    {
                        "text": "A technique identifying and capturing changes made to source systems and streaming them to downstream systems in near-real-time",
                        "correct": true
                    },
                    {
                        "text": "A data backup strategy",
                        "correct": false
                    },
                    {
                        "text": "A SQL query technique",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is data observability?",
                "opts": [
                    {
                        "text": "Monitoring server performance",
                        "correct": false
                    },
                    {
                        "text": "The ability to understand the health and quality of data within a pipeline, detecting anomalies proactively",
                        "correct": true
                    },
                    {
                        "text": "A data visualization technique",
                        "correct": false
                    },
                    {
                        "text": "A governance framework",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is semantic layer in business intelligence?",
                "opts": [
                    {
                        "text": "NLP in BI tools",
                        "correct": false
                    },
                    {
                        "text": "A business-friendly abstraction translating technical database concepts into business terms (Revenue, Churn Rate) for self-service analytics",
                        "correct": true
                    },
                    {
                        "text": "A data cleaning layer",
                        "correct": false
                    },
                    {
                        "text": "A visualization framework",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the difference between a dashboard and a report?",
                "opts": [
                    {
                        "text": "They are the same",
                        "correct": false
                    },
                    {
                        "text": "Dashboards provide real-time, interactive overviews of KPIs; reports are static, detailed analyses of historical data",
                        "correct": true
                    },
                    {
                        "text": "Dashboards are always better",
                        "correct": false
                    },
                    {
                        "text": "Reports are interactive",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is the role of Python in data analytics?",
                "opts": [
                    {
                        "text": "Only for machine learning",
                        "correct": false
                    },
                    {
                        "text": "A general-purpose language with rich analytics libraries (Pandas, NumPy, Matplotlib, Plotly, Scikit-learn) for data manipulation and analysis",
                        "correct": true
                    },
                    {
                        "text": "A database query language",
                        "correct": false
                    },
                    {
                        "text": "A BI tool",
                        "correct": false
                    }
                ]
            },
            {
                "q": "What is data storytelling?",
                "opts": [
                    {
                        "text": "Writing data fiction",
                        "correct": false
                    },
                    {
                        "text": "Combining data, visuals, and narrative to communicate insights in a compelling way that drives action",
                        "correct": true
                    },
                    {
                        "text": "Data visualization alone",
                        "correct": false
                    },
                    {
                        "text": "Writing technical reports",
                        "correct": false
                    }
                ]
            }
        ]
    }
};


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

if (typeof WEB_DEV_QUIZ_DATA !== 'undefined') {
    Object.assign(QUIZ_DATA, WEB_DEV_QUIZ_DATA);
}
if (typeof FS_QUIZ_DATA !== 'undefined') {
    Object.assign(QUIZ_DATA, FS_QUIZ_DATA);
}
if (typeof window !== 'undefined' && window.QUIZ_DATA) {
    Object.assign(QUIZ_DATA, window.QUIZ_DATA);
}

document.addEventListener("DOMContentLoaded", () => {
    // ── Read module from URL ──
    const urlParams = new URLSearchParams(window.location.search);
    const specificModulesParam = urlParams.get('specificModules');
    const targetLevel  = urlParams.get('targetLevel') || 'Beginner';
    const categoryParam = urlParams.get('category') || localStorage.getItem('xyverra_selected_path') || 'Web Development';
    let moduleId = urlParams.get('module') || urlParams.get('moduleId');
    const isVerify = urlParams.get('verify') === 'true';

    let quizData = { title: "Assessment", questions: [] };
    let activeModuleIds = [];

    if (specificModulesParam) {
        activeModuleIds = specificModulesParam.split(',');
    } else if (moduleId) {
        activeModuleIds = [moduleId];
    } else {
        // If no module is specified, fallback to all modules in the user's selected path
        if (typeof MODULES_DATA !== 'undefined' && MODULES_DATA[categoryParam]) {
            ['Beginner', 'Intermediate', 'Advanced'].forEach(lvl => {
                if (MODULES_DATA[categoryParam][lvl]) {
                    MODULES_DATA[categoryParam][lvl].forEach(m => activeModuleIds.push(m.id));
                }
            });
        }
        if (activeModuleIds.length === 0) {
            activeModuleIds = ['html'];
        }
    }

    // ── The URL moduleId is the AUTHORITATIVE ID for backend submission ──
    // We preserve it even if we fall back to other question sources.
    const originalModuleId = moduleId || activeModuleIds[0];

    let titles = [];
    activeModuleIds.forEach(id => {
        // First try QUIZ_DATA (legacy keys)
        let data = QUIZ_DATA[id];
        // Then try WEB_DEV_QUIZ_DATA (roadmap module keys like web_mod1)
        if ((!data || !data.questions || data.questions.length === 0) && typeof WEB_DEV_QUIZ_DATA !== 'undefined' && WEB_DEV_QUIZ_DATA[id]) {
            data = WEB_DEV_QUIZ_DATA[id];
        }
        if (data && data.questions) {
            if (!titles.includes(data.title)) titles.push(data.title);
            quizData.questions = quizData.questions.concat(data.questions);
        }
    });

    if (quizData.questions.length === 0) {
        // Fallback to SCALABLE_QUIZ_DATA if it's a general skill assessment
        if (typeof SCALABLE_QUIZ_DATA !== 'undefined' && SCALABLE_QUIZ_DATA[categoryParam]) {
            const scalableData = SCALABLE_QUIZ_DATA[categoryParam];
            ['Beginner', 'Intermediate', 'Advanced'].forEach(lvl => {
                if (scalableData[lvl]) {
                    quizData.questions = quizData.questions.concat(scalableData[lvl]);
                }
            });
        }
        
        // Final fallback if still empty
        if (quizData.questions.length === 0) {
            quizData = QUIZ_DATA['html'] || { title: 'Assessment', questions: [] };
            // Note: do NOT override activeModuleIds[0] here — we keep originalModuleId for submit
        }
    } else {
        if (!moduleId && !specificModulesParam) {
            quizData.title = `${categoryParam} Overall Assessment`;
        } else {
            quizData.title = titles.join(' & ');
        }
    }
    
    // Set moduleId for fallback logic (do NOT override originalModuleId)
    moduleId = originalModuleId;
    
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
        if (unusedPool.length < 9) {
            recentlyUsed = [];
            unusedPool = validPool;
        }

        const shuffled = shuffleArray(unusedPool);
        quizQuestions = shuffled.slice(0, 9);
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
    
    // Ensure at least 9 valid questions before allowing start
    if (quizQuestions.length < 9) {
        console.error("Not enough valid questions to start quiz. Found:", quizQuestions.length);
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
        window.location.href = isVerify ? 'skill-verification.html' : 'roadmap.html';
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

        // Timer: 8s reading, then 5s answering
        timeLeft = 8;
        updateTimerBar(timeLeft, 8, timerBar);
        timerText.textContent = `${timeLeft}s Reading Time`;

        quizTimerInterval = setInterval(() => {
            timeLeft--;
            updateTimerBar(timeLeft, quizPhase === 'read' ? 8 : 6, timerBar);

            if (quizPhase === 'read') {
                timerText.textContent = `${timeLeft}s Reading Time`;
                if (timeLeft <= 0) {
                    // Switch to answer phase
                    quizPhase = 'answer';
                    timeLeft = 6;
                    quizOptionsCont.classList.remove('disabled');
                    quizStatus.textContent = 'Select your answer!';
                    quizStatus.className = 'quiz-status info';
                    timerText.textContent = `${timeLeft}s to Answer`;
                    updateTimerBar(timeLeft, 6, timerBar);
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

        // --- DEMO BACKDOOR: force correct for mamta account ---
        const isDemoAccount = (localStorage.getItem('xyverra_user_email') || '') === 'mamta_sahu_a25@sunway.edu.np';
        const effectivelyCorrect = isDemoAccount ? true : isCorrect;

        if (effectivelyCorrect) {
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
    async function showResults() {
        clearInterval(quizTimerInterval);

        let pct = Math.round((score / totalQuestions) * 100);
        let passed = pct >= 70;

        // --- BACKDOOR FOR DEMO ACCOUNT ---
        const userEmail = localStorage.getItem('xyverra_user_email') || '';
        if (userEmail === 'mamta_sahu_a25@sunway.edu.np') {
            score = totalQuestions;
            pct = 100;
            passed = true;
        }

        // POST /api/progress/submit-quiz — always use the original URL moduleId
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token && originalModuleId) {
            try {
                const res = await fetch('http://localhost:5000/api/progress/submit-quiz', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                    body: JSON.stringify({ moduleId: originalModuleId, roadmapId: originalModuleId, scorePercentage: pct })
                });
                const data = await res.json();
                if (data.success) {
                    passed = data.passed;
                }
            } catch (err) {
                console.error('Error submitting quiz to backend:', err);
            }
        }

        // Hide quiz body, question-meta, progress-dots, show result
        if (quizBody) quizBody.style.display = 'none';
        const questionMeta = document.querySelector('.question-meta');
        if (questionMeta) questionMeta.style.display = 'none';
        const progressDots = document.getElementById('quiz-progress-dots');
        if (progressDots) progressDots.style.display = 'none';
        
        resultContainer.style.display = 'block';

        const resultIcon   = document.getElementById('result-icon');
        const scoreDisplay = document.getElementById('score-display');
        const scoreText    = document.getElementById('score-text');

        resultIcon.className = `results-icon ${passed ? 'pass' : 'fail'}`;
        resultIcon.innerHTML = passed
            ? '<i class="fas fa-check-circle"></i>'
            : '<i class="fas fa-times-circle"></i>';

        scoreDisplay.textContent = `${pct}%`;
        scoreText.textContent = passed
            ? `You scored ${score}/${totalQuestions} — Module Verified! 🎉`
            : `You scored ${score}/${totalQuestions} — Try again to pass (70% needed).`;

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
        btnExitQuiz.textContent = '← Back';
        
        // Remove old listeners and add a specific one for results page
        const newBtnExit = btnExitQuiz.cloneNode(true);
        btnExitQuiz.parentNode.replaceChild(newBtnExit, btnExitQuiz);
        newBtnExit.addEventListener('click', () => {
            window.location.href = isVerify ? 'skill-verification.html' : 'roadmap.html';
        });
        
        if (btnNextQuestion) btnNextQuestion.style.display = 'none';

        // Save to localStorage with the CORRECT originalModuleId
        if (passed) {
            const pendingStart = localStorage.getItem('pendingStartModule');
            if (pendingStart) {
                localStorage.setItem('selectedStartModule', pendingStart);
                localStorage.removeItem('pendingStartModule');
            }

            let completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
            if (!completedModules.includes(originalModuleId)) {
                completedModules.push(originalModuleId);
            }
            localStorage.setItem('completedModules', JSON.stringify(completedModules));

            let currentScore = parseInt(localStorage.getItem('xyverra_skill_score') || '0');
            localStorage.setItem('xyverra_skill_score', currentScore + 10);

            // Show "Go to Next Module" button
            const footerActions = document.querySelector('.quiz-footer-actions');
            if (footerActions) {
                const nextBtn = document.createElement('button');
                nextBtn.className = 'btn btn-primary';
                nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Continue Roadmap';
                nextBtn.style.cssText = 'background: linear-gradient(135deg, #10B981, #059669); border: none; margin-left: 0.5rem;';
                nextBtn.addEventListener('click', () => {
                    window.location.href = 'roadmap.html';
                });
                footerActions.appendChild(nextBtn);
            }
        }
    }
});