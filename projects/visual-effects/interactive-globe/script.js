const canvas = document.getElementById('globe');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let angle = 0;
const dots = [];
const radius = 200;
const dotCount = 400;

for (let i = 0; i < dotCount; i++) {
    // Spherical coordinates
    const phi = Math.acos(-1 + (2 * i) / dotCount);
    const theta = Math.sqrt(dotCount * Math.PI) * phi;
    dots.push({ phi, theta });
}

function project(x, y, z) {
    const scale = 400 / (400 - z); // Perspective projection
    const px = x * scale + canvas.width / 2;
    const py = y * scale + canvas.height / 2;
    return { x: px, y: py, scale };
}

function rotateY(x, z, ang) {
    const cos = Math.cos(ang);
    const sin = Math.sin(ang);
    return {
        x: x * cos - z * sin,
        z: x * sin + z * cos
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    angle += 0.005;

    dots.forEach(dot => {
        let x = radius * Math.sin(dot.phi) * Math.cos(dot.theta);
        let y = radius * Math.cos(dot.phi);
        let z = radius * Math.sin(dot.phi) * Math.sin(dot.theta);

        // Rotate
        const rotated = rotateY(x, z, angle);
        x = rotated.x;
        z = rotated.z;

        // Project
        const p = project(x, y, z);
        const alpha = (z + radius) / (2 * radius); // Fade back dots

        ctx.globalAlpha = Math.max(0.1, alpha);
        ctx.fillStyle = '#00f3ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

draw();
