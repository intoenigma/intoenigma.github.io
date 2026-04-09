const ELEMENTS = [
    { n: 1, s: "H", name: "Hydrogen" }, { n: 2, s: "He", name: "Helium" },
    { n: 3, s: "Li", name: "Lithium" }, { n: 4, s: "Be", name: "Beryllium" },
    { n: 5, s: "B", name: "Boron" }, { n: 6, s: "C", name: "Carbon" },
    { n: 7, s: "N", name: "Nitrogen" }, { n: 8, s: "O", name: "Oxygen" },
    { n: 9, s: "F", name: "Fluorine" }, { n: 10, s: "Ne", name: "Neon" },
    { n: 11, s: "Na", name: "Sodium" }, { n: 12, s: "Mg", name: "Magnesium" },
    { n: 13, s: "Al", name: "Aluminum" }, { n: 14, s: "Si", name: "Silicon" },
    { n: 15, s: "P", name: "Phosphorus" }, { n: 16, s: "S", name: "Sulfur" },
    { n: 17, s: "Cl", name: "Chlorine" }, { n: 18, s: "Ar", name: "Argon" },
    { n: 19, s: "K", name: "Potassium" }, { n: 20, s: "Ca", name: "Calcium" }
];

let score = 0;
let currentElement = null;

const symbolDisplay = document.getElementById('symbol-display');
const numberDisplay = document.getElementById('number-display');
const optionsGrid = document.getElementById('options-grid');
const scoreEl = document.getElementById('score');

function nextQuestion() {
    currentElement = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
    symbolDisplay.innerText = currentElement.s;
    numberDisplay.innerText = `Atomic Number: ${currentElement.n}`;

    // Generate options
    let options = [currentElement.name];
    while (options.length < 4) {
        let rand = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)].name;
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
    if (selected === currentElement.name) {
        score += 10;
        scoreEl.innerText = score;
        nextQuestion();
    } else {
        alert(`Incorrect. That element was ${currentElement.name}.`);
        score = 0;
        scoreEl.innerText = score;
        nextQuestion();
    }
}

nextQuestion();
