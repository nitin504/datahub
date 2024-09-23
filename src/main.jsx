
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CompanyDetailPage from './CompanyPage/CompanyDetailPage.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/company/:companyName", // Dynamic route
    element: <CompanyDetailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Auth0Provider
    domain="dev-8ctoivdt8iuhq0yg.us.auth0.com"
    clientId="OB8T6ehXu2gUNbyjG4Nq5VWAd6dkpkIs"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <RouterProvider router={router}/>
  </Auth0Provider>
    
  </React.StrictMode>,
)
