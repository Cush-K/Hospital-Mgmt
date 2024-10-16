import React from "react";
import'./Header.css';

function Header(){
    return(
       <header className="header">
        <div className='logo'>
            <h1>Tiba_Care</h1>
        </div>
        <div className="company-name">
            <h2>Tibacare</h2>
        
        </div>
        <div className="header-buttons">
            <button className="btn">Book Appointment</button>
            <button className="btn">Login</button>
             <button className="btn">Logout</button>
        </div>       
       </header>
    );
}

export default Header;