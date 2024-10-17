// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Sign Up', path: '/signup' },
    { name: 'Patient Dashboard', path: '/patient-dashboard' },
  ];


  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link className="nav-link" to={item.path}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};


export default Navbar;
