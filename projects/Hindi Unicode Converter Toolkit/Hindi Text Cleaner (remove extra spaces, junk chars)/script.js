const LATIN_TO_DEVA = {'0':'०','1':'१','2':'२','3':'३','4':'४','5':'५','6':'६','7':'७','8':'८','9':'९'};

function cleanText() {
    let text = document.getElementById('input-text').value;
    const before = text.length;

    if (document.getElementById('opt-spaces').checked) {
        text = text.replace(/[ \t]+/g, ' ');           // collapse spaces
        text = text.replace(/^ +| +$/gm, '');          // trim line ends
    }
    if (document.getElementById('opt-lines').checked) {
        text = text.replace(/\n{3,}/g, '\n\n');        // max double newline
    }
    if (document.getElementById('opt-danda').checked) {
        text = text.replace(/।।/g, '॥');              // double danda
        text = text.replace(/\.\./g, '.');             // double dots
    }
    if (document.getElementById('opt-digits').checked) {
        text = text.replace(/[0-9]/g, d => LATIN_TO_DEVA[d]);
    }
    if (document.getElementById('opt-quotes').checked) {
        text = text.replace(/"([^"]*)"/g, '\u201C$1\u201D');
        text = text.replace(/'([^']*)'/g, '\u2018$1\u2019');
    }
    if (document.getElementById('opt-junk').checked) {
        const whitelist = document.getElementById('whitelist').value;
        // Keep: Devanagari block (0900-097F), Latin alphabet, digits, whitespace, whitelisted
        const safe = new RegExp(
            `[^\\u0900-\\u097F\\u0030-\\u0039\\u0041-\\u007A\\s${whitelist.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g'
        );
        text = text.replace(safe, '');
    }

    const after = text.length;
    document.getElementById('output-text').value = text.trim();
    document.getElementById('stat-strip').style.display = 'flex';
    document.getElementById('s-before').textContent   = before;
    document.getElementById('s-after').textContent    = after;
    document.getElementById('s-removed').textContent  = before - after;
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
