import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const TakeTestPopup = ({ open, onClose, testName }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Start Assessment - {testName}</DialogTitle>
      <DialogContent>
        {/* Content of the popup, like instructions or assessment details */}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" color="primary">
          Start Test
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TakeTestPopup;
