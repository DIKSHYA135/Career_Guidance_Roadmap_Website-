const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'Courses', 'Full_Stack_Development');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const modules = [
    { mod: 1, lessons: ['HTML & CSS Structure', 'JavaScript Fundamentals', 'DOM Manipulation Review'] },
    { mod: 2, lessons: ['Introduction to Node.js', 'NPM & Package Management', 'Building a Simple Web Server'] },
    { mod: 3, lessons: ['Relational Databases (SQL)', 'NoSQL Databases (MongoDB)', 'Connecting Databases to Node'] },
    { mod: 4, lessons: ['Introduction to Express.js', 'Building RESTful Routes', 'Middleware & Error Handling'] },
    { mod: 5, lessons: ['React Components & JSX', 'State & Hooks', 'Connecting React to APIs'] },
    { mod: 6, lessons: ['Full Stack Authentication', 'The MERN Stack Architecture', 'Deploying Full Stack Apps'] }
];

modules.forEach(m => {
    m.lessons.forEach((l, i) => {
        const file = path.join(dir, `Module_${m.mod}_Lesson_${i+1}.md`);
        const content = `# ${l}

Welcome to Module ${m.mod}, Lesson ${i+1} on ${l}.

## Introduction
In this lesson, we will cover the basics of ${l}. Full stack development requires understanding both client and server architectures, making you a versatile developer capable of building end-to-end applications.

## Core Concepts
- **Understand the syntax and structure:** Familiarize yourself with the conventions.
- **Write modular, scalable code:** Keep your codebase clean and organized.
- **Best practices:** Always follow industry standards for ${l.split(' ')[0]}.

## Practical Example
Here is a basic example demonstrating ${l}:

\`\`\`javascript
// Example code for ${l}
console.log("Hello Full Stack Developer!");
\`\`\`

## Real-World Use Case
In a production environment, ${l} is crucial for building robust, high-performance web applications that serve millions of users.

## Summary
We learned about the fundamental principles of ${l} and why it plays such an important role in Full Stack Development.

### Key Takeaways
- Focus on clean architecture.
- Understand how the frontend and backend communicate.
- Practice makes perfect.
`;
        fs.writeFileSync(file, content);
    });
});

const qData = [];
for(let m=1; m<=6; m++) {
    for(let i=1; i<=14; i++) {
        qData.push({
            id: `fs_mod${m}_q${i}`,
            moduleId: `fs_mod${m}`,
            text: `What is a core principle covered in Full Stack Module ${m}, Question ${i}?`,
            opts: [
                { text: `Correct Answer for Mod ${m} Q${i}`, correct: true },
                { text: "Incorrect Option A", correct: false },
                { text: "Incorrect Option B", correct: false },
                { text: "Incorrect Option C", correct: false }
            ]
        });
    }
}
const output = `const FS_QUIZ_DATA = {
  "fs_mod1": [], "fs_mod2": [], "fs_mod3": [], "fs_mod4": [], "fs_mod5": [], "fs_mod6": []
};
const rawFsQuizData = ${JSON.stringify(qData, null, 2)};
rawFsQuizData.forEach(q => FS_QUIZ_DATA[q.moduleId].push(q));
if (typeof window !== "undefined") window.FS_QUIZ_DATA = FS_QUIZ_DATA;
`;

fs.writeFileSync(path.join(__dirname, 'fs-quiz-data.js'), output);
console.log("Full Stack Modules & Quizzes generated successfully.");
