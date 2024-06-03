import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import UserRow from './UserRow';

const UserTable = ({ users, filterText, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(filterText.toLowerCase()) ||
    (user.personalInfo.firstName && user.personalInfo.firstName.toLowerCase().includes(filterText.toLowerCase())) ||
    (user.personalInfo.lastName && user.personalInfo.lastName.toLowerCase().includes(filterText.toLowerCase()))
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell align="right">Date Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map(user => (
            <TableRow key={user._id} onClick={() => navigate(`/admindashboard/${user._id}`)}>
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
