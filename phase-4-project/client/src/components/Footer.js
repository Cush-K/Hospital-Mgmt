import React from 'react';
import './footer.css'; 

const Footer = () => {
    return (
        <footer>
            <ul className="footer-links">
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
            <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
        </footer>
    );
};

export default Footer;
