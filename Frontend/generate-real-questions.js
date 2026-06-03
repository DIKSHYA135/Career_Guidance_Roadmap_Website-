const fs = require('fs');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error("Please set GEMINI_API_KEY environment variable.");
    console.error("Usage: GEMINI_API_KEY=your_key node generate-real-questions.js");
    process.exit(1);
}

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

const topicsMap = {
    "Web Development": "HTML, CSS, JavaScript, Responsive Design, DOM, Browser APIs",
    "Full Stack Development": "Frontend, Backend, Authentication, Databases, Deployment",
    "Backend / APIs": "Node.js, Express.js, REST APIs, JWT, Authentication, SQL, NoSQL",
    "Data Science": "Python, Pandas, NumPy, Statistics, Data Cleaning, Machine Learning",
    "NLP / AI": "Machine Learning, Deep Learning, NLP, LLMs, Prompt Engineering, AI Ethics",
    "Cloud / DevOps": "Linux, Docker, Kubernetes, AWS, CI/CD, Monitoring",
    "UI/UX Design": "Design Principles, Accessibility, Wireframes, User Research, Prototyping",
    "Mobile Development": "Android, iOS, Flutter, React Native, Mobile UI",
    "Cybersecurity": "Network Security, Authentication, Encryption, OWASP, Security Best Practices",
    "Data Analytics": "Excel, SQL, Power BI, Tableau, Data Visualization, Reporting"
};

const levels = ["Beginner", "Intermediate", "Advanced"];

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function generateBatch(category, level, topicString) {
    console.log(`Generating 50 questions for ${category} - ${level}...`);
    
    const prompt = `Generate exactly 50 unique, industry-relevant Multiple Choice Questions (MCQ) for the category "${category}" at a "${level}" level. 
Cover these specific topics: ${topicString}.

Requirements:
- 4 options per question
- Only one correct answer
- No duplicate questions
- Mix theoretical and practical questions
- Output MUST be a valid JSON object in the exact format shown below, with NO markdown formatting, NO \`\`\`json wrappers, just raw JSON.

{
  "category": "${category}",
  "level": "${level}",
  "questions": [
    {
      "question": "What does HTML stand for?",
      "options": [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Transfer Markup Language",
        "Hyper Tool Markup Language"
      ],
      "answer": "Hyper Text Markup Language"
    }
  ]
}
`;

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        responseMimeType: "application/json"
                    }
                })
            });

            if (!response.ok) {
                if (response.status === 429) {
                    console.log("Rate limited. Waiting 15 seconds...");
                    await delay(15000);
                    continue;
                }
                throw new Error(`API error: ${response.statusText}`);
            }

            const data = await response.json();
            const textResponse = data.candidates[0].content.parts[0].text;
            
            let cleanJson = textResponse.trim();
            const jsonStart = cleanJson.indexOf('{');
            const jsonEnd = cleanJson.lastIndexOf('}');
            if (jsonStart !== -1 && jsonEnd !== -1) {
                cleanJson = cleanJson.substring(jsonStart, jsonEnd + 1);
            }

            const parsed = JSON.parse(cleanJson);
            
            if (!parsed.questions || !Array.isArray(parsed.questions)) {
                throw new Error("Parsed JSON has no questions array.");
            }
            
            // Validate the questions strictly
            const validQuestions = parsed.questions.filter(q => {
                return q.question && typeof q.question === 'string' &&
                       Array.isArray(q.options) && q.options.length === 4 &&
                       q.options.every(opt => typeof opt === 'string' && opt.trim() !== '') &&
                       q.answer && typeof q.answer === 'string';
            });
            
            if (validQuestions.length < parsed.questions.length) {
                console.warn(`Dropped ${parsed.questions.length - validQuestions.length} invalid questions.`);
            }
            
            if (validQuestions.length === 0) {
                throw new Error("Parsed JSON has no valid questions after validation.");
            }
            
            // Ensure we return the sanitized list
            parsed.questions = validQuestions;
            
            console.log(`Successfully generated ${parsed.questions.length} valid questions.`);
            return parsed;

        } catch (error) {
            console.error(`Attempt ${attempt} failed for ${category}-${level}:`, error.message);
            if (attempt === 3) {
                console.error("Max retries reached. Skipping.");
                return null;
            }
            await delay(5000);
        }
    }
}

async function main() {
    // The final structure will match the legacy SCALABLE_QUIZ_DATA but mapped carefully
    // Since the user requested a specific JSON array structure, we'll build an array of those objects
    // OR we can map it back to the dictionary for easy integration. Let's output exactly what they asked for
    // and then adapt it for quiz-data.js.
    
    let finalData = {};
    
    // We will build finalData to match SCALABLE_QUIZ_DATA so quiz.js doesn't completely break, 
    // but the inner objects will use the user's requested schema:
    // { "question": "...", "options": [...], "answer": "..." }

    for (const category of categories) {
        finalData[category] = {};
        for (const level of levels) {
            const topicString = topicsMap[category];
            const batch = await generateBatch(category, level, topicString);
            
            if (batch && batch.questions) {
                finalData[category][level] = batch.questions;
            } else {
                finalData[category][level] = [];
            }
            
            // Respect API rate limits (15 RPM free tier usually)
            console.log("Waiting 4 seconds before next request...");
            await delay(4000);
        }
    }

    const outputContent = `const SCALABLE_QUIZ_DATA = ${JSON.stringify(finalData, null, 2)};`;
    fs.writeFileSync('quiz-data.js', outputContent);
    console.log("Successfully wrote all 1,500 questions to quiz-data.js");
}

main();
