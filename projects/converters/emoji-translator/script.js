const emojiMap = {
    'love': '❤️', 'like': '👍', 'happy': '😊', 'sad': '😢', 'cry': '😭',
    'cat': '🐱', 'dog': '🐶', 'pizza': '🍕', 'burger': '🍔', 'sun': '☀️',
    'moon': '🌙', 'star': '⭐', 'fire': '🔥', 'water': '💧', 'money': '💰',
    'yes': '✅', 'no': '❌', 'idea': '💡', 'cool': '😎', 'angry': 'Ay😠',
    'laugh': '😂', 'ghost': '👻', 'alien': '👽', 'robot': '🤖', 'poop': '💩',
    'skull': '💀', 'rocket': '🚀', 'check': '✅', 'code': '💻', 'music': '🎵'
};

const input = document.getElementById('input-text');
const output = document.getElementById('output-text');
const copyBtn = document.getElementById('copy-btn');

input.addEventListener('input', () => {
    const text = input.value;
    const words = text.split(' ');
    
    const translated = words.map(word => {
        // Remove punctuation for lookup
        const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
        // Keep original punctuation
        const punctuation = word.replace(/[\w]/g, '');
        
        if (emojiMap[cleanWord]) {
            return emojiMap[cleanWord] + punctuation;
        }
        return word;
    }).join(' ');
    
    output.value = translated;
});

copyBtn.addEventListener('click', () => {
    output.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy Translation', 2000);
});
