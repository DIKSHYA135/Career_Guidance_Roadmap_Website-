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

    // Ensure structures exist
    if (!userData.profile) {
        userData.profile = { picture: '', fullName: userData.name || '', username: currentEmail.split('@')[0], bio: '', learningGoal: '' };
    }
    if (!userData.progress) {
        userData.progress = { modulesCompleted: 0, coursesCompleted: 0, learningStreak: 0, totalLearningHours: 0, certificatesEarned: 0, roadmapsGenerated: 0 };
    }
    if (!userData.roadmapHistory) {
        userData.roadmapHistory = [];
    }

    const currentCategory = userData.path || "Not Selected";
    const currentLevel = userData.level || "Beginner";

    // ── Render Profile UI ──
    const renderProfile = () => {
        // Header
        const initials = userData.profile.fullName ? userData.profile.fullName.substring(0,2).toUpperCase() : 'U';
        document.getElementById('profile-avatar').textContent = initials;
        document.getElementById('global-user-avatar').textContent = initials;
        
        document.getElementById('profile-name').textContent = userData.profile.fullName || "User Name";
        document.getElementById('global-user-name').textContent = userData.profile.fullName || "User Name";
        
        document.getElementById('profile-username').textContent = '@' + userData.profile.username;
        document.getElementById('profile-email').innerHTML = `<i class="fas fa-envelope"></i> ${currentEmail}`;
        document.getElementById('profile-bio').textContent = userData.profile.bio || "No bio added yet.";
        document.getElementById('profile-goal').textContent = userData.profile.learningGoal || "No specific goal set.";

        // Learning Overview
        document.getElementById('profile-category').textContent = userData.path || "Not Selected";
        document.getElementById('profile-level').textContent = userData.level || "Beginner";
        document.getElementById('profile-module').textContent = "Introduction" // Placeholder

        // Stats
        document.getElementById('stat-modules').textContent = userData.progress.modulesCompleted;
        document.getElementById('stat-streak').textContent = userData.streak || userData.progress.learningStreak || 0;
        document.getElementById('stat-certs').textContent = userData.progress.certificatesEarned;
        document.getElementById('stat-roadmaps').textContent = userData.roadmapHistory.length;

        // Dynamic Skills
        document.getElementById('skills-badge').textContent = userData.level || "Beginner";
        document.getElementById('skills-category-text').textContent = userData.path || "Category";
        document.getElementById('skills-level-text').textContent = userData.level || "Beginner";

        const skillsContainer = document.getElementById('profile-skills-container');
        skillsContainer.innerHTML = '';
        
        if (userData.path && SKILLS_MAP[userData.path] && SKILLS_MAP[userData.path][userData.level]) {
            const skills = SKILLS_MAP[userData.path][userData.level];
            skills.forEach(skill => {
                const pill = document.createElement('div');
                pill.className = 'skill-pill';
                pill.textContent = skill;
                skillsContainer.appendChild(pill);
            });
        } else {
            skillsContainer.innerHTML = '<p class="text-muted" style="width: 100%;">Select a category and level to see skills.</p>';
        }

        // Roadmap History
        const historyList = document.getElementById('roadmap-history-list');
        if (userData.roadmapHistory.length > 0) {
            historyList.innerHTML = '';
            userData.roadmapHistory.forEach(rm => {
                const item = document.createElement('div');
                item.className = 'history-card-item';
                
                const dateString = new Date(rm.date).toLocaleDateString();
                const statusClass = rm.status === 'Completed' ? 'status-completed' : 'status-progress';
                
                item.innerHTML = `
                    <div class="history-info">
                        <h4>${rm.name}</h4>
                        <div class="history-meta">${rm.category} • ${rm.level} • Generated: ${dateString}</div>
                    </div>
                    <div class="history-status ${statusClass}">${rm.status}</div>
                `;
                historyList.appendChild(item);
            });
        }
    };

    renderProfile();

    // ── Save Helpers ──
    const saveUserData = () => {
        usersDataObj[currentEmail] = userData;
        localStorage.setItem('xyverra_users', JSON.stringify(usersDataObj));
        
        // Also update standard local variables for app compatibility
        localStorage.setItem('xyverra_user_name', userData.profile.fullName);
        if (userData.path) localStorage.setItem('xyverra_selected_path', userData.path);
        if (userData.level) localStorage.setItem('userLevel', userData.level);
    };

    // ── Modals Logic ──
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const closeProfileModal = document.getElementById('close-profile-modal');
    const saveProfileBtn = document.getElementById('save-profile-btn');

    editProfileBtn.addEventListener('click', () => {
        document.getElementById('edit-name').value = userData.profile.fullName;
        document.getElementById('edit-bio').value = userData.profile.bio;
        document.getElementById('edit-goal').value = userData.profile.learningGoal;
        editProfileModal.classList.add('active');
    });

    closeProfileModal.addEventListener('click', () => editProfileModal.classList.remove('active'));

    saveProfileBtn.addEventListener('click', () => {
        userData.profile.fullName = document.getElementById('edit-name').value;
        userData.profile.bio = document.getElementById('edit-bio').value;
        userData.profile.learningGoal = document.getElementById('edit-goal').value;
        
        saveUserData();
        renderProfile();
        editProfileModal.classList.remove('active');
    });

    const editLearningBtn = document.getElementById('edit-learning-btn');
    const editLearningModal = document.getElementById('edit-learning-modal');
    const closeLearningModal = document.getElementById('close-learning-modal');
    const saveLearningBtn = document.getElementById('save-learning-btn');

    editLearningBtn.addEventListener('click', () => {
        const catSelect = document.getElementById('edit-category');
        const lvlSelect = document.getElementById('edit-level');
        
        if (userData.path) catSelect.value = userData.path;
        if (userData.level) lvlSelect.value = userData.level;
        
        editLearningModal.classList.add('active');
    });

    closeLearningModal.addEventListener('click', () => editLearningModal.classList.remove('active'));

    saveLearningBtn.addEventListener('click', () => {
        userData.path = document.getElementById('edit-category').value;
        userData.level = document.getElementById('edit-level').value;
        
        saveUserData();
        renderProfile();
        editLearningModal.classList.remove('active');
    });
});
