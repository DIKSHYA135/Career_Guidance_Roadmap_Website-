/* =========================================================
   career-discovery.js
   Logic for the multi-step career assessment form
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
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
