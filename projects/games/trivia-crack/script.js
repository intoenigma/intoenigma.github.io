const questions = [
    { q: "What is the capital of France?", a: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
    { q: "Which language is used for web structure?", a: ["Python", "HTML", "Java", "C++"], correct: 1 },
    { q: "Red Planet in our solar system?", a: ["Mars", "Venus", "Jupiter", "Saturn"], correct: 0 },
    { q: "Chemical symbol for Gold?", a: ["Ag", "Fe", "Au", "Cu"], correct: 2 },
    { q: "Who painted the Mona Lisa?", a: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], correct: 2 },
    { q: "Smallest prime number?", a: ["0", "1", "2", "3"], correct: 2 }
];

let currentQ = 0;
let score = 0;
const qEl = document.getElementById('question');
const optEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

function loadQuestion() {
    if (currentQ >= questions.length) {
        qEl.textContent = "ASSESSMENT COMPLETE";
        optEl.innerHTML = '';
        nextBtn.textContent = 'Restart';
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = () => location.reload();
        return;
    }

    const data = questions[currentQ];
    qEl.textContent = data.q;
    optEl.innerHTML = '';

    data.a.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.textContent = ans;
        btn.classList.add('option-btn');
        btn.onclick = () => checkAnswer(idx, btn);
        optEl.appendChild(btn);
    });
    nextBtn.classList.add('hidden');
}

function checkAnswer(idx, btn) {
    const data = questions[currentQ];
    const buttons = optEl.querySelectorAll('button');

    buttons.forEach(b => b.disabled = true);

    if (idx === data.correct) {
        btn.classList.add('correct');
        score += 10;
        scoreEl.textContent = score;
    } else {
        btn.classList.add('wrong');
        buttons[data.correct].classList.add('correct');
    }

    nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
    currentQ++;
    loadQuestion();
});

loadQuestion();
