const dateIn = document.getElementById('date-in');
const lenIn = document.getElementById('cycle-len');
const statusText = document.getElementById('status-text');
const dateText = document.getElementById('date-text');

// Load stored data
const stored = JSON.parse(localStorage.getItem('period_data'));
if(stored) {
    dateIn.value = stored.date;
    lenIn.value = stored.length;
    calculate();
}

function updateCycle() {
    if(dateIn.value && lenIn.value) {
        localStorage.setItem('period_data', JSON.stringify({
            date: dateIn.value,
            length: lenIn.value
        }));
        calculate();
    }
}

function calculate() {
    const start = new Date(dateIn.value);
    const length = parseInt(lenIn.value);
    
    // Check if start is valid
    if(isNaN(start.getTime())) return;
    
    const next = new Date(start);
    next.setDate(start.getDate() + length);
    
    const today = new Date();
    const diffTime = next - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    dateText.innerText = next.toDateString();
    
    if(diffDays > 0) {
        statusText.innerText = `Next Period in ${diffDays} days`;
    } else if (diffDays === 0) {
        statusText.innerText = `Expected Today`;
    } else {
        statusText.innerText = `Period was ${Math.abs(diffDays)} days ago`;
    }
}
