const PASSAGES = [
    'भारत एक महान देश है। यहाँ अनेक धर्म और भाषाएँ बोली जाती हैं। हिन्दी हमारी राष्ट्रभाषा है। भारत की संस्कृति विश्व में सबसे प्राचीन है।',
    'प्रकृति मानव जीवन का आधार है। वृक्ष हमें ऑक्सीजन देते हैं। नदियाँ जीवन का स्रोत हैं। हमें पर्यावरण की रक्षा करनी चाहिए।',
    'विज्ञान ने मानव जीवन को बदल दिया है। कंप्यूटर और इंटरनेट ने दूरियाँ मिटा दी हैं। चिकित्सा विज्ञान ने अनेक रोगों का उपचार खोजा है।'
];

let currentPassage = '';
let startTime = null;
let timerInterval = null;
let testActive = false;

function loadPassage() {
    const sel = document.getElementById('passage-select').value;
    document.getElementById('custom-input').style.display = (sel === 'custom') ? 'block' : 'none';
    if (sel !== 'custom') {
        currentPassage = PASSAGES[parseInt(sel)];
        renderDisplay();
    }
    resetTest();
}

function applyCustomText() {
    currentPassage = document.getElementById('custom-text').value.trim();
    if (currentPassage) renderDisplay();
    resetTest();
}

function renderDisplay(typed = '') {
    const chars = [...currentPassage];
    const typedChars = [...typed];
    let html = '';
    chars.forEach((c, i) => {
        if (i < typedChars.length) {
            const cls = typedChars[i] === c ? 'char-correct' : 'char-wrong';
            html += `<span class="${cls}">${c === ' ' ? '&nbsp;' : c}</span>`;
        } else if (i === typedChars.length) {
            html += `<span class="char-cursor">${c === ' ' ? '&nbsp;' : c}</span>`;
        } else {
            html += `<span>${c === ' ' ? '&nbsp;' : c}</span>`;
        }
    });
    document.getElementById('text-display').innerHTML = html;
}

function startTest() {
    if (!currentPassage) { loadPassage(); return; }
    const typeArea = document.getElementById('type-area');
    typeArea.disabled = false;
    typeArea.value    = '';
    typeArea.focus();
    renderDisplay('');
    testActive = true;
}

function checkTyping() {
    if (!testActive) return;
    const typed = document.getElementById('type-area').value;

    // Start timer on first keystroke
    if (!startTime && typed.length > 0) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 500);
    }

    renderDisplay(typed);

    // Count errors
    const typedChars   = [...typed];
    const targetChars  = [...currentPassage];
    let errors = 0;
    typedChars.forEach((c, i) => { if (c !== targetChars[i]) errors++; });

    const acc = typedChars.length > 0
        ? Math.round(((typedChars.length - errors) / typedChars.length) * 100)
        : 100;
    const progress = Math.round((typedChars.length / targetChars.length) * 100);

    document.getElementById('s-errors').textContent   = errors;
    document.getElementById('s-acc').textContent      = acc + '%';
    document.getElementById('s-progress').textContent = Math.min(progress, 100) + '%';

    // WPM
    if (startTime) {
        const elapsed = (Date.now() - startTime) / 60000; // minutes
        const wordsDone = typed.trim().split(/\s+/).filter(w => w).length;
        document.getElementById('s-wpm').textContent = elapsed > 0 ? Math.round(wordsDone / elapsed) : 0;
    }

    // Complete
    if (typed.length >= currentPassage.length) {
        clearInterval(timerInterval);
        testActive = false;
        document.getElementById('type-area').disabled = true;
        const wpm = document.getElementById('s-wpm').textContent;
        setTimeout(() => alert(`🎉 पूर्ण! WPM: ${wpm} | Accuracy: ${acc}%`), 100);
    }
}

function updateTimer() {
    if (!startTime) return;
    const elapsed = Date.now() - startTime;
    const m = Math.floor(elapsed / 60000).toString().padStart(2, '0');
    const s = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
    document.getElementById('s-time').textContent = `${m}:${s}`;
}

function resetTest() {
    clearInterval(timerInterval);
    startTime = null; testActive = false;
    document.getElementById('type-area').value    = '';
    document.getElementById('type-area').disabled = true;
    document.getElementById('s-time').textContent     = '00:00';
    document.getElementById('s-wpm').textContent      = '0';
    document.getElementById('s-acc').textContent      = '100%';
    document.getElementById('s-errors').textContent   = '0';
    document.getElementById('s-progress').textContent = '0%';
    renderDisplay('');
}

document.addEventListener('DOMContentLoaded', () => {
    currentPassage = PASSAGES[0];
    renderDisplay('');
});
