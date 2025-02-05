import React, { useState } from 'react';
import '../../assets/css/HeaderCss/NavLinks.css';
import { FaStore, FaUser, FaCartPlus, FaUsers, FaRegAddressBook, FaSignInAlt } from 'react-icons/fa'; // Importing icons from react-icons

export default function NavLinks() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ul className="header-nav-list">
      {/* Wholesale Hub */}
      <li className="nav-item">
        <a className="nav-link header-link" href="/">
          <FaStore className="nav-icon" /> Wholesale Hub
        </a>
      </li>

      {/* Categories Dropdown */}
      <li
        className="nav-item dropdown header-dropdown"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <a className="nav-link dropdown-toggle header-dropdown-toggle" href="#" id="header-categoryDropdown">
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
        <a className="nav-link header-link" href="/">
          <FaUsers className="nav-icon" /> Community
        </a>
      </li>

      {/* Account */}
      <li className="nav-item">
        <a className="nav-link header-link" href="/">
          <FaUser className="nav-icon" /> My Account
        </a>
      </li>

      {/* Contact Us */}
      <li className="nav-item">
        <a className="nav-link header-link" href="/">
          <FaRegAddressBook className="nav-icon" /> Contact Us
        </a>
      </li>

      {/* Login Buttons: Regular User & Wholesale Login */}
      <li className="nav-item">
        <button className="btn header-login">
          <FaSignInAlt className="nav-icon" /> User Login
        </button>
      </li>
      <li className="nav-item">
        <button className="btn header-login">
          <FaSignInAlt className="nav-icon" /> Wholesale Login
        </button>
      </li>
    </ul>
  );
}
