import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const FurtherProcessModal = ({ open, onClose, onStart, onCancel }) => {

    const handleCancel = () => {
        onCancel(); // Call the onCancel callback
        onClose(); // Close the modal
      };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Start Assessment</DialogTitle>
      <DialogContent>
        <p>You are about to start the assessment.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onStart} color="primary" variant="contained"  style={{ color: 'white' }}>
          Start
        </Button>
        <Button onClick={handleCancel} color="secondary" variant="contained" style={{ color: 'white' }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FurtherProcessModal;
