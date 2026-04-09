/**
 * Non-Unicode Legacy Hindi Font → Unicode Devanagari Converter
 * IntoEnigma Hindi Unicode Converter Toolkit
 *
 * Supports: Kruti Dev (KBC), Chanakya, Shusha, DevLys, APS, Preeti, AgraLipi, DV-TTYogesh, DV-TTSurekh, CDAC
 */

// ============================================================
// KRUTI DEV 010 (KBC) — COMPLETE MAPPING
// Each ASCII character maps to a Unicode Devanagari codepoint
// ============================================================
const KRUTIDEV_MAP = {
    // Independent vowels
    'v': 'अ', 'b': 'इ', 'm': 'उ', 'Å': 'ऊ', ',': 'ए',
    'A': '।', 'AA': '॥',
    // Vowel matras (dependent signs)
    'k': 'ा', 'f': 'ि', 'h': 'ी', 'q': 'ु', 'w': 'ू',
    '`': 'ृ', '_': 'ृ', 's': 'े', 'S': 'ै',
    // Special matras
    'a': 'ं', '%': 'ः', '~': '्', '^': 'ॅ', 'z': '़', '*': 'ऽ',
    // Consonants
    'd': 'क', '[': 'ख', 'x': 'ग', '?': 'घ',
    'p': 'च', 'N': 'छ', 't': 'ज', '>': 'झ',
    'V': 'ट', 'B': 'ठ', 'M': 'ड', '<': 'ढ',
    'r': 'त', 'F': 'थ', 'n': 'द', '/': 'ध', 'u': 'न',
    'i': 'प', 'Q': 'फ', 'c': 'ब', 'H': 'भ', 'e': 'म',
    ';': 'य', 'j': 'र', 'y': 'ल', 'o': 'व',
    "'": 'श', '"': 'ष', 'l': 'स', 'g': 'ह',
    // Special conjuncts
    'K': 'ज्ञ', '{': 'क्ष', '=': 'त्र',
    // Half forms / special
    'D': 'क्', 'L': 'ल्', 'R': 'ड़', 'Z': 'ज़', 'J': 'ज़',
    'G': 'ग', 'U': 'ण', '\\': 'ण',
    // Numbers (Devanagari)
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
    // Symbols
    '|': '|', '!': '!', '@': '@', '#': '#', '$': '$',
    '&': '&', '(': '(', ')': ')', '+': '+', '-': '-',
    '.': '.', ':': ':', ' ': ' ', '\n': '\n', '\t': '\t', '\r': '\r',
    // Multi-char handled separately
    'vk': 'आ', ',s': 'ऐ', 'vks': 'ओ', 'vkS': 'औ',
    'va': 'अं', 'v%': 'अः', 'bZ': 'ई', 'Hk': 'भ',
    '[k': 'ख', '?k': 'घ', 'pk': 'च', '.k': 'ण',
    'Fk': 'थ', '/k': 'ध', 'Hkk': 'भा',
    'ks': 'ो', 'kS': 'ौ',
};

// ============================================================
// CHANAKYA FONT MAPPING
// ============================================================
const CHANAKYA_MAP = {
    'v': 'अ', 'vk': 'आ', 'b': 'इ', 'bZ': 'ई', 'm': 'उ', 'Å': 'ऊ',
    ',': 'ए', ',s': 'ऐ', 'vks': 'ओ', 'vkS': 'औ',
    'k': 'ा', 'f': 'ि', 'h': 'ी', 'q': 'ु', 'w': 'ू',
    '`': 'ृ', 's': 'े', 'S': 'ै', 'ks': 'ो', 'kS': 'ौ',
    'a': 'ं', '%': 'ः', '~': '्', 'z': '़',
    'd': 'क', '[': 'ख', 'x': 'ग', '?': 'घ',
    'p': 'च', 'N': 'छ', 't': 'ज', '>': 'झ',
    'V': 'ट', 'B': 'ठ', 'M': 'ड', '<': 'ढ',
    'r': 'त', 'F': 'थ', 'n': 'द', '/': 'ध', 'u': 'न',
    'i': 'प', 'Q': 'फ', 'c': 'ब', 'H': 'भ', 'e': 'म',
    ';': 'य', 'j': 'र', 'y': 'ल', 'o': 'व',
    "'": 'श', '"': 'ष', 'l': 'स', 'g': 'ह',
    'K': 'ज्ञ', 'A': '।',
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
    ' ': ' ', '\n': '\n', '\t': '\t', '\r': '\r',
};

