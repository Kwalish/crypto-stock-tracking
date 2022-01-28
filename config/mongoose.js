const mongoose = require('mongoose');

const { dbUrl } = require('./index');

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
