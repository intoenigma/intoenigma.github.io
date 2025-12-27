const targetWords = ['CYBER', 'NEON', 'LASER', 'ROBOT', 'ALIEN', 'VIRUS', 'CODE', 'DATA', 'GAME', 'TECH', 'SPACE', 'FLASH', 'LIGHT'];
// Use 5 letter words primarily for standard grid, padding short ones or filtering
const validWords = targetWords.filter(w => w.length === 5);
const secret = validWords[Math.floor(Math.random() * validWords.length)];

const grid = document.getElementById('grid');
const keyboard = document.getElementById('keyboard');

let currentRow = 0;
let currentTile = 0;
let guess = [];
let isGameOver = false;

// Build Grid
for (let i = 0; i < 6; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 5; j++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('id', `row-${i}-tile-${j}`);
        row.appendChild(tile);
    }
    grid.appendChild(row);
}

// Build Keyboard
const keys = [
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM'
];

keys.forEach((rowKeys, i) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('key-row');

    if (i === 2) {
        const enter = createKey('ENTER', 'enter-key');
        enter.addEventListener('click', checkGuess);
        rowDiv.appendChild(enter);
    }

    rowKeys.split('').forEach(k => {
        const key = createKey(k);
        key.addEventListener('click', () => addLetter(k));
        rowDiv.appendChild(key);
    });

    if (i === 2) {
        const back = createKey('⌫', 'back-key');
        back.addEventListener('click', deleteLetter);
        rowDiv.appendChild(back);
    }

    keyboard.appendChild(rowDiv);
});

function createKey(char, extraClass) {
    const btn = document.createElement('div');
    btn.textContent = char;
    btn.classList.add('key');
    if (extraClass) btn.classList.add(extraClass);
    btn.setAttribute('data-key', char);
    return btn;
}

function addLetter(l) {
    if (currentTile < 5 && currentRow < 6 && !isGameOver) {
        const tile = document.getElementById(`row-${currentRow}-tile-${currentTile}`);
        tile.textContent = l;
        tile.setAttribute('data-state', 'active');
        guess.push(l);
        currentTile++;
    }
}

function deleteLetter() {
    if (currentTile > 0 && !isGameOver) {
        currentTile--;
        const tile = document.getElementById(`row-${currentRow}-tile-${currentTile}`);
        tile.textContent = '';
        tile.removeAttribute('data-state');
        guess.pop();
    }
}

function checkGuess() {
    if (currentTile !== 5 || isGameOver) return;

    const word = guess.join('');

    // Check colors
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`row-${currentRow}-tile-${i}`);
        const letter = guess[i];
        const key = document.querySelector(`.key[data-key='${letter}']`);

        setTimeout(() => {
            if (letter === secret[i]) {
                tile.setAttribute('data-state', 'correct');
                key.setAttribute('data-state', 'correct');
            } else if (secret.includes(letter)) {
                tile.setAttribute('data-state', 'present');
                if (key.getAttribute('data-state') !== 'correct') key.setAttribute('data-state', 'present');
            } else {
                tile.setAttribute('data-state', 'absent');
                key.setAttribute('data-state', 'absent');
            }
        }, i * 200);
    }

    setTimeout(() => {
        if (word === secret) {
            isGameOver = true;
            alert('SYSTEM UNLOCKED');
        } else {
            if (currentRow === 5) {
                isGameOver = true;
                alert('ACCESS DENIED. CODE: ' + secret);
            } else {
                currentRow++;
                currentTile = 0;
                guess = [];
            }
        }
    }, 1200);
}

document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    if (key.length === 1 && key >= 'A' && key <= 'Z') addLetter(key);
    else if (key === 'BACKSPACE') deleteLetter();
    else if (key === 'ENTER') checkGuess();
});
