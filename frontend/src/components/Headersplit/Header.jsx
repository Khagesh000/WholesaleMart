import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import "../../assets/css/Header.css"; // External CSS file

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);

  // Handle input change and filter states
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 0) {
      const suggestions = indianStates.filter((state) =>
        state.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredStates(suggestions);
    } else {
      setFilteredStates([]);
    }
  };

  // Handle state selection from the list
  const handleStateSelect = (state) => {
    setLocation(state);
    setFilteredStates([]); // Hide suggestions after selection
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Side - Logo & Location Input */}
        <div className="navbar-left">
          <span className="brand-name">WholesaleMarket</span>
          <div className="location-container">
            <input
              type="text"
              className="location-input"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChange}
            />
            {filteredStates.length > 0 && (
              <ul className="suggestions-list">
                {filteredStates.map((state, index) => (
                  <li key={index} onClick={() => handleStateSelect(state)}>
                    {state}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Search Bar (Only One Instance) */}
        <div className="search-group">
          <input type="text" className="search-input" placeholder="Search products..." />
          <button className="search-btn">
            <FaSearch className="search-icon" /> Search
          </button>
        </div>

        {/* Right Side (Navigation & Auth Buttons) */}
        <div className={`navbar-right ${isOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li className="dropdown">
              <span>Categories ▾</span>
              <ul className="dropdown-menu">
                <li><Link to="/men">Men</Link></li>
                <li><Link to="/women">Women</Link></li>
                <li><Link to="/kids">Kids</Link></li>
              </ul>
            </li>
            <li><Link to="/contact">Contact</Link></li>
            <li style={{ marginRight: '3px' }}><Link to="/wholesale">Wholesale</Link></li>
          </ul>
          <div className="auth-buttons">
            <button className="login-btn">Login</button>
            <button className="signup-btn">Sign Up</button>
          </div>
        </div>

        {/* Menu Button (Now at Right Corner on Mobile) */}
        <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}
