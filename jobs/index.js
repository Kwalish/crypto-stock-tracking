const { portfolioQueue } = require('../queues/portfolio');

console.log('[INFO] test')

portfolioQueue.add({});

portfolioQueue.add(
  {},
  { repeat: { cron: '0 */4 * * *' }, timeout: 120 * 1000 },
);
