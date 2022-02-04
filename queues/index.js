const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { portfolioQueue } = require('./portfolio');
const { queryCryptoQueue } = require('./queryCrypto');
const { queryStockQueue } = require('./queryStock');

const serverAdapter = new ExpressAdapter();

const {
  addQueue, removeQueue, setQueues, replaceQueues
} = createBullBoard({
  queues: [
    new BullAdapter(portfolioQueue),
    new BullAdapter(queryCryptoQueue),
    new BullAdapter(queryStockQueue),
  ],
  serverAdapter,
});

serverAdapter.setBasePath('/admin/queues');

module.exports = serverAdapter;
