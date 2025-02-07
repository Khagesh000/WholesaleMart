import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { auth, provider, signInWithPopup } from "./firebase"; // Import Firebase

export default function AuthButtons() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 🔹 Loading state for Send OTP button
  const [verifying, setVerifying] = useState(false); // 🔹 Loading state for Verify OTP button
  const navigate = useNavigate();

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await axios.post("http://127.0.0.1:8000/api/google-login/", { token });

      if (res.data.status === "Success") {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/login");
      } else {
        setError("Google login failed.");
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      setError("Google authentication failed.");
    }
  };

  // ✅ Send OTP
  const handleSendOtp = async () => {
    setLoading(true); // Show loading dots
    setError(""); // Clear previous errors

    try {
      await axios.post("http://127.0.0.1:8000/api/send-otp/", { email });
      setIsOtpSent(true);
    } catch (error) {
      setError("Error sending OTP.");
    } finally {
      setLoading(false); // Hide loading dots
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    setVerifying(true); // Show loading dots
    setError(""); // Clear previous errors

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/verify-otp/", { email, otp });
      if (res.data.status === "Verified") {
        navigate("/login");
      } else {
        setError("❌ OTP is invalid! Please try again."); // 🔹 Attractive error message
      }
    } catch (error) {
      setError("❌ OTP verification failed!");
    } finally {
      setVerifying(false); // Hide loading dots
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
              <button className="authbuttons-resend-btn" onClick={handleSendOtp} disabled={loading}>
                Resend OTP
              </button>
            </>
          )}

          {!isOtpSent ? (
            <button className="authbuttons-send-btn" onClick={handleSendOtp} disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <button className="authbuttons-verify-btn" onClick={handleVerifyOtp} disabled={verifying}>
              {verifying ? "Verifying OTP..." : "Verify OTP"}
            </button>
          )}

          {/* 🔹 Google Sign-In Button with Firebase */}
          <div className="google-signin">
            <button className="google-btn" onClick={handleGoogleLogin}>
              <FaGoogle className="google-icon" /> Sign Up with Google
            </button>
          </div>

          {error && <p className="auth-error">{error}</p>}
        </div>
      )}
    </div>
  );
}
