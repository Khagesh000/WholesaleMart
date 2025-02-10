import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";

export default function VendorForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    shopName: "",
    shopAddress: "",
    pincode: "",
    mobile: "",
    otp: "",
    email: "",
    businessType: "",
    shopDescription: "",
    panNumber: "",
    gstNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  const validateStep = () => {
    let newErrors = {};
  
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
      if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
      if (!formData.mobile.match(/^\d{10}$/)) newErrors.mobile = "Enter a valid 10-digit mobile number.";
      if (otpSent && !formData.otp.trim()) {
        newErrors.otp = "Please enter the OTP.";
      } else if (!otpSent) {
        newErrors.otp = "Please click 'Send OTP' before proceeding.";
      }
  
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email address.";
    }
  
    if (step === 2) {
      if (!formData.shopName.trim()) newErrors.shopName = "Shop Name is required.";
      if (!formData.shopAddress.trim()) newErrors.shopAddress = "Shop Address is required.";
      if (!formData.pincode.match(/^\d{6}$/)) newErrors.pincode = "Enter a valid 6-digit Pincode.";
      if (!formData.panNumber.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) newErrors.panNumber = "Enter a valid PAN Number.";
      if (formData.gstNumber && !formData.gstNumber.match(/^\d{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{3}$/)) {
        newErrors.gstNumber = "Enter a valid GST Number.";
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const sendOtp = () => {
    if (!formData.mobile.match(/^\d{10}$/)) {
      setErrors({ ...errors, mobile: "Enter a valid 10-digit mobile number." });
      return;
    }
    setOtpSent(true);
    alert("OTP sent to your mobile number!");
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="vendorform-container">
      <h2 className="vendorform-title">Vendor Registration</h2>

      <div className="step-indicator">
        {["Personal Info", "Shop & Tax Details", "Confirmation"].map((title, index) => (
          <div key={index} className={`step ${step >= index + 1 ? "active" : ""}`}>
            {index + 1}. {title}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Step1
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          sendOtp={sendOtp}
          otpSent={otpSent}
          nextStep={nextStep}
        />
      )}

      {step === 2 && (
        <Step2 formData={formData} errors={errors} handleChange={handleChange} prevStep={prevStep} nextStep={nextStep} />
      )}

      {step === 3 && (
        <div className="vendorform-step">
          <h3>Step 3: Confirmation</h3>
          <p>Please review all details before submitting.</p>
          <button onClick={prevStep} className="vendorform-btn-back">Back</button>
          <button onClick={() => alert("Vendor Registration Completed!")} className="vendorform-submit-btn">Submit</button>
        </div>
      )}
    </div>
  );
}
