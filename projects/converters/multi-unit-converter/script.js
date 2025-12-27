const categories = {
    length: {
        units: ['Meters', 'Kilometers', 'Feet', 'Miles', 'Inches'],
        rates: { 'Meters': 1, 'Kilometers': 0.001, 'Feet': 3.28084, 'Miles': 0.000621371, 'Inches': 39.3701 }
    },
    weight: {
        units: ['Kilograms', 'Grams', 'Pounds', 'Ounces'],
        rates: { 'Kilograms': 1, 'Grams': 1000, 'Pounds': 2.20462, 'Ounces': 35.274 }
    },
    temp: {
        units: ['Celsius', 'Fahrenheit', 'Kelvin']
        // Temp needs special logic
    }
};

let currentCat = 'length';
const fromVal = document.getElementById('from-val');
const toVal = document.getElementById('to-val');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const btns = document.querySelectorAll('.cat-btn');

function setCategory(cat) {
    currentCat = cat;
    btns.forEach(b => b.classList.remove('active'));
    // Finding button is hard without ID, assume clicking calls this
    // Just re-render
    const units = categories[cat].units;
    fromUnit.innerHTML = units.map(u => `<option value="${u}">${u}</option>`).join('');
    toUnit.innerHTML = units.map(u => `<option value="${u}">${u}</option>`).join('');
    // Default selection
    toUnit.selectedIndex = 1; 
    convert();
}

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        btns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        // logic handled by onclick inline for simplicity in HTML, 
        // but for event listener cleanliness, let's trust the HTML inline or add logic here.
        // Actually the inline onclick handles the logic call.
    });
});

function convert() {
    const val = parseFloat(fromVal.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (isNaN(val)) {
        toVal.value = '';
        return;
    }

    if (currentCat === 'temp') {
        let result;
        // Base to Celsius
        let c;
        if (from === 'Celsius') c = val;
        else if (from === 'Fahrenheit') c = (val - 32) * 5/9;
        else if (from === 'Kelvin') c = val - 273.15;

        // Celsius to Target
        if (to === 'Celsius') result = c;
        else if (to === 'Fahrenheit') result = (c * 9/5) + 32;
        else if (to === 'Kelvin') result = c + 273.15;

        toVal.value = result.toFixed(2);
    } else {
        const rates = categories[currentCat].rates;
        // Convert to base (unit with rate 1)
        const base = val / rates[from];
        // Convert base to target
        const result = base * rates[to];
        toVal.value = result.toFixed(4);
    }
}

fromVal.addEventListener('input', convert);
fromUnit.addEventListener('change', convert);
toUnit.addEventListener('change', convert);

// Init
setCategory('length');
document.querySelector('.cat-btn').classList.add('active');
