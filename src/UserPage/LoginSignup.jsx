// src/UserPage/LoginSignup.jsx
import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = ({ onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Implement login logic here
      onLogin(username);
    } else {
      // Implement signup logic here
      onLogin(username);
    }
  };

  return (
    <div className="login-signup-overlay">
      <div className="login-signup-modal">
        <div className="login-signup-header">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="login-signup-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-signup-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="login-signup-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              className="login-signup-toggle-button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;