const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const startOverlay = document.getElementById('start-overlay');
const scoreEl = document.getElementById('score');

let score = 0;
let gameActive = false;
let animationId;
let projectiles = [];
let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    color: '#00f3ff'
};

function init() {
    projectiles = [];
    score = 0;
    scoreEl.innerText = score;
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
}

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    player.x = (e.clientX - rect.left) * (canvas.width / rect.width);
    player.y = (e.clientY - rect.top) * (canvas.height / rect.height);
});

function spawnProjectile() {
    const radius = Math.random() * 5 + 3;
    let x, y;
    if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height;
    } else {
        x = Math.random() * canvas.width;
        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    const angle = Math.atan2(player.y - y, player.x - x);
    const velocity = {
        x: Math.cos(angle) * (1 + score / 500),
        y: Math.sin(angle) * (1 + score / 500)
    };

    projectiles.push({ x, y, radius, velocity, color: '#ff0055' });
}

function update() {
    if (!gameActive) return;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = player.color;
    ctx.fill();
    ctx.closePath();

    projectiles.forEach((p, index) => {
        p.x += p.velocity.x;
        p.y += p.velocity.y;

        // Draw Projectile
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.closePath();

        // Collision Detection
        const dist = Math.hypot(player.x - p.x, player.y - p.y);
        if (dist - p.radius - player.radius < 1) {
            gameOver();
        }

        // Remove offscreen
        if (p.x + p.radius < -50 || p.x - p.radius > canvas.width + 50 ||
            p.y + p.radius < -50 || p.y - p.radius > canvas.height + 50) {
            projectiles.splice(index, 1);
            score += 10;
            scoreEl.innerText = score;
        }
    });

    if (Math.random() < 0.05 + (score / 10000)) spawnProjectile();

    animationId = requestAnimationFrame(update);
}

function gameOver() {
    gameActive = false;
    cancelAnimationFrame(animationId);
    startOverlay.classList.remove('hidden');
    startOverlay.querySelector('h2').innerText = 'SYSTEM COMPROMISED';
    startOverlay.querySelector('p').innerText = `Core stability lost. Score: ${score}`;
    startBtn.innerText = 'Reboot System';
}

startBtn.addEventListener('click', () => {
    startOverlay.classList.add('hidden');
    init();
    gameActive = true;
    update();
});
