import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Contact from './Contact';  
import footer from './Footer';
import Navbar from './Navbar';


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | {" "}
        <Link to="/about">About</Link> | {" "}
        <Link to="/contact">Contact</Link> 
      </nav>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />     {/* Home route */}
          <Route path="/about" element={<About />} /> {/* About route */}
          <Route path="/contact" element={<Contact />} /> {/* Contact route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
