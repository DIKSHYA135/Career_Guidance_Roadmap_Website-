/* =========================================================
   floating-ai.js
   Injects a floating AI Counselor widget into the page.
   Every conversation is persisted to the database via
   /api/ai-chat/* endpoints for admin oversight.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const API_BASE = 'http://localhost:5000';
    let conversationId = null;
    let isProcessing = false;

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
                    <span>XYVERRA Assistant</span>
                </div>
                <div style="display:flex;gap:0.5rem;align-items:center;">
                    <span id="ai-chat-status" style="font-size:0.7rem;background:rgba(255,255,255,0.2);padding:2px 8px;border-radius:20px;">Online</span>
                    <button id="ai-chat-close"><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div class="ai-chat-body" id="ai-chat-body">
                <div class="ai-message ai">
                    Hi! I'm your Xyverra AI Career Counselor. Ask me anything about your roadmap, career path, or skills!
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
                overflow-y: auto;
                padding: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .ai-message {
                padding: 0.75rem 1rem;
                border-radius: 12px;
                font-size: 0.9rem;
                line-height: 1.5;
                max-width: 88%;
                word-wrap: break-word;
            }
            .ai-message.user {
                background: linear-gradient(135deg, var(--primary), var(--accent));
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }
            .ai-message.ai {
                background: var(--bg-card, #f8fafc);
                color: var(--text, #1e293b);
                align-self: flex-start;
                border-bottom-left-radius: 4px;
                border: 1px solid var(--border, #e2e8f0);
            }
            .ai-message.thinking {
                opacity: 0.6;
                font-style: italic;
            }

            .ai-chat-footer {
                padding: 0.75rem 1rem;
                border-top: 1px solid var(--border);
                display: flex;
                gap: 0.5rem;
                align-items: center;
            }
            .ai-chat-footer input {
                flex: 1;
                padding: 0.6rem 0.9rem;
                border: 1px solid var(--border);
                border-radius: 20px;
                font-size: 0.9rem;
                outline: none;
                background: var(--bg-input, #f8fafc);
                color: var(--text);
                transition: border-color 0.2s;
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
                transition: transform 0.2s, opacity 0.2s;
            }
            .ai-chat-footer button:hover { transform: scale(1.05); }
            .ai-chat-footer button:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        </style>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // 2. Elements
    const btn       = document.getElementById('ai-floating-btn');
    const chat      = document.getElementById('ai-floating-chat');
    const closeBtn  = document.getElementById('ai-chat-close');
    const sendBtn   = document.getElementById('ai-chat-send');
    const input     = document.getElementById('ai-chat-input');
    const body      = document.getElementById('ai-chat-body');
    const statusEl  = document.getElementById('ai-chat-status');

    // 3. Toggle open/close
    btn.addEventListener('click', async () => {
        chat.classList.toggle('active');
        if (chat.classList.contains('active')) {
            input.focus();
            if (!conversationId) await startConversation();
        }
    });

    closeBtn.addEventListener('click', async () => {
        chat.classList.remove('active');
        if (conversationId) await endConversation();
    });

    // 4. Start a conversation on the backend
    async function startConversation() {
        const token = localStorage.getItem('token');
        if (!token) return; // Not logged in — widget still works but won't log

        try {
            const res = await fetch(`${API_BASE}/api/ai-chat/start`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (data.success) conversationId = data.conversationId;
        } catch (e) {
            console.warn('AI chat: could not start conversation (offline?)');
        }
    }

    async function endConversation() {
        const token = localStorage.getItem('token');
        if (!token || !conversationId) return;
        try {
            await fetch(`${API_BASE}/api/ai-chat/end`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ conversationId })
            });
            conversationId = null;
        } catch (e) { /* silent */ }
    }

    // 5. Send message
    async function sendMessage() {
        if (isProcessing) return;
        const text = input.value.trim();
        if (!text) return;

        // Append user message
        appendMessage(text, 'user');
        input.value = '';
        isProcessing = true;
        sendBtn.disabled = true;
        statusEl.textContent = 'Thinking…';

        // Show typing indicator
        const thinkingId = 'think-' + Date.now();
        body.insertAdjacentHTML('beforeend',
            `<div class="ai-message ai thinking" id="${thinkingId}"><i class="fas fa-ellipsis-h"></i></div>`);
        body.scrollTop = body.scrollHeight;

        const token = localStorage.getItem('token');

        try {
            let aiText = null;

            if (token && conversationId) {
                // Real API call with persistence
                const res = await fetch(`${API_BASE}/api/ai-chat/message`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ conversationId, message: text })
                });
                const data = await res.json();
                if (data.success) aiText = data.response;
            }

            // Fallback if not logged in or API error
            if (!aiText) {
                aiText = "I'm here to help with your career journey! For personalized guidance, please make sure you're logged in.";
            }

            const thinkingEl = document.getElementById(thinkingId);
            if (thinkingEl) thinkingEl.remove();
            appendMessage(aiText, 'ai');

        } catch (err) {
            const thinkingEl = document.getElementById(thinkingId);
            if (thinkingEl) thinkingEl.remove();
            appendMessage("Sorry, I'm having trouble connecting right now. Please try again in a moment.", 'ai');
        } finally {
            isProcessing = false;
            sendBtn.disabled = false;
            statusEl.textContent = 'Online';
        }
    }

    function appendMessage(text, sender) {
        body.insertAdjacentHTML('beforeend', `<div class="ai-message ${sender}">${escapeHtml(text)}</div>`);
        body.scrollTop = body.scrollHeight;
    }

    function escapeHtml(str) {
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
});
