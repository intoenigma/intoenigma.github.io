const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let drawing = false;
const colorIn = document.getElementById('color');

// Center line
function drawGrid() {
    ctx.strokeStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
}
drawGrid();

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath(); // Reset path
});
canvas.addEventListener('mousemove', draw);

function draw(e) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorIn.value;

    // Draw Original
    ctx.lineTo(x, y);
    ctx.stroke();

    // Draw Mirror
    ctx.beginPath();
    ctx.moveTo(canvas.width - x, y); // Wait, this logic is tricky with continuous path
    // For simple mirror drawing, individual dots or short lines work best in loop
    // But stroke() connects to previous. 
    // Let's do a trick: we need two independent paths or just draw rects? 
    // Better: Standard drawing approach

    // Actually, to support mirroring properly with path, we should track lastX, lastY
}

// Improved Logic
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
});

// Overwrite draw
canvas.removeEventListener('mousemove', draw);
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = colorIn.value;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Mirror
    ctx.beginPath();
    ctx.moveTo(canvas.width - lastX, lastY);
    ctx.lineTo(canvas.width - x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
});

function clearCanvas() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid();
}
window.clearCanvas = clearCanvas;
