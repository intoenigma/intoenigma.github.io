document.getElementById('calculate-btn').addEventListener('click', () => {
    const income = parseFloat(document.getElementById('income').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;

    if (!income || !rate) return;

    const taxableIncome = Math.max(0, income - deductions);
    const taxAmount = (taxableIncome * rate) / 100;
    const netIncome = income - taxAmount;

    document.getElementById('result-section').classList.remove('hidden');
    animateValue(document.getElementById('taxable-income'), 0, taxableIncome, 1000, '$');
    animateValue(document.getElementById('tax-amount'), 0, taxAmount, 1000, '$');
    animateValue(document.getElementById('net-income'), 0, netIncome, 1000, '$');
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
