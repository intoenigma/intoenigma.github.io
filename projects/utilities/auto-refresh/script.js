let timer;
let timeLeft;
const secondsInput = document.getElementById('seconds');
const display = document.getElementById('countdown');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

startBtn.addEventListener('click', () => {
    timeLeft = parseInt(secondsInput.value);
    if (isNaN(timeLeft) || timeLeft < 1) return;

    startBtn.disabled = true;
    stopBtn.disabled = false;
    secondsInput.disabled = true;

    display.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        display.textContent = timeLeft;
        if (timeLeft <= 0) {
            location.reload();
        }
    }, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(timer);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    secondsInput.disabled = false;
    display.textContent = '--';
});
