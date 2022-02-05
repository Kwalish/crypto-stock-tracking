const User = require('../model/user');
const { adminCreds } = require('./index');

const createAdmin = async () => {
  try {
    const admin = await User.findOne({ email: adminCreds.email });
    if (!admin) User.create(adminCreds);
  } catch (e) {
    console.log('Admin account has already been created');
  }
};

createAdmin();
