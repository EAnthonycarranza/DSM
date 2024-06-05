const asyncHandler = require('express-async-handler');
const Event = require('../models/Event');
const Notification = require('../models/Notification'); // Ensure Notification is correctly imported

// @desc    Get all events
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

// @desc    Create new event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
    const { title, start, end, allDay, description, status, backgroundColor, reminder } = req.body;
  
    console.log('Received event data:', req.body); // Add this line
  
    if (!title || !start || !end) {
      res.status(400);
      throw new Error('Please add all fields');
    }
  
    const event = new Event({ title, start, end, allDay, description, status, backgroundColor, reminder });
    const createdEvent = await event.save();
    console.log('Event created in MongoDB:', createdEvent);
  
    // Send notification for new event
    const notification = new Notification({
      user: req.user.id,
      message: `New event created: ${title}`,
      event_id: createdEvent._id,
      timestamp: new Date(createdEvent.start).toISOString(),
    });
    await notification.save();
  
    res.status(201).json(createdEvent);
  });
  

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const { title, start, end, allDay, description, status, backgroundColor, reminder } = req.body;

  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  event.title = title || event.title;
  event.start = start || event.start;
  event.end = end || event.end;
  event.allDay = allDay || event.allDay;
  event.description = description || event.description;
  event.status = status || event.status;
  event.backgroundColor = backgroundColor || event.backgroundColor;
  event.reminder = reminder || event.reminder;

  const updatedEvent = await event.save();
  res.json(updatedEvent);
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  await event.remove();
  res.json({ message: 'Event removed' });
});

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
