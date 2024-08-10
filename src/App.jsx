import React, { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import Header from './components/Header'; // Make sure the path is correct
import "./App.css";
import { CompanyList } from "./components/CompanyList";

const App = () => {
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className='App'>
        <div className="Header">
          <Header />
        </div>
        <div className='search-bar-container'>
          <SearchBar setResults={setResults} inputValue={inputValue} setInputValue={setInputValue} />
          <SearchResultsList results={results} inputValue={inputValue} />
        </div>
        <div className="CompanyList">
          <CompanyList />
        </div>
    </div>
  );
};

export default App;
