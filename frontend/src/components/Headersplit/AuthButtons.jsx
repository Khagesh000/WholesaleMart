import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle } from "react-icons/fa"; // Import Google icon

export default function AuthButtons() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load Google API
  useEffect(() => {
    const loadGoogleAPI = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual Client ID
          callback: handleGoogleLogin,
        });
      };
      document.body.appendChild(script);
    };
    loadGoogleAPI();
  }, []);

  // Google Sign-In Callback
  const handleGoogleLogin = async (response) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/google-login/", {
        token: response.credential,
      });
      if (res.data.status === "success") {
        navigate("/dashboard");
      } else {
        setError("Google login failed.");
      }
    } catch (error) {
      setError("Google authentication error.");
    }
  };

  // Send OTP to Backend
  const handleSendOtp = async () => {
    if (email.includes("@") && email.includes(".")) {
      try {
        await axios.post("http://127.0.0.1:8000/api/send-otp/", { email });
        setIsOtpSent(true);
        setError("");
      } catch (error) {
        setError("Failed to send OTP. Try again.");
      }
    } else {
      setError("Please enter a valid email.");
    }
  };

  // Verify OTP with Backend
  const handleVerifyOtp = async () => {
    if (otp.length === 6) {
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/verify-otp/", { email, otp });

        if (res.data.status === "Verified") {
          setShowPopup(false);
          navigate("/dashboard");
        } else {
          setError("Invalid OTP. Try again.");
        }
      } catch (error) {
        setError("OTP verification failed.");
      }
    } else {
      setError("Enter a valid 6-digit OTP.");
    }
  };

  return (
    <div className="authbuttons-container">
      <div className="authbuttons-wrapper">
        <button className="signup-btn" onClick={() => navigate("/vendor-registration")}>
          Vendor
        </button>

        <button className="login-btn" onClick={() => setShowPopup(true)}>
          Login
        </button>
      </div>

      {showPopup && (
        <div className="authbuttons-popup">
          <span className="authbuttons-close-btn" onClick={() => setShowPopup(false)}>×</span>
          <h3 className="authbuttons-popup-title">User Login</h3>

          <input
            type="email"
            className="authbuttons-input"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {isOtpSent && (
            <>
              <input
                type="text"
                className="authbuttons-input"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
              />
              <button className="authbuttons-resend-btn" onClick={handleSendOtp}>
                Resend OTP
              </button>
            </>
          )}

          {!isOtpSent ? (
            <button className="authbuttons-send-btn" onClick={handleSendOtp}>
              Send OTP
            </button>
          ) : (
            <button className="authbuttons-verify-btn" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          )}

          {/* Google Sign-In Button with Icon */}
          <div className="google-signin">
            <button className="google-btn" onClick={() => window.google.accounts.id.prompt()}>
              <FaGoogle className="google-icon" /> Sign Up with Google
            </button>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}
