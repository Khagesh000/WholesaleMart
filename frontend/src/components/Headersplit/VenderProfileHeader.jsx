import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/VenderProfileHeader.css";

export default function VenderProfileHeader() {
  const navigate = useNavigate();

  return (
    <nav className="vendorprofileheader-navbar">
      <div className="vendorprofileheader-left">
        <span className="vendorprofileheader-logo">Vendor Portal</span>
      </div>
      <div className="vendorprofileheader-right">
        <button className="vendorprofileheader-back-button" onClick={() => navigate("/vendor-homepage")}>
          Back
        </button>
      </div>
    </nav>
  );
}
