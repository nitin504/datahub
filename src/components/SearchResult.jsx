import React from 'react';
import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  console.log("Rendering result:", result); // Debugging log
  return (
    <div className='search-result' onClick={() => alert(`You clicked on ${result._id}`)}>
      <div>{result.companyName}</div>
      {result.email && <div>{result.email}</div>}
    </div>
  );
};