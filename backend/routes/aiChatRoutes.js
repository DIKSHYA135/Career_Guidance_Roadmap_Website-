const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('crypto').randomUUID ? { v4: () => require('crypto').randomUUID() } : { v4: () => `conv_${Date.now()}_${Math.random().toString(36).slice(2,9)}` };
const authMiddleware = require('../middleware/authMiddleware');
const AIConversation = require('../models/AIConversation');
const AIChatMessage = require('../models/AIChatMessage');
const { callGroqChat } = require('../utils/groqClient');
const { isSubscriptionActive } = require('../utils/subscriptionUtils');
const Subscription = require('../models/Subscription');

router.use(authMiddleware);

// ── Helper to derive subscription tier ──
async function getTier(user) {
    if (!user.activeSubscription) return 'free';
    const sub = await Subscription.findById(user.activeSubscription).lean();
    return isSubscriptionActive(sub) ? 'pro' : 'free';
}

// ── POST /api/ai-chat/start — Create a new conversation ──
router.post('/start', async (req, res) => {
    try {
        const user = req.userDoc;
        const tier = await getTier(user);
        const conversationId = `conv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

        const conversation = await AIConversation.create({
            conversationId,
            userId: user._id,
            userName: user.name || '',
            userEmail: user.email || '',
            subscriptionTier: tier,
            messageCount: 0,
            status: 'active'
        });

        res.json({ success: true, conversationId: conversation.conversationId });
    } catch (err) {
        console.error('ai-chat/start error:', err);
        res.status(500).json({ success: false, message: 'Failed to start conversation' });
    }
});

// ── POST /api/ai-chat/message — Send a message & get AI response ──
router.post('/message', async (req, res) => {
    try {
        const { conversationId, message, context } = req.body;
        const user = req.userDoc;

        if (!conversationId || !message) {
            return res.status(400).json({ success: false, message: 'conversationId and message are required' });
        }

        // Ensure conversation belongs to this user
        const conversation = await AIConversation.findOne({ conversationId, userId: user._id });
        if (!conversation) {
            return res.status(404).json({ success: false, message: 'Conversation not found' });
        }

        // Save user message
        await AIChatMessage.create({
            conversationId,
            userId: user._id,
            sender: 'user',
            text: message
        });

        // Build Groq prompt
        const systemPrompt = context ||
            `You are Xyverra's AI Career Counselor — a friendly, knowledgeable assistant specializing in career guidance, learning roadmaps, tech skills, and interview preparation. 
The user's selected career path is: ${user.selectedPath || 'General Technology'}.
Keep answers concise, motivating, and actionable. If asked about a specific module or lesson, provide clear explanations and next steps.`;

        // Fetch recent history for context (last 6 messages)
        const recentMessages = await AIChatMessage.find({ conversationId })
            .sort({ createdAt: -1 })
            .limit(6)
            .lean();

        const history = recentMessages.reverse().map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
        }));

        const aiResponseText = await callGroqChat([
            { role: 'system', content: systemPrompt },
            ...history
        ]);

        const aiText = aiResponseText || "I'm sorry, I couldn't generate a response right now. Please try again.";

        // Save AI response
        await AIChatMessage.create({
            conversationId,
            userId: user._id,
            sender: 'ai',
            text: aiText
        });

        // Update conversation message count
        await AIConversation.findOneAndUpdate(
            { conversationId },
            { $inc: { messageCount: 2 }, status: 'active' }
        );

        res.json({ success: true, response: aiText });
    } catch (err) {
        console.error('ai-chat/message error:', err);
        res.status(500).json({ success: false, message: 'Failed to process message' });
    }
});

// ── POST /api/ai-chat/end — Mark conversation as ended ──
router.post('/end', async (req, res) => {
    try {
        const { conversationId } = req.body;
        await AIConversation.findOneAndUpdate(
            { conversationId, userId: req.userDoc._id },
            { status: 'ended', endedAt: new Date() }
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to end conversation' });
    }
});

module.exports = router;
