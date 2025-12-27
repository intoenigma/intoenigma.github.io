const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const drops = [];

class Drop {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -100;
        this.dy = Math.random() * 5 + 10;
        this.len = Math.random() * 20 + 10;
    }
    update() {
        this.y += this.dy;
        if (this.y > canvas.height) {
            this.y = Math.random() * -100;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.len);
        ctx.stroke();
    }
}

for (let i = 0; i < 500; i++) drops.push(new Drop());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach(d => {
        d.update();
        d.draw();
    });
    // Draw puddles/splashes? simplified for now as just rain
    requestAnimationFrame(animate);
}
animate();
