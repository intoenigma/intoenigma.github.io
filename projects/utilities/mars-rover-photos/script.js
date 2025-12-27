const btn = document.getElementById('fetch-btn');
const gallery = document.getElementById('gallery');
const roverSel = document.getElementById('rover');

// NASA Demo Key
const API_KEY = 'DEMO_KEY';

btn.addEventListener('click', async () => {
    gallery.innerHTML = '<div class="placeholder">Transmitting data from Mars...</div>';

    // Random Sol for variety
    const sol = Math.floor(Math.random() * 1000) + 100; // Curiosity has 3000+ sols
    const rover = roverSel.value;

    try {
        const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${API_KEY}`);
        const data = await res.json();

        gallery.innerHTML = '';
        if (data.photos && data.photos.length > 0) {
            // Take first 20
            data.photos.slice(0, 20).forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.img_src;
                img.loading = 'lazy';
                img.title = photo.camera.full_name;
                gallery.appendChild(img);
            });
        } else {
            gallery.innerHTML = '<div class="placeholder">No photos found for this Sol. Try again (random Sol used).</div>';
        }
    } catch (e) {
        gallery.innerHTML = '<div class="placeholder" style="color:#ff0055">Connection Failed (API Limit?)</div>';
    }
});
