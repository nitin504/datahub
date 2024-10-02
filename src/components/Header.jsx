// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, userInitials, onAvatarClick }) => {
  return (
    <header className="header">
      <span>Datahub.ai</span>
      <div className="header__user">
        {/* Help link */}
        <Link to="/help" className="header__help">Help</Link>
        
        {/* Feedback link */}
        <Link to="/feedback" className="header__feedback">Feedback</Link>
        
        {/* Avatar with initials or fallback to '?' */}
        <div className="header__avatar" onClick={onAvatarClick}>
          {isLoggedIn ? userInitials : '?'}
        </div>
      </div>
    </header>
  );
};

export default Header;
