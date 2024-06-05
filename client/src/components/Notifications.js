import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Box, IconButton, Menu, Badge, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:3000');

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/notifications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotifications(data);
        setUnreadCount(data.filter((notif) => !notif.read).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

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
    try {
      await axios.put(`http://localhost:3000/api/notifications/${id}/read`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotifications((prev) =>
        prev.map((notif) => (notif._id === id ? { ...notif, read: true } : notif))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDelete = async (id) => {
    const notificationToDelete = notifications.find((notif) => notif._id === id);
    try {
      await axios.delete(`http://localhost:3000/api/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotifications((prev) => prev.filter((notif) => notif._id !== id));
      if (!notificationToDelete.read) {
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error('Error deleting notification:', error.response || error);
    }
  };

  const handleNotificationClick = (notification) => {
    const userId = notification.user && notification.user._id ? notification.user._id : notification.user;
    if (userId) {
      navigate(`/admindashboard/${userId}`);
      setAnchorEl(null);
    } else {
      console.error('Invalid user:', notification.user);
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
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
        PaperProps={{
          style: {
            maxHeight: '400px',
            width: '350px',
          },
        }}
      >
        <List>
          {notifications.length === 0 ? (
            <ListItem>
              <ListItemText primary="No notifications" />
            </ListItem>
          ) : (
            notifications.map((notification) => (
              <Box
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f0f0f0' }
                }}
              >
                <ListItem alignItems="flex-start" style={{ backgroundColor: notification.read ? '#f5f5f5' : '#fff', flexDirection: 'column' }}>
                  <Box display="flex" alignItems="center">
                    {!notification.read && (
                      <CircleRoundedIcon style={{ color: '#1565C0', marginRight: '8px', height: '8px', }} />
                    )}
                    <ListItemText
                      primary={notification.message}
                      secondary={notification.timestamp ? formatDateTime(notification.timestamp) : 'Invalid Date'}
                    />
                  </Box>
                  <Box mt={1} display="flex" justifyContent="space-between" width="100%">
                    {!notification.read && (
                      <Button onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(notification._id);
                      }}>Mark As Read</Button>
                    )}
                    <Button onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(notification._id);
                    }}>Clear</Button>
                  </Box>
                </ListItem>
                <Divider />
              </Box>
            ))
          )}
        </List>
      </Menu>
    </Box>
  );
};

export default Notifications;
