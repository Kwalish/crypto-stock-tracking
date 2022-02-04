const Queue = require('bull');
const Ticker = require('../model/ticker');
const { queryCryptoQueue } = require('./queryCrypto');
const { queryStockQueue } = require('./queryStock');
const { redisBullObj } = require('../config');

const portfolioQueue = new Queue('portfolio_Update', redisBullObj);

portfolioQueue.process(async (job, done) => {
  const tickers = await Ticker.find({});
  tickers.forEach((ticker) => {
    if (ticker.type === 'crypto') {
      queryCryptoQueue.add({ ticker }, { attempts: 5 });
    } else if (ticker.type === 'stock') {
      queryStockQueue.add({ ticker }, { attempts: 5 });
    }
  });
  done();
});

portfolioQueue.on('completed', async () => {
  console.log('[INFO] Created queries for finance API');
});

module.exports = { portfolioQueue };
