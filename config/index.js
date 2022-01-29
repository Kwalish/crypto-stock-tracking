const dbUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/portfoliotracking';
const coinMarketCapKey = process.env.COINMARKETCAPKEY || '';

module.exports = {
  dbUrl,
  coinMarketCapKey,
};
