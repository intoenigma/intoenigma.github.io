let recognition = null;
let isRecording = false;
let fullTranscript = '';

function toggleRecording() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('आपका ब्राउज़र Speech Recognition सपोर्ट नहीं करता। Chrome या Edge उपयोग करें।');
        return;
    }
    if (isRecording) stopRecording();
    else              startRecording();
}

function startRecording() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang          = 'hi-IN';
    recognition.continuous    = true;
    recognition.interimResults= true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        isRecording = true;
        document.getElementById('mic-display').style.background    = '#fdf0f0';
        document.getElementById('mic-display').style.borderColor   = '#b12704';
        document.getElementById('mic-icon').style.color            = '#b12704';
        document.getElementById('status-text').textContent         = '🔴 रिकॉर्ड हो रहा है... बोलिए (Recording...)';
        document.getElementById('rec-btn').innerHTML               = '<i class="fas fa-stop"></i> रोकें (Stop)';
        document.getElementById('rec-btn').className               = 'btn btn-danger';
    };

    recognition.onresult = (e) => {
        let interim = '';
        let final   = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
            const transcript = e.results[i][0].transcript;
            if (e.results[i].isFinal) {
                final   += transcript + ' ';
                const conf = (e.results[i][0].confidence * 100).toFixed(0);
                document.getElementById('s-conf').textContent = conf + '%';
            } else {
                interim += transcript;
            }
        }
        fullTranscript += final;
        const display   = fullTranscript + interim;
        document.getElementById('result-text').value = display;
        document.getElementById('s-words').textContent = display.trim().split(/\s+/).filter(w=>w).length;
        document.getElementById('stat-strip').style.display = 'flex';
    };

    recognition.onerror = (e) => {
        document.getElementById('status-text').textContent = `❌ Error: ${e.error}`;
        stopRecording();
    };

    recognition.onend = () => { if (isRecording) recognition.start(); };
    recognition.start();
}

function stopRecording() {
    if (recognition) recognition.stop();
    isRecording = false;
    document.getElementById('mic-display').style.background  = '#f0f2f2';
    document.getElementById('mic-display').style.borderColor = '#ddd';
    document.getElementById('mic-icon').style.color          = '#565959';
    document.getElementById('status-text').textContent       = '⏹ रिकॉर्डिंग बंद। फिर से शुरू करने के लिए बटन दबाएँ।';
    document.getElementById('rec-btn').innerHTML             = '<i class="fas fa-microphone"></i> शुरू करें (Start)';
    document.getElementById('rec-btn').className             = 'btn btn-primary';
}

function clearText() { fullTranscript = ''; document.getElementById('result-text').value = ''; document.getElementById('stat-strip').style.display = 'none'; }
function copyText()  { const t = document.getElementById('result-text').value; if (t) navigator.clipboard.writeText(t); }
