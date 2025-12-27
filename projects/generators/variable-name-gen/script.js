const input = document.getElementById('input-desc');
const resultArea = document.getElementById('result-area');
const btns = document.querySelectorAll('.case-btn');
let currentCase = 'camel';

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCase = btn.dataset.case;
        generate();
    });
});

input.addEventListener('input', generate);

function generate() {
    const text = input.value.trim();
    if(!text) {
        resultArea.innerHTML = '';
        return;
    }
    
    const words = text.split(/[^a-zA-Z0-9]/).filter(w => w.length > 0);
    let output = '';
    
    if(words.length === 0) return;

    if (currentCase === 'camel') {
        output = words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    } else if (currentCase === 'snake') {
        output = words.map(w => w.toLowerCase()).join('_');
    } else if (currentCase === 'kebab') {
        output = words.map(w => w.toLowerCase()).join('-');
    } else if (currentCase === 'pascal') {
        output = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    } else if (currentCase === 'constant') {
        output = words.map(w => w.toUpperCase()).join('_');
    }
    
    resultArea.innerHTML = `<div class="var-result" onclick="copy('${output}')">${output}</div>`;
}

function copy(text) {
    navigator.clipboard.writeText(text);
    const el = document.querySelector('.var-result');
    const orig = el.innerText;
    el.innerText = 'Copied!';
    setTimeout(() => el.innerText = orig, 1000);
}