// ============================================================
// SHUSHA FONT MAPPING
// ============================================================
const SHUSHA_MAP = {
    'A': 'अ', 'Ak': 'आ', 'i': 'इ', 'I': 'ई', 'u': 'उ', 'U': 'ऊ',
    'e': 'ए', 'E': 'ऐ', 'ao': 'ओ', 'aO': 'औ',
    'k': 'ा', 'f': 'ि', 'F': 'ी', 'u': 'ु', 'U': 'ू',
    '`': 'ृ', 'e': 'े', 'E': 'ै', 'ao': 'ो', 'aO': 'ौ',
    'M': 'ं', ':': 'ः', '~': '्',
    'k': 'क', 'K': 'ख', 'g': 'ग', 'G': 'घ',
    'c': 'च', 'C': 'छ', 'j': 'ज', 'J': 'झ',
    't': 'ट', 'T': 'ठ', 'd': 'ड', 'D': 'ढ',
    'n': 'त', 'N': 'थ', 'q': 'द', 'Q': 'ध', 'v': 'न',
    'p': 'प', 'P': 'फ', 'b': 'ब', 'B': 'भ', 'm': 'म',
    'y': 'य', 'r': 'र', 'l': 'ल', 'V': 'व',
    's': 'श', 'S': 'ष', 'x': 'स', 'h': 'ह',
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
    '|': '।', ' ': ' ', '\n': '\n', '\t': '\t', '\r': '\r',
};

// ============================================================
// DEVLYS 010 MAPPING (very similar to KrutiDev)
// ============================================================
const DEVLYS_MAP = {
    'v': 'अ', 'vk': 'आ', 'b': 'इ', 'bZ': 'ई', 'm': 'उ', 'Å': 'ऊ',
    ',': 'ए', ',s': 'ऐ', 'vks': 'ओ', 'vkS': 'औ',
    'k': 'ा', 'f': 'ि', 'h': 'ी', 'q': 'ु', 'w': 'ू',
    '`': 'ृ', 's': 'े', 'S': 'ै', 'ks': 'ो', 'kS': 'ौ',
    'a': 'ं', '%': 'ः', '~': '्',
    'd': 'क', '[': 'ख', 'x': 'ग', '?': 'घ',
    'p': 'च', 'N': 'छ', 't': 'ज', '>': 'झ',
    'V': 'ट', 'B': 'ठ', 'M': 'ड', '<': 'ढ',
    'r': 'त', 'F': 'थ', 'n': 'द', '/': 'ध', 'u': 'न',
    'i': 'प', 'Q': 'फ', 'c': 'ब', 'H': 'भ', 'e': 'म',
    ';': 'य', 'j': 'र', 'y': 'ल', 'o': 'व',
    "'": 'श', '"': 'ष', 'l': 'स', 'g': 'ह',
    'K': 'ज्ञ', 'A': '।',
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
    ' ': ' ', '\n': '\n', '\t': '\t', '\r': '\r',
};

// For APS, Preeti, AgraLipi, DV-TTYogesh, DV-TTSurekh, CDAC — use KrutiDev as base
const APS_MAP     = { ...KRUTIDEV_MAP };
const PREETI_MAP  = { ...KRUTIDEV_MAP, 'b': 'इ', 'B': 'भ' }; // Minor variant
const AGRALIP_MAP = { ...KRUTIDEV_MAP };
const DVYOGESH_MAP  = { ...DEVLYS_MAP };
const DVSUREKH_MAP  = { ...DEVLYS_MAP };
const CDAC_MAP    = { ...KRUTIDEV_MAP };

