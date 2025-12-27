document.getElementById('calculate-btn').addEventListener('click', () => {
    const cost = parseFloat(document.getElementById('current-cost').value);
    const rate = parseFloat(document.getElementById('inflation-rate').value);
    const years = parseFloat(document.getElementById('years').value);

    if (!cost || !rate || !years) return;

    // Future Value = P * (1 + r/100)^n
    const futureValue = cost * Math.pow((1 + rate / 100), years);
    const increase = ((futureValue - cost) / cost) * 100;

    document.getElementById('result-section').classList.remove('hidden');
    
    animateValue(document.getElementById('future-value'), 0, futureValue, 1000, '$');
    animateValue(document.getElementById('change-percent'), 0, increase, 1000, '+', '%');
});

function animateValue(obj, start, end, duration, prefix = '', suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = prefix + (progress * (end - start) + start).toFixed(2) + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
