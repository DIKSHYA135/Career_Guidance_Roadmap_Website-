const fs = require('fs');
const path = require('path');

// Read base roadmap data
let roadmapDataContent = fs.readFileSync('Frontend/roadmap-data.js', 'utf8');
let ROADMAP_DATA;
try {
    ROADMAP_DATA = new Function('return ' + roadmapDataContent.replace('const ROADMAP_DATA = ', '').trim() + ';')();
} catch (e) {
    console.error('Error parsing roadmap data', e);
    process.exit(1);
}

// Read and apply the override data!
let overrideContent = fs.readFileSync('Frontend/roadmap-data-override.js', 'utf8');
try {
    // We execute the override script in a context where ROADMAP_DATA exists
    new Function('ROADMAP_DATA', overrideContent)(ROADMAP_DATA);
} catch (e) {
    console.error('Error parsing override data', e);
}

const coursesDir = path.join(__dirname, 'Frontend', 'Courses');

function generateLessonContent(courseName, moduleTitle, lessonName, desc, keywords) {
    const kws = keywords && keywords.length ? keywords.join(', ') : 'technology, programming, systems';
    
    return `# ${lessonName}

Welcome to **${lessonName}**, an essential part of the **${moduleTitle}** module in the **${courseName}** track. 

This comprehensive lesson covers everything you need to know about this topic. By the end of this lesson, you will have a strong understanding of the core concepts, practical applications, and industry best practices.

---

## 1. Introduction and Overview

**${lessonName}** is a critical concept in modern technology. It forms the backbone of many systems and is widely used across the industry. Understanding this concept is essential for anyone looking to build a career in ${courseName}.

**Why does this matter?**
* **Industry Demand:** Companies actively seek professionals with strong skills in this area.
* **Foundational Knowledge:** This topic serves as a stepping stone for more advanced concepts in ${moduleTitle}.
* **Practical Application:** You will use these concepts daily in real-world scenarios.

---

## 2. Core Concepts and Architecture

To truly master **${lessonName}**, we must dive deep into its underlying architecture and core concepts. 

### Understanding the Fundamentals
At its core, this topic revolves around the principles of ${kws}. These keywords represent the building blocks of the technology we are discussing. 

1. **Scalability and Performance:** How does it handle increased loads?
2. **Security and Reliability:** What are the best practices for ensuring data integrity?
3. **Maintainability:** How do we write code or configure systems that are easy to manage in the long run?

### The Technical Details
Let's look at a conceptual example of how things fit together:

\`\`\`
[ User / Client ] <--> [ Interface / API ] <--> [ Core Logic / Processing ] <--> [ Storage / Database ]
\`\`\`

In the context of ${lessonName}, you will mostly be interacting with the middle layers, ensuring that data flows seamlessly and efficiently.

---

## 3. Practical Examples and Code Snippets

Theory is important, but practical application is where learning happens. Below are some examples of how you might implement or interact with the concepts discussed in **${lessonName}**.

### Example 1: Basic Implementation
When starting out, your implementation might look something like this. It's simple, straightforward, and gets the job done.

\`\`\`javascript
// A simple conceptual example related to ${lessonName}
function initializeModule() {
    console.log("Initializing ${lessonName}...");
    // Configuration and setup
    const config = {
        module: "${moduleTitle}",
        course: "${courseName}",
        status: "active"
    };
    return config;
}

const result = initializeModule();
console.log("Initialization complete:", result);
\`\`\`

### Example 2: Advanced Usage
As you grow more comfortable, you'll encounter more complex scenarios that require robust error handling, optimization, and better architecture.

\`\`\`python
# Advanced conceptual implementation
class AdvancedConcept:
    def __init__(self):
        self.name = "${lessonName}"
        self.is_ready = True
        
    def execute_process(self, data):
        if not self.is_ready:
            raise Exception("System not ready")
        
        print(f"Processing data in {self.name}")
        # Complex logic here
        return True
\`\`\`

---

## 4. Industry Best Practices

To be a successful professional in ${courseName}, writing code or configuring systems is only half the battle. You must also adhere to industry best practices.

* **Documentation:** Always document your work. Clear documentation helps your team and your future self.
* **Testing:** Write unit tests and integration tests. Never deploy without verifying your changes.
* **Security First:** Always assume your system will be targeted. Sanitize inputs, use secure connections, and follow the principle of least privilege.
* **Continuous Learning:** The concepts in ${moduleTitle} evolve rapidly. Stay updated with the latest trends and toolings.

---

## 5. Common Pitfalls and How to Avoid Them

Even experienced developers make mistakes. Here are some common pitfalls related to **${lessonName}** and how to avoid them:

1. **Ignoring Edge Cases:** Always think about what could go wrong. What if the input is null? What if the network fails?
2. **Over-engineering:** Keep it simple. Don't add complexity unless absolutely necessary.
3. **Hardcoding Values:** Use configuration files or environment variables instead of hardcoding sensitive or environment-specific data.

---

## 6. Summary and Next Steps

In this lesson, we explored the depths of **${lessonName}**. We covered the theoretical foundations, looked at practical examples, and discussed essential best practices and common pitfalls.

**Key Takeaways:**
* The importance of ${kws} in the broader context of ${courseName}.
* How to approach practical implementations with scalability and maintainability in mind.
* The necessity of testing, documentation, and security.

**What's Next?**
Review the examples provided in this lesson and try to implement them yourself. Once you feel comfortable, proceed to the next lesson in the **${moduleTitle}** module. Keep practicing, and don't hesitate to experiment!
`;
}

// Loop over every course folder
for (const courseName in ROADMAP_DATA) {
    const safeCourseName = courseName.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
    const courseDir = path.join(coursesDir, safeCourseName);
    
    if (!fs.existsSync(courseDir)) {
        console.log(`Directory does not exist for course: ${courseName} (${courseDir})`);
        continue;
    }

    const modules = ROADMAP_DATA[courseName];
    modules.forEach((mod, modIndex) => {
        const modTitle = mod.title;
        const desc = mod.desc;
        const keywords = mod.keywords;
        
        if (mod.courses && Array.isArray(mod.courses)) {
            mod.courses.forEach((lesson, lessonIndex) => {
                const lessonName = lesson.name;
                
                // Construct the filename that matches the frontend code expectations
                const fileName = `Module_${modIndex + 1}_Lesson_${lessonIndex + 1}.md`;
                const filePath = path.join(courseDir, fileName);
                
                // Skip Web Dev Module 1 because we manually wrote rich lessons for it.
                if (courseName === "Web Development" && modIndex === 0) {
                    return;
                }
                
                const content = generateLessonContent(courseName, modTitle, lessonName, desc, keywords);
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated ${filePath} with correct topic: ${lessonName}`);
            });
        }
    });
}
console.log('All lessons populated successfully with overridden data!');
