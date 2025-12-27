const preview = document.getElementById('preview');
const codeOut = document.getElementById('code-out');

function setClip(val) {
    preview.style.clipPath = val;
    codeOut.textContent = `clip-path: ${val};`;
}

// Default
setClip('polygon(50% 0%, 0% 100%, 100% 100%)');

window.setClip = setClip;
