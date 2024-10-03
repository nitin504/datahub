
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CompanyDetailPage from './CompanyPage/CompanyDetailPage.jsx';
import CompanyAdvance from './CompanyPage/CompanyAdvance.jsx';
import Help from './components/Help.jsx'; 
import Feedback from './components/Feedback.jsx'; 
import CustomErrorPage from './components/CustomErrorPage.jsx'; 
import { Auth0Provider } from '@auth0/auth0-react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <CustomErrorPage />, 
  },
  {
    path: "/company/:companyName",
    element: <CompanyDetailPage />,
    errorElement: <CustomErrorPage />, 
  },
  {
    path: "/company/:companyName/advance",
    element: <CompanyAdvance />,
    errorElement: <CustomErrorPage />, 
  },
  {
    path: "/help",
    element: <Help />, 
    errorElement: <CustomErrorPage />, 
  },
  {
    path: "/feedback",
    element: <Feedback />, 
    errorElement: <CustomErrorPage />, 
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-8ctoivdt8iuhq0yg.us.auth0.com"
    clientId="CxNV8OmSjRsLh3t8PeOaCq8KStaziAHn"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <RouterProvider router={router}/>
  </Auth0Provider>
    
  </React.StrictMode>,
);
