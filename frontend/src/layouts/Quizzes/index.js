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
import { useEffect } from 'react';
// @mui material components
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import Stack from '@mui/material/Stack';
import { Tabs, Tab, Divider } from '@mui/material';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSession } from " SessionContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
function Quizzes() {
  const {name,pass}=useSession();
  const [formKey, setFormKey] = useState(0)
  const [open, setOpen] = React.useState(false);
  const [CodeModal, setCodeModal] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleCodingClose = () => setCodeModal(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };


  const [questionBankData, setquestionBankData] = useState([]);
  const [codingQuestionBankData, setcodingQuestionBankData] = useState([]);
  const [codingFormData, setCodingFormData] = useState({
    CodingBankName: "",
    CodingBankType: "",
    CodingBankDifficulty: "",
    CodingQuestionFile: null
  })
  const [formData, setFormData] = useState({
    bankName: "",
    bankType: "",
    bankDifficulty: "",
    questionFile: null
  });
  const [formattedData, setFormattedData] = useState(null);
  const [codeFormattedData, setCodeFormattedData] = useState(null);
  useEffect(() => {

    console.log(codeFormattedData);
  }, [formattedData, codeFormattedData])
  const handleCreateButton = async () => {
    console.log(formData.questionFile);
    try {
      const response = await fetch(`http://localhost:5001/testCreate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      //toast("question bank created")
      alert("success");
      fetchData();
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleCodingOpen = () => {
    setCodeModal(true);
    console.log(CodeModal);
  }
  const cfd=(data)=>{
    setCodeFormattedData(data);
    
    setCodeModal(true)
  }
  const handleViewCodingQuestions = async (ID) => {

    try {
      const response = await fetch(`http://localhost:5001/Codequestion/${ID}`);
      const jsondata = await response.json();
      
      cfd(jsondata);
      console.log(codeFormattedData);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }
  const handleCodingBankDelete = async (ID) => {
    console.log(ID);
    try {
      const response = await fetch(`http://localhost:5001/CodequestionDelete/${ID}`);
      const jsondata = await response.json();
      codingFetchData();

    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }
  const handleDelete = async (ID) => {
    console.log(ID);
    try {
      const response = await fetch(`http://localhost:5001/MCQDelete/${ID}`);
      const jsondata = await response.json();
      fetchData();

    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }
  const handleViewQuestions = async (ID) => {
    try {
      const response = await fetch(`http://localhost:5001/question/${ID}`);
      const jsondata = await response.json();
      console.log(jsondata)
      setOpen(true)
      setFormattedData(jsondata);


    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }
  const columns = [
    { Header: "Bank Name", accessor: "Name", width: "45%", align: "left" },
    { Header: "Type", accessor: "Type", align: "left" },
    { Header: "Difficulty ", accessor: "Difficulty", align: "center" },
    { Header: "Created On ", accessor: "Created", align: "center" },
    { Header: "action", accessor: "Action", align: "center" },
  ]
  const rows = questionBankData.map(questionBank => ({
    Name: questionBank.BankName,
    Difficulty: questionBank.Difficulty, // Add logic to calculate difficulty if needed
    Type: questionBank.BankType,
    Created: questionBank.Date, // Add logic to calculate creation date if needed
    Action: (
      <MDBox>
        <MDButton color="info" onClick={() => handleViewQuestions(questionBank.BankID)}>
          View
        </MDButton>
        <MDButton color="error"  onClick={() => handleDelete(questionBank.BankID)}>
          Delete
        </MDButton>
      </MDBox>
    ),
  }));
  const handleCodingCreateButton = async () => {
    console.log(codingFormData);
    try {
      const response = await fetch(`http://localhost:5001/codingBank`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(codingFormData),
      });
      const result = await response.json();
      //toast("question bank created")
      alert("success");
      fetchData();
    }
    catch (error) {
      console.log(error);
    }
  }
  const CodeColumns = [
    { Header: "Code Bank Name", accessor: "cname", width: "45%", align: "left" },
    { Header: "Type", accessor: "Type", align: "left" },
    { Header: "Difficulty ", accessor: "Difficulty", align: "center" },
    { Header: "Created On ", accessor: "Created", align: "center" },
    { Header: "action", accessor: "Action", align: "center" },
  ]
  const CodeRows = codingQuestionBankData.map(questionBank => ({
    cname: questionBank.BankName,
    Difficulty: questionBank.BankDifficulty, // Add logic to calculate difficulty if needed
    Type: questionBank.BankType,
    Created: questionBank.CreatedDate, // Add logic to calculate creation date if needed
    Action: (
      <MDBox>
        <MDButton color="info" onClick={() => handleViewCodingQuestions(questionBank.CodingQuestionBankID)}>
          View
        </MDButton>
        <MDButton color="error" onClick={() => handleCodingBankDelete(questionBank.CodingQuestionBankID)}>
          Delete
        </MDButton>
      </MDBox>
    ),
  }));
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5001/questionBankData/${name}`);
      const result = await response.json();
      setquestionBankData(result);
    } catch (error) {
      console.error("Error fetching  awareness program:", error);
    }
  };
  const codingFetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5001/codingData/${name}`);
      const result = await response.json();
      setcodingQuestionBankData(result);
    } catch (error) {
      console.error("Error fetching  awareness program:", error);
    }
  };
  useEffect(() => {
    fetchData();
    codingFetchData();
    
  }, [formData]);
  return (
    <DashboardLayout>
      {console.log(name,pass)}
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <ToastContainer />
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
                  Quiz list
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Dialog maxWidth="lg" open={open} justifyContent="center" onClose={handleClose}>
            <DialogTitle>Questions</DialogTitle>
            <DialogContent>
              <DialogContentText>
              <table>
      <thead>
        <tr>
          
          <th>Question Text</th>
          <th>Correct Option</th>
          <th>Wrong option1</th>
          <th>Wrong option2</th>
          <th>Wrong option3</th>
        </tr>
      </thead>
      <tbody>
              {formattedData&&formattedData.map(question => (
            <TableRow key={question.QuestionID}>
              <TableCell>{question.QuestionText}</TableCell>
              <TableCell>{question.Coption}</TableCell>
              <TableCell>{question.Woption1}</TableCell>
              <TableCell>{question.Woption2}</TableCell>
              <TableCell>{question.Woption3}</TableCell>
              {/* Add more TableCell components for additional question details */}
            </TableRow>
          ))}
          </tbody>
          </table>
                
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <MDButton onClick={handleClose} color="primary">
                Cancel
              </MDButton>
              <MDButton onClick={handleClose} color="primary" autoFocus>
                Save
              </MDButton>
            </DialogActions>
          </Dialog>
          <Dialog maxWidth="lg" open={CodeModal}  sx={{width:'auto'}}justifyContent="center" onClose={handleCodingClose}>
            <DialogTitle>Question List</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Box component="form" sx={{ width: 'auto', height: 'auto', textAlign: 'center' }} noValidate autoComplete="off">
                </Box>
                
              </DialogContentText>
              <Box component="form" sx={{ width: 'auto', height: 'auto', textAlign: 'center' }} noValidate autoComplete="off">
              
     <table>
      <thead>
        <tr>
          <th>Question ID</th>
          <th>Question Text</th>
          <th>Sample Input</th>
          <th>Sample Output</th>
          <th>Hidden InputTest CaseI</th>
          <th>Hidden OutputTest CaseI</th>
          <th>Hidden Input TestCaseII</th>
          <th>Hidden Output TestCaseII</th>
          <th>Hidden Input TestCaseIII</th>
          <th>Hidden Output TestCaseIII</th>
          <th>Constraints</th>
          <th>Time Limit</th>
          <th>Storage Limit</th>
        </tr>
      </thead>
      <tbody>
      {codeFormattedData&&codeFormattedData.map(question => (
            <TableRow key={question.QuestionID}>
              <TableCell>{question.QuestionID}</TableCell>
              <TableCell>{question.QuestionText}</TableCell>
              <TableCell>{question.SampleInput}</TableCell>
              <TableCell>{question.SampleOutput}</TableCell>
              <TableCell>{question.HiddenInputTestCaseI}</TableCell>
              <TableCell>{question.HiddenOutputTestCaseI}</TableCell>
              <TableCell>{question.HiddenInputTestCaseII}</TableCell>
              <TableCell>{question.HiddenInputTestCaseII}</TableCell>
              <TableCell>{question.HiddenInputTestCaseIII}</TableCell>
              <TableCell>{question.HiddenOutputTestCaseIII}</TableCell>
              <TableCell>{question.Constraints}</TableCell>
              <TableCell>{question.TimeLimit}</TableCell>
              <TableCell>{question.StorageLimit}</TableCell>
              {/* Add more TableCell components for additional question details */}
            </TableRow>
          ))}
      </tbody>
     </table>
                </Box>
            </DialogContent>
            <DialogActions>
              <MDButton onClick={handleCodingClose} color="primary">
                Cancel
              </MDButton>
              <MDButton onClick={handleClose} color="primary" autoFocus>
                Save
              </MDButton>
            </DialogActions>
          </Dialog>
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
                  Coding Bank
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: CodeColumns, rows: CodeRows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
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
                  Quiz Creation
                </MDTypography>
              </MDBox>
              <MDBox pt={3} justifyContent="center">
                <Box pt={3} justifyContent="center">
                  <Box sx={{ width: '100%' }}>
                    <Tabs value={tabIndex} onChange={handleChangeTab}>
                      <Tab label="Quiz Creation" />
                      <Tab label="Coding Question" />
                    </Tabs>
                    <Stack spacing={2} alignItems="center" sx={{ marginTop: '20px' }}>
                      {tabIndex === 0 && (
                        <>
                          <FormControl sx={{ width: 'auto' }} key={formKey}>
                            <TextField
                              id="quiz-name"
                              label="Quiz bank name"
                              value={formData.bankName}
                              onChange={(e) =>
                                setFormData({ ...formData, bankName: e.target.value })
                              }
                              variant="outlined"
                              sx={{ width: '640px', marginBottom: '10px' }}
                            />
                            <FormControl variant="outlined" sx={{ width: '40%' }}>
                              <InputLabel>Select test type</InputLabel>
                              <Select
                                label="Bank Type"
                                value={formData.bankType}
                                onChange={(e) =>
                                  setFormData({ ...formData, bankType: e.target.value })
                                }
                                variant="outlined"
                                sx={{ height: '50px', width: '640px', marginBottom: '10px' }}
                              >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="Technical MCQ">Technical MCQ</MenuItem>
                                <MenuItem value="Logical MCQ">Logical MCQ</MenuItem>
                                <MenuItem value="Aptitude MCQ">Aptitude MCQ</MenuItem>
                                <MenuItem value="Verbal MCQ">Verbal MCQ</MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl variant="outlined" sx={{ width: '40%' }}>
                              <InputLabel>Select test difficulty</InputLabel>
                              <Select
                                label="Bank Difficulty"
                                value={formData.bankDifficulty}

                                onChange={(e) =>
                                  setFormData({ ...formData, bankDifficulty: e.target.value })
                                }
                                variant="outlined"
                                sx={{ height: '50px', width: '640px', marginBottom: '10px' }}
                              >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="Easy">Easy</MenuItem>
                                <MenuItem value="Moderate">Moderate</MenuItem>
                                <MenuItem value="Difficult">Difficult</MenuItem>
                              </Select>
                            </FormControl>
                            <TextField
                              id="file-upload"
                              variant="outlined"
                              type="file"
                              accept=".xlsx"
                              onChange={(e) =>
                                setFormData({ ...formData, questionFile: e.target.value })
                              }
                              sx={{ width: '640px', marginBottom: '10px' }}
                            />
                            <MDButton color='info' onClick={handleCreateButton} > Create</MDButton>

                          </FormControl>
                        </>

                      )}
                      {tabIndex === 1 && (
                        <>
                          <FormControl sx={{ width: 'auto' }} key={formKey}>
                            <TextField
                              id="Coding bank name"
                              label="Coding bank name"
                              value={codingFormData.CodingBankName}
                              onChange={(e) =>
                                setCodingFormData({ ...codingFormData, CodingBankName: e.target.value })
                              }
                              variant="outlined"
                              sx={{ width: '640px', marginBottom: '10px' }}
                            />
                            <FormControl variant="outlined" sx={{ width: '40%' }}>
                              <InputLabel>Select bank type</InputLabel>
                              <Select
                                label="Questions Type"
                                value={codingFormData.CodingBankType}
                                onChange={(e) =>
                                  setCodingFormData({ ...codingFormData, CodingBankType: e.target.value })
                                }
                                variant="outlined"
                                sx={{ height: '50px', width: '640px', marginBottom: '10px' }}
                              >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="Begineer's question">Begineer's question</MenuItem>
                                <MenuItem value="Data structures">Data structures</MenuItem>
                                <MenuItem value="Dynamic programming">Dynamic programming</MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl variant="outlined" sx={{ width: '40%' }}>
                              <InputLabel>Select bank difficulty</InputLabel>
                              <Select
                                label="Difficulty Level"
                                value={codingFormData.CodingBankDifficulty}

                                onChange={(e) =>
                                  setCodingFormData({ ...codingFormData, CodingBankDifficulty: e.target.value })
                                }
                                variant="outlined"
                                sx={{ height: '50px', width: '640px', marginBottom: '10px' }}
                              >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="Easy">Easy</MenuItem>
                                <MenuItem value="Moderate">Moderate</MenuItem>
                                <MenuItem value="Difficult">Difficult</MenuItem>
                              </Select>
                            </FormControl>
                            <TextField
                              id="file-upload"
                              variant="outlined"
                              type="file"
                              accept=".xlsx"
                              onChange={(e) =>
                                setCodingFormData({ ...codingFormData, CodingQuestionFile: e.target.value })
                              }
                              sx={{ width: '640px', marginBottom: '10px' }}
                            />
                            <MDButton color='info' onClick={handleCodingCreateButton} > Create</MDButton>

                          </FormControl>            </>
                      )}
                    </Stack>
                  </Box>
                </Box>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Quizzes;
