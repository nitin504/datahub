import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth0 } from '@auth0/auth0-react'; 
import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  const navigate = useNavigate(); 
  const { isAuthenticated, loginWithRedirect } = useAuth0(); 

  const handleClick = () => {
    if (isAuthenticated) {
      navigate(`/company/${encodeURIComponent(result.companyName)}`);
    } else {
      alert("Please log in to view company details.");
      loginWithRedirect();
    }
  };

  return (
    <div className='search-result' onClick={handleClick}>
      <div>{result.companyName}</div>
      {result.email && <div>{result.email}</div>}
    </div>
  );
};
