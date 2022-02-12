const yahooFinance = require('yahoo-finance2');
const { exchangeRates } = require('exchange-rates-api');

const queryStockAPI = async (ticker) => {
  const quote = await yahooFinance.default.quote(ticker);
  const { regularMarketPrice, currency } = quote;

  let price;
  if (currency !== 'EUR') {
    const conversion = await exchangeRates()
      .setApiBaseUrl('https://api.exchangerate.host')
      .latest()
      .symbols(currency)
      .fetch();
    price = regularMarketPrice / conversion;
  } else {
    price = regularMarketPrice;
  }
  return price;
};

module.exports = queryStockAPI;
