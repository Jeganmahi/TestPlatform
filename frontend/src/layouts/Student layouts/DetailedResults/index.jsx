/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from '@mui/material/Box';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import {useState} from 'react';
import DataTable from "examples/Tables/DataTable";

// Data
import MDButton from "components/MDButton";
//modal

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
function DetailedResultData() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    // Navigate to the next page when the button is clicked
    navigate('/IndividualScore');
  };
  const columns=[
    { Header: "Student Name", accessor:"sname", width: "45%", align: "left" },
    { Header: "Reg No", accessor: "regno", align: "left" },
    { Header: "started", accessor: "started", align: "center" },
    { Header: "Finished", accessor: "finished", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]

  
  const rows = [
    {
        sname:"jegan",
        regno:"2222",
        started:"20",
        finished:"50",
        action:(
            <MDBox>
                <MDButton  color="info" onClick={handleButtonClick}>
                    Info
                </MDButton>
            </MDBox>
        ),
    }
  ];
  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
      
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between" // To space elements evenly
                alignItems="center" // Align items vertically
              >
                <MDTypography variant="h6" color="white">
                  Detailed Results
                </MDTypography>
                <MDButton color="error">
                  Download results
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
            
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DetailedResultData;

