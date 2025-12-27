const actEl = document.getElementById('activity');
const typeEl = document.getElementById('type');
const iconEl = document.getElementById('a-icon');

const iconMap = {
    "education": "fa-book-open",
    "recreation": "fa-umbrella-beach",
    "social": "fa-users",
    "diy": "fa-tools",
    "charity": "fa-hand-holding-heart",
    "cooking": "fa-utensils",
    "relaxation": "fa-couch",
    "music": "fa-music",
    "busywork": "fa-tasks"
};

async function getActivity() {
    try {
        // BoredaPI is often unreliable, using a robust fallback mechanism
        const res = await fetch('https://www.boredapi.com/api/activity').catch(() => ({ ok: false }));
        if (res.ok) {
            const data = await res.json();
            displayActivity(data.activity, data.type);
        } else {
            throw new Error('API unreachable');
        }
    } catch(e) {
        const fallback = [
            { a: "Optimize your terminal workflow", t: "education" },
            { a: "Draft a new project architecture", t: "busywork" },
            { a: "Analyze a piece of classic literature", t: "education" },
            { a: "Physical recalibration (Exercise)", t: "recreation" },
            { a: "Synthesize a new culinary experiment", t: "cooking" },
            { a: "Digital detox for 60 minutes", t: "relaxation" }
        ];
        const r = fallback[Math.floor(Math.random()*fallback.length)];
        displayActivity(r.a, r.t);
    }
}

function displayActivity(text, type) {
    if (typeof initTextScramble === 'function') {
        const fx = new TextScramble(actEl);
        fx.setText(text);
    } else {
        actEl.innerText = text;
    }
    
    typeEl.innerText = type;
    
    // Update icon
    const iconClass = iconMap[type] || 'fa-bolt';
    iconEl.className = `fas ${iconClass}`;
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

getActivity();
