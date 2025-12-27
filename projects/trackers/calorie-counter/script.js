const nameIn = document.getElementById('food-name');
const calIn = document.getElementById('food-cal');
const list = document.getElementById('food-list');
const totalDisp = document.getElementById('total-cal');
const ring = document.getElementById('progress-ring');

let foods = JSON.parse(localStorage.getItem('calorie_foods')) || [];
const dailyGoal = 2000;

function render() {
    list.innerHTML = '';
    let total = 0;

    foods.forEach((f, index) => {
        total += f.cal;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${f.name}</span> 
            <div>
                <span>${f.cal}</span>
                <span class="delete-btn" onclick="removeFood(${index})">&times;</span>
            </div>
        `;
        list.appendChild(li);
    });

    totalDisp.innerText = total;
    const progress = Math.min((total / dailyGoal) * 100, 100);
    ring.setAttribute('stroke-dasharray', `${progress}, 100`);

    localStorage.setItem('calorie_foods', JSON.stringify(foods));
}

function addFood() {
    const name = nameIn.value;
    const cal = parseInt(calIn.value);

    if (name && cal) {
        foods.push({ name, cal });
        nameIn.value = '';
        calIn.value = '';
        render();
    }
}

function removeFood(index) {
    foods.splice(index, 1);
    render();
}

function resetDay() {
    if (confirm('Start new day?')) {
        foods = [];
        render();
    }
}

window.addFood = addFood;
window.removeFood = removeFood;
window.resetDay = resetDay;
render();
