const { portfolioQueue } = require('../queues/portfolio');

portfolioQueue.removeRepeatable({ repeat: { cron: '*/4 * * * *' } });

portfolioQueue.add(
  {},
  { repeat: { cron: '0 */4 * * *' }, timeout: 120 * 1000 },
);
