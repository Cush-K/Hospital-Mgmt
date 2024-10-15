// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <nav>
      <ul>
        <li 
          onMouseEnter={() => setIsHovering(true)} 
          onMouseLeave={() => setIsHovering(false)}
        >
          <Link to="/patient-dashboard">Patient Dashboard</Link>
          {isHovering && (
            <ul className="dropdown">
              <li><Link to="/patient-dashboard/details">Patient Details</Link></li>
              <li><Link to="/patient-dashboard/departments">Departments</Link></li>
              <li><Link to="/patient-dashboard/book-appointment">Book Appointment</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
