let targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const msgEl = document.getElementById('message');
const input = document.getElementById('guess-input');
const resetBtn = document.getElementById('reset-btn');

document.getElementById('guess-btn').addEventListener('click', () => {
    const val = parseInt(input.value);
    if (isNaN(val)) return;

    attempts++;
    document.getElementById('attempts').textContent = attempts;

    if (val === targetNumber) {
        msgEl.textContent = 'ACCESS GRANTED. EXACT MATCH.';
        msgEl.style.color = '#00ff41';
        resetBtn.classList.remove('hidden');
    } else if (val < targetNumber) {
        msgEl.textContent = 'TOO LOW. INCREASE VALUE.';
        msgEl.style.color = '#fff';
    } else {
        msgEl.textContent = 'TOO HIGH. DECREASE VALUE.';
        msgEl.style.color = '#fff';
    }
    input.value = '';
    input.focus();
});

resetBtn.addEventListener('click', () => {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('attempts').textContent = '0';
    msgEl.textContent = 'Waiting for input...';
    msgEl.style.color = 'var(--primary)';
    resetBtn.classList.add('hidden');
});
