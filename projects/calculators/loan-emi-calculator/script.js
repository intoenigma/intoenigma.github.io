document.getElementById('calculate-btn').addEventListener('click', () => {
    const P = parseFloat(document.getElementById('principal').value);
    const R = parseFloat(document.getElementById('rate').value);
    const N = parseFloat(document.getElementById('months').value);

    if (!P || !R || !N) return;

    const r = R / 12 / 100; // Monthly interest

    // EMI = [P x r x (1+r)^N] / [(1+r)^N - 1]
    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    if (isFinite(emi)) {
        document.getElementById('result-section').classList.remove('hidden');
        animateValue(document.getElementById('emi'), 0, emi, 1000, '$');
        animateValue(document.getElementById('interest'), 0, totalInterest, 1000, '$');
        animateValue(document.getElementById('payable'), 0, totalPayment, 1000, '$');
    }
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
