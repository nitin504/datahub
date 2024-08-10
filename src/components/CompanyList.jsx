import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import "./CompanyList.css";

export const CompanyList = ({ results }) => {
  const [expandedRows, setExpandedRows] = useState([]); // State to track which rows are expanded

  const handleExpandClick = (index) => {
    setExpandedRows(prevState =>
      prevState.includes(index)
        ? prevState.filter(row => row !== index) // Collapse if already expanded
        : [...prevState, index] // Expand if not already expanded
    );
  };

  // Custom render function for the Tech Stack column
  const renderTechStack = (value, tableMeta) => {
    const techStack = value.split(', '); // Assuming the tech stack is passed as a comma-separated string
    const maxVisible = 5; // Number of items to show before truncation
    const isExpanded = expandedRows.includes(tableMeta.rowIndex);

    if (isExpanded || techStack.length <= maxVisible) {
      return techStack.join(', '); // Show full tech stack if expanded
    } else {
      const visibleStack = techStack.slice(0, maxVisible).join(', ');
      const remainingCount = techStack.length - maxVisible;
      return (
        <span>
          {visibleStack} 
          <button 
            className="expand-button" 
            onClick={() => handleExpandClick(tableMeta.rowIndex)}
          >
            +{remainingCount}
          </button>
        </span>
      );
    }
  };

  // Define columns with their labels and custom render function for Tech Stack
  const columns = [
    { name: "companyName", label: "Company Name" },
    { name: "state", label: "State" },
    { name: "industry", label: "Industry" },
    { name: "annualRevenue", label: "Annual Revenue" },
    { name: "internalITTeam", label: "Internal IT Team" },
    {
      name: "techStack",
      label: "Tech Stack",
      options: {
        customBodyRender: renderTechStack
      }
    }
  ];

  // Format the data for the table
  const data = results.map(result => ({
    companyName: result.companyName,
    state: result.state,
    industry: result.industry,
    annualRevenue: result.annualRevenue,
    internalITTeam: result.internalITTeam ? "Yes" : "No",
    techStack: result.techStack.join(', ') // Assuming techStack is an array
  }));

  // Table options to ensure it fits within the screen
  const options = {
    selectableRows: 'none', // Disable row selection
    responsive: 'standard', // Ensure the table is responsive
  };

  return (
    <div className="company-list-container">
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};
