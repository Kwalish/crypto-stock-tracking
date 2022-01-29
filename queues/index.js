const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { portfolioQueue } = require('./portfolio');
const { queryCryptoQueue } = require('./queryCrypto');

const serverAdapter = new ExpressAdapter();

const {
  addQueue, removeQueue, setQueues, replaceQueues
} = createBullBoard({
  queues: [
    new BullAdapter(portfolioQueue),
    new BullAdapter(queryCryptoQueue),
  ],
  serverAdapter,
});

serverAdapter.setBasePath('/admin/queues');

const router = serverAdapter.getRouter();

module.exports = router;
