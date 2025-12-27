const pads = ['green', 'red', 'yellow', 'blue'];
let sequence = [];
let playerSequence = [];
let level = 1;
let gameRunning = false;
let canClick = false;

const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('start-overlay');
const levelIndicator = document.getElementById('level-indicator');

pads.forEach(color => {
    document.getElementById(color).addEventListener('click', () => handlePadClick(color));
});

startBtn.addEventListener('click', startGame);

function startGame() {
    overlay.classList.add('hidden');
    sequence = [];
    playerSequence = [];
    level = 1;
    gameRunning = true;
    updateLevel();
    nextRound();
}

function updateLevel() {
    levelIndicator.textContent = level;
}

function nextRound() {
    playerSequence = [];
    canClick = false;

    // Add new step
    const randomColor = pads[Math.floor(Math.random() * 4)];
    sequence.push(randomColor);

    // Play sequence
    let i = 0;
    const interval = setInterval(() => {
        flashPad(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            canClick = true;
        }
    }, 800);
}

function flashPad(color) {
    const pad = document.getElementById(color);
    pad.classList.add('active');
    // Sound could go here
    setTimeout(() => {
        pad.classList.remove('active');
    }, 400);
}

function handlePadClick(color) {
    if (!gameRunning || !canClick) return;

    flashPad(color);
    playerSequence.push(color);

    // Check correctness
    const idx = playerSequence.length - 1;
    if (playerSequence[idx] !== sequence[idx]) {
        gameOver();
        return;
    }

    if (playerSequence.length === sequence.length) {
        canClick = false;
        level++;
        updateLevel();
        setTimeout(nextRound, 1000);
    }
}

function gameOver() {
    gameRunning = false;
    alert(`GAME OVER. SYSTEM LOCKDOWN AT LEVEL ${level}`);
    location.reload();
}
