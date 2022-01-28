const AdminJS = require('adminjs');
const AdminJSExpressjs = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');

const Ticker = require('../model/ticker');
const Transaction = require('../model/transaction');
const Price = require('../model/price');

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

const router = AdminJSExpressjs.buildRouter(adminBro);

module.exports = router;
