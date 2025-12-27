const ring = document.getElementById('step-ring');
const countEl = document.getElementById('step-count');
let steps = parseInt(localStorage.getItem('steps')) || 0;
const goal = 10000;

function update() {
    countEl.innerText = steps;
    const progress = Math.min((steps / goal) * 100, 100);
    ring.setAttribute('stroke-dasharray', `${progress}, 100`);
    localStorage.setItem('steps', steps);
}

function addSteps(n) {
    steps += n;
    update();
}
function reset() {
    if (confirm('Reset steps?')) {
        steps = 0;
        update();
    }
}
window.addSteps = addSteps;
window.reset = reset;
update();
