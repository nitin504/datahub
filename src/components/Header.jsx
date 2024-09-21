// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, userInitials, onAvatarClick }) => {
  return (
    <header className="header">
      <span>Datahub.ai</span>
      <div className="header__user">
        <button className="header__help">Help</button>
        <div className="header__avatar" onClick={onAvatarClick}>
          {isLoggedIn ? userInitials : '?'}
        </div>
      </div>
    </header>
  );
};

export default Header;