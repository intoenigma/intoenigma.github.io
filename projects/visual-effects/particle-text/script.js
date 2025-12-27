const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Create Text Data
ctx.font = '30px Verdana';
ctx.fillStyle = 'white';
ctx.fillText('ENIGMA', 0, 30);
// We need to scan pixel data, but standard scanning is complex for quick implementation.
// Let's mimic it with random particles converging or just "Matrix" style text formation? 
// The user likely wants text made of dots that react to mouse.

// Simplified: Hardcoded grid points for ENIGMA or render text to offscreen canvas and scan.
// Let's try scanning.
const textCanvas = document.createElement('canvas');
const tCtx = textCanvas.getContext('2d');
textCanvas.width = 400;
textCanvas.height = 100;
tCtx.fillStyle = 'white';
tCtx.font = 'bold 60px Outfit';
tCtx.fillText('ENIGMA', 50, 70);

const textData = tCtx.getImageData(0, 0, 400, 100);
const coordinates = [];

for (let y = 0; y < 100; y += 2) {
    for (let x = 0; x < 400; x += 2) {
        if (textData.data[(y * 400 + x) * 4 + 3] > 128) {
            coordinates.push({ x: x * 2 + (window.innerWidth / 2 - 400), y: y * 2 + (window.innerHeight / 2 - 100) });
        }
    }
}

class Particle {
    constructor(targetX, targetY) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.targetX = targetX;
        this.targetY = targetY;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.9;
    }
    update() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        this.vx += dx * 0.05;
        this.vy += dy * 0.05;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
    }
    draw() {
        ctx.fillStyle = '#00f3ff';
        ctx.fillRect(this.x, this.y, 2, 2);
    }
}

coordinates.forEach(c => particles.push(new Particle(c.x, c.y)));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

animate();
