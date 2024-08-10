import React, { useEffect, useState } from 'react';
import './CompanyList.css';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define columns with camel case keys and labels
const columns = [
    { name: "companyName", label: "Company Name" },
    { name: "state", label: "State" },
    { name: "industry", label: "Industry" },
    { name: "annualRevenue", label: "Annual Revenue" },
    { name: "internalITTeam", label: "Internal IT Team" },
    { name: "techStack", label: "Tech Stack" }
];

export const CompanyList = ({ searchInput }) => {
    const [data, setData] = useState([]); // State to store data
    const [filteredData, setFilteredData] = useState([]); // State to store filtered data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://192.168.137.21:3000/api/companies");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const companyData = await response.json();
                
                // Transform the data
                const transformedData = companyData.map(item => ({
                    ...item,
                    internalITTeam: item.internalITTeam ? "Yes" : "No" // Transform boolean to Yes/No
                }));
                
                setData(transformedData);
                setFilteredData(transformedData); // Initialize filtered data
            } catch (error) {
                console.error("Failed to fetch company data:", error);
                setData([]); // Set data to empty array on error
                setFilteredData([]);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    useEffect(() => {
        if (searchInput) {
            const regex = new RegExp(searchInput, "i");
            const results = data.filter(item => 
                item.companyName && regex.test(item.companyName)
            );
            setFilteredData(results);
        } else {
            setFilteredData(data);
        }
    }, [searchInput, data]); // Update filtered data when searchInput or data changes

    const options = {
        selectableRows: false,
        elevation: 0,
        rowsPerPage: 10,
        rowsPerPageOptions: [5, 10, 15, 20, 25],
    };

    const getMuiTheme = () => createTheme({
        typography: {
            fontFamily: "Sharp Sans",
        },
        palette: {
            background: {
                paper: "#FFFFFF",
            }
        },
        components: {
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        backgroundColor: "#F5F7FC",
                        padding: "15px 4px",
                        color: "#333",
                    },
                    body: {
                        padding: "7px 15px",
                        color: "#333",
                    },
                    footer: {
                        backgroundColor: "#FFFFFF",
                    }
                }
            }
        }
    });

    return (
        <div className='CompanyListTable'>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    data={filteredData}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
        </div>
    );
}
