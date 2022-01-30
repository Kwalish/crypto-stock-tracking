const Queue = require('bull');
const Price = require('../model/price');
const { redisBullObj } = require('../config');
const queryCryptoAPI = require('../utils/queryCryptoAPI');

const queryCryptoQueue = new Queue('query_Crypto', redisBullObj);

queryCryptoQueue.process(async (job, done) => {
  const { ticker } = job.data.ticker;
  const price = await queryCryptoAPI(ticker);
  done(null, { ticker, price });
});

queryCryptoQueue.on('completed', async (job) => {
  const { ticker } = job.data;
  const { price } = job.returnvalue;
  await Price.create({ price, ticker, date: new Date() });
  console.log('[INFO] Updated Price');
});

module.exports = { queryCryptoQueue };
