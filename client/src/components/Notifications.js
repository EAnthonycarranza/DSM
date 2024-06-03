import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Box, IconButton, Menu, MenuItem, Badge, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const socket = io('http://localhost:3000');

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await axios.get('http://localhost:3000/api/notifications', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNotifications(data);
      setUnreadCount(data.filter(notification => !notification.isRead).length);
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    socket.on('notify', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off('notify');
    };
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async (id) => {
    await axios.put(`http://localhost:3000/api/notifications/${id}/read`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    setNotifications(notifications.map(notification =>
      notification._id === id ? { ...notification, isRead: true } : notification
    ));
    setUnreadCount(unreadCount - 1);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/notifications/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    setNotifications(notifications.filter(notification => notification._id !== id));
  };

  return (
    <Box>
      <IconButton color="inherit" onClick={handleMenuClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem disableGutters>
          <List style={{ width: '350px', maxHeight: '400px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <ListItem>
                <ListItemText primary="No notifications" />
              </ListItem>
            ) : (
              notifications.map((notification) => (
                <ListItem key={notification._id} alignItems="flex-start" style={{ display: 'flex', flexDirection: 'column' }}>
                  <ListItemText
                    primary={notification.message}
                    secondary={new Date(notification.timestamp).toLocaleString()}
                    style={{ fontWeight: notification.isRead ? 'normal' : 'bold', marginBottom: 'auto' }}
                  />
                  <ListItemSecondaryAction style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '15px' }}>
                    <Button onClick={() => handleMarkAsRead(notification._id)}>Mark As Read</Button>
                    <Button onClick={() => handleDelete(notification._id)}>Clear</Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Notifications;
