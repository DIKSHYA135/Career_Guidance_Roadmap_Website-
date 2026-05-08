// Quiz JS
document.addEventListener("DOMContentLoaded", () => {
    let quizTimerInterval;
    let timeLeft = 20;
    let quizPhase = 'read'; // 'read' or 'answer'
    let currentQuestionIndex = 0;
    
    const quizQuestionTxt = document.getElementById('quiz-question');
    const quizOptionsCont = document.getElementById('quiz-options-container');
    const timerText = document.getElementById('timer-text');
    const quizStatus = document.getElementById('quiz-status');
    const btnNextQuestion = document.getElementById('btn-next-question');
    const btnExitQuiz = document.getElementById('btn-exit-quiz');

    const questions = [
        {
            q: "What is the primary purpose of semantic HTML tags?",
            opts: [
                { text: "To style the webpage elements faster.", correct: false },
                { text: "To provide meaning to the structure for browsers and screen readers.", correct: true },
                { text: "To execute JavaScript code locally on the client.", correct: false },
                { text: "To connect directly to a server database.", correct: false }
            ]
        },
        {
            q: "Which property is used in CSS to change the background color?",
            opts: [
                { text: "bgcolor", correct: false },
                { text: "color", correct: false },
                { text: "background-color", correct: true },
                { text: "bg-color", correct: false }
            ]
        },
        {
            q: "How do you write 'Hello World' in an alert box in JavaScript?",
            opts: [
                { text: "msg('Hello World');", correct: false },
                { text: "alertBox('Hello World');", correct: false },
                { text: "msgBox('Hello World');", correct: false },
                { text: "alert('Hello World');", correct: true }
            ]
        }
    ];

    btnExitQuiz.addEventListener('click', () => {
        clearInterval(quizTimerInterval);
        window.location.href = 'progress.html';
    });

    btnNextQuestion.addEventListener('click', () => {
        startQuizCycle();
    });

    function startQuizCycle() {
        clearInterval(quizTimerInterval);
        
        if (currentQuestionIndex >= questions.length) {
            quizQuestionTxt.textContent = "Quiz Completed!";
            quizOptionsCont.innerHTML = "";
            quizStatus.textContent = "You have finished all questions. Great job!";
            quizStatus.className = "warning";
            quizStatus.style.color = "#10B981"; // Success color
            timerText.textContent = "Done";
            btnNextQuestion.style.display = 'none';
            btnExitQuiz.textContent = "Return to Dashboard";
            return;
        }

        quizPhase = 'read';
        timeLeft = 20; 
        
        const currentQ = questions[currentQuestionIndex];
        quizQuestionTxt.textContent = currentQ.q;
        quizOptionsCont.innerHTML = currentQ.opts.map(opt => 
            `<div class="quiz-option" data-correct="${opt.correct}">${opt.text}</div>`
        ).join('');
        
        currentQuestionIndex++;

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
            quizStatus.style.color = "#10B981";
        } else {
            selectedElement.classList.add('wrong');
            selectedElement.innerHTML += ' <i class="fas fa-times-circle" style="color:#EF4444;"></i>';
            quizStatus.textContent = "Incorrect. Review the module materials.";
            quizStatus.style.color = "#EF4444";
            
            // Highlight the correct answer as well
            const correctOpt = quizOptionsCont.querySelector('[data-correct="true"]');
            if (correctOpt) {
                correctOpt.classList.add('correct');
                correctOpt.innerHTML += ' <i class="fas fa-check-circle" style="color:#16a34a;"></i>';
            }
        }
        
        btnNextQuestion.textContent = currentQuestionIndex >= questions.length ? "Finish Quiz" : "Next Question";
        btnNextQuestion.style.display = 'block';
    }
    
    function handleQuizTimeout() {
        quizOptionsCont.classList.add('disabled');
        quizStatus.textContent = "Time's up!";
        quizStatus.style.color = "#EF4444";
        
        const correctOpt = quizOptionsCont.querySelector('[data-correct="true"]');
        if (correctOpt) {
            correctOpt.classList.add('correct');
            correctOpt.innerHTML += ' <i class="fas fa-check-circle" style="color:#16a34a;"></i>';
        }
        btnNextQuestion.textContent = currentQuestionIndex >= questions.length ? "Finish Quiz" : "Next Question";
        btnNextQuestion.style.display = 'block';
    }

    // Initialize first cycle
    startQuizCycle();
});
