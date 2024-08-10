import React, { useState } from "react";
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
    // Filter results based on the search term
    const filteredResults = results.filter((result) =>
      result.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCompanyListResults(filteredResults);
  };

  return (
    <div className='App'>
      <div className="Header">
        <Header />
      </div>
      <div className='search-bar-container'>
        <SearchBar
          setResults={setResults}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSearch={handleSearch}
        />
        <SearchResultsList results={results} inputValue={inputValue} />
      </div>
      <div className="CompanyList">
        <CompanyList results={companyListResults} />
      </div>
    </div>
  );
};

export default App;
