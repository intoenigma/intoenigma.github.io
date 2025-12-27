let userScore = 0;
let cpuScore = 0;

const choices = ['rock', 'paper', 'scissors'];
const icons = {
    'rock': '👊',
    'paper': '✋',
    'scissors': '✌️'
};

document.getElementById('rock').addEventListener('click', () => play('rock'));
document.getElementById('paper').addEventListener('click', () => play('paper'));
document.getElementById('scissors').addEventListener('click', () => play('scissors'));

function play(userChoice) {
    const cpuChoice = choices[Math.floor(Math.random() * choices.length)];

    // Update visuals
    const resultText = document.getElementById('result-text');
    const cpuText = document.getElementById('cpu-choice-text');

    cpuText.textContent = `System chose ${icons[cpuChoice]}`;

    if (userChoice === cpuChoice) {
        resultText.textContent = "Draw!";
        resultText.style.color = "#fff";
    } else if (
        (userChoice === 'rock' && cpuChoice === 'scissors') ||
        (userChoice === 'paper' && cpuChoice === 'rock') ||
        (userChoice === 'scissors' && cpuChoice === 'paper')
    ) {
        resultText.textContent = "You Win!";
        resultText.style.color = "#00f3ff";
        userScore++;
    } else {
        resultText.textContent = "System Wins!";
        resultText.style.color = "#ff0055";
        cpuScore++;
    }

    updateScore();
}

function updateScore() {
    document.getElementById('user-score').textContent = userScore;
    document.getElementById('cpu-score').textContent = cpuScore;

    // Animate score update
    document.getElementById('user-score').style.transform = "scale(1.5)";
    setTimeout(() => {
        document.getElementById('user-score').style.transform = "scale(1)";
    }, 200);
}

function resetGame() {
    userScore = 0;
    cpuScore = 0;
    updateScore();
    document.getElementById('result-text').textContent = "Choose...";
    document.getElementById('result-text').style.color = "#fff";
    document.getElementById('cpu-choice-text').textContent = "";
}
