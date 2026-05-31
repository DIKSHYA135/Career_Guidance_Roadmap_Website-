const fs = require('fs');

const categories = [
    "Web Development",
    "Full Stack Development",
    "Backend / APIs",
    "Data Science",
    "NLP / AI",
    "Cloud / DevOps",
    "UI/UX Design",
    "Mobile Development",
    "Cybersecurity",
    "Data Analytics"
];

const levels = ["Beginner", "Intermediate", "Advanced"];
const data = {};

categories.forEach(cat => {
    data[cat] = {};
    levels.forEach(lvl => {
        data[cat][lvl] = [];
        // Generate 15 questions per category/level
        for (let i = 1; i <= 15; i++) {
            data[cat][lvl].push({
                q: `[${lvl}] Question ${i} about ${cat}. What is the primary purpose or concept here?`,
                opts: [
                    { text: `Incorrect Answer A for ${cat} ${lvl} Q${i}`, correct: false },
                    { text: `Correct Answer for ${cat} ${lvl} Q${i}`, correct: true },
                    { text: `Incorrect Answer B for ${cat} ${lvl} Q${i}`, correct: false },
                    { text: `Incorrect Answer C for ${cat} ${lvl} Q${i}`, correct: false }
                ]
            });
        }
    });
});

// Let's replace the first category "Web Development" with some realistic questions to show real data, and let the rest be generated padding for scale.
data["Web Development"]["Beginner"] = [
    { q: "What does HTML stand for?", opts: [{text: "Hyper Text Markup Language", correct: true}, {text: "High Tech Modern Language", correct: false}, {text: "Hyperlink Text Markup Language", correct: false}, {text: "Home Tool Markup Language", correct: false}] },
    { q: "Which tag is used for a line break?", opts: [{text: "<br>", correct: true}, {text: "<lb>", correct: false}, {text: "<break>", correct: false}, {text: "<hr>", correct: false}] },
    { q: "What does CSS stand for?", opts: [{text: "Cascading Style Sheets", correct: true}, {text: "Creative Style System", correct: false}, {text: "Computer Style Sheets", correct: false}, {text: "Colorful Style Sheets", correct: false}] },
    { q: "Which property changes the text color?", opts: [{text: "color", correct: true}, {text: "text-color", correct: false}, {text: "font-color", correct: false}, {text: "fgcolor", correct: false}] },
    { q: "Which HTML tag is the root element?", opts: [{text: "<html>", correct: true}, {text: "<body>", correct: false}, {text: "<root>", correct: false}, {text: "<head>", correct: false}] },
    { q: "How do you select an element with id 'demo'?", opts: [{text: "#demo", correct: true}, {text: ".demo", correct: false}, {text: "demo", correct: false}, {text: "*demo", correct: false}] },
    { q: "Which property is used for background color?", opts: [{text: "background-color", correct: true}, {text: "bgcolor", correct: false}, {text: "color", correct: false}, {text: "background", correct: false}] },
    { q: "What does JS stand for?", opts: [{text: "JavaScript", correct: true}, {text: "JavaSource", correct: false}, {text: "JustScript", correct: false}, {text: "JumboScript", correct: false}] },
    { q: "Which symbol is used for comments in JS?", opts: [{text: "//", correct: true}, {text: "<!--", correct: false}, {text: "/*", correct: false}, {text: "#", correct: false}] },
    { q: "Which HTML tag is used for an unordered list?", opts: [{text: "<ul>", correct: true}, {text: "<ol>", correct: false}, {text: "<li>", correct: false}, {text: "<list>", correct: false}] },
    { q: "What does DOM stand for?", opts: [{text: "Document Object Model", correct: true}, {text: "Data Object Model", correct: false}, {text: "Document Oriented Model", correct: false}, {text: "Design Object Model", correct: false}] },
    { q: "Which tag creates a hyperlink?", opts: [{text: "<a>", correct: true}, {text: "<link>", correct: false}, {text: "<href>", correct: false}, {text: "<hyperlink>", correct: false}] },
    { q: "How to declare a variable in modern JS?", opts: [{text: "let", correct: true}, {text: "var", correct: false}, {text: "variable", correct: false}, {text: "v", correct: false}] },
    { q: "What is the default display value of a <div>?", opts: [{text: "block", correct: true}, {text: "inline", correct: false}, {text: "inline-block", correct: false}, {text: "flex", correct: false}] },
    { q: "Which HTML attribute specifies alternate text for an image?", opts: [{text: "alt", correct: true}, {text: "title", correct: false}, {text: "src", correct: false}, {text: "href", correct: false}] }
];

const fileContent = `/* =========================================================
   quiz-data.js - Xyverra Scalable Assessment Question Bank
   ========================================================= */

const SCALABLE_QUIZ_DATA = ${JSON.stringify(data, null, 4)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SCALABLE_QUIZ_DATA;
}
`;

fs.writeFileSync('quiz-data.js', fileContent);
console.log('quiz-data.js generated successfully.');
