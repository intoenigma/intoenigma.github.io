/**
 * Unicode Devanagari → Non-Unicode Legacy Hindi Font Converter
 * IntoEnigma Hindi Unicode Converter Toolkit
 *
 * Strategy: Build the reverse mapping from the Non-Unicode → Unicode map.
 * Unicode fonts (Mangal, Kokila, etc.) are pass-through — the text is already Unicode.
 */

// ============================================================
// REVERSE MAP: Unicode Devanagari → KrutiDev ASCII
// ============================================================
const UNICODE_TO_KRUTIDEV = {
    // Independent vowels
    'अ': 'v', 'आ': 'vk', 'इ': 'b', 'ई': 'bZ', 'उ': 'm', 'ऊ': 'Å',
    'ए': ',', 'ऐ': ',s', 'ओ': 'vks', 'औ': 'vkS', 'ऋ': '`',
    'अं': 'va', 'अः': 'v%',
    // Vowel matras
    'ा': 'k', 'ि': 'f', 'ी': 'h', 'ु': 'q', 'ू': 'w',
    'ृ': '`', 'े': 's', 'ै': 'S', 'ो': 'ks', 'ौ': 'kS',
    'ं': 'a', 'ः': '%',
    // Halant / virama
    '्': '~',
    // Nukta
    '़': 'z',
    // Consonants
    'क': 'd', 'ख': '[k', 'ग': 'x', 'घ': '?k',
    'च': 'p', 'छ': 'N', 'ज': 't', 'झ': '>k',
    'ट': 'V', 'ठ': 'B', 'ड': 'M', 'ढ': '<k',
    'त': 'r', 'थ': 'Fk', 'द': 'n', 'ध': '/k', 'न': 'u',
    'प': 'i', 'फ': 'Q', 'ब': 'c', 'भ': 'Hk', 'म': 'e',
    'य': ';', 'र': 'j', 'ल': 'y', 'व': 'o',
    'श': "'k", 'ष': '"k', 'स': 'l', 'ह': 'g',
    // Conjuncts
    'ज्ञ': 'K', 'क्ष': '{kk', 'त्र': '=',
    // Special consonants with nukta
    'ड़': 'M+', 'ढ़': '<+', 'ज़': 'T', 'फ़': 'Q+',
    // Anusvara, chandrabindu, etc.
    'ँ': 'W', 'ॅ': '^',
    // Chandrabindu ligature
    '।': 'A', '॥': 'AA',
    // Devanagari digits → ASCII digits
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
    // Pass-through
    ' ': ' ', '\n': '\n', '\t': '\t', '\r': '\r',
    '.': '.', ',': ',', '!': '!', '?': '?',
    '(': '(', ')': ')', '-': '-', ':': ':',
};

// ============================================================
// REVERSE MAP: Unicode → Chanakya
// ============================================================
const UNICODE_TO_CHANAKYA = { ...UNICODE_TO_KRUTIDEV }; // similar base

// ============================================================
// REVERSE MAP: Unicode → DevLys (similar to KrutiDev)
// ============================================================
const UNICODE_TO_DEVLYS = { ...UNICODE_TO_KRUTIDEV };

// ============================================================
// UNICODE FONTS — pass-through (already Unicode Devanagari)
// ============================================================
const UNICODE_PASSTHROUGH = null;

