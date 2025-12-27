const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = 0;
let mouseY = 0;
let angle = 0;

function drawSector(sectorAngle, i) {
    ctx.save();
    ctx.beginPath();
    ctx.rotate(i * sectorAngle);
    // Draw some shapes based on mouse pos
    ctx.strokeStyle = `hsl(${angle + i * 20}, 70%, 50%)`;
    ctx.lineWidth = 2;
    ctx.moveTo(mouseX / 10, mouseY / 10);
    ctx.lineTo(mouseX / 2, mouseY / 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(mouseX/4, mouseY/4, 20, 0, Math.PI*2);
    ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
    ctx.fill();
    ctx.restore();
}

function animate() {
    // Trail effect
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height); // Correct for translate in init
    
    const sectors = 12;
    const rad = (Math.PI * 2) / sectors;
    
    for(let i=0; i<sectors; i++) {
        drawSector(rad, i);
        // Reflection
        ctx.save();
        ctx.scale(1, -1); // mirror
        drawSector(rad, i);
        ctx.restore();
    }
    
    angle += 2;
    requestAnimationFrame(animate);
}

// Center origin
ctx.translate(canvas.width / 2, canvas.height / 2);

window.addEventListener('mousemove', e => {
    // Relative to center
    mouseX = e.clientX - canvas.width / 2;
    mouseY = e.clientY - canvas.height / 2;
});

animate();
