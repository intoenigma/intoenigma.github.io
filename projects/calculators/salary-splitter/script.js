document.getElementById('calculate-btn').addEventListener('click', () => {
    const income = parseFloat(document.getElementById('income').value);

    if (!income) return;

    const needs = income * 0.5;
    const wants = income * 0.3;
    const savings = income * 0.2;

    document.getElementById('result-section').classList.remove('hidden');
    animateValue(document.getElementById('needs'), 0, needs, 1000, '$');
    animateValue(document.getElementById('wants'), 0, wants, 1000, '$');
    animateValue(document.getElementById('savings'), 0, savings, 1000, '$');
});

function animateValue(obj, start, end, duration, prefix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = prefix + (progress * (end - start) + start).toFixed(0);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
