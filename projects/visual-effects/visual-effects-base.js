/**
 * IntoEnigma Visual Effects - Core JS Protocol
 * Includes: Liquid Cursor, Particle System, Magnetic Elements, Text Scramble, 3D Orbs
 */

class EnigmaCore {
    constructor() {
        this.initCursor();
        this.initParticles();
        this.initMagneticElements();
        this.initTextScramble();
        this.init3DOrbs();
        this.initScrollReveal();
        this.initUIControls();
    }

    // 1. Custom Liquid Cursor
    initCursor() {
        const dot = document.createElement('div');
        const outline = document.createElement('div');
        dot.className = 'cursor-dot';
        outline.className = 'cursor-outline';
        document.body.appendChild(dot);
        document.body.appendChild(outline);

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.top = `${mouseY}px`;
            dot.style.left = `${mouseX}px`;
        });

        // Smooth physics-based delay for outline
        const animateOutline = () => {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            outlineX += distX * 0.15;
            outlineY += distY * 0.15;
            outline.style.top = `${outlineY}px`;
            outline.style.left = `${outlineX}px`;
            requestAnimationFrame(animateOutline);
        };
        animateOutline();

        // Interactions
        const activeElements = 'a, button, .project-card, input, .interactive';
        document.querySelectorAll(activeElements).forEach(el => {
            el.addEventListener('mouseenter', () => {
                outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                outline.style.backgroundColor = 'rgba(0, 243, 255, 0.1)';
                outline.style.borderColor = 'transparent';
                dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', () => {
                outline.style.transform = 'translate(-50%, -50%) scale(1)';
                outline.style.backgroundColor = 'transparent';
                outline.style.borderColor = 'var(--primary)';
                dot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // 2. High-Performance Particle System
    initParticles() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let particles = [];
        const particleCount = 60;

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
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2;
                this.alpha = Math.random() * 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 243, 255, ${this.alpha})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) particles.push(new Particle());

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

    // 3. Magnetic Elements
    initMagneticElements() {
        const magnets = document.querySelectorAll('.magnetic');
        magnets.forEach(magnet => {
            magnet.addEventListener('mousemove', (e) => {
                const rect = magnet.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            magnet.addEventListener('mouseleave', () => {
                magnet.style.transform = `translate(0, 0)`;
            });
        });
    }

    // 4. Text Scramble Protocol
    initTextScramble() {
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
                        output += `<span class="dud">${char}</span>`;
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

        const scrambleEls = document.querySelectorAll('.text-scramble');
        scrambleEls.forEach(el => {
            const fx = new TextScramble(el);
            const originalText = el.innerText;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        fx.setText(originalText);
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(el);
        });
    }

    // 5. 3D Parallax Orbs (Simplified canvas version)
    init3DOrbs() {
        const hero = document.querySelector('.hero-visual');
        if (!hero) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'orb-canvas';
        hero.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let width, height;
        let mouseX = 0, mouseY = 0;

        const resize = () => {
            width = hero.offsetWidth;
            height = hero.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
        });

        const rings = [
            { radius: 100, color: 'rgba(0, 243, 255, 0.4)', speed: 0.005, offset: 0 },
            { radius: 150, color: 'rgba(255, 0, 255, 0.3)', speed: -0.003, offset: Math.PI / 3 },
            { radius: 200, color: 'rgba(123, 0, 255, 0.2)', speed: 0.002, offset: Math.PI / 1.5 }
        ];

        let tick = 0;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.save();
            ctx.translate(width / 2, height / 2);
            
            // Tilt based on mouse
            ctx.rotate(mouseX * 0.1);
            
            rings.forEach(ring => {
                ctx.beginPath();
                ctx.ellipse(0, 0, ring.radius + (mouseY * 20), ring.radius / 2 + (mouseX * 20), tick * ring.speed + ring.offset, 0, Math.PI * 2);
                ctx.strokeStyle = ring.color;
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            ctx.restore();
            tick++;
            requestAnimationFrame(animate);
        };
        animate();
    }

    initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            observer.observe(card);
        });
    }


    initUIControls() {
        if (window.location.pathname.endsWith('visual-effects/index.html') || window.location.pathname.endsWith('visual-effects/')) return;

        const controls = document.createElement('div');
        controls.className = 'ui-controls';
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'ui-btn';
        copyBtn.innerHTML = '<span>&#x2398;</span> Copy Code';
        copyBtn.onclick = () => this.copyProjectCode();

        const fsBtn = document.createElement('button');
        fsBtn.className = 'ui-btn';
        fsBtn.innerHTML = '<span>&#x26F6;</span> Fullscreen';
        fsBtn.onclick = () => this.toggleFullscreen();

        const navSelect = document.createElement('select');
        navSelect.className = 'ui-btn';
        navSelect.style.appearance = 'none';
        navSelect.innerHTML = `
            <option value="" disabled selected>Switch Effect</option>
            <option value="3d-card-hover">3D Card Hover</option>
            <option value="3d-text-rotating">3D Text Rotating</option>
            <option value="border-radius-ui">Border Radius UI</option>
            <option value="bouncing-balls">Bouncing Balls</option>
            <option value="color-harmony">Color Harmony</option>
            <option value="confetti-pop">Confetti Pop</option>
            <option value="css-art-gallery">CSS Art Gallery</option>
            <option value="css-button-library">CSS Button Library</option>
            <option value="css-clip-path-maker">CSS Clip Path Maker</option>
            <option value="css-shadow-lib">CSS Shadow Library</option>
            <option value="day-night-cycle">Day/Night Cycle</option>
            <option value="firework-sim">Firework Simulation</option>
            <option value="fog-effect">Fog Effect</option>
            <option value="glass-layouts">Glass Layouts</option>
            <option value="glassmorphism-generator">Glassmorphism Gen</option>
            <option value="glitch-effect">Glitch Effect</option>
            <option value="gradient-text">Gradient Text</option>
            <option value="gravitational-art">Gravitational Art</option>
            <option value="interactive-globe">Interactive Globe</option>
            <option value="kaleidoscope">Kaleidoscope</option>
            <option value="liquid-loader">Liquid Loader</option>
            <option value="matrix-rain">Matrix Rain</option>
            <option value="mirror-drawing">Mirror Drawing</option>
            <option value="moving-clouds">Moving Clouds</option>
            <option value="neon-text-maker">Neon Text Maker</option>
            <option value="neumorphism-generator">Neumorphism Gen</option>
            <option value="parallax-scroll">Parallax Scroll</option>
            <option value="particle-text">Particle Text</option>
            <option value="rainy-mood">Rainy Mood</option>
            <option value="simple-paint">Simple Paint</option>
            <option value="snowfall-animation">Snowfall Animation</option>
            <option value="sorting-visualizer">Sorting Visualizer</option>
            <option value="spirograph-generator">Spirograph Gen</option>
            <option value="starfield-warp">Starfield Warp</option>
            <option value="svg-path-builder">SVG Path Builder</option>
            <option value="vanta-bg">Vanta BG</option>
            <option value="wave-animation">Wave Animation</option>
        `;
        navSelect.onchange = (e) => {
            if (e.target.value) {
                window.location.href = `../${e.target.value}/index.html`;
            }
        };

        controls.appendChild(copyBtn);
        controls.appendChild(fsBtn);
        controls.appendChild(navSelect);
        document.body.appendChild(controls);
    }

    async copyProjectCode() {
        try {
            const html = await fetch('index.html').then(r => r.text());
            const css = await fetch('style.css').then(r => r.text());
            const js = await fetch('script.js').then(r => r.text());
            
            const fullCode = `<!-- HTML -->\n${html}\n\n/* CSS */\n${css}\n\n// JS\n${js}`;
            await navigator.clipboard.writeText(fullCode);
            
            this.showToast('Project Code Copied!');
        } catch (e) {
            this.showToast('Failed to copy code');
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    showToast(msg) {
        const toast = document.createElement('div');
        toast.className = 'copy-success';
        toast.innerText = msg;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    window.enigma = new EnigmaCore();
});
