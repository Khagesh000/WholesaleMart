import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/HeaderCss/Header.css';
import LocationSearch from './LocationSearch';
import ProductSearch from './ProductSearch';
import NavLinks from './NavLinks';

export default function Header() {
  return (
    <header>
      <nav className="header-container">
        <div className="header-left">
          <span className="header-logo">WholesaleMarket</span>
          <LocationSearch />
          <ProductSearch />
        </div>
        <div className="header-right">
          <NavLinks />
        </div>
      </nav>
    </header>
  );
}