import React, { useState } from "react";
import { FaBoxOpen, FaDollarSign, FaImages, FaCheckCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../../assets/css/VendorStockUpload.css";

export default function VendorStockUploadStep1({ onNext, onBack, step }) {
  return (
    <div className="vendorstockupload-container">
      {/* 🔹 Header */}
      <div className="vendorstockupload-header">
        <h1>Upload Your Stock</h1>
        <p>Fill in the details below to add your products to the marketplace.</p>
      </div>

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

      {step === 1 && (
        <div className="vendorstockupload-step">
          <h2 className="step-heading">Product Details</h2>
          <label>Product Name</label>
          <input type="text" placeholder="Enter product name" className="vendorstockupload-input" />
          
          <label>Category</label>
          <input type="text" placeholder="Enter category" className="vendorstockupload-input" />
          
          <label>Brand</label>
          <input type="text" placeholder="Enter brand" className="vendorstockupload-input" />
          
          <label>Size</label>
          <input type="text" placeholder="Enter size (e.g., S, M, L, XL)" className="vendorstockupload-input" />

          <label>Color</label>
          <input type="text" placeholder="Enter color (e.g., Red, Blue)" className="vendorstockupload-input" />

          <label>Material</label>
          <input type="text" placeholder="Enter material (e.g., Cotton, Polyester)" className="vendorstockupload-input" />

          <label>Description</label>
          <textarea placeholder="Enter product description" className="vendorstockupload-textarea"></textarea>
        </div>
      )}

      {step === 2 && (
        <div className="vendorstockupload-step">
          <h2 className="step-heading">Pricing & Quantity</h2>
          <label>Price</label>
          <input type="number" placeholder="Enter price" className="vendorstockupload-input" />

          <label>Stock Quantity</label>
          <input type="number" placeholder="Enter quantity" className="vendorstockupload-input" />

          <label>Discount (Optional)</label>
          <input type="number" placeholder="Enter discount" className="vendorstockupload-input" />

          <label>Minimum Order Quantity (MOQ)</label>
          <input type="number" placeholder="Enter MOQ (e.g., 10, 20)" className="vendorstockupload-input" />

          <label>Tax % (GST/VAT)</label>
          <input type="number" placeholder="Enter tax percentage" className="vendorstockupload-input" />
        </div>
      )}

      {/* 🔹 Navigation Buttons */}
      <div className="vendorstockupload-buttons">
        {step > 1 && (
          <button className="vendorstockupload-btn vendorstockupload-back" onClick={onBack}>
            <FaArrowLeft /> Back
          </button>
        )}
        <button className="vendorstockupload-btn vendorstockupload-next" onClick={onNext}>
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
