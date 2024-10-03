import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp size={24} />
            <span className="text-xl font-semibold">StockScreen</span>
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            <Link to="/watchlist" className="hover:text-blue-200">Watchlist</Link>
            <Link to="/markets" className="hover:text-blue-200">Markets</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;