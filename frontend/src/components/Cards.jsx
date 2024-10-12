import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cards = [
  { name: 'Sectors', description: 'Explore different sectors like Technology, Healthcare, Energy, etc.', filter: 'sectors' },
  { name: 'Market Cap', description: 'Filter stocks based on Market Capitalization like Large Cap, Mid Cap, etc.', filter: 'marketcap' },
  { name: 'Index Membership', description: 'Stocks belonging to popular indices like NIFTY 50, BSE Sensex, etc.', filter: 'indexmembership' },
  { name: 'Dividends', description: 'Filter stocks based on dividend yield, ex-dividend dates, and more.', filter: 'dividends' },
  { name: 'Volatility Metrics', description: 'Classify stocks based on volatility, beta, and standard deviation.', filter: 'volatilitymetrics' },
  { name: 'Risk Profiles', description: 'Low-risk and high-risk stocks based on performance.', filter: 'riskprofiles' },
  { name: 'Stock Type', description: 'Filter by common stocks, preferred stocks, REITs, etc.', filter: 'stocktype' },
  { name: 'Corporate Actions', description: 'Filter based on corporate actions like stock splits, mergers, and buybacks.', filter: 'corporateactions' },
  { name: 'Sentiment Indicators', description: 'Explore stocks based on analyst ratings and short interest.', filter: 'sentimentindicators' },
  { name: 'Investment Style', description: 'Choose between Growth, Value, or Income-based investment styles.', filter: 'investmentstyle' },
  { name: 'ESG Ratings', description: 'Filter stocks based on ESG scores and sustainability factors.', filter: 'esgratings' },
  { name: 'Liquidity', description: 'Filter stocks by trading volume, float, and liquidity measures.', filter: 'liquidity' },
];

const Cards = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (filter) => {
    // Navigate to Filters page and pass the filter as state
    navigate('/filters', { state: { filter } });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="relative bg-white shadow-lg rounded-lg p-6 h-40 cursor-pointer flex items-center justify-center"
          onHoverStart={() => setHovered(index)}
          onHoverEnd={() => setHovered(null)}
          whileHover={{ scale: 1.05 }} // Smooth scaling animation
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={() => handleCardClick(card.filter)} // Redirect on click
        >
          {/* Card Title: Hidden on Hover */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: hovered === index ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute text-lg font-bold text-blue-500"
          >
            {card.name}
          </motion.div>

          {/* Card Description: Shown on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered === index ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute text-sm text-gray-600 text-center"
          >
            {card.description}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Cards;
