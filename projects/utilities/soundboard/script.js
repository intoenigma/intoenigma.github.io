const grid = document.getElementById('pad-grid');
let audioCtx;

const sounds = [
    { label: 'Kick', freq: 60, type: 'sine', decay: 0.5 },
    { label: 'Snare', freq: 200, type: 'triangle', decay: 0.2 },
    { label: 'HiHat', freq: 800, type: 'square', decay: 0.1 },
    { label: 'Tom', freq: 100, type: 'sine', decay: 0.4 },
    { label: 'Clap', freq: 400, type: 'sawtooth', decay: 0.15 },
    { label: 'Bass', freq: 40, type: 'sawtooth', decay: 0.8 },
    { label: 'Zap', freq: 600, type: 'sawtooth', sweep: true, decay: 0.3 },
    { label: 'Bloop', freq: 300, type: 'sine', sweep: true, decay: 0.3 },
    { label: 'Laser', freq: 1000, type: 'square', sweep: true, decay: 0.2 }
];

function init() {
    if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playSound(sound) {
    init();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = sound.type;
    osc.frequency.setValueAtTime(sound.freq, audioCtx.currentTime);
    
    if(sound.sweep) {
        osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + sound.decay);
    }
    
    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + sound.decay);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + sound.decay + 0.1);
}

sounds.forEach(s => {
    const btn = document.createElement('div');
    btn.className = 'pad-btn';
    btn.textContent = s.label;
    btn.onclick = () => playSound(s);
    grid.appendChild(btn);
});
