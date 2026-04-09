// Hindi misspelling dictionary (common errors → correct form)
const SPELL_DICT = {
    'आशिर्वाद':'आशीर्वाद','प्रथक':'पृथक','स्वास्थ':'स्वास्थ्य',
    'सौन्दर्य':'सौंदर्य','अनुसन्धान':'अनुसंधान','विधार्थी':'विद्यार्थी',
    'पुरुस्कार':'पुरस्कार','प्रसन्नता':'प्रसन्नता','उनन्नती':'उन्नति',
    'परिक्षा':'परीक्षा','शादि':'शादी','राजनिति':'राजनीति',
    'विद्यालय':'विद्यालय','अध्यापिका':'अध्यापिका','निरिक्षण':'निरीक्षण',
    'दिवाली':'दीवाली','बिमारी':'बीमारी','नारि':'नारी','नुत्न':'नूतन',
    'मनोरंजन':'मनोरंजन','अंत':'अंत','सहयोगि':'सहयोगी','रात्रि':'रात्रि',
    'व्यापर':'व्यापार','त्योहार':'त्यौहार','अनावश्यक':'अनावश्यक',
    'प्रतियोगिता':'प्रतियोगिता','कार्यलय':'कार्यालय','वातावरन':'वातावरण',
    'महत्त्वपूर्ण':'महत्त्वपूर्ण','सप्ताहांत':'सप्ताहांत','कार्रवाई':'कार्रवाई',
    'इच्छाशक्ति':'इच्छाशक्ति','सत्संग':'सत्संग',
};

function checkSpelling() {
    const text  = document.getElementById('input-text').value;
    const words = text.split(/(\s+|[।?!,।॥])/);
    let errors  = 0;
    const highlightedParts = words.map(w => {
        const w2 = w.replace(/[।?!,।॥]/g, '');
        if (SPELL_DICT[w2]) {
            errors++;
            return `<span title="सुझाव: ${SPELL_DICT[w2]}" style="background:#ffeef0;border-bottom:2px wavy #b12704;cursor:help;">${w}</span>`;
        }
        return w;
    });

    document.getElementById('error-summary').innerHTML =
        `<div class="stat-pill">मिली त्रुटियाँ: <span style="color:#b12704;">${errors}</span></div>
         <div class="stat-pill">Dictionary में: <span>${Object.keys(SPELL_DICT).length} words</span></div>`;
    document.getElementById('highlighted').innerHTML = highlightedParts.join('').replace(/\n/g, '<br>');
    document.getElementById('results').style.display = 'block';
}

function autoCorrect() {
    let text = document.getElementById('input-text').value;
    Object.entries(SPELL_DICT).forEach(([wrong, right]) => {
        text = text.replace(new RegExp(wrong, 'g'), right);
    });
    document.getElementById('input-text').value = text;
    checkSpelling();
}

function clearAll() {
    document.getElementById('input-text').value      = '';
    document.getElementById('results').style.display = 'none';
}
