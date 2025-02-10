import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();




axios.defaults.withCredentials = true; // ✅ This ensures session cookies are sent

const checkSession = async () => {
    try {
        const res = await axios.get("http://127.0.0.1:8000/api/check-session/");
        console.log("Session Check Response:", res.data);
        if (res.data.status === "Authenticated") {
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/login");
        } else {
          localStorage.removeItem("user"); // ❌ Clear storage if not authenticated
          navigate("/login");
        }
    } catch (error) {
        console.error("Session Error:", error);
        localStorage.removeItem("user"); // ❌ Clear session on error
        navigate("/login");
    }
};

useEffect(() => {
  const user = localStorage.getItem("user");

  if (user) {
    console.log("🔄 User found in localStorage. Redirecting to /login");
      // ✅ If user is already logged in, redirect to dashboard
      navigate("/login");
  } else {
      console.log("🔄 Checking Django session...");
      checkSession(); // ✅ Otherwise, check Django session
  }
}, []);



  // ✅ Google Login with Console Log
  const handleGoogleLogin = async () => {
    try {
      console.log("Google Sign-In started...");
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      console.log("Google Token:", token);

      const res = await axios.post("http://127.0.0.1:8000/api/google-login/", { token });

      if (res.data.status === "Success") {
        console.log("Google Login Success:", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/login");
      } else {
        console.error("Google Login Failed:", res.data.message);
        setError("Google login failed.");
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      setError("Google authentication failed.");
    }
  };

  const handleLogout = () => {
    axios.post("http://127.0.0.1:8000/api/logout/")
        .then(() => {
            localStorage.removeItem("user"); // ❌ Clear storage
            console.log("✅ User logged out. Redirecting to /login");
            navigate("/login"); // 🔄 Redirect to login
        })
        .catch(error => console.error("🚨 Logout Error:", error));
};



  // ✅ Send OTP with Console Log
  const handleSendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("Sending OTP to:", email);
      const response = await axios.post("http://127.0.0.1:8000/api/send-otp/", { email });
      console.log("OTP Sent Response:", response.data);

      setIsOtpSent(true);
    } catch (error) {
      console.error("Error Sending OTP:", error);
      setError("Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP with Console Log
  const handleVerifyOtp = async () => {
    setVerifying(true);
    setError("");

    try {
      console.log("Verifying OTP for:", email);
      const res = await axios.post("http://127.0.0.1:8000/api/verify-otp/", { email, otp });
      console.log("OTP Verification Response:", res.data);

      if (res.data.status === "Verified") {
        console.log("✅ OTP Verified Successfully!");
        navigate("/user-login");
      } else {
        console.error("❌ OTP is invalid!");
        setError("❌ OTP is invalid! Please try again.");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      setError("❌ OTP verification failed!");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="authbuttons-container">
      <div className="authbuttons-wrapper">
        <button className="signup-btn" onClick={() => navigate("/vender-dashboard")}>
          Vendor
        </button>

        {localStorage.getItem("user") ? (
          // ✅ Show Logout button when user is logged in
          <button className="login-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          // 🔄 Show Login button when user is NOT logged in
          <button className="login-btn" onClick={() => setShowPopup(true)}>
            Login
          </button>
        )}
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
