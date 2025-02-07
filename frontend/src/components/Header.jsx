import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import LocationInput from "../components/Headersplit/LocationInput";
import SearchBar from "../components/Headersplit/SearchBar";
import NavLinks from "../components/Headersplit/NavLinks";
import AuthButtons from "../components/Headersplit/AuthButtons";

import "../assets/css/AuthButtons.css";
import "../assets/css/Header.css"; // Same external CSS file

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Side - Logo & Location Input */}
        <div className="navbar-left">
          <span className="brand-name">WholesaleMarket</span>
          <LocationInput location={location} setLocation={setLocation} />
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Right Side - Navigation & Auth Buttons */}
        <div className={`navbar-right ${isOpen ? "open" : ""}`}>
          <NavLinks />
          <AuthButtons />
        </div>

        {/* Menu Button (Right Corner on Mobile) */}
        <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}
