const yahooFinance = require('yahoo-finance2');
const queryExchangeRateAPI = require('./queryExchangeRateAPI');

const queryStockAPI = async (ticker) => {
  const quote = await yahooFinance.default.quote(ticker);
  const { regularMarketPrice, currency } = quote;

  const conversion = await queryExchangeRateAPI(currency);
  const price = regularMarketPrice / conversion;
  return price;
};

module.exports = queryStockAPI;
