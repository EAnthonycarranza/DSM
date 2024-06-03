// client/src/components/UserDetail.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserEditModal from './UserEditContact';
import NoteModal from './NoteModal';
import NavBar from './NavBar';

const socket = io('http://localhost:3000');

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(data);
      setEditedUser(data);
    };

    const fetchNotes = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotes(data);
    };

    fetchUser();
    fetchNotes();
  }, [id]);

  useEffect(() => {
    socket.on('notify', (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off('notify');
    };
  }, []);

  const handleAddNote = async () => {
    if (noteContent.trim() === '') return;
    const { data } = await axios.post('http://localhost:3000/api/notes', {
      userId: id,
      content: noteContent,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setNotes([...notes, data]);
    setNoteContent('');

    // POST a notification
    await axios.post('http://localhost:3000/api/notifications', {
      user: id,
      message: `New note added: ${noteContent}`,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    socket.emit('notify', { message: `New note added for user ${user.email}` });
    setOpenNoteModal(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setOpenEditModal(true);
    setAnchorEl(null);
  };

  const handleDeleteClick = async () => {
    await axios.delete(`http://localhost:3000/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    // Redirect to dashboard after deletion or show a confirmation message
    setAnchorEl(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSave = async () => {
    await axios.put(`http://localhost:3000/api/users/${id}`, editedUser, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setUser(editedUser);
    setOpenEditModal(false);
  };

  return (
    <div>
      <NavBar />
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" border={1} padding={2} marginBottom={2}>
          <Box>
            <Typography variant="h6">Contact Information</Typography>
            <Typography variant="body1">First Name: {user?.personalInfo?.firstName}</Typography>
            <Typography variant="body1">Last Name: {user?.personalInfo?.lastName}</Typography>
            <Typography variant="body1">Email: {user?.email}</Typography>
            <Typography variant="body1">Phone: {user?.personalInfo?.phone}</Typography>
            <Typography variant="body1">Address: {user?.personalInfo?.address}</Typography>
          </Box>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          </Menu>
        </Box>
        <UserEditModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          user={editedUser}
          onSave={handleEditSave}
          onChange={handleEditChange}
        />
        <Button onClick={() => setOpenNoteModal(true)}>Add Note</Button>
        <NoteModal
          open={openNoteModal}
          onClose={() => setOpenNoteModal(false)}
          noteContent={noteContent}
          setNoteContent={setNoteContent}
          handleAddNote={handleAddNote}
        />
        <Box>
          <Typography variant="h6">Notes</Typography>
          {notes.map((note) => (
            <Box key={note._id} mb={2}>
              <Typography>{note.content}</Typography>
              <Typography variant="caption">{new Date(note.createdAt).toLocaleString()}</Typography>
            </Box>
          ))}
        </Box>
        <Box>
          <Typography variant="h6">Notifications</Typography>
          {notifications.map((notification, index) => (
            <Typography key={index}>{notification.message}</Typography>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default UserDetail;
