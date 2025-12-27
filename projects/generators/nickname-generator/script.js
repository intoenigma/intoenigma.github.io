const result = document.getElementById('result');

const adj = ['Cyber', 'Neon', 'Dark', 'Silent', 'Electric', 'Rapid', 'Shadow', 'Iron', 'Quantum', 'Glitch', 'Vivid', 'Hollow'];
const noun = ['Wolf', 'Ghost', 'Runner', 'Blade', 'Viper', 'Signal', 'Code', 'Byte', 'Spectre', 'Falcon', 'Zero', 'Drifter'];

function generate() {
    const a = adj[Math.floor(Math.random() * adj.length)];
    const n = noun[Math.floor(Math.random() * noun.length)];
    const num = Math.random() > 0.5 ? Math.floor(Math.random()*99) : '';
    
    result.style.opacity = 0;
    setTimeout(() => {
        result.innerText = `${a}${n}${num}`;
        result.style.opacity = 1;
    }, 200);
}
generate();
