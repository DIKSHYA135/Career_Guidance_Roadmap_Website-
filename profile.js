// profile.js
document.addEventListener("DOMContentLoaded", () => {
    // ── Dynamic Skills Mapping ──
    const SKILLS_MAP = {
        "Web Development": {
            "Beginner": ["HTML", "CSS", "JavaScript", "Git", "Responsive Design"],
            "Intermediate": ["React", "TypeScript", "Tailwind CSS", "Redux", "APIs"],
            "Advanced": ["Next.js", "Performance Optimization", "System Design", "Micro-frontends"]
        },
        "Full Stack Development": {
            "Beginner": ["HTML/CSS", "JavaScript", "Basic Node.js", "SQL Basics"],
            "Intermediate": ["MERN Stack", "RESTful APIs", "Authentication", "Docker"],
            "Advanced": ["Microservices", "GraphQL", "CI/CD", "Cloud Architecture"]
        },
        "Data Science": {
            "Beginner": ["Python", "NumPy", "Pandas", "Math Basics"],
            "Intermediate": ["Statistics", "Machine Learning", "Data Visualization", "SQL"],
            "Advanced": ["Deep Learning", "MLOps", "Research Engineering", "Big Data"]
        },
        "NLP / AI": {
            "Beginner": ["Python for AI", "Prompt Engineering", "OpenAI APIs"],
            "Intermediate": ["Transformers", "LangChain", "RAG", "Vector DBs"],
            "Advanced": ["Fine Tuning", "Agent Systems", "LLM Infrastructure", "Optimization"]
        },
        "Backend / APIs": {
            "Beginner": ["Node.js / Python", "REST Basics", "SQL", "Git"],
            "Intermediate": ["Express/Django", "Database Design", "Caching", "Auth"],
            "Advanced": ["System Design", "Distributed Systems", "gRPC", "Kubernetes"]
        },
        "Cloud / DevOps": {
            "Beginner": ["Linux Basics", "Networking", "Bash Scripting"],
            "Intermediate": ["AWS/GCP/Azure", "Docker", "Terraform", "CI/CD"],
            "Advanced": ["Kubernetes", "Observability", "Site Reliability Engineering"]
        },
        "UI/UX Design": {
            "Beginner": ["Color Theory", "Typography", "Wireframing", "Figma Basics"],
            "Intermediate": ["Prototyping", "User Research", "Design Systems", "Accessibility"],
            "Advanced": ["UX Strategy", "Interaction Design", "Psychology in Design"]
        },
        "Mobile Development": {
            "Beginner": ["JavaScript / Dart", "Mobile UI Patterns", "State Management Basics"],
            "Intermediate": ["React Native / Flutter", "Native APIs", "Animations"],
            "Advanced": ["Native Modules", "App Profiling", "Offline First Architecture"]
        },
        "Cybersecurity": {
            "Beginner": ["Networking Concepts", "Linux Command Line", "Security Fundamentals"],
            "Intermediate": ["Penetration Testing", "Cryptography", "Web Security (OWASP)"],
            "Advanced": ["Reverse Engineering", "Malware Analysis", "Zero Trust Architecture"]
        },
        "Data Analytics": {
            "Beginner": ["Excel / Google Sheets", "SQL Basics", "Basic Statistics"],
            "Intermediate": ["Tableau / PowerBI", "Advanced SQL", "Python for Analytics"],
            "Advanced": ["Predictive Analytics", "Data Warehousing", "A/B Testing Strategies"]
        }
    };

    // ── Get Current User Data ──
    const currentEmail = localStorage.getItem('xyverra_user_email');
    if (!currentEmail) {
        window.location.href = 'login.html';
        return;
    }

    const usersDataObj = JSON.parse(localStorage.getItem('xyverra_users')) || {};
    const userData = usersDataObj[currentEmail] || {};

    const currentCategory = userData.path || "Not Selected";
    const currentLevel = userData.level || "Beginner";

    // ── Render Profile UI ──
    const renderProfile = () => {
        // Header
        const name = userData.name || "User Name";
        const initials = name.substring(0,2).toUpperCase();
        
        const avatarEl = document.getElementById('profile-avatar');
        if (avatarEl) avatarEl.textContent = initials;
        
        const globalAvatarEl = document.getElementById('global-user-avatar');
        if (globalAvatarEl) globalAvatarEl.textContent = initials;
        
        const nameEl = document.getElementById('profile-name');
        if (nameEl) nameEl.textContent = name;
        
        const globalNameEl = document.getElementById('global-user-name');
        if (globalNameEl) globalNameEl.textContent = name;
        
        const emailEl = document.getElementById('profile-email');
        if (emailEl) emailEl.innerHTML = `<i class="fas fa-envelope"></i> ${currentEmail}`;
    };

    renderProfile();

    // ── Save Helpers ──
    const saveUserData = () => {
        usersDataObj[currentEmail] = userData;
        localStorage.setItem('xyverra_users', JSON.stringify(usersDataObj));
        
        // Also update standard local variables for app compatibility
        localStorage.setItem('xyverra_user_name', userData.name);
        if (userData.path) localStorage.setItem('xyverra_selected_path', userData.path);
        if (userData.level) localStorage.setItem('userLevel', userData.level);
    };

    // ── Update Display Elements ──
    const updatePathDisplay = () => {
        const catEl = document.getElementById('display-category');
        if (catEl) catEl.textContent = userData.path || 'Not Selected';
        const lvlEl = document.getElementById('display-level');
        if (lvlEl) lvlEl.textContent = userData.level || 'Beginner';
    };
    updatePathDisplay();

    // ── Modals Logic ──
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const closeProfileModal = document.getElementById('close-profile-modal');
    const saveProfileBtn = document.getElementById('save-profile-btn');

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            document.getElementById('edit-name').value = userData.name || "";
            editProfileModal.classList.add('active');
        });
    }

    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', () => editProfileModal.classList.remove('active'));
    }

    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', () => {
            userData.name = document.getElementById('edit-name').value;
            
            saveUserData();
            renderProfile();
            editProfileModal.classList.remove('active');
            
            // Show toast if Toast API exists
            if (typeof showToast === 'function') {
                showToast('Profile updated successfully!', 'success');
            }
        });
    }

    // ── Learning Path Modal Logic ──
    const editLearningBtn = document.getElementById('edit-learning-btn');
    const editLearningModal = document.getElementById('edit-learning-modal');
    const closeLearningModal = document.getElementById('close-learning-modal');
    const saveLearningBtn = document.getElementById('save-learning-btn');

    if (editLearningBtn) {
        editLearningBtn.addEventListener('click', () => {
            document.getElementById('edit-category').value = userData.path || 'Web Development';
            document.getElementById('edit-level').value = userData.level || 'Beginner';
            editLearningModal.classList.add('active');
        });
    }

    if (closeLearningModal) {
        closeLearningModal.addEventListener('click', () => editLearningModal.classList.remove('active'));
    }

    if (saveLearningBtn) {
        saveLearningBtn.addEventListener('click', () => {
            const newPath = document.getElementById('edit-category').value;
            const newLevel = document.getElementById('edit-level').value;
            
            userData.path = newPath;
            userData.level = newLevel;
            
            saveUserData();
            updatePathDisplay();
            editLearningModal.classList.remove('active');
            
            if (typeof showToast === 'function') {
                showToast('Learning path updated!', 'success');
            }
        });
    }
});
