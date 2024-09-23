import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import "./CompanyList.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook

export const CompanyList = ({ results }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0(); // Get authentication status

  const [expandedRows, setExpandedRows] = useState([]);

  const handleToggleExpand = (index) => {
    setExpandedRows(prevState =>
      prevState.includes(index)
        ? prevState.filter(row => row !== index)
        : [...prevState, index]
    );
  };

  const renderTechStack = (value, tableMeta) => {
    const techStack = value.split(', ');
    const maxVisible = 5;
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

  const columns = [
    {
      name: "companyName",
      label: "Company Name",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <span 
            className="CompanyName" 
            onClick={() => {
              if (isAuthenticated) {
                navigate(`/company/${encodeURIComponent(value)}`); // Navigate to company detail page if authenticated
              } else {
                alert("Please log in to view company details.");
                loginWithRedirect();
              }
            }}
          >
            {value}
          </span>
        )
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

  const data = results.map(result => ({
    companyName: result.companyName,
    state: result.state,
    industry: result.industry,
    annualRevenue: result.annualRevenue,
    internalITTeam: result.internalITTeam ? "Yes" : "No",
    techStack: result.techStack.join(', ')
  }));

  const options = {
    selectableRows: false,
    elevation: 0,
    rowsPerPage: 10,
    responsive: 'standard',
    rowsPerPageOptions: [10, 20, 30, 40, 50],
    search: false,
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
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
