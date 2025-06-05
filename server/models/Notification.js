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
    clicked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.methods.updateReadStatus = async function (isRead) {
  this.read = isRead;
  this.clicked = true;
  await this.save();
  return this;
};

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
