/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";

export default function usageData() {
  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={5} lineHeight={1}>
        <MDTypography display="block" variant="caption" color="text" fontWeight="bold">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
  

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="bold">
        {title}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Test Title", accessor: "title", align: "center" },
      { Header: "Proctor enabled?", accessor: "Settings", align: "center" },
      { Header: "Number of attempted", accessor: "attempts", align: "center" },
      { Header: "created", accessor: "created", align: "center" },
    ],

    rows: [
      {
        title: <Author  name="zoho test"/>,
        Settings: <Job title="camera, mike"/>,
        attempts: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={5} lineHeight={1}>
            <MDTypography display="block" variant="caption" color="text" fontWeight="bold">
              22/1/2022
            </MDTypography>
          </MDBox>
        </MDBox>
        ),
        created: (
            <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={5} lineHeight={1}>
              <MDTypography display="block" variant="caption" color="text" fontWeight="bold">
               50
              </MDTypography>
            </MDBox>
          </MDBox>
          ),
      },
    
    ],
  };
}
