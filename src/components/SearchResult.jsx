import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    navigate(`/company/${encodeURIComponent(result.companyName)}`); // Navigate to company detail page
  };

  return (
    <div className='search-result' onClick={handleClick}>
      <div>{result.companyName}</div>
      {result.email && <div>{result.email}</div>}
    </div>
  );
};