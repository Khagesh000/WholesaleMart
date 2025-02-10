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

      {/* Mobile Number & Send OTP */}
      <div>
        <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="vendorform-input" />
        <button onClick={sendOtp} className="otp-btn">Send OTP</button>
      </div>
      {errors.mobile && <p className="error-text">{errors.mobile}</p>}
      {!otpSent && errors.otp && <p className="error-text">{errors.otp}</p>}

      {/* OTP Input (only shows if OTP is sent) */}
      {otpSent && (
        <>
          <input type="text" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} className="vendorform-input" />
          {errors.otp && <p className="error-text">{errors.otp}</p>}
        </>
      )}

      {/* Email Address */}
      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="vendorform-input" />
      {errors.email && <p className="error-text">{errors.email}</p>}

      {/* Next Button */}
      <button onClick={nextStep} className="vendorform-btn">Next</button>
    </div>
  );
}
