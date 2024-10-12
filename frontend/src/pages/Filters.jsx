import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Filters = () => {
  const location = useLocation();
  const { filter } = location.state || {}; // Get the passed filter

  const [selectedSubFilter, setSelectedSubFilter] = useState(''); // State for selected sub-filter

  const sectors = ['FMCG', 'Agriculture', 'Automobile', 'Banking', 'Energy', 'IT', 'Healthcare', 'Pharma', 'Defense', 'Telecom', 'Real Estate', 'Textiles', 'Utilities'];
  const marketCaps = ['Large Cap', 'Mid Cap', 'Small Cap', 'Micro Cap'];
  const riskProfiles = ['Low Risk', 'Moderate Risk', 'High Risk'];
  const stockTypes = ['Common Stock', 'Preferred Stock', 'REIT', 'ETF'];
  const corporateActions = ['Stock Split', 'Merger', 'Buyback'];
  const investmentStyles = ['Growth', 'Value', 'Income'];
  const esgRatings = ['High ESG', 'Medium ESG', 'Low ESG'];
  const liquidity = ['High Liquidity', 'Medium Liquidity', 'Low Liquidity'];

  const renderButtons = (options) => (
    <div className="flex overflow-x-auto space-x-4 pb-4">
      {options.map((option, index) => (
        <motion.button
          key={index}
          onClick={() => setSelectedSubFilter(option)} // Set active sub-filter
          className={`px-4 py-2 text-sm rounded-full focus:outline-none transition 
                        ${selectedSubFilter === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
          whileHover={{ scale: 1.05 }} // Animation on hover
          whileTap={{ scale: 0.95 }} // Animation on click
        >
          {option}
        </motion.button>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (filter) {
      case 'sectors':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4">Select a Sector</h2>
            {renderButtons(sectors)}
            <p className="mt-4">You selected: {selectedSubFilter || 'None'}</p>
          </div>
        );
      case 'marketcap':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4">Select Market Cap</h2>
            {renderButtons(marketCaps)}
            <p className="mt-4">You selected: {selectedSubFilter || 'None'}</p>
          </div>
        );
      case 'indexmembership':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4">Popular Indices</h2>
            {renderButtons(['NIFTY 50', 'BSE Sensex', 'NIFTY Midcap', 'NIFTY Smallcap'])}
            <p className="mt-4">You selected: {selectedSubFilter || 'None'}</p>
          </div>
        );
      case 'dividends':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4">Dividend Filters</h2>
            {renderButtons(['High Yield', 'Consistent Payout', 'Ex-Dividend Date Soon'])}
            <p className="mt-4">You selected: {selectedSubFilter || 'None'}</p>
          </div>
        );
      case 'volatilitymetrics':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4">Volatility Metrics</h2>
            {renderButtons(['Low Volatility', 'Medium Volatility', 'High Volatility', 'High Beta'])}
            <p className="mt-4">You selected: {selectedSubFilter || 'None'}</p>
          </div>
        );
      case 'riskprofiles':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4">Select Risk Profile</h2>
            {renderButtons(riskProfiles)}
            <p className="mt-4">You selected: {selectedSubFilter || 'None'}</p>
          </div>
        );
      case 'stocktype':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4">Select Stock Type</h2>
            {renderButtons(stockTypes)}
            <p className="mt-4">You selected: {selectedSubFilter || 'None'}</p>
          </div>
        );
      case 'corporateactions':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4">Corporate Actions</h2>
            {renderButtons(corporateActions)}
            <p className="mt-4">You selected: {selectedSubFilter || 'None'}</p>
          </div>
        );
      case 'sentimentindicators':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4">Sentiment Indicators</h2>
            {renderButtons(['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'])}
            <p className="mt-4">You selected: {selectedSubFilter || 'None'}</p>
          </div>
        );
      case 'investmentstyle':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4">Select Investment Style</h2>
            {renderButtons(investmentStyles)}
            <p className="mt-4">You selected: {selectedSubFilter || 'None'}</p>
          </div>
        );
      case 'esgratings':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4">ESG Ratings</h2>
            {renderButtons(esgRatings)}
            <p className="mt-4">You selected: {selectedSubFilter || 'None'}</p>
          </div>
        );
      case 'liquidity':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4">Liquidity Levels</h2>
            {renderButtons(liquidity)}
            <p className="mt-4">You selected: {selectedSubFilter || 'None'}</p>
          </div>
        );
      default:
        return <div>Select a filter from the cards</div>;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Filters</h1>
      {renderContent()}
    </div>
  );
};

export default Filters;