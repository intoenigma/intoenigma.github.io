const display = document.getElementById('word-display');
const input = document.getElementById('text-input');
const wpmIn = document.getElementById('wpm');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');

let words = [];
let currentIndex = 0;
let timer = null;
let isPlaying = false;

function start() {
    if(isPlaying) return;
    
    if(words.length === 0 || currentIndex >= words.length) {
        // Init words
        const text = input.value.trim();
        if(!text) return alert("Enter text first");
        words = text.split(/\s+/);
        currentIndex = 0;
    }
    
    isPlaying = true;
    startBtn.disabled = true;
    
    const wpm = parseInt(wpmIn.value) || 300;
    const ms = 60000 / wpm;
    
    timer = setInterval(() => {
        if(currentIndex >= words.length) {
            reset();
            return;
        }
        display.textContent = words[currentIndex];
        
        // Highlight middle char logic (optional refinement)
        
        currentIndex++;
    }, ms);
}

function pause() {
    clearInterval(timer);
    if(isPlaying) {
        // Paused state
        isPlaying = false;
        startBtn.textContent = 'Resume';
        startBtn.disabled = false;
    } else {
        // Reset state
        reset();
    }
}

function reset() {
    clearInterval(timer);
    isPlaying = false;
    currentIndex = 0;
    words = [];
    display.textContent = 'Ready';
    startBtn.textContent = 'Start';
    startBtn.disabled = false;
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
