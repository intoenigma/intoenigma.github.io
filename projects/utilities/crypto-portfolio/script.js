const grid = document.getElementById('ticker-grid');

async function fetchPrices() {
    grid.innerHTML = '<div class="loader">Updating...</div>';

    // Using CoinGecko Free API
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin,ripple,cardano,solana&order=market_cap_desc');
        const data = await res.json();

        grid.innerHTML = '';
        data.forEach(coin => {
            const el = document.createElement('div');
            el.className = 'ticker-card';

            const changeClass = coin.price_change_percentage_24h >= 0 ? 'up' : 'down';
            const sign = coin.price_change_percentage_24h >= 0 ? '+' : '';

            el.innerHTML = `
                <img src="${coin.image}" width="30" style="margin-bottom:0.5rem; border-radius:50%;">
                <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
                <div class="price">$${coin.current_price.toLocaleString()}</div>
                <div class="change ${changeClass}">${sign}${coin.price_change_percentage_24h.toFixed(2)}%</div>
            `;
            grid.appendChild(el);
        });
    } catch (e) {
        grid.innerHTML = '<div class="loader">API Limit or Error. Try later.</div>';
    }
}

fetchPrices();
