document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("forgot-password-form");
    const emailInput = document.getElementById("email");
    const submitBtn = document.getElementById("submit-btn");
    const btnLabel = document.getElementById("btn-label");

    const emailError = document.getElementById("email-error");
    const generalErrorCard = document.getElementById("general-error");
    const generalErrorText = document.getElementById("error-text");
    
    const generalSuccessCard = document.getElementById("general-success");
    const generalSuccessText = document.getElementById("success-text");

    let isSubmitting = false;

    const sanitize = (value) => {
        if (typeof value !== "string") return "";
        return value.replace(/[\u0000-\u001F\u007F]/g, "").replace(/[<>]/g, "").trim();
    };

    const showFieldError = (input, errorDiv, message) => {
        input.classList.remove('input-field-success');
        input.classList.add('input-field-error');
        errorDiv.textContent = message;
        errorDiv.classList.add('visible');
    };

    const clearFieldError = (input, errorDiv) => {
        input.classList.remove('input-field-error');
        errorDiv.textContent = '';
        errorDiv.classList.remove('visible');
    };

    const showGeneralError = (message) => {
        generalSuccessCard.style.display = 'none';
        generalErrorText.textContent = message;
        generalErrorCard.classList.add('visible');
    };

    const showGeneralSuccess = (messageHtml) => {
        generalErrorCard.classList.remove('visible');
        generalSuccessText.innerHTML = messageHtml;
        generalSuccessCard.style.display = 'flex';
        generalSuccessCard.classList.add('visible');
    };

    const hideMessages = () => {
        generalErrorCard.classList.remove('visible');
        generalSuccessCard.style.display = 'none';
    };

    emailInput.addEventListener('input', () => {
        hideMessages();
        clearFieldError(emailInput, emailError);
    });

    const setLoadingState = () => {
        submitBtn.disabled = true;
        btnLabel.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i> Sending...';
    };

    const resetButtonState = () => {
        submitBtn.disabled = false;
        btnLabel.innerHTML = "Send Reset Link";
    };

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        hideMessages();

        const email = sanitize(emailInput.value);
        if (emailInput.value !== email) emailInput.value = email;

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            showFieldError(emailInput, emailError, 'Please enter a valid email address');
            return;
        }

        isSubmitting = true;
        setLoadingState();

        try {
            const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong.");
            }

            if (data._dev_resetUrl) {
                showGeneralSuccess(data.message + "<br><br><b>[DEV MODE]</b> <a href='" + data._dev_resetUrl + "' style='color: #10b981; text-decoration: underline;'>Click here to reset password</a>");
            } else {
                showGeneralSuccess(data.message);
            }

            if (typeof window.XySuccess === "function") {
                window.XySuccess("Success", "Reset link sent successfully");
            }
            
            // clear form
            emailInput.value = '';
            
        } catch (error) {
            console.error("Forgot Password Error:", error);
            showGeneralError(error.message || "Server connection error. Please try again.");
        } finally {
            resetButtonState();
            isSubmitting = false;
        }
    });
});
