import { useState, useEffect } from 'react';
import { Search, CheckCircle, Plus } from 'lucide-react'; // Icons for consistent UI

const StockPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [stocks, setStocks] = useState([]); // Stock data
  const [filteredStocks, setFilteredStocks] = useState([]); // Filtered stock data
  const [watchlist, setWatchlist] = useState({}); // Watchlist state
  const [notification, setNotification] = useState(null); // Notification state

  // Simulated API call (replace with real data fetching in production)
  useEffect(() => {
    const fetchedStocks = [
      { name: 'Reliance Industries Ltd', symbol: 'RELIANCE.NS', price: 2814.40, change: 0.02, volume: 8694837 },
      { name: 'Tata Consultancy Serv Ltd', symbol: 'TCS.NS', price: 4266.10, change: 0.79, volume: 922953 },
      { name: 'HDFC Bank Ltd', symbol: 'HDFCBANK.NS', price: 1681.85, change: -0.01, volume: 8020873 },
      { name: 'Infosys Ltd', symbol: 'INFY.NS', price: 1926.90, change: 1.77, volume: 1943597 },
      { name: 'ICICI Bank Ltd', symbol: 'ICICIBANK.NS', price: 1255.15, change: -0.10, volume: 2977320 },
    ];

    setStocks(fetchedStocks);
    setFilteredStocks(fetchedStocks); // Initially display all stocks
  }, []);

  // Handle search filter
  useEffect(() => {
    setFilteredStocks(
      stocks.filter(stock =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, stocks]);

  // Toggle stock in watchlist
  const toggleWatchlist = (symbol) => {
    const updatedWatchlist = { ...watchlist, [symbol]: !watchlist[symbol] }; // Toggle watchlist status
    setWatchlist(updatedWatchlist);

    // Set notification for adding/removing stocks
    setNotification({
      message: updatedWatchlist[symbol] ? `${symbol} added to the watchlist` : `${symbol} removed from the watchlist`,
      type: updatedWatchlist[symbol] ? 'success' : 'error',
    });

    // Hide notification after 2 seconds
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 relative">
      {/* Notification Popup */}
      {notification && (
        <div
          className={`fixed top-4 right-4 py-2 px-4 rounded shadow-lg text-white ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">NSE Stock Screener</h1>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Filter stocks by name or symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 text-lg border-2 border-blue-500 rounded-full focus:outline-none focus:border-blue-700"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500" size={24} />
        </div>

        {/* Stock Table */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Name (Symbol)</th>
                  <th className="px-4 py-2 text-right">Price (₹)</th>
                  <th className="px-4 py-2 text-right">Change (%)</th>
                  <th className="px-4 py-2 text-right">Volume</th>
                  <th className="px-4 py-2 text-right">Watchlist</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock) => (
                  <tr key={stock.symbol} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-semibold">{stock.name}</div>
                      <div className="text-sm text-gray-600">{stock.symbol}</div>
                    </td>
                    <td className="px-4 py-3 text-right">{stock.price.toFixed(2)}</td>
                    <td className={`px-4 py-3 text-right ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-right">{stock.volume.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => toggleWatchlist(stock.symbol)}
                        className="relative"
                        title={watchlist[stock.symbol] ? '' : 'Add to watchlist'}
                      >
                        {watchlist[stock.symbol] ? (
                          <CheckCircle className="text-green-600" size={20} />
                        ) : (
                          <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center">
                            <Plus className="text-gray-400" size={16} />
                          </div>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPage;
