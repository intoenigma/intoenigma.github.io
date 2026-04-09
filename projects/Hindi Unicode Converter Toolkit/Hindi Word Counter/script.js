// Hindi Devanagari Unicode ranges
const VOWELS_STANDALONE = /[\u0904-\u0914\u0960\u0961]/g;
const VOWEL_MATRAS      = /[\u093A-\u094C\u094E\u094F]/g;
const CONSONANTS        = /[\u0915-\u0939\u0958-\u095F]/g;

function count() {
    const text = document.getElementById('input-text').value;

    // Words: split on whitespace
    const words = text.trim() === '' ? [] : text.trim().split(/\s+/).filter(w => w.length > 0);

    // Sentences: split on ।, ?, !, .
    const sentences = text.split(/[।?!.]+/).filter(s => s.trim().length > 0);

    // Paragraphs: split on double newline
    const paras = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);

    // Characters
    const chars    = [...text].length;
    const charsNS  = [...text.replace(/\s/g, '')].length;

    // Vowels (standalone + matras)
    const vowelsM = (text.match(VOWELS_STANDALONE) || []).length;
    const matras  = (text.match(VOWEL_MATRAS) || []).length;
    const totalVowels = vowelsM + matras;

    // Consonants
    const consCount = (text.match(CONSONANTS) || []).length;

    // Reading time (avg 150 words/min for Hindi)
    const secs = Math.round((words.length / 150) * 60);
    const timeStr = secs < 60
        ? `${secs} सेकंड`
        : `${Math.floor(secs / 60)} मिनट ${secs % 60} सेकंड`;

    document.getElementById('s-words').textContent    = words.length;
    document.getElementById('s-chars').textContent    = chars;
    document.getElementById('s-chars-ns').textContent = charsNS;
    document.getElementById('s-sents').textContent    = sentences.length;
    document.getElementById('s-paras').textContent    = paras.length;
    document.getElementById('s-time').textContent     = timeStr;
    document.getElementById('s-vowels').textContent   = totalVowels;
    document.getElementById('s-cons').textContent     = consCount;
}

function showFreq() {
    const text  = document.getElementById('input-text').value;
    const words = text.trim().split(/\s+/).filter(w => w.length > 1);
    const freq  = {};

    words.forEach(w => {
        const clean = w.replace(/[।?!,।॥]/g, '');
        if (clean) freq[clean] = (freq[clean] || 0) + 1;
    });

    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 20);
    const container = document.getElementById('freq-list');
    container.innerHTML = sorted.map(([w, n]) =>
        `<span class="tag">${w} <strong style="color:#e47911;">${n}</strong></span>`
    ).join('');

    document.getElementById('word-freq').style.display = 'block';
}

function clearAll() {
    document.getElementById('input-text').value = '';
    document.getElementById('word-freq').style.display = 'none';
    count();
}
