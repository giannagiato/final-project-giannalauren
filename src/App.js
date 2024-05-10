import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Tips from './Tips';
import Attractions from './Attractions';
import AttractionDetail from './AttractionDetail';
import TipsDetail from './TipsDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* Navigation bar */}
          <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/attractions" className="nav-link">Attractions</Link>
            <Link to="/restaurants" className="nav-link">Restaurants</Link>
           
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/restaurants" element={<Tips />} />
            <Route path="/attraction/:id" element={<AttractionDetail />} />
            <Route path="/restaurants/:id" element={<TipsDetail />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
