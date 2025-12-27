const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ball = { x: 400, y: 250, r: 8, dx: 5, dy: 5, speed: 7, color: '#fff' };
const user = { x: 0, y: 200, w: 10, h: 80, color: '#00f3ff', score: 0 };
const ai = { x: 790, y: 200, w: 10, h: 80, color: '#ff0055', score: 0 };
const net = { x: 399, y: 0, w: 2, h: 500, color: '#333' };

let gameRunning = false;

// Controls
canvas.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();
    user.y = e.clientY - rect.top - user.h / 2;
});

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;
    ball.dx = -ball.dx;
}

function update() {
    if (!gameRunning) return;

    // Move Ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Walls
    if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0) ball.dy = -ball.dy;

    // AI
    // Simple AI follows ball with delay
    let aiCenter = ai.y + ai.h / 2;
    if (aiCenter < ball.y - 35) ai.y += 4;
    else if (aiCenter > ball.y + 35) ai.y -= 4;

    // Collision Player
    let player = (ball.x < canvas.width / 2) ? user : ai;
    if (collision(ball, player)) {
        // Hit logic
        let collidePoint = ball.y - (player.y + player.h / 2);
        collidePoint = collidePoint / (player.h / 2);

        let angleRad = (Math.PI / 4) * collidePoint;
        let dir = (ball.x < canvas.width / 2) ? 1 : -1;

        ball.dx = dir * ball.speed * Math.cos(angleRad);
        ball.dy = ball.speed * Math.sin(angleRad);

        ball.speed += 0.5; // speed up
    }

    // Score
    if (ball.x - ball.r < 0) {
        ai.score++;
        document.getElementById('ai-score').textContent = ai.score;
        resetBall();
    } else if (ball.x + ball.r > canvas.width) {
        user.score++;
        document.getElementById('p-score').textContent = user.score;
        resetBall();
    }
}

function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.h;
    p.left = p.x;
    p.right = p.x + p.w;

    b.top = b.y - b.r;
    b.bottom = b.y + b.r;
    b.left = b.x - b.r;
    b.right = b.x + b.r;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

function draw() {
    // BG
    ctx.fillStyle = '#05050a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Net
    ctx.fillStyle = net.color;
    ctx.fillRect(net.x, net.y, net.w, net.h);

    // Players
    drawRect(user);
    drawRect(ai);

    // Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.shadowBlur = 15; ctx.shadowColor = ball.color;
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;
}

function drawRect(p) {
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 10; ctx.shadowColor = p.color;
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.shadowBlur = 0;
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-overlay').classList.add('hidden');
    gameRunning = true;
    loop();
});
