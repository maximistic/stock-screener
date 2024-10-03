// routes/stocks.js
const express = require('express');
const router = express.Router();
const stockService = require('../services/stockService');

// Example symbols for Indian stocks
const indianStockSymbols = ['RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS'];

router.get('/', async (req, res) => {
  try {
    const stocks = await stockService.getStockData(indianStockSymbols);
    res.json(stocks);
  } catch (error) {
    res.status(500).send('Error fetching stocks');
  }
});

module.exports = router;
