const AdminJS = require('adminjs');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
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

    const yesterday = moment()
      .tz('Asia/Seoul')
      .subtract(1, 'days')
      .startOf('day')
      .toString();

    const currentValue = await Transaction.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$ticker', amount: { $sum: '$amount' }, price: { $sum: '$price' } } },
      {
        $lookup: {
          from: 'prices',
          as: 'prices',
          let: { tickerID: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$ticker', '$$tickerID'] },
                    { $lte: ['$dateCreated', yesterday] },
                  ],
                },
              },
            },
          ],
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
          todayPrice: { $last: '$prices' },
          yesterdayPrice: { $first: '$prices' },
          ticker: { $last: '$tickers' },
        },
      },
      {
        $set: {
          todayValue: { $multiply: ['$amount', '$todayPrice.price'] },
          yesterdayValue: { $multiply: ['$amount', '$yesterdayPrice.price'] },
        },
      },
      {
        $set: {
          todayProfit: { $subtract: ['$todayValue', '$todayPrice.price'] },
          yesterdayProfit: { $subtract: ['$yesterdayValue', '$yesterdayPrice.price'] },
        },
      },
      {
        $project: {
          ticker: '$ticker.ticker',
          purchase: '$amount',
          todayValue: 1,
          todayProfit: 1,
          yesterdayValue: 1,
          yesterdayProfit: 1,
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
