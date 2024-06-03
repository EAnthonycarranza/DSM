// client/src/components/UserEditModal.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';

const UserEditContact = ({ open, onClose, user, onSave, onChange }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="First Name"
          name="personalInfo.firstName"
          value={user.personalInfo?.firstName || ''}
          onChange={onChange}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Last Name"
          name="personalInfo.lastName"
          value={user.personalInfo?.lastName || ''}
          onChange={onChange}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={user.email || ''}
          onChange={onChange}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Phone"
          name="personalInfo.phone"
          value={user.personalInfo?.phone || ''}
          onChange={onChange}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Address"
          name="personalInfo.address"
          value={user.personalInfo?.address || ''}
          onChange={onChange}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

UserEditContact.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UserEditContact;
