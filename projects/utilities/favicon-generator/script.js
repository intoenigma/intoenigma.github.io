const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const textIn = document.getElementById('text');
const bgIn = document.getElementById('bg-color');
const colorIn = document.getElementById('text-color');
const btn = document.getElementById('download-btn');

function draw() {
    // Fill BG
    ctx.fillStyle = bgIn.value;
    ctx.fillRect(0, 0, 64, 64);

    // Text
    ctx.fillStyle = colorIn.value;
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(textIn.value, 32, 34);
}

textIn.addEventListener('input', draw);
bgIn.addEventListener('input', draw);
colorIn.addEventListener('input', draw);

btn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'favicon.png'; // Only saving as PNG for simplicity in vanilla JS without ICO encoder lib
    link.href = canvas.toDataURL();
    link.click();
});

draw();
