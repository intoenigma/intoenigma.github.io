const img = document.getElementById('cat-img');

async function getCat() {
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
getCat();
