const yahooFinance = require('yahoo-finance2');
const axios = require('axios');
const { fcsapiKey } = require('../config');

const queryStockAPI = async (ticker) => {
  const quote = await yahooFinance.default.quote(ticker);
  const { regularMarketPrice, currency } = quote;

  let price;
  if (currency !== 'EUR') {
    const response = await axios.get(`https://fcsapi.com/api-v3/forex/latest?symbol=${currency}/EUR&access_key=${fcsapiKey}`);
    const { c: conversion } = response.data.response[0];
    price = conversion * regularMarketPrice;
  } else {
    price = regularMarketPrice;
  }
  return price;
};

module.exports = queryStockAPI;
