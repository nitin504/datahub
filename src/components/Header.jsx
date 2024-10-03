import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  const handleAvatarClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();  
    }
  };

  const getUsernameFromEmail = (email) => {
    if (email && email.includes('@')) {
      return email.split('@')[0];  
    }
    return email;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="header">
      <span>Datahub.ai</span>
      <div className="header__user">
        <Link to="/help" className="header__help">Help</Link>

        <Link to="/feedback" className="header__feedback">Feedback</Link>

        <div className="header__avatar" onClick={handleAvatarClick}>
          {isAuthenticated ? (user?.name.charAt(0).toUpperCase()) : '?'}
        </div>

        {isAuthenticated && (
          <span className="header__username">
            {user?.name.includes('@') ? getUsernameFromEmail(user.name) : user?.name}
          </span>
        )}

        {isAuthenticated && (
          <button className="header__logout-btn" onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
