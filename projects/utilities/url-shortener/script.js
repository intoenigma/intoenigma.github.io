const input = document.getElementById('url-in');
const btn = document.getElementById('shorten-btn');
const resDiv = document.getElementById('result');
const shortSpan = document.getElementById('short-url');
const copyBtn = document.getElementById('copy-btn');

btn.addEventListener('click', () => {
    if(!input.value) return;
    
    // Generate Hash
    const hash = Math.random().toString(36).substr(2, 6);
    const fakeUrl = `https://ie.link/${hash}`;
    
    shortSpan.textContent = fakeUrl;
    resDiv.classList.remove('hidden');
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(shortSpan.textContent);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy', 2000);
});
