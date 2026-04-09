const MORSE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
};

const textInput = document.getElementById('text-input');
const morseOutput = document.getElementById('morse-output');
const tapBtn = document.getElementById('tap-btn');
const alphaGrid = document.getElementById('alpha-grid');

function init() {
    // Fill reference grid
    Object.keys(MORSE_MAP).forEach(char => {
        if (char === ' ') return;
        const tile = document.createElement('div');
        tile.className = 'morse-tile';
        tile.innerHTML = `<span class="letter">${char}</span><span class="code">${MORSE_MAP[char]}</span>`;
        alphaGrid.appendChild(tile);
    });

    textInput.addEventListener('input', () => {
        const text = textInput.value.toUpperCase();
        const encoded = text.split('').map(c => MORSE_MAP[c] || '').join(' ');
        morseOutput.innerText = encoded;
    });

    // Tapper logic
    let pressStartTime = 0;
    
    tapBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        pressStartTime = Date.now();
    });

    tapBtn.addEventListener('mouseup', (e) => {
        e.preventDefault();
        const duration = Date.now() - pressStartTime;
        const signal = duration > 250 ? '-' : '.';
        morseOutput.innerText += signal;
        
        // Audio feedback (optional but nice)
        playBeep(duration > 250 ? 0.3 : 0.1);
    });
}

function playBeep(dur) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);

    osc.start();
    osc.stop(audioCtx.currentTime + dur);
}

init();
