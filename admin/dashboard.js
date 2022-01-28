const AdminJS = require('adminjs');
const Transaction = require('../model/transaction');
const Price = require('../model/price');

module.exports = {
  handler: async () => {
    const totalSpent = await Transaction.aggregate([
      { $group: { _id: null, amount: { $sum: '$price' } } },
    ]);
    const portfolio = await Transaction.aggregate([
      { $group: { _id: '$ticker', amount: { $sum: '$amount' }, price: { $sum: '$price' } } },
    ]);
    const prices = await Price.find({}).populate('ticker');

    const currentValue = portfolio.map((investment) => {
      const price = prices
        .filter((uniprice) => uniprice.ticker._id.toString() === investment._id.toString());
      const currentPrice = price[0].price * investment.amount;
      const currentProfit = currentPrice - investment.price;
      return {
        ticker: price[0].ticker.ticker,
        purchase: investment.amount,
        value: currentPrice,
        profit: currentProfit,
      };
    });
  
    return {
      totalSpent: totalSpent[0].amount,
      currentValue,
    };
  },
  component: AdminJS.bundle('./components/Dashboard.jsx'),
};
