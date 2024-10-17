import React from "react";
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/departments">Departments</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
