const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let R = 150;
let r = 52;
let d = 100;
let t = 0;

function draw() {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 1;
    ctx.beginPath();

    for (let i = 0; i < 5000; i++) {
        t += 0.05;
        const x = (R - r) * Math.cos(t) + d * Math.cos((R - r) / r * t);
        const y = (R - r) * Math.sin(t) - d * Math.sin((R - r) / r * t);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

draw();
// We could animate it drawing slowly, but instant is fine for now or static art
