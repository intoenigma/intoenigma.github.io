document.getElementById('calculate-btn').addEventListener('click', () => {
    const salary = parseFloat(document.getElementById('salary').value);
    const years = parseFloat(document.getElementById('years').value);

    // Formula: (15 * last_drawn_salary * tenure) / 26
    if (!salary || !years) return;

    const gratuity = (15 * salary * years) / 26;

    document.getElementById('result-section').classList.remove('hidden');
    animateValue(document.getElementById('gratuity-val'), 0, gratuity, 1000, '$');
});

function animateValue(obj, start, end, duration, prefix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = prefix + (progress * (end - start) + start).toFixed(2);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
