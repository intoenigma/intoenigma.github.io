function findText() {
    const text    = document.getElementById('input-text').value;
    const find    = document.getElementById('find-text').value;
    const useRx   = document.getElementById('use-regex').checked;
    const caseSen = document.getElementById('case-sensitive').checked;
    if (!find) return;
    const flags   = caseSen ? 'g' : 'gi';
    try {
        const rx      = useRx ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
        const matches = text.match(rx);
        document.getElementById('match-count').textContent = matches ? `${matches.length} मिले (found)` : '0 मिले';
    } catch(e) { document.getElementById('match-count').textContent = 'Invalid RegEx'; }
}

function replaceAll() {
    const text    = document.getElementById('input-text').value;
    const find    = document.getElementById('find-text').value;
    const replace = document.getElementById('replace-text').value;
    const useRx   = document.getElementById('use-regex').checked;
    const caseSen = document.getElementById('case-sensitive').checked;
    if (!find) return;
    const flags   = caseSen ? 'g' : 'gi';
    try {
        const rx   = useRx ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
        const out  = text.replace(rx, replace);
        const n    = (text.match(rx) || []).length;
        document.getElementById('output-text').value  = out;
        document.getElementById('match-count').textContent = `${n} बदले गए`;
    } catch(e) { document.getElementById('match-count').textContent = 'Invalid RegEx'; }
}

function clearAll() {
    ['input-text','output-text','find-text','replace-text'].forEach(id => { document.getElementById(id).value = ''; });
    document.getElementById('match-count').textContent = '';
}

function copyOutput() {
    const out = document.getElementById('output-text').value;
    if (out) navigator.clipboard.writeText(out);
}
