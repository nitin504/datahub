import React from 'react';
import { useLocation } from 'react-router-dom'; 
import CompanyDiagram from './CompanyDiagram';
import Header from '../components/Header';

const CompanyAdvance = () => {
  const location = useLocation();
  const { companyDetails } = location.state || {}; 

  return (
    <div className="CompanyAdvance">
      <Header />
      {companyDetails ? (
        <CompanyDiagram companyDetails={companyDetails} />
      ) : (
        <p>No company details available</p>
      )}
    </div>
  );
};

export default CompanyAdvance;
