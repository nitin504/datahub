<<<<<<< HEAD

import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CompanyDetailPage from './CompanyPage/CompanyDetailPage.jsx'

=======
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
>>>>>>> fca592999d5e00e0dac2b5f071c6f55752b2e112
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
<<<<<<< HEAD
    <Auth0Provider
    domain="dev-8ctoivdt8iuhq0yg.us.auth0.com"
    clientId="OB8T6ehXu2gUNbyjG4Nq5VWAd6dkpkIs"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <RouterProvider router={router}/>
  </Auth0Provider>
    
=======
    <RouterProvider router={router} />
>>>>>>> fca592999d5e00e0dac2b5f071c6f55752b2e112
  </React.StrictMode>,
);
