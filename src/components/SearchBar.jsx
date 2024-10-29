import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import {API_BASE_URL} from '../apiConfig';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const SearchBar = ({ setResults, inputValue, setInputValue, onSearch, onResultsToggle }) => {
  const [input, setInput] = useState("");

  const debouncedCompanyData = useRef(debounce(async (value) => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const companyData = await response.json();
      const results = searchJSONData(companyData, value);
      setResults(results);
      onResultsToggle(true); 
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
  

  

  const handleChange = (value) => {
    setInput(value);
    setInputValue(value);
    if (value) {
      debouncedCompanyData(value); 
    } else {
      setResults([]);
      onResultsToggle(false); 
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
