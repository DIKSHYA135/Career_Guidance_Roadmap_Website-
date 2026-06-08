/* =========================================================
   career-discovery.js
   Logic for the multi-step career assessment form
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if user already has an active roadmap
    if (localStorage.getItem('roadmapGenerated') === 'true' || localStorage.getItem('xyverra_onboarded') === 'true') {
        const targetCareer = localStorage.getItem('xyverra_target_career') || localStorage.getItem('xyverra_selected_path') || 'chosen';
        const container = document.querySelector('.dashboard-container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 5rem 2rem; background: white; border-radius: var(--radius-2xl); border: 1px solid var(--border); max-width: 600px; margin: 4rem auto; box-shadow: var(--shadow-sm);">
                    <div style="font-size: 3.5rem; margin-bottom: 1.5rem;">🎯</div>
                    <h2 style="font-size: 1.8rem; color: var(--text-dark); margin-bottom: 1rem; font-weight: 800;">You are on the ${targetCareer} path!</h2>
                    <p style="color: var(--text-muted); margin-bottom: 2.5rem; font-size: 1.05rem; line-height: 1.6;">You've already generated your active learning roadmap. Please focus on completing your current path before starting a new discovery session.</p>
                    <a href="roadmap.html" class="btn btn-primary" style="padding: 14px 32px; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                        Return to Roadmap <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
        }
        return; // Halt further logic
    }

    let currentStep = 1;
    const totalSteps = 4;

    const steps = document.querySelectorAll('.assessment-step');
    const stepIndicators = document.querySelectorAll('.step');
    const progressBar = document.getElementById('assessment-progress-bar');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Handle radio button selections
    document.querySelectorAll('.option-label input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            // Remove selected class from siblings
            const name = e.target.name;
            document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                r.closest('.option-label').classList.remove('selected');
            });
            // Add selected class to chosen
            e.target.closest('.option-label').classList.add('selected');
            validateStep();
        });
    });

    function validateStep() {
        const currentContainer = document.getElementById(`step-${currentStep}`);
        const questions = currentContainer.querySelectorAll('.question-container');
        let allAnswered = true;

        questions.forEach(q => {
            const inputs = q.querySelectorAll('input[type="radio"]');
            const answered = Array.from(inputs).some(input => input.checked);
            if (!answered) allAnswered = false;
        });

        if (currentStep === totalSteps) {
            submitBtn.disabled = !allAnswered;
        } else {
            nextBtn.disabled = !allAnswered;
        }
    }

    function updateUI() {
        // Update steps visibility
        steps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.classList.add('active-step');
            } else {
                step.classList.remove('active-step');
            }
        });

        // Update progress indicators
        stepIndicators.forEach((indicator, index) => {
            if (index + 1 <= currentStep) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Update progress bar
        progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;

        // Update buttons
        if (currentStep === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
        }

        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }

        validateStep();
    }

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateUI();
        }
    });

    submitBtn.addEventListener('click', () => {
        // Collect answers
        const answers = {};
        document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
            answers[radio.name] = radio.value;
        });

        // Save to localStorage to use on the next page
        localStorage.setItem('xyverra_career_assessment', JSON.stringify(answers));

        // Redirect to recommendations
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            window.location.href = 'career-recommendation.html';
        }, 1200);
    });

    // Initialize
    updateUI();
});
