const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    message: {
      type: String,
      required: true,
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Event',
    },
    timestamp: {
      type: Date,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
