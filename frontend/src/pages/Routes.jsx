import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Watchlist from './Watchlist';
import Cards from '../components/Cards';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/watchlist" element={<Watchlist />} />
    </Routes>
  );
};

export default Routing;