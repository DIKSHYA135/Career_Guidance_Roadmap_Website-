/* =========================================================
   career-details.js  – Populates the career details page
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const careerId = localStorage.getItem('xyverra_selected_career_detail') || 'ai-engineer';

    const db = {
        'ai-engineer': {
            icon: '🤖',
            title: 'AI Engineer',
            subtitle: 'Build the systems that make machines think, from natural language to computer vision.',
            heroBg: 'linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%)',
            badges: ['94% Match', '$120k–$185k', 'Very High Demand'],
            roles: [
                'Design and develop scalable machine learning models for production environments.',
                'Train and fine-tune deep neural networks (CNNs, Transformers, RNNs) for specific use cases.',
                'Deploy AI solutions using Docker, Kubernetes, and cloud infrastructure (AWS/GCP/Azure).',
                'Collaborate with Data Scientists to transition research prototypes into production-grade systems.',
                'Monitor model performance and implement continuous improvement pipelines.',
                'Evaluate and integrate third-party AI APIs and pre-trained foundation models.'
            ],
            growth: [
                { title: 'Junior AI Engineer (0–2 yrs)', desc: 'Data pre-processing, basic model training, and exploratory work.' },
                { title: 'Mid-Level AI Engineer (2–5 yrs)', desc: 'Own model architecture and own the full deployment pipeline.' },
                { title: 'Lead AI Engineer (5+ yrs)', desc: 'Architect entire AI systems, define standards, mentor junior engineers.' },
                { title: 'Head of AI / Chief AI Officer (10+ yrs)', desc: 'Drive AI product strategy and innovation at the executive level.' }
            ],
            techSkills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Docker', 'REST APIs', 'AWS / GCP', 'SQL', 'Git'],
            softSkills: ['Analytical Thinking', 'Problem Solving', 'Communication', 'Continuous Learning', 'Attention to Detail'],
            opportunities: '350,000+',
            targetPath: 'NLP / AI'
        },
        'data-scientist': {
            icon: '📊',
            title: 'Data Scientist',
            subtitle: 'Turn petabytes of raw data into strategic decisions that change the direction of companies.',
            heroBg: 'linear-gradient(135deg, #0369A1 0%, #0891B2 100%)',
            badges: ['88% Match', '$110k–$165k', 'High Demand'],
            roles: [
                'Perform exploratory data analysis (EDA) on large, complex datasets.',
                'Build and validate predictive models using statistical and ML techniques.',
                'Create compelling data visualizations and dashboards for stakeholders.',
                'Design and evaluate A/B experiments to optimize product features.',
                'Collaborate with engineering teams to productionize models.',
                'Communicate findings clearly to non-technical stakeholders.'
            ],
            growth: [
                { title: 'Data Analyst (0–2 yrs)', desc: 'Reporting, dashboarding, and basic SQL-driven insights.' },
                { title: 'Data Scientist (2–5 yrs)', desc: 'Build predictive models and complex data pipelines.' },
                { title: 'Senior Data Scientist (5+ yrs)', desc: 'Lead projects, mentor others, define data strategy.' },
                { title: 'VP of Data / CDO (10+ yrs)', desc: 'Set enterprise-wide data vision and governance.' }
            ],
            techSkills: ['Python', 'R', 'SQL', 'Tableau', 'Pandas', 'Scikit-Learn', 'NumPy', 'Spark', 'Git'],
            softSkills: ['Business Acumen', 'Storytelling', 'Critical Thinking', 'Curiosity', 'Stakeholder Management'],
            opportunities: '280,000+',
            targetPath: 'Data Science'
        },
        'ui-ux-designer': {
            icon: '🎨',
            title: 'UI/UX Designer',
            subtitle: 'Craft digital experiences that feel effortless, at the intersection of psychology, art, and technology.',
            heroBg: 'linear-gradient(135deg, #DB2777 0%, #EA580C 100%)',
            badges: ['76% Match', '$85k–$135k', 'High Demand'],
            roles: [
                'Conduct user research, interviews, and usability testing sessions.',
                'Create wireframes, storyboards, and user flow diagrams.',
                'Design high-fidelity mockups and interactive prototypes in Figma.',
                'Establish and maintain design systems, component libraries, and UI kits.',
                'Collaborate with developers to ensure pixel-perfect implementation.',
                'Iterate on designs based on user feedback and analytics data.'
            ],
            growth: [
                { title: 'Junior Designer (0–2 yrs)', desc: 'UI tasks, wireframing, and assisting senior designers.' },
                { title: 'UX/UI Designer (2–5 yrs)', desc: 'Own end-to-end design for product features independently.' },
                { title: 'Lead Product Designer (5+ yrs)', desc: 'Define design direction for entire products and platforms.' },
                { title: 'Creative Director (10+ yrs)', desc: 'Oversee brand identity and the full product design strategy.' }
            ],
            techSkills: ['Figma', 'Adobe XD', 'Adobe Illustrator', 'Prototyping', 'HTML/CSS Basics', 'Zeplin', 'InVision'],
            softSkills: ['Empathy', 'Communication', 'Receptiveness to Feedback', 'Collaboration', 'Creative Problem Solving'],
            opportunities: '150,000+',
            targetPath: 'UI/UX Design'
        },
        'full-stack-dev': {
            icon: '💻',
            title: 'Full Stack Developer',
            subtitle: 'Build complete web applications from the database to the user interface, end to end.',
            heroBg: 'linear-gradient(135deg, #059669 0%, #0284C7 100%)',
            badges: ['82% Match', '$100k–$155k', 'High Demand'],
            roles: [
                'Build and maintain both front-end and back-end components of web applications.',
                'Design and consume RESTful and GraphQL APIs.',
                'Architect scalable databases (SQL and NoSQL).',
                'Implement authentication, authorization, and security best practices.',
                'Optimize applications for performance, scalability, and SEO.',
                'Collaborate with designers and product managers in agile sprints.'
            ],
            growth: [
                { title: 'Junior Developer (0–2 yrs)', desc: 'Bug fixes, small features, and learning codebases.' },
                { title: 'Mid-Level Developer (2–5 yrs)', desc: 'Own significant features and lead code reviews.' },
                { title: 'Senior Developer (5+ yrs)', desc: 'Architect systems and mentor junior team members.' },
                { title: 'Engineering Manager / CTO (10+ yrs)', desc: 'Lead engineering departments and technology strategy.' }
            ],
            techSkills: ['React', 'Node.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Git', 'Docker', 'TypeScript'],
            softSkills: ['Problem Solving', 'Communication', 'Adaptability', 'Attention to Detail', 'Teamwork'],
            opportunities: '400,000+',
            targetPath: 'Full Stack Development'
        },
        'cloud-engineer': {
            icon: '☁️',
            title: 'Cloud / DevOps Engineer',
            subtitle: 'Design and operate the invisible backbone that keeps modern software running reliably at scale.',
            heroBg: 'linear-gradient(135deg, #374151 0%, #1D4ED8 100%)',
            badges: ['71% Match', '$115k–$170k', 'Very High Demand'],
            roles: [
                'Design, implement, and manage cloud infrastructure (AWS, GCP, Azure).',
                'Build and maintain CI/CD pipelines for automated deployments.',
                'Containerise applications using Docker and orchestrate with Kubernetes.',
                'Monitor system reliability, uptime, and respond to incidents.',
                'Implement security best practices and cloud compliance policies.',
                'Optimise infrastructure cost and performance continuously.'
            ],
            growth: [
                { title: 'Junior DevOps Engineer (0–2 yrs)', desc: 'Manage deployments, write basic automation scripts.' },
                { title: 'DevOps / Cloud Engineer (2–5 yrs)', desc: 'Own CI/CD pipelines and cloud resource management.' },
                { title: 'Senior Cloud Architect (5+ yrs)', desc: 'Design multi-region, high-availability cloud systems.' },
                { title: 'VP of Engineering / CTO (10+ yrs)', desc: 'Define infrastructure and platform strategy at scale.' }
            ],
            techSkills: ['AWS / GCP / Azure', 'Terraform', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Bash/Python', 'Monitoring'],
            softSkills: ['Systematic Thinking', 'Incident Management', 'Documentation', 'Proactive Communication', 'Resilience'],
            opportunities: '290,000+',
            targetPath: 'Cloud / DevOps'
        }
    };

    const career = db[careerId] || db['ai-engineer'];

    // Populate hero
    document.getElementById('hero-icon').textContent = career.icon;
    document.getElementById('cd-title').textContent = career.title;
    document.getElementById('cd-subtitle').textContent = career.subtitle;
    document.getElementById('details-hero').style.background = career.heroBg;
    document.getElementById('hero-badges').innerHTML = career.badges
        .map(b => `<span class="hero-badge">${b}</span>`).join('');

    // Roles
    document.getElementById('cd-roles').innerHTML = career.roles
        .map(r => `<li>${r}</li>`).join('');

    // Growth timeline
    document.getElementById('cd-growth').innerHTML = career.growth
        .map(g => `
            <div class="growth-step">
                <h4>${g.title}</h4>
                <p>${g.desc}</p>
            </div>
        `).join('');

    // Skills
    document.getElementById('cd-tech-skills').innerHTML = career.techSkills
        .map(s => `<span class="skill-tag">${s}</span>`).join('');
    document.getElementById('cd-soft-skills').innerHTML = career.softSkills
        .map(s => `<span class="skill-tag">${s}</span>`).join('');

    // Opportunities
    document.getElementById('cd-opportunities').textContent = career.opportunities;

    // Roadmap CTA
    const startBtn = document.getElementById('generate-roadmap-btn');
    startBtn.addEventListener('click', () => {
        localStorage.setItem('xyverra_selected_path', career.targetPath);
        localStorage.setItem('xyverra_target_career', career.title);
        localStorage.setItem('xyverra_onboarded', 'true');
        localStorage.setItem('userLevel', 'Beginner');

        startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Setting up roadmap...';
        startBtn.disabled = true;

        setTimeout(() => {
            window.location.href = 'roadmap.html';
        }, 800);
    });
});
