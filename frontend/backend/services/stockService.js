// services/stockService.js
const yahooFinance = require('yahoo-finance2').default;

const getStockData = async (symbols) => {
  try {
    const result = await yahooFinance.quote(symbols);
    return result;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

const sortStocksByChange = (stocks, direction = 'desc') => {
  return stocks.sort((a, b) => direction === 'asc'
    ? a.regularMarketChangePercent - b.regularMarketChangePercent
    : b.regularMarketChangePercent - a.regularMarketChangePercent);
};

const sortStocksByVolume = (stocks, direction = 'desc') => {
  return stocks.sort((a, b) => direction === 'asc'
    ? a.regularMarketVolume - b.regularMarketVolume
    : b.regularMarketVolume - a.regularMarketVolume);
};

module.exports = {
  getStockData,
  sortStocksByChange,
  sortStocksByVolume
};