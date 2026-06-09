/* =========================================================
   floating-ai.js
   Injects a floating AI Counselor widget into the page
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject HTML and CSS
    const widgetHTML = `
        <!-- Floating AI Button -->
        <div id="ai-floating-btn" class="ai-floating-btn" title="Ask AI Counselor">
            <i class="fas fa-robot"></i>
        </div>

        <!-- AI Chat Window -->
        <div id="ai-floating-chat" class="ai-floating-chat">
            <div class="ai-chat-header">
                <div>
                    <i class="fas fa-robot"></i>
                    <span>XYVEERA Assistant</span>
                </div>
                <button id="ai-chat-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="ai-chat-body" id="ai-chat-body">
                <div class="ai-message ai">
                    Hi! I'm your learning companion. Do you have any questions about this module or your roadmap?
                </div>
            </div>
            <div class="ai-chat-footer">
                <input type="text" id="ai-chat-input" placeholder="Ask a question..." />
                <button id="ai-chat-send"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>

        <style>
            .ai-floating-btn {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--primary), var(--accent));
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                box-shadow: 0 4px 15px rgba(37,99,235,0.4);
                cursor: pointer;
                z-index: 1000;
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
            }
            .ai-floating-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(37,99,235,0.6);
            }
            
            .ai-floating-chat {
                position: fixed;
                bottom: 6rem;
                right: 2rem;
                width: 350px;
                height: 450px;
                background: var(--bg-surface);
                border-radius: var(--radius-xl);
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                border: 1px solid var(--border);
                display: flex;
                flex-direction: column;
                z-index: 1000;
                opacity: 0;
                pointer-events: none;
                transform: translateY(20px);
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                overflow: hidden;
            }
            .ai-floating-chat.active {
                opacity: 1;
                pointer-events: all;
                transform: translateY(0);
            }
            
            .ai-chat-header {
                background: linear-gradient(135deg, var(--primary), var(--accent));
                color: white;
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-weight: 600;
            }
            .ai-chat-header div { display: flex; align-items: center; gap: 0.5rem; }
            .ai-chat-header button {
                background: transparent;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 1.1rem;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            .ai-chat-header button:hover { opacity: 1; }
            
            .ai-chat-body {
                flex: 1;
                padding: 1rem;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                background: var(--bg-surface-solid);
            }
            .ai-message {
                max-width: 85%;
                padding: 0.8rem 1rem;
                border-radius: var(--radius-lg);
                font-size: 0.9rem;
                line-height: 1.4;
            }
            .ai-message.ai {
                background: var(--bg-surface);
                border: 1px solid var(--border);
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }
            .ai-message.user {
                background: var(--primary);
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }
            
            .ai-chat-footer {
                padding: 1rem;
                border-top: 1px solid var(--border);
                display: flex;
                gap: 0.5rem;
                background: var(--bg-surface);
            }
            .ai-chat-footer input {
                flex: 1;
                padding: 0.8rem 1rem;
                border: 1px solid var(--border);
                border-radius: var(--radius-full);
                outline: none;
                transition: border-color 0.2s;
                font-family: inherit;
            }
            .ai-chat-footer input:focus { border-color: var(--primary); }
            .ai-chat-footer button {
                background: var(--primary);
                color: white;
                border: none;
                width: 42px;
                height: 42px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s;
            }
            .ai-chat-footer button:hover { transform: scale(1.05); }
        </style>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // 2. Add Logic
    const btn = document.getElementById('ai-floating-btn');
    const chat = document.getElementById('ai-floating-chat');
    const closeBtn = document.getElementById('ai-chat-close');
    const sendBtn = document.getElementById('ai-chat-send');
    const input = document.getElementById('ai-chat-input');
    const body = document.getElementById('ai-chat-body');

    btn.addEventListener('click', () => {
        chat.classList.toggle('active');
        if (chat.classList.contains('active')) input.focus();
    });

    closeBtn.addEventListener('click', () => chat.classList.remove('active'));

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // User message
        body.insertAdjacentHTML('beforeend', \`<div class="ai-message user">\${text}</div>\`);
        input.value = '';
        body.scrollTop = body.scrollHeight;

        // Mock AI thinking
        setTimeout(() => {
            const aiId = 'msg-' + Date.now();
            body.insertAdjacentHTML('beforeend', \`<div class="ai-message ai" id="\${aiId}"><i class="fas fa-ellipsis-h" style="animation: pulse 1s infinite;"></i></div>\`);
            body.scrollTop = body.scrollHeight;

            // Mock AI response
            setTimeout(() => {
                const aiMsg = document.getElementById(aiId);
                if (aiMsg) {
                    aiMsg.innerHTML = "That's a great question! I'm here to help you understand the concepts in your roadmap. Could you specify which part you are struggling with?";
                    body.scrollTop = body.scrollHeight;
                }
            }, 1200);
        }, 500);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
