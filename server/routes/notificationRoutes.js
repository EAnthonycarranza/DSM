const express = require('express');
const router = express.Router();
const {
  createNotificationWithUserId,
  getNotificationsWithUserId,
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
} = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/:userId').post(protect, createNotificationWithUserId).get(protect, getNotificationsWithUserId);
router.route('/').post(protect, createNotification).get(protect, getNotifications);
router.route('/:id/read').put(protect, markAsRead);
router.route('/:id').delete(protect, deleteNotification);

module.exports = router;
