import React, { useState } from 'react';
import './CompanyDiagram.css';
import SideWindow from './SideWindow';
import API_BASE_URL from '../apiConfig';

const segments = [
  { name: "Industry", color: "#1e3a8a" },
  { name: "Revenue", color: "#1e40af" },
  { name: "Tech Stack", color: "#1d4ed8" },
  { name: "Vendors", color: "#2563eb" },
  { name: "Contacts", color: "#3b82f6" },
  { name: "Others", color: "#60a5fa" },
];

const CompanyDiagram = ({ companyDetails }) => {
  const [activeSegment, setActiveSegment] = useState(null);
  const [segmentData, setSegmentData] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSegmentData = async (segmentName) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/company/${encodeURIComponent(companyDetails.companyName)}/${segmentName.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch ${segmentName} data`);
      }
      const data = await response.json();
      setSegmentData(data);
    } catch (error) {
      setSegmentData(`Error fetching ${segmentName} data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSegmentClick = (segment) => {
    setActiveSegment(segment.name);
    setIsOpen(true);
    fetchSegmentData(segment.name);
  };

  const handleCloseWindow = () => {
    setIsOpen(false);
    setActiveSegment(null);
  };

  return (
    <div className="company-diagram-container">
      <div className="diagram-wrapper">
        <div className="relative large-diagram">
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

              // Adjust font size based on length of segment name
              const fontSize = segment.name.length > 7 ? '2.5' : '3.5';

              return (
                <g key={segment.name} onClick={() => handleSegmentClick(segment)}>
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 48 48 0 0 1 ${x2} ${y2} Z`}
                    fill={segment.color}
                    className="diagram-segment"
                    aria-label={segment.name}
                    style={{ cursor: 'pointer' }}
                  />
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="diagram-label"
                    style={{ fontSize: fontSize, fill: 'white' }} // Adjusted font size here
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
              <h2 className="company-name">{companyDetails?.companyName}</h2>
              <a href={companyDetails?.website} className="company-website">
                {companyDetails?.website}
              </a>
            </div>
          </div>
        </div>
      </div>

      <SideWindow
        isOpen={isOpen}
        title={activeSegment}
        content={loading ? "Loading..." : segmentData}
        onClose={handleCloseWindow}
      />
    </div>
  );
};

export default CompanyDiagram;
