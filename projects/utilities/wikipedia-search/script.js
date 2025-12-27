const input = document.getElementById('wiki-in');
const btn = document.getElementById('search-btn');
const list = document.getElementById('results');

function search() {
    const q = input.value.trim();
    if (!q) return;

    // Wikipedia API 'opensearch' is CORS friendly usually
    const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(q)}&limit=10&namespace=0&format=json&origin=*`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Data format: [query, [titles], [descriptions], [urls]]
            const titles = data[1];
            const descs = data[2];
            const links = data[3];

            list.innerHTML = '';

            if (titles.length === 0) {
                list.innerHTML = '<div style="color:#666; text-align:center;">No results found.</div>';
                return;
            }

            titles.forEach((t, i) => {
                const a = document.createElement('a');
                a.href = links[i];
                a.className = 'wiki-item';
                a.target = '_blank';
                a.innerHTML = `<h3>${t}</h3><p>${descs[i] || 'No description available.'}</p>`;
                list.appendChild(a);
            });
        })
        .catch(e => alert("Error connecting to Wikipedia"));
}

btn.addEventListener('click', search);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') search();
});
