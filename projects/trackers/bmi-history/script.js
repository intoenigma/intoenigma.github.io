const weightIn = document.getElementById('weight');
const heightIn = document.getElementById('height');
const list = document.getElementById('history-list');
const ctx = document.getElementById('chart').getContext('2d');

let historyData = JSON.parse(localStorage.getItem('bmi_history')) || [];

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: historyData.map((d, i) => `Entry ${i+1}`),
        datasets: [{
            label: 'BMI',
            data: historyData.map(d => d.bmi),
            borderColor: '#00f3ff',
            tension: 0.4
        }]
    },
    options: {
        scales: { y: { beginAtZero: false, grid: { color: '#333'} }, x: { grid: { display: false } } },
        plugins: { legend: { display: false } } // Simplified config
    }
});

function updateUI() {
    list.innerHTML = '';
    historyData.forEach(d => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${d.date}</span> <span style="color:${getColor(d.bmi)}">${d.bmi}</span>`;
        list.prepend(li);
    });
    
    // Update chart
    chart.data.labels = historyData.map(d => d.date);
    chart.data.datasets[0].data = historyData.map(d => d.bmi);
    chart.update();
    
    localStorage.setItem('bmi_history', JSON.stringify(historyData));
}

function getColor(bmi) {
    if(bmi < 18.5) return '#ffee00';
    if(bmi < 25) return '#00ff41';
    if(bmi < 30) return '#ffaa00';
    return '#ff0055';
}

function addEntry() {
    const w = parseFloat(weightIn.value);
    const h = parseFloat(heightIn.value);
    if(!w || !h) return;
    
    const bmi = (w / ((h/100)**2)).toFixed(1);
    const date = new Date().toLocaleDateString();
    
    historyData.push({ bmi, date });
    updateUI();
    weightIn.value = '';
    heightIn.value = '';
}

function clearData() {
    if(confirm('Clear history?')) {
        historyData = [];
        updateUI();
    }
}

updateUI();
