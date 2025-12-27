const preview = document.getElementById('preview');
const textIn = document.getElementById('text-in');
const colorIn = document.getElementById('color-in');
const sizeIn = document.getElementById('size-in');

function update() {
    preview.innerText = textIn.value;
    const col = colorIn.value;
    const size = sizeIn.value;

    preview.style.color = '#fff';
    // Multi-layer shadow for smooth neon
    preview.style.textShadow = `
        0 0 ${size}px ${col},
        0 0 ${size * 2}px ${col},
        0 0 ${size * 4}px ${col},
        0 0 ${size * 8}px ${col}
    `;
}

[textIn, colorIn, sizeIn].forEach(el => el.addEventListener('input', update));
update();
