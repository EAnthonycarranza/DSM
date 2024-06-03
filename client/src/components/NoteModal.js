// client/src/components/NoteModal.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import PropTypes from 'prop-types';

const NoteModal = ({ open, onClose, noteContent, setNoteContent, handleAddNote }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Note</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Note"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          margin="dense"
          multiline
          rows={4}
        />
        <FormControlLabel
          control={<Checkbox name="privateNote" />}
          label="Private note"
        />
        <Button color="primary" component="span">
          Add attachments
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddNote}>Save Note</Button>
      </DialogActions>
    </Dialog>
  );
};

NoteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  noteContent: PropTypes.string.isRequired,
  setNoteContent: PropTypes.func.isRequired,
  handleAddNote: PropTypes.func.isRequired,
};

export default NoteModal;
