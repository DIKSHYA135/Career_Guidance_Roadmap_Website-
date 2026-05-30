/**
 * PATH BLUEPRINT - SAAS LOGIN BACKGROUND PARTICLES
 * Lightweight HTML5 canvas constellation network
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle pool array
    const particles = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 22000)); // Dynamic count based on viewport
    const maxDistance = 120; // Max connection distance

    // Mouse tracking for interactive repulsion
    const mouse = {
        x: null,
        y: null,
        radius: 130 // Radius of influence
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Handle viewport resize (throttled)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }, 100);
    });

    // Particle Model
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Very slow drift speed for premium minimal aesthetic
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = Math.random() * 1.8 + 0.8; // 0.8px to 2.6px dots
            // Color variants: 70% cyan, 30% deep blue
            this.color = Math.random() > 0.3 
                ? 'rgba(0, 217, 255, '  // Cyan
                : 'rgba(37, 99, 255, '; // Electric Blue
        }

        update() {
            // Apply drift
            this.x += this.vx;
            this.y += this.vy;

            // Interactive mouse repulsion
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius; // 0 to 1
                    const angle = Math.atan2(dy, dx);
                    // Push particle away with easing
                    const pushX = Math.cos(angle) * force * 1.8;
                    const pushY = Math.sin(angle) * force * 1.8;
                    this.x += pushX;
                    this.y += pushY;
                }
            }

            // Bounce on boundaries with a small margin
            if (this.x < 0) {
                this.x = 0;
                this.vx *= -1;
            } else if (this.x > width) {
                this.x = width;
                this.vx *= -1;
            }

            if (this.y < 0) {
                this.y = 0;
                this.vy *= -1;
            } else if (this.y > height) {
                this.y = height;
                this.vy *= -1;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + '0.35)';
            ctx.fill();
        }
    }

    // Initialize particle pool
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Main animation thread
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update & Draw nodes
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    const alpha = (1 - dist / maxDistance) * 0.12; // Soft connection alpha
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = p1.color + `${alpha})`;
                    ctx.lineWidth = 0.65;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    // Trigger loop
    animate();
});
