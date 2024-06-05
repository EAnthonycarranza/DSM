const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
    backgroundColor: {
      type: String,
    },
    reminder: {
      type: Number, // Reminder in minutes
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
