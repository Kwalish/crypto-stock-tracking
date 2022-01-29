const dbUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/portfoliotracking';
const coinMarketCapKey = process.env.COINMARKETCAPKEY || '';
const adminJSCookieString = process.env.ADMIN_JS_COOKIE_STRING || 'super-secret';
const adminCreds = {
  email: process.env.ADMIN_EMAIL || 'admin@test.com',
  password: process.env.ADMIN_PASSWORD || 'secret',
};

module.exports = {
  dbUrl,
  coinMarketCapKey,
  adminJSCookieString,
  adminCreds,
};
