document.getElementById('calculate-btn').addEventListener('click', () => {
    const heightCm = parseFloat(document.getElementById('height').value);
    const weightKg = parseFloat(document.getElementById('weight').value);
    const resultSection = document.getElementById('result-section');
    const bmiValueEl = document.getElementById('bmi-value');
    const categoryText = document.getElementById('category-text');
    const gaugeBar = document.getElementById('gauge-bar');

    if (!heightCm || !weightKg) {
        alert("Please enter valid parameters.");
        return;
    }

    // BMI = kg / m^2
    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);

    resultSection.classList.remove('hidden');
    animateValue(bmiValueEl, 0, parseFloat(bmi), 800);

    let category = '';
    let color = '';
    let widthPercent = 0;

    if (bmi < 18.5) {
        category = 'Underweight';
        color = '#00f3ff'; // Cyan
        widthPercent = 25;
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal Weight';
        color = '#00ff41'; // Green
        widthPercent = 50;
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        color = '#ffe600'; // Yellow
        widthPercent = 75;
    } else {
        category = 'Obese';
        color = '#ff0055'; // Red
        widthPercent = 100;
    }

    categoryText.textContent = category;
    categoryText.style.color = color;

    // Animate Gauge
    setTimeout(() => {
        gaugeBar.style.width = widthPercent + '%';
        gaugeBar.style.backgroundColor = color;
    }, 100);
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = (progress * (end - start) + start).toFixed(1);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
