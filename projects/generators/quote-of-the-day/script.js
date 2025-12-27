const content = document.getElementById('q-content');
const author = document.getElementById('q-author');

async function getQuote() {
    content.style.opacity = 0.5;
    try {
        const res = await fetch('https://api.quotable.io/random');
        const data = await res.json();
        content.innerText = `"${data.content}"`;
        author.innerText = `- ${data.author}`;
    } catch (e) {
        content.innerText = '"Wisdom is silence in the face of error."';
        author.innerText = '- Fallback';
    }
    content.style.opacity = 1;
}
getQuote();
