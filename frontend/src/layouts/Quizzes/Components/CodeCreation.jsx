import * as React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
function CodeCreation(){
    const [codingFormData, setCodingFormData] = useState({
        bankName: "",
        bankType: "",
        bankDifficulty: "",
        questionFile: null,
      });
      const handleCodingCreateButton = async () => {
        console.log(codingFormData);
        try {
          const response = await fetch(`http://localhost:5001/codingBank`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(codingFormData),
          });
          const result = await response.json();
          //toast("question bank created")
          alert("success");
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <MDBox>
           <FormControl sx={{ width: "auto" }}>
                            <TextField
                              id="Coding bank name"
                              label="Coding bank name"
                              value={codingFormData.CodingBankName}
                              onChange={(e) =>
                                setCodingFormData({
                                  ...codingFormData,
                                  CodingBankName: e.target.value,
                                })
                              }
                              variant="outlined"
                              sx={{ width: "640px", marginBottom: "10px" }}
                            />
                            <FormControl
                              variant="outlined"
                              sx={{ width: "40%" }}
                            >
                              <InputLabel>Select bank type</InputLabel>
                              <Select
                                label="Questions Type"
                                value={codingFormData.CodingBankType}
                                onChange={(e) =>
                                  setCodingFormData({
                                    ...codingFormData,
                                    CodingBankType: e.target.value,
                                  })
                                }
                                variant="outlined"
                                sx={{
                                  height: "50px",
                                  width: "640px",
                                  marginBottom: "10px",
                                }}
                              >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="Begineer's question">
                                  Begineer's question
                                </MenuItem>
                                <MenuItem value="Data structures">
                                  Data structures
                                </MenuItem>
                                <MenuItem value="Dynamic programming">
                                  Dynamic programming
                                </MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl
                              variant="outlined"
                              sx={{ width: "40%" }}
                            >
                              <InputLabel>Select bank difficulty</InputLabel>
                              <Select
                                label="Difficulty Level"
                                value={codingFormData.CodingBankDifficulty}
                                onChange={(e) =>
                                  setCodingFormData({
                                    ...codingFormData,
                                    CodingBankDifficulty: e.target.value,
                                  })
                                }
                                variant="outlined"
                                sx={{
                                  height: "50px",
                                  width: "640px",
                                  marginBottom: "10px",
                                }}
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
                                setCodingFormData({
                                  ...codingFormData,
                                  CodingQuestionFile: e.target.value,
                                })
                              }
                              sx={{ width: "640px", marginBottom: "10px" }}
                            />
                            <MDButton
                              color="info"
                              onClick={handleCodingCreateButton}
                            >
                              {" "}
                              Create
                            </MDButton>
                          </FormControl>{" "}
    
        </MDBox>
      );
}
export default CodeCreation;