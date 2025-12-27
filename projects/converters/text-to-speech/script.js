const synth = window.speechSynthesis;
const textInput = document.getElementById('input-text');
const voiceSelect = document.getElementById('voice-select');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const speakBtn = document.getElementById('speak-btn');
let voices = [];

function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

speakBtn.addEventListener('click', () => {
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (textInput.value !== '') {
        const utterThis = new SpeechSynthesisUtterance(textInput.value);
        const selectedOption = voiceSelect.options[voiceSelect.selectedIndex].value;
        const selectedVoice = voices.find(v => v.name === selectedOption);
        
        utterThis.voice = selectedVoice;
        utterThis.pitch = pitch.value;
        utterThis.rate = rate.value;
        
        synth.speak(utterThis);
        
        textInput.blur();
    }
});
