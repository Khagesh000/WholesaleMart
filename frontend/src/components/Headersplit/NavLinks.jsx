import React, { useState } from 'react';
import '../../assets/css/HeaderCss/NavLinks.css';
import { FaStore, FaUser, FaCartPlus, FaUsers, FaRegAddressBook, FaSignInAlt } from 'react-icons/fa'; // Importing icons from react-icons

export default function NavLinks() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const linkStyle = {
    fontSize: '16px',
    fontFamily: "'Poppins', sans-serif",
    color: '#ffffff', // Font color
    textDecoration: 'none',
    padding: '8px 12px',
    transition: '0.3s ease-in-out',
    display: 'inline-block',
  };

  const linkHoverStyle = {
    color: '#ffebcd', // Light cream hover effect
  };

  const buttonStyle = {
    padding: '8px 14px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: '#ffcc00', // Button background color
    color: 'black', // Button font color
    border: 'none',
    transition: '0.3s ease-in-out',
  };

  const buttonHoverStyle = {
    backgroundColor: '#ff9900', // Button hover background color
    color: 'white', // Change text color on hover
  };

  return (
    <ul className="header-nav-list">
      {/* Wholesale Hub */}
      <li className="nav-item">
        <a 
          className="nav-link header-link" 
          href="/" 
          style={linkStyle} 
          onMouseOver={(e) => e.target.style.color = linkHoverStyle.color}
          onMouseOut={(e) => e.target.style.color = linkStyle.color}
        >
          <FaStore className="nav-icon" /> Wholesale Hub
        </a>
      </li>

      {/* Categories Dropdown */}
      <li
        className="nav-item dropdown header-dropdown"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <a 
          className="nav-link dropdown-toggle header-dropdown-toggle" 
          href="#" 
          id="header-categoryDropdown" 
          style={linkStyle} 
          onMouseOver={(e) => e.target.style.color = linkHoverStyle.color}
          onMouseOut={(e) => e.target.style.color = linkStyle.color}
        >
          <FaCartPlus className="nav-icon" /> Stock Categories
        </a>
        <ul className={`dropdown-menu header-dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="header-categoryDropdown">
          <li><a className="dropdown-item header-dropdown-item" href="/">Men's Wear</a></li>
          <li><a className="dropdown-item header-dropdown-item" href="/">Women's Wear</a></li>
          <li><a className="dropdown-item header-dropdown-item" href="/">Kids' Wear</a></li>
          <li><a className="dropdown-item header-dropdown-item" href="/">Accessories</a></li>
        </ul>
      </li>

      {/* Community (Wholesale/Seller to Small Shop Communication) */}
      <li className="nav-item">
        <a 
          className="nav-link header-link" 
          href="/" 
          style={linkStyle} 
          onMouseOver={(e) => e.target.style.color = linkHoverStyle.color}
          onMouseOut={(e) => e.target.style.color = linkStyle.color}
        >
          <FaUsers className="nav-icon" /> Community
        </a>
      </li>

      {/* Account */}
      <li className="nav-item">
        <a 
          className="nav-link header-link" 
          href="/" 
          style={linkStyle} 
          onMouseOver={(e) => e.target.style.color = linkHoverStyle.color}
          onMouseOut={(e) => e.target.style.color = linkStyle.color}
        >
          <FaUser className="nav-icon" /> My Account
        </a>
      </li>

      {/* Contact Us */}
      <li className="nav-item">
        <a 
          className="nav-link header-link" 
          href="/" 
          style={linkStyle} 
          onMouseOver={(e) => e.target.style.color = linkHoverStyle.color}
          onMouseOut={(e) => e.target.style.color = linkStyle.color}
        >
          <FaRegAddressBook className="nav-icon" /> Contact Us
        </a>
      </li>

      {/* Login Buttons: Regular User & Wholesale Login */}
      <li className="nav-item">
        <button 
          className="btn header-login" 
          style={buttonStyle} 
          onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
          <FaSignInAlt className="nav-icon" /> User Login
        </button>
      </li>
      <li className="nav-item">
        <button 
          className="btn header-login" 
          style={buttonStyle} 
          onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
          <FaSignInAlt className="nav-icon" /> Wholesale Login
        </button>
      </li>
    </ul>
  );
}
