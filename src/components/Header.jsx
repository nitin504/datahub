import React from 'react';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="headerrrr">
        <span>Datahub.ai</span>      
      <div className="header__user">
        <button className="header__help">Help</button>
        <div className="header__avatar">LW</div>
      </div>
    </header>
  );
};

export default Header;
