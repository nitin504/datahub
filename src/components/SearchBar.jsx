import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults, inputValue, setInputValue, onSearch, clearResults }) => {
  const [input, setInput] = useState("");
  const searchContainerRef = useRef(null);

  const companyData = async (value) => {
    try {
      const response = await fetch("http://192.168.1.39:3000/api/companies");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const companyData = await response.json();
      const results = searchJSONData(companyData, value);
      setResults(results);
    } catch (error) {
      console.error("Failed to fetch company data:", error);
      setResults([]);
    }
  };

  const searchJSONData = (data, input) => {
    const regex = new RegExp(input, "i");
    const filteredData = data.filter((item) => item.companyName && regex.test(item.companyName));
    return filteredData.sort((a, b) => a.companyName.localeCompare(b.companyName));
  };

  const handleChange = (value) => {
    setInput(value);
    setInputValue(value);
    if (value) {
      companyData(value);
    } else {
      setResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(input);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        clearResults();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clearResults]);

  return (
    <div className="banner">
      <div className="search-container" ref={searchContainerRef}>
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
