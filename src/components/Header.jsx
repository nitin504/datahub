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
<<<<<<< HEAD
        <button className="header__help">Help</button>
        {isAuthenticated ? (
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>
        ) : (
          <button onClick={loginWithRedirect}>Login</button>
        )}
=======
        <Link to="/help" className="header__help">Help</Link>
        <Link to="/feedback" className="header__feedback">Feedback</Link>
        <div className="header__avatar" onClick={onAvatarClick}>
          {isLoggedIn ? userInitials : '?'}
        </div>
>>>>>>> fca592999d5e00e0dac2b5f071c6f55752b2e112
      </div>
    </header>
  );
};

export default Header;
