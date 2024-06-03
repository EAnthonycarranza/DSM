// routes/notificationRoutes.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const Notification = require('../models/Notification');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get notifications for a user
router.get('/', protect, asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ timestamp: -1 });
  res.json(notifications);
}));

// Mark a notification as read
router.put('/:id/read', protect, asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } else {
    res.status(404);
    throw new Error('Notification not found');
  }
}));

// Delete a notification
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    await notification.remove();
    res.json({ message: 'Notification removed' });
  } else {
    res.status(404);
    throw new Error('Notification not found');
  }
}));

// Create a new notification
router.post('/', protect, asyncHandler(async (req, res) => {
  const { user, message } = req.body;
  const notification = new Notification({ user, message });
  const createdNotification = await notification.save();
  res.status(201).json(createdNotification);
}));

module.exports = router;
