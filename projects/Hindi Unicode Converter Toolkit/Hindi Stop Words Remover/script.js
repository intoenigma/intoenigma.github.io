const STOP_WORDS = new Set([
    'का','के','की','में','से','है','हैं','को','पर','यह','वह','एक','और','जो',
    'कि','एवं','तथा','व','ने','या','भी','हो','था','थी','थे','हुए','हुई','हुआ',
    'किया','किए','किसी','किस','कोई','अगर','तो','लेकिन','परंतु','क्योंकि','जब',
    'तब','वहाँ','यहाँ','अब','फिर','जैसे','वैसे','लिए','रहा','रही','रहे','होना',
    'करना','जाना','देना','लेना','सकता','सकती','सकते','मैं','हम','तुम','आप',
    'वे','इस','उस','इन','उन','इसे','उसे','न','नहीं','मत','बहुत','कम','ज्यादा',
    'सब','सभी','प्रत्येक','हर','जितना','उतना','इतना','कितना','जितने','ही','भर',
    'साथ','बिना','करके','होकर','जाकर','होती','होता','होते','थीं','थीं','कर','कह',
    'बात','चाहिए','सकते','मिल','दे','ले','आ','जा','था','पर','अपने','अपनी','अपना',
]);

function removeStopWords() {
    const text  = document.getElementById('input-text').value;
    const words = text.split(/\s+/);
    let removed = 0;
    const filtered = words.filter(w => {
        const clean = w.replace(/[।?!,।॥]/g, '');
        if (STOP_WORDS.has(clean)) { removed++; return false; }
        return true;
    });

    document.getElementById('output-text').value = filtered.join(' ');
    document.getElementById('stat-strip').style.display = 'flex';
    document.getElementById('s-removed').textContent   = removed;
    document.getElementById('s-remaining').textContent = filtered.length;
}

function showStopWords() {
    const panel = document.getElementById('stopword-list');
    const visible = panel.style.display !== 'none';
    if (visible) { panel.style.display = 'none'; return; }
    const sorted = [...STOP_WORDS].sort();
    document.getElementById('sw-count').textContent = sorted.length;
    document.getElementById('sw-tags').innerHTML = sorted.map(w =>
        `<span class="tag">${w}</span>`).join('');
    panel.style.display = 'block';
}

function clearAll() {
    document.getElementById('input-text').value  = '';
    document.getElementById('output-text').value = '';
    document.getElementById('stat-strip').style.display = 'none';
    document.getElementById('stopword-list').style.display = 'none';
}

function copyOutput() {
    const out = document.getElementById('output-text').value;
    if (out) navigator.clipboard.writeText(out);
}
