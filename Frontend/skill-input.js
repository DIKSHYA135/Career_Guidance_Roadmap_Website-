/* =========================================================
   skill-input.js  –  Level selection + verification quiz gate
   =========================================================

   Flow:
   • Beginner  → directly shows AI overlay → roadmap.html
   • Intermediate → quiz on 2 beginner modules → if pass, roadmap; if fail, suggest lower
   • Advanced     → quiz on beginner + intermediate modules → same gate
   • Capstone     → quiz on all previous modules → same gate
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    let assignedLevel = '';
    const generateBtn  = document.getElementById('generate-btn');
    const levelCards   = document.querySelectorAll('.level-card');

    // ── Level card selection ──
    levelCards.forEach(card => {
        card.addEventListener('click', () => {
            levelCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            assignedLevel = card.getAttribute('data-level');
            generateBtn.disabled = false;

            // Update button label based on level
            if (assignedLevel === 'Beginner') {
                generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate My Roadmap';
            } else {
                generateBtn.innerHTML = '<i class="fas fa-shield-alt"></i> Continue to Skill Verification';
            }
        });
    });

    // ── Module maps for quiz verification ──
    // Each level triggers a quiz on certain topic modules
    const VERIFICATION_MODULES = {
        'Intermediate': {
            label: 'Beginner Verification',
            description: 'Prove you know the basics before we place you at Intermediate.',
            // 2 beginner modules from their career path
            moduleCount: 2,
            levels: ['Beginner'],
            quizLimit: 6  // 6 questions total
        },
        'Advanced': {
            label: 'Intermediate Verification',
            description: 'Prove your Beginner + Intermediate knowledge.',
            moduleCount: 4,
            levels: ['Beginner', 'Intermediate'],
            quizLimit: 8
        },
        'Capstone': {
            label: 'Full Verification',
            description: 'Comprehensive verification across all levels.',
            moduleCount: 6,
            levels: ['Beginner', 'Intermediate', 'Advanced'],
            quizLimit: 10
        }
    };

    // ── Generate / Continue button ──
    generateBtn.addEventListener('click', async (e) => {
        if (!assignedLevel) return;

        // Save level
        localStorage.setItem('userLevel', assignedLevel);

        // Ensure path is set
        const targetCareer = localStorage.getItem('xyverra_target_career');
        let finalPath = localStorage.getItem('xyverra_selected_path');
        if (!finalPath && targetCareer) {
            finalPath = targetCareer;
            localStorage.setItem('xyverra_selected_path', targetCareer);
        }
        if (!finalPath) {
            // No path selected at all — go back to career discovery
            window.location.replace('career-discovery.html');
            return;
        }

        // Beginner → skip quiz, go directly to roadmap with AI animation
        if (assignedLevel === 'Beginner') {
            showAIOverlayAndRedirect();
            return;
        }

        // Non-beginner → gate with verification quiz
        const verConfig = VERIFICATION_MODULES[assignedLevel];
        if (verConfig) {
            // Save pending level so verification page knows what level was claimed
            localStorage.setItem('xyverra_pending_level', assignedLevel);
            localStorage.setItem('xyverra_verify_config', JSON.stringify(verConfig));

            // Build quiz URL using the scalable quiz system
            // Pass: category = selected path, targetLevel = first level to test, specificModules flag
            const category = encodeURIComponent(finalPath);
            const targetLevel = encodeURIComponent(verConfig.levels[0]);
            const limit = verConfig.quizLimit;

            // Use the existing quiz page in verification mode
            const quizUrl = `quiz.html?verify=true&category=${category}&targetLevel=${targetLevel}&quizLimit=${limit}&verifyLevel=${encodeURIComponent(assignedLevel)}`;
            window.location.href = quizUrl;
        }
    });

    // ── AI Loading Overlay → redirect to roadmap ──
    function showAIOverlayAndRedirect() {
        const overlay    = document.getElementById('ai-loading-overlay');
        const progressBar = document.getElementById('ai-progress-bar');
        const stepsList  = document.querySelectorAll('#ai-loading-steps li');

        // Save onboarding complete flag
        localStorage.setItem('xyverra_onboarded', 'true');

        if (overlay) {
            overlay.classList.add('active');

            setTimeout(() => { progressBar.style.width = '30%'; stepsList[0].className = 'step-active'; }, 400);
            setTimeout(() => { progressBar.style.width = '60%'; stepsList[0].className = 'step-done'; stepsList[1].className = 'step-active'; }, 1800);
            setTimeout(() => { progressBar.style.width = '90%'; stepsList[1].className = 'step-done'; stepsList[2].className = 'step-active'; }, 3200);
            setTimeout(() => {
                progressBar.style.width = '100%';
                stepsList[2].className = 'step-done';
                document.getElementById('ai-loading-text').textContent = 'Roadmap generated!';
            }, 4500);
            setTimeout(() => { window.location.href = 'roadmap.html'; }, 5200);
        } else {
            window.location.href = 'roadmap.html';
        }
    }

    // ── Handle return from verification quiz ──
    // When quiz.html?verify=true finishes, it saves xyverra_verify_result = 'pass' | 'fail'
    // and redirects back here with ?verified=true
    const params = new URLSearchParams(window.location.search);
    if (params.get('verified') === 'true') {
        const result = localStorage.getItem('xyverra_verify_result');
        const pendingLevel = localStorage.getItem('xyverra_pending_level') || 'Intermediate';

        if (result === 'pass') {
            // Confirm level and generate roadmap
            localStorage.setItem('userLevel', pendingLevel);
            localStorage.removeItem('xyverra_verify_result');
            localStorage.removeItem('xyverra_pending_level');
            showVerificationSuccess(pendingLevel, () => showAIOverlayAndRedirect());
        } else {
            // Failed — suggest dropping down one level
            showVerificationFail(pendingLevel);
        }
    }

    function showVerificationSuccess(level, onContinue) {
        const container = document.querySelector('.dashboard-container');
        if (!container) { onContinue(); return; }

        container.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:65vh;text-align:center;padding:3rem 2rem;">
                <div style="font-size:4rem;margin-bottom:1.5rem;animation:pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275);">🎉</div>
                <h2 style="font-size:2rem;font-weight:800;color:var(--text-dark);margin-bottom:0.75rem;">Verification Passed!</h2>
                <p style="color:var(--text-muted);max-width:440px;line-height:1.65;margin-bottom:2rem;">
                    Great work! You've proven your <strong>${level}</strong>-level knowledge. We'll now generate your personalized roadmap.
                </p>
                <button onclick="continueToRoadmap()" class="btn-generate" style="background:linear-gradient(135deg,var(--primary),var(--accent));color:white;padding:14px 32px;border-radius:100px;border:none;font-weight:700;font-size:1rem;cursor:pointer;box-shadow:0 8px 20px -5px rgba(37,99,235,0.35);">
                    <i class="fas fa-magic"></i> Generate My Roadmap
                </button>
            </div>
        `;
        window.continueToRoadmap = onContinue;
    }

    function showVerificationFail(claimedLevel) {
        const levelOrder = ['Beginner', 'Intermediate', 'Advanced', 'Capstone'];
        const currentIdx = levelOrder.indexOf(claimedLevel);
        const suggestedLevel = levelOrder[Math.max(0, currentIdx - 1)];

        const container = document.querySelector('.dashboard-container');
        if (!container) return;

        container.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:65vh;text-align:center;padding:3rem 2rem;">
                <div style="font-size:4rem;margin-bottom:1.5rem;">🤔</div>
                <h2 style="font-size:2rem;font-weight:800;color:var(--text-dark);margin-bottom:0.75rem;">Not Quite Yet</h2>
                <p style="color:var(--text-muted);max-width:480px;line-height:1.65;margin-bottom:0.5rem;">
                    The quiz suggests you might not be fully ready for <strong>${claimedLevel}</strong> yet.
                    We recommend starting at <strong>${suggestedLevel}</strong> for the best learning experience.
                </p>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:2.5rem;">Don't worry. You can always level up later!</p>
                <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;">
                    <button onclick="acceptSuggestion('${suggestedLevel}')" class="btn-generate" style="background:linear-gradient(135deg,var(--primary),var(--accent));color:white;padding:14px 28px;border-radius:100px;border:none;font-weight:700;font-size:0.95rem;cursor:pointer;box-shadow:0 8px 20px -5px rgba(37,99,235,0.35);">
                        <i class="fas fa-check"></i> Start at ${suggestedLevel}
                    </button>
                    <button onclick="retryLevel('${claimedLevel}')" style="background:transparent;border:1.5px solid var(--border);color:var(--text-muted);padding:13px 26px;border-radius:100px;font-weight:600;font-size:0.95rem;cursor:pointer;">
                        <i class="fas fa-redo"></i> Retry Verification
                    </button>
                </div>
            </div>
        `;

        window.acceptSuggestion = function(level) {
            localStorage.setItem('userLevel', level);
            localStorage.removeItem('xyverra_verify_result');
            localStorage.removeItem('xyverra_pending_level');
            showAIOverlayAndRedirect();
        };

        window.retryLevel = function(level) {
            localStorage.removeItem('xyverra_verify_result');
            window.location.href = 'skill-input.html';
        };
    }

    // ── Backend sync (non-blocking) ──
    function syncToBackend(path, level) {
        const token = localStorage.getItem('token');
        if (!token) return;
        fetch((window.XYVERRA_CONFIG?.API_BASE || 'http://localhost:5000') + '/api/user/save-onboarding', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                interests: [path],
                skills: [],
                selectedLevel: level,
                careerGoal: `Master ${path}`,
                timeline: '6 months',
                weeklyHours: '10'
            })
        }).catch(err => console.warn('Backend sync failed (offline-safe):', err));
    }
});
