const recBtn = document.getElementById('rec-btn');
const stopBtn = document.getElementById('stop-btn');
const list = document.getElementById('recordings');
const timerDis = document.getElementById('timer');
const vis = document.getElementById('vis-bar');

let mediaRecorder;
let chunks = [];
let startTime;
let timerInt;
let audioCtx;
let analyser;
let dataArray;
let source;

recBtn.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        
        startTime = Date.now();
        timerInt = setInterval(updateTimer, 1000);
        
        recBtn.classList.add('recording');
        recBtn.disabled = true;
        stopBtn.disabled = false;
        
        // Visualizer
        audioCtx = new AudioContext();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        visualize();
        
        mediaRecorder.ondataavailable = e => chunks.push(e.data);
        mediaRecorder.onstop = e => {
            const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
            chunks = [];
            const audioURL = window.URL.createObjectURL(blob);
            addAudio(audioURL);
            
            stream.getTracks().forEach(track => track.stop());
            if(audioCtx) audioCtx.close();
        };
        
    } catch(err) {
        alert("Microphone denied");
    }
});

stopBtn.addEventListener('click', () => {
    mediaRecorder.stop();
    recBtn.classList.remove('recording');
    recBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerInt);
    timerDis.textContent = "00:00";
    vis.style.opacity = 0;
});

function updateTimer() {
    const diff = Math.floor((Date.now() - startTime) / 1000);
    const m = Math.floor(diff/60).toString().padStart(2,'0');
    const s = (diff%60).toString().padStart(2,'0');
    timerDis.textContent = `${m}:${s}`;
}

function visualize() {
    if(recBtn.disabled) {
        requestAnimationFrame(visualize);
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a,b)=>a+b) / dataArray.length;
        vis.style.opacity = avg / 100;
        vis.style.transform = `scale(${0.5 + (avg/100)})`;
    }
}

function addAudio(url) {
    const div = document.createElement('div');
    div.className = 'audio-item';
    div.innerHTML = `
        <audio src="${url}" controls></audio>
        <a href="${url}" download="voice.ogg" class="download-link">⬇</a>
    `;
    list.appendChild(div);
}
