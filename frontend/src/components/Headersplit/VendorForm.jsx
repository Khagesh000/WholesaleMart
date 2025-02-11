import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
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
  const [isVendorRegistered, setIsVendorRegistered] = useState(false);

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

  // ✅ Check if vendor session exists
  const checkVendorSession = async () => {
    try {
      console.log("🔄 Checking vendor session...");
      const res = await axios.get("http://127.0.0.1:8000/api/check-vendor-session/", { withCredentials: true });
      console.log("🟢 Vendor session response:", res.data);

      if (res.data.loggedIn) {
        console.log("✅ Vendor is authenticated, redirecting to /vendor-homepage");
        localStorage.setItem("vendor", JSON.stringify(res.data));
        setIsVendorRegistered(true);
        navigate("/vendor-homepage");
      } else {
        console.log("❌ Vendor not authenticated, showing registration form");
        localStorage.removeItem("vendor");
        setIsVendorRegistered(false);
      }
    } catch (error) {
      console.error("🚨 Vendor session check failed:", error);
      localStorage.removeItem("vendor");
      setIsVendorRegistered(false);
    }
  };

  useEffect(() => {
    const storedVendor = localStorage.getItem("vendor");

    if (storedVendor) {
      console.log("🟢 Vendor found in localStorage, redirecting to /vendor-homepage");
      navigate("/vendor-homepage");
    } else {
      checkVendorSession();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ Send OTP
  const sendOtp = () => {
    fetch("http://127.0.0.1:8000/api/send-otp-vendor/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email }),
    })
      .then((res) => res.json())
      .then(() => {
        setOtpSent(true);
        alert("OTP sent to your email!");
      })
      .catch((error) => console.error("OTP Send Failed:", error));
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // ✅ Handle Submit Registration
  const handleSubmit = async () => {
    if (!validateStep()) return;
  
    const sanitizedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value || null]) // Convert empty strings to null
    );
  
    try {
      console.log("📤 Submitting vendor registration:", sanitizedFormData);
      const res = await axios.post("http://127.0.0.1:8000/api/register-vendor/", sanitizedFormData, { withCredentials: true });
  
      console.log("🟢 Registration successful:", res.data);
      console.log(localStorage.getItem("vendor"));

      if (res.data.vendor_id) {
        localStorage.setItem("vendor", JSON.stringify(res.data));
        navigate("/vendor-homepage");
      } else {
        console.error("❌ Registration failed:", res.data.message);
        alert("Registration failed. Please check your inputs.");
      }
    } catch (error) {
      console.error("🚨 Registration Error:", error);
  
      if (error.response && error.response.data.errors) {
        console.log("🛑 Backend Errors:", error.response.data.errors);
        setErrors(error.response.data.errors); // ✅ Show errors in form
      } else {
        alert("An error occurred during registration.");
      }
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
