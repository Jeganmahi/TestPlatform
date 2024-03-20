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
import React from "react";
import Paper from '@mui/material/Paper';
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState } from 'react';
import DataTable from "examples/Tables/DataTable";

// Data
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
import { useEffect } from "react";
function Student() {
  const { name, pass } = useSession();
  const [modal, setModal] = useState(false)
  const handleClose = () => setModal(false)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    staff_mail: name,
    Studentname: "",
    StudentRegNo: ""
  });
  const [studenTableData, setStudentTableData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(`http://localhost:5001/tableData/${name}`);
        const jsondata = await response.json();
        setStudentTableData(jsondata);
        console.log(studenTableData);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    fetchData();


  }, [studenTableData])
  const handleSubmit = async () => {
    console.log(formData);
    try {
      const response = await fetch(`http://localhost:5001/studentInsert`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      //toast("question bank created")
      alert("success");
      // fetchData();
    }
    catch (error) {
      console.log(error);
    }
  }
  const handleOpen = () => {
    setModal(true);
  };

  // const handleButtonClick = () => {
  //   // Navigate to the next page when the button is clicked
  //   navigate('/DrData');
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const columns = [
    { Header: "Name", accessor: "Name", width: "45%", align: "left" },
    { Header: "Reg No", accessor: "regno", align: "left" },
    { Header: "Batch", accessor: "batch", align: "center" },
    { Header: "Department", accessor: "department", align: "center" },
    { Header: "action", accessor: "Action", align: "center" },
  ]


  const rows = studenTableData.map(data => ({
    Name: data.student_name,
    department: data.Department,
    regno: data.RegNo, // Add logic to calculate difficulty if neede
    batch: data.Batch, // Add logic to calculate creation date if needed
    Action: (
      <MDBox>
        <MDButton color="info">
          View
        </MDButton>
        <MDButton color="error">
          Delete
        </MDButton>
      </MDBox>
    ),
  }));
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
                <Dialog maxWidth="lg" open={modal} justifyContent="center" onClose={handleClose}>
                  <DialogTitle>Questions</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <TextField
                        id="Coding bank name"
                        label="Student name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, Studentname: e.target.value })
                        }
                        variant="outlined"
                        sx={{ width: '640px', marginBottom: '10px' }}
                      />
                      <TextField
                        id="Coding bank name"
                        label="Register Number"
                        value={formData.RegNo}
                        onChange={(e) =>
                          setFormData({ ...formData, StudentRegNo: e.target.value })
                        }
                        variant="outlined"
                        sx={{ width: '640px', marginBottom: '10px' }}
                      />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <MDButton onClick={handleClose} color="primary">
                      Cancel
                    </MDButton>
                    <MDButton onClick={handleSubmit} color="primary" autoFocus>
                      Save
                    </MDButton>
                  </DialogActions>
                </Dialog>
                <MDTypography variant="h6" color="white" >
                  Add student
                </MDTypography>
                <MDButton color="success" onClick={handleOpen}>
                  Add student
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={true}
                    showTotalEntries={true}
                    noEndBorder
                  />
                </MDBox>
              </MDBox>
            </Card>

          </Grid>
        </Grid>
      </MDBox>
      {console.log(name, pass)}
      <Footer />
    </DashboardLayout>
  );
}

export default Student;

