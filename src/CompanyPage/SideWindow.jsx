import React from 'react';
import './SideWindow.css'; // Add styles for sliding animation

const SideWindow = ({ isOpen, title, content, onClose }) => {
  return (
    <div className={`side-window ${isOpen ? 'open' : ''}`}>
      <div className="side-window-header">
        <h2 className="side-window-title">{title}</h2>
        <button onClick={onClose} className="close-button">X</button>
      </div>
      <div className="side-window-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default SideWindow;
