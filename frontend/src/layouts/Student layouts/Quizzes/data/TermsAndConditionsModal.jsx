import React, { useState } from 'react';
import BPCheckbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FurtherProcessModal from './FurtherProcessModal';

const TermsAndConditionsModal = ({ open, onClose, onAgree, onCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [furtherProcessModalOpen, setFurtherProcessModalOpen] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setValidationMessage('');
    onCheckboxChange(!isChecked);
  };

  const handleAgree = () => {
    if (isChecked) {
      onAgree();
      setFurtherProcessModalOpen(true);
    } else {
      setValidationMessage('Please click the checkbox before agreeing.');
    }
  };

  const handleFurtherProcessModalClose = () => {
    setFurtherProcessModalOpen(false);
    onClose(); // Close the main modal after further process modal is closed
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent>
          <p>Read the terms and conditions carefully...</p>
          <p style={{ color: 'black' }}>
            <strong style={{ color: 'black', fontWeight: 'bolder', fontSize: '25px' }}>Instructions:</strong>
            <br />
            • During attempt, you can use the sections link on the navigation panel to access various sections.
          <br />
          • The navigation buttons can be used to move across various questions.
          <br />
          • DO NOT attempt multiple sessions in multiple tabs, your answer might not be saved.
          <br />
          • You are free to choose the programming language from the list available to code.
          <br />
          • DO NOT press any special keys or functional keys.

          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f2f2f2',
              marginTop: '22px',
              marginBottom: '16px',
              border: '1px solid black',
              borderRadius: '4px',
              padding: '4px',
              justifyContent: 'center',
            }}
          >
            <BPCheckbox checked={isChecked} onChange={handleCheckboxChange} defaultChecked />
            <span style={{ marginLeft: '8px', fontWeight: isChecked ? 'bold' : 'normal' }}>
              I agree to the terms and conditions
            </span>
          </div>
          {validationMessage && (
            <p style={{ color: 'red', fontWeight: 'bold', marginTop: '8px' }}>{validationMessage}</p>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleAgree}
            color="primary"
            variant="contained"
            style={{ fontWeight: isChecked ? 'bolder' : 'normal', color: 'white' }}
            disabled={!isChecked}
          >
            Agree
          </Button>
          <Button onClick={onClose} color="secondary" variant="contained" style={{ color: 'white' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* FurtherProcessModal component */}
      <FurtherProcessModal
        open={furtherProcessModalOpen}
        onClose={handleFurtherProcessModalClose}
        onStart={() => console.log('Assessment started!')} // Handle logic for starting the assessment
        onCancel={() => console.log('Assessment cancelled.')} // Handle logic for cancelling the assessment
      />
    </>
  );
};

export default TermsAndConditionsModal;
