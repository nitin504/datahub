import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import "./CompanyList.css";

export const CompanyList = ({ results }) => {
  const [expandedRows, setExpandedRows] = useState([]); // State to track expanded rows

  const handleToggleExpand = (index) => {
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

    if (isExpanded) {
      return (
        <span onClick={() => handleToggleExpand(tableMeta.rowIndex)} className="tech-stack">
          {techStack.join(', ')}
        </span>
      );
    } else {
      const visibleStack = techStack.slice(0, maxVisible).join(', ');
      const remainingCount = techStack.length - maxVisible;
      return (
        <span onClick={() => handleToggleExpand(tableMeta.rowIndex)} className="tech-stack">
          {visibleStack}{remainingCount > 0 && ` +${remainingCount}`}
        </span>
      );
    }
  };

  // Define columns with their labels and custom render function for Tech Stack
  const columns = [
    {
     name: "companyName",
     label: "Company Name",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "state",
     label: "State",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "industry",
     label: "Industry",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "annualRevenue",
     label: "Annual Revenue",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "internalITTeam",
     label: "Internal IT Team",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "techStack",
     label: "Tech Stack",
     options: {
      filter: false,
      sort: false,
      customBodyRender: renderTechStack,
     }
    },
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
