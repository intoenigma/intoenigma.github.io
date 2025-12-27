async function getProfile() {
    try {
        const res = await fetch('https://randomuser.me/api/');
        const data = await res.json();
        const user = data.results[0];

        document.getElementById('p-img').src = user.picture.large;

        const nameEl = document.getElementById('p-name');
        nameEl.innerText = `${user.name.first} ${user.name.last}`;

        document.getElementById('p-loc').innerText = `${user.location.city}, ${user.location.country}`;
        document.getElementById('p-email').innerText = user.email;
        document.getElementById('p-login').innerText = `@${user.login.username}`;
        document.getElementById('p-phone').innerText = user.phone;

        // Re-trigger scramble if available
        if (typeof initTextScramble === 'function') {
            const fx = new TextScramble(nameEl);
            fx.setText(`${user.name.first} ${user.name.last}`);
        }

    } catch (e) {
        console.error(e);
        document.getElementById('p-name').innerText = 'Error Fetching Identity';
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

getProfile();
