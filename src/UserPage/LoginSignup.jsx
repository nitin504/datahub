import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = ({ onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(username);
    } else {
      onLogin(username);
    }
  };

  const handleGoogleLogin = () => {
    onLogin('Google User'); 
  };


  return (
    <div className="login-signup-overlay">
      <div className="login-signup-modal">
        <div className="login-signup-header">
          <img src="https://auth0.com/wp-content/uploads/2018/07/b3e6efdc5ec11c29d2b3c95f31744aa6.svg" alt="Auth0 Logo" className="auth0-logo" />
          <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="login-signup-form">
          {isLogin ? (
            <>
              <input
                type="text"
                placeholder="Email or Username"
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
              <button type="button" className="forgot-password-link" onClick={handleForgotPassword}>
                Forgot your password?
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          )}
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
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <div className="separator">
          <div className="line"></div>
          <p>or</p>
          <div className="line"></div>
        </div>
        <button onClick={handleGoogleLogin} className="google-login-button">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" className="google-logo" />
          Continue with Google
        </button>
        <div className="login-signup-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              className="login-signup-toggle-button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;