// Rule-based Hindi Grammar Checker
const GRAMMAR_RULES = [
    { pattern: /([।?!])\s*[a-z]/g,          msg: 'वाक्यांत के बाद अगला शब्द capital से शुरू होना चाहिए',         type: 'warn' },
    { pattern: / +।/g,                         msg: 'दंड (।) से पहले space नहीं होना चाहिए',                         type: 'error' },
    { pattern: /।[^ \n]/g,                     msg: 'दंड (।) के बाद space होना चाहिए',                               type: 'error' },
    { pattern: /(\b\w+\b) \1/gi,               msg: 'अनावश्यक शब्द दोहराव (repeated words)',                         type: 'warn'  },
    { pattern: /, [,।]/g,                      msg: 'लगातार विराम चिह्न (consecutive punctuation)',                  type: 'error' },
    { pattern: /है ।/g,                        msg: '"है ।" → "है।" (space before danda)',                            type: 'error' },
    { pattern: /हैं ।/g,                       msg: '"हैं ।" → "हैं।"',                                             type: 'error' },
    { pattern: /कि जो/g,                       msg: '"कि जो" → likely "जो" is redundant',                           type: 'warn'  },
    { pattern: /ने को/g,                       msg: '"ने को" — संभावित कारक त्रुटि',                                  type: 'warn'  },
    { pattern: /  +/g,                         msg: 'एकाधिक space (multiple spaces)',                                 type: 'error' },
];

const COMMON_CORRECTIONS = {
    'आशिर्वाद': 'आशीर्वाद', 'प्रथक': 'पृथक', 'अनुसार': 'अनुसार',
    'सौन्दर्य': 'सौंदर्य', 'स्वास्थ': 'स्वास्थ्य', 'सहायक': 'सहायक',
    'वातावरण': 'वातावरण', 'अनुसन्धान': 'अनुसंधान',
};

function checkGrammar() {
    const text = document.getElementById('input-text').value;
    if (!text.trim()) return;

    const errors = [];
    GRAMMAR_RULES.forEach(rule => {
        const matches = [...text.matchAll(rule.pattern)];
        if (matches.length > 0) {
            errors.push({ msg: rule.msg, count: matches.length, type: rule.type });
        }
    });

    const errorHTML = errors.length === 0
        ? `<div class="stat-pill" style="color:#007600;"><i class="fas fa-check-circle"></i> कोई व्याकरण त्रुटि नहीं मिली! ✅</div>`
        : errors.map(e => `
            <div style="padding:10px 15px; border-left:4px solid ${e.type==='error'?'#b12704':'#e47911'}; background:${e.type==='error'?'#fdf0f0':'#fffbf0'}; margin-bottom:8px; border-radius:0 4px 4px 0; font-size:13px;">
                <strong style="color:${e.type==='error'?'#b12704':'#e47911'};">${e.type==='error'?'❌ त्रुटि':'⚠️ सुझाव'}:</strong> ${e.msg}
                <span style="float:right; color:#565959;">${e.count} बार</span>
            </div>`).join('');

    // Apply corrections
    let corrected = text;
    Object.entries(COMMON_CORRECTIONS).forEach(([wrong, right]) => {
        corrected = corrected.replace(new RegExp(wrong, 'g'), right);
    });

    document.getElementById('error-list').innerHTML = errorHTML;
    document.getElementById('corrected').innerHTML  = `<div style="font-size:11px; font-weight:800; text-transform:uppercase; color:#565959; margin-bottom:8px;">Auto-corrected Text:</div>${corrected.replace(/\n/g,'<br>')}`;
    document.getElementById('results').style.display = 'block';
}

function clearAll() {
    document.getElementById('input-text').value    = '';
    document.getElementById('results').style.display = 'none';
}
