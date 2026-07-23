const https = require('https');

// Shared Groq chat-completion client. Returns the assistant's text, or null on any failure.
async function callGroqChat(messages, options = {}) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return null;

    const requestBody = JSON.stringify({
        model: options.model || 'llama-3.3-70b-versatile',
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 800,
        top_p: 0.9
    });

    return new Promise((resolve) => {
        const req = https.request({
            hostname: 'api.groq.com',
            path: '/openai/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'Content-Length': Buffer.byteLength(requestBody)
            },
            timeout: 20000
        }, (groqRes) => {
            let data = '';
            groqRes.on('data', chunk => data += chunk);
            groqRes.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
                        resolve(parsed.choices[0].message.content);
                    } else {
                        if (parsed.error) console.error('Groq API error:', parsed.error.message);
                        resolve(null);
                    }
                } catch (e) {
                    console.error('Groq parse error:', e.message);
                    resolve(null);
                }
            });
        });

        req.on('error', (e) => { console.error('Groq request error:', e.message); resolve(null); });
        req.on('timeout', () => { req.destroy(); resolve(null); });
        req.write(requestBody);
        req.end();
    });
}

module.exports = { callGroqChat };
