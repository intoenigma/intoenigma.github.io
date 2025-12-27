const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0;
let gameSpeed = 5;
let gameRunning = false;

// Player
const player = {
    x: 50, y: 300, w: 40, h: 40,
    dy: 0, jumpPower: 15, gravity: 0.8, grounded: true,
    color: '#00f3ff'
};

// Obstacles
let obstacles = [];
let frame = 0;

// Controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && player.grounded) {
        player.dy = -player.jumpPower;
        player.grounded = false;
    }
});

function spawnObstacle() {
    let size = Math.random() < 0.5 ? 40 : 60;
    obstacles.push({
        x: canvas.width,
        y: 340 - (size - 40), // Ground level adjust
        w: 30, h: size,
        color: '#ff0055'
    });
}

function update() {
    if (!gameRunning) return;

    frame++;
    score++;
    if (frame % 100 === 0) gameSpeed += 0.2; // Speed up
    document.getElementById('score').textContent = Math.floor(score / 5);

    // Player Physics
    player.y += player.dy;
    if (player.y < 300) {
        player.dy += player.gravity;
    } else {
        player.y = 300;
        player.dy = 0;
        player.grounded = true;
    }

    // Spawn Obstacles
    // Random interval approx between 60 and 150 frames
    if (frame % Math.floor(Math.random() * 50 + 60) === 0) spawnObstacle();

    // Obstacle Logic
    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i];
        o.x -= gameSpeed;

        if (o.x + o.w < 0) {
            obstacles.shift();
            i--;
        }

        // Collision
        if (
            player.x < o.x + o.w &&
            player.x + player.w > o.x &&
            player.y < o.y + o.h &&
            player.y + player.h > o.y
        ) {
            gameOver();
        }
    }
}

function draw() {
    // BG
    ctx.fillStyle = '#05050a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Floor
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 340);
    ctx.lineTo(800, 340);
    ctx.stroke();

    // Player
    ctx.fillStyle = player.color;
    ctx.shadowBlur = 20; ctx.shadowColor = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // Obstacles
    obstacles.forEach(o => {
        ctx.fillStyle = o.color;
        ctx.shadowBlur = 20; ctx.shadowColor = o.color;
        ctx.fillRect(o.x, o.y, o.w, o.h);
    });

    ctx.shadowBlur = 0;
}

function gameOver() {
    gameRunning = false;
    alert("CRASHED. Score: " + Math.floor(score / 5));
    location.reload();
}

function loop() {
    update();
    draw();
    if (gameRunning) requestAnimationFrame(loop);
}

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-overlay').classList.add('hidden');
    gameRunning = true;
    loop();
});
