import * as React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

function MCQManual() {
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

    fetch("http://localhost:5001/mcqmanual", {
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
      question: "",
      options: ["", "", "", ""],
    }));
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].question = e.target.value;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = e.target.value;
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
              <MenuItem value="Technical MCQ">Technical MCQ</MenuItem>
              <MenuItem value="Logical MCQ">Logical MCQ</MenuItem>
              <MenuItem value="Aptitude MCQ">Aptitude MCQ</MenuItem>
              <MenuItem value="Verbal MCQ">Verbal MCQ</MenuItem>
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
            <div key={index} style={{ marginBottom: "10px" }}>
              <TextField
                id={`question-${index}`}
                label={`Question ${index + 1}`}
                value={question.question}
                onChange={(e) => handleQuestionChange(e, index)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "10px" }}
              />
              {question.options.map((option, optionIndex) => (
                <TextField
                  key={optionIndex}
                  id={`option-${index}-${optionIndex}`}
                  label={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(e, index, optionIndex)}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "5px" }}
                />
              ))}
            </div>
          ))}
           <MDButton color="info" onClick={handleSubmit}>Submit</MDButton>
        </MDBox>
      </FormControl>
    </MDBox>
  );
}
export default MCQManual;
