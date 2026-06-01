// auth-popup.js - Shared success popup system for authentication pages

(function() {
    // ── 1. Inject Styles dynamically ──
    const styles = `
        .auth-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(5, 7, 15, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            opacity: 0;
            transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
        }
        .auth-popup-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
        .auth-popup-modal {
            background: rgba(17, 24, 39, 0.85);
            border: 1px solid rgba(0, 217, 255, 0.18);
            border-radius: 24px;
            padding: 2.5rem 2.2rem;
            max-width: 380px;
            width: 90%;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 
                        0 0 30px rgba(0, 217, 255, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
            transform: scale(0.85);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            backdrop-filter: blur(24px) saturate(120%);
            -webkit-backdrop-filter: blur(24px) saturate(120%);
            outline: none;
        }
        .auth-popup-overlay.active .auth-popup-modal {
            transform: scale(1);
        }
        .auth-popup-overlay.closing {
            opacity: 0;
            pointer-events: none;
        }
        .auth-popup-overlay.closing .auth-popup-modal {
            transform: scale(0.9);
            transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .auth-popup-message {
            font-size: 1.25rem;
            font-weight: 800;
            color: #ffffff;
            margin-top: 1.5rem;
            line-height: 1.4;
            font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
            letter-spacing: -0.02em;
        }

        /* SVG checkmark animation */
        .auth-checkmark-svg {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            display: block;
            stroke-width: 4;
            stroke: #10b981;
            stroke-miterlimit: 10;
            margin: 0 auto;
            box-shadow: inset 0px 0px 0px #10b981;
            animation: fillCheckmark .4s ease-in-out .4s forwards, scaleCheckmark .3s ease-in-out 0s both;
        }
        .auth-checkmark-circle {
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            stroke-width: 4;
            stroke-miterlimit: 10;
            stroke: #10b981;
            fill: none;
            animation: strokeCircle .6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .auth-checkmark-check {
            transform-origin: 50% 50%;
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            animation: strokeCheck 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
        }

        @keyframes strokeCircle {
            100% { stroke-dashoffset: 0; }
        }
        @keyframes strokeCheck {
            100% { stroke-dashoffset: 0; }
        }
        @keyframes fillCheckmark {
            100% { box-shadow: inset 0px 0px 0px 36px rgba(16, 185, 129, 0.1); }
        }
        @keyframes scaleCheckmark {
            0%, 100% { transform: none; }
            50% { transform: scale3d(1.15, 1.15, 1); }
        }
    `;

    const styleEl = document.createElement("style");
    styleEl.innerHTML = styles;
    document.head.appendChild(styleEl);

    // ── 2. Synthesize success chime sound ──
    function playSuccessChime() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const audioCtx = new AudioContext();

            // Note 1 (E5)
            const osc1 = audioCtx.createOscillator();
            const gain1 = audioCtx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5
            gain1.gain.setValueAtTime(0, audioCtx.currentTime);
            gain1.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
            gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
            osc1.connect(gain1);
            gain1.connect(audioCtx.destination);
            osc1.start();
            osc1.stop(audioCtx.currentTime + 0.4);

            // Note 2 (A5 - harmonious perfect fourth)
            setTimeout(() => {
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(880.00, audioCtx.currentTime); // A5
                gain2.gain.setValueAtTime(0, audioCtx.currentTime);
                gain2.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.05);
                gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);
                osc2.start();
                osc2.stop(audioCtx.currentTime + 0.55);
            }, 90);
        } catch (e) {
            console.warn("Web Audio API not allowed/blocked:", e);
        }
    }

    // ── 3. Define and register global showSuccessPopup function ──
    window.showSuccessPopup = function(message) {
        return new Promise((resolve) => {
            // Save currently focused element to restore it later
            const previouslyFocused = document.activeElement;

            // Create popup overlay
            const overlay = document.createElement("div");
            overlay.className = "auth-popup-overlay";
            overlay.setAttribute("aria-hidden", "true");

            // Create popup modal
            const modal = document.createElement("div");
            modal.className = "auth-popup-modal";
            modal.setAttribute("role", "dialog");
            modal.setAttribute("aria-modal", "true");
            modal.setAttribute("tabindex", "0");

            // Populate inner content
            modal.innerHTML = `
                <svg class="auth-checkmark-svg" viewBox="0 0 52 52" aria-hidden="true">
                    <circle class="auth-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                    <path class="auth-checkmark-check" fill="none" d="M14.1 27.2 l7.1 7.2 16.7 -16.8" />
                </svg>
                <div class="auth-popup-message">${message}</div>
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            // Access to close popup cleanly
            let isClosed = false;
            const closePopup = () => {
                if (isClosed) return;
                isClosed = true;

                // Close animation
                overlay.classList.add("closing");
                overlay.classList.remove("active");

                // Keyboard listener cleanups
                document.removeEventListener("keydown", handleKeydown);

                setTimeout(() => {
                    overlay.remove();
                    if (previouslyFocused) previouslyFocused.focus();
                    resolve();
                }, 250);
            };

            // Keyboard listener (Escape to close, Tab locking for accessibility)
            const handleKeydown = (e) => {
                if (e.key === "Escape") {
                    e.preventDefault();
                    closePopup();
                } else if (e.key === "Tab") {
                    // Lock focus inside the modal dialog
                    e.preventDefault();
                    modal.focus();
                }
            };

            document.addEventListener("keydown", handleKeydown);

            // Display overlay & trigger transition
            requestAnimationFrame(() => {
                overlay.classList.add("active");
                overlay.removeAttribute("aria-hidden");
                
                // Focus modal dialog for screenreaders
                modal.focus();
                
                // Audio cue
                playSuccessChime();
            });

            // Auto-close after 2.5 seconds
            setTimeout(closePopup, 2500);
        });
    };
})();
