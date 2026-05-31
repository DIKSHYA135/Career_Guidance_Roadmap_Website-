/* =========================================================
   quiz.js — Xyverra Assessment Engine
   All localStorage calls are marked with TODO comments
   so they can be replaced with real API calls later.
   ========================================================= */

// ── Quiz Data (will come from GET /api/quiz/:moduleId in production) ──
// ── Option labels ──
const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// ── State ──
let quizTimerInterval = null;
let timeLeft = 10;
let quizPhase = 'read';      // 'read' | 'answer'
let currentQuestionIndex = 0;
let selectedOptionIndex = null;
let score = 0;
let moduleId = 'html';
let questions = [];
let isVerify = false;
let isMandatory = false;

document.addEventListener("DOMContentLoaded", () => {
    // Enforce Fullscreen Quiz layout style
    document.body.classList.add('fullscreen-quiz');
    
    // Disable any sidebar/header links visually and functionally
    if (typeof QuizLockManager !== 'undefined') {
        QuizLockManager.disableNavigation();
    }

    // ── Read category & level from URL ──
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || localStorage.getItem('xyverra_selected_path') || 'Web Development';
    const level = urlParams.get('level') || 'Beginner';
    moduleId = `${category}_${level}`; // for legacy compatibility
    isVerify = urlParams.get('verify') === 'true';
    
    // Assessment logic
    const isAssessment = urlParams.get('mode') === 'assessment';
    const targetLevel = urlParams.get('targetLevel') || 'Intermediate';
    const assessmentPhase = urlParams.get('phase') || 'beginner';
    
    // Check if mandatory sequence is active in local storage
    const hasMandatoryPending = typeof LocalStorageState !== 'undefined' && LocalStorageState.isMandatoryQuizPending();
    isMandatory = (urlParams.get('mandatory') === 'true') || hasMandatoryPending;

    let progress = null;
    let quizDetail = null;

    if (isMandatory && typeof LocalStorageState !== 'undefined') {
        progress = LocalStorageState.getCurrentQuizProgress();
        if (progress && progress.quizDetail) {
            quizDetail = progress.quizDetail;
        }
    }

    const categoryData = (typeof SCALABLE_QUIZ_DATA !== 'undefined' ? SCALABLE_QUIZ_DATA[category] : null) || SCALABLE_QUIZ_DATA['Web Development'];
    const levelData = categoryData[level] || categoryData['Beginner'];

    const quizData = {
        title: `${category} - ${level}`,
        questions: levelData
    };

    // ── Shuffle helper (Fisher-Yates) ──
    function shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // ── DOM refs ──
    const moduleTitle       = document.getElementById('quiz-module-title');
    const quizQuestionTxt   = document.getElementById('quiz-question');
    const quizOptionsCont   = document.getElementById('quiz-options-container');
    const timerBar          = document.getElementById('quiz-timer');
    const timerText         = document.getElementById('timer-text');
    const quizStatus        = document.getElementById('quiz-status');
    const btnNextQuestion   = document.getElementById('btn-next-question');
    const btnExitQuiz       = document.getElementById('btn-exit-quiz');
    const resultContainer   = document.getElementById('quiz-result-container');
    const quizBody          = document.getElementById('quiz-body');
    const questionMeta      = document.getElementById('question-meta-text');

    // AI Refs
    const btnAiConfig      = document.getElementById('btn-ai-config');
    const aiConfigOverlay  = document.getElementById('aiConfigOverlay');
    const inputGeminiKey   = document.getElementById('gemini-api-key');
    const btnCancelAi      = document.getElementById('btn-cancel-ai');
    const btnSaveAi        = document.getElementById('btn-save-ai');
    const aiStatusLabel    = document.getElementById('ai-status-label');
    const aiLoadingScreen  = document.getElementById('ai-loading-screen');
    const quizCard         = document.getElementById('quiz-card');

    // ── AI Config Modal Logic ──
    function updateAiStatus() {
        const key = localStorage.getItem('gemini_api_key');
        if (key && key.trim()) {
            if (aiStatusLabel) {
                aiStatusLabel.textContent = "AI: On";
                aiStatusLabel.style.color = "var(--success)";
            }
            if (btnAiConfig) {
                btnAiConfig.style.borderColor = "var(--success)";
                btnAiConfig.style.background = "rgba(16, 185, 129, 0.05)";
            }
        } else {
            if (aiStatusLabel) {
                aiStatusLabel.textContent = "AI: Off";
                aiStatusLabel.style.color = "var(--text-muted)";
            }
            if (btnAiConfig) {
                btnAiConfig.style.borderColor = "var(--border)";
                btnAiConfig.style.background = "rgba(255,255,255,0.85)";
            }
        }
    }

    if (btnAiConfig && aiConfigOverlay) {
        btnAiConfig.addEventListener('click', () => {
            inputGeminiKey.value = localStorage.getItem('gemini_api_key') || '';
            aiConfigOverlay.style.display = 'flex';
            setTimeout(() => aiConfigOverlay.classList.add('active'), 50);
        });
    }

    if (btnCancelAi && aiConfigOverlay) {
        btnCancelAi.addEventListener('click', () => {
            aiConfigOverlay.classList.remove('active');
            setTimeout(() => aiConfigOverlay.style.display = 'none', 300);
        });
    }

    if (btnSaveAi && aiConfigOverlay) {
        btnSaveAi.addEventListener('click', () => {
            const key = inputGeminiKey.value.trim();
            if (key) {
                localStorage.setItem('gemini_api_key', key);
            } else {
                localStorage.removeItem('gemini_api_key');
            }
            updateAiStatus();
            aiConfigOverlay.classList.remove('active');
            setTimeout(() => {
                aiConfigOverlay.style.display = 'none';
                window.location.reload();
            }, 300);
        });
    }

    updateAiStatus();

    // ── Exit button — always goes back to roadmap or verification ──
    btnExitQuiz.addEventListener('click', (e) => {
        e.preventDefault();
        clearInterval(quizTimerInterval);
        window.location.href = isVerify ? 'skill-verification.html' : 'roadmap.html';
    });

    // ── Restore saved state if exists ──
    let savedState = null;
    try {
        const raw = localStorage.getItem('xyverra_active_quiz');
        if (raw) {
            savedState = JSON.parse(raw);
        }
    } catch (e) {
        console.error("Error reading saved active quiz state:", e);
    }

    let restored = false;
    if (savedState && savedState.moduleId === moduleId && savedState.isVerify === isVerify && savedState.isMandatory === isMandatory) {
        currentQuestionIndex = savedState.currentQuestionIndex;
        score = savedState.score;
        quizPhase = savedState.quizPhase;
        timeLeft = savedState.timeLeft;
        selectedOptionIndex = savedState.selectedOptionIndex;
        questions = savedState.shuffledQuestions || questions;
        restored = true;
        console.log("Restored active quiz state from localStorage:", savedState);
    }

    // If it's mandatory, let's also check if we can restore from mandatory state
    if (!restored && isMandatory && quizDetail) {
        if (quizDetail.shuffledQuestions) {
            currentQuestionIndex = quizDetail.currentQuestionIndex;
            score = quizDetail.score;
            quizPhase = quizDetail.currentQuestionPhase || 'read';
            timeLeft = quizDetail.currentQuestionTimeLeft !== undefined ? quizDetail.currentQuestionTimeLeft : 10;
            selectedOptionIndex = quizDetail.selectedOptionIndex !== undefined ? quizDetail.selectedOptionIndex : null;
            questions = quizDetail.shuffledQuestions;
            restored = true;
            console.log("Restored active quiz from mandatoryQuizState sequence:", quizDetail);
        }
    }

    // If not restored, shuffle and start fresh!
    if (!restored) {
        currentQuestionIndex = 0;
        score = 0;
        quizPhase = 'read';
        timeLeft = 10;
        selectedOptionIndex = null;
        shuffleArray(questions);
        console.log("Started brand new quiz, shuffled questions.");
    }

    // ── Setup UI elements depending on mode ──
    if (isMandatory) {
        // Hide exit buttons & back links to enforce compliance
        const backLink = document.querySelector('.quiz-back-link');
        if (backLink) backLink.style.display = 'none';
        if (btnExitQuiz) btnExitQuiz.style.display = 'none';
    } else {
        // Standard leaving warning popup configuration
        if (btnExitQuiz) {
            btnExitQuiz.addEventListener('click', (e) => {
                e.preventDefault();
                if (exitModal) {
                    exitModal.style.display = 'flex';
                    requestAnimationFrame(() => {
                        exitModal.classList.add('active');
                    });
                }
            });
        }

        if (cancelExitBtn) {
            cancelExitBtn.addEventListener('click', () => {
                if (exitModal) {
                    exitModal.classList.remove('active');
                    setTimeout(() => {
                        exitModal.style.display = 'none';
                    }, 300);
                }
            });
        }

        if (confirmExitBtn) {
            confirmExitBtn.addEventListener('click', () => {
                clearInterval(quizTimerInterval);
                window.removeEventListener('beforeunload', handleBeforeUnload);
                clearState();
                window.location.href = isVerify ? 'skill-verification.html' : 'roadmap.html';
            });
        }
    }

    // Add beforeunload page event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // ── Next question handler ──
    btnNextQuestion.addEventListener('click', () => {
        currentQuestionIndex++;
        selectedOptionIndex = null;
        quizPhase = 'read';
        timeLeft = 10;
        loadQuestion();
    });

    // ── Load / Generate Quiz ──
    const userLevel = localStorage.getItem("userLevel") || "Beginner";
    let geminiKey = localStorage.getItem('gemini_api_key');

    if (!geminiKey || !geminiKey.trim()) {
        const wantsAi = confirm("Do you want to use Real-time AI for dynamic questions? (Requires a free Google Gemini API Key)");
        if (wantsAi) {
            geminiKey = prompt("Please paste your free Google Gemini API Key:\\n(Get it at https://aistudio.google.com/app/apikey)");
            if (geminiKey && geminiKey.trim()) {
                localStorage.setItem('gemini_api_key', geminiKey.trim());
            }
        }
    }

    if (geminiKey && geminiKey.trim()) {
        let topic = quizData.title;
        let aiLevel = userLevel;
        
        if (isAssessment) {
            const selectedPath = localStorage.getItem('xyverra_selected_path') || 'Web Development';
            topic = `${assessmentPhase === 'beginner' ? 'Beginner' : 'Intermediate'} level foundational concepts for ${selectedPath}`;
            aiLevel = assessmentPhase === 'beginner' ? 'Beginner' : 'Intermediate';
            if (moduleTitle) moduleTitle.textContent = `Prerequisite Assessment: ${aiLevel}`;
        }
        
        generateAiQuiz(geminiKey.trim(), topic, aiLevel);
    } else {
        if (isAssessment) {
            if (moduleTitle) moduleTitle.textContent = `Prerequisite Assessment: ${assessmentPhase === 'beginner' ? 'Beginner' : 'Intermediate'}`;
        }
        loadFallbackQuiz();
    }

    function loadFallbackQuiz() {
        questions = shuffleArray(quizData.questions).map(q => ({
            ...q,
            opts: shuffleArray(q.opts)
        }));
        questions = questions.slice(0, 10); // 10 questions standard
        
        if (moduleTitle && !isAssessment) moduleTitle.textContent = quizData.title + ' Assessment';
        loadQuestion();
    }

    async function generateAiQuiz(apiKey, topic, level) {
        if (aiLoadingScreen && quizCard) {
            quizCard.style.display = 'none';
            aiLoadingScreen.style.display = 'flex';
        }

        const promptText = `Generate a JSON quiz with exactly 5 multiple-choice questions for the topic: "${topic}".
The difficulty level should be suitable for a "${level}" level student in this domain.

You MUST respond with a JSON object in this exact format:
{
  "title": "${topic}",
  "questions": [
    {
      "q": "Unique, clear question text?",
      "opts": [
        { "text": "Option A text", "correct": false },
        { "text": "Option B text", "correct": true },
        { "text": "Option C text", "correct": false },
        { "text": "Option D text", "correct": false }
      ]
    }
  ]
}

CRITICAL RULES:
1. Ensure exactly one option has correct = true.
2. Return ONLY the raw JSON string. Do not wrap it in \`\`\`json markdown blocks or add any other text outside the JSON.
3. Make the questions diverse, high-quality, and highly relevant. Give different sets of questions every time.`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: promptText
                        }]
                    }],
                    generationConfig: {
                        responseMimeType: "application/json"
                    }
                })
            });

            if (!response.ok) throw new Error("API request failed");

            const data = await response.json();
            const textResponse = data.candidates[0].content.parts[0].text;
            
            let cleanJson = textResponse.trim();
            
            // Defensively extract JSON object out of any conversational text or markdown blocks
            const jsonStart = cleanJson.indexOf('{');
            const jsonEnd = cleanJson.lastIndexOf('}');
            if (jsonStart !== -1 && jsonEnd !== -1) {
                cleanJson = cleanJson.substring(jsonStart, jsonEnd + 1);
            }

            const parsedQuiz = JSON.parse(cleanJson);
            
            if (parsedQuiz && parsedQuiz.questions && parsedQuiz.questions.length > 0) {
                // Highly robust, defensive parser for AI-generated structure variations
                questions = parsedQuiz.questions.map(q => {
                    let rawOpts = q.opts || q.options || q.choices || q.answers || q.options_list || 
                                  (Object.values(q).find(v => Array.isArray(v) && v.length > 0));
                    
                    if (!Array.isArray(rawOpts) && typeof rawOpts === 'object' && rawOpts !== null) {
                        // Extract array from dictionary if AI sends an object like {"A": "Option 1"}
                        rawOpts = Object.keys(rawOpts).map(key => {
                            const val = rawOpts[key];
                            if (typeof val === 'string') return { text: val, correct: false };
                            return val;
                        });
                    }

                    if (!Array.isArray(rawOpts)) rawOpts = [];

                    const opts = rawOpts.map(o => {
                        if (!o) return { text: '', correct: false };
                        if (typeof o === 'string') {
                            const isCorrect = (q.correct_answer && String(q.correct_answer).toLowerCase() === o.toLowerCase()) || 
                                              (q.correct && String(q.correct).toLowerCase() === o.toLowerCase()) || false;
                            return { text: o, correct: isCorrect };
                        }
                        
                        let optText = o.text || o.option || o.answer || o.choice || o.value || o.label || o.name || '';
                        if (!optText && typeof o === 'object') {
                            const strVal = Object.values(o).find(v => typeof v === 'string' && !['true', 'false'].includes(v.toLowerCase()));
                            if (strVal) optText = strVal;
                        }
                        
                        let isCorrect = o.correct === true || o.correct === 'true' || o.isCorrect === true || o.isCorrect === 'true' || o.correct_answer === true;
                        if (!isCorrect && typeof o === 'object') {
                            isCorrect = Object.values(o).some(v => v === true || v === 'true');
                        }

                        return {
                            text: optText || 'Option',
                            correct: isCorrect
                        };
                    });

                    // Ensure at least one option is marked correct to prevent lockouts
                    if (!opts.some(o => o.correct)) {
                        if (opts.length > 0) opts[0].correct = true;
                    }

                    return {
                        q: q.q || q.question || 'No question text provided',
                        opts: shuffleArray(opts)
                    };
                });

                // Validation step: Ensure ALL questions have options, otherwise fallback!
                const invalidQuestions = questions.filter(q => !q.opts || q.opts.length < 2);
                if (!questions || questions.length === 0 || invalidQuestions.length > 0) {
                    throw new Error("AI generated questions without valid options structure.");
                }

                if (moduleTitle) moduleTitle.textContent = `${parsedQuiz.title || topic} (AI Gen)`;
            } else {
                throw new Error("Invalid structure returned by AI");
            }

        } catch (error) {
            console.error("AI Quiz generation failed, falling back to predefined questions:", error);
            if (quizStatus) {
                quizStatus.textContent = "💡 Gemini API error or invalid response. Loaded pre-defined questions.";
                quizStatus.className = 'quiz-status warning';
            }
            loadFallbackQuiz();
            return;
        } finally {
            if (aiLoadingScreen && quizCard) {
                aiLoadingScreen.style.display = 'none';
                quizCard.style.display = 'block';
            }
        }

        loadQuestion();
    }

    // ────────────────────────────────────────────────────
    // Constants: reading time = 10s, answering time = 5s
    const READ_TIME   = 10;
    const ANSWER_TIME = 5;

    function loadQuestion() {
        clearInterval(quizTimerInterval);
        selectedOptionIndex = null;
        btnNextQuestion.style.display = 'none';

        if (currentQuestionIndex >= questions.length) {
            showResults();
            return;
        }

        const q = questions[currentQuestionIndex];

        // Update question counter
        if (questionMeta) {
            questionMeta.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        }

        // Set question text
        quizQuestionTxt.textContent = q.q;

        // Clear and render option buttons — but lock them during reading phase
        quizOptionsCont.innerHTML = '';
        quizOptionsCont.classList.add('disabled'); // locked during read phase

        const optionsToRender = q.opts || [];
        optionsToRender.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.id = `option-${i}`;

            const letterSpan = document.createElement('span');
            letterSpan.className = 'option-letter';
            letterSpan.textContent = OPTION_LABELS[i];

            const textSpan = document.createElement('span');
            textSpan.className = 'option-text';
            textSpan.textContent = opt.text;

            btn.appendChild(letterSpan);
            btn.appendChild(textSpan);
            btn.addEventListener('click', () => selectOption(i, opt.correct, q.opts));
            quizOptionsCont.appendChild(btn);
        });

        // ── PHASE 1: Reading (10s) ──
        quizPhase = 'read';
        timeLeft = READ_TIME;
        updateTimerBar(timeLeft, READ_TIME, timerBar);
        if (timerBar) timerBar.style.background = 'linear-gradient(90deg, var(--primary), #60A5FA)';
        timerText.textContent = `📖 ${timeLeft}s to Read`;
        quizStatus.textContent = '📖 Read the question carefully!';
        quizStatus.className = 'quiz-status info';

        quizTimerInterval = setInterval(() => {
            timeLeft--;
            updateTimerBar(timeLeft, READ_TIME, timerBar);
            timerText.textContent = `📖 ${timeLeft}s to Read`;

            if (timeLeft <= 0) {
                // ── PHASE 2: Answering (5s) ──
                clearInterval(quizTimerInterval);
                quizPhase = 'answer';
                quizOptionsCont.classList.remove('disabled'); // unlock options
                timeLeft = ANSWER_TIME;
                updateTimerBar(timeLeft, ANSWER_TIME, timerBar);
                if (timerBar) timerBar.style.background = 'linear-gradient(90deg, #F59E0B, #EF4444)';
                timerText.textContent = `⚡ ${timeLeft}s to Answer`;
                quizStatus.textContent = '⚡ Choose your answer now!';
                quizStatus.className = 'quiz-status warning';

                quizTimerInterval = setInterval(() => {
                    timeLeft--;
                    updateTimerBar(timeLeft, ANSWER_TIME, timerBar);
                    timerText.textContent = `⚡ ${timeLeft}s to Answer`;

                    if (timeLeft <= 0) {
                        // Time's up — auto-mark wrong
                        clearInterval(quizTimerInterval);
                        quizOptionsCont.classList.add('disabled');
                        // Highlight correct answer
                        if (q.opts) {
                            q.opts.forEach((opt, i) => {
                                if (opt.correct) {
                                    const btn = document.getElementById(`option-${i}`);
                                    if (btn) btn.classList.add('correct');
                                }
                            });
                        }
                        quizStatus.textContent = "⏰ Time's up! The correct answer is highlighted.";
                        quizStatus.className = 'quiz-status error';
                        timerText.textContent = 'Time Up!';
                        btnNextQuestion.style.display = 'inline-flex';
                        btnNextQuestion.textContent = currentQuestionIndex + 1 < questions.length ? 'Next Question →' : 'See Results →';
                    }
                }, 1000);
            }
            saveState(); // Save state on every timer tick!
        }, 1000);
    }

    // ────────────────────────────────────────────────────
    function selectOption(index, isCorrect, opts) {
        if (quizPhase !== 'answer' || selectedOptionIndex !== null) return;
        clearInterval(quizTimerInterval);

        selectedOptionIndex = index;
        quizOptionsCont.classList.add('disabled');

        const selectedBtn = document.getElementById(`option-${index}`);

        if (isCorrect) {
            if (selectedBtn) selectedBtn.classList.add('correct');
            quizStatus.textContent = '✅ Correct! Well done!';
            quizStatus.className = 'quiz-status success';
            score++;
        } else {
            if (selectedBtn) selectedBtn.classList.add('wrong');
            quizStatus.textContent = '❌ Incorrect. The correct answer is highlighted.';
            quizStatus.className = 'quiz-status error';
            
            if (opts) {
                opts.forEach((opt, i) => {
                    if (opt.correct) {
                        const btn = document.getElementById(`option-${i}`);
                        if (btn) btn.classList.add('correct');
                    }
                });
            }
        }

        timerText.textContent = 'Answered';
        btnNextQuestion.style.display = 'inline-flex';
        btnNextQuestion.textContent = currentQuestionIndex + 1 < questions.length ? 'Next Question →' : 'See Results →';
        
        saveState(); // Save state when option selected!
    }

    // ────────────────────────────────────────────────────
    function updateTimerBar(current, total, bar) {
        if (!bar) return;
        const pct = Math.max(0, (current / total) * 100);
        bar.style.width = `${pct}%`;
        if (pct > 50) bar.style.background = 'linear-gradient(90deg, var(--primary), var(--accent))';
        else if (pct > 25) bar.style.background = 'linear-gradient(90deg, #F59E0B, #FBBF24)';
        else bar.style.background = 'linear-gradient(90deg, var(--error), #F87171)';
    }

    // ────────────────────────────────────────────────────
    function showResults() {
        clearInterval(quizTimerInterval);
        
        // Remove the page exit warning popup
        window.removeEventListener('beforeunload', handleBeforeUnload);
        
        // Clear active quiz state since it's completed!
        clearState();

        const pct = Math.round((score / questions.length) * 100);
        const passed = pct >= 70;

        if (isAssessment) {
            handleAssessmentResults(pct, passed);
            return;
        }

        let detectedLevel = "Beginner";
        if (pct >= 80) {
            detectedLevel = "Advanced";
        } else if (pct >= 50) {
            detectedLevel = "Intermediate";
        }
        localStorage.setItem('quizResultLevel', detectedLevel);
        localStorage.setItem('quizResultScore', pct);

        // Hide quiz body, show result
        if (quizBody) quizBody.style.display = 'none';
        resultContainer.style.display = 'block';

        const resultIcon   = document.getElementById('result-icon');
        const scoreDisplay = document.getElementById('score-display');
        const scoreText    = document.getElementById('score-text');

        resultIcon.className = `result-icon ${passed ? 'success' : 'fail'}`;
        resultIcon.innerHTML = passed
            ? '<i class="fas fa-check-circle"></i>'
            : '<i class="fas fa-times-circle"></i>';

        scoreDisplay.textContent = `${pct}%`;
        scoreText.textContent = passed
            ? `You scored ${score}/${questions.length} — Module Verified! 🎉`
            : `You scored ${score}/${questions.length} — Try again to pass (70% needed).`;

        // Timer bar full green on completion
        if (timerBar) {
            timerBar.style.width = '100%';
            timerBar.style.background = passed
                ? 'linear-gradient(90deg, var(--success), #34D399)'
                : 'linear-gradient(90deg, var(--error), #F87171)';
        }

        timerText.textContent = passed ? 'Passed!' : '💪 Keep Learning';
        quizStatus.textContent = '';

        // ── Actions Setup for Results Screen ──
        const footerActions = document.querySelector('.quiz-footer-actions');
        if (footerActions) {
            footerActions.innerHTML = ''; // Clear standard action buttons
        }

        if (isMandatory && typeof RoadmapUnlockLogic !== 'undefined') {
            if (passed) {
                // Handle passing logic via RoadmapUnlockLogic
                RoadmapUnlockLogic.handlePass(moduleId);

                const hasNext = progress && (progress.currentQuizIndex + 1 < progress.totalQuizzes);
                
                if (hasNext) {
                    const nextQuizBtn = document.createElement('button');
                    nextQuizBtn.className = 'btn btn-primary';
                    nextQuizBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                    nextQuizBtn.innerHTML = 'Start Next Required Quiz <i class="fas fa-arrow-right"></i>';
                    nextQuizBtn.addEventListener('click', () => {
                        RoadmapUnlockLogic.advanceToNextQuiz();
                        window.location.reload();
                    });
                    if (footerActions) footerActions.appendChild(nextQuizBtn);
                } else {
                    const unlockBtn = document.createElement('button');
                    unlockBtn.className = 'btn btn-primary';
                    unlockBtn.style.background = 'linear-gradient(135deg, #6366F1, #4F46E5)';
                    unlockBtn.innerHTML = 'Complete & Unlock Roadmap <i class="fas fa-unlock"></i>';
                    unlockBtn.addEventListener('click', () => {
                        RoadmapUnlockLogic.completeVerification();
                        window.location.href = 'roadmap.html';
                    });
                    if (footerActions) footerActions.appendChild(unlockBtn);
                }
            } else {
                const retakeBtn = document.createElement('button');
                retakeBtn.className = 'btn btn-primary';
                retakeBtn.style.background = 'linear-gradient(135deg, #EF4444, #F59E0B)';
                retakeBtn.innerHTML = '<i class="fas fa-redo"></i> Retake Required Quiz';
                retakeBtn.addEventListener('click', () => {
                    RoadmapUnlockLogic.handleFail(moduleId);
                    window.location.reload();
                });
                if (footerActions) footerActions.appendChild(retakeBtn);
            }
        } else {
            // Non-mandatory standard quiz handling
            if (passed) {
                let completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '{}');
                if (!completedLevels[category]) {
                    completedLevels[category] = [];
                }
                if (!completedLevels[category].includes(level)) {
                    completedLevels[category].push(level);
                    localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
                }

                let currentScore = parseInt(localStorage.getItem('xyverra_skill_score') || '0');
                localStorage.setItem('xyverra_skill_score', currentScore + 20); // More points for 10 q quiz
                
                // Save attempt details
                let attempts = JSON.parse(localStorage.getItem('quiz_attempts') || '[]');
                attempts.push({
                    category,
                    level,
                    score,
                    total: questions.length,
                    passed: true,
                    date: new Date().toISOString()
                });
                localStorage.setItem('quiz_attempts', JSON.stringify(attempts));
            }

            const doneBtn = document.createElement('button');
            doneBtn.className = 'btn btn-primary';
            doneBtn.innerHTML = isVerify ? '← Back to Verification' : '← Back to Roadmap';
            doneBtn.addEventListener('click', () => {
                window.location.href = isVerify 
                    ? (passed ? 'skill-verification.html' : `skill-verification.html?failed=${moduleId}`)
                    : 'roadmap.html';
            });
            if (footerActions) footerActions.appendChild(doneBtn);
        }
    }

    function handleAssessmentResults(pct, passed) {
        if (quizBody) quizBody.style.display = 'none';
        resultContainer.style.display = 'block';

        const resultIcon   = document.getElementById('result-icon');
        const scoreDisplay = document.getElementById('score-display');
        const scoreText    = document.getElementById('score-text');

        resultIcon.className = `result-icon ${passed ? 'success' : 'fail'}`;
        resultIcon.innerHTML = passed ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>';

        scoreDisplay.textContent = `${pct}%`;
        scoreText.textContent = passed ? `You scored ${score}/${questions.length} — Phase Complete!` : `You scored ${score}/${questions.length} — Assessment Finished.`;

        if (timerBar) {
            timerBar.style.width = '100%';
            timerBar.style.background = passed ? 'linear-gradient(90deg, var(--success), #34D399)' : 'linear-gradient(90deg, var(--error), #F87171)';
        }
        timerText.textContent = passed ? 'Passed!' : 'Assessment Done';
        quizStatus.textContent = '';

        let scores = JSON.parse(localStorage.getItem('xyverra_assessment_scores') || '{}');
        scores[assessmentPhase] = pct;
        localStorage.setItem('xyverra_assessment_scores', JSON.stringify(scores));

        let recommendedLevel = "Beginner";
        let shouldProceedToNextPhase = false;

        if (targetLevel === "Intermediate") {
            recommendedLevel = passed ? "Intermediate" : "Beginner";
        } else if (targetLevel === "Advanced") {
            if (assessmentPhase === 'beginner') {
                if (passed) {
                    shouldProceedToNextPhase = true;
                } else {
                    recommendedLevel = "Beginner";
                }
            } else if (assessmentPhase === 'intermediate') {
                recommendedLevel = passed ? "Advanced" : "Intermediate";
            }
        }

        const footerActions = document.querySelector('.quiz-footer-actions');
        if (footerActions) footerActions.innerHTML = '';

        if (shouldProceedToNextPhase) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'btn btn-primary';
            nextBtn.innerHTML = 'Proceed to Intermediate Phase <i class="fas fa-arrow-right"></i>';
            nextBtn.addEventListener('click', () => {
                window.location.href = `quiz.html?mode=assessment&targetLevel=Advanced&phase=intermediate`;
            });
            if (footerActions) footerActions.appendChild(nextBtn);
        } else {
            localStorage.setItem('xyverra_recommended_level', recommendedLevel);
            const viewResultsBtn = document.createElement('button');
            viewResultsBtn.className = 'btn btn-primary';
            viewResultsBtn.innerHTML = 'View Assessment Results <i class="fas fa-chart-bar"></i>';
            viewResultsBtn.addEventListener('click', () => {
                showAssessmentDecisionModal(recommendedLevel);
            });
            if (footerActions) footerActions.appendChild(viewResultsBtn);
        }
    }

    function showAssessmentDecisionModal(recommendedLevel) {
        const overlay = document.getElementById('assessmentDecisionOverlay');
        if (!overlay) return;
        
        const scores = JSON.parse(localStorage.getItem('xyverra_assessment_scores') || '{}');
        const scoresContainer = document.getElementById('modal-scores-container');
        if (scoresContainer) {
            scoresContainer.innerHTML = '';
            for (const [phase, s] of Object.entries(scores)) {
                scoresContainer.innerHTML += `<div style="width: 100%; display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">${phase.charAt(0).toUpperCase() + phase.slice(1)} Score:</span> <strong style="color: var(--text-dark);">${s}%</strong></div>`;
            }
        }

        document.getElementById('modal-selected-level').textContent = targetLevel;
        document.getElementById('modal-recommended-level').textContent = recommendedLevel;
        
        overlay.style.display = 'flex';

        document.getElementById('btn-use-recommended').onclick = () => {
            localStorage.setItem('userLevel', recommendedLevel);
            localStorage.setItem('xyverra_selected_level', `I am a ${recommendedLevel}`);
            window.location.href = 'skill-input.html';
        };

        document.getElementById('btn-use-selected').onclick = () => {
            localStorage.setItem('userLevel', targetLevel);
            localStorage.setItem('xyverra_selected_level', `I am a ${targetLevel}`);
            window.location.href = 'skill-input.html';
        };
    }
});

