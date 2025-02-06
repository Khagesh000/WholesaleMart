import React, { useState } from "react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function LocationInput({ location, setLocation }) {
  const [filteredStates, setFilteredStates] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 0) {
      const suggestions = indianStates.filter((state) =>
        state.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredStates(suggestions);
    } else {
      setFilteredStates([]);
    }
  };

  const handleStateSelect = (state) => {
    setLocation(state);
    setFilteredStates([]); // Hide suggestions
  };

  return (
    <div className="location-container">
      <input
        type="text"
        className="location-input"
        placeholder="Enter Location"
        value={location}
        onChange={handleInputChange}
      />
      {filteredStates.length > 0 && (
        <ul className="suggestions-list">
          {filteredStates.map((state, index) => (
            <li key={index} onClick={() => handleStateSelect(state)}>
              {state}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
