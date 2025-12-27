const input = document.getElementById('input-list');
const output = document.getElementById('output-list');
const btn = document.getElementById('clean-btn');
const stats = document.getElementById('stats');

btn.addEventListener('click', () => {
    const raw = input.value;
    if(!raw) return;
    
    // Split by new line, trim whitespace
    const lines = raw.split('\n').map(l => l.trim()).filter(l => l !== '');
    
    // Set for uniqueness
    const unique = [...new Set(lines)];
    
    output.value = unique.join('\n');
    
    stats.textContent = `Original: ${lines.length} | Unique: ${unique.length} | Removed: ${lines.length - unique.length}`;
});
