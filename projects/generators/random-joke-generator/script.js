const setup = document.getElementById('setup');
const punchline = document.getElementById('punchline');
const revealBtn = document.getElementById('reveal-btn');

async function getJoke() {
    setup.innerText = 'Loading...';
    punchline.classList.add('hidden');
    revealBtn.classList.add('hidden');
    
    try {
        const res = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await res.json();
        
        setup.innerText = data.setup;
        punchline.innerText = data.punchline;
        revealBtn.classList.remove('hidden');
    } catch(e) {
        setup.innerText = 'Why did the developer go broke?';
        punchline.innerText = 'Because he used up all his cache.';
        revealBtn.classList.remove('hidden');
    }
}

function reveal() {
    punchline.classList.remove('hidden');
    revealBtn.classList.add('hidden');
}

getJoke();
