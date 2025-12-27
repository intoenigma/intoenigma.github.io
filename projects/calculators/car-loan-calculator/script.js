document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');

    calculateBtn.addEventListener('click', () => {
        const amount = parseFloat(document.getElementById('amount').value);
        const rate = parseFloat(document.getElementById('rate').value);
        const years = parseFloat(document.getElementById('years').value);

        if (!amount || !rate || !years) {
            alert('Please fill in all fields correctly.');
            return;
        }

        const principal = amount;
        const interest = rate / 100 / 12;
        const payments = years * 12;

        const x = Math.pow(1 + interest, payments);
        const monthly = (principal * x * interest) / (x - 1);

        if (isFinite(monthly)) {
            const totalPayment = (monthly * payments).toFixed(2);
            const totalInterest = ((monthly * payments) - principal).toFixed(2);
            const monthlyPayment = monthly.toFixed(2);

            document.getElementById('result-section').classList.remove('hidden');

            animateValue(document.getElementById('monthly-emi'), 0, parseFloat(monthlyPayment), 1000, '$');
            animateValue(document.getElementById('total-interest'), 0, parseFloat(totalInterest), 1000, '$');
            animateValue(document.getElementById('total-payment'), 0, parseFloat(totalPayment), 1000, '$');
        } else {
            alert('Please check your numbers');
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
});
