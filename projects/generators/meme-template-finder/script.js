const grid = document.getElementById('meme-grid');

async function getMemes() {
    grid.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Synchronizing with Imgflip Network...</p>
        </div>
    `;
    try {
        const res = await fetch('https://api.imgflip.com/get_memes');
        const json = await res.json();
        const memes = json.data.memes;

        grid.innerHTML = '';
        // Show random 24 for a better grid fit
        const shuffled = memes.sort(() => 0.5 - Math.random()).slice(0, 24);

        shuffled.forEach(m => {
            const div = document.createElement('div');
            div.className = 'meme-card glass magnetic';
            div.innerHTML = `
                <img src="${m.url}" loading="lazy">
                <h4>${m.name}</h4>
            `;
            div.onclick = () => window.open(m.url, '_blank');
            grid.appendChild(div);
        });

        // Re-init magnetic elements if available
        if (typeof initMagneticElements === 'function') {
            initMagneticElements();
        }

    } catch (e) {
        grid.innerHTML = '<p>Error establishing network connection to meme cluster.</p>';
    }
}
getMemes();
