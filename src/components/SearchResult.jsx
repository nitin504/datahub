import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook
import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { isAuthenticated, loginWithRedirect } = useAuth0(); // Get authentication status and login function

  const handleClick = () => {
    if (isAuthenticated) {
      navigate(`/company/${encodeURIComponent(result.companyName)}`); // Navigate to company detail page if authenticated
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
