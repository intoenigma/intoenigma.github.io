document.getElementById('calculate-btn').addEventListener('click', () => {
    const P = parseFloat(document.getElementById('principal').value);
    const R = parseFloat(document.getElementById('rate').value);
    const T_months = parseFloat(document.getElementById('months').value);

    if (!P || !R || !T_months) {
        alert("Please enter valid positive numbers.");
        return;
    }

    // A = P * (1 + r/n)^(nt)
    // Assume compounded quarterly (n=4) standard for many banks
    const t_years = T_months / 12;
    const n = 4; // Quarterly
    const amount = P * Math.pow((1 + (R / 100) / n), n * t_years);
    const interest = amount - P;

    document.getElementById('result-section').classList.remove('hidden');

    animateValue(document.getElementById('maturity-val'), 0, amount, 1000, '$');
    animateValue(document.getElementById('interest-val'), 0, interest, 1000, '$');
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
