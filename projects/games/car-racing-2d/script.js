const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0;
let gameOver = false;
let gameRunning = false;
let speed = 5;

// Road
let lineOffset = 0;

// Player
const car = { x: 175, y: 500, w: 50, h: 80, color: '#00f3ff' };

// Enemies
let enemies = [];

// Controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && car.x > 20) car.x -= 70; // Lane change left
    else if (e.key === 'ArrowLeft' && car.x > 0) car.x -= 10; // smooth adjust

    if (e.key === 'ArrowRight' && car.x < 330) car.x += 70; // Lane change right
    else if (e.key === 'ArrowRight' && car.x < 350) car.x += 10;
});

function spawnEnemy() {
    const lanes = [25, 125, 225, 325]; // 4 lanes roughly
    const lane = lanes[Math.floor(Math.random() * lanes.length)];
    enemies.push({ x: lane, y: -100, w: 50, h: 80, color: '#ff0055', speed: speed - 2 });
}

function drawCar(x, y, color) {
    ctx.fillStyle = color;
    ctx.shadowBlur = 15; ctx.shadowColor = color;
    ctx.fillRect(x, y, 50, 80);

    // Windshield
    ctx.fillStyle = '#000';
    ctx.shadowBlur = 0;
    ctx.fillRect(x + 5, y + 50, 40, 15);

    // Headlights
    ctx.fillStyle = '#fff';
    ctx.fillRect(x + 5, y + 5, 10, 5);
    ctx.fillRect(x + 35, y + 5, 10, 5);
}

function update() {
    if (gameOver || !gameRunning) return;

    // Road scroll
    lineOffset += speed;
    if (lineOffset > 40) lineOffset = 0;

    // Enemy Spawn
    if (Math.random() < 0.02) spawnEnemy();

    // Enemy Logic
    enemies.forEach((e, i) => {
        e.y += speed;
        if (e.y > 600) {
            enemies.splice(i, 1);
            score++;
            document.getElementById('score').textContent = score;
            if (score % 10 === 0) speed += 0.5; // Speed up
        }

        // Collsion
        if (car.x < e.x + e.w && car.x + car.w > e.x &&
            car.y < e.y + e.h && car.y + car.h > e.y) {
            gameOver = true;
            alert('CRASH! Score: ' + score);
            location.reload();
        }
    });
}

function draw() {
    // Asphalt
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, 400, 600);

    // Dynamic Road Lines
    ctx.strokeStyle = '#fff';
    ctx.setLineDash([20, 20]);
    ctx.lineDashOffset = -lineOffset;
    ctx.lineWidth = 4;

    // 3 lane dividers for 4 lanes
    ctx.beginPath();
    ctx.moveTo(100, 0); ctx.lineTo(100, 600);
    ctx.moveTo(200, 0); ctx.lineTo(200, 600);
    ctx.moveTo(300, 0); ctx.lineTo(300, 600);
    ctx.stroke();

    if (gameRunning) {
        drawCar(car.x, car.y, car.color);
        enemies.forEach(e => drawCar(e.x, e.y, e.color));
    }
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
