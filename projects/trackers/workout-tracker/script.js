const nameIn = document.getElementById('ex-name');
const setsIn = document.getElementById('ex-sets');
const list = document.getElementById('log-list');

let logs = JSON.parse(localStorage.getItem('workout_log')) || [];

function render() {
    list.innerHTML = '';
    logs.forEach((log, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${log.name}</span>
            <span class="sets">${log.sets}</span>
        `;
        list.appendChild(li);
    });
    localStorage.setItem('workout_log', JSON.stringify(logs));
}

function addExercise() {
    if (nameIn.value && setsIn.value) {
        logs.push({ name: nameIn.value, sets: setsIn.value });
        nameIn.value = '';
        setsIn.value = '';
        render();
    }
}

function clearLog() {
    if (confirm('Clear Log?')) {
        logs = [];
        render();
    }
}
window.addExercise = addExercise;
window.clearLog = clearLog;
render();
