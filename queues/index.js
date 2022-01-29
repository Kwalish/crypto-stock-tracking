const { createBullBoard } = require('bull-board');
const { BullAdapter } = require('bull-board/bullAdapter');
const { portfolioQueue } = require('./portfolio');
const { queryCryptoQueue } = require('./queryCrypto');

const { router } = createBullBoard([
  new BullAdapter(portfolioQueue),
  new BullAdapter(queryCryptoQueue),
]);

module.exports = router;
