import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/HeaderCss/Header.css';
import LocationSearch from '../components/Headersplit/LocationSearch';
import ProductSearch from '../components/Headersplit/ProductSearch';
import NavLinks from '../components/Headersplit/NavLinks';

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
