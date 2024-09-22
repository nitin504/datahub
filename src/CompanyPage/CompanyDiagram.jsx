import React from 'react';
import './CompanyDiagram.css';


const segments = [
  { name: "Industry", color: "#1e3a8a" },
  { name: "Revenue", color: "#1e40af" },
  { name: "Tech Stack", color: "#1d4ed8" },
  { name: "Vendors", color: "#2563eb" },
  { name: "Contacts", color: "#3b82f6" },
  { name: "Others", color: "#60a5fa" },
];

const SocialIcon = ({ icon }) => {
  const icons = {
    facebook: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
    twitter: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
      </svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
    default: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    ),
  };

  return icons[icon] || icons.default;
};

const CompanyDiagram = () => {
  const companyData = {
    companyName: "Random Tech Corp",
    website: "https://randomtechcorp.com",
  };

  return (
    <div className="diagram-container">
      <div className="relative aspect-square">
        <svg viewBox="0 0 100 100" className="diagram-svg" role="img" aria-label="Company Diagram">
          {segments.map((segment, index) => {
            const startAngle = index * 60;
            const endAngle = (index + 1) * 60;
            const midAngle = (startAngle + endAngle) / 2;
            const x1 = 50 + 48 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 48 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 48 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 50 + 48 * Math.sin((endAngle * Math.PI) / 180);
            const labelX = 50 + 30 * Math.cos((midAngle * Math.PI) / 180);
            const labelY = 50 + 30 * Math.sin((midAngle * Math.PI) / 180);

            return (
              <g key={segment.name}>
                <path
                  d={`M 50 50 L ${x1} ${y1} A 48 48 0 0 1 ${x2} ${y2} Z`}
                  fill={segment.color}
                  className="diagram-segment"
                  aria-label={segment.name}
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="diagram-label"
                >
                  {segment.name}
                </text>
              </g>
            );
          })}
          <circle cx="50" cy="50" r="20" fill="white" />
        </svg>
        <div className="diagram-center-content">
          <div className="text-center">
            <h2 className="company-name">{companyData.companyName}</h2>
            <a href={companyData.website} className="company-website">
              {companyData.website}
            </a>
            <div className="social-icons">
              {['circle', 'facebook', 'twitter', 'linkedin'].map((icon) => (
                <span key={icon} className="social-icon">
                  <SocialIcon icon={icon} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDiagram;
