const priceEl = document.getElementById('current-price');
const changeEl = document.getElementById('change');
const bars = document.querySelectorAll('.bar');

let basePrice = 2024.50;

function simulate() {
    const volatility = (Math.random() - 0.45) * 5; // slight upward trend bias maybe?
    basePrice += volatility;

    priceEl.innerText = '$' + basePrice.toFixed(2);

    const pct = (volatility / basePrice) * 100;
    const sign = pct >= 0 ? '+' : '';
    changeEl.innerText = `${sign}${pct.toFixed(2)}%`;
    changeEl.className = `change ${pct >= 0 ? 'positive' : 'negative'}`;

    // Update chart bars randomly
    bars.forEach(bar => {
        if (!bar.classList.contains('active')) {
            // Shift bars left logic is hard without creating new elements, just randomize for visual "noise"
            bar.style.height = (30 + Math.random() * 50) + '%';
        } else {
            // Active bar reflects current relative price strength? 
            bar.style.height = (40 + Math.random() * 50) + '%';
        }
    });
}

setInterval(simulate, 2000);
