const input = document.getElementById('email-input');
const btn = document.getElementById('check-btn');
const result = document.getElementById('result');
const icon = document.getElementById('icon');
const msg = document.getElementById('message');

btn.addEventListener('click', () => {
    const email = input.value;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    result.classList.remove('hidden');
    result.classList.remove('valid', 'invalid');

    if (re.test(email)) {
        result.classList.add('valid');
        icon.textContent = '✅';
        msg.textContent = 'Valid Email Format';
    } else {
        result.classList.add('invalid');
        icon.textContent = '❌';
        msg.textContent = 'Invalid Email Format';
    }
});
