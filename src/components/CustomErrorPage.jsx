// src/components/CustomErrorPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CustomErrorPage.css'; // Create a CSS file for styling

const CustomErrorPage = () => {
  return (
    <div className="error-container">
      <h1>404</h1>
      <h2>PAGE NOT FOUND</h2>
      <p>We looked everywhere for this page.</p>
      <p>Are you sure the website URL is correct?</p>
      <p>Get in touch with the site owner.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default CustomErrorPage;
