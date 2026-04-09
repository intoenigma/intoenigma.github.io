const DATA = [
    { c: "Japan", cap: "Tokyo" }, { c: "France", cap: "Paris" },
    { c: "Brazil", cap: "Brasilia" }, { c: "Canada", cap: "Ottawa" },
    { c: "Australia", cap: "Canberra" }, { c: "Germany", cap: "Berlin" },
    { c: "India", cap: "New Delhi" }, { c: "Egypt", cap: "Cairo" },
    { c: "South Africa", cap: "Pretoria" }, { c: "Italy", cap: "Rome" }
];

let score = 0;
let currentItem = null;

const countryDisplay = document.getElementById('country-display');
const optionsGrid = document.getElementById('options-grid');
const scoreEl = document.getElementById('score');

function nextQuestion() {
    currentItem = DATA[Math.floor(Math.random() * DATA.length)];
    countryDisplay.innerText = currentItem.c;

    // Generate options
    let options = [currentItem.cap];
    while (options.length < 4) {
        let rand = DATA[Math.floor(Math.random() * DATA.length)].cap;
        if (!options.includes(rand)) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);

    optionsGrid.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-secondary';
        btn.style.height = '45px';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt);
        optionsGrid.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === currentItem.cap) {
        score += 50;
        scoreEl.innerText = score;
        nextQuestion();
    } else {
        alert(`Incorrect. The capital of ${currentItem.c} is ${currentItem.cap}.`);
        score = Math.max(0, score - 20);
        scoreEl.innerText = score;
        nextQuestion();
    }
}

nextQuestion();
