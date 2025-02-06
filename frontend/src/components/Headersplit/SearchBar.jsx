import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="search-group">
      <input type="text" className="search-input" placeholder="Search products..." />
      <button className="search-btn">
        <FaSearch className="search-icon" /> Search
      </button>
    </div>
  );
}
