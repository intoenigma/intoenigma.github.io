const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wIn = document.getElementById('w');
const hIn = document.getElementById('h');
const bgIn = document.getElementById('bg');
const txtColIn = document.getElementById('txt-col');
const txtIn = document.getElementById('txt');
const btn = document.getElementById('download-btn');

function draw() {
    const w = parseInt(wIn.value) || 400;
    const h = parseInt(hIn.value) || 300;

    canvas.width = w;
    canvas.height = h;

    // BG
    ctx.fillStyle = bgIn.value;
    ctx.fillRect(0, 0, w, h);

    // Text
    ctx.fillStyle = txtColIn.value;
    ctx.font = `bold ${Math.min(w, h) / 10}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const text = txtIn.value || `${w} x ${h}`;
    ctx.fillText(text, w / 2, h / 2);
}

[wIn, hIn, bgIn, txtColIn, txtIn].forEach(el => el.addEventListener('input', draw));

btn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'placeholder.png';
    link.href = canvas.toDataURL();
    link.click();
});

draw();
