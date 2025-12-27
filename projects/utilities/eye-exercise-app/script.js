const ball = document.getElementById('ball');
const btn = document.getElementById('start-btn');
const text = document.getElementById('instruction');

btn.addEventListener('click', startSession);

function startSession() {
    btn.style.display = 'none';
    ball.style.display = 'block';
    text.style.display = 'block';

    // Pattern: Horizontal
    animateHorizontal();

    setTimeout(animateVertical, 10000);
    setTimeout(animateCircle, 20000);
    setTimeout(endSession, 30000);
}

function animateHorizontal() {
    text.textContent = 'Side to Side';
    ball.animate([
        { left: '10%' },
        { left: '90%' },
        { left: '10%' }
    ], {
        duration: 2000,
        iterations: 5
    });
}

function animateVertical() {
    text.textContent = 'Up and Down';
    ball.style.left = '50%';
    ball.animate([
        { top: '10%' },
        { top: '90%' },
        { top: '10%' }
    ], {
        duration: 2000,
        iterations: 5
    });
}

function animateCircle() {
    text.textContent = 'Follow Circle';
    // Complex CSS animation or JS loop usually, simplified here using Keyframes if possible, 
    // or just reset
    ball.style.top = '50%';
    ball.style.left = '50%';
    // Simple pulse instead for simplicity in this turn
    ball.animate([
        { transform: 'translate(-50%, -50%) scale(0.5)' },
        { transform: 'translate(-50%, -50%) scale(1.5)' }
    ], {
        duration: 1000,
        iterations: 10,
        direction: 'alternate'
    });
    text.textContent = 'Focus In and Out'; // Changed to focus
}

function endSession() {
    ball.style.display = 'none';
    text.style.display = 'none';
    btn.style.display = 'block';
    btn.textContent = 'Session Complete. Again?';
}
