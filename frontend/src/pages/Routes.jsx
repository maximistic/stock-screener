import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Watchlist from './Watchlist';
import Cards from '../components/Cards';


const Routing = () => {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} />

            <Route path="/sectors" element={<Sectors />} />
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path='/cards' element={<Cards />}/>
      </Routes>
    </Router>
  )
}

export default Routing