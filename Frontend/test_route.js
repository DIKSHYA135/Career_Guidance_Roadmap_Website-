async function testSavePath() {
    try {
        const response = await fetch('http://localhost:5001/api/user/save-path', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@example.com',
                selectedPath: 'Frontend Developer'
            })
        });

        console.log('Status:', response.status);
        const text = await response.text();
        console.log('Response Body:', text);
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

testSavePath();
