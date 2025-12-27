const input = document.getElementById('query');

const engines = {
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    duck: 'https://duckduckgo.com/?q=',
    youtube: 'https://www.youtube.com/results?search_query=',
    reddit: 'https://www.reddit.com/search/?q=',
    wiki: 'https://en.wikipedia.org/wiki/Special:Search?search='
};

function search(engine) {
    const q = input.value.trim();
    if(!q) return alert("Enter query first");
    window.open(engines[engine] + encodeURIComponent(q), '_blank');
}

function searchAll() {
    const q = input.value.trim();
    if(!q) return alert("Enter query first");
    // Browsers often block multiple popups, but we try.
    Object.keys(engines).forEach(key => {
        window.open(engines[key] + encodeURIComponent(q), '_blank');
    });
}

input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') search('google');
});
