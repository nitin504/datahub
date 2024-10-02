// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CompanyDetailPage from './CompanyPage/CompanyDetailPage.jsx';
import CompanyAdvance from './CompanyPage/CompanyAdvance.jsx';
import Help from './components/Help.jsx'; // Import the Help component
import Feedback from './components/Feedback.jsx'; // Import the Feedback component
import CustomErrorPage from './components/CustomErrorPage.jsx'; // Import the Custom Error component
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <CustomErrorPage />, // Custom error page for the App
  },
  {
    path: "/company/:companyName",
    element: <CompanyDetailPage />,
    errorElement: <CustomErrorPage />, // Custom error page for company detail
  },
  {
    path: "/company/:companyName/advance",
    element: <CompanyAdvance />,
    errorElement: <CustomErrorPage />, // Custom error page for advanced view
  },
  {
    path: "/help",
    element: <Help />, // Route for Help page
    errorElement: <CustomErrorPage />, // Custom error page for Help
  },
  {
    path: "/feedback",
    element: <Feedback />, // Route for Feedback page
    errorElement: <CustomErrorPage />, // Custom error page for Feedback
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
