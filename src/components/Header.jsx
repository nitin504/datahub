// src/components/Header.jsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Import the Auth0 hook
import './Header.css';

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0(); // Destructure Auth0 methods

  return (
    <header className="header">
      <span>Datahub.ai</span>
      <div className="header__user">
        <button className="header__help">Help</button>
        {isAuthenticated ? (
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>
        ) : (
          <button onClick={loginWithRedirect}>Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;
