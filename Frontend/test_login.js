async function testLogin() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123'
            })
        });

        console.log('Status:', response.status);
        const text = await response.text();
        console.log('Response Body:', text);
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

testLogin();