const FONT_MAPS = {
    krutidev:     UNICODE_TO_KRUTIDEV,
    chanakya:     UNICODE_TO_CHANAKYA,
    shusha:       UNICODE_TO_KRUTIDEV, // approximation
    devlys:       UNICODE_TO_DEVLYS,
    aps:          UNICODE_TO_KRUTIDEV,
    preeti:       UNICODE_TO_KRUTIDEV,
    agralip:      UNICODE_TO_KRUTIDEV,
    krishna:      UNICODE_TO_KRUTIDEV,
    nirmala_leg:  UNICODE_TO_KRUTIDEV,
    sanskrit2003: UNICODE_PASSTHROUGH,
    dvttyogesh:   UNICODE_TO_DEVLYS,
    dvttsurekh:   UNICODE_TO_DEVLYS,
    cdac:         UNICODE_TO_KRUTIDEV,
    // Unicode fonts — no conversion needed
    mangal:       UNICODE_PASSTHROUGH,
    arialunicode: UNICODE_PASSTHROUGH,
    kokila:       UNICODE_PASSTHROUGH,
    utsaah:       UNICODE_PASSTHROUGH,
    aparajita:    UNICODE_PASSTHROUGH,
    lohit:        UNICODE_PASSTHROUGH,
    samyak:       UNICODE_PASSTHROUGH,
};

// ============================================================
// CONVERSION ENGINE
// ============================================================

/**
 * Converts Unicode Devanagari to legacy font ASCII encoding.
 *
 * Key challenge: The 'ि' matra (i-matra) must be moved BEFORE the
 * consonant in the output (opposite of Unicode order).
 * Also, consonant + '्' + consonant → conjunct handling.
 */
function convertToLegacy(text, fontKey) {
    const map = FONT_MAPS[fontKey];
    if (map === null) return text; // Unicode passthrough

    // Normalize to NFC first
    text = text.normalize('NFC');

    // Build sorted keys by length (descending) for greedy matching
    const keys = Object.keys(map).sort((a, b) => b.length - a.length);

    let result = '';
    let i = 0;
    const chars = [...text]; // handle multi-byte chars properly

    while (i < chars.length) {
        let matched = false;
        const remaining = chars.slice(i).join('');

        for (const key of keys) {
            if (remaining.startsWith(key)) {
                const converted = map[key];
                // 'ि' (U+093F) needs pre-consonant placement
                if (key === 'ि') {
                    // Look ahead in the RESULT: the next consonant in Unicode input
                    // needs to be emitted first, then 'f'
                    // We handle this by inserting a placeholder and fixing after
                    result += '\x01'; // placeholder for ि
                } else {
                    result += converted ?? key;
                }
                i += [...key].length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            result += chars[i];
            i++;
        }
    }

    // Post-process: fix 'f' (ि) placement
    // The placeholder \x01 should appear AFTER the next consonant token
    result = fixImatraReverse(result);

    return result;
}

/**
 * Moves the i-matra placeholder (\x01) to BEFORE the next consonant
 * in the output stream (since legacy fonts render it before the consonant).
 */
function fixImatraReverse(text) {
    // Replace \x01CONSONANT with CONSONANT\x01 then replace \x01 with 'f'
    // We do a simple regex: find \x01 followed by any non-\x01 chars, swap
    let result = text.replace(/\x01([^f\x01\n ]+)/g, (match, consonant) => {
        return consonant + 'f';
    });
    // Any remaining stray placeholders
    result = result.replace(/\x01/g, 'f');
    return result;
}

// ============================================================
// UI
// ============================================================
function convertText() {
    const input  = document.getElementById('input-text').value;
    const font   = document.getElementById('font-select').value;

    if (!input.trim()) return;

    const output = convertToLegacy(input, font);
    document.getElementById('output-text').value = output;

    const selectedLabel = document.getElementById('font-select').selectedOptions[0].text;
    document.getElementById('stats-strip').style.display = 'flex';
    document.getElementById('stat-font').textContent = selectedLabel;
    document.getElementById('stat-in').textContent  = [...input].length;
    document.getElementById('stat-out').textContent = output.length;
}

function clearAll() {
    document.getElementById('input-text').value  = '';
    document.getElementById('output-text').value = '';
    document.getElementById('stats-strip').style.display = 'none';
}

function copyOutput() {
    const out = document.getElementById('output-text').value;
    if (!out) return;
    navigator.clipboard.writeText(out).then(() => {
        const btn = document.querySelector('[onclick="copyOutput()"]');
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Copy'; }, 2000);
    });
}

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') convertText();
});
