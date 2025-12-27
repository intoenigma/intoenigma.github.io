const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('task-list');
const progressBar = document.getElementById('progress-bar');
const stats = document.getElementById('stats');
const clearBtn = document.getElementById('clear-btn');

let tasks = JSON.parse(localStorage.getItem('ie_tasks')) || [];

function render() {
    list.innerHTML = '';
    let completed = 0;

    tasks.forEach((task, index) => {
        if (task.done) completed++;

        const li = document.createElement('li');
        li.className = `task-item ${task.done ? 'completed' : ''}`;

        li.innerHTML = `
            <div class="checkbox" onclick="toggle(${index})"></div>
            <span onclick="toggle(${index})">${task.text}</span>
            <button class="delete-btn" onclick="remove(${index})">&times;</button>
        `;
        list.appendChild(li);
    });

    const percent = tasks.length === 0 ? 0 : (completed / tasks.length) * 100;
    progressBar.style.width = `${percent}%`;
    stats.textContent = `${completed} / ${tasks.length} Done`;

    localStorage.setItem('ie_tasks', JSON.stringify(tasks));
}

addBtn.addEventListener('click', () => {
    if (input.value.trim()) {
        tasks.push({ text: input.value, done: false });
        input.value = '';
        render();
    }
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
});

window.toggle = (idx) => {
    tasks[idx].done = !tasks[idx].done;
    render();
};

window.remove = (idx) => {
    tasks.splice(idx, 1);
    render();
};

clearBtn.addEventListener('click', () => {
    tasks = [];
    render();
});

render();
