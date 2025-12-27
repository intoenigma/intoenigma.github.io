let countries = [];
let currentCountry = null;
let score = 0;
let streak = 0;

const flagImg = document.getElementById('flag-img');
const optionsGrid = document.getElementById('options-grid');
const scoreEl = document.getElementById('score');
const streakEl = document.getElementById('streak');

async function fetchCountries() {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2');
        const data = await res.json();
        countries = data.filter(c => c.flags && c.flags.png);
        nextQuestion();
    } catch (err) {
        console.error("Failed to fetch flags", err);
    }
}

function nextQuestion() {
    optionsGrid.innerHTML = '';
    
    // Pick correct country
    currentCountry = countries[Math.floor(Math.random() * countries.length)];
    flagImg.src = currentCountry.flags.png;
    
    // Pick 3 wrong options
    let options = [currentCountry.name.common];
    while (options.length < 4) {
        let randomCountry = countries[Math.floor(Math.random() * countries.length)].name.common;
        if (!options.includes(randomCountry)) options.push(randomCountry);
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn interactive';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, btn);
        optionsGrid.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);
    
    if (selected === currentCountry.name.common) {
        btn.classList.add('correct');
        score += 10;
        streak++;
    } else {
        btn.classList.add('wrong');
        streak = 0;
        // Show correct answer
        allBtns.forEach(b => {
            if (b.innerText === currentCountry.name.common) b.classList.add('correct');
        });
    }
    
    scoreEl.innerText = score;
    streakEl.innerText = streak;
    
    setTimeout(nextQuestion, 1500);
}

fetchCountries();
