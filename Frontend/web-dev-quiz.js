const WEB_DEV_QUIZ_DATA = {
    "web_mod1": {
        title: "Module 1: Foundations of the Web",
        questions: [
            { q: "What does HTML stand for?", opts: [{text:"Hyper Text Markup Language", correct:true}, {text:"High Tech Modern Language", correct:false}, {text:"Hyperlink Text Markup Language", correct:false}, {text:"Home Tool Markup Language", correct:false}] },
            { q: "Which tag is used to create a hyperlink?", opts: [{text:"<a>", correct:true}, {text:"<link>", correct:false}, {text:"<href>", correct:false}, {text:"<url>", correct:false}] },
            { q: "What is the correct HTML element for the largest heading?", opts: [{text:"<h1>", correct:true}, {text:"<heading>", correct:false}, {text:"<head>", correct:false}, {text:"<h6>", correct:false}] },
            { q: "Which attribute provides alternative text for an image?", opts: [{text:"alt", correct:true}, {text:"title", correct:false}, {text:"src", correct:false}, {text:"description", correct:false}] },
            { q: "What does CSS stand for?", opts: [{text:"Cascading Style Sheets", correct:true}, {text:"Computer Style Sheets", correct:false}, {text:"Creative Style System", correct:false}, {text:"Colorful Style Sheets", correct:false}] },
            { q: "How do you select an element with id 'header' in CSS?", opts: [{text:"#header", correct:true}, {text:".header", correct:false}, {text:"header", correct:false}, {text:"*header", correct:false}] },
            { q: "Which property changes the text color in CSS?", opts: [{text:"color", correct:true}, {text:"text-color", correct:false}, {text:"font-color", correct:false}, {text:"fgcolor", correct:false}] },
            { q: "How do you add a comment in HTML?", opts: [{text:"<!-- comment -->", correct:true}, {text:"// comment", correct:false}, {text:"/* comment */", correct:false}, {text:"' comment", correct:false}] },
            { q: "Which HTML5 element is used to specify a footer for a document or section?", opts: [{text:"<footer>", correct:true}, {text:"<bottom>", correct:false}, {text:"<section>", correct:false}, {text:"<end>", correct:false}] },
            { q: "What is the default display value of a <div> element?", opts: [{text:"block", correct:true}, {text:"inline", correct:false}, {text:"inline-block", correct:false}, {text:"flex", correct:false}] },
            { q: "How do you make the text bold in CSS?", opts: [{text:"font-weight: bold;", correct:true}, {text:"style: bold;", correct:false}, {text:"font: bold;", correct:false}, {text:"text-weight: bold;", correct:false}] },
            { q: "Which CSS property controls the text size?", opts: [{text:"font-size", correct:true}, {text:"text-size", correct:false}, {text:"text-style", correct:false}, {text:"font-style", correct:false}] },
            { q: "What is the correct CSS syntax to make all the <p> elements bold?", opts: [{text:"p {font-weight:bold;}", correct:true}, {text:"p {text-size:bold;}", correct:false}, {text:"<p style='font-size:bold'>", correct:false}, {text:"p {font:bold;}", correct:false}] },
            { q: "In HTML, onblur and onfocus are:", opts: [{text:"Event attributes", correct:true}, {text:"HTML elements", correct:false}, {text:"Style attributes", correct:false}, {text:"Pseudo-classes", correct:false}] }
        ]
    },
    "web_mod2": {
        title: "Module 2: Building Responsive Layouts",
        questions: [
            { q: "What is the CSS Box Model?", opts: [{text:"Content, padding, borders, margins", correct:true}, {text:"Header, body, footer", correct:false}, {text:"Flexbox and Grid", correct:false}, {text:"Width, height, depth", correct:false}] },
            { q: "How do you apply Flexbox to an element?", opts: [{text:"display: flex;", correct:true}, {text:"layout: flex;", correct:false}, {text:"position: flex;", correct:false}, {text:"float: flex;", correct:false}] },
            { q: "Which Flexbox property aligns items horizontally (along the main axis)?", opts: [{text:"justify-content", correct:true}, {text:"align-items", correct:false}, {text:"align-content", correct:false}, {text:"flex-direction", correct:false}] },
            { q: "What is CSS Grid best suited for?", opts: [{text:"Two-dimensional layouts (rows and columns)", correct:true}, {text:"One-dimensional layouts (row OR column)", correct:false}, {text:"Styling typography", correct:false}, {text:"Adding animations", correct:false}] },
            { q: "Which CSS property is used to create space inside an element's border?", opts: [{text:"padding", correct:true}, {text:"margin", correct:false}, {text:"border-spacing", correct:false}, {text:"spacing", correct:false}] },
            { q: "What does 'box-sizing: border-box;' do?", opts: [{text:"Includes padding and border in the element's total width and height", correct:true}, {text:"Excludes padding from the width", correct:false}, {text:"Makes the box transparent", correct:false}, {text:"Removes all borders", correct:false}] },
            { q: "Which media query syntax is correct for targeting screens smaller than 600px?", opts: [{text:"@media (max-width: 600px)", correct:true}, {text:"@media (min-width: 600px)", correct:false}, {text:"@media size < 600px", correct:false}, {text:"@screen (max-width: 600px)", correct:false}] },
            { q: "What is a common use case for CSS Grid?", opts: [{text:"Creating complex webpage structures", correct:true}, {text:"Centering a single icon", correct:false}, {text:"Setting background colors", correct:false}, {text:"Changing font sizes", correct:false}] },
            { q: "Which Flexbox property aligns items vertically (along the cross axis)?", opts: [{text:"align-items", correct:true}, {text:"justify-content", correct:false}, {text:"align-content", correct:false}, {text:"flex-align", correct:false}] },
            { q: "How do you specify the number of columns in CSS Grid?", opts: [{text:"grid-template-columns", correct:true}, {text:"grid-columns", correct:false}, {text:"grid-template-rows", correct:false}, {text:"columns", correct:false}] },
            { q: "What does the 'fr' unit stand for in CSS Grid?", opts: [{text:"Fraction of the available space", correct:true}, {text:"Frame rate", correct:false}, {text:"Fixed ratio", correct:false}, {text:"Free rendering", correct:false}] },
            { q: "How do you make an element take up 2 columns in CSS Grid?", opts: [{text:"grid-column: span 2;", correct:true}, {text:"grid-columns: 2;", correct:false}, {text:"column-span: 2;", correct:false}, {text:"span: 2 columns;", correct:false}] },
            { q: "Which property is used to change the gap between grid items?", opts: [{text:"gap or grid-gap", correct:true}, {text:"spacing", correct:false}, {text:"margin", correct:false}, {text:"padding", correct:false}] },
            { q: "Which flex-direction value makes items stack vertically?", opts: [{text:"column", correct:true}, {text:"row", correct:false}, {text:"vertical", correct:false}, {text:"stack", correct:false}] }
        ]
    },
    "web_mod3": {
        title: "Module 3: Programming with JavaScript",
        questions: [
            { q: "What keyword is used to declare a block-scoped variable in modern JS?", opts: [{text:"let", correct:true}, {text:"var", correct:false}, {text:"variable", correct:false}, {text:"int", correct:false}] },
            { q: "Which of the following is NOT a JS data type?", opts: [{text:"Float", correct:true}, {text:"String", correct:false}, {text:"Boolean", correct:false}, {text:"Undefined", correct:false}] },
            { q: "How do you write 'Hello World' in an alert box?", opts: [{text:"alert('Hello World');", correct:true}, {text:"msgBox('Hello World');", correct:false}, {text:"console.log('Hello World');", correct:false}, {text:"window.alert = 'Hello World';", correct:false}] },
            { q: "What is the correct way to write a JS array?", opts: [{text:"const colors = ['red', 'green', 'blue'];", correct:true}, {text:"const colors = (1:'red', 2:'green');", correct:false}, {text:"const colors = 'red', 'green', 'blue';", correct:false}, {text:"const colors = {'red', 'green', 'blue'};", correct:false}] },
            { q: "Which symbol is used for strict equality comparison?", opts: [{text:"===", correct:true}, {text:"==", correct:false}, {text:"=", correct:false}, {text:"!==", correct:false}] },
            { q: "How do you create a function in JavaScript?", opts: [{text:"function myFunction()", correct:true}, {text:"function:myFunction()", correct:false}, {text:"function = myFunction()", correct:false}, {text:"create myFunction()", correct:false}] },
            { q: "What does the 'typeof' operator do?", opts: [{text:"Returns the data type of a variable", correct:true}, {text:"Changes the data type of a variable", correct:false}, {text:"Checks if a variable is defined", correct:false}, {text:"Returns the object reference", correct:false}] },
            { q: "Which statement is used to stop a loop?", opts: [{text:"break", correct:true}, {text:"stop", correct:false}, {text:"exit", correct:false}, {text:"return", correct:false}] },
            { q: "What is an object in JavaScript?", opts: [{text:"A collection of key-value pairs", correct:true}, {text:"An ordered list of items", correct:false}, {text:"A function that returns a value", correct:false}, {text:"A primitive data type", correct:false}] },
            { q: "How do you access the value of 'name' in an object 'person'?", opts: [{text:"person.name", correct:true}, {text:"person[name]", correct:false}, {text:"person->name", correct:false}, {text:"person:name", correct:false}] },
            { q: "Which method adds a new element to the end of an array?", opts: [{text:"push()", correct:true}, {text:"pop()", correct:false}, {text:"shift()", correct:false}, {text:"append()", correct:false}] },
            { q: "Which method removes the last element of an array?", opts: [{text:"pop()", correct:true}, {text:"push()", correct:false}, {text:"shift()", correct:false}, {text:"remove()", correct:false}] },
            { q: "What is a boolean?", opts: [{text:"A value that is either true or false", correct:true}, {text:"A text string", correct:false}, {text:"A decimal number", correct:false}, {text:"An empty variable", correct:false}] },
            { q: "How do you write an IF statement in JavaScript?", opts: [{text:"if (i == 5)", correct:true}, {text:"if i = 5", correct:false}, {text:"if i == 5 then", correct:false}, {text:"if i = 5 then", correct:false}] }
        ]
    },
    "web_mod4": {
        title: "Module 4: Interactive Web Pages (The DOM)",
        questions: [
            { q: "What does DOM stand for?", opts: [{text:"Document Object Model", correct:true}, {text:"Data Object Model", correct:false}, {text:"Document Oriented Model", correct:false}, {text:"Display Object Management", correct:false}] },
            { q: "Which method selects an element by its ID?", opts: [{text:"getElementById()", correct:true}, {text:"querySelector()", correct:false}, {text:"getElementsByClass()", correct:false}, {text:"selectId()", correct:false}] },
            { q: "How do you add a click event listener to an element?", opts: [{text:"element.addEventListener('click', func)", correct:true}, {text:"element.onClick(func)", correct:false}, {text:"element.listen('click', func)", correct:false}, {text:"element.on('click', func)", correct:false}] },
            { q: "Which property is used to change the text content of an HTML element?", opts: [{text:"textContent", correct:true}, {text:"innerHTML", correct:false}, {text:"innerText", correct:false}, {text:"All of the above", correct:true}] },
            { q: "What does querySelector('.my-class') return?", opts: [{text:"The first element with class 'my-class'", correct:true}, {text:"All elements with class 'my-class'", correct:false}, {text:"An element with ID 'my-class'", correct:false}, {text:"Null", correct:false}] },
            { q: "How do you change the CSS style of an element using JavaScript?", opts: [{text:"element.style.propertyName = value;", correct:true}, {text:"element.css(propertyName, value);", correct:false}, {text:"element.style(propertyName, value);", correct:false}, {text:"element.changeStyle(propertyName, value);", correct:false}] },
            { q: "What is the purpose of event.preventDefault()?", opts: [{text:"Prevents the default action of an event (like form submission)", correct:true}, {text:"Stops event bubbling", correct:false}, {text:"Cancels the event listener", correct:false}, {text:"Resets a form", correct:false}] },
            { q: "Which property gets the value of an input field?", opts: [{text:"value", correct:true}, {text:"text", correct:false}, {text:"content", correct:false}, {text:"val", correct:false}] },
            { q: "What is event bubbling?", opts: [{text:"An event triggers on the deepest element, then propagates upwards", correct:true}, {text:"An event triggers on the outer element, then propagates downwards", correct:false}, {text:"An event that fires continuously", correct:false}, {text:"An event that cancels other events", correct:false}] },
            { q: "How do you create a new DOM element in JavaScript?", opts: [{text:"document.createElement()", correct:true}, {text:"document.newElement()", correct:false}, {text:"document.addNode()", correct:false}, {text:"document.createNode()", correct:false}] },
            { q: "Which method adds a child node to an element?", opts: [{text:"appendChild()", correct:true}, {text:"insertChild()", correct:false}, {text:"addNode()", correct:false}, {text:"push()", correct:false}] },
            { q: "How can you remove an element from the DOM?", opts: [{text:"element.remove()", correct:true}, {text:"element.delete()", correct:false}, {text:"document.remove(element)", correct:false}, {text:"element.destroy()", correct:false}] },
            { q: "What does 'this' refer to inside an event listener function?", opts: [{text:"The element that triggered the event", correct:true}, {text:"The global window object", correct:false}, {text:"The document object", correct:false}, {text:"The function itself", correct:false}] },
            { q: "Which property checks if a checkbox is checked?", opts: [{text:"checked", correct:true}, {text:"value", correct:false}, {text:"selected", correct:false}, {text:"isChecked", correct:false}] }
        ]
    },
    "web_mod5": {
        title: "Module 5: Modern JavaScript & APIs",
        questions: [
            { q: "What is a Promise in JavaScript?", opts: [{text:"An object representing the eventual completion or failure of an async operation", correct:true}, {text:"A function that executes immediately", correct:false}, {text:"A guaranteed return value", correct:false}, {text:"A strict mode feature", correct:false}] },
            { q: "Which syntax is used to define an arrow function?", opts: [{text:"() => {}", correct:true}, {text:"function() {}", correct:false}, {text:"=> () {}", correct:false}, {text:"def () {}", correct:false}] },
            { q: "What does the 'fetch()' function do?", opts: [{text:"Makes a network request and returns a Promise", correct:true}, {text:"Downloads a file directly", correct:false}, {text:"Imports a JS module", correct:false}, {text:"Parses JSON data", correct:false}] },
            { q: "How do you handle a resolved Promise?", opts: [{text:".then()", correct:true}, {text:".catch()", correct:false}, {text:".finally()", correct:false}, {text:".resolve()", correct:false}] },
            { q: "What is the purpose of the 'async' keyword?", opts: [{text:"It makes a function return a Promise automatically", correct:true}, {text:"It makes a function run instantly", correct:false}, {text:"It blocks the main thread", correct:false}, {text:"It imports data asynchronously", correct:false}] },
            { q: "What does 'await' do in an async function?", opts: [{text:"Pauses execution until the Promise settles", correct:true}, {text:"Cancels a Promise", correct:false}, {text:"Returns the Promise object", correct:false}, {text:"Executes a function asynchronously", correct:false}] },
            { q: "What does JSON stand for?", opts: [{text:"JavaScript Object Notation", correct:true}, {text:"Java Standard Output Network", correct:false}, {text:"JavaScript Online Network", correct:false}, {text:"Java Syntax Object Naming", correct:false}] },
            { q: "How do you convert a JSON string into a JavaScript object?", opts: [{text:"JSON.parse()", correct:true}, {text:"JSON.stringify()", correct:false}, {text:"JSON.object()", correct:false}, {text:"JSON.convert()", correct:false}] },
            { q: "What is destructuring assignment in ES6?", opts: [{text:"Extracting values from arrays or objects into distinct variables", correct:true}, {text:"Deleting properties from an object", correct:false}, {text:"Combining multiple arrays into one", correct:false}, {text:"Changing the structure of a class", correct:false}] },
            { q: "What does the spread operator (...) do?", opts: [{text:"Expands an iterable into its individual elements", correct:true}, {text:"Multiplies array elements", correct:false}, {text:"Compresses data", correct:false}, {text:"Concatenates strings automatically", correct:false}] },
            { q: "How do you handle errors in async/await?", opts: [{text:"try...catch blocks", correct:true}, {text:".catch() chaining", correct:false}, {text:"if (error) checks", correct:false}, {text:"error() functions", correct:false}] },
            { q: "Which HTTP method is used to retrieve data from an API?", opts: [{text:"GET", correct:true}, {text:"POST", correct:false}, {text:"PUT", correct:false}, {text:"DELETE", correct:false}] },
            { q: "What is a REST API?", opts: [{text:"An architectural style for network-based software", correct:true}, {text:"A programming language", correct:false}, {text:"A database type", correct:false}, {text:"A JavaScript framework", correct:false}] },
            { q: "Which of these is a valid template literal?", opts: [{text:"`Hello ${name}`", correct:true}, {text:"'Hello ${name}'", correct:false}, {text:"\"Hello ${name}\"", correct:false}, {text:"`Hello {name}`", correct:false}] }
        ]
    },
    "web_mod6": {
        title: "Module 6: Deployment & Career Readiness",
        questions: [
            { q: "What is Git?", opts: [{text:"A distributed version control system", correct:true}, {text:"A cloud hosting provider", correct:false}, {text:"A programming language", correct:false}, {text:"A project management tool", correct:false}] },
            { q: "What is the difference between Git and GitHub?", opts: [{text:"Git is a tool, GitHub is a hosting service for Git repositories", correct:true}, {text:"They are the exact same thing", correct:false}, {text:"Git is for front-end, GitHub is for back-end", correct:false}, {text:"Git is owned by Microsoft, GitHub is open-source", correct:false}] },
            { q: "Which command creates a new Git repository?", opts: [{text:"git init", correct:true}, {text:"git start", correct:false}, {text:"git new", correct:false}, {text:"git create", correct:false}] },
            { q: "What does 'git commit' do?", opts: [{text:"Saves staged changes to the local repository", correct:true}, {text:"Uploads changes to a remote server", correct:false}, {text:"Adds files to the staging area", correct:false}, {text:"Downloads changes from a remote server", correct:false}] },
            { q: "Which command uploads local commits to a remote repository?", opts: [{text:"git push", correct:true}, {text:"git pull", correct:false}, {text:"git upload", correct:false}, {text:"git send", correct:false}] },
            { q: "What is a common platform for hosting static websites for free?", opts: [{text:"Vercel, Netlify, or GitHub Pages", correct:true}, {text:"MySQL", correct:false}, {text:"MongoDB", correct:false}, {text:"PostgreSQL", correct:false}] },
            { q: "What should a strong developer portfolio include?", opts: [{text:"Working projects, code links, and contact information", correct:true}, {text:"Just a resume in PDF format", correct:false}, {text:"A list of hobbies", correct:false}, {text:"Every single tutorial project ever built", correct:false}] },
            { q: "What is continuous deployment (CD)?", opts: [{text:"Automatically deploying code changes to production", correct:true}, {text:"Writing code without stopping", correct:false}, {text:"Deploying code manually via FTP", correct:false}, {text:"A type of server database", correct:false}] },
            { q: "What is the purpose of a README file?", opts: [{text:"To explain what a project does and how to run it", correct:true}, {text:"To store database credentials", correct:false}, {text:"To compile the code", correct:false}, {text:"To hold CSS styles", correct:false}] },
            { q: "Which git command checks the status of your working directory?", opts: [{text:"git status", correct:true}, {text:"git check", correct:false}, {text:"git info", correct:false}, {text:"git log", correct:false}] },
            { q: "What does 'git clone' do?", opts: [{text:"Copies an existing repository to your local machine", correct:true}, {text:"Duplicates a branch", correct:false}, {text:"Creates a backup of your local files", correct:false}, {text:"Uploads your repository", correct:false}] },
            { q: "Why is a custom domain important for a portfolio?", opts: [{text:"It looks more professional to employers", correct:true}, {text:"It makes the code run faster", correct:false}, {text:"It provides free hosting", correct:false}, {text:"It is required by GitHub", correct:false}] },
            { q: "What is the typical first step in a technical interview?", opts: [{text:"A behavioral or introductory phone screen", correct:true}, {text:"A 4-hour live coding session", correct:false}, {text:"A contract negotiation", correct:false}, {text:"A design review", correct:false}] },
            { q: "Which git command switches branches?", opts: [{text:"git checkout or git switch", correct:true}, {text:"git branch", correct:false}, {text:"git move", correct:false}, {text:"git change", correct:false}] }
        ]
    }
};
