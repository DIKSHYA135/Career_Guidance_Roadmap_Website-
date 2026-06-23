/* interview-prep.js */

document.addEventListener('DOMContentLoaded', () => {
    // Pro Check
    if (typeof window.XyRequirePro === 'function') {
        if (!window.XyRequirePro('AI Mock Interview')) return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    let targetCareer = localStorage.getItem('xyverra_selected_path') || 'General Software Engineering';
    document.getElementById('int-career-goal').textContent = targetCareer;

    // Elements
    const startBtn = document.getElementById('start-interview-btn');
    const endBtn = document.getElementById('int-end-btn');
    const nextBtn = document.getElementById('int-next-btn');
    const activeSessionCard = document.getElementById('int-active-session');
    const reportCard = document.getElementById('int-session-report');
    const welcomeState = document.getElementById('int-welcome-state');
    const questionText = document.getElementById('int-question-text');
    const answerInput = document.getElementById('int-answer-input');
    const qCurrent = document.getElementById('int-q-current');
    const qTotal = document.getElementById('int-q-total');
    const timerText = document.getElementById('int-timer-text');
    
    // State
    let currentSessionId = null;
    let questions = [];
    let currentQuestionIndex = 0;
    let timerInterval = null;
    let timeLeft = 15 * 60; // 15 minutes

    const populateSkills = () => {
        const skillsContainer = document.getElementById('int-skills-selector');
        let roadmapData = typeof ROADMAP_DATA !== 'undefined' ? ROADMAP_DATA[targetCareer] : null;
        if (!roadmapData && typeof ROADMAP_DATA !== 'undefined') roadmapData = ROADMAP_DATA['Web Development'];
        
        let tags = ['General Technical', 'Behavioral'];
        if (roadmapData) {
            tags = tags.concat(roadmapData.slice(0, 3).map(m => m.title.split(':')[0]));
        }

        skillsContainer.innerHTML = tags.map(t => `<button class="skill-tag">${t}</button>`).join('');

        const skillBtns = skillsContainer.querySelectorAll('.skill-tag');
        skillBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('selected');
                const selected = skillsContainer.querySelectorAll('.skill-tag.selected');
                if (selected.length > 3) {
                    btn.classList.remove('selected');
                }
            });
        });
    };

    populateSkills();

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const updateTimer = () => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endSession();
        }
        timerText.textContent = formatTime(timeLeft);
    };

    const startSession = async () => {
        const btnOriginalText = startBtn.innerHTML;
        startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting...';
        startBtn.disabled = true;

        try {
            const res = await fetch('http://localhost:5000/api/interview/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ jobRole: targetCareer })
            });
            const data = await res.json();
            
            if (data.success) {
                currentSessionId = data.session._id;
                questions = data.session.questionsAsked;
                currentQuestionIndex = 0;
                
                welcomeState.style.display = 'none';
                reportCard.style.display = 'none';
                activeSessionCard.style.display = 'block';
                
                qTotal.textContent = questions.length;
                timeLeft = 15 * 60;
                timerText.textContent = formatTime(timeLeft);
                clearInterval(timerInterval);
                timerInterval = setInterval(updateTimer, 1000);
                
                showQuestion();
            } else {
                if (window.XyError) window.XyError('Interview Error', data.message || 'Failed to start interview');
                else alert(data.message || 'Failed to start interview');
            }
        } catch (e) {
            console.error(e);
            if (window.XyNetworkError) window.XyNetworkError();
            else alert('Server error. Please try again.');
        } finally {
            startBtn.innerHTML = btnOriginalText;
            startBtn.disabled = false;
        }
    };

    const showQuestion = () => {
        qCurrent.textContent = currentQuestionIndex + 1;
        questionText.textContent = questions[currentQuestionIndex].question;
        answerInput.value = '';
        answerInput.focus();
        
        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.innerHTML = 'Complete Interview <i class="fas fa-check"></i>';
        } else {
            nextBtn.innerHTML = 'Next Question <i class="fas fa-arrow-right"></i>';
        }
    };

    const submitAnswer = async () => {
        const answer = answerInput.value.trim();
        if (!answer) {
            if (window.XyWarning) window.XyWarning('Answer Required', 'Please type your answer before continuing.');
            else alert('Please provide an answer before continuing.');
            return;
        }

        const btnText = nextBtn.innerHTML;
        nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        nextBtn.disabled = true;

        try {
            const qId = questions[currentQuestionIndex]._id;
            await fetch(`http://localhost:5000/api/interview/${currentSessionId}/answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ questionId: qId, answer })
            });

            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                showQuestion();
            } else {
                await endSession();
            }
        } catch (e) {
            console.error(e);
            if (window.XyNetworkError) window.XyNetworkError('Error submitting answer.');
            else alert('Server error while submitting answer.');
        } finally {
            nextBtn.innerHTML = btnText;
            nextBtn.disabled = false;
        }
    };

    const endSession = async () => {
        clearInterval(timerInterval);
        
        try {
            const res = await fetch(`http://localhost:5000/api/interview/${currentSessionId}/complete`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            
            if (data.success) {
                activeSessionCard.style.display = 'none';
                reportCard.style.display = 'block';
                
                const finalScore = Math.round(data.session.overallScore || 0);
                document.getElementById('int-final-score').textContent = finalScore;
                
                const circle = document.getElementById('int-circle-path');
                const radius = circle.r.baseVal.value;
                const circumference = radius * 2 * Math.PI;
                const offset = circumference - (finalScore / 100) * circumference;
                
                setTimeout(() => {
                    circle.style.strokeDashoffset = offset;
                }, 100);

                let color = "#3b82f6";
                if (finalScore < 50) color = "#ef4444";
                else if (finalScore < 75) color = "#f59e0b";
                else if (finalScore >= 90) color = "#10b981";
                circle.style.stroke = color;

                const feedbackList = document.getElementById('report-feedback-list');
                feedbackList.innerHTML = data.session.questionsAsked.map((q, i) => `
                    <div class="feedback-item">
                        <h4>Q${i+1}: ${q.question}</h4>
                        <p><strong>Your Answer:</strong> ${q.userAnswer || 'Skipped'}</p>
                        <p><strong>AI Feedback:</strong> ${q.aiFeedback || 'No feedback'}</p>
                        <span class="feedback-score">Score: ${q.score ? Math.round(q.score) : 0}/100</span>
                    </div>
                `).join('');

            }
        } catch (e) {
            console.error(e);
            if (window.XyError) window.XyError('Session Error', 'Failed to complete the session. Please try again.');
            else alert('Failed to complete session.');
        }
    };

    startBtn.addEventListener('click', startSession);
    nextBtn.addEventListener('click', submitAnswer);
    endBtn.addEventListener('click', async () => {
        const ok = await (window.XyConfirm ? window.XyConfirm({
            title: 'End Interview Early?',
            message: 'Unanswered questions will receive a score of 0. Are you sure you want to stop?',
            confirmText: 'Yes, End Session',
            cancelText: 'Keep Going',
            type: 'warning',
            dangerous: true
        }) : Promise.resolve(confirm('End this session early? Unanswered questions will receive a score of 0.')));
        if (ok) endSession();
    });
});
