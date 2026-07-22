/* counselor.js - AI Counselor with Groq AI + 3-free-question monetization */

document.addEventListener('DOMContentLoaded', () => {
    /* ============================================================
     * CONFIG & STATE
     * ============================================================ */
    const FREE_LIMIT = 3;
    const API_BASE = (window.XYVERRA_API_BASE || 'http://localhost:5000').replace(/\/$/, '');

    const LS = {
        used: 'chatMessagesUsed',
        sub: 'chatSubscriptionActive',
        history: 'chatHistory',
        lastTopic: 'chatLastTopic'
    };

    // DOM refs
    const chatHistoryEl = document.getElementById('chat-history');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const promptChips = document.querySelectorAll('.prompt-chip');
    const suggestedPrompts = document.getElementById('suggested-prompts');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    const usageBar = document.getElementById('usage-bar');
    const usageDots = document.getElementById('usage-dots');
    const usageText = document.getElementById('usage-text');
    const premiumBadge = document.getElementById('premium-badge');
    const upgradeInline = document.getElementById('upgrade-inline');
    const upgradeInlineBtn = document.getElementById('upgrade-inline-btn');

    const subOverlay = document.getElementById('sub-overlay');
    const subOfferView = document.getElementById('sub-offer-view');
    const subSuccessView = document.getElementById('sub-success-view');
    const subSubscribeBtn = document.getElementById('sub-subscribe-btn');
    const subLaterBtn = document.getElementById('sub-later-btn');
    const subCloseBtn = document.getElementById('sub-close');
    const subDoneBtn = document.getElementById('sub-done-btn');

    /* ============================================================
     * USER CONTEXT
     * ============================================================ */
    const userName = localStorage.getItem('xyverra_user_name') || 'there';
    const firstName = userName.split(' ')[0] || 'there';
    const userInitials = (userName === 'there' ? 'US'
        : userName.split(' ').map(n => n[0] || '').join('').substring(0, 2).toUpperCase()) || 'US';
    const selectedPath = localStorage.getItem('xyverra_target_career')
        || localStorage.getItem('xyverra_selected_path') || '';
    const selectedLevel = localStorage.getItem('xyverra_selected_level')
        || localStorage.getItem('xyverra_level') || '';

    /* ============================================================
     * PERSISTENCE HELPERS
     * ============================================================ */
    const getUsed = () => parseInt(localStorage.getItem(LS.used) || '0', 10) || 0;
    const setUsed = (n) => localStorage.setItem(LS.used, String(n));
    const isSubscribed = () => localStorage.getItem(LS.sub) === 'true' || (typeof window.XyIsPro === 'function' && window.XyIsPro());

    const loadHistory = () => {
        try { return JSON.parse(localStorage.getItem(LS.history)) || []; }
        catch (e) { return []; }
    };
    const saveHistory = (arr) => localStorage.setItem(LS.history, JSON.stringify(arr));
    const pushHistory = (role, content) => {
        const arr = loadHistory();
        arr.push({ role, content, timestamp: Date.now() });
        // Keep last 50 messages
        if (arr.length > 50) arr.splice(0, arr.length - 50);
        saveHistory(arr);
    };

    const formatTime = (ts) => {
        const d = new Date(ts);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    /* ============================================================
     * BACKEND SYNC (best-effort, non-blocking)
     * ============================================================ */
    const apiHeaders = () => {
        const h = { 'Content-Type': 'application/json' };
        const token = localStorage.getItem('xyverra_token') || localStorage.getItem('token');
        if (token) h['Authorization'] = 'Bearer ' + token;
        return h;
    };

    // Send message to backend - returns aiResponse if Groq available
    const syncMessage = async (content) => {
        try {
            const res = await fetch(API_BASE + '/api/chat/message', {
                method: 'POST',
                headers: apiHeaders(),
                body: JSON.stringify({ content, history: loadHistory() })
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                if (res.status === 403 && data.blocked) {
                    return { blocked: true };
                }
                return null;
            }
            const data = await res.json();
            if (typeof data.messagesUsed === 'number') setUsed(data.messagesUsed);
            if (data.isSubscriber) localStorage.setItem(LS.sub, 'true');
            return data;
        } catch (e) {
            return null; // offline / no backend: localStorage remains source of truth
        }
    };

    // Load chat history from backend on init
    const loadHistoryFromBackend = async () => {
        try {
            const res = await fetch(API_BASE + '/api/chat/history', { headers: apiHeaders() });
            if (!res.ok) return;
            const data = await res.json();
            if (data.success && Array.isArray(data.history) && data.history.length > 0) {
                // Only use backend history if it's newer than local
                const localHistory = loadHistory();
                if (data.history.length > localHistory.length) {
                    saveHistory(data.history);
                }
            }
            if (typeof data.messagesUsed === 'number') setUsed(data.messagesUsed);
            if (data.isSubscriber) localStorage.setItem(LS.sub, 'true');
        } catch (e) { /* offline */ }
    };

    const subscribeBackend = async () => {
        try {
            const res = await fetch(API_BASE + '/api/chat/subscribe', {
                method: 'POST',
                headers: apiHeaders(),
                body: JSON.stringify({ plan: 'premium_monthly' })
            });
            if (!res.ok) return false;
            const data = await res.json().catch(() => ({}));
            return data.success || false;
        } catch (e) {
            return false;
        }
    };

    /* ============================================================
     * UI STATE RENDERING
     * ============================================================ */
    const limitReached = () => !isSubscribed() && getUsed() >= FREE_LIMIT;

    const renderUsage = () => {
        const used = getUsed();
        const subbed = isSubscribed();

        if (subbed) {
            premiumBadge.style.display = 'inline-flex';
            usageText.textContent = 'Unlimited questions';
            usageDots.innerHTML = '';
            usageBar.classList.remove('warning', 'blocked');
        } else {
            premiumBadge.style.display = 'none';
            usageText.textContent = `${Math.min(used, FREE_LIMIT)} of ${FREE_LIMIT} free questions used`;
            usageDots.innerHTML = '';
            for (let i = 0; i < FREE_LIMIT; i++) {
                const dot = document.createElement('span');
                dot.className = 'usage-dot' + (i < used ? ' filled' : '');
                usageDots.appendChild(dot);
            }
            usageBar.classList.toggle('warning', used === FREE_LIMIT - 1);
            usageBar.classList.toggle('blocked', used >= FREE_LIMIT);
        }

        const blocked = limitReached();
        chatInput.disabled = blocked;
        sendBtn.disabled = blocked;
        upgradeInline.style.display = blocked ? 'flex' : 'none';
        chatInput.placeholder = blocked
            ? 'Upgrade to Premium to keep chatting...'
            : 'Type your message here...';
    };

    /* ============================================================
     * MESSAGE RENDERING
     * ============================================================ */
    const scrollToBottom = () => { chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight; };

    // Render markdown-style text (bold, bullet points, line breaks)
    const formatAIText = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>')               // italic
            .replace(/^- (.+)$/gm, '<li>$1</li>')              // bullet points
            .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')        // wrap lists
            .replace(/\n\n/g, '</p><p>')                        // paragraphs
            .replace(/\n/g, '<br>');                            // line breaks
    };

    const renderMessage = (text, isUser, ts) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
        const avatarHtml = isUser
            ? `<div class="message-avatar">${userInitials}</div>`
            : `<div class="message-avatar"><i class="fas fa-robot"></i></div>`;

        const formattedText = isUser ? text : formatAIText(text);

        msgDiv.innerHTML = `
            ${avatarHtml}
            <div class="message-content">
                <div class="message-text">${formattedText}</div>
                <span class="message-time">${formatTime(ts || Date.now())}</span>
            </div>
        `;
        chatHistoryEl.appendChild(msgDiv);
        scrollToBottom();
        return msgDiv;
    };

    const addMessage = (text, isUser = false) => {
        const ts = Date.now();
        renderMessage(text, isUser, ts);
        pushHistory(isUser ? 'user' : 'assistant', text);
    };

    // Greeting shown when history is empty
    const greeting = () =>
        `Hello ${firstName === 'there' ? 'there' : firstName}! I'm your <strong>AI Career Counselor</strong>. 🎓<br><br>`
        + (selectedPath
            ? `I see you're aiming for <strong>${selectedPath}</strong>${selectedLevel ? ` at the <strong>${selectedLevel}</strong> level` : ''}. How can I help you get there?`
            : `How can I help you shape your future today? Ask me anything about <strong>career paths</strong>, <strong>skills to learn</strong>, <strong>interview prep</strong>, or <strong>industry trends</strong>.`);

    const renderInitialChat = () => {
        chatHistoryEl.innerHTML = '';
        const history = loadHistory();
        if (history.length === 0) {
            renderMessage(greeting(), false, Date.now());
        } else {
            history.forEach(m => renderMessage(m.content, m.role === 'user', m.timestamp));
            if (suggestedPrompts) suggestedPrompts.style.display = 'none';
        }
        scrollToBottom();
    };

    /* ============================================================
     * KEYWORD-BASED FALLBACK AI (when Groq unavailable)
     * ============================================================ */
    const pathAdvice = () => {
        if (!selectedPath) return '';
        const p = selectedPath.toLowerCase();
        if (p.includes('ai') || p.includes('machine learning')) {
            return ` Since you're targeting <strong>${selectedPath}</strong>, master Python, NumPy/Pandas, and build projects with PyTorch or TensorFlow.`;
        }
        if (p.includes('data') && p.includes('sci')) {
            return ` For <strong>${selectedPath}</strong>, focus on statistics, Python (pandas, scikit-learn), SQL, and data storytelling.`;
        }
        if (p.includes('front') || (p.includes('web') && !p.includes('full'))) {
            return ` For your <strong>${selectedPath}</strong> goal, master HTML/CSS, JavaScript, and React — then launch a polished portfolio.`;
        }
        if (p.includes('full')) {
            return ` For <strong>${selectedPath}</strong>, build end-to-end projects covering React (frontend) and Node.js/databases (backend).`;
        }
        if (p.includes('back')) {
            return ` On the <strong>${selectedPath}</strong> track, prioritize Node.js or Python, REST APIs, SQL/NoSQL databases, and Docker.`;
        }
        if (p.includes('cloud') || p.includes('devops')) {
            return ` For <strong>${selectedPath}</strong>, focus on AWS/Azure/GCP, Docker, Kubernetes, and CI/CD pipelines.`;
        }
        if (p.includes('security') || p.includes('cyber')) {
            return ` On the <strong>${selectedPath}</strong> path, learn networking fundamentals, Linux, and ethical hacking — aim for CompTIA Security+ or CEH.`;
        }
        if (p.includes('design') || p.includes('ux') || p.includes('ui')) {
            return ` For <strong>${selectedPath}</strong>, build fluency in Figma, design systems, and user research.`;
        }
        if (p.includes('mobile')) {
            return ` For <strong>${selectedPath}</strong>, pick Flutter/Dart (cross-platform) or Swift/Kotlin (native) — then publish apps to the app stores.`;
        }
        return ` Given your goal of <strong>${selectedPath}</strong>, your Roadmap page has a step-by-step plan tailored to this career.`;
    };

    const levelNote = () => {
        if (!selectedLevel) return '';
        const l = selectedLevel.toLowerCase();
        if (l.includes('begin')) return ` Since you're a <strong>beginner</strong>, aim for 30 minutes of focused practice daily.`;
        if (l.includes('inter')) return ` As an <strong>intermediate</strong> learner, ship a substantial portfolio project and start contributing to open source.`;
        if (l.includes('adv')) return ` At your <strong>advanced</strong> level, focus on system design, specialization, and mock interview practice.`;
        return '';
    };

    const getFallbackResponse = (userText) => {
        const t = userText.toLowerCase().trim();
        const namePrefix = firstName === 'there' ? '' : `${firstName}, `;

        if (t === 'hello' || t === 'hi' || t === 'hey' || t.startsWith('hi ') || t.startsWith('hey ')) {
            return `Hey ${firstName === 'there' ? 'there' : firstName}! I'm here to help with your career journey. Ask me about <strong>what to learn</strong>, <strong>in-demand jobs</strong>, <strong>interview prep</strong>, <strong>portfolio tips</strong>, or your <strong>roadmap</strong>.`;
        }
        if (t.includes('which career') || t.includes('what career') || t.includes('best career')) {
            return `${namePrefix}great question! Logic/problem-solving → <strong>Software Engineering</strong> or <strong>AI/ML</strong>. Data lover → <strong>Data Science</strong>. Design empathy → <strong>UX Design</strong>. Security mindset → <strong>Cybersecurity</strong>.${pathAdvice()} Have you tried the <strong>Career Discovery</strong> quiz yet?`;
        }
        if (t.includes('what should i learn') || t.includes('where to start') || t.includes('how to start') || t.includes('getting started')) {
            return `${namePrefix}start by picking one programming language and going deep before branching out. Python is best for AI/Data, JavaScript for Web Dev.${pathAdvice()}${levelNote()} Your <strong>Roadmap</strong> page has a step-by-step guide.`;
        }
        if (t.includes('python')) {
            return `Python is the most versatile language in tech — essential for <strong>AI/ML, Data Science, and backend development</strong>. Start with syntax basics, then functions, OOP, and libraries like NumPy and pandas.${pathAdvice()}${levelNote()}`;
        }
        if (t.includes('javascript') || t === 'js') {
            return `JavaScript powers the web and is essential for <strong>frontend, full-stack, and Node.js backend</strong> roles. Master ES6+, async/await, and the DOM — then pick React or Vue.${pathAdvice()}${levelNote()}`;
        }
        if (t.includes('how long') || t.includes('timeline')) {
            return `${namePrefix}most people reach entry-level job-readiness in 6–12 months studying 10–15 hrs/week.${selectedPath ? ` For <strong>${selectedPath}</strong>, your Roadmap breaks this into clear milestones.` : ''} Consistency beats intensity — 1 hour daily beats 7 hours on weekends.`;
        }
        if (t.includes('portfolio') || t.includes('project')) {
            return `${namePrefix}a portfolio of 3–5 deployed projects beats a resume for most tech roles. Each should solve a real problem. Host on GitHub, deploy live (Vercel/Netlify), and write a README explaining your decisions.${pathAdvice()}`;
        }
        if (t.includes('interview') || t.includes('coding interview')) {
            return `${namePrefix}for coding interviews: solve LeetCode Easy problems daily (aim for 50+), review Big O notation, and master arrays, strings, and hash maps.${levelNote()} Behavioral questions matter too — use the STAR method.`;
        }
        if (t.includes('salary') || t.includes('pay') || t.includes('earn')) {
            return `Tech salaries vary by role and location. Globally, software engineers average $60K–$150K+ USD.${selectedPath ? ` <strong>${selectedPath}</strong> roles are generally above market average.` : ''} Your strongest levers: portfolio quality, interview performance, and negotiating confidently.`;
        }
        if (t.includes('motivat') || t.includes('stuck') || t.includes('frustrated') || t.includes('difficult')) {
            return `${namePrefix}it's completely normal to feel this way — every developer has been there. Break the problem into the smallest possible piece and solve just that. Progress beats perfection.`;
        }
        if (t.includes('thank')) {
            return `You're welcome, ${firstName === 'there' ? 'friend' : firstName}! Feel free to ask anything else about your career path.`;
        }
        return `${namePrefix}great question! I can help with: <strong>career paths</strong>, <strong>skills to learn</strong>, <strong>interview prep</strong>, <strong>portfolio building</strong>, <strong>timelines</strong>, and <strong>job market trends</strong>.${pathAdvice()} What would you like to explore?`;
    };

    /* ============================================================
     * SEND FLOW
     * ============================================================ */
    let sending = false;

    const handleSend = async () => {
        if (sending) return;
        const text = chatInput.value.trim();
        if (!text) return;

        // Hard block when limit reached
        if (limitReached()) {
            openSubModal();
            return;
        }

        sending = true;

        // 1. User message
        addMessage(text, true);
        chatInput.value = '';
        if (suggestedPrompts) suggestedPrompts.style.display = 'none';

        // 2. Typing indicator
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message ai-message typing-indicator';
        typingDiv.id = typingId;
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-dots"><span></span><span></span><span></span></div>
            </div>`;
        chatHistoryEl.appendChild(typingDiv);
        scrollToBottom();

        // 3. Call backend (Groq AI)
        const serverData = await syncMessage(text);
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();

        if (serverData && serverData.blocked) {
            sending = false;
            renderUsage();
            setTimeout(openSubModal, 200);
            return;
        }

        // 4. Use Groq response if available, otherwise use keyword fallback
        let response;
        if (serverData && serverData.aiResponse) {
            response = serverData.aiResponse;
        } else {
            // Fallback: increment locally if server unreachable
            if (!serverData) {
                if (!isSubscribed()) setUsed(getUsed() + 1);
            }
            response = getFallbackResponse(text);
        }

        addMessage(response, false);

        sending = false;
        renderUsage();

        // If that was the last free question, surface the upsell
        if (limitReached()) {
            setTimeout(openSubModal, 800);
        }
    };

    /* ============================================================
     * SUBSCRIPTION MODAL - MOCK PAYMENT FLOW
     * ============================================================ */
    const openSubModal = () => {
        subOfferView.style.display = 'block';
        subSuccessView.style.display = 'none';
        subSubscribeBtn.disabled = false;
        subSubscribeBtn.innerHTML = '<i class="fas fa-bolt"></i> Subscribe Now - $9.99/mo';
        subOverlay.classList.add('open');
    };
    const closeSubModal = () => subOverlay.classList.remove('open');

    const doSubscribe = async () => {
        subSubscribeBtn.disabled = true;
        subSubscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';

        // Show mock payment processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Call backend to activate subscription
        await subscribeBackend();

        // Unlock locally regardless (mock mode)
        localStorage.setItem(LS.sub, 'true');
        setUsed(0);
        renderUsage();

        // Success view
        subOfferView.style.display = 'none';
        subSuccessView.style.display = 'block';
    };

    /* ============================================================
     * CLEAR HISTORY
     * ============================================================ */
    const clearHistory = async () => {
        const ok = await (window.XyConfirm ? window.XyConfirm({
            title: 'Clear History',
            message: 'Are you sure you want to clear your entire chat history?',
            confirmText: 'Clear',
            cancelText: 'Cancel',
            type: 'warning',
            dangerous: true
        }) : Promise.resolve(confirm('Clear your entire chat history?')));
        if (!ok) return;
        localStorage.removeItem(LS.history);
        localStorage.removeItem(LS.lastTopic);
        if (suggestedPrompts) suggestedPrompts.style.display = 'flex';
        renderInitialChat();
    };

    /* ============================================================
     * EVENT WIRING
     * ============================================================ */
    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter' && !e.shiftKey) handleSend(); });

    if (promptChips) {
        promptChips.forEach(chip => {
            chip.addEventListener('click', () => {
                if (limitReached()) { openSubModal(); return; }
                chatInput.value = chip.dataset.prompt || chip.textContent.trim();
                handleSend();
            });
        });
    }

    if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', clearHistory);
    if (upgradeInlineBtn) upgradeInlineBtn.addEventListener('click', openSubModal);
    if (subSubscribeBtn) subSubscribeBtn.addEventListener('click', doSubscribe);
    if (subLaterBtn) subLaterBtn.addEventListener('click', closeSubModal);
    if (subCloseBtn) subCloseBtn.addEventListener('click', closeSubModal);
    if (subDoneBtn) subDoneBtn.addEventListener('click', () => { closeSubModal(); chatInput.focus(); });
    if (subOverlay) subOverlay.addEventListener('click', (e) => { if (e.target === subOverlay) closeSubModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSubModal(); });

    /* ============================================================
     * INIT
     * ============================================================ */
    // Load backend history on init (async, non-blocking)
    loadHistoryFromBackend().then(() => {
        renderInitialChat();
        renderUsage();
        if (limitReached()) setTimeout(openSubModal, 800);
    });
});
