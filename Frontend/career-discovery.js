/* =========================================================
   career-discovery.js  –  3 steps, 9 questions, smart scoring
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const onboarded = localStorage.getItem('xyverra_onboarded') === 'true';
    const selectedPath = localStorage.getItem('xyverra_target_career') || localStorage.getItem('xyverra_selected_path');

    if (onboarded && selectedPath) {
        // Show enrolled state, hide assessment
        const enrolledState = document.getElementById('already-enrolled-state');
        const hero = document.querySelector('.assessment-hero');
        const card = document.querySelector('.assessment-card');
        
        if (enrolledState && hero && card) {
            enrolledState.style.display = 'block';
            hero.style.display = 'none';
            card.style.display = 'none';
            
            document.getElementById('current-enrolled-path').textContent = selectedPath;
            
            document.getElementById('retake-assessment-btn').addEventListener('click', () => {
                // Clear state and reload to retake
                localStorage.removeItem('xyverra_onboarded');
                localStorage.removeItem('xyverra_target_career');
                localStorage.removeItem('xyverra_selected_path');
                window.location.reload();
            });
        }
        return; // Stop running the rest of the assessment logic
    }

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

    /* ── Rule-based fallback scoring (used if AI call fails) ── */
    function runRuleBasedScoring(ans) {
        const sc = {
            'Web Development': 0, 'UI/UX Design': 0, 'Data Science': 0,
            'Machine Learning': 0, 'Cybersecurity': 0, 'Cloud / DevOps': 0,
            'Backend / APIs': 0, 'Mobile Development': 0,
        };
        const { q1, q2, q3, q4, q5, q6, q7, q8, q9 } = ans;
        if (q1 === 'systems')  { sc['Backend / APIs'] += 3; sc['Cloud / DevOps'] += 3; }
        if (q1 === 'creative') { sc['UI/UX Design'] += 4; sc['Web Development'] += 2; }
        if (q1 === 'data')     { sc['Data Science'] += 4; sc['Machine Learning'] += 3; }
        if (q1 === 'security') { sc['Cybersecurity'] += 5; }
        if (q2 === 'creative')  { sc['UI/UX Design'] += 3; sc['Web Development'] += 2; }
        if (q2 === 'logical')   { sc['Backend / APIs'] += 2; sc['Data Science'] += 2; sc['Machine Learning'] += 2; }
        if (q2 === 'balanced')  { sc['Web Development'] += 3; sc['Mobile Development'] += 2; }
        if (q2 === 'systems')   { sc['Cloud / DevOps'] += 3; sc['Backend / APIs'] += 2; }
        if (q3 === 'high')     { sc['Machine Learning'] += 3; sc['Data Science'] += 2; }
        if (q3 === 'somewhat') { sc['Data Science'] += 1; sc['Cybersecurity'] += 1; }
        if (q3 === 'low')      { sc['UI/UX Design'] += 2; sc['Web Development'] += 2; }
        if (q4 === 'team')        { sc['Web Development'] += 1; sc['UI/UX Design'] += 1; }
        if (q4 === 'independent') { sc['Machine Learning'] += 1; sc['Cybersecurity'] += 1; }
        if (q5 === 'high')     { sc['Cloud / DevOps'] += 3; sc['Backend / APIs'] += 2; }
        if (q5 === 'somewhat') { sc['Backend / APIs'] += 1; }
        if (q6 === 'high')     { sc['Cloud / DevOps'] += 4; }
        if (q6 === 'somewhat') { sc['Cloud / DevOps'] += 1; sc['Backend / APIs'] += 1; }
        if (q6 === 'low')      { sc['Web Development'] += 1; sc['Mobile Development'] += 1; }
        if (q7 === 'fast_job')           { sc['Web Development'] += 2; sc['Cloud / DevOps'] += 1; }
        if (q7 === 'high_salary')        { sc['Machine Learning'] += 2; sc['Cloud / DevOps'] += 2; sc['Cybersecurity'] += 2; }
        if (q7 === 'deep_skill')         { sc['Machine Learning'] += 2; sc['Cybersecurity'] += 2; }
        if (q7 === 'creative_portfolio') { sc['UI/UX Design'] += 3; sc['Web Development'] += 2; }
        if (q8 === 'full' || q8 === '20h') { sc['Machine Learning'] += 1; sc['Cybersecurity'] += 1; sc['Cloud / DevOps'] += 1; }
        if (q8 === '5h') { sc['Web Development'] += 1; sc['UI/UX Design'] += 1; }
        if (q9 === 'app')           { sc['Web Development'] += 3; sc['Mobile Development'] += 3; }
        if (q9 === 'ai_product')    { sc['Machine Learning'] += 4; sc['Data Science'] += 2; }
        if (q9 === 'secure_system') { sc['Cybersecurity'] += 3; sc['Backend / APIs'] += 2; }
        if (q9 === 'data_dashboard') { sc['Data Science'] += 3; sc['Machine Learning'] += 1; }
        return sc;
    }

    /* ── Submit: AI-powered → top 3 paths, with rule-based fallback ── */
    submitBtn.addEventListener('click', async () => {
        const answers = {};
        document.querySelectorAll('input[type="radio"]:checked').forEach(r => {
            answers[r.name] = r.value;
        });
        localStorage.setItem('xyverra_career_assessment', JSON.stringify(answers));

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing your profile...';
        submitBtn.disabled = true;

        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        let ranked = null;
        let aiRecommendations = null;

        // ── Try AI-powered recommendation ──
        if (token) {
            try {
                const _base = (window.XYVERRA_CONFIG?.API_BASE || 'http://localhost:5000');
                const res = await fetch(`${_base}/api/ai/recommend-career`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ answers })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && Array.isArray(data.recommendations) && data.recommendations.length > 0) {
                        aiRecommendations = data.recommendations;
                        ranked = aiRecommendations.map(r => r.career);
                    }
                }
            } catch (e) {
                console.warn('AI recommendation failed, using fallback:', e.message);
            }
        }

        // ── Fallback: rule-based scoring ──
        if (!ranked) {
            const scores = runRuleBasedScoring(answers);
            ranked = Object.entries(scores)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([path]) => path);
            localStorage.setItem('xyverra_career_scores', JSON.stringify(scores));
        }

        // ── Save to localStorage ──
        localStorage.setItem('xyverra_recommended_paths', JSON.stringify(ranked));
        localStorage.setItem('xyverra_top_recommendation', ranked[0]);
        if (aiRecommendations) {
            localStorage.setItem('xyverra_ai_recommendations', JSON.stringify(aiRecommendations));
        } else {
            localStorage.removeItem('xyverra_ai_recommendations');
        }

        // ── Persist to backend so results survive across devices and are admin-visible ──
        if (token) {
            try {
                await fetch(`${_base}/api/user/save-career-assessment`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({
                        answers,
                        recommendedCareers: aiRecommendations || ranked.map(career => ({ career, match: null, reason: null }))
                    })
                });
            } catch (e) {
                console.warn('Failed to persist career assessment to server:', e.message);
            }
        }

        window.location.href = 'career-recommendation.html';
    });

    updateUI();
});

