const axios = require('axios');
const { coinMarketCapKey } = require('../config');

const queryCryptoAPI = async (ticker) => {
  const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${ticker}&convert=EUR`, {
    headers: {
      'X-CMC_PRO_API_KEY': coinMarketCapKey,
    },
  });
  const { price } = response.data.data[ticker].quote.EUR;
  return price;
};

module.exports = queryCryptoAPI;
