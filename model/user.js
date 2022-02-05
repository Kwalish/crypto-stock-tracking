const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// bcrypt not working with arrow function
// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

// bcrypt not working with arrow function
// eslint-disable-next-line func-names
userSchema.pre('findOneAndUpdate', async function () {
  // eslint-disable-next-line no-underscore-dangle
  this._update.password = await bcrypt.hash(this._update.$set.password, 10);
});

// eslint-disable-next-line func-names
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
