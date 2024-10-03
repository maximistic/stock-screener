import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-grow">
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<Watchlist />} />
          
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;