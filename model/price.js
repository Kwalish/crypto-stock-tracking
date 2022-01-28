const mongoose = require('mongoose');

const { Schema } = mongoose;

const priceSchema = new Schema({
  ticker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticker',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Price = mongoose.model('Price', priceSchema);

module.exports = Price;
