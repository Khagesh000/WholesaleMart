import React from "react";

export default function Step2({ formData, errors, handleChange, prevStep, nextStep }) {
  return (
    <div className="vendorform-step">
      <h3>Step 2: Shop & Tax Details</h3>

      {/* Shop Name */}
      <input type="text" name="shopName" placeholder="Shop Name" value={formData.shopName} onChange={handleChange} className="vendorform-input" />
      {errors.shopName && <p className="error-text">{errors.shopName}</p>}

      {/* Shop Address */}
      <input type="text" name="shopAddress" placeholder="Shop Address" value={formData.shopAddress} onChange={handleChange} className="vendorform-input" />
      {errors.shopAddress && <p className="error-text">{errors.shopAddress}</p>}

      {/* Pincode */}
      <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="vendorform-input" />
      {errors.pincode && <p className="error-text">{errors.pincode}</p>}


      {/* PAN Number */}
      <input type="text" name="panNumber" placeholder="PAN Number" value={formData.panNumber} onChange={handleChange} className="vendorform-input" />
      {errors.panNumber && <p className="error-text">{errors.panNumber}</p>}

      {/* GST Number (Optional) */}
      <input type="text" name="gstNumber" placeholder="GST Number (Optional)" value={formData.gstNumber} onChange={handleChange} className="vendorform-input" />
      {errors.gstNumber && <p className="error-text">{errors.gstNumber}</p>}

      {/* Navigation Buttons */}
      <button onClick={prevStep} className="vendorform-btn-back">Back</button>
      <button onClick={nextStep} className="vendorform-btn">Next</button>
    </div>
  );
}
