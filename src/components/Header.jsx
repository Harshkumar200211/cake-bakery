import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import '../css/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };

  return (
    <nav className="header-container">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">Cake Bakery</h1>
        </div>
        <div className="header-links">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
          <Link to="/" className="nav-link" onClick={handleClick}>Home</Link>
          <Link to="/products" className="nav-link" onClick={handleClick}>Products</Link>
          <Link to="/contact" className="nav-link" onClick={handleClick}>Contact</Link>
          {user ? (
            <>
              <Link to="/profile" className="nav-link" onClick={handleClick}>Profile</Link>
              <button onClick={handleSignOut} className="nav-link">Logout</button>
            </>
          ) : (
            <Link to="/signin" className="nav-link" onClick={handleClick}>Sign In</Link>
          )}
          <Link to="/cart" className="nav-link" onClick={handleClick}>
            <FaShoppingCart />
          </Link>
          <Link to="/admin" className="nav-link" onClick={handleClick}>Admin</Link>
        </div>
        <div className="menu-toggle">
          <button onClick={toggleMenu} className="menu-button">
            <span className="sr-only">Open main menu</span>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          <div className="mobile-search">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
          <Link to="/" className="mobile-link" onClick={handleClick}>Home</Link>
          <Link to="/products" className="mobile-link" onClick={handleClick}>Products</Link>
          <Link to="/contact" className="mobile-link" onClick={handleClick}>Contact</Link>
          {user ? (
            <>
              <Link to="/profile" className="mobile-link" onClick={handleClick}>Profile</Link>
              <button onClick={handleSignOut} className="mobile-link">Logout</button>
            </>
          ) : (
            <Link to="/signin" className="mobile-link" onClick={handleClick}>Sign In</Link>
          )}
          <Link to="/cart" className="mobile-link" onClick={handleClick}>
            <FaShoppingCart />
          </Link>
          <Link to="/admin" className="mobile-link" onClick={handleClick}>Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
