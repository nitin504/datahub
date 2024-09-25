import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to get state
import CompanyDiagram from './CompanyDiagram';
import Header from '../components/Header';

const CompanyAdvance = () => {
  const location = useLocation();
  const { companyDetails } = location.state || {}; // Get company details from the state

  return (
    <div className="CompanyAdvance">
      <Header />
      {/* Pass company details to CompanyDiagram if available */}
      {companyDetails ? (
        <CompanyDiagram companyDetails={companyDetails} />
      ) : (
        <p>No company details available</p>
      )}
    </div>
  );
};

export default CompanyAdvance;
