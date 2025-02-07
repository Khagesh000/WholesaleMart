import React, { useState } from "react";
 // External CSS

export default function VendorForm() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  
  // Simulated OTP send function
  const sendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
      alert("OTP sent to your mobile number!");
    } else {
      alert("Enter a valid 10-digit mobile number!");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Vendor Registration Completed!");
  };

  return (
    <div className="vendorform-container">
      <h2 className="vendorform-title">Vendor Registration</h2>

      {/* Step 1: Personal Information */}
      {step === 1 && (
        <div className="vendorform-step">
          <h3>Step 1: Personal Information</h3>
          <input type="text" placeholder="Full Name" required className="vendorform-input" />
          <input type="text" placeholder="Shop Name" required className="vendorform-input" />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="vendorform-input"
          />
          {!otpSent ? (
            <button onClick={sendOtp} className="vendorform-btn">Send OTP</button>
          ) : (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="vendorform-input"
            />
          )}
          <input type="email" placeholder="Email Address" required className="vendorform-input" />
          <input type="text" placeholder="Pincode" required className="vendorform-input" />
          <input type="text" placeholder="Address" required className="vendorform-input" />
          <button onClick={() => setStep(2)} className="vendorform-btn">Next</button>
        </div>
      )}

      {/* Step 2: Shop Details */}
      {step === 2 && (
        <div className="vendorform-step">
          <h3>Step 2: Shop Details</h3>
          <input type="text" placeholder="Business Type" required className="vendorform-input" />
          <textarea placeholder="Shop Description" required className="vendorform-textarea"></textarea>
          <button onClick={() => setStep(1)} className="vendorform-btn-back">Back</button>
          <button onClick={() => setStep(3)} className="vendorform-btn">Next</button>
        </div>
      )}

      {/* Step 3: Tax Details */}
      {step === 3 && (
        <div className="vendorform-step">
          <h3>Step 3: Tax Details</h3>
          <input type="text" placeholder="PAN Number" required className="vendorform-input" />
          <input type="text" placeholder="GST Number (Optional)" className="vendorform-input" />
          <button onClick={() => setStep(2)} className="vendorform-btn-back">Back</button>
          <button onClick={() => setStep(4)} className="vendorform-btn">Next</button>
        </div>
      )}

      {/* Step 4: Final Submission */}
      {step === 4 && (
        <div className="vendorform-step">
          <h3>Step 4: Confirmation</h3>
          <p>Please review all details before submitting.</p>
          <button onClick={() => setStep(3)} className="vendorform-btn-back">Back</button>
          <button onClick={handleSubmit} className="vendorform-submit-btn">Submit</button>
        </div>
      )}
    </div>
  );
}
