const input = document.getElementById('password');
const bar = document.getElementById('bar');
const label = document.getElementById('label');
const toggle = document.getElementById('toggle-view');

const reqs = {
    len: document.getElementById('req-len'),
    num: document.getElementById('req-num'),
    sym: document.getElementById('req-sym'),
    case: document.getElementById('req-case')
};

toggle.addEventListener('click', () => {
    input.type = input.type === 'password' ? 'text' : 'password';
});

input.addEventListener('input', () => {
    const val = input.value;
    let score = 0;
    
    // Checks
    const hasLen = val.length >= 8;
    const hasNum = /\d/.test(val);
    const hasSym = /[!@#$%^&*(),.?":{}|<>]/.test(val);
    const hasCase = /[a-z]/.test(val) && /[A-Z]/.test(val);
    
    // Update UI List
    reqs.len.classList.toggle('valid', hasLen);
    reqs.num.classList.toggle('valid', hasNum);
    reqs.sym.classList.toggle('valid', hasSym);
    reqs.case.classList.toggle('valid', hasCase);
    
    if(hasLen) score++;
    if(hasNum) score++;
    if(hasSym) score++;
    if(hasCase) score++;
    
    // Bar Logic
    const percentage = (score / 4) * 100;
    bar.style.width = `${percentage}%`;
    
    if(score === 0) {
        bar.style.backgroundColor = 'transparent';
        label.textContent = 'Enter Password';
    } else if(score <= 2) {
        bar.style.backgroundColor = '#ff0055';
        label.textContent = 'Weak';
        label.style.color = '#ff0055';
    } else if(score === 3) {
        bar.style.backgroundColor = '#ffaa00';
        label.textContent = 'Medium';
        label.style.color = '#ffaa00';
    } else {
        bar.style.backgroundColor = '#00ff41';
        label.textContent = 'Strong';
        label.style.color = '#00ff41';
    }
});
