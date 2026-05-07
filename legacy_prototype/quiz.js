// Quiz JS
document.addEventListener("DOMContentLoaded", () => {
    let quizTimerInterval;
    let timeLeft = 20;
    let quizPhase = 'read'; // 'read' or 'answer'
    
    const quizQuestionTxt = document.getElementById('quiz-question');
    const quizOptionsCont = document.getElementById('quiz-options-container');
    const timerText = document.getElementById('timer-text');
    const quizStatus = document.getElementById('quiz-status');
    const btnNextQuestion = document.getElementById('btn-next-question');
    const btnExitQuiz = document.getElementById('btn-exit-quiz');

    btnExitQuiz.addEventListener('click', () => {
        clearInterval(quizTimerInterval);
        window.location.href = 'progress.html';
    });

    btnNextQuestion.addEventListener('click', () => {
        startQuizCycle();
    });

    function startQuizCycle() {
        clearInterval(quizTimerInterval);
        quizPhase = 'read';
        timeLeft = 20; 
        
        // Reset styles and UI for new problem
        quizOptionsCont.innerHTML = `
            <div class="quiz-option" data-correct="false">To style the webpage elements faster.</div>
            <div class="quiz-option" data-correct="true">To provide meaning to the structure for browsers and screen readers.</div>
            <div class="quiz-option" data-correct="false">To execute JavaScript code locally on the client.</div>
            <div class="quiz-option" data-correct="false">To connect directly to a server database.</div>
        `;
        quizOptionsCont.classList.add('disabled');
        btnNextQuestion.style.display = 'none';
        
        quizStatus.textContent = "Read the question carefully. Answer options will unlock shortly.";
        quizStatus.className = "warning";
        quizStatus.style.color = "#f59e0b"; // Warning color
        timerText.textContent = `20s Reading Time`;
    
        quizTimerInterval = setInterval(updateQuizTimer, 1000);
    }
    
    function updateQuizTimer() {
        timeLeft--;
        
        if (quizPhase === 'read') {
            timerText.textContent = `${timeLeft}s Reading Time`;
            if (timeLeft <= 0) {
                quizPhase = 'answer';
                timeLeft = 20; // reset to 20s for answering
                quizOptionsCont.classList.remove('disabled');
                quizStatus.textContent = "Time to answer! Select an option.";
                quizStatus.style.color = "var(--text-dark)";
                attachQuizListeners();
            }
        } else if (quizPhase === 'answer') {
            timerText.textContent = `${timeLeft}s to Answer`;
            if (timeLeft <= 0) {
                clearInterval(quizTimerInterval);
                handleQuizTimeout();
            }
        }
    }
    
    function attachQuizListeners() {
        const options = quizOptionsCont.querySelectorAll('.quiz-option');
        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                if (quizOptionsCont.classList.contains('disabled')) return;
                handleQuizSelection(e.target);
            });
        });
    }
    
    function handleQuizSelection(selectedElement) {
        clearInterval(quizTimerInterval);
        quizOptionsCont.classList.add('disabled'); 
        
        const isCorrect = selectedElement.getAttribute('data-correct') === 'true';
        
        if (isCorrect) {
            selectedElement.classList.add('correct');
            selectedElement.innerHTML += ' <i class="fas fa-check-circle" style="color:#16a34a;"></i>';
            quizStatus.textContent = "Correct! Well done.";
            quizStatus.style.color = "var(--success)";
        } else {
            selectedElement.classList.add('wrong');
            selectedElement.innerHTML += ' <i class="fas fa-times-circle" style="color:var(--error);"></i>';
            quizStatus.textContent = "Incorrect. Review the module materials.";
            quizStatus.style.color = "var(--error)";
            
            // Highlight the correct answer as well
            const correctOpt = quizOptionsCont.querySelector('[data-correct="true"]');
            if (correctOpt) {
                correctOpt.classList.add('correct');
                correctOpt.innerHTML += ' <i class="fas fa-check-circle" style="color:#16a34a;"></i>';
            }
        }
        
        btnNextQuestion.style.display = 'block';
    }
    
    function handleQuizTimeout() {
        quizOptionsCont.classList.add('disabled');
        quizStatus.textContent = "Time's up!";
        quizStatus.style.color = "var(--error)";
        
        const correctOpt = quizOptionsCont.querySelector('[data-correct="true"]');
        if (correctOpt) {
            correctOpt.classList.add('correct');
            correctOpt.innerHTML += ' <i class="fas fa-check-circle" style="color:#16a34a;"></i>';
        }
        btnNextQuestion.style.display = 'block';
    }

    // Initialize first cycle
    startQuizCycle();
});
