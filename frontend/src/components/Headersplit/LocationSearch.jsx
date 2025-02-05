import React, { useState } from 'react';
import '../../assets/css/HeaderCss/LocationSearch.css';

export default function LocationSearch() {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const statesData = ['Delhi', 'Maharashtra', 'Uttar Pradesh', 'Tamil Nadu', 'Karnataka', 'Bengaluru'];

  const handleCityChange = (e) => {
    const input = e.target.value;
    setCity(input);

    if (input) {
      const filteredSuggestions = statesData.filter((state) =>
        state.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  };

  const handleSuggestionClick = (state) => {
    setCity(state);
    setSuggestions([]);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  return (
    <div className="header-location-container">
      <div className="location-input-wrapper">
        <input
          type="text"
          className="form-control header-location-search"
          placeholder="Select Location"
          value={city}
          onChange={handleCityChange}
          onFocus={() => setDropdownVisible(true)}
        />
        <div
          className="location-dropdown-icon"
          onClick={toggleDropdown}
        >
          ▼
        </div>
      </div>
      {dropdownVisible && (
        <div className="header-dropdown-suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="header-suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}