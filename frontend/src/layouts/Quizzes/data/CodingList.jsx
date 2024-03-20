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
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React from "react";
import { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

export default function CodingTable({ codingQuestionBankData }) {
  const cfd = (data) => {
    setCodeFormattedData(data);

    setCodeModal(true);
  };
  const [codeFormattedData, setCodeFormattedData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [formattedData, setFormattedData] = useState(null);
  const [CodeModal, setCodeModal] = React.useState(false);
  const handleCodingClose = () => setCodeModal(false);

  const handleViewCodingQuestions = async (ID) => {
    try {
      const response = await fetch(`http://localhost:5001/Codequestion/${ID}`);
      const jsondata = await response.json();

      cfd(jsondata);
      console.log(codeFormattedData);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  const handleCodingBankDelete = async (ID) => {
    console.log(ID);
    try {
      const response = await fetch(
        `http://localhost:5001/CodequestionDelete/${ID}`
      );
      const jsondata = await response.json();
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  const columns = [
    {
      Header: "Code Bank Name",
      accessor: "cname",
      width: "45%",
      align: "left",
    },
    { Header: "Type", accessor: "Type", align: "left" },
    { Header: "Difficulty ", accessor: "Difficulty", align: "center" },
    { Header: "Created On ", accessor: "Created", align: "center" },
    { Header: "action", accessor: "Action", align: "center" },
  ];
  const rows = codingQuestionBankData.map((questionBank) => ({
    cname: questionBank.BankName,
    Difficulty: questionBank.BankDifficulty, // Add logic to calculate difficulty if needed
    Type: questionBank.BankType,
    Created: questionBank.CreatedDate, // Add logic to calculate creation date if needed
    Action: (
      <MDBox>
        <MDButton
          color="info"
          onClick={() =>
            handleViewCodingQuestions(questionBank.CodingQuestionBankID)
          }
        >
          View
        </MDButton>
        <MDButton
          color="error"
          onClick={() =>
            handleCodingBankDelete(questionBank.CodingQuestionBankID)
          }
        >
          Delete
        </MDButton>
      </MDBox>
    ),
  }));

  return (
    <MDBox>
      <Dialog
        maxWidth="lg"
        open={CodeModal}
        sx={{ width: "auto" }}
        justifyContent="center"
        onClose={handleCodingClose}
      >
        <DialogTitle>Question List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <MDBox
              component="form"
              sx={{ width: "auto", height: "auto", textAlign: "center" }}
              noValidate
              autoComplete="off"
            ></MDBox>
          </DialogContentText>
          <MDBox
            component="form"
            sx={{ width: "auto", height: "auto", textAlign: "center" }}
            noValidate
            autoComplete="off"
          >
            <table>
              <thead>
                <tr>
                  <th>Question ID</th>
                  <th>Question Text</th>
                  <th>Sample Input</th>
                  <th>Sample Output</th>
                  <th>Hidden InputTest CaseI</th>
                  <th>Hidden OutputTest CaseI</th>
                  <th>Hidden Input TestCaseII</th>
                  <th>Hidden Output TestCaseII</th>
                  <th>Hidden Input TestCaseIII</th>
                  <th>Hidden Output TestCaseIII</th>
                  <th>Constraints</th>
                  <th>Time Limit</th>
                  <th>Storage Limit</th>
                </tr>
              </thead>
              <tbody>
                {codeFormattedData &&
                  codeFormattedData.map((question) => (
                    <TableRow key={question.QuestionID}>
                      <TableCell>{question.QuestionID}</TableCell>
                      <TableCell>{question.QuestionText}</TableCell>
                      <TableCell>{question.SampleInput}</TableCell>
                      <TableCell>{question.SampleOutput}</TableCell>
                      <TableCell>{question.HiddenInputTestCaseI}</TableCell>
                      <TableCell>{question.HiddenOutputTestCaseI}</TableCell>
                      <TableCell>{question.HiddenInputTestCaseII}</TableCell>
                      <TableCell>{question.HiddenInputTestCaseII}</TableCell>
                      <TableCell>{question.HiddenInputTestCaseIII}</TableCell>
                      <TableCell>{question.HiddenOutputTestCaseIII}</TableCell>
                      <TableCell>{question.Constraints}</TableCell>
                      <TableCell>{question.TimeLimit}</TableCell>
                      <TableCell>{question.StorageLimit}</TableCell>
                      {/* Add more TableCell components for additional question details */}
                    </TableRow>
                  ))}
              </tbody>
            </table>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCodingClose} color="primary">
            Cancel
          </MDButton>
          <MDButton onClick={handleClose} color="primary" autoFocus>
            Save
          </MDButton>
        </DialogActions>
      </Dialog>
      <DataTable
        table={{ columns, rows }}
        isSorted={true}
        entriesPerPage={true}
        showTotalEntries={true}
        noEndBorder
      />
    </MDBox>
  );
}
