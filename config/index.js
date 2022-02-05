const redisBullParser = require('redis-bull-parser');
require('dotenv').config();

const dbUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/portfoliotracking';
const coinMarketCapKey = process.env.COINMARKETCAPKEY || '';
const fcsapiKey = process.env.FCSAPIKEY || '';
const adminJSCookieString = process.env.ADMIN_JS_COOKIE_STRING || 'super-secret';
const adminCreds = {
  email: process.env.ADMIN_EMAIL || 'admin@test.com',
  password: process.env.ADMIN_PASSWORD || 'secret',
  isAdmin: true,
};
const redisBullObj = redisBullParser(process.env.REDIS_URL);

module.exports = {
  dbUrl,
  coinMarketCapKey,
  fcsapiKey,
  adminJSCookieString,
  adminCreds,
  redisBullObj,
};
