export const commodities = ['Food', 'Drink', 'Meds', 'Bullets'];
export let marketPrices = {};

export function initMarket() {
    commodities.forEach(commodity => {
        marketPrices[commodity] = Math.floor(Math.random() * 100) + 50;
    });
}

export function updateMarket() {
    commodities.forEach(commodity => {
        const change = Math.floor(Math.random() * 21) - 10;
        marketPrices[commodity] = Math.max(10, Math.min(200, marketPrices[commodity] + change));
    });
}

export function updateMarketDisplay() {
    const marketElement = document.getElementById('market');
    marketElement.innerHTML = '<h3>Market</h3>';
    for (const [commodity, price] of Object.entries(marketPrices)) {
        marketElement.innerHTML += `${commodity}: $${price}<br>`;
    }
}
