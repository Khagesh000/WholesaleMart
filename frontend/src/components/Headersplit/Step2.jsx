import React, { useState } from "react";

export default function Step2({ formData, errors, handleChange, prevStep, nextStep }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // 📌 Fetch address suggestions while typing
  const fetchAddressSuggestions = async (query) => {
    if (query.length < 3) return; // Avoid unnecessary API calls for short inputs

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();

      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  // 📍 Get Pincode from Selected Address
  const handleAddressSelect = async (address) => {
    handleChange({ target: { name: "shopAddress", value: address.display_name } });

    // Try to find the pincode in the address details
    const pincode = address.address && address.address.postcode ? address.address.postcode : "";
    handleChange({ target: { name: "pincode", value: pincode } });

    setSuggestions([]); // Hide suggestions after selection
  };

  return (
    <div className="vendorform-step">
      <h3>Step 2: Shop & Tax Details</h3>

      {/* Shop Name */}
      <input type="text" name="shopName" placeholder="Shop Name" value={formData.shopName} onChange={handleChange} className="vendorform-input" />
      {errors.shopName && <p className="error-text">{errors.shopName}</p>}

      {/* 📍 Shop Address with Suggestions */}
      <input
        type="text"
        name="shopAddress"
        placeholder="Enter Shop Address"
        value={formData.shopAddress}
        onChange={(e) => {
          handleChange(e);
          fetchAddressSuggestions(e.target.value);
        }}
        className="vendorform-input"
      />
      {errors.shopAddress && <p className="error-text">{errors.shopAddress}</p>}

      {/* 📌 Display Suggestions */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion.place_id} onClick={() => handleAddressSelect(suggestion)}>
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}

      {/* 📍 Shop Full Address (Optional) */}
      <input
        type="text"
        name="shopFullAddress"
        placeholder="Enter Full Shop Address (Optional)"
        value={formData.shopFullAddress}
        onChange={handleChange}
        className="vendorform-input"
      />

      {/* Pincode (Auto-filled) */}
      <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="vendorform-input" />
      {errors.pincode && <p className="error-text">{errors.pincode}</p>}

      {/* PAN Number */}
      <input type="text" name="panNumber" placeholder="PAN Number" value={formData.panNumber} onChange={handleChange} className="vendorform-input" />
      {errors.panNumber && <p className="error-text">{errors.panNumber}</p>}

      {/* GST Number (Optional) */}
      <input type="text" name="gstNumber" placeholder="GST Number (Optional)" value={formData.gstNumber} onChange={handleChange} className="vendorform-input" />
      {errors.gstNumber && <p className="error-text">{errors.gstNumber}</p>}

      {/* Navigation Buttons */}
      <button onClick={prevStep} className="vendorform-btn-back">Back</button>
      <button onClick={nextStep} className="vendorform-btn">Next</button>
    </div>
  );
}
