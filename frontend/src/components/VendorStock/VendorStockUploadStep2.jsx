import React from "react";
import { FaBoxOpen, FaDollarSign, FaImages, FaCheckCircle, FaArrowLeft, FaArrowRight, FaUpload } from "react-icons/fa";
import "../../assets/css/VendorStockUpload.css";
import "../../assets/css/VendorStockUploadStep.css";

export default function VendorStockUploadStep2({ onNext, onBack, step }) {
  return (
    <div className="vendorstockupload-container">
      {/* 🔹 Step Indicator */}
      <div className="vendorstockupload-step-indicator">
        <div className={`step ${step === 1 ? "active" : ""}`}>
          <FaBoxOpen className="step-icon" />
          <p>Product</p>
        </div>
        <div className={`step ${step === 2 ? "active" : ""}`}>
          <FaDollarSign className="step-icon" />
          <p>Pricing</p>
        </div>
        <div className={`step ${step === 3 ? "active" : ""}`}>
          <FaImages className="step-icon" />
          <p>Images</p>
        </div>
        <div className={`step ${step === 4 ? "active" : ""}`}>
          <FaCheckCircle className="step-icon" />
          <p>Review</p>
        </div>
      </div>

      {/* 🔹 Step Forms */}
      {step === 3 && (
        <div className="vendorstockupload-step">
          <h2 className="step-heading">Upload Product Images</h2>

          <div className="vendorstockupload-upload-box">
            <label className="vendorstockupload-file-label">
              <FaUpload className="upload-icon" />
              <span>Drag & Drop or Click to Upload</span>
              <input type="file" multiple className="vendorstockupload-file" />
            </label>
          </div>

          <h2 className="step-heading">Upload Product Video (Optional)</h2>

          <div className="vendorstockupload-upload-box">
            <label className="vendorstockupload-file-label">
              <FaUpload className="upload-icon" />
              <span>Click to Upload Video</span>
              <input type="file" className="vendorstockupload-file" />
            </label>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="vendorstockupload-step">
          <h2 className="step-heading">Review & Submit</h2>
          <p>Review your details before submitting.</p>
          <label className="vendorstockupload-checkbox">
            <input type="checkbox" />
            I confirm that all information is accurate.
          </label>
          <button className="vendorstockupload-submit">Submit</button>
        </div>
      )}

      {/* 🔹 Navigation Buttons */}
      <div className="vendorstockupload-buttons">
        <button className="vendorstockupload-btn vendorstockupload-back" onClick={onBack}>
          <FaArrowLeft /> Back
        </button>
        {step < 4 && (
          <button className="vendorstockupload-btn vendorstockupload-next" onClick={onNext}>
            Next <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}
