const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: canvas.width/2, y: canvas.height/2, active: false };
let repel = false;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 1;
        this.col = '#00f3ff';
    }
    
    update() {
        // Attraction to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        // Force Strength
        const force = (500 - dist) / 500; 
        
        if(dist < 500) {
            const angle = Math.atan2(dy, dx);
            const dir = repel ? -1 : 1;
            this.vx += Math.cos(angle) * force * 0.5 * dir;
            this.vy += Math.sin(angle) * force * 0.5 * dir;
            this.col = repel ? '#ff0055' : '#00f3ff';
        } else {
            this.col = '#555';
        }
        
        // Friction
        this.vx *= 0.95;
        this.vy *= 0.95;
        
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounds
        if(this.x < 0) this.x = canvas.width;
        if(this.x > canvas.width) this.x = 0;
        if(this.y < 0) this.y = canvas.height;
        if(this.y > canvas.height) this.y = 0;
    }
    
    draw() {
        ctx.fillStyle = this.col;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for(let i=0; i<300; i++) particles.push(new Particle());

function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('mousedown', () => repel = true);
window.addEventListener('mouseup', () => repel = false);
window.addEventListener('resize', () => { canvas.width=window.innerWidth; canvas.height=window.innerHeight; });

animate();
