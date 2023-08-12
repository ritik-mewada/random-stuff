import React, { useEffect, useState, useRef } from 'react';

const MapContainer = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);

    if (typeof window.google !== 'undefined') {
      const autocompleteService = new window.google.maps.places.AutocompleteService();

      if (value) {
        autocompleteService.getPlacePredictions(
          {
            input: value,
            types: ['geocode'],
          },
          (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setSuggestions(predictions.map((prediction) => prediction.description));
              setIsDropdownOpen(true);
            } else {
              setSuggestions([]);
              setIsDropdownOpen(false);
            }
          },
        );
      } else {
        setSuggestions([]);
        setIsDropdownOpen(false);
      }
    }
  };

  const handleSelect = (address) => {
    setInputValue(address);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        className="shadow-none"
        placeholder="Please enter address"
        onChange={handleInputChange}
      />
      {isDropdownOpen && (
        <ul className="dropdown-menu show p-0 w-100" ref={dropdownRef}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MapContainer;
