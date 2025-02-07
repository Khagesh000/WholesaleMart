import React from "react";
import { Link } from "react-router-dom";


export default function VendorHeader() {
  return (
    <nav className="vendorregistration-navbar">
      <div className="vendorregistration-left">
        <span className="vendorregistration-logo">Vendor Portal</span>
      </div>
      <div className="vendorregistration-right">
        <Link to="/" className="vendorregistration-home-btn">Home</Link>
      </div>
    </nav>
  );
}
