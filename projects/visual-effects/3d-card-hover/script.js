const card = document.getElementById('card');
const shine = document.querySelector('.shine');

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate Rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg
    const rotateY = ((x - centerX) / centerX) * 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Shine effect
    shine.style.opacity = '1';
    shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, transparent 60%)`;
});

card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
    shine.style.opacity = '0';
});
