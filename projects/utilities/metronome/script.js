const bpmVal = document.getElementById('bpm-val');
const slider = document.getElementById('bpm-slider');
const btn = document.getElementById('toggle-btn');
const dot = document.getElementById('dot');
const minus = document.getElementById('minus-btn');
const plus = document.getElementById('plus-btn');

let audioCtx = null;
let isPlaying = false;
let timerID;
let nextNoteTime = 0.0;
let bpm = 100;
let lookahead = 25.0; // ms
let scheduleAheadTime = 0.1; // sec

function initAudio() {
    if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function nextNote() {
    const secondsPerBeat = 60.0 / bpm;
    nextNoteTime += secondsPerBeat;
}

function scheduleNote(time) {
    const osc = audioCtx.createOscillator();
    const envelope = audioCtx.createGain();

    osc.frequency.value = 800;
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    osc.connect(envelope);
    envelope.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + 0.03);
    
    // Visual
    setTimeout(() => {
        dot.classList.add('active');
        setTimeout(() => dot.classList.remove('active'), 100);
    }, (time - audioCtx.currentTime) * 1000);
}

function scheduler() {
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
        scheduleNote(nextNoteTime);
        nextNote();
    }
    timerID = setTimeout(scheduler, lookahead);
}

function play() {
    initAudio();
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        nextNoteTime = audioCtx.currentTime;
        scheduler();
        btn.textContent = 'Stop';
        btn.classList.add('secondary');
    } else {
        clearTimeout(timerID);
        btn.textContent = 'Start';
        btn.classList.remove('secondary');
    }
}

function updateBPM(val) {
    bpm = val;
    slider.value = bpm;
    bpmVal.textContent = bpm;
}

slider.addEventListener('input', (e) => updateBPM(e.target.value));
minus.addEventListener('click', () => updateBPM(bpm - 1));
plus.addEventListener('click', () => updateBPM(parseInt(bpm) + 1));
btn.addEventListener('click', play);
