const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreEl = document.getElementById('final-score');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// Game State
let gameLoopId;
let score = 0;
let level = 1;
let isGameOver = false;
let isPaused = false;

// Entities
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 30,
    speed: 5,
    dx: 0,
    color: '#00f3ff'
};

let bullets = [];
let alienBullets = [];
let aliens = [];
let particles = [];

// Constants
const ALIEN_ROWS = 4;
const ALIEN_COLS = 8;
const ALIEN_WIDTH = 40;
const ALIEN_HEIGHT = 30;
const ALIEN_PADDING = 20;
const ALIEN_OFFSET_TOP = 50;
const ALIEN_OFFSET_LEFT = 50;

// Input Handling
const keys = {
    ArrowRight: false,
    ArrowLeft: false,
    Space: false
};

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') keys.ArrowRight = true;
    if (e.code === 'ArrowLeft') keys.ArrowLeft = true;
    if (e.code === 'Space') {
        if (!keys.Space && !isGameOver && !startScreen.checkVisibility()) { // Prevent spam
             fireBullet();
        }
        keys.Space = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight') keys.ArrowRight = false;
    if (e.code === 'ArrowLeft') keys.ArrowLeft = false;
    if (e.code === 'Space') keys.Space = false;
});

// Game Logic
function initGame() {
    score = 0;
    level = 1;
    isGameOver = false;
    scoreEl.innerText = '00000';
    levelEl.innerText = level;
    
    player.x = canvas.width / 2 - 25;
    bullets = [];
    alienBullets = [];
    particles = [];
    
    createAliens();
    
    if (gameLoopId) cancelAnimationFrame(gameLoopId);
    gameLoop();
}

function createAliens() {
    aliens = [];
    for (let c = 0; c < ALIEN_COLS; c++) {
        for (let r = 0; r < ALIEN_ROWS; r++) {
            aliens.push({
                x: (c * (ALIEN_WIDTH + ALIEN_PADDING)) + ALIEN_OFFSET_LEFT,
                y: (r * (ALIEN_HEIGHT + ALIEN_PADDING)) + ALIEN_OFFSET_TOP,
                width: ALIEN_WIDTH,
                height: ALIEN_HEIGHT,
                status: 1
            });
        }
    }
}

function fireBullet() {
    bullets.push({
        x: player.x + player.width / 2 - 2,
        y: player.y,
        width: 4,
        height: 10,
        speed: 7,
        color: '#fff'
    });
}

function update() {
    // Player Movement
    if (keys.ArrowRight && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
    }

    // Bullets
    bullets.forEach((b, index) => {
        b.y -= b.speed;
        if (b.y < 0) bullets.splice(index, 1);
    });

    // Alien Movement (Simple patrol)
    let moveDown = false;
    // Determine speed based on level
    let alienSpeed = 1 + (level * 0.2); 
    
    // Check bounds
    const leftMost = aliens.reduce((min, a) => a.status ? Math.min(min, a.x) : min, canvas.width);
    const rightMost = aliens.reduce((max, a) => a.status ? Math.max(max, a.x + a.width) : max, 0);

    // This logic is a bit simplified for "fleet movement", real space invaders has a global direction
    // For now we just oscillate the whole block manually if I tracked direction globally
    // Let's implement global direction
}

// Fixed Update for simplicity
let alienDirection = 1; // 1 right, -1 left

function updateAliens() {
    let hitEdge = false;
    let activeAliens = false;
    
    aliens.forEach(alien => {
        if (alien.status === 1) {
            alien.x += (1 + (level * 0.3)) * alienDirection;
            activeAliens = true;
            if (alien.x + alien.width > canvas.width - 10 || alien.x < 10) {
                hitEdge = true;
            }
            // Collision with Player
             if (
                alien.x < player.x + player.width &&
                alien.x + alien.width > player.x &&
                alien.y < player.y + player.height &&
                alien.y + alien.height > player.y
            ) {
                gameOver();
            }
            // Base breach
            if (alien.y > canvas.height - 50) gameOver();
        }
    });

    if (!activeAliens) {
        // Level Complete
        level++;
        levelEl.innerText = level;
        alienBullets = [];
        bullets = [];
        createAliens();
    }

    if (hitEdge) {
        alienDirection *= -1;
        aliens.forEach(alien => {
             if (alien.status === 1) alien.y += 20;
        });
    }

    // Random Alien Shoot
    if (Math.random() < 0.01 + (level * 0.005)) {
        const active = aliens.filter(a => a.status === 1);
        if (active.length > 0) {
            const shooter = active[Math.floor(Math.random() * active.length)];
            alienBullets.push({
                x: shooter.x + shooter.width / 2,
                y: shooter.y + shooter.height,
                width: 4,
                height: 10,
                speed: 4,
                color: '#ff0055'
            });
        }
    }
}

