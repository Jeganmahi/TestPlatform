
import { useEffect } from 'react';
// @mui material components
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import * as React from 'react';
import TextField from '@mui/material/TextField';
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
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
import QuizTable from './data/MCQList';
import CodingTable from './data/CodingList';
function Quizzes() {
  const { name, pass } = useSession();
  const [formKey, setFormKey] = useState(0)
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
  const [codeFormattedData, setCodeFormattedData] = useState(null);
  useEffect(() => {

    console.log(codeFormattedData);
  }, [codeFormattedData])
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
      setFormData({})

      alert("success");
    }
    catch (error) {
      console.log(error);
    }
  }

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

  }, [formData, questionBankData]);
  return (
    <DashboardLayout>
      {console.log(name, pass)}
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
                <QuizTable questionBankData={questionBankData} />
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
                  Coding Bank
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <CodingTable codingQuestionBankData={codingQuestionBankData} />
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
