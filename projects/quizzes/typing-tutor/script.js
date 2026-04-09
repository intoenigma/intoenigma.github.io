const QUOTES = [
    "The quantum processor initialized the secondary neural link for data synchronization.",
    "Efficient algorithms are the foundation of high-performance computing systems.",
    "Data encryption remains the primary defense against unauthorized access attempts.",
    "Virtual machine isolation prevents cross-process interference in shared environments.",
    "Microservice architecture enables rapid deployment and scaling of complex applications."
];

let timer = 30;
let interval = null;
let isRunning = false;
let currentQuote = "";
let mistakes = 0;

const quoteDisplay = document.getElementById('quote-display');
const typingArea = document.getElementById('typing-area');
const wpmEl = document.getElementById('wpm');
const accEl = document.getElementById('acc');
const timerEl = document.getElementById('timer');

function resetTest() {
    clearInterval(interval);
    timer = 30;
    mistakes = 0;
    isRunning = false;
    typingArea.value = "";
    typingArea.disabled = false;
    timerEl.innerText = timer;
    wpmEl.innerText = 0;
    accEl.innerText = 100;
    
    currentQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    renderQuote();
}

function renderQuote() {
    quoteDisplay.innerHTML = "";
    currentQuote.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        quoteDisplay.appendChild(span);
    });
}

function startTimer() {
    isRunning = true;
    interval = setInterval(() => {
        timer--;
        timerEl.innerText = timer;
        if (timer <= 0) {
            finishTest();
        }
    }, 1000);
}

function finishTest() {
    clearInterval(interval);
    typingArea.disabled = true;
    const words = typingArea.value.trim().split(/\s+/).length;
    const wpm = Math.round((words / 0.5)); // Since it's 30s test (0.5 min)
    wpmEl.innerText = wpm;
}

typingArea.addEventListener('input', () => {
    if (!isRunning) startTimer();

    const quoteChars = quoteDisplay.querySelectorAll('span');
    const inputChars = typingArea.value.split('');
    
    mistakes = 0;

    quoteChars.forEach((span, index) => {
        const char = inputChars[index];
        if (char == null) {
            span.className = "";
        } else if (char === span.innerText) {
            span.className = "correct";
        } else {
            span.className = "incorrect";
            mistakes++;
        }
    });

    // Accuracy
    if (inputChars.length > 0) {
        const acc = Math.round(((inputChars.length - mistakes) / inputChars.length) * 100);
        accEl.innerText = Math.max(0, acc);
    }
    
    if (inputChars.length === currentQuote.length) {
        finishTest();
    }
});

resetTest();
