/* =========================================================
   career-discovery.js  –  3 steps, 9 questions, smart scoring
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    let currentStep = 1;
    const totalSteps = 3;

    const steps         = document.querySelectorAll('.assessment-step');
    const stepDots      = document.querySelectorAll('.step');
    const progressBar   = document.getElementById('assessment-progress-bar');
    const prevBtn       = document.getElementById('prev-btn');
    const nextBtn       = document.getElementById('next-btn');
    const submitBtn     = document.getElementById('submit-btn');

    /* ── Radio selection highlight ── */
    document.querySelectorAll('.option-label input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const name = e.target.name;
            document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                r.closest('.option-label').classList.remove('selected');
            });
            e.target.closest('.option-label').classList.add('selected');
            validateStep();
        });
    });

    /* ── Validate current step ── */
    function validateStep() {
        const stepEl    = document.getElementById(`step-${currentStep}`);
        const questions = stepEl.querySelectorAll('.question-container');
        let allAnswered = true;

        questions.forEach(q => {
            const inputs   = q.querySelectorAll('input[type="radio"]');
            const answered = Array.from(inputs).some(i => i.checked);
            if (!answered) allAnswered = false;
        });

        if (currentStep === totalSteps) {
            submitBtn.disabled = !allAnswered;
        } else {
            nextBtn.disabled = !allAnswered;
        }
    }

    /* ── Update UI ── */
    function updateUI() {
        steps.forEach((s, i) => s.classList.toggle('active-step', i + 1 === currentStep));

        stepDots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i + 1 <= currentStep) dot.classList.add('active');
        });

        progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;

        prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';

        if (currentStep === totalSteps) {
            nextBtn.style.display   = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display   = 'inline-flex';
            submitBtn.style.display = 'none';
        }

        validateStep();
    }

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) { 
            currentStep--; 
            updateUI(); 
            setTimeout(() => {
                const card = document.querySelector('.assessment-card');
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 10);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) { 
            currentStep++; 
            updateUI(); 
            setTimeout(() => {
                const card = document.querySelector('.assessment-card');
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 10);
        }
    });

    /* ── Submit: smart scoring → top 3 paths ── */
    submitBtn.addEventListener('click', () => {
        const answers = {};
        document.querySelectorAll('input[type="radio"]:checked').forEach(r => {
            answers[r.name] = r.value;
        });
        localStorage.setItem('xyverra_career_assessment', JSON.stringify(answers));

        /* ── Scoring table ── */
        const scores = {
            'Web Development':     0,
            'UI/UX Design':        0,
            'Data Science':        0,
            'Machine Learning':    0,
            'Cybersecurity':       0,
            'Cloud / DevOps':      0,
            'Backend Development': 0,
            'Mobile Development':  0,
        };

        const { q1, q2, q3, q4, q5, q6, q7, q8, q9 } = answers;

        // Q1 – primary interest
        if (q1 === 'systems')  { scores['Backend Development'] += 3; scores['Cloud / DevOps'] += 3; }
        if (q1 === 'creative') { scores['UI/UX Design'] += 4; scores['Web Development'] += 2; }
        if (q1 === 'data')     { scores['Data Science'] += 4; scores['Machine Learning'] += 3; }
        if (q1 === 'security') { scores['Cybersecurity'] += 5; }

        // Q2 – visual vs logical
        if (q2 === 'creative')  { scores['UI/UX Design'] += 3; scores['Web Development'] += 2; }
        if (q2 === 'logical')   { scores['Backend Development'] += 2; scores['Data Science'] += 2; scores['Machine Learning'] += 2; }
        if (q2 === 'balanced')  { scores['Web Development'] += 3; scores['Mobile Development'] += 2; }
        if (q2 === 'systems')   { scores['Cloud / DevOps'] += 3; scores['Backend Development'] += 2; }

        // Q3 – math comfort
        if (q3 === 'high')     { scores['Machine Learning'] += 3; scores['Data Science'] += 2; }
        if (q3 === 'somewhat') { scores['Data Science'] += 1; scores['Cybersecurity'] += 1; }
        if (q3 === 'low')      { scores['UI/UX Design'] += 2; scores['Web Development'] += 2; }

        // Q4 – teamwork
        if (q4 === 'team')        { scores['Web Development'] += 1; scores['UI/UX Design'] += 1; }
        if (q4 === 'independent') { scores['Machine Learning'] += 1; scores['Cybersecurity'] += 1; }

        // Q5 – automation interest
        if (q5 === 'high')     { scores['Cloud / DevOps'] += 3; scores['Backend Development'] += 2; }
        if (q5 === 'somewhat') { scores['Backend Development'] += 1; }

        // Q6 – DevOps interest
        if (q6 === 'high')     { scores['Cloud / DevOps'] += 4; }
        if (q6 === 'somewhat') { scores['Cloud / DevOps'] += 1; scores['Backend Development'] += 1; }
        if (q6 === 'low')      { scores['Web Development'] += 1; scores['Mobile Development'] += 1; }

        // Q7 – primary goal
        if (q7 === 'fast_job')          { scores['Web Development'] += 2; scores['Cloud / DevOps'] += 1; }
        if (q7 === 'high_salary')       { scores['Machine Learning'] += 2; scores['Cloud / DevOps'] += 2; scores['Cybersecurity'] += 2; }
        if (q7 === 'deep_skill')        { scores['Machine Learning'] += 2; scores['Cybersecurity'] += 2; }
        if (q7 === 'creative_portfolio') { scores['UI/UX Design'] += 3; scores['Web Development'] += 2; }

        // Q8 – time commitment
        if (q8 === 'full' || q8 === '20h') {
            scores['Machine Learning'] += 1; scores['Cybersecurity'] += 1; scores['Cloud / DevOps'] += 1;
        }
        if (q8 === '5h') { scores['Web Development'] += 1; scores['UI/UX Design'] += 1; }

        // Q9 – product type
        if (q9 === 'app')           { scores['Web Development'] += 3; scores['Mobile Development'] += 3; }
        if (q9 === 'ai_product')    { scores['Machine Learning'] += 4; scores['Data Science'] += 2; }
        if (q9 === 'secure_system') { scores['Cybersecurity'] += 3; scores['Backend Development'] += 2; }
        if (q9 === 'data_dashboard') { scores['Data Science'] += 3; scores['Machine Learning'] += 1; }

        // Pick top 3
        const ranked = Object.entries(scores)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([path]) => path);

        localStorage.setItem('xyverra_recommended_paths', JSON.stringify(ranked));
        localStorage.setItem('xyverra_top_recommendation', ranked[0]);

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing your profile...';
        submitBtn.disabled = true;

        setTimeout(() => { window.location.href = 'career-recommendation.html'; }, 1000);
    });

    updateUI();
});
