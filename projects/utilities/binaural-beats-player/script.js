let ctx, leftOsc, rightOsc, merger;
let isPlaying = false;
const btn = document.getElementById('toggle-btn');
const leftIn = document.getElementById('left-freq');
const rightIn = document.getElementById('right-freq');

function initAudio() {
    if (!ctx) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        merger = ctx.createChannelMerger(2);
        merger.connect(ctx.destination);
    }
}

function start() {
    initAudio();
    const t = ctx.currentTime;

    // Left Channel
    leftOsc = ctx.createOscillator();
    leftOsc.frequency.value = leftIn.value;
    const leftGain = ctx.createGain(); // Use gain to route to channel 0
    // Actually simpler: createStereoPanner not fully supported everywhere in old logic, but ChannelMerger is explicit.
    // Osc -> ChannelMerger Input 0
    leftOsc.connect(merger, 0, 0);

    // Right Channel
    rightOsc = ctx.createOscillator();
    rightOsc.frequency.value = rightIn.value;
    rightOsc.connect(merger, 0, 1);

    leftOsc.start(t);
    rightOsc.start(t);

    isPlaying = true;
    btn.textContent = "Stop Signal";
    btn.classList.add('secondary');
}

function stop() {
    if (leftOsc) leftOsc.stop();
    if (rightOsc) rightOsc.stop();
    isPlaying = false;
    btn.textContent = "Play Signal";
    btn.classList.remove('secondary');
}

btn.addEventListener('click', () => {
    if (isPlaying) stop();
    else start();
});

window.setFreq = (l, r) => {
    leftIn.value = l;
    rightIn.value = r;
    if (isPlaying) {
        stop();
        start();
    }
};
