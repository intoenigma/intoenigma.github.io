const input = document.getElementById('text-input');
const cloudContainer = document.getElementById('cloud-container');

const colors = ['#00f3ff', '#9d00ff', '#ffffff', '#ff007b', '#00ff9d'];

function generateCloud() {
    const text = input.value;
    if(!text.trim()) return;
    
    cloudContainer.innerHTML = '';
    
    // Frequency map
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const freq = {};
    if(!words) return;
    
    // Filter common short words
    const stopWords = ['this', 'that', 'with', 'from', 'when', 'then', 'there'];
    
    words.forEach(w => {
        if(w.length > 3 && !stopWords.includes(w)) {
            freq[w] = (freq[w] || 0) + 1;
        }
    });
    
    const sorted = Object.entries(freq).sort((a,b) => b[1] - a[1]).slice(0, 40);
    if(sorted.length === 0) {
        cloudContainer.innerHTML = '<p class="placeholder">Insufficient linguistic data...</p>';
        return;
    }
    const maxFreq = sorted[0][1];
    
    sorted.forEach(([word, count]) => {
        const el = document.createElement('span');
        el.className = 'cloud-word magnetic';
        el.innerText = word;
        
        // Size based on freq
        const size = 1 + (count / maxFreq) * 3; // 1rem to 4rem
        el.style.fontSize = `${size}rem`;
        el.style.fontWeight = size > 2 ? '700' : '400';
        
        // Random color from palette
        el.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random opacity variation
        el.style.opacity = 0.6 + Math.random() * 0.4;
        
        cloudContainer.appendChild(el);
    });

    // Re-init magnetic elements if available
    if (typeof initMagneticElements === 'function') {
        initMagneticElements();
    }
}

// Default text
input.value = "IntoEnigma is a creative coding playground designed to inspire and explore the boundaries of web design. Build code create dream animate visualize generate experience discover learn technology futuristic neon glassmorphism interactive premium digital interface master system protocol";

generateCloud();
