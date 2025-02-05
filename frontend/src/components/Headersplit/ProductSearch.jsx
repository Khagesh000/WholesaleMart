import React from 'react';
import '../../assets/css/HeaderCss/ProductSearch.css';

export default function ProductSearch() {
  return (
    <div className="header-search-container">
      <input
        type="text"
        className="form-control header-search"
        placeholder="Search products..."
      />
      <button className="btn header-search-btn">
        <i className="fas fa-search"></i>
        <span>Search</span>
      </button>
    </div>
  );
}
