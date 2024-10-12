import { BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Routing from './pages/Routes';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-grow">
          <Routing />
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;