import { useEffect } from "react";
// @mui material components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import * as React from "react";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import Stack from "@mui/material/Stack";
import { Tabs, Tab, Divider } from "@mui/material";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from " SessionContext";
import QuizTable from "./data/MCQList";
//componenet import 
import CodingTable from "./data/CodingList";
import QuizCreation from "./Components/QuizCreation";
import CodeCreaion from "./Components/CodeCreation";
function Quizzes() {
  const { name, pass } = useSession();
  const [formKey, setFormKey] = useState(0);
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
    CodingQuestionFile: null,
  });
  const [formData, setFormData] = useState({
    bankName: "",
    bankType: "",
    bankDifficulty: "",
    questionFile: null,
  });
  const [codeFormattedData, setCodeFormattedData] = useState(null);
  useEffect(() => {
    console.log(codeFormattedData);
  }, [codeFormattedData]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/questionBankData/${name}`
      );
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
  }, [formData, questionBankData,codingQuestionBankData]);
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
                  <Box sx={{ width: "100%" }}>
                    <Tabs value={tabIndex} onChange={handleChangeTab}>
                      <Tab label="Quiz Creation" />
                      <Tab label="Coding Question" />
                    </Tabs>
                    <Stack
                      spacing={2}
                      alignItems="center"
                      sx={{ marginTop: "20px" }}
                    >
                      {tabIndex === 0 && <QuizCreation />}
                      {tabIndex === 1 && (
                        <>
                          <CodeCreaion />
                        </>
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
