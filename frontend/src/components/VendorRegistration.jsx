import React from "react";
import VendorHeader from "./Headersplit/VendorHeader";
import VendorForm from "./Headersplit/VendorForm";

import "../assets/css/VendorHeader.css";
import "../assets/css/VendorForm.css";

export default function VendorRegistration() {
  return (
    <div>
      <VendorHeader />
      <VendorForm />
    </div>
  );
}
