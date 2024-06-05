// client/src/components/UserTable.js

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Link } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UserTable = ({ users, filterText, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const filteredUsers = users.filter(user => 
    user?.personalInfo?.firstName?.toLowerCase().includes(filterText.toLowerCase()) ||
    user?.personalInfo?.lastName?.toLowerCase().includes(filterText.toLowerCase()) ||
    user?.email?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredUsers.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate(`/admindashboard/${user._id}`)}
                style={{ color: 'blue', textDecoration: 'underline' }}
              >
                {user?.personalInfo?.firstName}
              </Link>
            </TableCell>
            <TableCell>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate(`/admindashboard/${user._id}`)}
                style={{ color: 'blue', textDecoration: 'underline' }}
              >
                {user?.personalInfo?.lastName}
              </Link>
            </TableCell>
            <TableCell>{user?.email}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(user)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(user._id)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
