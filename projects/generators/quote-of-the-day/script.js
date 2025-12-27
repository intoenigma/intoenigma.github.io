const content = document.getElementById('q-content');
const author = document.getElementById('q-author');

async function getQuote() {
    content.style.opacity = 0.5;
    try {
        const res = await fetch('https://api.quotable.io/random');
        if (!res.ok) throw new Error('API Down');
        const data = await res.json();

        displayQuote(data.content, data.author);
    } catch (e) {
        console.warn('Quotable API failed, using backup.');
        // Fallback quotes
        const fallbacks = [
            { content: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
            { content: "Information is not knowledge.", author: "Albert Einstein" },
            { content: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch" }
        ];
        const f = fallbacks[Math.floor(Math.random() * fallbacks.length)];
        displayQuote(f.content, f.author);
    }
    content.style.opacity = 1;
}

function displayQuote(text, auth) {
    content.innerText = text;
    author.innerText = auth;

    if (typeof initTextScramble === 'function') {
        const fx = new TextScramble(author);
        fx.setText(auth);
    }
}

// Simple internal TextScramble class if main one isn't available for direct use
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

getQuote();
