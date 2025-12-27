// Pure CSS glitch usually suffices, but we add a random jump effect
const title = document.querySelector('.glitch');
setInterval(() => {
    if (Math.random() > 0.9) {
        title.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
        setTimeout(() => title.style.transform = 'translate(0,0)', 50);
    }
}, 100);
