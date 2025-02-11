import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Homepage from "./pages/Homepage";
import VenderDashboard from "./pages/VenderDashboard";
import VendorHomePage from "./pages/VendorHomePage";
import UserLogin from "./pages/UserLogin";
import VendorProfile from "./components/VendorProfile";
import Header from "./components/Header"; // Global Header

export default function App() {
  const location = useLocation();

  // Hide Header on specific pages
  const hideHeader = [
    "/vender-dashboard",
    "/user-login",
    "/",
    "/vendor-homepage",
    "/vendor-profile"
  ].includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />} {/* Show Header conditionally */}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/vender-dashboard" element={<VenderDashboard />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/vendor-homepage" element={<VendorHomePage />} />
        <Route path="/vendor-profile" element={<VendorProfile />} />
      </Routes>
    </>
  );
}
