const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
    constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.col = col;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.03 + 0.01;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // gravity
        this.alpha -= this.decay;
    }
    
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.col;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function loop() {
    requestAnimationFrame(loop);
    ctx.globalAlpha = 0.2; // Trails
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for(let i=0; i<particles.length; i++) {
        if(particles[i].alpha <= 0) {
            particles.splice(i, 1);
            i--;
        } else {
            particles[i].update();
            particles[i].draw();
        }
    }
}

window.addEventListener('click', (e) => {
    const cols = ['#00f3ff', '#9d00ff', '#ff0055', '#ffee00'];
    const col = cols[Math.floor(Math.random() * cols.length)];
    for(let i=0; i<50; i++) {
        particles.push(new Particle(e.clientX, e.clientY, col));
    }
});

loop();
