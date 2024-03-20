import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import { FileSaver } from "file-saver"; // Import FileSaver library
import { saveAs } from 'file-saver';
import ExcelJS from "exceljs";
function Result() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/users");
      const result = await response.json();

      if (Array.isArray(result)) {
        setData(result);
        setError(null);
      } else {
        console.error("Invalid data structure received from the server:", result);
        setError("Invalid data structure received from the server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data from the server");
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once when the component mounts

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const columns = [
    { Header: "ID", accessor: "id", align: "center" },
    { Header: "Test name", accessor: "testName", width: "45%", align: "left" },
    { Header: "Started", accessor: "started", align: "center" },
    { Header: "Finished", accessor: "finished", align: "center" },
    { Header: "Created", accessor: "created", align: "left" },
    { Header: "Duration", accessor: "duration", align: "left" },
    { Header: "Score", accessor: "score", align: "center" },
  ];

  const downloadExcel = () => {
    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Results");
  
    // Define the columns
    const columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Test name", key: "testName", width: 30 },
      { header: "Started", key: "started", width: 20 },
      { header: "Finished", key: "finished", width: 20 },
      { header: "Created", key: "created", width: 20 },
      { header: "Duration", key: "duration", width: 20 },
      { header: "Score", key: "score", width: 10 },
    ];
  
    // Add the columns to the worksheet
    worksheet.columns = columns;
  
    // Add the data to the worksheet
    data.forEach((row) => {
      worksheet.addRow({
        id: row.id,
        testName: row.testName,
        started: row.started,
        finished: row.finished,
        created: row.created,
        duration: row.duration,
        score: row.score,
      });
    });
  
    // Save the workbook as a Blob object
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  
      // Download the Excel file
      saveAs(blob, "results.xlsx");
    });
  };
  

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
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  RESULTS
                </MDTypography>
                <MDButton onClick={downloadExcel} variant="outlined" color="white">
    Download Excel
  </MDButton>
              </MDBox>
              <MDBox pt={3}>
                {error ? (
                  <p>Error: {error}</p>
                ) : (
                  <DataTable
                    table={{ columns, rows: data }}
                    isSorted={false}
                    entriesPerPage={true}
                    showTotalEntries={true}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Result;
  