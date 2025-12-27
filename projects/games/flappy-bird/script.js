const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let frames = 0;
let score = 0;
let gameState = 'START'; // START, PLAY, OVER

const bird = {
    x: 50, y: 150, w: 20, h: 20,
    velocity: 0, gravity: 0.25, jump: 4.6,
    color: '#00f3ff'
};

const pipes = {
    position: [],
    w: 50, h: 400, gap: 120, dx: 2,
    maxYPos: -150
};

// Controls
function jump() {
    if (gameState === 'PLAY') bird.velocity = -bird.jump;
    else if (gameState === 'START') {
        gameState = 'PLAY';
        document.getElementById('start-overlay').classList.add('hidden');
        loop();
    } else if (gameState === 'OVER') {
        location.reload();
    }
}
document.addEventListener('mousedown', jump);
document.addEventListener('keydown', (e) => { if (e.code === 'Space') jump(); });

function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Bird
    ctx.fillStyle = bird.color;
    ctx.shadowBlur = 10; ctx.shadowColor = bird.color;
    ctx.fillRect(bird.x, bird.y, bird.w, bird.h);

    // Pipes
    ctx.fillStyle = '#00ff41'; // Green pipes
    ctx.shadowBlur = 5; ctx.shadowColor = '#00ff41';
    for (let i = 0; i < pipes.position.length; i++) {
        let p = pipes.position[i];
        let topY = p.y;
        let bottomY = p.y + pipes.h + pipes.gap;

        // Top Pipe
        ctx.fillRect(p.x, topY, pipes.w, pipes.h);
        // Bottom Pipe
        ctx.fillRect(p.x, bottomY, pipes.w, pipes.h);
    }

    // Ground
    ctx.fillStyle = '#333';
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
    ctx.shadowBlur = 0;
}

function update() {
    if (gameState !== 'PLAY') return;

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Floor Collision
    if (bird.y + bird.h >= canvas.height - 20) {
        gameState = 'OVER';
        alert("CRASHED. Score: " + score);
    }

    // Pipes
    if (frames % 120 === 0) {
        pipes.position.push({
            x: canvas.width,
            y: Math.floor(Math.random() * (pipes.maxYPos + 1)) - 100 // -100 to -300 approx
        });
    }

    for (let i = 0; i < pipes.position.length; i++) {
        let p = pipes.position[i];
        p.x -= pipes.dx;

        if (p.x + pipes.w <= 0) {
            pipes.position.shift();
            score++;
            document.getElementById('score').textContent = score;
            i--;
        }

        // Collision
        // Bird X within Pipe X
        if (bird.x + bird.w > p.x && bird.x < p.x + pipes.w) {
            // Bird Y hits Top pipe OR Bird Y hits Bottom pipe
            if (bird.y < p.y + pipes.h || bird.y + bird.h > p.y + pipes.h + pipes.gap) {
                gameState = 'OVER';
                alert("CRASHED. Score: " + score);
            }
        }
    }
    frames++;
}

function loop() {
    update();
    draw();
    if (gameState !== 'OVER') requestAnimationFrame(loop);
}

document.getElementById('start-btn').addEventListener('click', jump);
