const words = ['ALGORITHM', 'ENCRYPTION', 'PROTOCOL', 'SYSTEM', 'INTERFACE', 'DATABASE', 'FIREWALL', 'BINARY', 'QUANTUM', 'NEURAL'];
let selectedWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
const MAX_WRONG = 6;

const wordDisplay = document.getElementById('word-display');
const keyboard = document.getElementById('keyboard');
const statusMsg = document.getElementById('status-msg');
const svg = document.getElementById('hangman-svg');

function init() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    statusMsg.textContent = '';
    statusMsg.style.color = '#aaa';
    
    // Reset SVG parts (remove them if they exist)
    const existingParts = svg.querySelectorAll('.body-part');
    existingParts.forEach(p => p.remove());

    renderWord();
    renderKeyboard();
}

function renderWord() {
    wordDisplay.innerHTML = selectedWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join('');
        
    if (!wordDisplay.textContent.includes('_')) {
        endGame(true);
    }
}

function renderKeyboard() {
    keyboard.innerHTML = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    alphabet.split('').forEach(letter => {
        const btn = document.createElement('button');
        btn.textContent = letter;
        btn.classList.add('key');
        if (guessedLetters.includes(letter)) {
            btn.classList.add('used');
            if(!selectedWord.includes(letter)) btn.classList.add('wrong');
        }
        btn.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(btn);
    });
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter) || wrongGuesses >= MAX_WRONG) return;
    
    guessedLetters.push(letter);
    
    if (!selectedWord.includes(letter)) {
        wrongGuesses++;
        drawPart(wrongGuesses);
    }
    
    renderWord();
    renderKeyboard();
    
    if (wrongGuesses >= MAX_WRONG) {
        endGame(false);
    }
}

function drawPart(num) {
    const parts = [
        '<circle cx="150" cy="80" r="20" class="body-part" />', // Head
        '<line x1="150" y1="100" x2="150" y2="170" class="body-part" />', // Body
        '<line x1="150" y1="120" x2="120" y2="150" class="body-part" />', // Left Arm
        '<line x1="150" y1="120" x2="180" y2="150" class="body-part" />', // Right Arm
        '<line x1="150" y1="170" x2="120" y2="210" class="body-part" />', // Left Leg
        '<line x1="150" y1="170" x2="180" y2="210" class="body-part" />'  // Right Leg
    ];
    if(num <= parts.length) {
        svg.innerHTML += parts[num-1];
    }
}

function endGame(win) {
    if (win) {
        statusMsg.textContent = 'ACCESS GRANTED. SYSTEM DECRYPTED.';
        statusMsg.style.color = '#00ff41';
    } else {
        statusMsg.textContent = `ACCESS DENIED. WORD WAS: ${selectedWord}`;
        statusMsg.style.color = '#ff0055';
        wordDisplay.textContent = selectedWord; // Reveal
    }
}

document.getElementById('reset-btn').addEventListener('click', init);

init();
