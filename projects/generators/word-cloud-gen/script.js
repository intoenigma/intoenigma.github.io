const input = document.getElementById('text-input');
const output = document.getElementById('cloud-output');

const colors = ['#00f3ff', '#9d00ff', '#ffffff', '#ff00ff', '#00ff9d'];

function generateCloud() {
    const text = input.value;
    if(!text.trim()) return;
    
    output.innerHTML = '';
    
    // Frequency map
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const freq = {};
    if(!words) return;
    
    words.forEach(w => {
        if(w.length > 3) freq[w] = (freq[w] || 0) + 1;
    });
    
    const sorted = Object.entries(freq).sort((a,b) => b[1] - a[1]).slice(0, 30);
    const maxFreq = sorted[0][1];
    
    sorted.forEach(([word, count]) => {
        const el = document.createElement('span');
        el.className = 'cloud-word';
        el.innerText = word;
        
        // Size based on freq
        const size = 1 + (count / maxFreq) * 3; // 1rem to 4rem
        el.style.fontSize = `${size}rem`;
        
        // Random color
        el.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random pos
        const x = 10 + Math.random() * 80;
        const y = 10 + Math.random() * 80;
        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
        
        // Random opacity variation
        el.style.opacity = 0.7 + Math.random() * 0.3;
        
        output.appendChild(el);
    });
}
// Default text
input.value = "IntoEnigma is a creative coding playground designed to inspire and explore the boundaries of web design. Build code create dream animate visualize generate experience discover learn."
generateCloud();
