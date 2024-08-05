import React, { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";

import "./App.css";

const App = () => {
  const [results, setResults] = useState([]);

  return (
    <div className='App'>
        <div className="Header">
          
        </div>
        <div className='search-bar-container'>
          <SearchBar setResults={setResults} />
          <SearchResultsList results={results} />
        </div>
    </div>
  );
};

export default App;
