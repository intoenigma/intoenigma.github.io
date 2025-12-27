/**
 * IntoEnigma Max-Level Quiz Base Protocols
 */

class QuizEngine {
    constructor() {
        this.initCursor();
        this.initParticles();
        this.initMagneticItems();
        this.initScramble();
        this.initParallax();
        this.initSmoothScroll();
    }

    // --- Custom Liquid Cursor ---
    initCursor() {
        const dot = document.createElement('div');
        const outline = document.createElement('div');
        dot.id = 'cursor-dot';
        outline.id = 'cursor-outline';
        document.body.appendChild(dot);
        document.body.appendChild(outline);

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        });

        const animateOutline = () => {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            outlineX += distX * 0.15;
            outlineY += distY * 0.15;
            outline.style.left = `${outlineX}px`;
            outline.style.top = `${outlineY}px`;
            requestAnimationFrame(animateOutline);
        };
        animateOutline();

        // Hover Effect
        const interactiveElements = 'a, button, .magnetic-wrap, input, .interactive';
        document.querySelectorAll(interactiveElements).forEach(el => {
            el.addEventListener('mouseenter', () => {
                outline.style.width = '70px';
                outline.style.height = '70px';
                outline.style.backgroundColor = 'rgba(0, 242, 255, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                outline.style.width = '40px';
                outline.style.height = '40px';
                outline.style.backgroundColor = 'transparent';
            });
        });
    }

    // --- High-Performance Particle System ---
    initParticles() {
        const canvas = document.querySelector('.particle-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random();
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = `rgba(0, 242, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 100; i++) particles.push(new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };
        animate();
    }

    // --- Magnetic Elements ---
    initMagneticItems() {
        const items = document.querySelectorAll('.magnetic-wrap');
        items.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                item.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translate(0, 0)';
            });
        });
    }

    // --- Text Scramble Protocol ---
    initScramble() {
        const elements = document.querySelectorAll('.scramble-text');
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        
        elements.forEach(el => {
            const originalText = el.innerText;
            let iteration = 0;
            let interval = null;

            const startScramble = () => {
                clearInterval(interval);
                interval = setInterval(() => {
                    el.innerText = originalText
                        .split("")
                        .map((letter, index) => {
                            if(index < iteration) return originalText[index];
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("");
                    
                    if(iteration >= originalText.length) {
                        clearInterval(interval);
                    }
                    iteration += 1/3;
                }, 30);
            };

            // Trigger on scroll into view
            const observer = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    iteration = 0;
                    startScramble();
                }
            }, { threshold: 0.5 });
            observer.observe(el);
        });
    }

    // --- 3D Parallax Orbs ---
    initParallax() {
        const container = document.querySelector('.orb-system');
        if (!container) return;

        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.clientX) / 25;
            const yAxis = (window.innerHeight / 2 - e.clientY) / 25;
            container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            
            const rings = document.querySelectorAll('.orb-ring');
            rings.forEach((ring, idx) => {
                const depth = (idx + 1) * 10;
                ring.style.transform = `translate(-50%, -50%) translateZ(${depth}px)`;
            });
        });
    }

    initSmoothScroll() {
        // Optional: Smooth scroll implementation if needed
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.quizEngine = new QuizEngine();
});
