import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Homepage from "./pages/Homepage";
import VenderDashboard from "./pages/VenderDashboard";
import VendorHomePage from "./pages/VendorHomePage";
import UserLogin from "./pages/UserLogin";
import Header from "./components/Header"; // Global Header

export default function App() {
  const location = useLocation(); // Get the current path

  // Hide Header on Vendor Registration and Login pages
  const hideHeader = location.pathname === "/vender-dashboard" || location.pathname === "/user-login" || location.pathname === "/" || location.pathname === "/vendor-homepage";

  return (
    <>
      {!hideHeader && <Header />} {/* Show Header only if NOT on Vendor Registration or Login */}

      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Ensure Homepage loads only once */}
        <Route path="/vender-dashboard" element={<VenderDashboard />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/vendor-homepage" element={<VendorHomePage />} />
      </Routes>
    </>
  );
}
