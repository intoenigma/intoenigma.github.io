const ball = document.getElementById('ball');
const triangle = document.getElementById('triangle');
const answer = document.getElementById('answer-text');

const answers = [
    "CERTAIN", "DEFINITE", "YES", "MOST LIKELY",
    "POSITIVE", "AFFIRMATIVE", "RELY ON IT", "OUTLOOK GOOD",
    "PROBABLE", "HAZY_RETRY", "ASK LATER", "UNSTABLE",
    "NO DATA", "FORGET IT", "DOUBTFUL", "NEGATIVE",
    "MY SOURCES NO", "UNLIKELY", "ZERO"
];

function ask() {
    if (ball.classList.contains('shake')) return;

    ball.classList.add('shake');
    triangle.classList.remove('reveal');
    
    setTimeout(() => {
        ball.classList.remove('shake');
        const r = Math.floor(Math.random() * answers.length);
        answer.innerText = answers[r];
        triangle.classList.add('reveal');
    }, 1000);
}
