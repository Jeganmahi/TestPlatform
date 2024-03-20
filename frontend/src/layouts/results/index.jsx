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
import React, { useEffect } from "react";
import Paper from '@mui/material/Paper';
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import {useState} from 'react';
import DataTable from "examples/Tables/DataTable";

// Data
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MDButton from "components/MDButton";
//modal
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Autocomplete } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { useSession } from " SessionContext";
function Result() {

  const {name,pass}=useSession();
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleButtonClick = () => {
    // Navigate to the next page when the button is clicked
    navigate('/DrData');
  };
const[testData,setTestData]=useState([]);
useEffect(()=>{
  const fetchTestData= async ()=>{
    try {
      const response = await fetch(`http://localhost:5001/testData/${name}`);
      const result = await response.json();
      
      setTestData(result);
      
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  }
  fetchTestData();
  

},[testData])

  const columns=[
    { Header: "Test name", accessor: "Tname", width: "45%", align: "left" },
    { Header: "Test Duration", accessor: "Tduration", align: "left" },
    { Header: "Question Count", accessor: "Tcount", align: "center" },
    { Header: "Start time", accessor: "Tstart", align: "center" },
    { Header: "Test Date", accessor: "Tdate", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]

  
  const rows = testData.map(questionBank => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero indexed, so we add 1
    const year = currentDate.getFullYear();
  
    // Padding single digit day or month with leading zero
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
  
    // Constructing the date string in dd-mm-yyyy format
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
  
    const testDateTime = questionBank.TestDate;
    console.log(testDateTime);
    
    let actionButtons;
    
    if (currentDate < testDateTime) {
      actionButtons = (
        <MDBox>
          <MDButton color="info">
            View
          </MDButton>
          <MDButton color="error">
            Delete
          </MDButton>
        </MDBox>
      );
    } else if (currentDate >= testDateTime) {
      actionButtons = (
        <MDBox>
          <MDButton color="success">
            Ongoing
          </MDButton>
        </MDBox>
      );
    } else {
      actionButtons = (
        <MDBox>
          <MDButton color="info" onClick={handleButtonClick}>
            View Results
          </MDButton>
        </MDBox>
      );
    }
  
    return {
      Tname: questionBank.TestName,
      Tduration: questionBank.TestDuration,
      Tcount: questionBank.questionCount,
      Tdate: questionBank.TestDate,
      Tstart: questionBank.startTime,
      action: actionButtons,
    };
  });
  
    
  return (
    <DashboardLayout>
      {console.log(name,pass)}
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
                  RESULTS
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
              <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={true}
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

export default Result;

