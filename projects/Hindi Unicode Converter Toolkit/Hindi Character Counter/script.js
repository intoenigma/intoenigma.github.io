let showCp = false;

function analyze() {
    const text = document.getElementById('input-text').value;
    const chars = [...text];

    let vowels = 0, cons = 0, matras = 0, anus = 0, halant = 0, digits = 0, other = 0;

    chars.forEach(c => {
        const cp = c.codePointAt(0);
        if (cp >= 0x0904 && cp <= 0x0914) vowels++;          // Independent vowels अ–औ
        else if (cp === 0x0960 || cp === 0x0961) vowels++;      // ॠ ॡ
        else if (cp >= 0x0915 && cp <= 0x0939) cons++;          // Consonants क–ह
        else if (cp >= 0x0958 && cp <= 0x095F) cons++;          // Nukta consonants
        else if (cp >= 0x093A && cp <= 0x094C) matras++;        // Vowel matras
        else if (cp === 0x094E || cp === 0x094F) matras++;      // Extended matras
        else if (cp === 0x0902 || cp === 0x0900 || cp === 0x0901) anus++; // Anusvara ं ँ ॅ
        else if (cp === 0x094D) halant++;                       // Halant ्
        else if (cp >= 0x0966 && cp <= 0x096F) digits++;        // Devanagari digits ०–९
        else if (cp === 0x0020 || cp === 0x000A || cp === 0x0009) {} // whitespace - don't count
        else other++;
    });

    const total   = chars.length;
    const noSpace = chars.filter(c => !/\s/.test(c)).length;

    document.getElementById('s-total').textContent   = total;
    document.getElementById('s-nospace').textContent = noSpace;
    document.getElementById('s-vowels').textContent  = vowels;
    document.getElementById('s-cons').textContent    = cons;
    document.getElementById('s-matras').textContent  = matras;
    document.getElementById('s-anus').textContent    = anus;
    document.getElementById('s-halant').textContent  = halant;
    document.getElementById('s-digits').textContent  = digits;
    document.getElementById('s-other').textContent   = other;

    if (showCp) renderCodepoints(chars);
}

function toggleCodepoints() {
    showCp = !showCp;
    const view = document.getElementById('codepoint-view');
    view.style.display = showCp ? 'block' : 'none';
    if (showCp) {
        const chars = [...document.getElementById('input-text').value];
        renderCodepoints(chars);
    }
}

function renderCodepoints(chars) {
    const list = document.getElementById('codepoint-list');
    list.innerHTML = chars.map(c => {
        const cp = c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
        return `<span title="U+${cp}" style="display:inline-block;background:#fff;border:1px solid #ddd;padding:2px 6px;margin:2px;border-radius:3px;">
            <strong style="font-size:14px;font-family:'Noto Sans Devanagari',serif;">${c === ' ' ? '·' : c}</strong>
            <small style="color:#888;display:block;text-align:center;">U+${cp}</small>
        </span>`;
    }).join('');
}

function clearAll() {
    document.getElementById('input-text').value = '';
    analyze();
}
