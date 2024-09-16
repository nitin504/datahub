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
    // Filter results based on the search term
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

    document.addEventListener("mousedown", handleClickOutside);

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

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
        />
        <div ref={resultsRef} style={{ display: showResults ? 'block' : 'none' }}>
          <SearchResultsList results={results} inputValue={inputValue} />
        </div>
      </div>
      <div className="CompanyList">
        <CompanyList results={companyListResults} />
      </div>
    </div>
  );
};

export default App;
