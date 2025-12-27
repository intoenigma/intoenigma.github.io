const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0;
let lives = 3;
let paused = true;

// Paddle
const paddle = { x: canvas.width / 2 - 75, y: canvas.height - 30, w: 150, h: 15, dx: 0, speed: 8, color: '#00f3ff' };

// Ball
const ball = { x: canvas.width / 2, y: canvas.height / 2, r: 8, dx: 4, dy: -4, speed: 6, color: '#fff' };

// Bricks
const bricks = [];
const rows = 5;
const cols = 9;
const padding = 10;
const offsetTop = 60;
const offsetLeft = 35;
const brickW = 75;
const brickH = 20;

function initBricks() {
    for (let c = 0; c < cols; c++) {
        bricks[c] = [];
        for (let r = 0; r < rows; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1, color: `hsl(${c * 40}, 100%, 50%)` };
        }
    }
}
initBricks();

// Controls
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') rightPressed = true;
    if (e.key === 'ArrowLeft') leftPressed = true;
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') rightPressed = false;
    if (e.key === 'ArrowLeft') leftPressed = false;
});

// Particles
let particles = [];
function createParticles(x, y, color) {
    for (let i = 0; i < 8; i++) {
        particles.push({
            x, y,
            dx: (Math.random() - 0.5) * 5,
            dy: (Math.random() - 0.5) * 5,
            life: 20,
            color
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Paddle
    ctx.fillStyle = paddle.color;
    ctx.shadowBlur = 10; ctx.shadowColor = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);

    // Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.shadowBlur = 15; ctx.shadowColor = ball.color;
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;

    // Bricks
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                let bx = (c * (brickW + padding)) + offsetLeft;
                let by = (r * (brickH + padding)) + offsetTop;
                b.x = bx; b.y = by;
                ctx.fillStyle = b.color;
                ctx.fillRect(bx, by, brickW, brickH);
            }
        }
    }

    // Particles
    particles.forEach((p, i) => {
        ctx.globalAlpha = p.life / 20;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 4, 4);
        p.x += p.dx; p.y += p.dy;
        p.life--;
        if (p.life <= 0) particles.splice(i, 1);
    });
    ctx.globalAlpha = 1;
}

function update() {
    if (paused) return;

    // Paddle Move
    if (rightPressed && paddle.x < canvas.width - paddle.w) paddle.x += paddle.speed;
    if (leftPressed && paddle.x > 0) paddle.x -= paddle.speed;

    // Ball Move
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Walls
    if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.r < 0) {
        ball.dy = -ball.dy;
    }
    if (ball.y + ball.r > canvas.height) {
        lives--;
        document.getElementById('lives').textContent = lives;
        if (!lives) {
            alert('GAME OVER');
            document.location.reload();
        } else {
            ball.x = canvas.width / 2; ball.y = canvas.height / 2;
            ball.dx = 4; ball.dy = -4;
            paddle.x = canvas.width / 2 - 75;
        }
    }

    // Paddle Hit
    if (ball.y + ball.r > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
        ball.dy = -ball.speed;
        // Angle logic
        let collidePoint = ball.x - (paddle.x + paddle.w / 2);
        collidePoint = collidePoint / (paddle.w / 2);
        ball.dx = collidePoint * 6; // Spin effect
        createParticles(ball.x, ball.y, '#fff');
    }

    // Brick Hit
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (ball.x > b.x && ball.x < b.x + brickW && ball.y > b.y && ball.y < b.y + brickH) {
                    ball.dy = -ball.dy;
                    b.status = 0;
                    score += 10;
                    document.getElementById('score').textContent = score;
                    createParticles(b.x + brickW / 2, b.y + brickH / 2, b.color);
                    if (score == rows * cols * 10) {
                        alert('YOU WIN, CONGRATS!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-overlay').classList.add('hidden');
    paused = false;
    loop();
});
