// src/App.jsx
import React, { useState, useRef, useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import Header from './components/Header';
import LoginSignup from './UserPage/LoginSignup';
import "./App.css";
import { CompanyList } from "./components/CompanyList";

const App = () => {
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [companyListResults, setCompanyListResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginSignup, setShowLoginSignup] = useState(false);
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

  const handleAvatarClick = () => {
    if (!isLoggedIn) {
      setShowLoginSignup(true);
    }
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    setShowLoginSignup(false);
  };

  return (
    <div className='App'>
      <Header 
        isLoggedIn={isLoggedIn}
        userInitials={username ? username.charAt(0).toUpperCase() : ''}
        onAvatarClick={handleAvatarClick}
      />
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
          <div
            ref={resultsRef}
            className={`search-results-container`}
          >
            <SearchResultsList results={results} inputValue={inputValue} />
          </div>
        )}
      </div>
      <div className="company-list-container">
        <CompanyList results={companyListResults} />
      </div>
      {showLoginSignup && (
        <LoginSignup 
          onLogin={handleLogin}
          onClose={() => setShowLoginSignup(false)}
        />
      )}
    </div>
  );
};

export default App;