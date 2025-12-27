const output = document.getElementById('output-text');
const micBtn = document.getElementById('mic-btn');
const statusBall = document.getElementById('status-ball');

let recognition;
let isListening = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
        isListening = true;
        micBtn.classList.add('listening');
        statusBall.classList.add('listening');
    };

    recognition.onresult = (event) => {
        let finalTrans = '';
        let interimTrans = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) finalTrans += transcript + ' ';
            else interimTrans += transcript;
        }

        // Simple append strategy for this demo, usually you'd maintain a full text state
        if (finalTrans) output.value += finalTrans;
    };

    recognition.onend = () => {
        // Auto-restart if we want continuous listening, or just stop
        if (isListening) recognition.start();
    };

    micBtn.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
            isListening = false;
            micBtn.classList.remove('listening');
            statusBall.classList.remove('listening');
        } else {
            recognition.start();
        }
    });

} else {
    output.value = "Speech Recognition API not supported in this browser.";
    micBtn.disabled = true;
}

document.getElementById('copy-btn').addEventListener('click', () => {
    output.select();
    document.execCommand('copy');
    alert('Copied');
});

document.getElementById('clear-btn').addEventListener('click', () => {
    output.value = '';
});
