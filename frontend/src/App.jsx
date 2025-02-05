import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Homepage from './pages/Homepage'; // Import Homepage
import './assets/css/HeaderCss//Header.css'; // Import Global CSS files

export default function App() {
  return (
    <div>
      <Homepage />  {/* Display Homepage which includes Header */}
    </div>
  );
}
