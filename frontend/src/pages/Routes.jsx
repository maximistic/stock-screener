import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Watchlist from './Watchlist';
import Cards from '../components/Cards';
import Filters from './Filters';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path='/filters' element={<Filters />} />
    </Routes>
  );
};

export default Routing;