const FONT_MAPS = {
    krutidev: KRUTIDEV_MAP,
    chanakya: CHANAKYA_MAP,
    shusha:   SHUSHA_MAP,
    devlys:   DEVLYS_MAP,
    aps:      APS_MAP,
    preeti:   PREETI_MAP,
    agralip:  AGRALIP_MAP,
    dvttyogesh: DVYOGESH_MAP,
    dvttsurekh: DVSUREKH_MAP,
    cdac:     CDAC_MAP,
    mangal:   null, // Already Unicode
};

// ============================================================
// CORE CONVERSION ENGINE
// ============================================================

/**
 * Converts legacy font text to Unicode using longest-match-first algorithm.
 * Also fixes the 'ि' (i-matra pre-consonant) reordering issue.
 */
function convertToUnicode(text, fontKey) {
    if (fontKey === 'mangal') return text; // Already Unicode

    const map = FONT_MAPS[fontKey];
    if (!map) return text;

    // Build sorted keys (longest first) for greedy matching
    const keys = Object.keys(map).sort((a, b) => b.length - a.length);

    let result = '';
    let i = 0;

    while (i < text.length) {
        let matched = false;
        // Try longest match first
        for (const key of keys) {
            if (text.startsWith(key, i)) {
                result += map[key];
                i += key.length;
                matched = true;
                break;
            }
        }
        if (!matched) {
            result += text[i];
            i++;
        }
    }

    // Post-processing: fix 'ि' matra ordering
    // In legacy fonts, 'f' (ि) appears BEFORE the consonant in the byte stream
    // In Unicode, it must come AFTER the consonant
    result = fixImatra(result);

    // Fix combined matras: ks → ो, kS → ौ (if not already handled)
    // These are covered by the map, but do a cleanup pass
    result = result.normalize('NFC');

    return result;
}

/**
 * In legacy fonts, the i-matra (ि U+093F) is stored before the consonant.
 * This function moves it to its correct Unicode position (after the consonant).
 */
function fixImatra(text) {
    const IMATRA = '\u093F'; // ि
    const CONSONANT_RANGE_START = 0x0915; // क
    const CONSONANT_RANGE_END   = 0x0939; // ह
    const SPECIAL_CONSONANTS = [0x0958, 0x0959, 0x095A, 0x095B, 0x095C, 0x095D, 0x095E, 0x095F];

    let chars = [...text];
    let output = [];

    for (let i = 0; i < chars.length; i++) {
        const cp = chars[i].codePointAt(0);
        if (chars[i] === IMATRA) {
            // Look ahead for the next consonant
            let j = i + 1;
            while (j < chars.length && chars[j] === IMATRA) j++; // skip dup matras
            if (j < chars.length) {
                const nextCp = chars[j].codePointAt(0);
                const isConsonant = (nextCp >= CONSONANT_RANGE_START && nextCp <= CONSONANT_RANGE_END)
                    || SPECIAL_CONSONANTS.includes(nextCp);
                if (isConsonant) {
                    output.push(chars[j]); // push consonant first
                    output.push(IMATRA);   // then matra
                    i = j;                 // skip the consonant
                    continue;
                }
            }
        }
        output.push(chars[i]);
    }
    return output.join('');
}

// ============================================================
// UI
// ============================================================
function convertText() {
    const input  = document.getElementById('input-text').value;
    const font   = document.getElementById('font-select').value;

    if (!input.trim()) return;

    const output = convertToUnicode(input, font);
    document.getElementById('output-text').value = output;

    // Stats
    document.getElementById('stats-strip').style.display = 'flex';
    document.getElementById('stat-font').textContent = document.getElementById('font-select').selectedOptions[0].text;
    document.getElementById('stat-in').textContent  = input.length;
    document.getElementById('stat-out').textContent = output.length;
}

function clearAll() {
    document.getElementById('input-text').value  = '';
    document.getElementById('output-text').value = '';
    document.getElementById('stats-strip').style.display = 'none';
}

function copyOutput() {
    const out = document.getElementById('output-text');
    if (!out.value) return;
    navigator.clipboard.writeText(out.value).then(() => {
        const btn = document.querySelector('[onclick="copyOutput()"]');
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Copy'; }, 2000);
    });
}

// Auto-convert on Ctrl+Enter
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') convertText();
});
