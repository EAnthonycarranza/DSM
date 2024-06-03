import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

const UserRow = ({ user, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{user.personalInfo.firstName}</TableCell>
      <TableCell>{user.personalInfo.lastName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.personalInfo.phoneNumber}</TableCell>
      <TableCell align="right">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
      <TableCell align="right">
        <Button variant="contained" color="primary" onClick={() => onEdit(user)}>Edit</Button>
        <Button variant="contained" color="secondary" onClick={() => onDelete(user._id)} style={{ marginLeft: '10px' }}>Delete</Button>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
