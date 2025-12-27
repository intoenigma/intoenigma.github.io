document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initParticles();
    initMagneticElements();
    initTextScramble();
    initScrollAnimations();
});

/**
 * 1. Custom Cursor Logic
 */
function initCustomCursor() {
    const outer = document.querySelector('.cursor-outer');
    const inner = document.querySelector('.cursor-inner');
    
    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let innerX = 0, innerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animate = () => {
        // Liquid physics for outer circle
        outerX += (mouseX - outerX) * 0.12;
        outerY += (mouseY - outerY) * 0.12;
        
        // Sharper follow for inner dot
        innerX += (mouseX - innerX) * 1;
        innerY += (mouseY - innerY) * 1;

        outer.style.transform = `translate(${outerX - 17.5}px, ${outerY - 17.5}px)`;
        inner.style.transform = `translate(${innerX - 3}px, ${innerY - 3}px)`;
        
        requestAnimationFrame(animate);
    };
    animate();

    // Hover logic
    const interactables = document.querySelectorAll('a, button, .magnetic, .dir-card, .project-card, input, select');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outer.style.width = '60px';
            outer.style.height = '60px';
            outer.style.margin = '-12.5px'; // Adjust for size increase
            outer.style.background = 'rgba(var(--primary-rgb), 0.1)';
            outer.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            outer.style.width = '35px';
            outer.style.height = '35px';
            outer.style.margin = '0';
            outer.style.background = 'transparent';
            outer.style.borderColor = 'var(--primary)';
        });
    });
}

/**
 * 2. Particle System (Canvas)
 */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const count = 80;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.init();
        }
        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(0, 243, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < count; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * 3. Magnetic Elements Logic
 */
function initMagneticElements() {
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach(m => {
        m.addEventListener('mousemove', (e) => {
            const rect = m.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            m.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        m.addEventListener('mouseleave', () => {
            m.style.transform = `translate(0px, 0px)`;
        });
    });
}

/**
 * 4. Text Scramble Effect
 */
function initTextScramble() {
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    const scrambleElements = document.querySelectorAll('.scramble-text');
    scrambleElements.forEach(el => {
        const fx = new TextScramble(el);
        const originalText = el.getAttribute('data-value') || el.innerText;
        
        let hasRun = false;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasRun) {
                fx.setText(originalText);
                hasRun = true;
            }
        });
        observer.observe(el);
    });
}

/**
 * 5. Scroll Animations
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden-scroll').forEach(el => observer.observe(el));
    
    // Navbar glass effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 8, 0.8)';
            navbar.style.borderBottom = '1px solid var(--glass-border)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.borderBottom = '1px solid transparent';
        }
    });

    // 3D Parallax Orb logic
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;
        
        const orb = document.querySelector('.main-orb');
        if (orb) {
            orb.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
            
            const rings = orb.querySelectorAll('.orb-ring');
            rings.forEach((ring, i) => {
                const speed = (i + 1) * 0.2;
                ring.style.transform = `rotateX(${70 + y * speed}deg) rotateY(${x * speed}deg)`;
            });
        }
    });
}
