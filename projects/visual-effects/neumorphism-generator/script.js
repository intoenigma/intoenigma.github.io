const box = document.getElementById('box');
const sizeIn = document.getElementById('size');
const radIn = document.getElementById('rad');

function update() {
    const s = parseInt(sizeIn.value);
    const r = radIn.value;
    
    // Dark Neumorphism Formula
    // Light source top-left
    const shadowLight = `-${s}px -${s}px ${s*2}px #2e2e36`; // Lighter
    const shadowDark = `${s}px ${s}px ${s*2}px #080808`;   // Darker
    
    box.style.boxShadow = `${shadowDark}, ${shadowLight}`;
    box.style.borderRadius = `${r}%`;
}

[sizeIn, radIn].forEach(e => e.addEventListener('input', update));
update();
