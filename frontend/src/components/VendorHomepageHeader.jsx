import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes, FaBoxOpen, FaBell } from "react-icons/fa";

import "../assets/css/VendorHomepageHeader.css";

export default function VendorHomepageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [vendor, setVendor] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [notifications, setNotifications] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedVendor = JSON.parse(localStorage.getItem("vendor"));
      if (storedVendor) {
        setVendor(storedVendor);
        setProductCount(storedVendor.products || 0);
      }
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  }, []);

  // Function to close menu on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="vendorregistration-navbar">
      <div className="vendorregistration-left">
        <span className="vendorregistration-logo">Vendor Portal</span>
      </div>

      <div className="vendorregistration-menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`vendorregistration-right ${menuOpen ? "open" : ""}`}>
        <Link to="/vender-dashboard" className="vendorregistration-home-btn">Dashboard</Link>

        {/* Products Count */}
        <div className="vendorregistration-products">
          <FaBoxOpen className="icon" />
          <span>Products: {productCount}</span>
        </div>

        {/* Notifications Icon */}
        <div className="vendorregistration-notifications">
          <FaBell className="icon" />
          {notifications > 0 && <span className="notification-badge">{notifications}</span>}
        </div>

        {/* Vendor Profile - Now Clickable */}
        <Link to="/vendor-profile" className="vendorregistration-profile">
          {vendor?.profilePic ? (
            <img src={vendor.profilePic} alt="Vendor" className="profile-img" />
          ) : (
            <FaUserCircle className="icon" />
          )}
          <span>{vendor?.name || "Vendor"}</span>
        </Link>
      </div>
    </nav>
  );
}
