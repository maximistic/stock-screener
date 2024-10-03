import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

// Dummy stocks data
const dummyStocks = [
  { name: 'Reliance Industries', symbol: 'RELIANCE', price: 2500.50, change: 1.5, volume: 1000000 },
  { name: 'Tata Consultancy Services', symbol: 'TCS', price: 3450.75, change: -0.5, volume: 750000 },
  { name: 'HDFC Bank', symbol: 'HDFCBANK', price: 1600.80, change: 2.0, volume: 900000 },
  { name: 'Infosys', symbol: 'INFY', price: 1800.25, change: 0.5, volume: 800000 },
  { name: 'ICICI Bank', symbol: 'ICICIBANK', price: 700.40, change: -1.0, volume: 950000 },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stocks, setStocks] = useState(dummyStocks);
  const [filteredStocks, setFilteredStocks] = useState(dummyStocks);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    // Filter stocks based on search term
    setFilteredStocks(
      stocks.filter(stock =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, stocks]);

  const handleSort = (criteria) => {
    const sortedStocks = [...filteredStocks].sort((a, b) => {
      switch (criteria) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'change':
          return b.change - a.change;
        case 'volume':
          return b.volume - a.volume;
        default:
          return 0;
      }
    });
    setFilteredStocks(sortedStocks);
    setIsSortOpen(false);
  };

  const handleFilter = () => {
    // Placeholder for filter functionality
    alert("Filter functionality to be implemented");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
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

          <div className="flex justify-between mb-4">
            <button 
              className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              onClick={handleFilter}
            >
              <Filter className="mr-2" size={20} /> Filter
            </button>
            <div className="relative">
              <button 
                className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                Sort by <ChevronDown className="ml-2" size={20} />
              </button>
              {isSortOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleSort('name')}>Name</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleSort('price')}>Price</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleSort('change')}>% Change</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleSort('volume')}>Volume</button>
                </div>
              )}
            </div>
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
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map(stock => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;