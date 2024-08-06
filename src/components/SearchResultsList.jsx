import React from 'react';
import "./SearchResultsList.css";
import { SearchResult } from './SearchResult';

export const SearchResultsList = ({ results, inputValue }) => {
  console.log("Results list:", results);
  if (!inputValue) {
    return null; 
  }

  return (
    <div className='results-list'>
      {results.length === 0 ? (
        <div className="no-results">No results found</div>
      ) : (
        results.map((result, id) => {
          console.log("Rendering result:", result); 
          return <SearchResult key={id} result={result} />;
        })
      )}
    </div>
  );
};
