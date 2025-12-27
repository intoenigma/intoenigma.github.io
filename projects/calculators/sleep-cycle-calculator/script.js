document.getElementById('calculate-btn').addEventListener('click', () => {
    const wakeTimeInput = document.getElementById('wake-time').value;

    if (!wakeTimeInput) {
        alert("Please select a time.");
        return;
    }

    const [hours, minutes] = wakeTimeInput.split(':').map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(hours, minutes, 0);

    // Cycles: 90 mins. Subtract cycles + 15 min fall asleep time.
    // We want to calculate BACKWARDS from wake time.
    
    function getTimeMinusMinutes(date, mins) {
        const newDate = new Date(date.getTime() - mins * 60000);
        return newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // 6 cycles = 540 mins + 15 = 555
    // 5 cycles = 450 + 15 = 465
    // 4 cycles = 360 + 15 = 375
    // 3 cycles = 270 + 15 = 285

    const t1 = getTimeMinusMinutes(wakeDate, 555);
    const t2 = getTimeMinusMinutes(wakeDate, 465); // Best usually
    const t3 = getTimeMinusMinutes(wakeDate, 375);
    const t4 = getTimeMinusMinutes(wakeDate, 285);

    document.getElementById('result-section').classList.remove('hidden');
    document.getElementById('time-1').textContent = t1;
    document.getElementById('time-2').textContent = t2;
    document.getElementById('time-3').textContent = t3;
    document.getElementById('time-4').textContent = t4;

    // Highlight best option
    document.getElementById('time-2').style.color = '#00ff41';
});
