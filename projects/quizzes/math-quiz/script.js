let score = 0;
let timeLeft = 60;
let timerId = null;
let currentAnswer = 0;

const startScreen = document.getElementById('game-start-screen');
const activeScreen = document.getElementById('game-active-screen');
const overScreen = document.getElementById('game-over-screen');
const problemEl = document.getElementById('problem');
const inputEl = document.getElementById('answer-input');
const scoreEl = document.getElementById('score');
const finalScoreEl = document.getElementById('final-score');
const timerFill = document.getElementById('timer-fill');

function startGame() {
    score = 0;
    timeLeft = 60;
    scoreEl.innerText = score;
    startScreen.classList.add('hidden');
    overScreen.classList.add('hidden');
    activeScreen.classList.remove('hidden');
    inputEl.value = '';
    inputEl.focus();
    
    generateProblem();
    startTimer();
}

function generateProblem() {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let n1, n2;

    if (op === '+') {
        n1 = Math.floor(Math.random() * 50) + 1;
        n2 = Math.floor(Math.random() * 50) + 1;
        currentAnswer = n1 + n2;
    } else if (op === '-') {
        n1 = Math.floor(Math.random() * 50) + 20;
        n2 = Math.floor(Math.random() * n1);
        currentAnswer = n1 - n2;
    } else {
        n1 = Math.floor(Math.random() * 12) + 2;
        n2 = Math.floor(Math.random() * 12) + 2;
        currentAnswer = n1 * n2;
    }

    problemEl.innerText = `${n1} ${op} ${n2}`;
}

function checkAnswer() {
    if (parseInt(inputEl.value) === currentAnswer) {
        score += 10;
        scoreEl.innerText = score;
        inputEl.value = '';
        generateProblem();
    }
}

function startTimer() {
    clearInterval(timerId);
    timerId = setInterval(() => {
        timeLeft--;
        const percentage = (timeLeft / 60) * 100;
        timerFill.style.width = percentage + '%';

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerId);
    activeScreen.classList.add('hidden');
    overScreen.classList.remove('hidden');
    finalScoreEl.innerText = score;
}

inputEl.addEventListener('input', checkAnswer);
