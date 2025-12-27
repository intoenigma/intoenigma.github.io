const coin = document.getElementById('coin');
const btn = document.getElementById('flip-btn');
const result = document.getElementById('result');

btn.addEventListener('click', () => {
    // Disable button during spin
    btn.disabled = true;
    btn.style.opacity = 0.5;
    result.textContent = "Calculating probability...";
    
    // Random spin: roughly 3 to 10 full rotations approx
    // 0 is Heads, 1 is Tails
    const outcome = Math.random() < 0.5 ? 0 : 1; 
    
    // We need to rotate X. 
    // HEADS = 0deg, 360deg, 720deg... (Even * 180)
    // TAILS = 180deg, 540deg... (Odd * 180)
    
    // Let's add extra rotations for effect (e.g. 5 full spins = 1800deg)
    const spins = 5; 
    const degrees = (spins * 360) + (outcome * 180);
    
    coin.style.transform = `rotateX(${degrees}deg)`;
    
    setTimeout(() => {
        result.textContent = outcome === 0 ? "HEADS DETECTED" : "TAILS DETECTED";
        result.style.color = outcome === 0 ? "var(--primary)" : "var(--secondary)";
        btn.disabled = false;
        btn.style.opacity = 1;
    }, 3000);
});
