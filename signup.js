console.log("Signup.js loaded - Version 1.1 - Debugging Active");

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Signup form submission detected.");

            const nameInput = document.getElementById('signup-name');
            const emailInput = document.getElementById('signup-email');
            const passwordInput = document.getElementById('signup-password');

            if (!nameInput.value || !emailInput.value || !passwordInput.value) {
                alert("Please fill in all fields.");
                return;
            }

            const name = nameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;

            console.log("Sending signup request for:", email);

            try {
                document.body.style.cursor = 'wait';
                
                // Using localhost consistently to avoid origin mismatch issues
                const apiUrl = 'http://localhost:5000/api/auth/register';
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                console.log("Response status:", response.status);
                const data = await response.json();
                console.log("Response data:", data);
                
                document.body.style.cursor = 'default';

                if (response.ok) {
                    console.log("Signup successful!");
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('xyverra_user_name', data.user.name);
                    localStorage.setItem('xyverra_user_email', data.user.email);
                    
                    alert('Account created successfully!');
                    window.location.href = 'path-selection.html';
                } else {
                    console.warn("Signup failed with message:", data.message);
                    alert(data.message || 'Signup failed');
                }
            } catch (error) {
                document.body.style.cursor = 'default';
                console.error("CRITICAL FETCH ERROR:", error);
                
                // Detailed alert to help the user debug
                alert('DEBUG INFO: Connection failed.\n' +
                      '1. Ensure backend is running (npm start in backend folder)\n' +
                      '2. Check browser console (F12) for detailed errors\n' +
                      '3. Error type: ' + error.message);
            }
        });
    } else {
        console.error("Signup form not found in the DOM!");
    }
});
