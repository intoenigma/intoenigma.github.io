const promptEl = document.getElementById('prompt');
const badge = document.getElementById('type-badge');
const icon = document.getElementById('type-icon');
const card = document.querySelector('.td-card');

const truths = [
    "What is your primary existential fear?",
    "Identify the most significant logical error you've committed.",
    "Decipher a classified personal secret.",
    "Identify a subject of your latent admiration.",
    "What is the least optimal asset you've been assigned (gift)?",
    "Identify the timestamp of your last data falsification (lie).",
    "What is your most inefficient personality trait?",
    "If you could delete one memory, which one would it be?"
];

const dares = [
    "Execute 15 physical recalibration units (pushups).",
    "Saturate the local area with high-volume vocal audio (sing).",
    "Transmit a 'Heuristic Probe' (Hello) to your primary interest.",
    "Execute rhythmic kinetic movement (dance) without audio input.",
    "Allow a secondary agent to modify your digital footprint (social post).",
    "Adopt a localized dialect protocol for the next 180 seconds.",
    "Impersonate a malfunctioning AI for 2 minutes."
];

function getTruth() {
    const t = truths[Math.floor(Math.random() * truths.length)];
    updateDisplay(t, "INTEGRITY_CHECK", "fa-eye", "truth-mode");
}

function getDare() {
    const d = dares[Math.floor(Math.random() * dares.length)];
    updateDisplay(d, "DIRECTIVE_ALPHA", "fa-fire", "dare-mode");
}

function updateDisplay(text, label, iconClass, modeClass) {
    if (typeof initTextScramble === 'function') {
        const fx = new TextScramble(promptEl);
        fx.setText(text);
    } else {
        promptEl.innerText = text;
    }
    
    badge.innerText = label;
    icon.className = `fas ${iconClass}`;
    
    card.classList.remove('truth-mode', 'dare-mode');
    card.classList.add(modeClass);
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

getTruth();
