import { useEffect } from "react";
// @mui material components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Stack } from "@mui/material";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import * as React from "react";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from " SessionContext";
import QuizTable from "./data/MCQList";
//componenet import
import CodingTable from "./data/CodingList";
import QuizCreation from "./Components/QuizCreation";
import CodeCreaion from "./Components/CodeCreation";
import CodeManual from "./Components/CodeManual";
import MCQManual from "./Components/MCQManual";
//select componentes
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function Quizzes() {
  const { name, pass } = useSession();
  const [creationType, setCreationType] = React.useState("");
  const [formKey, setFormKey] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
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
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };
  const handleChange = (event) => {
    setCreationType(event.target.value);
  };
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
  }, [formData, questionBankData, codingQuestionBankData]);
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
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
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
                <Box
                  sx={{
                    width: "200px", // Adjust the width as per your requirement
                    bgcolor: "white",
                    borderRadius: "4px",
                    "& .MuiInputBase-root": {
                      fontSize: "1rem", // Adjust the font size as per your requirement
                    },
                    "& .MuiSelect-select": {
                      paddingTop: "14px", // Adjust the padding to increase the height of the select field
                      paddingBottom: "14px",
                    },
                  }}
                >
                  <FormControl
                    variant="outlined"
                    sx={{ width: "300px", marginLeft: "-100px" }}
                  >
                    <InputLabel>Method for test creation</InputLabel>
                    <Select
                      label="Bank Type"
                      value={creationType}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{
                        height: "50px",
                        width: "100%",
                        marginBottom: "10px",
                      }}
                      style={{ backgroundColor: "white" }}
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="Code bank creation manuall">
                        Code bank creation manually
                      </MenuItem>
                      <MenuItem value="Code bank creation (excel)">
                        Code bank creation (excel)
                      </MenuItem>
                      <MenuItem value="MCQ bank creation manual">
                        MCQ bank creation manually
                      </MenuItem>
                      <MenuItem value="MCQ bank creation (excel)">
                        MCQ bank creation (excel)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </MDBox>
              <MDBox pt={3} justifyContent="center">
                <Box pt={3} justifyContent="center">
                  <Box sx={{ width: "100%" }}>
                    <Stack
                      spacing={2}
                      alignItems="center"
                      sx={{ marginTop: "20px" }}
                    >
                      {creationType === "MCQ bank creation (excel)" && (
                        <QuizCreation />
                      )}
                      {creationType === "Code bank creation (excel)" && (
                        <>
                          <CodeCreaion />
                        </>
                      )}
                      {creationType === "Code bank creation manuall" && (
                        <>
                          <CodeManual />
                        </>
                      )}
                      {creationType === "MCQ bank creation manual" && (
                        <>
                          <MCQManual />
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
