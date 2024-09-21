import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import './CompanyDetailPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import API_BASE_URL from '../apiConfig';

export const CompanyDetailPage = () => {
  const { companyName } = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(companyName)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch company details');
        }
        const data = await response.json();
        setCompanyDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCompanyDetails();
  }, [companyName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!companyDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="company-detail-container">
        {/* Company Overview */}
        <div className="company-overview">
          <div className="company-header">
            <img src={companyDetails.logoUrl} alt={companyDetails.companyName} className="company-logo" />
            <h1>{companyDetails.companyName}</h1>
            <a href={companyDetails.website} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGlobe} /> {companyDetails.website}
            </a>
            <div className="social-icons">
              {companyDetails.linkedin && (
                <a href={companyDetails.linkedin} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              )}
            </div>
          </div>
          <div className="company-info">
            <p>{companyDetails.description}</p>
            <p><strong>Location:</strong> {companyDetails.location}</p>
            <p><strong>Revenue:</strong> ${companyDetails.annualRevenue}</p>
          </div>
        </div>

        {/* Company Details */}
        <div className="company-details">
          <h2>Company Details</h2>
          <p><strong>Phone:</strong> {companyDetails.phone}</p>
          <p><strong>Domain Rank:</strong> {companyDetails.domainRank}</p>
          <p><strong>Year Founded:</strong> {companyDetails.yearFounded}</p>
          <p><strong>Employee Count:</strong> {companyDetails.employeeCount}</p>
        </div>

        {/* Tech Stack */}
        <div className="tech-stacks">
          <h2>Tech Stack</h2>
          <div className="stack-list">
            {Array.isArray(companyDetails.techStack) && companyDetails.techStack.length > 0 ? (
              companyDetails.techStack.map((tech, index) => (
                <span key={index} className="tech-item">{tech}</span>
              ))
            ) : (
              <p>No Tech Stack available</p>
            )}
          </div>
        </div>

        {/* Contacts */}
        <div className="contacts">
          <h2>Contacts</h2>
          {companyDetails.contactPersons && companyDetails.contactPersons.length > 0 ? (
            companyDetails.contactPersons.map((contact, index) => (
              <div key={index} className="contact-card">
                <h3>
                  <a href={contact.LinkedIn} target="_blank" rel="noopener noreferrer">
                    {contact.Name}
                  </a>
                </h3>
                <p>{contact.Designation}</p>
                <p>
                  <a href={`mailto:${contact["Email ID"]}`}>
                    <FontAwesomeIcon icon={faEnvelope} /> {contact["Email ID"]}
                  </a>
                </p>
                <p>
                  <a href={`tel:${contact["Company Ph. No."]}`}>
                    <FontAwesomeIcon icon={faPhone} /> {contact["Company Ph. No."]}
                  </a>
                </p>
              </div>
            ))
          ) : (
            <p>No contacts available</p>
          )}
        </div>

        {/* Industry */}
        <div className="industry">
          <h2>Industry</h2>
          <p>{companyDetails.industry || 'No Industry information available'}</p>
        </div>

        {/* Similar Companies */}
        <div className="similar-companies">
          <h2>Similar Companies</h2>
          <ul>
            {Array.isArray(companyDetails.similarCompanies) && companyDetails.similarCompanies.length > 0 ? (
              companyDetails.similarCompanies.map((company, index) => (
                <li key={index}>{company}</li>
              ))
            ) : (
              <p>No Similar Companies available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;