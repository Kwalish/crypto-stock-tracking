const { portfolioQueue } = require('../queues/portfolio');

portfolioQueue.removeRepeatable({ repeat: { cron: '*/4 * * * *' } });

portfolioQueue.add(
  {},
  { repeat: { cron: '0 8 * * *' }, timeout: 120 * 1000 },
);
