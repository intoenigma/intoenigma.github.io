const input = document.getElementById('city');
const btn = document.getElementById('search-btn');
const card = document.getElementById('weather-card');
const tempEl = document.getElementById('temp');
const descEl = document.getElementById('desc');
const windEl = document.getElementById('wind');
const humidEl = document.getElementById('humid');

btn.addEventListener('click', async () => {
    const city = input.value.trim();
    if(!city) return;
    
    try {
        // 1. Geocoding
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        const geoData = await geoRes.json();
        
        if(!geoData.results || geoData.results.length === 0) {
            alert("City not found");
            return;
        }
        
        const { latitude, longitude, name } = geoData.results[0];
        
        // 2. Weather
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherRes.json();
        
        const current = weatherData.current_weather;
        
        tempEl.textContent = `${current.temperature}°C`;
        
        // WMO Code interpretation (Simple)
        const code = current.weathercode;
        let desc = "Clear";
        if(code > 0 && code < 3) desc = "Partly Cloudy";
        else if(code >= 3 && code < 50) desc = "Foggy";
        else if(code >= 50 && code < 80) desc = "Rainy";
        else if(code >= 80) desc = "Stormy";
        
        descEl.textContent = `${desc} in ${name}`;
        
        windEl.textContent = `Wind: ${current.windspeed} km/h`;
        humidEl.textContent = `Dir: ${current.winddirection}°`; // OpenMeteo basic doesn't give humidity in current_weather
        
        card.classList.remove('hidden');
    } catch(e) {
        alert("Error fetching data");
    }
});
