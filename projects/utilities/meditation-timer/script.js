const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
const timeDisplay = document.getElementById('time-text');
const btn = document.getElementById('toggle-btn');
let duration = 300;
let timeLeft = 300;
let timer = null;
let isRunning = false;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = 0;

function setTime(seconds) {
    if(isRunning) return;
    duration = seconds;
    timeLeft = seconds;
    updateDisplay();
    setProgress(0); // Full circle
}

function updateDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    timeDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function setProgress(percent) {
    // Percent done means offset increases
    const offset = circumference - percent / 100 * circumference; // actually logic is: offset 0 is full, offset C is empty?
    // Wait, dashoffset: 0 is full line. dashoffset = circumference is empty.
    // We count down, so start full (0) -> empty (C).
    // so percent should be 0 to 1
    const p = (duration - timeLeft) / duration; 
    const o = circumference * p;
    circle.style.strokeDashoffset = o;
}

window.setTime = setTime;

btn.addEventListener('click', () => {
    if(isRunning) {
        clearInterval(timer);
        isRunning = false;
        btn.textContent = "Resume Session";
    } else {
        isRunning = true;
        btn.textContent = "Pause Session";
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            setProgress();
            if(timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                btn.textContent = "Session Complete";
                // Optional: Play a bell sound
            }
        }, 1000);
    }
});

updateDisplay();
