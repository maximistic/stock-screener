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

router.get('/gainers', async (req, res) => {
  try {
    const stocks = await stockService.getStockData(indianStockSymbols);
    const sortedStocks = stockService.sortStocksByChange(stocks, 'desc');
    res.json(sortedStocks);
  } catch (error) {
    res.status(500).send('Error fetching top gainers');
  }
});

router.get('/losers', async (req, res) => {
  try {
    const stocks = await stockService.getStockData(indianStockSymbols);
    const sortedStocks = stockService.sortStocksByChange(stocks, 'asc');
    res.json(sortedStocks);
  } catch (error) {
    res.status(500).send('Error fetching top losers');
  }
});

router.get('/top-volume', async (req, res) => {
  try {
    const stocks = await stockService.getStockData(indianStockSymbols);
    const sortedStocks = stockService.sortStocksByVolume(stocks, 'desc');
    res.json(sortedStocks);
  } catch (error) {
    res.status(500).send('Error fetching top volume stocks');
  }
});

router.get('/lowest-volume', async (req, res) => {
  try {
    const stocks = await stockService.getStockData(indianStockSymbols);
    const sortedStocks = stockService.sortStocksByVolume(stocks, 'asc');
    res.json(sortedStocks);
  } catch (error) {
    res.status(500).send('Error fetching lowest volume stocks');
  }
});

module.exports = router;
