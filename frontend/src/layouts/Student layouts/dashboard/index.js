/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useNavigate} from "react-router-dom";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";



function Dashboard() {
  const navigate = useNavigate();
  const { sales, tasks } = reportsLineChartData;
  const [totalTestAttended, setTotalTestAttended] = useState(0);
  const [averageTestMarks, setAverageTestMarks] = useState(0);
  const [dailyTestChartData, setDailyTestChartData] = useState([]);
  const fetchTotalTestAttended = async () => {
    try {
      const response = await fetch("http://localhost:8081/totalRowCount");
      const result = await response.json();

      if (result && result.length > 0) {
        const totalTestCount = result[0].totalTestAttended;
        setTotalTestAttended(totalTestCount);
      } else {
        console.error("Invalid data structure received from the server:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchAverageTestMarks = async () => {
    try {
      const response = await fetch("http://localhost:8081/averageScore");
      const result = await response.json();

      if (result && result.averageScore) {
        setAverageTestMarks(result.averageScore);
      } else {
        console.error("Invalid data structure received from the server:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDailyTestChartData = async () => {
    try {
      const response = await fetch("http://localhost:8081/recentTestScores");
      const result = await response.json();

      if (result && result.length > 0) {
        // Assuming result contains an array of recent test scores
        setDailyTestChartData(result);
      } else {
        console.error("Invalid data structure received from the server:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTotalTestAttended();
    fetchAverageTestMarks();
    fetchDailyTestChartData();
  }, []);



  const handleOnclick=()=>{
    navigate('/Quizzes')
  }

  const handleOnclicks=()=>{
    navigate('/results  ')
  }

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} onClick={handleOnclicks} style={{ cursor: 'pointer' }}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Total test Attended"
                count={totalTestAttended}
                percentage={{
                  color: "success",
                  amount: "+100%",
                  label: "Test Completed ",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} onClick={handleOnclick} style={{ cursor: 'pointer' }}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Assesment Pending"
                count="1"
                percentage={{
                  color: "success",
                  amount: "1",
                  label: "Active Assesment",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Average test marks"
                count={averageTestMarks}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Average Score",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="note_add" 
                title="Daily Test Completed"
                count="15"
                percentage={{
                  color: "success",
                  amount: "11",
                  label: (
                    <>
                    <span role="img" aria-label="fire">
                        ❤️‍🔥
                      </span>
                      Daily Test Streak{" "}
                      
                    </>
                  ),
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Daily Test"
                  date="update Daily"
                  chart={dailyTestChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Assesment Score"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="update For Every Test"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    
    </DashboardLayout>
  );
}

export default Dashboard;
