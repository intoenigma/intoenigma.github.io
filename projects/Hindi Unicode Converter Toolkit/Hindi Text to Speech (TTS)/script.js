let synth = window.speechSynthesis;
let voices = [];
let utterance = null;

function loadVoices() {
    voices = synth.getVoices();
    const select = document.getElementById('voice-select');
    select.innerHTML = '';

    // Prefer Hindi voices
    const hindiVoices = voices.filter(v => v.lang.startsWith('hi'));
    const otherVoices = voices.filter(v => !v.lang.startsWith('hi'));

    if (hindiVoices.length === 0) {
        document.getElementById('support-msg').innerHTML =
            ' <span style="color:#b12704;">⚠️ No Hindi voice found. Install Google Hindi TTS for best results.</span>';
    }

    [...hindiVoices, ...otherVoices].forEach((v, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `${v.name} (${v.lang})`;
        if (v.lang.startsWith('hi')) opt.style.fontWeight = '700';
        select.appendChild(opt);
    });
}

window.speechSynthesis.onvoiceschanged = loadVoices;
document.addEventListener('DOMContentLoaded', () => { setTimeout(loadVoices, 300); });

function speakText() {
    if (!synth) { alert('Speech Synthesis not supported in this browser.'); return; }

    const text  = document.getElementById('tts-text').value.trim();
    if (!text) return;

    synth.cancel();

    const allVoices = [...voices.filter(v => v.lang.startsWith('hi')), ...voices.filter(v => !v.lang.startsWith('hi'))];
    const selIdx    = parseInt(document.getElementById('voice-select').value) || 0;

    utterance          = new SpeechSynthesisUtterance(text);
    utterance.voice    = allVoices[selIdx] || null;
    utterance.lang     = allVoices[selIdx]?.lang || 'hi-IN';
    utterance.rate     = parseFloat(document.getElementById('rate').value);
    utterance.pitch    = parseFloat(document.getElementById('pitch').value);

    utterance.onstart = () => {
        document.getElementById('progress-bar').style.display = 'block';
        document.getElementById('status-text').textContent = '🔊 बोल रहा है... (Speaking...)';
        document.getElementById('speak-btn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Speaking...';
    };
    utterance.onend = () => {
        document.getElementById('status-text').textContent = '✅ पूर्ण। (Completed)';
        document.getElementById('progress-fill').style.width = '100%';
        document.getElementById('speak-btn').innerHTML = '<i class="fas fa-volume-up"></i> बोलो (Speak)';
        setTimeout(() => { document.getElementById('progress-bar').style.display = 'none'; }, 3000);
    };
    utterance.onerror = (e) => {
        document.getElementById('status-text').textContent = `❌ Error: ${e.error}`;
        document.getElementById('speak-btn').innerHTML = '<i class="fas fa-volume-up"></i> बोलो (Speak)';
    };

    synth.speak(utterance);
}

function pauseSpeech() {
    if (synth.speaking && !synth.paused) synth.pause();
    else if (synth.paused) synth.resume();
}

function stopSpeech() {
    synth.cancel();
    document.getElementById('progress-bar').style.display = 'none';
    document.getElementById('speak-btn').innerHTML = '<i class="fas fa-volume-up"></i> बोलो (Speak)';
}
