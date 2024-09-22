// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CompanyDetailPage from './CompanyPage/CompanyDetailPage.jsx';
import CompanyAdvance from './CompanyPage/CompanyAdvance.jsx';
import Help from './components/Help.jsx'; // Import the Help component
import Feedback from './components/Feedback.jsx'; // Import the Feedback component
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
    path: "/company/:companyName",
    element: <CompanyDetailPage />,
  },
  {
    path: "/company/:companyName/advance",
    element: <CompanyAdvance />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/help",
    element: <Help />, // Route for Help page
  },
  {
    path: "/feedback",
    element: <Feedback />, // Route for Feedback page
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
