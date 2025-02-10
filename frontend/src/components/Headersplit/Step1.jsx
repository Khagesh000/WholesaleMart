import React from "react";

export default function Step1({ formData, errors, handleChange, sendOtp, otpSent, nextStep }) {
  return (
    <div className="vendorform-step">
      <h3>Step 1: Personal Information</h3>

      {/* First Name Field */}
      <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="vendorform-input" />
      {errors.firstName && <p className="error-text">{errors.firstName}</p>}

      {/* Last Name Field */}
      <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="vendorform-input" />
      {errors.lastName && <p className="error-text">{errors.lastName}</p>}


      <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="vendorform-input" />
      <button onClick={sendOtp} className="vendorform-btn">Send OTP</button>
      {errors.mobile && <p className="error-text">{errors.mobile}</p>}

      {otpSent && (
        <>
          <input type="text" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} className="vendorform-input" />
          {errors.otp && <p className="error-text">{errors.otp}</p>}
        </>
      )}

      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="vendorform-input" />
      {errors.email && <p className="error-text">{errors.email}</p>}

      <button onClick={nextStep} className="vendorform-btn">Next</button>
    </div>
  );
}
