document.getElementById('calculate-btn').addEventListener('click', () => {
    const rate = parseFloat(document.getElementById('rate').value);

    if (!rate || rate <= 0) {
        alert("Please enter a valid positive interest rate.");
        return;
    }

    const years = 72 / rate;

    document.getElementById('result-section').classList.remove('hidden');
    animateValue(document.getElementById('years'), 0, years, 1000, '');
});

function animateValue(obj, start, end, duration, prefix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = prefix + (progress * (end - start) + start).toFixed(1);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
