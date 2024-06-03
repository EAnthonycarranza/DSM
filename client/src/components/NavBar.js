// client/src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Home, Contacts, CalendarToday, Insights, Dashboard, PersonAdd } from '@mui/icons-material';
import Notifications from './Notifications';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Home />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          CRM Dashboard
        </Typography>
        <Button color="inherit"><Contacts /></Button>
        <Button color="inherit"><CalendarToday /></Button>
        <Button color="inherit"><Insights /></Button>
        <Button color="inherit"><Dashboard /></Button>
        <IconButton color="inherit">
          <PersonAdd />
        </IconButton>
        <Notifications />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
