const hostIn = document.getElementById('host');
const btn = document.getElementById('scan-btn');
const results = document.getElementById('results');

const ports = [80, 443, 8080, 3000, 5000, 8000];

btn.addEventListener('click', async () => {
    const host = hostIn.value.trim() || 'localhost';
    results.innerHTML = '';
    
    for(let port of ports) {
        const div = document.createElement('div');
        div.className = 'port-card';
        div.textContent = `${port}: ...`;
        results.appendChild(div);
        
        checkPort(host, port, div);
    }
});

function checkPort(host, port, el) {
    // Attempt to load an image from that port?
    // If it responds fast (even with error), maybe open. 
    // If it times out, closed/stealth.
    // Fetch is cleaner but CORS will block.
    
    const start = Date.now();
    const timeout = 2000;
    
    // We try Fetch with 'no-cors' mode
    fetch(`http://${host}:${port}`, { mode: 'no-cors' })
        .then(() => {
            el.className = 'port-card open';
            el.textContent = `${port}: OPEN`;
        })
        .catch(() => {
            // Error could mean closed OR CORS error on open port.
            // Distinguishing is hard in JS. 
            // We'll mark as 'Closed/Blocked'
            el.className = 'port-card closed';
            el.textContent = `${port}: CLOSED`;
        });
        
    // Note: This is highly unreliable but it's the best pure JS can do for a "Scanner" simulation
    // without a websocket proxy backend.
}
