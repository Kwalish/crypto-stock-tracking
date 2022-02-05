const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  ticker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticker',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
