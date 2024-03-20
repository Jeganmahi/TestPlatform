import React, { useState } from 'react';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDAvatar from 'components/MDAvatar';
import MDButton from 'components/MDButton';
import TermsAndConditionsModal from './TermsAndConditionsModal';

export default function QuizData() {
  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleTakeTestClick = () => {
    setTermsModalOpen(true);
  };

  const handleTermsModalClose = () => {
    setTermsModalOpen(false);
  };

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleStartTest = () => {
    // Add logic to start the test
    console.log('Test started!');
  };

  return {
    columns: [
      { Header: 'Quiz Set Name', accessor: 'name', width: '45%', align: 'left' },
      { Header: 'Type', accessor: 'type', align: 'left' },
      { Header: 'created', accessor: 'created', align: 'center' },
      { Header: 'action', accessor: 'action', align: 'center' },
    ],

    rows: [
      {
        name: <Author name="Quiz set-1" />,
        type: <Job title="technical" />,
        created: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        action: (
          <MDBox>
            <MDButton
              size="small"
              color= 'info'// Set the color based on the checkbox state
              fontWeight="medium"
              onClick={handleTakeTestClick}
            >
               Take Test
            </MDButton>
            <TermsAndConditionsModal
              open={isTermsModalOpen}
              onClose={handleTermsModalClose}
              onAgree={handleStartTest}
              onCheckboxChange={handleCheckboxChange} // Pass the checkbox change handler
            />
          </MDBox>
        ),
      },
    ],
  };
}