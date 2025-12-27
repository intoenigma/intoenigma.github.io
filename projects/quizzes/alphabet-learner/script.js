const alphabet = [
    { L: 'A', W: 'Apple' }, { L: 'B', W: 'Ball' }, { L: 'C', W: 'Cat' }, { L: 'D', W: 'Dog' },
    { L: 'E', W: 'Elephant' }, { L: 'F', W: 'Fish' }, { L: 'G', W: 'Goat' }, { L: 'H', W: 'Hat' },
    { L: 'I', W: 'Igloo' }, { L: 'J', W: 'Jug' }, { L: 'K', W: 'Kite' }, { L: 'L', W: 'Lion' },
    { L: 'M', W: 'Monkey' }, { L: 'N', W: 'Nest' }, { L: 'O', W: 'Owl' }, { L: 'P', W: 'Pig' },
    { L: 'Q', W: 'Queen' }, { L: 'R', W: 'Rabbit' }, { L: 'S', W: 'Sun' }, { L: 'T', W: 'Tiger' },
    { L: 'U', W: 'Umbrella' }, { L: 'V', W: 'Van' }, { L: 'W', W: 'Watch' }, { L: 'X', W: 'Xylophone' },
    { L: 'Y', W: 'Yak' }, { L: 'Z', W: 'Zebra' }
];

let currentIndex = 0;

const letterDisplay = document.getElementById('letter-display');
const wordHint = document.getElementById('word-hint');
const grid = document.getElementById('alphabet-grid');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const speakBtn = document.getElementById('speak-btn');

function init() {
    alphabet.forEach((item, index) => {
        const tile = document.createElement('div');
        tile.className = 'letter-tile interactive';
        tile.innerText = item.L;
        tile.onclick = () => setLetter(index);
        grid.appendChild(tile);
    });
    updateDisplay();
}

function setLetter(index) {
    currentIndex = index;
    updateDisplay();
    speak();
}

function updateDisplay() {
    const item = alphabet[currentIndex];
    letterDisplay.innerText = item.L;
    wordHint.innerText = item.W;
    
    // Update active tile
    document.querySelectorAll('.letter-tile').forEach((tile, i) => {
        tile.classList.toggle('active', i === currentIndex);
    });
}

function speak() {
    const item = alphabet[currentIndex];
    const utterance = new SpeechSynthesisUtterance(`${item.L} for ${item.W}`);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
}

prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + alphabet.length) % alphabet.length;
    updateDisplay();
};

nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % alphabet.length;
    updateDisplay();
};

speakBtn.onclick = speak;

init();
