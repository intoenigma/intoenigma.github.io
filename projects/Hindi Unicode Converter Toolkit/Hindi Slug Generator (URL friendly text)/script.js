// Simple Devanagari → Roman IAST mapping for slug generation
const IAST_MAP = {
    'अ':'a','आ':'a','इ':'i','ई':'i','उ':'u','ऊ':'u','ए':'e','ऐ':'ai','ओ':'o','औ':'au',
    'ा':'a','ि':'i','ी':'i','ु':'u','ू':'u','े':'e','ै':'ai','ो':'o','ौ':'au',
    'ं':'n','ः':'h','्':'','ँ':'n','़':'',
    'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ng',
    'च':'ch','छ':'chh','ज':'j','झ':'jh','ञ':'n',
    'ट':'t','ठ':'th','ड':'d','ढ':'dh','ण':'n',
    'त':'t','थ':'th','द':'d','ध':'dh','न':'n',
    'प':'p','फ':'ph','ब':'b','भ':'bh','म':'m',
    'य':'y','र':'r','ल':'l','व':'v','श':'sh','ष':'sh','स':'s','ह':'h',
    'क्ष':'ksh','ज्ञ':'gyn','त्र':'tr',
    '।':'','॥':'',
    '०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9',
};

function toRoman(text) {
    const chars = [...text.normalize('NFC')];
    let result = '';
    for (const c of chars) {
        if (IAST_MAP[c] !== undefined)  result += IAST_MAP[c];
        else if (/\s/.test(c))          result += '-';
        else if (/[a-zA-Z0-9]/.test(c)) result += c;
        // skip other chars
    }
    return result;
}

function generateSlug() {
    let text = document.getElementById('input-text').value.trim();
    const mode  = document.getElementById('slug-mode').value;
    const lower = document.getElementById('lowercase').checked;

    let slug = '';

    if (mode === 'encoded') {
        slug = encodeURIComponent(text).replace(/%20/g, '-');
    } else if (mode === 'iast' || mode === 'simple') {
        slug = toRoman(text);
        // clean up slug
        slug = slug.replace(/[^a-zA-Z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }

    if (lower) slug = slug.toLowerCase();

    document.getElementById('slug-output').value = slug;
    document.getElementById('url-preview').textContent = `https://example.com/${slug}`;
    document.getElementById('results').style.display = 'block';
}

function copySlug() {
    const out = document.getElementById('slug-output').value;
    if (out) {
        navigator.clipboard.writeText(out);
        const btn = document.querySelector('[onclick="copySlug()"]');
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Copy'; }, 2000);
    }
}

function clearAll() {
    document.getElementById('input-text').value = '';
    document.getElementById('results').style.display = 'none';
}
