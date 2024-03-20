import * as React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

function QuizCreation() {
  const [formData, setFormData] = useState({
    bankName: "",
    bankType: "",
    bankDifficulty: "",
    questionFile: null,
  });
  const handleCreateButton = async () => {
    console.log(formData.questionFile);
    try {
      const response = await fetch(`http://localhost:5001/testCreate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      //toast("question bank created")
      //toast("question bank created")
      setFormData({
        bankName: "",
        bankType: "",
        bankDifficulty: "",
        questionFile: null,
      });

      alert("success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MDBox>
        <FormControl sx={{ width: '100%', textAlign: 'center' }}>
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
      id="file-upload"
      variant="outlined"
      type="file"
      accept=".xlsx"
      onChange={(e) =>
        setFormData({ ...formData, questionFile: e.target.value })
      }
      sx={{ width: "100%", marginBottom: "10px" }}
    />
    <MDButton color="info" onClick={handleCreateButton}>
      {" "}
      Create
    </MDButton>
  </MDBox>
</FormControl>

    </MDBox>
  );
}
export default QuizCreation;
