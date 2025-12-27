const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];
const gravity = 0.5;
const friction = 0.9; // Damping

class Ball {
    constructor(x, y, dx, dy, r, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.y + this.r + this.dy > canvas.height) {
            this.dy = -this.dy * friction; // Bounce
            this.dx *= friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.r + this.dx > canvas.width || this.x - this.r <= 0) {
            this.dx = -this.dx * friction;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Standard clear
    balls.forEach(ball => ball.update());
}

const colors = ['#00f3ff', '#9d00ff', '#ffffff', '#ff0055'];

window.addEventListener('click', (e) => {
    // Spawn 5 balls
    for (let i = 0; i < 5; i++) {
        const r = Math.random() * 20 + 10;
        const x = e.clientX;
        const y = e.clientY;
        const dx = (Math.random() - 0.5) * 10;
        const dy = (Math.random() - 0.5) * 10;
        const col = colors[Math.floor(Math.random() * colors.length)];
        balls.push(new Ball(x, y, dx, dy, r, col));
    }
    // Limit balls to prevent lag
    if (balls.length > 100) balls.splice(0, 5);
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
