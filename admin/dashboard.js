const AdminJS = require('adminjs');
const mongoose = require('mongoose');
const Transaction = require('../model/transaction');
const Price = require('../model/price');

module.exports = {
  handler: async (context) => {
    const { adminUser: { _id: userId } } = context.session;
    const totalSpent = await Transaction.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, amount: { $sum: '$price' } } },
    ]);

    const lastUpdatedAt = await Price.findOne().sort({ date: -1 });

    const currentValue = await Transaction.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$ticker', amount: { $sum: '$amount' }, price: { $sum: '$price' } } },
      {
        $lookup: {
          from: 'prices',
          localField: '_id',
          foreignField: 'ticker',
          as: 'prices',
        },
      },
      {
        $lookup: {
          from: 'tickers',
          localField: '_id',
          foreignField: '_id',
          as: 'tickers',
        },
      },
      {
        $set: {
          currentPrice: { $last: '$prices' },
          ticker: { $last: '$tickers' },
        },
      },
      {
        $set: {
          value: { $multiply: ['$amount', '$currentPrice.price'] },
        },
      },
      {
        $set: {
          profit: { $subtract: ['$value', '$price']},
        },
      },
      {
        $project: {
          ticker: '$ticker.ticker',
          purchase: '$amount',
          value: 1,
          profit: 1,
        },
      },
    ]);

    const currentPlatforms = await Transaction.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'prices',
          localField: 'ticker',
          foreignField: 'ticker',
          as: 'prices',
        },
      },
      {
        $set: {
          currentPrice: { $last: '$prices' },
        },
      },
      {
        $set: {
          value: { $multiply: ['$amount', '$currentPrice.price'] },
        },
      },
      { $group: { _id: '$platform', value: { $sum: '$value' } } },
    ]);

    return {
      totalSpent: totalSpent[0].amount,
      currentValue,
      lastUpdatedAt,
      currentPlatforms,
    };
  },
  component: AdminJS.bundle('./components/Dashboard.jsx'),
};
