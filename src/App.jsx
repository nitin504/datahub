import React, { useState, useRef, useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import Header from './components/Header';
import "./App.css";
import { CompanyList } from "./components/CompanyList";

const App = () => {
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [companyListResults, setCompanyListResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);

  const handleSearch = (searchTerm) => {
    const filteredResults = results.filter((result) =>
      result.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCompanyListResults(filteredResults);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    const handleEnterKey = (event) => {
      if (event.key === "Enter") {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEnterKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, []);

  const handleSearchBarFocus = () => {
    // If there is already an input value, trigger the search and show results
    if (inputValue) {
      handleSearch(inputValue); // Trigger the search with the current input value
      setShowResults(true); // Make sure the results are shown again on focus
    }
  };

  const handleResultsDisplay = (show) => {
    setShowResults(show);
  };

  return (
    <div className='App'>
      <Header />
      <div className='search-bar-container'>
        <SearchBar
          setResults={setResults}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSearch={handleSearch}
          onResultsToggle={handleResultsDisplay}
          onFocus={handleSearchBarFocus} // Handle focus to restore results
        />
        <div
          ref={resultsRef}
          className={`search-results-container ${showResults ? 'show' : 'hide'}`}
        >
          <SearchResultsList results={results} inputValue={inputValue} />
        </div>
      </div>
      <div className="company-list-container">
        <CompanyList results={companyListResults} />
      </div>
    </div>
  );
};

export default App;
