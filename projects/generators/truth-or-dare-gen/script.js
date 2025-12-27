const promptEl = document.getElementById('prompt');
const badge = document.getElementById('type-badge');

const truths = [
    "What is your biggest fear?",
    "What is the most embarrassing thing you've done?",
    "What is a secret you've never told anyone?",
    "Who is your secret crush?",
    "What's the worst gift you've ever received?",
    "When was the last time you lied?"
];

const dares = [
    "Do 10 pushups.",
    "Sing a song loudly.",
    "Text your crush 'Hello'.",
    "Dance for 1 minute without music.",
    "Let someone else post on your social media.",
    "Speak in an accent for the next 3 rounds."
];

function getTruth() {
    const t = truths[Math.floor(Math.random() * truths.length)];
    promptEl.innerText = t;
    badge.innerText = "TRUTH";
    badge.className = "badge";
}

function getDare() {
    const d = dares[Math.floor(Math.random() * dares.length)];
    promptEl.innerText = d;
    badge.innerText = "DARE";
    badge.className = "badge dare";
}

getTruth();
