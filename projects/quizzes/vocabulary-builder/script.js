const VOCAB = [
    { w: "Ephemeral", d: "Lasting for a very short time." },
    { w: "Ubiquitous", d: "Present, appearing, or found everywhere." },
    { w: "Pragmatic", d: "Dealing with things sensibly and realistically." },
    { w: "Surreptitious", d: "Kept secret, especially because it would not be approved of." },
    { w: "Cacophony", d: "A harsh, discordant mixture of sounds." },
    { w: "Eloquence", d: "Fluent or persuasive speaking or writing." },
    { w: "Ineffable", d: "Too great or extreme to be expressed or described in words." },
    { w: "Resilient", d: "Able to withstand or recover quickly from difficult conditions." }
];

let streak = 0;
let currentWord = null;

const wordDisplay = document.getElementById('word-display');
const optionsGrid = document.getElementById('options-grid');
const streakEl = document.getElementById('streak');

function nextQuestion() {
    currentWord = VOCAB[Math.floor(Math.random() * VOCAB.length)];
    wordDisplay.innerText = currentWord.w;

    // Generate options
    let options = [currentWord.d];
    while (options.length < 4) {
        let rand = VOCAB[Math.floor(Math.random() * VOCAB.length)].d;
        if (!options.includes(rand)) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);

    optionsGrid.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-secondary';
        btn.style.textAlign = 'left';
        btn.style.height = 'auto';
        btn.style.padding = '15px';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt);
        optionsGrid.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === currentWord.d) {
        streak++;
        streakEl.innerText = streak;
        nextQuestion();
    } else {
        alert(`Incorrect. ${currentWord.w} means: ${currentWord.d}`);
        streak = 0;
        streakEl.innerText = streak;
        nextQuestion();
    }
}

nextQuestion();
