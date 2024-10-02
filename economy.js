export const drugs = ['Weed', 'Cocaine', 'Heroin', 'Meth'];
export let marketPrices = {};

export function initMarket() {
    drugs.forEach(drug => {
        marketPrices[drug] = Math.floor(Math.random() * 100) + 50;
    });
}

export function updateMarket() {
    drugs.forEach(drug => {
        const change = Math.floor(Math.random() * 21) - 10;
        marketPrices[drug] = Math.max(10, Math.min(200, marketPrices[drug] + change));
    });
}

export function updateMarketDisplay() {
    const marketElement = document.getElementById('market');
    marketElement.innerHTML = '<h3>Drug Market</h3>';
    for (const [drug, price] of Object.entries(marketPrices)) {
        marketElement.innerHTML += `${drug}: $${price}<br>`;
    }
}
