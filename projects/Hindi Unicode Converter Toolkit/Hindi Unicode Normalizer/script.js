function normalize() {
    let text = document.getElementById('input-text').value;
    const form      = document.getElementById('norm-form').value;
    const rmZW      = document.getElementById('fix-zero-width').checked;
    const rmDir     = document.getElementById('fix-dir').checked;
    const inLen     = [...text].length;

    // Remove zero-width chars: U+200B, U+200C, U+200D, U+FEFF
    if (rmZW)  text = text.replace(/[\u200B\u200C\u200D\uFEFF]/g, '');
    // Remove directional marks: U+200E, U+200F, U+202A-202E
    if (rmDir) text = text.replace(/[\u200E\u200F\u202A-\u202E]/g, '');

    const normalized = text.normalize(form);
    const outLen     = [...normalized].length;

    document.getElementById('output-text').value = normalized;
    document.getElementById('stat-strip').style.display = 'flex';
    document.getElementById('s-form').textContent = form;
    document.getElementById('s-in').textContent   = inLen;
    document.getElementById('s-out').textContent  = outLen;
    document.getElementById('s-diff').textContent = inLen - outLen;
}

function clearAll() {
    document.getElementById('input-text').value  = '';
    document.getElementById('output-text').value = '';
    document.getElementById('stat-strip').style.display = 'none';
}

function copyOutput() {
    const out = document.getElementById('output-text').value;
    if (out) navigator.clipboard.writeText(out);
}
