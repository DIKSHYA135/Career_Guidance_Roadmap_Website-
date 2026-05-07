// Your skills data (you can replace or connect API later)
const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Git",
    "Tailwind CSS"
];

// Get container
const container = document.getElementById("skills-container");

// Render skills
skills.forEach(skill => {
    const card = document.createElement("div");
    card.classList.add("skill-card");
    card.textContent = skill;

    container.appendChild(card);
});