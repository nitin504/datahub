import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import "./CompanyList.css";
import {createTheme, ThemeProvider} from '@mui/material/styles'


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
    companyName : result.companyName,
    state: result.state,
    industry: result.industry,
    annualRevenue: result.annualRevenue,
    internalITTeam: result.internalITTeam ? "Yes" : "No",
    techStack: result.techStack.join(', ') // Assuming techStack is an array
  }));

  // Table options to ensure it fits within the screen
  const options = {
    selectableRows: false, // Disable row selection
    elevation: 0, // Remove elevation
    rowsPerPage: 10, // Set the number of rows per page
    responsive: 'standard', // Ensure the table is responsive
    rowsPerPageOptions: [10, 20, 30, 40, 50], // Set the options for the number of rows per page
    search: false, // Disable search
    download: false, // Disable CSV download
    print: false, // Disable print
    viewColumns: true, // Enable the ability to show/hide columns
    filter: true, // Enable filter
  };

  const getMuiTheme = () => 
    createTheme({
      typography: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: 15,
      },
      palette: {
        background: {
          paper: '#FFFFFF',
        }
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: '10px 4px',
              backgroundColor: '#F5F7FC',
              
            },
            body: {
              padding: '7px 15px',
              ":hover": {
                backgroundColor: '#F5F7FC',
              }
            },
            footer: {
              
            },
          },
        },
      },
    });

  return (
    <div className="company-list-container">
      <ThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
      </ThemeProvider>
    </div>
  );
};
