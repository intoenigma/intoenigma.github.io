const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const color = document.getElementById('color');
const size = document.getElementById('size');

let painting = false;

function startPos(e) {
    painting = true;
    draw(e);
}
function endPos() {
    painting = false;
    ctx.beginPath();
}
function draw(e) {
    if(!painting) return;
    ctx.lineWidth = size.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color.value;
    
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

canvas.addEventListener('mousedown', startPos);
canvas.addEventListener('mouseup', endPos);
canvas.addEventListener('mousemove', draw);
window.addEventListener('resize', () => { canvas.width=window.innerWidth; canvas.height=window.innerHeight; });
