const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];
const maxDist = 150;

class Node {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
}

for (let i = 0; i < 100; i++) nodes.push(new Node());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
                const alpha = 1 - (dist / maxDist);
                ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`; // Cyan mesh
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }

        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(animate);
}
animate();
