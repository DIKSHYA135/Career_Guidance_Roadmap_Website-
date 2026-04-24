// Skill Input JS
document.addEventListener("DOMContentLoaded", () => {
    const skillInput = document.getElementById('skill-input-field');
    const tagsContainer = document.getElementById('tags-container');
    const form = document.querySelector('form');

    // Add tags on Enter
    skillInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = skillInput.value.trim();
            if (val) {
                addSkillTag(val);
                skillInput.value = '';
            }
        }
    });

    function addSkillTag(text) {
        const tag = document.createElement('div');
        tag.className = 'skill-tag';
        tag.innerHTML = `<span>${text}</span> <i class="fas fa-times"></i>`;
        
        tag.querySelector('i').addEventListener('click', () => {
            tag.remove();
        });

        tagsContainer.appendChild(tag);
    }

    form.addEventListener('submit', (e) => {
        // Here you would normally gather the tags and project info to determine the user's score.
        // E.g., const skills = Array.from(tagsContainer.querySelectorAll('span')).map(node => node.textContent);
    });
});
