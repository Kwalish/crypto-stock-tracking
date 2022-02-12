const { exchangeRates } = require('exchange-rates-api');

const queryExchangeRateAPI = async (currency) => {
  let conversion = 1;
  if (currency !== 'EUR') {
    conversion = await exchangeRates()
      .setApiBaseUrl('https://api.exchangerate.host')
      .latest()
      .symbols(currency)
      .fetch();
  }
  return conversion;
};

module.exports = queryExchangeRateAPI;
