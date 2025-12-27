const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('pop-btn');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const colors = ['#00f3ff', '#9d00ff', '#ff0055', '#ffee00', '#ffffff'];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        // Explosion velocity
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 15 + 5;
        this.dx = Math.cos(angle) * velocity;
        this.dy = Math.sin(angle) * velocity;
        
        this.gravity = 0.5;
        this.drag = 0.95;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
    }
    
    update() {
        this.dy += this.gravity;
        this.dx *= this.drag;
        this.dy *= this.drag;
        this.x += this.dx;
        this.y += this.dy;
        this.rotation += this.rotationSpeed;
        this.size *= 0.99; // shrink slightly
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        ctx.restore();
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i=0; i<particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Remove if off screen or tiny
        if(particles[i].y > canvas.height + 100 || particles[i].size < 0.5) {
            particles.splice(i, 1);
            i--;
        }
    }
}

btn.addEventListener('click', () => {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    for(let i=0; i<150; i++) {
        particles.push(new Particle(x, y));
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
