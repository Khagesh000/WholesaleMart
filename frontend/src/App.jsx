import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Homepage from "./pages/Homepage";
import VendorRegistration from "./components/VendorRegistration";
import Login from "./components/Headersplit/Login";
import Header from "./components/Header"; // Global Header

export default function App() {
  const location = useLocation(); // Get the current path

  // Hide Header on Vendor Registration and Login pages
  const hideHeader = location.pathname === "/vendor-registration" || location.pathname === "/login" || location.pathname === "/";

  return (
    <>
      {!hideHeader && <Header />} {/* Show Header only if NOT on Vendor Registration or Login */}

      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Ensure Homepage loads only once */}
        <Route path="/vendor-registration" element={<VendorRegistration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
