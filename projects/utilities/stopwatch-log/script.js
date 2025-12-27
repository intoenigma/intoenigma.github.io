const display = document.getElementById('display');
const startBtn = document.getElementById('start-btn');
const lapBtn = document.getElementById('lap-btn');
const resetBtn = document.getElementById('reset-btn');
const tbody = document.querySelector('#laps-table tbody');

let startTime = 0;
let elapsedTime = 0;
let timer = null;
let isRunning = false;
let laps = [];

function format(ms) {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const mms = ms % 1000;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}:${mms.toString().padStart(3,'0')}`;
}

function update() {
    const now = Date.now();
    const diff = now - startTime + elapsedTime;
    display.textContent = format(diff);
}

startBtn.addEventListener('click', () => {
    if(isRunning) {
        // Pause
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
        startBtn.textContent = 'Start';
        startBtn.classList.remove('secondary');
    } else {
        // Start
        startTime = Date.now();
        timer = setInterval(update, 10);
        isRunning = true;
        startBtn.textContent = 'Pause';
        startBtn.classList.add('secondary');
    }
});

lapBtn.addEventListener('click', () => {
    if(!isRunning) return;
    const now = Date.now();
    const currentTotal = now - startTime + elapsedTime;
    
    const lastLapTotal = laps.length > 0 ? laps[laps.length-1].total : 0;
    const split = currentTotal - lastLapTotal;
    
    laps.push({ total: currentTotal, split });
    
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${laps.length}</td><td>${format(currentTotal)}</td><td>+${format(split)}</td>`;
    tbody.prepend(tr);
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    laps = [];
    display.textContent = '00:00:000';
    tbody.innerHTML = '';
    startBtn.textContent = 'Start';
    startBtn.classList.remove('secondary');
});
