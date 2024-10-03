// services/stockService.js
const yahooFinance = require('yahoo-finance2').default;

const getStockData = async (symbols) => {
  try {
    // Fetch data for the provided stock symbols
    const result = await yahooFinance.quote(symbols);
    return result;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

module.exports = {
  getStockData,
};
