import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import "./CompanyList.css";

export const CompanyList = ({ results }) => {
  // State to track expanded rows
  const [expandedRows, setExpandedRows] = useState([]);

  // Handle row expansion
  const handleRowClick = (rowData, rowIndex) => {
    setExpandedRows(prev => {
      const isRowExpanded = prev.includes(rowIndex);
      return isRowExpanded ? prev.filter(index => index !== rowIndex) : [...prev, rowIndex];
    });
  };

  // Define columns with their labels
  const columns = [
    { name: "companyName", label: "Company Name" },
    { name: "state", label: "State" },
    { name: "industry", label: "Industry" },
    { name: "annualRevenue", label: "Annual Revenue" },
    { name: "internalITTeam", label: "Internal IT Team" },
    { name: "techStack", label: "Tech Stack", 
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const isRowExpanded = expandedRows.includes(rowIndex);
          const maxDisplay = 3; // Number of tech stack items to display initially
          
          if (!value || value.length === 0) return "";

          const techArray = value.split(', '); // Assuming tech stack is a comma-separated string
          const displayTechs = techArray.slice(0, maxDisplay).join(', ');
          const remainingCount = techArray.length - maxDisplay;

          return (
            <div>
              {techArray.length > maxDisplay && !isRowExpanded ? (
                <>
                  {displayTechs}
                  <span 
                    className="tech-stack-more" 
                    onClick={() => handleRowClick(value, rowIndex)} // Toggle row expansion
                  >
                    +{remainingCount}
                  </span>
                </>
              ) : (
                <>
                  {displayTechs}
                  {remainingCount > 0 && isRowExpanded && (
                    <>
                      , <span className="tech-stack-more" onClick={() => handleRowClick(value, rowIndex)}>See less</span>
                    </>
                  )}
                  {isRowExpanded && techArray.slice(maxDisplay).join(', ')}
                </>
              )}
            </div>
          );
        }
      }
    }
  ];

  // Format the data for the table
  const data = results.map(result => ({
    companyName: result.companyName,
    state: result.state,
    industry: result.industry,
    annualRevenue: result.annualRevenue,
    internalITTeam: result.internalITTeam ? "Yes" : "No", // Format boolean value
    techStack: result.techStack.join(', ') // Assuming techStack is an array
  }));

  // Table options to disable row selection
  const options = {
    selectableRows: 'none', // Disable row selection
    filterType: 'dropdown', // You can adjust other options here as needed
    onRowClick: (rowData, rowMeta) => handleRowClick(rowData, rowMeta.rowIndex) // Add click handler to rows
  };

  return (
    <MUIDataTable
      data={data}
      columns={columns}
      options={options}
    />
  );
};
