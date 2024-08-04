import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const companyData = async (value) => {
    try {
      const response = await fetch("http://192.168.137.1:3000/api/companies");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const companyData = await response.json();
      const results = searchJSONData(companyData, value);
      console.log("Filtered results:", results); // Debugging log
      setResults(results);
    } catch (error) {
      console.error("Failed to fetch company data:", error);
      setResults([]); // Set to empty array in case of error
    }
  };

  const searchJSONData = (data, input) => {
    const regex = new RegExp(input, "i");
    const filteredData = data.filter((item) => {
      return item.companyName && regex.test(item.companyName);
    });
    return filteredData.sort((a, b) => a.companyName.localeCompare(b.companyName));
  };

  const handleChange = (value) => {
    setInput(value);
    if (value) {
      companyData(value);
    } else {
      setResults([]); // Clear results if input is empty
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
          />
        </div>
      </div>
    </div>
  );
};
