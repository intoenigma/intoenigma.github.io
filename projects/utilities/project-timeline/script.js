// Basic visual interaction script
const items = document.querySelectorAll('.timeline-item');
items.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const circle = item.querySelector('.circle');
        if (!circle.classList.contains('done') && !circle.classList.contains('active')) {
            circle.style.borderColor = '#fff';
        }
    });
    item.addEventListener('mouseleave', () => {
        const circle = item.querySelector('.circle');
        if (!circle.classList.contains('done') && !circle.classList.contains('active')) {
            circle.style.borderColor = '#333';
        }
    });
});
