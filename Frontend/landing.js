document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const hamburger = document.getElementById('hamburger');
    const mobileDrawer = document.getElementById('mobile-drawer');

    hamburger.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
    });

    // Close mobile drawer when a link is clicked
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Handle Waitlist Form Submission
    const waitlistForm = document.getElementById('waitlist-form');
    const waitlistEmail = document.getElementById('waitlist-email');
    const waitlistBtn = document.getElementById('waitlist-btn');

    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = waitlistEmail.value.trim();
            if (!email) return;

            // Basic validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }

            const originalBtnText = waitlistBtn.innerHTML;
            waitlistBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            waitlistBtn.disabled = true;

            try {
                // Determine API base URL
                const IS_DEV = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                const API_BASE = IS_DEV ? 'http://localhost:5000' : 'https://api.xyverra.com';

                const response = await fetch(`${API_BASE}/api/leads/subscribe`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    showToast(data.message || 'Successfully joined the waitlist!', 'success');
                    waitlistEmail.value = '';
                } else {
                    showToast(data.message || 'Failed to join waitlist.', 'error');
                }
            } catch (err) {
                console.error('Waitlist submission error:', err);
                showToast('Network error. Please try again.', 'error');
            } finally {
                waitlistBtn.innerHTML = originalBtnText;
                waitlistBtn.disabled = false;
            }
        });
    }

    // Simple Toast Notification system (since we aren't loading toast.js globally here to keep landing page light)
    function showToast(message, type = 'success') {
        const container = document.getElementById('xv-toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `xv-toast ${type}`;
        
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        icon.style.color = type === 'success' ? '#10B981' : '#EF4444';
        icon.style.marginRight = '8px';

        const text = document.createElement('span');
        text.textContent = message;

        toast.appendChild(icon);
        toast.appendChild(text);

        // Basic styling for the toast
        toast.style.background = 'white';
        toast.style.border = '1px solid #e2e8f0';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        toast.style.marginBottom = '10px';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.fontSize = '0.9rem';
        toast.style.fontWeight = '600';
        toast.style.transform = 'translateY(100%)';
        toast.style.opacity = '0';
        toast.style.transition = 'all 0.3s ease';

        container.style.position = 'fixed';
        container.style.bottom = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';

        container.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });

        // Remove after 3s
        setTimeout(() => {
            toast.style.transform = 'translateY(100%)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});
