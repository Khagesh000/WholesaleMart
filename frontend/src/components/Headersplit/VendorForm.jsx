import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Step1 from "./Step1";
import Step2 from "./Step2";

export default function VendorForm() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); // Initialize navigation
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    shopName: "",
    shopAddress: "",
    shopFullAddress: "",
    gstNumber: "",
    pincode: "",
    mobile: "",
    otp: "",
    email: "",
    panNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
      if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
      if (!formData.mobile.match(/^\d{10}$/)) newErrors.mobile = "Enter a valid 10-digit mobile number.";
      if (!otpSent && !formData.otp) newErrors.otp = "Please enter the OTP.";
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email address.";
    }

    if (step === 2) {
      if (!formData.shopName.trim()) newErrors.shopName = "Shop Name is required.";
      if (!formData.shopAddress.trim()) newErrors.shopAddress = "Shop Address is required.";
      if (!formData.pincode.match(/^\d{6}$/)) newErrors.pincode = "Enter a valid 6-digit Pincode.";
      if (!formData.panNumber.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) newErrors.panNumber = "Enter a valid PAN Number.";
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

  const handleSubmit = async () => {
    console.log("Submitting Data:", formData); // Debugging Log
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const text = await response.text(); // Read response as text
      console.log("Raw Response:", text); // Debugging Log
  
      let data;
      try {
        data = JSON.parse(text); // Try to parse as JSON
      } catch (error) {
        console.error("JSON Parse Error:", error);
        alert("Unexpected server response.");
        return;
      }
  
      console.log("Server Response:", data); // Debugging Log
  
      if (response.ok) {
        alert("Vendor Registration Successful!");
        navigate("/vendor-homepage");
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
  
  
  

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
          <button onClick={handleSubmit} className="vendorform-submit-btn">Submit</button>
        </div>
      )}
    </div>
  );
}
