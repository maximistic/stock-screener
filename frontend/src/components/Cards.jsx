import { motion } from 'framer-motion';
import { useState } from 'react';

const cards = [
  { name: 'Sectors', description: 'Explore different sectors like Technology, Healthcare, Energy, etc.', page: '/sectors' },
  { name: 'Market Cap', description: 'Filter stocks based on Market Capitalization like Large Cap, Mid Cap, etc.', page: '/marketcap' },
  { name: 'Index Membership', description: 'Stocks belonging to popular indices like NIFTY 50, BSE Sensex, etc.', page: '/index' },
  { name: 'Dividends', description: 'Filter stocks based on dividend yield, ex-dividend dates, and more.', page: '/dividends' },
  { name: 'Volatility Metrics', description: 'Classify stocks based on volatility, beta, and standard deviation.', page: '/volatility' },
  { name: 'Risk Profiles', description: 'Low-risk and high-risk stocks based on performance.', page: '/risk' },
  { name: 'Stock Type', description: 'Filter by common stocks, preferred stocks, REITs, etc.', page: '/stocktype' },
  { name: 'Corporate Actions', description: 'Filter based on corporate actions like stock splits, mergers, and buybacks.', page: '/corporateactions' },
  { name: 'Sentiment Indicators', description: 'Explore stocks based on analyst ratings and short interest.', page: '/sentiment' },
  { name: 'Investment Style', description: 'Choose between Growth, Value, or Income-based investment styles.', page: '/investmentstyle' },
  { name: 'ESG Ratings', description: 'Filter stocks based on ESG scores and sustainability factors.', page: '/esgratings' },
  { name: 'Liquidity', description: 'Filter stocks by trading volume, float, and liquidity measures.', page: '/liquidity' },
];

const Cards = () => {
  const [hovered, setHovered] = useState(null); // Track the hovered card

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
