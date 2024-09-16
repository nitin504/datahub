import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

// Utility function to debounce a function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const SearchBar = ({ setResults, inputValue, setInputValue, onSearch, onResultsToggle }) => {
  const [input, setInput] = useState("");

  // Debounced version of companyData
  const debouncedCompanyData = useRef(debounce(async (value) => {
    try {
      const response = await fetch("https://datahub-backend-vosw.onrender.com/api/companies");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const companyData = await response.json();
      const results = searchJSONData(companyData, value);
      console.log("Filtered results:", results); // Debugging log
      setResults(results);
      onResultsToggle(true); // Show results when data is fetched
    } catch (error) {
      console.error("Failed to fetch company data:", error);
      setResults([]);
    }
  }, 300)).current;

  const searchJSONData = (data, input) => {
    const filteredData = data.filter((item) => {
      if (item.companyName) {
        const companyWords = item.companyName.split(/\s+/);  
        return companyWords.some((word) => word.toLowerCase().startsWith(input.toLowerCase())); 
      }
      return false;
    });
  
    return filteredData.sort((a, b) => 
      a.companyName.trim().toLowerCase().localeCompare(b.companyName.trim().toLowerCase())
    );
  };
  

  //some change kuuch kra hai

  const handleChange = (value) => {
    setInput(value);
    setInputValue(value);
    if (value) {
      debouncedCompanyData(value); // Use debounced function
    } else {
      setResults([]);
      onResultsToggle(false); // Hide results if input is empty
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(input); 
    }
  };

  return (
    <div className="banner">
      <div className="search-container">
        <div className="input-wrapper">
          <FaSearch id="search-icon" />
          <input
            type="text"
            placeholder="Search for companies"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};
