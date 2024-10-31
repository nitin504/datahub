import React, { useState, useRef, useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import Header from './components/Header';
import "./App.css";
import { CompanyList } from "./components/CompanyList";
import { useAuth0 } from "@auth0/auth0-react"; 

const App = () => {
  const { isAuthenticated, user, logout } = useAuth0();
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [companyListResults, setCompanyListResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchBarRef = useRef(null);
  const resultsRef = useRef(null);

  const handleSearch = (searchTerm) => {
    const filteredResults = results.filter((result) =>
      result.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCompanyListResults(filteredResults);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(event.target) &&
        !searchBarRef.current.contains(event.target)
      ) {
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
    if (inputValue) {
      handleSearch(inputValue);
      setShowResults(true);
    }
  };

  const handleResultsDisplay = (show) => {
    setShowResults(show);
  };

  return (
    <div className='App'>
      <Header />
      {isAuthenticated ? (
        user.email_verified ? (
          <>
            <div className='search-bar-container' ref={searchBarRef}>
              <SearchBar
                setResults={setResults}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSearch={handleSearch}
                onResultsToggle={handleResultsDisplay}
                onFocus={handleSearchBarFocus}
              />
              {showResults && (
                <div ref={resultsRef} className="search-results-container">
                  <SearchResultsList results={results} inputValue={inputValue} />
                </div>
              )}
            </div>
            <div className="company-list-container">
              {companyListResults.length > 0 ? (
                <CompanyList results={companyListResults} />
              ) : (
                <div className="placeholder-message">
                  Start searching for companies to see the results here!
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="verification-message">
            <p>Please check your inbox and follow the link to confirm your email address before you continue</p>
          </div>
        )
      ) : (
        <div className='search-bar-container' ref={searchBarRef}>
          <SearchBar
            setResults={setResults}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSearch={handleSearch}
            onResultsToggle={handleResultsDisplay}
            onFocus={handleSearchBarFocus}
          />
          {showResults && (
            <div ref={resultsRef} className="search-results-container">
              <SearchResultsList results={results} inputValue={inputValue} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
