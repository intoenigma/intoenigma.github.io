const ball = document.querySelector('.eight-ball');
const answer = document.getElementById('answer-text');

const answers = [
    "It is certain", "Decidedly so", "Without a doubt", "Yes definitely",
    "You may rely on it", "As I see it, yes", "Most likely", "Outlook good",
    "Yes", "Signs point to yes", "Reply hazy, try again", "Ask again later",
    "Better not tell you now", "Cannot predict now", "Concentrate and ask again",
    "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good",
    "Very doubtful"
];

function ask() {
    if (ball.classList.contains('shake')) return;

    ball.classList.add('shake');
    answer.style.opacity = 0;

    setTimeout(() => {
        ball.classList.remove('shake');
        const r = Math.floor(Math.random() * answers.length);
        answer.innerText = answers[r];
        answer.style.opacity = 1;
    }, 500);
}