function updateBullets() {
    // Player hits Aliens
    bullets.forEach((b, bIdx) => {
        aliens.forEach(a => {
            if (a.status === 1) {
                if (
                    b.x > a.x && 
                    b.x < a.x + a.width && 
                    b.y > a.y && 
                    b.y < a.y + a.height
                ) {
                    a.status = 0;
                    bullets.splice(bIdx, 1);
                    score += 10;
                    scoreEl.innerText = score.toString().padStart(5, '0');
                    createExplosion(a.x + a.width/2, a.y + a.height/2, '#00f3ff');
                }
            }
        });
    });

    // Alien hits Player
    alienBullets.forEach((b, index) => {
        b.y += b.speed;
        if (b.y > canvas.height) alienBullets.splice(index, 1);

        if (
            b.x > player.x && 
            b.x < player.x + player.width && 
            b.y > player.y && 
            b.y < player.y + player.height
        ) {
            gameOver();
        }
    });
}

function createExplosion(x, y, color) {
    for (let i = 0; i < 10; i++) {
        particles.push({
            x: x,
            y: y,
            dx: (Math.random() - 0.5) * 5,
            dy: (Math.random() - 0.5) * 5,
            life: 30,
            color: color
        });
    }
}

function updateParticles() {
    particles.forEach((p, index) => {
        p.x += p.dx;
        p.y += p.dy;
        p.life--;
        if (p.life <= 0) particles.splice(index, 1);
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // Player Engine Glow
    ctx.shadowBlur = 20;
    ctx.shadowColor = player.color;
    ctx.fillRect(player.x + 10, player.y + 30, 10, 5);
    ctx.fillRect(player.x + 30, player.y + 30, 10, 5);
    ctx.shadowBlur = 0;

    // Draw Aliens
    aliens.forEach(alien => {
        if (alien.status === 1) {
            ctx.fillStyle = '#9d00ff'; // Alien Color
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#9d00ff';
            ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
            // Alien Eyes
            ctx.fillStyle = '#fff';
            ctx.fillRect(alien.x + 10, alien.y + 8, 5, 5);
            ctx.fillRect(alien.x + 25, alien.y + 8, 5, 5);
            ctx.shadowBlur = 0;
        }
    });

    // Draw Bullets
    ctx.fillStyle = '#fff';
    bullets.forEach(b => {
        ctx.fillRect(b.x, b.y, b.width, b.height);
    });

    ctx.fillStyle = '#ff0055';
    alienBullets.forEach(b => {
        ctx.fillRect(b.x, b.y, b.width, b.height);
    });

    // Draw Particles
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 30;
        ctx.fillRect(p.x, p.y, 3, 3);
        ctx.globalAlpha = 1;
    });
}

function gameOver() {
    isGameOver = true;
    cancelAnimationFrame(gameLoopId);
    gameOverScreen.classList.remove('hidden');
    finalScoreEl.innerText = score;
}

function gameLoop() {
    if (!isGameOver) {
        update(); // Player movement
        updateAliens();
        updateBullets();
        updateParticles();
        draw();
        gameLoopId = requestAnimationFrame(gameLoop);
    }
}

// UI Linking
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    initGame();
});

restartBtn.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    initGame();
});

// Initial Draw (Attract Mode)
function attractMode() {
    ctx.fillStyle = '#05050a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00f3ff';
    ctx.font = '20px Outfit';
    ctx.textAlign = 'center';
    ctx.fillText('System Ready. Press Initialize to Begin.', canvas.width/2, canvas.height/2);
}
attractMode();
