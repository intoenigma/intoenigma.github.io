const input = document.getElementById('habit-in');
const grid = document.getElementById('habit-grid');

let habits = JSON.parse(localStorage.getItem('habits')) || [];
const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function render() {
    grid.innerHTML = '';
    habits.forEach((habit, hIndex) => {
        const div = document.createElement('div');
        div.className = 'habit-card';

        let daysHtml = '';
        for (let i = 0; i < 7; i++) {
            const isChecked = habit.completed[i] ? 'checked' : '';
            daysHtml += `<div class="day-check ${isChecked}" onclick="toggleDay(${hIndex}, ${i})">${days[i]}</div>`;
        }

        div.innerHTML = `
            <div class="habit-header">
                <span class="habit-title">${habit.text}</span>
                <span class="remove-btn" onclick="removeHabit(${hIndex})">&times;</span>
            </div>
            <div class="week-grid">${daysHtml}</div>
        `;
        grid.appendChild(div);
    });
    localStorage.setItem('habits', JSON.stringify(habits));
}

function addHabit() {
    if (input.value) {
        habits.push({
            text: input.value,
            completed: [false, false, false, false, false, false, false]
        });
        input.value = '';
        render();
    }
}

function toggleDay(hIndex, dayIndex) {
    habits[hIndex].completed[dayIndex] = !habits[hIndex].completed[dayIndex];
    render();
}

function removeHabit(index) {
    habits.splice(index, 1);
    render();
}

window.addHabit = addHabit;
window.toggleDay = toggleDay;
window.removeHabit = removeHabit;
render();
