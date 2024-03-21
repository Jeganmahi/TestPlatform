import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React from "react";
import { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

export default function QuizTable({ questionBankData }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [formattedData, setFormattedData] = useState(null);
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


  const handleDelete = async (ID) => {
    console.log(ID);
    try {
      const response = await fetch(`http://localhost:5001/MCQDelete/${ID}`);
      const jsondata = await response.json();

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
        <Dialog maxWidth="lg" open={open} justifyContent="center" onClose={handleClose}>
          <DialogTitle>Questions</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Question Text</th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Correct Option</th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Wrong Option 1</th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Wrong Option 2</th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Wrong Option 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formattedData && formattedData.map((question, index) => (
                      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "transparent" }}>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{question.QuestionText}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{question.Coption}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{question.Woption1}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{question.Woption2}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{question.Woption3}</td>
                        {/* Add more columns for additional question details */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <MDButton color="info" onClick={() => handleViewQuestions(questionBank.BankID)}>
          View
        </MDButton>
        <MDButton color="error" onClick={() => handleDelete(questionBank.BankID)}>
          Delete
        </MDButton>
      </MDBox>
    ),
  }));

  return (

    <DataTable
      table={{ columns, rows }}
      isSorted={true}
      entriesPerPage={true}
      showTotalEntries={true}
      noEndBorder
    />

  );
}
