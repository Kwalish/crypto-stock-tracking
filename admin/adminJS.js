const AdminJS = require('adminjs');
const AdminJSExpressjs = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const { adminJSCookieString } = require('../config');

const TickerResource = require('./resources/ticker');
const TransactionResource = require('./resources/transaction');
const UserResource = require('./resources/user');
const PriceResource = require('./resources/price');

// user for authentication
const User = require('../model/user');

const dashboard = require('./dashboard');

AdminJS.registerAdapter(AdminJSMongoose);

const adminBro = new AdminJS({
  resources: [
    TickerResource,
    TransactionResource,
    UserResource,
    PriceResource,
  ],
  dashboard,
  rootPath: '/admin',
});

const router = AdminJSExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const admin = await User.findOne({ email });
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
