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
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@mui/material/TextField';
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
// Data
import QuizData from "layouts/Quizzes/data/QuizData";
import MDButton from "components/MDButton";
import Stack from '@mui/material/Stack';
import {  Tabs, Tab,Divider} from '@mui/material';
import { useState} from 'react';
import { Margin } from '@mui/icons-material';
function Quizzes() {
  const [numInputs, setNumInputs] = useState(1);
  const codecolumn=[
    { Header: "coding Bank Name", accessor:"Cname", width: "45%", align: "left" },
    { Header: "No of Questions", accessor: "qCount", align: "left" },
    { Header: "Difficulty level ", accessor: "Difficulty", align: "center" },
    { Header: "Created ", accessor: "Created", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]

  const handleNumInputsChange = (event) => {
    const value = parseInt(event.target.value);
    setNumInputs(value);
  };
  const coderow = [
    {
        Cname:"jegan",
        qCount:"2222",
        Difficulty:"20",
        Created:"50",
        action:(
            <MDBox>
                <MDButton  color="info" >
                   Take Test
                </MDButton>
               
            </MDBox>
        ),
    }
  ];
  
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };
  const { columns, rows } = QuizData();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  const generateInputFields = () => {
    const inputFields = [];
    for (let i = 0; i < numInputs; i++) {
      inputFields.push(
        <MDBox sx={{justifyContent:'center'} }>
          <Grid item key={i} xs={12}>
        <TextField
          key={i}
          label={`Question ${i + 1}`}
          variant="outlined"
          sx={{ width: '40%',mb:2 ,mr: 2, ml: 2 }}
        />
         <TextField
          key={i}
          label={`Constraints ${i + 1}`}
          variant="outlined"
          sx={{ width: '40%',mb:2 ,mr: 2, ml: 2}}
        />
        <TextField
          key={i}
          label={` Sample Input  ${i + 1}`}
          variant="outlined"
          sx={{ width: '40%',mb:2 ,mr: 2, ml: 2 }}
        />
        <TextField
          key={i}
          label={` Sample Output  ${i + 1}`}
          variant="outlined"
          sx={{ width: '40%',mb:2 ,mr: 2 , ml: 2 }}
        />
        <TextField
          key={i}
          label={` Hidden Test Case Input 1`}
          variant="outlined"
          sx={{ width: '40%',mb:2 ,mr: 2 , ml: 2}}
        />
        <TextField
          key={i}
          label={` Hidden Test Case Output 1`}
          variant="outlined"
          sx={{ width: '40%',mb:2 ,mr: 2 , ml: 2 }}
        />
         <TextField
          key={i}
          label={` Hidden Test Case Input 2`}
          variant="outlined"
          sx={{ width: '40%',mb:2 ,mr: 2, ml: 2  }}
        />
        <TextField
          key={i}
          label={` Hidden Test Case Output 2`}
          variant="outlined"
          sx={{ width: '40%',mb:2 ,mr: 2 , ml: 2}}
        />
        <TextField
          key={i}
          label={` Hidden Test Case Input 3`}
          variant="outlined"
          sx={{ width: '40%',mb:2 ,mr: 2, ml: 2 }
        }
        />
        <TextField
          key={i}
          label={` Hidden Test Case Output 3`}
          variant="outlined"
          sx={{ width: '40%',mb:2 ,mr: 2, ml: 2 }}
        />

      </Grid>
      {i < numInputs - 1 && <Divider sx={{ marginY: 2, backgroundColor: 'red' }} />} {/* Add a divider except for the last group */}
        </MDBox>
        
        
      );
    }
    return inputFields;
  };
  const StyledButton = styled(Button)`
  && {
    background-color: #ff0000; /* Change this color to your desired color */
    color: #ffffff; /* Change text color if needed */
    /* Add any other styles you want for the button */
  }
`;
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
              >
                <MDTypography variant="h6" color="white">
                  Assement Pending
                </MDTypography>
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
      
    </DashboardLayout>
  );
}

export default Quizzes;
