// client/src/components/NavBar.js

import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box } from '@mui/material';
import { Home, Contacts, CalendarToday, Insights, Dashboard, PersonAdd } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Notifications from './Notifications';
import Search from './Search';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="default" elevation={0} style={{ borderBottom: '1px solid #ddd' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" style={{ flexGrow: 1 }}>
          <IconButton edge="start" color="inherit" aria-label="home" onClick={() => navigate('/admindashboard')}>
            <Home />
          </IconButton>
          <Button color="inherit" onClick={() => navigate('/admindashboard/contacts')}><Contacts /></Button>
          <Button color="inherit" onClick={() => navigate('/admindashboard/calendar')}><CalendarToday /></Button>
          <Button color="inherit" onClick={() => navigate('/admindashboard/insights')}><Insights /></Button>
          <Button color="inherit" onClick={() => navigate('/admindashboard/dashboard')}><Dashboard /></Button>
        </Box>
        <Box display="flex" alignItems="center" style={{ flexGrow: 1, justifyContent: 'center' }}>
          <Typography variant="h6">
            CRM Dashboard
          </Typography>
        </Box>
        <IconButton color="inherit">
          <PersonAdd />
        </IconButton>
        <Box display="flex" alignItems="center" style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
          <Search />
          <Notifications />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
