const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 800;
const speed = 20;

class Star {
    constructor() {
        this.x = (Math.random() - 0.5) * canvas.width * 2;
        this.y = (Math.random() - 0.5) * canvas.height * 2;
        this.z = Math.random() * canvas.width;
    }

    update() {
        this.z -= speed;
        if (this.z <= 0) {
            this.z = canvas.width;
            this.x = (Math.random() - 0.5) * canvas.width * 2;
            this.y = (Math.random() - 0.5) * canvas.height * 2;
        }
    }

    draw() {
        const sx = (this.x / this.z) * canvas.width / 2 + canvas.width / 2;
        const sy = (this.y / this.z) * canvas.height / 2 + canvas.height / 2;

        const size = (1 - this.z / canvas.width) * 4;

        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < numStars; i++) stars.push(new Star());

function animate() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        s.update();
        s.draw();
    });
    requestAnimationFrame(animate);
}
animate();
