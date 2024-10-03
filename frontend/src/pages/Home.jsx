import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, CheckCircle, Plus } from 'lucide-react'; // Adjust imports
import { useNavigate } from 'react-router-dom'; // For navigation to reqpage

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [watchlist, setWatchlist] = useState({});
  const [notification, setNotification] = useState(null); // Notification state
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch stocks from the backend API
    const fetchStocks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stocks'); // Adjust the URL if needed
        const data = await response.json();
        setStocks(data);
        setFilteredStocks(data); // Initialize filtered stocks
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };
    fetchStocks();
  }, []);

  useEffect(() => {
    // Filter stocks based on search term
    setFilteredStocks(
      stocks.filter(stock =>
        stock.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, stocks]);

  const handleFilter = (criteria) => {
    let filtered = [];
    switch (criteria) {
      case 'topGainer':
        filtered = [...stocks].sort((a, b) => b.regularMarketChangePercent - a.regularMarketChangePercent);
        break;
      case 'topLoser':
        filtered = [...stocks].sort((a, b) => a.regularMarketChangePercent - b.regularMarketChangePercent);
        break;
      case 'topVolume':
        filtered = [...stocks].sort((a, b) => b.regularMarketVolume - a.regularMarketVolume);
        break;
      case 'lowestVolume':
        filtered = [...stocks].sort((a, b) => a.regularMarketVolume - b.regularMarketVolume);
        break;
      case 'allStocks':
        filtered = stocks; // Reset to all stocks
        break;
      default:
        filtered = stocks; // Fallback
    }
    setFilteredStocks(filtered);
    setIsFilterOpen(false);
  };

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

  const handleExplore = () => {
    navigate('/reqpage'); // Redirect to /reqpage
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

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Indian Stock Screener</h1>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search for stocks by name or symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 text-lg border-2 border-blue-500 rounded-full focus:outline-none focus:border-blue-700"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500" size={24} />
          </div>

          <div className="relative mb-4">
            <button
              className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              Filter by <ChevronDown className="ml-2" size={20} />
            </button>
            {isFilterOpen && (
              <div className="absolute mt-2 bg-white border rounded shadow-lg z-10 w-full">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleFilter('topGainer')}>Top Gainer</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleFilter('topLoser')}>Top Loser</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleFilter('topVolume')}>Top Volume</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleFilter('lowestVolume')}>Lowest Volume</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleFilter('allStocks')}>All Stocks</button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Stocks</h2>
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
                {filteredStocks.map(stock => (
                  <tr key={stock.symbol} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-semibold">{stock.shortName}</div>
                      <div className="text-sm text-gray-600">{stock.symbol}</div>
                    </td>
                    <td className="px-4 py-3 text-right">{stock.regularMarketPrice.toFixed(2)}</td>
                    <td className={`px-4 py-3 text-right ${stock.regularMarketChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.regularMarketChangePercent >= 0 ? '+' : ''}{stock.regularMarketChangePercent.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-right">{stock.regularMarketVolume.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => toggleWatchlist(stock.symbol)}
                        className="relative"
                        title={watchlist[stock.symbol] ? '' : 'Add to watchlist'} // Tooltip
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

        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            onClick={handleExplore} // Navigate to reqpage
          >
            Explore all stocks
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
