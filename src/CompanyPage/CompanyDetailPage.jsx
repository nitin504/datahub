import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./CompanyDetailPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { API_BASE_URL } from "../apiConfig";

export const CompanyDetailPage = () => {
  const { companyName } = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);
  const [error, setError] = useState(null);
  const [copiedText, setCopiedText] = useState("");
  const [showTooltip, setShowTooltip] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/${encodeURIComponent(companyName)}`
        );
        if (!response.ok) throw new Error("Failed to fetch company details");
        const data = await response.json();
        setCompanyDetails(data);

        // Fetch similar companies
        const similarResponse = await fetch(
          `${API_BASE_URL}/${encodeURIComponent(companyName)}/similar`
        );
        if (similarResponse.ok) {
          const similarCompanies = await similarResponse.json();
          setCompanyDetails((prev) => ({ ...prev, similarCompanies }));
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCompanyDetails();
  }, [companyName]);

  const handleCopyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setShowTooltip((prev) => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setShowTooltip((prev) => ({ ...prev, [index]: false }));
      }, 2000);
    });
  };

  const handleAdvanceView = () => {
    navigate(`/company/${encodeURIComponent(companyName)}/advance`, {
      state: { companyDetails },
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!companyDetails) {
    return (
      <div className="loader-container">
        <div className="loader">
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__ball"></div>
        </div>
      </div>
    );
  }

  const handleSimilarCompanyClick = (companyName) => {
    navigate(`/company/${encodeURIComponent(companyName)}`, {
      state: { companyDetails },
    });
  };

  return (
    <div>
      <Header />
      <div className="company-detail-container">
        <div className="company-overview">
          <div className="company-header">
            <img
              src={companyDetails.logoUrl}
              alt={companyDetails.companyName}
              className="company-logo"
            />
            <h1>{companyDetails.companyName}</h1>
            <a
              href={companyDetails.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGlobe} /> {companyDetails.website}
            </a>
            <div className="social-icons">
              {companyDetails.linkedin && (
                <a
                  href={companyDetails.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              )}
            </div>
            <button className="advance-view-button" onClick={handleAdvanceView}>
              Advanced View
            </button>
          </div>
          <div className="company-info">
            <p>{companyDetails.description}</p>
            <p>
              <strong>Location:</strong> {companyDetails.state}
            </p>
            <p>
              <strong>Revenue:</strong> ${companyDetails.annualRevenue}
            </p>
          </div>
        </div>

        <div className="company-details">
          <h2>Company Details</h2>
          <p>
            <strong>Phone:</strong>
            <span
              onClick={() => handleCopyToClipboard(companyDetails.phone)}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faPhone} /> {companyDetails.phone}
            </span>
          </p>
          <p>
            <strong>Domain Rank:</strong> {companyDetails.domainRank}
          </p>
          <p>
            <strong>Year Founded:</strong> {companyDetails.yearFounded}
          </p>
          <p>
            <strong>Employee Count:</strong> {companyDetails.employeeCount}
          </p>
        </div>

        <div className="tech-stacks">
          <h2>Tech Stack</h2>
          <div className="stack-list">
            {Array.isArray(companyDetails.techStack) &&
            companyDetails.techStack.length > 0 ? (
              companyDetails.techStack.map((tech, index) => (
                <span key={index} className="tech-item">
                  {tech}
                </span>
              ))
            ) : (
              <p>No Tech Stack available</p>
            )}
          </div>
        </div>

        <div className="contacts">
          <h2>Contacts</h2>
          {companyDetails.contactPersons &&
          companyDetails.contactPersons.length > 0 ? (
            companyDetails.contactPersons.map((contact, index) => (
              <div key={index} className="contact-card">
                <h3>
                  <a
                    href={contact.LinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.Name}
                  </a>
                </h3>
                <p>{contact.Designation}</p>
                <p
                  onClick={() =>
                    handleCopyToClipboard(contact["Email ID"], index)
                  }
                  className="contact-info"
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faEnvelope} /> {contact["Email ID"]}
                </p>
                <p
                  onClick={() =>
                    handleCopyToClipboard(contact["Company Ph. No."], index)
                  }
                  className="contact-info"
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faPhone} />{" "}
                  {contact["Company Ph. No."]}
                </p>
                {showTooltip[index] && (
                  <div className="tooltip">Copied: {copiedText}</div>
                )}
              </div>
            ))
          ) : (
            <p>No contacts available</p>
          )}
        </div>

        <div className="industry">
          <h2>Industry</h2>
          <p>
            {companyDetails.industry || "No Industry information available"}
          </p>
        </div>

        <div className="similar-companies">
          <h2>Similar Companies</h2>
          <div className="stack-list">
            {Array.isArray(companyDetails.similarCompanies) &&
            companyDetails.similarCompanies.length > 0 ? (
              companyDetails.similarCompanies
                .slice(0, 6)
                .map((company, index) => (
                  <li
                    key={index}
                    onClick={() => handleSimilarCompanyClick(company)}
                    className="clickable-company"
                  >
                    {company}
                  </li>
                ))
            ) : (
              <p>No Similar Companies available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
