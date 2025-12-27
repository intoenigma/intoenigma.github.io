// JavaScript not strictly needed for CSS animation but we can add interaction
const carousel = document.querySelector('.carousel');
let isPaused = false;

carousel.addEventListener('mouseenter', () => {
    carousel.style.animationPlayState = 'paused';
});

carousel.addEventListener('mouseleave', () => {
    carousel.style.animationPlayState = 'running';
});
