const input = document.getElementById('input-desc');
const resultsList = document.getElementById('results-list');
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
        resultsList.innerHTML = '<span class="placeholder">Awaiting semantic input...</span>';
        return;
    }
    
    const words = text.split(/[^a-zA-Z0-9]/).filter(w => w.length > 0);
    if(words.length === 0) return;

    let output = '';
    
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
    
    resultsList.innerHTML = `
        <div class="var-item glass magnetic">
            <span class="var-name">${output}</span>
            <button class="copy-btn" onclick="copyText('${output}', this)"><i class="fas fa-copy"></i></button>
        </div>
    `;

    // Re-init magnetic if needed
    if (typeof initMagneticElements === 'function') {
        initMagneticElements();
    }
}

function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const icon = btn.querySelector('i');
        icon.className = 'fas fa-check';
        btn.style.color = 'var(--primary)';
        setTimeout(() => {
            icon.className = 'fas fa-copy';
            btn.style.color = '#fff';
        }, 2000);
    });
}
