const btn = document.getElementById('fetch-btn');
const input = document.getElementById('url-input');
const output = document.getElementById('output');

btn.addEventListener('click', async () => {
    const url = input.value;
    if (!url) return;

    output.innerHTML = '<div class="placeholder">Fetching...</div>';

    try {
        const res = await fetch(url, { method: 'HEAD' });

        output.innerHTML = '';
        // Iterate headers
        for (let pair of res.headers.entries()) {
            const row = document.createElement('div');
            row.className = 'header-item';
            row.innerHTML = `
                <span class="header-key">${pair[0]}</span>
                <span class="header-val">${pair[1]}</span>
            `;
            output.appendChild(row);
        }

        if (res.headers.entries().next().done) {
            output.innerHTML = '<div class="placeholder">No headers readable (CORS Blocked)</div>';
        }

    } catch (e) {
        output.innerHTML = `<div class="placeholder" style="color:#ff0055">Error: ${e.message}<br>Likely CORS restricted.</div>`;
    }
});
