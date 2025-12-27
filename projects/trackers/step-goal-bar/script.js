const fill = document.getElementById('fill');
const slider = document.getElementById('slider');

slider.addEventListener('input', () => {
    fill.style.width = slider.value + '%';
});
// Init
fill.style.width = '0%';
setTimeout(() => fill.style.width = '75%', 500); // Demo start
