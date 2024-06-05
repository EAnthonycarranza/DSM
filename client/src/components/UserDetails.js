import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography, IconButton, Menu, MenuItem, Grid, Divider, Paper, Tabs, Tab } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserEditModal from './UserEditContact';
import NoteModal from './NoteModal';
import NoteEditModal from './NoteEditModal';
import NavBar from './NavBar';
import Form from './Form'; // Import Form component
import Documents from './Documents'; // Import Documents component
import Photos from './Photos'; // Import Photos component

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
  const [openNoteEditModal, setOpenNoteEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [noteAnchorEls, setNoteAnchorEls] = useState({});
  const [tabIndex, setTabIndex] = useState(0); // State for tab index

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(data);
        setEditedUser(data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('User not found');
          alert('User not found');
        } else {
          console.error('Error fetching user:', error);
          alert('Error fetching user');
        }
      }
    };

    const fetchNotes = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // Sort notes by createdAt in descending order
        const sortedNotes = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotes(sortedNotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchUser();
    fetchNotes();
  }, [id]);

  useEffect(() => {
    socket.on('notify', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off('notify');
    };
  }, []);

  const handleAddNote = async () => {
    if (noteContent.trim() === '') return;
    try {
      const { data } = await axios.post('http://localhost:3000/api/notes', {
        userId: id,
        content: noteContent,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotes((prev) => [data, ...prev]); // Add the new note to the top
      setNoteContent('');
      setOpenNoteModal(false); // Close the Note Modal

      await axios.post(`http://localhost:3000/api/notifications/${id}`, {
        message: `New note added: ${noteContent}`,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNoteMenuClick = (event, noteId) => {
    setNoteAnchorEls((prev) => ({ ...prev, [noteId]: event.currentTarget }));
  };

  const handleNoteMenuClose = (noteId) => {
    setNoteAnchorEls((prev) => ({ ...prev, [noteId]: null }));
  };

  const handleEditClick = (note) => {
    setNoteToEdit(note);
    setOpenNoteEditModal(true);
  };

  const handleDeleteClick = async (noteId) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleNoteEditSave = async (editedNoteContent) => {
    try {
      const { data } = await axios.put(`http://localhost:3000/api/notes/${noteToEdit._id}`, {
        content: editedNoteContent,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotes(notes.map(note => (note._id === data._id ? data : note)));
      setOpenNoteEditModal(false);
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAnchorEl(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:3000/api/users/${id}`, editedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(editedUser);
      setOpenEditModal(false);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div>
      <NavBar />
      <Box display="flex" flexDirection="column" padding={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
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
            <MenuItem onClick={() => setOpenEditModal(true)}>Edit</MenuItem>
            <MenuItem onClick={handleUserDelete}>Delete</MenuItem>
          </Menu>
        </Box>
        <UserEditModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          user={editedUser}
          onSave={handleEditSave}
          onChange={handleEditChange}
        />
        <Box display="flex" justifyContent="flex-end" marginBottom={2}>
          <Button onClick={() => setOpenNoteModal(true)}>Add Note</Button>
        </Box>
        <NoteModal
          open={openNoteModal}
          onClose={() => setOpenNoteModal(false)}
          noteContent={noteContent}
          setNoteContent={setNoteContent}
          handleAddNote={handleAddNote}
        />
        <Box>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <Tab label="Activity" />
            <Tab label="Forms" />
            <Tab label="Documents" />
            <Tab label="Photos" />
          </Tabs>
          {tabIndex === 0 && (
            <Box>
              <Typography variant="h6">Notes</Typography>
              <Paper>
                <Grid container spacing={2}>
                  <Grid item xs={3} style={{ borderRight: '1px solid #ddd' }}>
                    <Typography variant="body2" color="textSecondary">Date Created</Typography>
                  </Grid>
                  <Grid item xs={7} style={{ borderRight: '1px solid #ddd', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="body2" color="textSecondary">Note Text</Typography>
                  </Grid>
                  <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="body2" color="textSecondary">Actions</Typography>
                  </Grid>
                  {notes.map((note) => (
                    <React.Fragment key={note._id}>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={3} style={{ borderRight: '1px solid #ddd' }}>
                        <Typography variant="body2">{formatDateTime(note.createdAt)}</Typography>
                      </Grid>
                      <Grid item xs={7} style={{ borderRight: '1px solid #ddd'}}>
                        <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>{note.content}</Typography>
                      </Grid>
                      <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton onClick={(event) => handleNoteMenuClick(event, note._id)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={noteAnchorEls[note._id]}
                          keepMounted
                          open={Boolean(noteAnchorEls[note._id])}
                          onClose={() => handleNoteMenuClose(note._id)}
                        >
                          <MenuItem onClick={() => handleEditClick(note)}>Edit</MenuItem>
                          <MenuItem onClick={() => handleDeleteClick(note._id)}>Delete</MenuItem>
                        </Menu>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Paper>
            </Box>
          )}
          {tabIndex === 1 && <Form userId={id} />}  {/* Render Form component */}
          {tabIndex === 2 && <Documents userId={id} />}  {/* Render Documents component */}
          {tabIndex === 3 && <Photos userId={id} />}  {/* Render Photos component */}
        </Box>
      </Box>
      <NoteEditModal
        open={openNoteEditModal}
        onClose={() => setOpenNoteEditModal(false)}
        note={noteToEdit}
        handleSave={handleNoteEditSave}
      />
    </div>
  );
};

export default UserDetail;
