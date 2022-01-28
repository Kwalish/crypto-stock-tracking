const mongoose = require('mongoose');

const { Schema } = mongoose;

const tickerSchema = new Schema({
  ticker: {
    type: String,
    required: true,
  },
});

const Ticker = mongoose.model('Ticker', tickerSchema);

module.exports = Ticker;
