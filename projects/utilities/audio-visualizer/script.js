const fileInput = document.getElementById('audio-file');
const dropZone = document.getElementById('drop-zone');
const audio = document.getElementById('audio-player');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

let audioCtx, analyser, source;

dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if(file) {
        audio.src = URL.createObjectURL(file);
        audio.load();
        initAudio();
    }
});

function initAudio() {
    if(!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        render();
    }
}

function render() {
    requestAnimationFrame(render);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        
        // Gradient color based on height/loudness
        const r = barHeight + (25 * (i/bufferLength));
        const g = 250 * (i/bufferLength);
        const b = 50;

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, canvas.height - barHeight - 10, barWidth, barHeight + 10); // +10 for visual pop

        x += barWidth + 1;
    }
}
