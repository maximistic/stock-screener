import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, Clock, DollarSign, Percent, BarChart2, TrendingUp, TrendingDown, Layers } from 'lucide-react';

// Mock data for the chart
const chartData = [
  { date: '2024-01', price: 1500 },
  { date: '2024-02', price: 1600 },
  { date: '2024-03', price: 1550 },
  { date: '2024-04', price: 1700 },
  { date: '2024-05', price: 1650 },
  { date: '2024-06', price: 1800 },
];

// Mock data for peers comparison
const peerData = [
  { name: 'IRCTC', marketCap: '74,252.00 Cr.', peRatio: 62.14, roe: '24.50%', roce: '18.20%', debt: '0 Cr.', promoterHolding: '67.40%' },
  { name: 'Cox & Kings', marketCap: '15,800.00 Cr.', peRatio: 45.10, roe: '15.00%', roce: '10.80%', debt: '50 Cr.', promoterHolding: '55.20%' },
  { name: 'Thomas Cook', marketCap: '30,500.00 Cr.', peRatio: 50.00, roe: '20.10%', roce: '12.00%', debt: '75 Cr.', promoterHolding: '58.50%' },
];

const StockDetailPage = () => {
  const [timeframe, setTimeframe] = useState('1D');

  const stockData = {
    name: 'Indian Railway Catering & Tourism Corporation Ltd',
    symbol: 'IRCTC',
    price: 928.15,
    change: 12.75,
    changePercent: 1.39,
    open: 917.00,
    previousClose: 915.40,
    dayRange: '915.40 - 933.80',
    yearRange: '557.15 - 1,049.75',
    marketCap: '74,252.00 Cr.',
    peRatio: 62.14,
    pbRatio: 16.48,
    dividend: '7.50 (0.81%)',
    volume: '1.71M',
    averageVolume: '1.99M',
    roe: '24.50%',
    roce: '18.20%',
    debt: '0 Cr.',
    promoterHolding: '67.40%',
  };

  const timeframeButtons = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

  const MetricCard = ({ label, value, icon: Icon }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center mb-2">
        <Icon className="mr-2 text-gray-500" size={18} />
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{stockData.name}</h1>
        <div className="text-xl text-gray-600 mb-4">{stockData.symbol}</div>
        <div className="flex items-center">
          <span className="text-4xl font-bold mr-4">₹{stockData.price}</span>
          <div className={`flex items-center ${stockData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stockData.change >= 0 ? <ArrowUp size={24} /> : <ArrowDown size={24} />}
            <span className="text-xl ml-1">
              {stockData.change} ({stockData.changePercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex mb-4">
          {timeframeButtons.map((btn) => (
            <button
              key={btn}
              onClick={() => setTimeframe(btn)}
              className={`mr-2 px-4 py-2 rounded ${
                timeframe === btn
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Market Cap" value={stockData.marketCap} icon={DollarSign} />
        <MetricCard label="P/E Ratio" value={stockData.peRatio} icon={BarChart2} />
        <MetricCard label="P/B Ratio" value={stockData.pbRatio} icon={BarChart2} />
        <MetricCard label="Dividend" value={stockData.dividend} icon={Percent} />
        <MetricCard label="ROE" value={stockData.roe} icon={TrendingUp} />
        <MetricCard label="ROCE" value={stockData.roce} icon={TrendingUp} />
        <MetricCard label="Debt" value={stockData.debt} icon={Layers} />
        <MetricCard label="Promoter Holding" value={stockData.promoterHolding} icon={DollarSign} />
      </div>

      {/* Trading Information */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Trading Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <div className="mb-4">
              <span className="text-gray-500">Open</span>
              <div className="font-semibold">₹{stockData.open}</div>
            </div>
            <div className="mb-4">
              <span className="text-gray-500">Previous Close</span>
              <div className="font-semibold">₹{stockData.previousClose}</div>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <span className="text-gray-500">Day Range</span>
              <div className="font-semibold">{stockData.dayRange}</div>
            </div>
            <div className="mb-4">
              <span className="text-gray-500">52 Week Range</span>
              <div className="font-semibold">{stockData.yearRange}</div>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <span className="text-gray-500">Volume</span>
              <div className="font-semibold">{stockData.volume}</div>
            </div>
            <div className="mb-4">
              <span className="text-gray-500">Average Volume</span>
              <div className="font-semibold">{stockData.averageVolume}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Peer Comparison Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Peer Comparison</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Market Cap</th>
              <th className="py-2 px-4">P/E Ratio</th>
              <th className="py-2 px-4">ROE</th>
              <th className="py-2 px-4">ROCE</th>
              <th className="py-2 px-4">Debt</th>
              <th className="py-2 px-4">Promoter Holding</th>
            </tr>
          </thead>
          <tbody>
            {peerData.map((peer, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{peer.name}</td>
                <td className="py-2 px-4">{peer.marketCap}</td>
                <td className="py-2 px-4">{peer.peRatio}</td>
                <td className="py-2 px-4">{peer.roe}</td>
                <td className="py-2 px-4">{peer.roce}</td>
                <td className="py-2 px-4">{peer.debt}</td>
                <td className="py-2 px-4">{peer.promoterHolding}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockDetailPage;

