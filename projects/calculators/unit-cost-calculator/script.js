document.getElementById('calculate-btn').addEventListener('click', () => {
    const pA = parseFloat(document.getElementById('price-a').value);
    const qA = parseFloat(document.getElementById('qty-a').value);
    const pB = parseFloat(document.getElementById('price-b').value);
    const qB = parseFloat(document.getElementById('qty-b').value);

    if (!pA || !qA || !pB || !qB) return;

    const unitA = pA / qA;
    const unitB = pB / qB;

    document.getElementById('result-section').classList.remove('hidden');

    document.getElementById('unit-a').textContent = '$' + unitA.toFixed(3);
    document.getElementById('unit-b').textContent = '$' + unitB.toFixed(3);

    const cardA = document.getElementById('card-a');
    const cardB = document.getElementById('card-b');
    const verdict = document.getElementById('verdict');

    // Reset styles
    cardA.style.borderColor = 'rgba(255,255,255,0.1)';
    cardB.style.borderColor = 'rgba(255,255,255,0.1)';

    if (unitA < unitB) {
        cardA.style.borderColor = '#00ff41';
        cardA.style.boxShadow = '0 0 15px rgba(0,255,65,0.2)';
        verdict.textContent = "Item A is cheaper!";
        verdict.style.color = '#00ff41';
    } else if (unitB < unitA) {
        cardB.style.borderColor = '#00ff41';
        cardB.style.boxShadow = '0 0 15px rgba(0,255,65,0.2)';
        verdict.textContent = "Item B is cheaper!";
        verdict.style.color = '#00ff41';
    } else {
        verdict.textContent = "Both are equal value.";
        verdict.style.color = '#fff';
    }
});
