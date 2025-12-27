const img = document.getElementById('lorem-img');
const wIn = document.getElementById('w');
const hIn = document.getElementById('h');
const grayCheck = document.getElementById('gray');
const blurCheck = document.getElementById('blur');
const urlOut = document.getElementById('url-out');
const loading = document.getElementById('loading');

function fetchImage() {
    loading.classList.add('active');
    const w = wIn.value || 400;
    const h = hIn.value || 300;
    let url = `https://picsum.photos/${w}/${h}`;

    // Params
    let params = [];
    if (grayCheck.checked) params.push('grayscale');
    if (blurCheck.checked) params.push('blur=2');

    if (params.length > 0) {
        url += '?' + params.join('&');
    } else {
        // Add random query param to bust cache
        url += '?random=' + Math.random();
    }

    img.src = url;
    urlOut.innerText = url;
}

img.onload = () => {
    loading.classList.remove('active');
};

function copyUrl() {
    const text = urlOut.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
    });
}

fetchImage();
