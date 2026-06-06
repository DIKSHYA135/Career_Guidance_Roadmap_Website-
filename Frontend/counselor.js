/* counselor.js */

document.addEventListener('DOMContentLoaded', () => {
    const chatHistory = document.getElementById('chat-history');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const promptChips = document.querySelectorAll('.prompt-chip');
    
    // Auto-scroll chat to bottom
    const scrollToBottom = () => {
        chatHistory.scrollTop = chatHistory.scrollHeight;
    };

    // User avatar initials
    const userName = localStorage.getItem('xyverra_user_name') || 'User';
    const userInitials = userName.split(' ').map(n => n[0] || '').join('').substring(0, 2).toUpperCase() || 'US';

    // Helper: Add message to chat
    const addMessage = (text, isUser = false) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const avatarHtml = isUser 
            ? `<div class="message-avatar">${userInitials}</div>`
            : `<div class="message-avatar"><i class="fas fa-robot"></i></div>`;
            
        msgDiv.innerHTML = `
            ${avatarHtml}
            <div class="message-content">
                <p style="margin: 0;">${text}</p>
            </div>
        `;
        
        chatHistory.appendChild(msgDiv);
        scrollToBottom();
    };

    // Mock AI Responses
    const getMockResponse = (userText) => {
        const lowerText = userText.toLowerCase();
        
        if (lowerText.includes('which career suits me')) {
            return "Based on current trends, if you enjoy logic and problem solving, <strong>Software Engineering</strong> or <strong>Data Science</strong> are great choices. If you prefer design and user empathy, consider <strong>UI/UX Design</strong>. Have you taken our Career Discovery assessment yet?";
        }
        if (lowerText.includes('what should i learn')) {
            return "That depends on your target role! Generally, learning Python or JavaScript is an excellent start. They are versatile and in high demand for both web development and AI/Data Science.";
        }
        if (lowerText.includes('what jobs are in demand') || lowerText.includes('demand')) {
            return "Right now, the highest demand is for <strong>AI Engineers</strong>, <strong>Cloud Architects</strong>, and <strong>Cybersecurity Analysts</strong>. Companies are heavily investing in automation and secure cloud infrastructure.";
        }
        if (lowerText.includes('ai engineering right for me') || lowerText.includes('ai engineer')) {
            return "AI Engineering is a fantastic path! It requires a strong foundation in Python, linear algebra, and data manipulation. If you enjoy building intelligent systems and working with data, it's definitely right for you. Would you like me to set your target career to 'AI Engineer'?";
        }
        if (lowerText.includes('what skills do i need') || lowerText.includes('skills')) {
            return "To become job-ready, you typically need a mix of core technical skills (like coding in a specific language), practical skills (like using Git and Docker), and soft skills (like communication and teamwork). Check out your 'Skill Gap Analysis' page for a personalized breakdown.";
        }
        
        return "That's an interesting question! While I am currently operating in a mock-response mode, typically I would analyze your profile and the latest industry data to give you a tailored answer. Try asking about 'AI Engineering', 'in-demand jobs', or 'what to learn'.";
    };

    // Handle sending message
    const handleSend = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        // 1. Add User Message
        addMessage(text, true);
        chatInput.value = '';

        // 2. Hide prompt chips
        document.getElementById('suggested-prompts').style.display = 'none';

        // 3. Show typing indicator (optional)
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message ai-message';
        typingDiv.id = typingId;
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <p style="margin: 0; color: #94A3B8;"><i class="fas fa-ellipsis-h fa-fade"></i></p>
            </div>
        `;
        chatHistory.appendChild(typingDiv);
        scrollToBottom();

        // 4. Simulate network delay, then respond
        setTimeout(() => {
            const typingEl = document.getElementById(typingId);
            if (typingEl) typingEl.remove();
            
            const response = getMockResponse(text);
            addMessage(response, false);
            
            // Auto set target career if AI Engineer was asked
            if (text.toLowerCase().includes('ai engineering right for me')) {
                localStorage.setItem('xyverra_target_career', 'AI Engineer');
                localStorage.setItem('xyverra_selected_path', 'AI Engineer');
                setTimeout(() => {
                    addMessage("<em>(I've automatically updated your target career to <strong>AI Engineer</strong>. Check out the 'My Roadmap' page!)</em>", false);
                }, 1500);
            }
        }, 1200);
    };

    // Event Listeners
    sendBtn.addEventListener('click', handleSend);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            chatInput.value = chip.textContent;
            handleSend();
        });
    });
});
