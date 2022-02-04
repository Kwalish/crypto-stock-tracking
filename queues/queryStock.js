const Queue = require('bull');
const Price = require('../model/price');
const { redisBullObj } = require('../config');
const queryStockAPI = require('../utils/queryStockAPI');

const queryStockQueue = new Queue('query_Crypto', redisBullObj);

queryStockQueue.process(async (job, done) => {
  const { ticker } = job.data.ticker;
  const price = await queryStockAPI(ticker);
  done(null, { ticker, price });
});

queryStockQueue.on('completed', async (job) => {
  const { ticker } = job.data;
  const { price } = job.returnvalue;
  await Price.create({ price, ticker, date: new Date() });
  console.log('[INFO] Updated Price');
});

module.exports = { queryStockQueue };
