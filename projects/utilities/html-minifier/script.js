const input = document.getElementById('input');
const output = document.getElementById('output');
const btn = document.getElementById('minify-btn');
const stats = document.getElementById('stats');
const copy = document.getElementById('copy-btn');

btn.addEventListener('click', () => {
    const raw = input.value;
    if(!raw) return;

    // Simple Regex Minification
    // Remove comments
    let min = raw.replace(/<!--[\s\S]*?-->/g, "");
    // Remove new lines and tabs
    min = min.replace(/\n/g, "");
    min = min.replace(/\t/g, "");
    // Remove multiple spaces
    min = min.replace(/\s{2,}/g, " ");
    // Remove spaces between tags
    min = min.replace(/>\s+</g, "><");
    
    output.value = min;
    
    // Stats
    const orig = raw.length;
    const final = min.length;
    const saving = ((orig - final) / orig * 100).toFixed(2);
    
    stats.textContent = `Original: ${orig}b | Minified: ${final}b | Saved: ${saving}%`;
});

copy.addEventListener('click', () => {
    output.select();
    document.execCommand('copy');
    alert('Copied');
});
