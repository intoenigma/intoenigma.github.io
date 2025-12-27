const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = { x: 50, y: 350, w: 30, h: 30, dx: 0, dy: 0, speed: 5, jump: 12, gravity: 0.6, grounded: false, color: '#00f3ff' };

// Platforms
const platforms = [
    { x: 0, y: 450, w: 800, h: 50 }, // floor
    { x: 200, y: 350, w: 100, h: 20 },
    { x: 400, y: 250, w: 100, h: 20 },
    { x: 600, y: 150, w: 100, h: 20 },
];

const keys = { right: false, left: false, up: false };

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') keys.right = true;
    if (e.code === 'ArrowLeft') keys.left = true;
    if (e.code === 'ArrowUp') {
        if (player.grounded) {
            player.dy = -player.jump;
            player.grounded = false;
        }
    }
});
document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight') keys.right = false;
    if (e.code === 'ArrowLeft') keys.left = false;
});

function update() {
    // Horizontal
    if (keys.right) player.dx = player.speed;
    else if (keys.left) player.dx = -player.speed;
    else player.dx = 0;

    player.x += player.dx;

    // Gravity
    player.dy += player.gravity;
    player.y += player.dy;
    player.grounded = false;

    // Collision
    platforms.forEach(p => {
        if (player.x < p.x + p.w && player.x + player.w > p.x &&
            player.y < p.y + p.h && player.y + player.h > p.y) {

            // Hit from top?
            if (player.dy > 0 && player.y + player.h - player.dy <= p.y) {
                player.grounded = true;
                player.dy = 0;
                player.y = p.y - player.h;
            }
        }
    });

    // Bounds
    if (player.y > canvas.height) reset();

    // Portal Check (Goal)
    if (player.x > 620 && player.y < 150) {
        alert("LEVEL COMPLETE");
        reset();
    }
}

function reset() {
    player.x = 50; player.y = 350; player.dy = 0;
}

function draw() {
    ctx.fillStyle = '#05050a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Platforms
    ctx.fillStyle = '#333';
    platforms.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));

    // Goal
    ctx.fillStyle = '#00ff41';
    ctx.fillRect(630, 100, 40, 50);

    // Player
    ctx.fillStyle = player.color;
    ctx.shadowBlur = 10; ctx.shadowColor = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
    ctx.shadowBlur = 0;
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('msg-overlay').classList.add('hidden');
    loop();
});
