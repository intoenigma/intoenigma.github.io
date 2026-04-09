function updateFontSize(v) {
    document.getElementById('fs-val').textContent = v + 'px';
    document.getElementById('output-text').style.fontSize = v + 'px';
}

function formatText() {
    let text = document.getElementById('input-text').value;
    const doIndent  = document.getElementById('opt-indent').checked;
    const doDanda   = document.getElementById('opt-danda').checked;
    const doCommas  = document.getElementById('opt-commas').checked;
    const indStyle  = document.getElementById('indent-style').value;

    const INDENT_MAP = { tab: '\t', '2space': '  ', '4space': '    ', emspace: '\u2003' };
    const indent = INDENT_MAP[indStyle] || '    ';

    // Normalize whitespace
    text = text.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();

    // Danda spacing: ensure space after ।
    if (doDanda) {
        text = text.replace(/।\s*/g, '। ').replace(/।  +/g, '। ');
        text = text.replace(/\?\s*/g, '? ').replace(/!\s*/g, '! ');
    }

    // Comma spacing
    if (doCommas) {
        text = text.replace(/,\s*/g, ', ').replace(/,  +/g, ', ');
    }

    // Paragraph indentation
    if (doIndent) {
        text = text.split('\n').map(line => {
            return line.trim() ? indent + line.trim() : '';
        }).join('\n');
    }

    document.getElementById('output-text').value = text;
}

function clearAll() {
    document.getElementById('input-text').value  = '';
    document.getElementById('output-text').value = '';
}

function copyOutput() {
    const out = document.getElementById('output-text').value;
    if (out) navigator.clipboard.writeText(out);
}
