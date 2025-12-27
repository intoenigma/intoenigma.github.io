const input = document.getElementById('name-input');
const btn = document.getElementById('find-btn');
const result = document.getElementById('result-box');
const rName = document.getElementById('r-name');
const rMeaning = document.getElementById('r-meaning');
const traitsContainer = document.querySelector('.traits');

const adjectives = ["Creative", "Bold", "Loyal", "Kind", "Strong", "Wise", "Brave", "Calm", "Joyful", "Sharp", "Noble"];

btn.addEventListener('click', () => {
    const name = input.value.trim();
    if (!name) return;

    // Fun pseudo-random generation based on name char codes
    let seed = 0;
    for (let i = 0; i < name.length; i++) seed += name.charCodeAt(i);

    rName.textContent = name;

    // Simulated Meaning (Random for fun)
    const meanings = [
        "The one who brings light.",
        "A true leader of people.",
        "Born of the stars.",
        "Strength of the mountain.",
        "Peaceful warrior.",
        "Knowledge seeker."
    ];
    rMeaning.textContent = meanings[seed % meanings.length];

    // Pick 3 random traits based on seed
    traitsContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        // Pseudo random walk
        const idx = (seed + i * 7) % adjectives.length;
        const span = document.createElement('span');
        span.className = 'trait';
        span.textContent = adjectives[idx];
        traitsContainer.appendChild(span);
    }

    result.classList.remove('hidden');
});
