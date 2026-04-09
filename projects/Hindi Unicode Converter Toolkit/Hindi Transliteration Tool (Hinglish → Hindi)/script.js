// Hinglish (Romanized Hindi) → Devanagari transliteration
// Ordered longest-match-first for greedy matching
const TRANSLIT_MAP = [
    // Consonant clusters
    ['ksh','क्ष'],['gny','ज्ञ'],['shr','श्र'],['str','स्त्र'],['ttr','त्र'],
    // Aspirated retroflex
    ['ddh','ढ'],['tth','ठ'],['nn','ण'],
    // Aspirated dentals
    ['chh','छ'],['jh','झ'],['gh','घ'],['kh','ख'],['dh','ध'],['th','थ'],
    ['bh','भ'],['ph','फ'],['sh','श'],['tt','ट'],['dd','ड'],
    // Long vowels (must come before short)
    ['aa','आ'],['ii','ई'],['uu','ऊ'],['ee','ई'],['oo','ऊ'],
    ['ai','ऐ'],['au','औ'],
    // Short vowels
    ['a','अ'],['i','इ'],['u','उ'],['e','ए'],['o','ओ'],
    // Consonants
    ['k','क'],['g','ग'],['ch','च'],['j','ज'],['t','त'],['d','द'],
    ['n','न'],['p','प'],['b','ब'],['m','म'],['y','य'],['r','र'],
    ['l','ल'],['v','व'],['w','व'],['s','स'],['h','ह'],
    // Anusvara
    ['M','ं'],['N','ं'],
    // Visarga
    ['H','ः'],
    // Danda
    ['|','।'],
];

// Vowel signs (matras) mapping for when vowel follows consonant
const VOWEL_TO_MATRA = {
    'अ':'',   // inherent vowel — no matra
    'आ':'ा','इ':'ि','ई':'ी','उ':'ु','ऊ':'ू',
    'ए':'े','ऐ':'ै','ओ':'ो','औ':'ौ',
};

const CONSONANTS = new Set(['क','ख','ग','घ','च','छ','ज','झ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह','क्ष','ज्ञ','श्र']);

function transliterate() {
    const input = document.getElementById('input-text').value.toLowerCase();
    let result  = '';
    let i       = 0;
    let prevWasConsonant = false;

    while (i < input.length) {
        // Space / newline: pass through
        if (/\s/.test(input[i])) {
            result += input[i]; i++; prevWasConsonant = false; continue;
        }
        // Punctuation pass-through
        if (/[0-9.,!?():;-]/.test(input[i])) {
            result += input[i]; i++; prevWasConsonant = false; continue;
        }

        let matched = false;
        for (const [rom, dev] of TRANSLIT_MAP) {
            if (input.startsWith(rom, i)) {
                const isVowel = VOWEL_TO_MATRA.hasOwnProperty(dev);
                if (isVowel && prevWasConsonant) {
                    // Attach as matra unless it's 'a' (inherent vowel)
                    result += VOWEL_TO_MATRA[dev];
                } else {
                    result += dev;
                }
                prevWasConsonant = CONSONANTS.has(dev);
                i += rom.length;
                matched = true;
                break;
            }
        }
        if (!matched) {
            result += input[i]; i++; prevWasConsonant = false;
        }
    }

    document.getElementById('output-text').value = result;
}

function clearAll() {
    document.getElementById('input-text').value  = '';
    document.getElementById('output-text').value = '';
}

function copyOutput() {
    const out = document.getElementById('output-text').value;
    if (out) navigator.clipboard.writeText(out);
}

document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') transliterate();
});
