// ai-recommendation.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject the AI Recommendation Modal HTML into the body IF it doesn't already exist
    if (!document.getElementById('aiExitOverlay')) {
        const modalHTML = `
            <div class="ai-exit-overlay" id="aiExitOverlay">
                <div class="ai-exit-modal" id="aiExitModal">
                    <div class="ai-modal-header">
                        <div class="ai-avatar-icon"><i class="fas fa-robot"></i></div>
                        <div>
                            <h3 class="ai-modal-title">Wait! Before you go...</h3>
                            <p class="ai-modal-subtitle" id="aiModalQuestion">Why are you leaving this course/roadmap?</p>
                        </div>
                    </div>

                    <div class="ai-reasons-grid" id="aiReasonsContainer">
                        <button class="ai-reason-btn" data-reason="too_hard">Course too hard</button>
                        <button class="ai-reason-btn" data-reason="no_time">No time</button>
                        <button class="ai-reason-btn" data-reason="confused">Confused</button>
                        <button class="ai-reason-btn" data-reason="need_easier">Need easier roadmap</button>
                        <button class="ai-reason-btn" data-reason="personal">Personal reason</button>
                    </div>

                    <textarea class="ai-problem-input" id="aiProblemInput" placeholder="Describe your problem... (optional)" style="display: none;"></textarea>

                    <div class="ai-processing" id="aiProcessing">
                        <div class="ai-typing-dots">
                            <div class="ai-dot"></div>
                            <div class="ai-dot"></div>
                            <div class="ai-dot"></div>
                        </div>
                        <span class="ai-processing-text">Analyzing your learning path...</span>
                    </div>

                    <div class="ai-recommendation-card" id="aiRecommendationCard">
                        <h4 class="ai-rec-title"><i class="fas fa-magic"></i> AI Recommendation</h4>
                        <p class="ai-rec-content" id="aiRecContent"></p>
                        <span class="ai-rec-suggestion" id="aiRecSuggestion"></span>
                    </div>

                    <div class="ai-modal-actions">
                        <button class="ai-btn ai-btn-exit" id="aiBtnExitAnyway">Exit Anyway</button>
                        <button class="ai-btn ai-btn-secondary" id="aiBtnPause" style="display: none;">Pause Course</button>
                        <button class="ai-btn ai-btn-primary" id="aiBtnContinue">Continue Learning</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // DOM Elements
    const overlay = document.getElementById('aiExitOverlay');
    const reasonsBtns = document.querySelectorAll('.ai-reason-btn');
    const problemInput = document.getElementById('aiProblemInput');
    const processing = document.getElementById('aiProcessing');
    const recCard = document.getElementById('aiRecommendationCard');
    const recContent = document.getElementById('aiRecContent');
    const recSuggestion = document.getElementById('aiRecSuggestion');
    
    const btnExitAnyway = document.getElementById('aiBtnExitAnyway');
    const btnPause = document.getElementById('aiBtnPause');
    const btnContinue = document.getElementById('aiBtnContinue');
    const reasonsContainer = document.getElementById('aiReasonsContainer');

    let pendingExitUrl = '';
    let selectedReason = '';

    // Recommendations Logic mapping
    const aiKnowledgeBase = {
        'too_hard': {
            message: "It looks like the current modules might be a bit steep right now. That's completely normal in tech!",
            suggestion: "Revise basics first"
        },
        'no_time': {
            message: "We get it, life is busy. You don't have to quit, you can just take a break and come back later.",
            suggestion: "Slow learning pace"
        },
        'confused': {
            message: "Conceptual gaps can make progress frustrating. A quick refresher usually does the trick.",
            suggestion: "Retry previous quiz"
        },
        'need_easier': {
            message: "Your current path is set to an advanced level. We can adjust the difficulty to match your current comfort zone.",
            suggestion: "Switch to beginner roadmap"
        },
        'personal': {
            message: "Whatever it is, we hope everything is okay. Xyverra will save your progress right here for when you return.",
            suggestion: "Pause Course"
        }
    };

    // 2. Intercept Exit Clicks
    // Targets: #btn-exit-quiz, .quiz-back-link, .ai-exit-trigger
    const exitTriggers = document.querySelectorAll('#btn-exit-quiz, .quiz-back-link, .ai-exit-trigger');
    
    exitTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Determine where they were trying to go
            if (trigger.tagName.toLowerCase() === 'a') {
                pendingExitUrl = trigger.getAttribute('href');
            } else {
                // If it's a button like "Exit Quiz"
                pendingExitUrl = 'roadmap.html'; 
            }
            
            openModal();
        });
    });

    function openModal() {
        overlay.classList.add('active');
        resetModal();
    }

    function closeModal() {
        overlay.classList.remove('active');
    }

    function resetModal() {
        reasonsBtns.forEach(b => b.classList.remove('selected'));
        problemInput.style.display = 'none';
        problemInput.value = '';
        processing.classList.remove('active');
        recCard.classList.remove('active');
        reasonsContainer.style.display = 'flex';
        btnPause.style.display = 'none';
        selectedReason = '';
    }

    // 3. Handle Reason Selection
    reasonsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            reasonsBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedReason = btn.dataset.reason;
            
            // Show text area
            problemInput.style.display = 'block';
            
            // Trigger AI processing simulation
            reasonsContainer.style.display = 'none';
            problemInput.style.display = 'none';
            processing.classList.add('active');
            
            // Simulate API/AI delay
            setTimeout(() => {
                showRecommendation(selectedReason);
            }, 1500);
        });
    });

    function showRecommendation(reason) {
        processing.classList.remove('active');
        recCard.classList.add('active');
        
        const data = aiKnowledgeBase[reason] || aiKnowledgeBase['personal'];
        recContent.textContent = data.message;
        recSuggestion.textContent = "Recommended: " + data.suggestion;
        
        // Show pause button as an alternative option now
        btnPause.style.display = 'inline-block';
        
        // Save interaction to localStorage
        const dropOutData = JSON.parse(localStorage.getItem('xyverra_dropout_logs') || '[]');
        dropOutData.push({
            reason: reason,
            details: problemInput.value,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('xyverra_dropout_logs', JSON.stringify(dropOutData));
    }

    // 4. Handle Actions
    btnContinue.addEventListener('click', () => {
        closeModal();
    });

    btnExitAnyway.addEventListener('click', () => {
        if (pendingExitUrl) {
            window.location.href = pendingExitUrl;
        } else {
            window.location.href = 'dashboard.html';
        }
    });

    btnPause.addEventListener('click', () => {
        // Just mark as paused and exit
        localStorage.setItem('roadmap_status', 'paused');
        if (pendingExitUrl) {
            window.location.href = pendingExitUrl;
        } else {
            window.location.href = 'dashboard.html';
        }
    });
    
    // Close on outside click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
});
