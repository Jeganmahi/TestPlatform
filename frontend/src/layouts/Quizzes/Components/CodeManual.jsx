import * as React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Divider from "@mui/material/Divider";
import MDTypography from "components/MDTypography";

function CodeManual() {
  const [formData, setFormData] = useState({
    bankName: "",
    bankType: "",
    bankDifficulty: "",
    questionCount: 0,
  });

  const [questions, setQuestions] = useState([]);
  const handleSubmit = () => {
    // Combine formData and questions
    const requestData = {
      formData: formData,
      questions: questions,
    };
    console.log(requestData);

    fetch("http://localhost:5001/codemanual", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle response from backend
        console.log("Response from backend:", data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
  const handleQuestionCountChange = (e) => {
    const count = parseInt(e.target.value);
    setFormData({ ...formData, questionCount: count });
    // Generate question fields based on count
    const newQuestions = Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      questionText: "",
      SampleInput: "", // Ensure SampleInput property is initialized
      SampleOutput: "",
      HiddenInputTestCaseI: "",
      HiddenOutputTestCaseI: "",
      HiddenInputTestCaseII: "",
      HiddenOutputTestCaseII: "",
      HiddenInputTestCaseIII: "",
      HiddenOutputTestCaseIII: "",
      Constraints: "",
      TimeLimit: "",
      StorageLimit: "",
    }));
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].question = e.target.value;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };
  const handleSI = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].SampleInput = e.target.value;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };
  const handleSO = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].SampleOutput = e.target.value;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };
  const handleHI1 = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].HiddenInputTestCaseI = e.target.value;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };
  const handleHO1 = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].HiddenOutputTestCaseI = e.target.value;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };
  const handleHI2 = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].HiddenInputTestCaseII = e.target.value;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };
  const handleHO2 = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].HiddenOutputTestCaseII = e.target.value;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };
  const handleHI3 = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].HiddenInputTestCaseIII = e.target.value;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };
  const handleHO3 = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].HiddenOutputTestCaseIII = e.target.value;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };
  const handleConstraints = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].Constraints = e.target.value;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };
  const hanldeStorage = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].StorageLimit = e.target.value;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };
  const handleTimeLimit = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].TimeLimit = e.target.value;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };

  return (
    <MDBox>
      <FormControl sx={{ width: "100%", textAlign: "center" }}>
        <MDBox>
          <TextField
            id="quiz-name"
            label="Quiz bank name"
            value={formData.bankName}
            onChange={(e) =>
              setFormData({ ...formData, bankName: e.target.value })
            }
            variant="outlined"
            sx={{ width: "100%", marginBottom: "10px" }}
          />
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <InputLabel>Select test type</InputLabel>
            <Select
              label="Bank Type"
              value={formData.bankType}
              onChange={(e) =>
                setFormData({ ...formData, bankType: e.target.value })
              }
              variant="outlined"
              sx={{ height: "50px", width: "100%", marginBottom: "10px" }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Begineer's question">
                Begineer's question
              </MenuItem>
              <MenuItem value="Data structures">Data structures</MenuItem>
              <MenuItem value="Dynamic programming">
                Dynamic programming
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <InputLabel>Select test difficulty</InputLabel>
            <Select
              label="Bank Difficulty"
              value={formData.bankDifficulty}
              onChange={(e) =>
                setFormData({ ...formData, bankDifficulty: e.target.value })
              }
              variant="outlined"
              sx={{ height: "50px", width: "100%", marginBottom: "10px" }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Moderate">Moderate</MenuItem>
              <MenuItem value="Difficult">Difficult</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="question-count"
            label="Number of Questions"
            type="number"
            value={formData.questionCount}
            onChange={handleQuestionCountChange}
            variant="outlined"
            sx={{ width: "100%", marginBottom: "10px" }}
          />
          {questions.map((question, index) => (
            <div key={index} style={{ width: "640px", marginBottom: "10px" }}>
              <TextField
                id={`question-${index}`}
                label={`Question ${index + 1}`}
                value={question.question}
                onChange={(e) => handleQuestionChange(e, index)}
                variant="outlined"
                fullWidth
                multiline // Allow multiline input
                maxRows={40} // Limit the number of rows
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                id={`question-${index}`}
                label={`SampleInput ${index + 1}`}
                value={question.SampleInput}
                onChange={(e) => handleSI(e, index)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                id={`question-${index}`}
                label={`SampleOutput ${index + 1}`}
                value={question.SampleOutput}
                onChange={(e) => handleSO(e, index)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                id={`question-${index}`}
                label={`HiddenInputTestCaseI ${index + 1}`}
                value={question.HiddenInputTestCaseI}
                onChange={(e) => handleHI1(e, index)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                id={`question-${index}`}
                label={`HiddenOutputTestCaseI ${index + 1}`}
                value={question.HiddenOutputTestCaseI}
                onChange={(e) => handleHO1(e, index)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                id={`question-${index}`}
                label={`HiddenInputTestCaseII ${index + 1}`}
                value={question.HiddenInputTestCaseII}
                onChange={(e) => handleHI2(e, index)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                id={`question-${index}`}
                label={`HiddenOutputTestCaseII ${index + 1}`}
                value={question.HiddenOutputTestCaseII}
                onChange={(e) => handleHO2(e, index)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                id={`question-${index}`}
                label={`HiddenInputTestCaseIII ${index + 1}`}
                value={question.HiddenInputTestCaseIII}
                onChange={(e) => handleHI3(e, index)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                id={`question-${index}`}
                label={`HiddenOutputTestCaseIII ${index + 1}`}
                value={question.HiddenOutputTestCaseIII}
                onChange={(e) => handleHO3(e, index)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                id={`question-${index}`}
                label={`Constraints ${index + 1}`}
                value={question.Constraints}
                onChange={(e) => handleConstraints(e, index)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                id={`question-${index}`}
                label={`TimeLimit ${index + 1}`}
                value={question.TimeLimit}
                onChange={(e) => handleTimeLimit(e, index)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <TextField
                id={`question-${index}`}
                label={`StorageLimit ${index + 1}`}
                value={question.StorageLimit}
                onChange={(e) => hanldeStorage(e, index)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              <Divider
                variant="middle"
                sx={{
                  marginBottom: "10px",
                  backgroundColor: "blue",
                  height: "25px",
                  width: "100%",
                }}
              />
              ;
            </div>
          ))}
          <MDButton onClick={handleSubmit} color="info">
            Submit
          </MDButton>
        </MDBox>
      </FormControl>
    </MDBox>
  );
}
export default CodeManual;
