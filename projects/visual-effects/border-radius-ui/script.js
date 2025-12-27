const blob = document.getElementById('blob');
const xSlider = document.getElementById('x-slider');
const ySlider = document.getElementById('y-slider');
const out = document.getElementById('css-out');
const copy = document.getElementById('copy-btn');

function update() {
    const x = xSlider.value;
    const y = ySlider.value;
    
    // Creating a complex morph shape logic
    // We'll vary the 4 corners: TL TR BR BL / TL TR BR BL
    // Simplified logic for demo:
    const v1 = x;
    const v2 = 100 - x;
    const v3 = y;
    const v4 = 100 - y;
    
    const rad = `${v1}% ${v2}% ${v3}% ${v4}% / ${v4}% ${v1}% ${v2}% ${v3}%`;
    
    blob.style.borderRadius = rad;
    out.textContent = `border-radius: ${rad};`;
}

[xSlider, ySlider].forEach(s => s.addEventListener('input', update));

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(out.textContent);
    copy.textContent = 'Copied!';
    setTimeout(() => copy.textContent = 'Copy', 1000);
});

update();
