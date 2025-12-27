const holes = document.querySelectorAll('.hole');
const scoreBoard = document.getElementById('score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) return randomHole(holes);
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1200);
    const hole = randomHole(holes);
    hole.classList.add('up');
    hole.querySelector('.mole').classList.remove('smacked'); // Reset color
    
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    document.getElementById('start-btn').disabled = true;
    peep();
    setTimeout(() => {
        timeUp = true;
        document.getElementById('start-btn').disabled = false;
        alert("TIME'S UP! Score: " + score);
    }, 15000);
}

function bonk(e) {
    if(!e.isTrusted) return; // Cheater check
    score++;
    this.parentNode.classList.remove('up');
    this.classList.add('smacked');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
document.getElementById('start-btn').addEventListener('click', startGame);
