let cards = JSON.parse(localStorage.getItem('enigma_flashcards')) || [
    { q: "What is the capital of France?", a: "Paris" },
    { q: "What is 2 + 2?", a: "4" },
    { q: "Who wrote 'Romeo and Juliet'?", a: "William Shakespeare" }
];

let currentIndex = 0;
let isFlipped = false;

const card = document.getElementById('flashcard');
const questionText = document.getElementById('question-text');
const answerText = document.getElementById('answer-text');
const modal = document.getElementById('modal');

function updateCard() {
    if (cards.length === 0) {
        questionText.innerText = "No cards available";
        answerText.innerText = "Add some cards to start";
        return;
    }
    const current = cards[currentIndex];
    questionText.innerText = current.q;
    answerText.innerText = current.a;
    
    // Reset flip state when moving to next card
    isFlipped = false;
    card.style.transform = 'rotateY(0deg)';
}

function flipCard() {
    if (cards.length === 0) return;
    isFlipped = !isFlipped;
    card.classList.toggle('flipped', isFlipped);
}

function nextCard() {
    if (cards.length === 0) return;
    currentIndex = (currentIndex + 1) % cards.length;
    updateCard();
}

function prevCard() {
    if (cards.length === 0) return;
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCard();
}

function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

function saveCard() {
    const q = document.getElementById('new-q').value.trim();
    const a = document.getElementById('new-a').value.trim();
    
    if (q && a) {
        cards.push({ q, a });
        localStorage.setItem('enigma_flashcards', JSON.stringify(cards));
        document.getElementById('new-q').value = '';
        document.getElementById('new-a').value = '';
        closeModal();
        if (cards.length === 1) updateCard();
    }
}

// Event Listeners
card.addEventListener('click', flipCard);
document.getElementById('next-btn').addEventListener('click', nextCard);
document.getElementById('prev-btn').addEventListener('click', prevCard);
document.getElementById('add-btn').addEventListener('click', openModal);

// Init
updateCard();
