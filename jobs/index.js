const { portfolioQueue } = require('../queues/portfolio');

portfolioQueue.add();

portfolioQueue.add(
  {},
  { repeat: { cron: '0 */4 * * *' }, timeout: 120 * 1000 },
);
