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
                  {formattedData && formattedData.map(question => (
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
