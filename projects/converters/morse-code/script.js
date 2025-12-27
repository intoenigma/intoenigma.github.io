const morseMap = {
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
const playBtn = document.getElementById('play-btn');

textInput.addEventListener('input', () => {
    const text = textInput.value.toUpperCase();
    const morse = text.split('').map(char => {
        return morseMap[char] ? morseMap[char] : char;
    }).join(' ');
    morseOutput.value = morse;
});

// Simple Audio Context Oscillator for Beeps
playBtn.addEventListener('click', async () => {
    const text = morseOutput.value;
    if (!text) return;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const dotLen = 0.08;
    let t = ctx.currentTime;

    for (let char of text) {
        if (char === '.') {
            playTone(ctx, t, dotLen);
            t += dotLen * 2;
        } else if (char === '-') {
            playTone(ctx, t, dotLen * 3);
            t += dotLen * 4;
        } else if (char === '/') {
            t += dotLen * 4;
        } else {
            t += dotLen * 2;
        }
    }
});

function playTone(ctx, start, duration) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 600;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration);
}
