document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reset-password-form");
    const newPasswordInput = document.getElementById("new-password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const submitBtn = document.getElementById("submit-btn");
    const btnLabel = document.getElementById("btn-label");

    const confirmError = document.getElementById("confirm-error");
    const generalErrorCard = document.getElementById("general-error");
    const generalErrorText = document.getElementById("error-text");
    const generalSuccessCard = document.getElementById("general-success");
    const generalSuccessText = document.getElementById("success-text");

    // Password requirements elements
    const reqLength = document.getElementById("req-length");
    const reqUpper = document.getElementById("req-upper");
    const reqLower = document.getElementById("req-lower");
    const reqNumber = document.getElementById("req-number");
    const reqSpecial = document.getElementById("req-special");

    let isSubmitting = false;

    // Retrieve token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        showGeneralError("Invalid or missing reset token.");
        if (newPasswordInput) newPasswordInput.disabled = true;
        if (confirmPasswordInput) confirmPasswordInput.disabled = true;
        return;
    }

    const toggleBtns = document.querySelectorAll(".toggle-password");
    toggleBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const input = this.previousElementSibling;
            const isText = input.type === "text";
            input.type = isText ? "password" : "text";
            this.className = isText ? "far fa-eye eye-icon toggle-password" : "far fa-eye-slash eye-icon toggle-password";
        });
    });

    const checkRequirement = (element, isValid) => {
        if (isValid) {
            element.classList.remove("invalid");
            element.classList.add("valid");
            element.innerHTML = '<i class="fas fa-check" style="margin-right: 6px;"></i> ' + element.textContent.trim();
        } else {
            element.classList.remove("valid");
            element.classList.add("invalid");
            element.innerHTML = '<i class="fas fa-times" style="margin-right: 6px;"></i> ' + element.textContent.trim();
        }
    };

    const validatePassword = () => {
        const val = newPasswordInput.value;
        const lengthValid = val.length >= 8;
        const upperValid = /[A-Z]/.test(val);
        const lowerValid = /[a-z]/.test(val);
        const numberValid = /\d/.test(val);
        const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(val);

        checkRequirement(reqLength, lengthValid);
        checkRequirement(reqUpper, upperValid);
        checkRequirement(reqLower, lowerValid);
        checkRequirement(reqNumber, numberValid);
        checkRequirement(reqSpecial, specialValid);

        return lengthValid && upperValid && lowerValid && numberValid && specialValid;
    };

    const validateMatch = () => {
        if (confirmPasswordInput.value === '') return false;
        
        if (newPasswordInput.value !== confirmPasswordInput.value) {
            showFieldError(confirmPasswordInput, confirmError, "Passwords do not match");
            return false;
        } else {
            clearFieldError(confirmPasswordInput, confirmError);
            confirmPasswordInput.classList.add('input-field-success');
            return true;
        }
    };

    newPasswordInput.addEventListener('input', () => {
        const isPasswordValid = validatePassword();
        if (confirmPasswordInput.value !== '') {
            validateMatch();
        }
        submitBtn.disabled = !(isPasswordValid && newPasswordInput.value === confirmPasswordInput.value);
    });

    confirmPasswordInput.addEventListener('input', () => {
        validateMatch();
        const isPasswordValid = validatePassword();
        submitBtn.disabled = !(isPasswordValid && newPasswordInput.value === confirmPasswordInput.value);
    });

    function showFieldError(input, errorDiv, message) {
        input.classList.remove('input-field-success');
        input.classList.add('input-field-error');
        errorDiv.textContent = message;
        errorDiv.classList.add('visible');
    }

    function clearFieldError(input, errorDiv) {
        input.classList.remove('input-field-error');
        errorDiv.textContent = '';
        errorDiv.classList.remove('visible');
    }

    function showGeneralError(message) {
        generalSuccessCard.style.display = 'none';
        generalErrorText.textContent = message;
        generalErrorCard.classList.add('visible');
    }

    function showGeneralSuccess(message) {
        generalErrorCard.classList.remove('visible');
        generalSuccessText.textContent = message;
        generalSuccessCard.style.display = 'flex';
        generalSuccessCard.classList.add('visible');
    }

    function hideMessages() {
        generalErrorCard.classList.remove('visible');
        generalSuccessCard.style.display = 'none';
    }

    const setLoadingState = () => {
        submitBtn.disabled = true;
        btnLabel.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i> Updating...';
    };

    const resetButtonState = () => {
        submitBtn.disabled = false;
        btnLabel.innerHTML = "Update Password";
    };

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (isSubmitting || submitBtn.disabled) return;

        hideMessages();

        if (!validatePassword() || !validateMatch()) {
            return;
        }

        isSubmitting = true;
        setLoadingState();

        try {
            const response = await fetch("http://localhost:5000/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    token,
                    newPassword: newPasswordInput.value 
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to reset password.");
            }

            showGeneralSuccess(data.message);
            
            if (typeof window.XySuccess === "function") {
                window.XySuccess("Success", "Password reset successfully! Redirecting to login...", () => {
                    window.location.href = "login.html";
                });
            } else {
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 3000);
            }
            
        } catch (error) {
            console.error("Reset Password Error:", error);
            showGeneralError(error.message || "Server connection error. Please try again.");
            resetButtonState();
            isSubmitting = false;
        }
    });
});
