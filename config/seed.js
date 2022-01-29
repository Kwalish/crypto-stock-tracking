const Admin = require('../model/admin');
const { adminCreds } = require('./index');

const createAdmin = async () => {
  try {
    const admin = await Admin.findOne({ email: adminCreds.email });
    if (!admin) Admin.create(adminCreds);
  } catch (e) {
    console.log('Admin account has already been created');
  }
};

createAdmin();
