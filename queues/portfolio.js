const Queue = require('bull');
const Ticker = require('../model/ticker');
const { queryCryptoQueue } = require('./queryCrypto');
const { redisUrl } = require('../config');
console.log(redisUrl)
const portfolioQueue = new Queue('portfolio_Update', redisUrl);

portfolioQueue.process(async (job, done) => {
  const tickers = await Ticker.find({});
  tickers.forEach((ticker) => {
    queryCryptoQueue.add({ ticker });
  });
  done();
});

portfolioQueue.on('completed', async () => {
  console.log('[INFO] Created queries for finance API');
});

module.exports = { portfolioQueue };
