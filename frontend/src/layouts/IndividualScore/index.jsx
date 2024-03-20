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
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Icon from '@mui/material/Icon';

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

function Individual() {
  const { columns, rows } = QuizData();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
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
  const StyledButton = styled(Button)`
  && {
    background-color: #ff0000; /* Change this color to your desired color */
    color: #ffffff; /* Change text color if needed */
    /* Add any other styles you want for the button */
  }
`;
  return (
    <DashboardLayout>
        <DashboardNavbar absolute isMini />
        <Card pt={8} mt={4}>
        <MDBox mt={8} pt={6} pb={3}>
      <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        
            
                
                <MDTypography px={3} fontWeight="bold" sx={{ fontSize: '2rem',textAlign: 'center' }}>
                    ZOHO TEST
                </MDTypography>                   
        
                <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                    <Box textAlign="center">
      {/* Text */}
      <MDTypography variant="body1" component="div" fontWeight="bold">
                Proctor settings
            </MDTypography>
            {/* Icons */}
            <Box display="flex" justifyContent="center" mt={1}>
                {/* Camera Icon */}
                <Icon sx={{ marginX: 1 }}>camera</Icon>
                {/* Clock Icon */}
                <Icon sx={{ marginX: 1 }}>schedule</Icon>
                {/* Photo Icon */}
                <Icon sx={{ marginX: 1 }}>photo</Icon>
            </Box>
            </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <MDBox justifyContent="centre">
                        <Box textAlign="center">
                                {/* Test Type */}
                                <MDTypography variant="h4" component="div" sx={{ mb: 1 }}>
                                Test type
                                </MDTypography>
                                {/* Google Sheet */}
                                <MDTypography variant="body1" component="div" sx={{ fontSize: '1rem' }}>
                                Google Sheet
                                </MDTypography>
                            </Box>
                        </MDBox>
                    
                    </Grid>
                    <Grid item xs={6}>
                    <Box textAlign="center">
                                {/* Test Type */}
                                <MDTypography variant="h4" component="div" sx={{ mb: 1 }}>
                                Created on
                                </MDTypography>
                                {/* Google Sheet */}
                                <MDTypography variant="body1" component="div" sx={{ fontSize: '1rem' }}>
                                  22/1/1200
                                </MDTypography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                    <Box textAlign="center">
                                {/* Test Type */}
                                <MDTypography variant="h4" component="div" sx={{ mb: 1 }}>
                                Submissions
                                </MDTypography>
                                {/* Google Sheet */}
                                <MDTypography variant="body1" component="div" sx={{ fontSize: '1rem' }}>
                                  25
                                </MDTypography>
                        </Box>
                    </Grid>
                </Grid>
                </Box>
      </Stack>
    </Box>

      </MDBox>
        </Card>      
    </DashboardLayout>
  );
}

export default Individual;
