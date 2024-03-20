import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useEffect } from "react";
import Paper from '@mui/material/Paper';
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Tabs, Tab, Divider } from '@mui/material';
// Data
import MDButton from "components/MDButton";
//modal
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useSession } from " SessionContext";
function Test() {
  const {name,pass}=useSession();
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };


  const [test, setTest] = React.useState('');
  const [QuestionBank, setQuestionBank] = React.useState('');
  const [CQuestionBank, setCQuestionBank] = React.useState('');
  const handleQuestionBankChange = (event) => {
    setTestCreationData({ ...testCreationData, bankName: event.target.value })
    setQuestionBank(event.target.value);

  }
  const handleCodeQuestionBankChange = (event) => {
    setcodeTest({ ...testCreationData, bankName: event.target.value })
    console.log(codeTest);
    setCQuestionBank(event.target.value);
    console.log(CQuestionBank);

  }
  const [dropDownData, setDropDownData] = useState([]);
  useEffect(() => {
    const dropDown = async () => {
      try {
        const response = await fetch("http://localhost:5001/drop");
        const result = await response.json();
        console.log(result);
        setDropDownData(result);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    dropDown();
  }, [])
  const [codedropDownData, setCodeDropDownData] = useState([]);
  useEffect(() => {
    const codedropDown = async () => {
      try {
        const response = await fetch("http://localhost:5001/codeDrop");
        const result = await response.json();
        setCodeDropDownData(result);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    codedropDown();
  })

  const [testCreationData, setTestCreationData] = useState({
    testName: "",
    testType: "",
    date: "",
    duration: "",
    startTime: "",
    BankID: "",
    questionCount: "",
    staff_mail:name
  })
  const [codeTest, setcodeTest] = useState({
    codeTestName: "",
    codeTestType: "",
    codeTestDate: "",
    codeTestDuration: "",
    CodeStartTime: "",
    CodeBankID: "",
    CodeQuestionCount: "",
  })
  const [Tname, setTname] = useState('');
  const [Tdate, setTdate] = useState('');
  const [Tduration, setTduration] = useState('');
  const [Tstarttime, setTstarttime] = useState('');
  const [Tcount, setTcount] = useState('');
  const [Tquestionbank, setTquestionbank] = useState('');
  const [TMcount,setTMcount]=useState('');
  const [TCcount,setTCcount]=useState('');
  const handleMCQandCodeCreate =async()=>{
    const codeMCQ = {
      Tname: Tname,
      Tdate: Tdate,
      Tduration: Tduration,
      Tstarttime: Tstarttime,
      TMcount: TMcount,
      TCcount:TCcount,
      questionbank:QuestionBank,
      Tquestionbank:Tquestionbank,
      staff_mail:name
    };
    console.log(codeMCQ);
    try {
      const response = await fetch(`http://localhost:5001/codeAndMCQ`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(codeMCQ),
      });

      if (response.ok) {

        alert("Code test created successfully");
      } else {
        // Error handling
        alert("Failed to create code test");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while creating code test");
    }

  }
  const handleCodeTestCreate = async () => {
    const codeTest = {
      Tname: Tname,
      Tdate: Tdate,
      Tduration: Tduration,
      Tstarttime: Tstarttime,
      Tcount: Tcount,
      Tquestionbank: Tquestionbank,
      staff_mail:name
    };

    console.log(codeTest);

    try {
      const response = await fetch(`http://localhost:5001/codeTestCreate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(codeTest),
      });

      if (response.ok) {

        alert("Code test created successfully");
      } else {
        // Error handling
        alert("Failed to create code test");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while creating code test");
    }
  }

  const handleTestCreate = async () => {
    try {
      const response = await fetch(`http://localhost:5001/staffTestCreation`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(testCreationData),
      });
      const result = await response.json();
      //toast("question bank created")
      alert("success");
    }
    catch (error) {
      console.log(error);
    }
  }


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
                  CREATE TEST
                </MDTypography>
              </MDBox>
              <MDBox pt={3} justifyContent="center">
                <MDBox pt={3} justifyContent="center">
                  <MDBox sx={{ width: '100%' }}>
                    <Tabs value={tabIndex} onChange={handleChangeTab}>
                      <Tab label="Quiz test" />
                      <Tab label="Coding test" />
                      <Tab label="Coding and MCQ test" />
                    </Tabs>
                    <Stack spacing={2} alignItems="center" sx={{ marginTop: '20px' }}>
                      {tabIndex === 0 && (
                        <>
                          <TextField
                            id="outlined-basic"
                            label="Test Name"
                            variant="outlined"
                            sx={{ width: '640px' }}
                            onChange={(e) =>
                              setTestCreationData({ ...testCreationData, testName: e.target.value, testType: 'MCQ' })
                            } />
                          <TextField id="outlined-basic"
                            type="date"
                            variant="outlined"
                            sx={{ width: '640px', marginBottom: '10px' }}
                            onChange={(e) =>
                              setTestCreationData({ ...testCreationData, date: e.target.value })
                            } />
                          <TextField
                            id="outlined-basic"
                            type="time" variant="outlined"
                            sx={{ width: '640px', marginBottom: '10px' }}
                            onChange={(e) =>
                              setTestCreationData({ ...testCreationData, startTime: e.target.value })
                            } />
                          <TextField
                            id="outlined-basic"
                            type="number"
                            label="Duration in (hrs)"
                            variant="outlined"
                            sx={{ width: '640px', marginBottom: '10px' }}
                            onChange={(e) =>
                              setTestCreationData({ ...testCreationData, duration: e.target.value })
                            } />
                          <FormControl variant="outlined" sx={{ width: '640px', marginBottom: '10px' }}>
                            <InputLabel>Select Question Bank</InputLabel>
                            <Select
                              label="Select Question Bank"
                              value={QuestionBank}
                              onChange={handleQuestionBankChange}
                              variant="outlined"
                              sx={{ height: '50px' }}
                            >
                              <MenuItem value="">None</MenuItem>
                              {dropDownData && dropDownData.map((bank) => (
                                <MenuItem key={bank.BankID} value={bank.BankID}>{bank.BankName}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <TextField
                            id="outlined-basic"
                            type="number"
                            label="No. of Questions"
                            variant="outlined"
                            sx={{ width: '640px', marginBottom: '10px' }}
                            onChange={(e) =>
                              setTestCreationData({ ...testCreationData, questionCount: e.target.value })
                            } />
                          <MDButton color="info" onClick={handleTestCreate}>Create Test</MDButton>

                        </>

                      )}
                      {tabIndex === 1 && (
                        <>
                          <MDBox display="flex" flexDirection="column" alignItems="center">
                            {/* Layout for Option 1 */}
                            <TextField
                              id="outlined-basic"
                              label="Test Name"
                              variant="outlined"
                              sx={{ width: '640px' }}
                              onChange={(e) => setTname(e.target.value)} />
                            <TextField id="outlined-basic"
                              type="date"
                              variant="outlined"
                              sx={{ width: '640px', marginBottom: '10px' }}
                              onChange={(e) => setTdate(e.target.value)} />
                            <TextField
                              id="outlined-basic"
                              type="time" variant="outlined"
                              sx={{ width: '640px', marginBottom: '10px' }}
                              onChange={(e) => setTstarttime(e.target.value)} />
                            <TextField
                              id="outlined-basic"
                              type="number"
                              label="Duration in (hrs)"
                              variant="outlined"
                              sx={{ width: '640px', marginBottom: '10px' }}
                              onChange={(e) => setTduration(e.target.value)} />
                            <FormControl variant="outlined" sx={{ width: '640px', marginBottom: '10px' }}>
                              <InputLabel>Select Question Bank</InputLabel>
                              <Select
                                label="Select Question Bank"
                                value={Tquestionbank}
                                onChange={(e) => setTquestionbank(e.target.value)}
                                variant="outlined"
                                sx={{ height: '50px' }}
                              >
                                <MenuItem value="">None</MenuItem>
                                {codedropDownData && codedropDownData.map((bank) => (
                                  <MenuItem key={bank.codingQuestionBankID} value={bank.codingQuestionBankID}>{bank.BankName}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              label="No. of Questions"
                              variant="outlined"
                              sx={{ width: '640px', marginBottom: '10px' }}
                              onChange={(e) => setTcount(e.target.value)} />
                            <MDButton color="info" onClick={handleCodeTestCreate}>Create Test</MDButton>
                          </MDBox>

                        </>
                      )}
                      {tabIndex === 2 && (
                        <>
                          <TextField
                            id="outlined-basic"
                            label="Test Name"
                            variant="outlined"
                            sx={{ width: '640px' }}
                            onChange={(e) =>
                              setTname(e.target.value)
                            } />
                          <TextField id="outlined-basic"
                            type="date"
                            variant="outlined"
                            sx={{ width: '640px', marginBottom: '10px' }}
                            onChange={(e) =>
                              setTdate(e.target.value)
                            } />
                          <TextField
                            id="outlined-basic"
                            type="time" variant="outlined"
                            sx={{ width: '640px', marginBottom: '10px' }}
                            onChange={(e) =>
                              setTstarttime(e.target.value)
                            } />
                          <TextField
                            id="outlined-basic"
                            type="number"
                            label="Duration in (hrs)"
                            variant="outlined"
                            sx={{ width: '640px', marginBottom: '10px' }}
                            onChange={(e) =>
                              setTduration(e.target.value)
                            } />
                          <FormControl variant="outlined" sx={{ width: '640px', marginBottom: '10px' }}>
                            <InputLabel>Select Question Bank</InputLabel>
                            <Select
                              label="Select Question Bank"
                              value={QuestionBank}
                              onChange={handleQuestionBankChange}
                              variant="outlined"
                              sx={{ height: '50px' }}
                            >
                              <MenuItem value="">None</MenuItem>
                              {dropDownData && dropDownData.map((bank) => (
                                <MenuItem key={bank.BankID} value={bank.BankID}>{bank.BankName}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <TextField
                            id="outlined-basic"
                            type="number"
                            label="No. of MCQs "
                            variant="outlined"
                            sx={{ width: '640px', marginBottom: '10px' }}
                            onChange={(e) =>
                              setTMcount(e.target.value)
                            } />
                          <FormControl variant="outlined" sx={{ width: '640px', marginBottom: '10px' }}>
                              <InputLabel>Select Question Bank</InputLabel>
                              <Select
                                label="Select Question Bank"
                                value={Tquestionbank}
                                onChange={(e) => setTquestionbank(e.target.value)}
                                variant="outlined"
                                sx={{ height: '50px' }}
                              >
                                <MenuItem value="">None</MenuItem>
                                {codedropDownData && codedropDownData.map((bank) => (
                                  <MenuItem key={bank.codingQuestionBankID} value={bank.codingQuestionBankID}>{bank.BankName}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          <TextField
                            id="outlined-basic"
                            type="number"
                            label="No. of Coding Questions"
                            variant="outlined"
                            sx={{ width: '640px', marginBottom: '10px' }}
                            onChange={(e) =>
                             setTCcount(e.target.value)
                            } />
                          <MDButton color="info" onClick={handleMCQandCodeCreate}>Create Test</MDButton>
                        </>
                      )}
                    </Stack>
                  </MDBox>
                </MDBox>
              </MDBox>

            </Card>

          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Test;

