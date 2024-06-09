import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../css/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h1 className="footer-title">Cake Bakery</h1>
                    <p className="footer-subtitle">The best cakes in town!</p>
                </div>
                <div className="footer-center">
                    <p>&copy; 2024 Cake Bakery. All rights reserved.</p>
                </div>
                <div className="footer-socials">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaFacebook size={24} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaInstagram size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
