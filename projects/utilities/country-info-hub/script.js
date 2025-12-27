const searchBtn = document.getElementById('search-btn');
const input = document.getElementById('search-input');
const result = document.getElementById('result');

const els = {
    flag: document.getElementById('flag'),
    name: document.getElementById('country-name'),
    capital: document.getElementById('capital'),
    population: document.getElementById('population'),
    region: document.getElementById('region'),
    currency: document.getElementById('currency')
};

searchBtn.addEventListener('click', () => {
    const query = input.value.trim();
    if (query) fetchCountry(query);
});

async function fetchCountry(name) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        if (!res.ok) throw new Error('Not Found');

        const data = await res.json();
        const country = data[0];

        els.flag.src = country.flags.svg;
        els.name.textContent = country.name.common;
        els.capital.textContent = country.capital ? country.capital[0] : 'N/A';
        els.population.textContent = country.population.toLocaleString();
        els.region.textContent = country.region;
        els.currency.textContent = Object.values(country.currencies)[0].name;

        result.classList.remove('hidden');
    } catch (err) {
        alert("Country not found. Try 'USA', 'India', 'Japan'.");
        result.classList.add('hidden');
    }
}
