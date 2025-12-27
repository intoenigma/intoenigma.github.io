const grid = document.getElementById('meme-grid');

async function getMemes() {
    grid.innerHTML = '<p>Loading...</p>';
    try {
        const res = await fetch('https://api.imgflip.com/get_memes');
        const json = await res.json();
        const memes = json.data.memes;

        grid.innerHTML = '';
        // Show random 20
        const shuffled = memes.sort(() => 0.5 - Math.random()).slice(0, 20);

        shuffled.forEach(m => {
            const div = document.createElement('div');
            div.className = 'meme-item';
            div.innerHTML = `
                <img src="${m.url}" loading="lazy">
                <p>${m.name}</p>
            `;
            div.onclick = () => window.open(m.url, '_blank');
            grid.appendChild(div);
        });

    } catch (e) {
        grid.innerHTML = '<p>Error loading memes.</p>';
    }
}
getMemes();
