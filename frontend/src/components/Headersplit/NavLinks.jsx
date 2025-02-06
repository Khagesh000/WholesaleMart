import React from "react";
import { Link } from "react-router-dom";

export default function NavLinks() {
  return (
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
  );
}
