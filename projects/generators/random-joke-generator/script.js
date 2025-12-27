const setup = document.getElementById('setup');
const punchline = document.getElementById('punchline');
const punchWrapper = document.getElementById('punchline-wrapper');
const revealBtn = document.getElementById('reveal-btn');

async function getJoke() {
    setup.innerText = 'Initializing humor packet...';
    punchWrapper.classList.add('hidden');
    revealBtn.classList.add('hidden');
    
    try {
        const res = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await res.json();
        
        setup.innerText = data.setup;
        punchline.innerText = data.punchline;
        revealBtn.classList.remove('hidden');
    } catch(e) {
        setup.innerText = 'SYSTEM_ERROR: Why did the neural network fail?';
        punchline.innerText = 'It had too many layers of abstraction.';
        revealBtn.classList.remove('hidden');
    }
}

function reveal() {
    punchWrapper.classList.remove('hidden');
    revealBtn.classList.add('hidden');
    
    if (typeof initTextScramble === 'function') {
        const fx = new TextScramble(punchline);
        fx.setText(punchline.innerText);
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

getJoke();
