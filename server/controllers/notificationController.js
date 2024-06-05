const asyncHandler = require('express-async-handler');
const Notification = require('../models/Notification');

// @desc    Create new notification with userId
// @route   POST /api/notifications/:userId
// @access  Private
const createNotificationWithUserId = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const { message, event_id, timestamp } = req.body;

    if (!message || !event_id || !timestamp) {
      res.status(400);
      throw new Error('Missing required fields');
    }

    const notification = new Notification({
      user: userId,
      message,
      event_id,
      timestamp,
    });

    const createdNotification = await notification.save();
    res.status(201).json(createdNotification);

    // Emit the notification to all clients via socket.io
    req.app.get('socketio').emit('notify', createdNotification);
  } catch (error) {
    console.error('Error creating notification:', error); // Log the error
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create new notification
// @route   POST /api/notifications
// @access  Private
const createNotification = asyncHandler(async (req, res) => {
  try {
    const { user, message, event_id, timestamp } = req.body;

    if (!message || !event_id || !timestamp) {
      console.log('Missing required fields:', { message, user, event_id, timestamp });
      res.status(400);
      throw new Error('Missing required fields');
    }

    const notificationData = {
      message,
      event_id,
      timestamp,
    };

    // Include user field if provided
    if (user) {
      notificationData.user = user;
    }

    const notification = new Notification(notificationData);

    const createdNotification = await notification.save();
    res.status(201).json(createdNotification);

    // Emit the notification to all clients via socket.io
    req.app.get('socketio').emit('notify', createdNotification);
  } catch (error) {
    console.error('Error creating notification:', error); // Log the error
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get notifications by userId
// @route   GET /api/notifications/:userId
// @access  Private
const getNotificationsWithUserId = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.params.userId });

  res.json(notifications);
});

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find();

  res.json(notifications);
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    notification.read = true;
    await notification.save();
    res.json({ message: 'Notification marked as read' });
  } else {
    res.status(404).json({ message: 'Notification not found' });
  }
});

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
const deleteNotification = asyncHandler(async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      console.log('Notification not found');
      return res.status(404).json({ message: 'Notification not found' });
    }

    await Notification.deleteOne({ _id: req.params.id });
    console.log('Notification removed');
    res.status(200).json({ message: 'Notification removed' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = {
  createNotificationWithUserId,
  createNotification,
  getNotificationsWithUserId,
  getNotifications,
  markAsRead,
  deleteNotification,
};
