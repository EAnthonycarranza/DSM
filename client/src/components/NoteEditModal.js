// client/src/components/NoteEditModal.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import PropTypes from 'prop-types';

const NoteEditModal = ({ open, onClose, note, setNoteContent, handleSaveNote }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Note</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Note"
          value={note?.content || ''}
          onChange={(e) => setNoteContent({ ...note, content: e.target.value })}
          margin="dense"
          multiline
          rows={4}
        />
        <FormControlLabel
          control={<Checkbox name="privateNote" checked={note?.private || false} onChange={(e) => setNoteContent({ ...note, private: e.target.checked })} />}
          label="Private note"
        />
        <Button color="primary" component="span">
          Add attachments
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveNote}>Save Note</Button>
      </DialogActions>
    </Dialog>
  );
};

NoteEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
  setNoteContent: PropTypes.func.isRequired,
  handleSaveNote: PropTypes.func.isRequired,
};

export default NoteEditModal;
