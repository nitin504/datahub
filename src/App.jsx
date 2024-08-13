import React, { useState, useRef } from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import Header from './components/Header';
import "./App.css";
import { CompanyList } from "./components/CompanyList";

const App = () => {
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [companyListResults, setCompanyListResults] = useState([]);

  const handleSearch = (searchTerm) => {
    const filteredResults = results.filter((result) =>
      result.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCompanyListResults(filteredResults);
  };

  const clearResults = () => {
    setResults([]);
    setInputValue('');
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
          clearResults={clearResults}
        />
        <SearchResultsList results={results} inputValue={inputValue} />
        <CompanyList results={companyListResults} />
      </div>
    </div>
  );
};

export default App;
