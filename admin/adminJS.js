const AdminJS = require('adminjs');
const AdminJSExpressjs = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const { adminJSCookieString } = require('../config');

const Ticker = require('../model/ticker');
const Transaction = require('../model/transaction');
const Price = require('../model/price');
const Admin = require('../model/admin');

const dashboard = require('./dashboard');

AdminJS.registerAdapter(AdminJSMongoose);

const adminBro = new AdminJS({
  resources: [
    Ticker,
    Transaction,
    Price,
  ],
  dashboard,
  rootPath: '/admin',
});

const router = AdminJSExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const admin = await Admin.findOne({ email });
    if (admin) {
      const matched = await admin.isValidPassword(password);
      if (matched) {
        return admin;
      }
    }
    return false;
  },
  cookiePassword: adminJSCookieString,
});

module.exports = router;
