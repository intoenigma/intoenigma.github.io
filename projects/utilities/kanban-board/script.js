let cardCount = 4;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const card = document.getElementById(data);

    // Drop logic: needs to land in .task-list or .column logic
    // Usually target is .card or .task-list. 
    // If dropped on .card, insert before/after. Simple: append to column list.

    let target = ev.target;
    // Walk up to find .column or .task-list
    while (!target.classList.contains('column') && target !== document.body) {
        target = target.parentElement;
    }

    if (target.classList.contains('column')) {
        const list = target.querySelector('.task-list');
        list.appendChild(card);
    }
}

function addTask() {
    const input = document.getElementById('new-task');
    const text = input.value.trim();
    if (!text) return;

    const div = document.createElement('div');
    div.className = 'card';
    div.draggable = true;
    div.id = `card-${cardCount++}`;
    div.textContent = text;
    div.ondragstart = drag;

    document.getElementById('todo').appendChild(div);
    input.value = '';
}
