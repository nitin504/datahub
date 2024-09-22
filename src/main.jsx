// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CompanyDetailPage from './CompanyPage/CompanyDetailPage.jsx';
import CompanyAdvance from './CompanyPage/CompanyAdvance.jsx'; // Import the CompanyAdvance component
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Custom error component for handling 404 or other errors
const ErrorPage = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/company/:companyName", // Dynamic route for company detail
    element: <CompanyDetailPage />,
  },
  {
    path: "/company/:companyName/advance", // Route for the advanced view
    element: <CompanyAdvance />,
    errorElement: <ErrorPage />, // Custom error page
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
