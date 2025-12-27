const video = document.getElementById('preview');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const download = document.getElementById('download-link');

let mediaRecorder;
let chunks = [];

startBtn.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        video.srcObject = stream;

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            chunks = [];
            const url = URL.createObjectURL(blob);
            download.href = url;
            download.download = `recording_${Date.now()}.webm`;
            download.classList.remove('hidden');
            download.textContent = 'Download Recording (' + (blob.size / 1024 / 1024).toFixed(2) + 'MB)';

            // stop tracks
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
        };

        mediaRecorder.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        download.classList.add('hidden');

    } catch (err) {
        console.error("Error: " + err);
    }
});

stopBtn.addEventListener('click', () => {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});
