const img = document.getElementById('cat-img');
const loading = document.getElementById('loading');

async function getCat() {
    loading.classList.add('active');
    try {
        const res = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await res.json();
        img.src = data[0].url;
    } catch (e) {
        console.error(e);
        // Fallback
        img.src = 'https://cataas.com/cat?t=' + Date.now();
    }
}

img.onload = () => {
    loading.classList.remove('active');
};

getCat();
